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
            docs_reader = PdfReader(doc.page_content)
            for page in docs_reader.pages:
                text += page.extract_text()
        print(text[:200])
        return text
    except Exception as e:
        print(e)
        return None
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)