from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from config import Config
from models import db, User
from ibm_auth import get_ibm_access_token
from jira_auth import fetch_jira_issues

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
bcrypt = Bcrypt(app)

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

@app.route('/watson-orchestrate', methods=['POST'])
def watson_orchestrate():
    data = request.get_json()
    user_input = data.get('input')

    if not user_input:
        return jsonify({'error': 'Input is required'}), 400

    try:
        access_token = get_ibm_access_token()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    url = f"{Config.WATSON_URL}/v1/your-endpoint"  # Replace with actual endpoint
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'input': user_input,
        'context': {}
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(response.json()), response.status_code

@app.route('/jira/issues', methods=['GET'])
def jira_issues_route():
    try:
        print("Fetching Jira issues...")
        issues = fetch_jira_issues()
        print("Fetched issues:", issues)
        return jsonify({'issues': issues}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
