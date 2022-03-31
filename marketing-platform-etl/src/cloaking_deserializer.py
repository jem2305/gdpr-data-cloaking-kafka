import json
import requests

class CloakingDeserializer:

    def __init__(self, policy_decsion_url):
        self.policy_decsion_url = policy_decsion_url

    def loads(self, bytearray):
        data = json.loads(bytearray)
        request_body = dict(input = data)
        response = requests.post(self.policy_decsion_url, json=request_body)
        
        input_is_cloaked = response.json()['result']
        if(input_is_cloaked):
            return dict(is_cloaked = True)
        else:
            return dict(is_cloaked=False, data = data)