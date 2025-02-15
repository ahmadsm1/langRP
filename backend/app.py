from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from mistralai import Mistral

api_key = os.environ["MISTRAL_API_KEY"]
model = "mistral-large-latest"

client = Mistral(api_key=api_key)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def hello():
	data = request.get_json()
	prompt = data.get('prompt', '')

	chat_response = client.chat.complete(
    model= model,
    messages = [
        {
            "role": "user",
            "content": prompt,
        },
    ]
	)
	return jsonify({"response": chat_response.choices[0].message.content})

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000, debug=True)
