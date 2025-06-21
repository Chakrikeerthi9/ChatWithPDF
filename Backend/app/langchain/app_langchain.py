from dotenv import load_dotenv
from app.langchain.pdf_text import get_pdf_text
from app.langchain.chunks import get_text_chunks
from app.langchain.vector_db import get_vector_store
from app.langchain.conversation import get_conversation_chain

def get_app_langchain(file_path: str):
    load_dotenv()
    print(file_path)

    # get pdf text
    pdf_text = get_pdf_text(file_path)

    # get text cunks
    text_chunks = get_text_chunks(pdf_text)
    print(len(text_chunks))

    # create vector store
    vector_store = get_vector_store(text_chunks)

    # create conversation chain
    conversation = get_conversation_chain(vector_store)

    return conversation