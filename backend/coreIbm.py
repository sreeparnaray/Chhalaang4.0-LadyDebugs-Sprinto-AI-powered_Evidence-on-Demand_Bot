from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

authenticator = IAMAuthenticator('roNKov9jDY4bIosAk3_evJ00JhF9_nsEfF5STpMj4lOc')
assistant = AssistantV2(
    version='{1.0.0}',
    authenticator=authenticator
)

assistant.set_service_url('https://api.us-south.watson-orchestrate.cloud.ibm.com')