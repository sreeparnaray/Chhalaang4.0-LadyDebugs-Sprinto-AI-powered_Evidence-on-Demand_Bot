from flask import Flask, request, jsonify, render_template_string
from flask_bcrypt import Bcrypt
from config import Config
from models import db, User
from ibm_auth import get_ibm_access_token
from jira_auth import fetch_jira_issues
from local_file import read_and_format_file, send_data_to_api
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
bcrypt = Bcrypt(app)

FILE_PATH = '/Users/aishwaryaasp/Downloads/DummyPdfData.pdf'
API_URL = 'https://jsonplaceholder.typicode.com/posts'

# Create tables if not exist
with app.app_context():
    db.create_all()

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful'}), 200

    return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/watson-orchestrate', methods=['GET'])
def watson_orchestrate():
    try:
        access_token = get_ibm_access_token()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    url = f"{Config.WATSON_URL}/v1/orchestrate/digital-employees/allskills"  
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print("Watson API response text:", response.text)
        data = response.text
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    return data, 200, {'Content-Type': 'text/html'}

@app.route('/jira/issues', methods=['GET'])
def jira_issues_route():
    try:
        print("Fetching Jira issues...")
        issues = fetch_jira_issues()
        print("Fetched issues:", issues)
        return jsonify({'issues': issues}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/process-file', methods=['GET'])
def process_file():
    try:
        data = read_and_format_file(FILE_PATH)
        results = send_data_to_api(data, API_URL)
        return jsonify({
            "success": True,
            "message": "File processed and data sent to API.",
            "data": results
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500



if __name__ == '__main__':
    app.run(debug=True)
