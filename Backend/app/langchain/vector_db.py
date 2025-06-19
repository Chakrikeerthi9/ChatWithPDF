from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings


def get_vector_store(text_chunks):
    embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    vector_store = FAISS.from_texts(texts=text_chunks, embedding=embedding_model)
    print("Vector store created")
    print(f"Total vectors in index: {vector_store.index.ntotal}")
    return vector_store

