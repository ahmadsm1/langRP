from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from mistralai import Mistral

api_key = os.environ["MISTRAL_API_KEY"]
model = "mistral-large-latest"

client = Mistral(api_key=api_key)

app = Flask(__name__)
CORS(app)

message_history = []

@app.route('/', methods=['POST'])
def hello():
	data = request.get_json()
	prompt = data.get('prompt', '')
	message_history.append({"role": "user", "content": prompt})

	chat_response = client.chat.complete(
    	model= model,
    	messages = message_history
	)
	
	agent_response = chat_response.choices[0].message.content
	message_history.append({"role": "assistant", "content": agent_response})
	return jsonify({"response": agent_response})

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000, debug=True)
