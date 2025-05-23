from flask import Blueprint, jsonify, request
from google.genai import types
from google import genai
from dotenv import load_dotenv
import os
import base64

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

genai_bp = Blueprint("genai_bp", __name__)

@genai_bp.route("/gerar", methods=["POST"])
def describe_gemini():
    my_file = request.json.get("base64_image")

    # Decofificando a imagem
    image_bytes = base64.b64decode(my_file)
    img_part = types.Part.from_bytes(data=image_bytes, mime_type="image/jpg")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[img_part, "O que tem nessa imagem? Descreva em até 30 palavras."],
        )

        print(response.text)
        
        return jsonify({"description": response.text}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
