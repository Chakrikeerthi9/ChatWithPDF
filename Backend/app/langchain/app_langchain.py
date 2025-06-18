from dotenv import load_dotenv
from app.langchain.pdf_text import get_pdf_text
from app.langchain.chunks import get_text_chunks

def get_app_langchain(file_path: str):
    load_dotenv()
    print(file_path)

    # get pdf text
    pdf_text = get_pdf_text(file_path)

    # get text cunks
    text_chunks = get_text_chunks(pdf_text)
    print([len(chunk) for chunk in text_chunks])

    # get embeddings

    return
