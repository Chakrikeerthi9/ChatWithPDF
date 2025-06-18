# from dotenv import load_dotenv
from app.langchain.pdf_text import get_pdf_text

def get_app_langchain(file_path: str):
    # load_dotenv()
    print(file_path)

    # get pdf text
    pdf_text = get_pdf_text(file_path)

    # 

    return
