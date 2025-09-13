import requests
from config import Config
from requests.auth import HTTPBasicAuth

def get_jira_auth():
    return HTTPBasicAuth(Config.JIRA_EMAIL, Config.JIRA_API_TOKEN)

def fetch_jira_issues():
    url = f"{Config.JIRA_URL}/rest/api/3/search"
    auth = get_jira_auth()
    params = {
        'jql': 'project=KAN AND status=IDEA',
        'maxResults': 10
    }

    response = requests.get(url, auth=auth, params=params)

    if response.status_code == 200:
        issues = response.json().get('issues', [])
        return issues
    else:
        raise Exception(f"Error fetching Jira issues: {response.status_code} {response.text}")
