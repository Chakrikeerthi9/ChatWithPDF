import os
from langchain_community.document_loaders import PyPDFLoader
from PyPDF2 import PdfReader

def get_pdf_text(file_path: str):
    try:
        loader = PyPDFLoader(file_path)
        docs = loader.load()
        print("docs loaded", len(docs))

        text = ""
        for doc in docs:
            text += doc.page_content

        return text
    except Exception as e:
        print("Error extracting text:", e)
        return None
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)
