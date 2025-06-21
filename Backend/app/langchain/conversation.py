from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_anthropic import ChatAnthropic


def get_conversation_chain(vector_store):
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatAnthropic(model="claude-3-5-sonnet-20241022", temperature=0)

    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vector_store.as_retriever(),
        memory=memory,
    )
    return chain