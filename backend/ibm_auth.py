import requests
from config import Config

def get_ibm_access_token():
    url = 'https://iam.cloud.ibm.com/identity/token'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'grant_type': 'urn:ibm:params:oauth:grant-type:apikey',
        'apikey': Config.WATSON_API_KEY
    }

    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        access_token = response.json().get('access_token')
        return access_token
    else:
        raise Exception(f"Failed to get access token: {response.status_code} {response.text}")
