from langchain.text_splitter import RecursiveCharacterTextSplitter

def get_text_chunks(text: str):
    if not text:
        print("Empty text")
        return []
    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", " ", ""],
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    chunks = text_splitter.split_text(text)
    return chunks