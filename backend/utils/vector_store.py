import os
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings


def get_file_path(mood: str) -> os.path:
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "pdfs")

    file_path = os.path.join(base_dir, mood + '.pdf')

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file {file_path} does not exist. Please check the path.")
    return file_path
    
def check_and_find_vector_store(mood: str) -> Chroma:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    database_directory = os.path.join(current_dir, "..", "db")
    embedding_function = OpenAIEmbeddings(model="text-embedding-3-small")
    persist_directory = os.path.join(database_directory, mood)

    if os.path.exists(database_directory):
        return Chroma(
            persist_directory=persist_directory,
            embedding_function=embedding_function)
    else:
        print(f"Persistent directory does not exist. Initializing vector store for mood = {mood}...")

        file_path = get_file_path(mood)

        loader = PyPDFLoader(file_path)
        documents = loader.load()
    
        rec_char_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=100)
        rec_char_docs = rec_char_splitter.split_documents(documents)

        return  Chroma.from_documents(
        rec_char_docs, embedding_function, persist_directory=persist_directory)

