
# importing key from .env
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")

# llm client 

from google import genai
client=genai.Client(api_key=GEMINI_API_KEY)
