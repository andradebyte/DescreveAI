from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

openai_bp = Blueprint("openai", __name__)

@openai_bp.route("/gerar", methods=["POST"])
def describe_openai():
    try:
        base64_image = request.json.get("base64_image")
        
        response = client.responses.create(
            model="gpt-4.1",
            input=[
            {
                "role": "user",
                "content": [
                {"type": "input_text", "text": "O que tem nessa imagem? Descreva em até 30 palavras."},
                {
                    "type": "input_image",
                    "image_url": f"data:image/jpg;base64,{base64_image}",
                },
                ],
            }
            ],
        )
        
        print(response.output_text)
        
        return jsonify({ "description": response.output_text }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
