import os

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://porteruser:porterpass@localhost:3306/kite_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.urandom(24)
    WATSON_URL = os.getenv('WATSON_URL', 'https://us-south.watson-orchestrate.cloud.ibm.com/instances/70fe10ce-0b8e-42d2-aea2-37133c1636a6')
    WATSON_API_KEY = os.getenv('WATSON_API_KEY', 'roNKov9jDY4bIosAk3_evJ00JhF9_nsEfF5STpMj4lOc')
    JIRA_API_TOKEN = os.getenv('JIRA_API_TOKEN', 'ATATT3xFfGF0waehK7cbT7_BWtVL0ZOG2SvXJEHfKCiwbbL7atKY4ShGW8CRNzZJJrgHJO1vqxGSvD9y65K8fkLC6vVvgF40WhLT1UwsFGT1hFgqsEQXLS7mXPyJv5fbRhXpCIwuhRZXCPO-TSqQgUdelN__bfLX827wLlP248T0vHQ3f6yw8wk=3CF26713')
    JIRA_URL = os.getenv('JIRA_URL', 'https://challanggladydebugs.atlassian.net')
    JIRA_EMAIL = os.getenv('JIRA_EMAIL', 'aishcareer23@gmail.com')
