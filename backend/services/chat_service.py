import uuid
import time
from utils.vector_store import check_and_find_vector_store
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import HumanMessage



def process_chat_message(message, chat_id=None, mood='neutral'):
    """
    Process a user message and generate a response
    
    Args:
        message (str): The user's message
        chat_id (str, optional): The unique ID for this chat session
        mood (str, optional): The user's current mood
    
    Returns:
        dict: Response data including the assistant's message
    """
    # If no chat_id is provided, create a new one
    if not chat_id:
        chat_id = str(uuid.uuid4())

    db = check_and_find_vector_store(mood)

    retriever = db.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3},
)
    
    relevant_docs = retriever.invoke(message)

    combined_input = (
    "Here are some documents that might help answer the question: "
    + message
   # + "\n\nRelevant Documents:\n"
   # + "\n\n".join([doc.page_content for doc in relevant_docs])
)
    
    llm = ChatOpenAI(model="gpt-4o")

    qa_system_prompt = (
    "You are a supportive mental health assistant designed to provide empathetic responses. "
    "Use your general knowledge to answer casual greetings and simple questions. "
    "For mental health related inquiries, primarily use information from the provided documents to give evidence-based guidance. "
    "Always maintain a warm, compassionate tone while providing practical support. "
    "If you don't know the answer or if the question requires professional medical advice, clearly acknowledge your limitations and suggest speaking with a mental health professional. "
    "Keep responses concise (five sentences maximum) while still showing empathy. "
    "Base your responses on the user's expressed mood when possible, tailoring your tone and advice accordingly."
)

    

    # Create a prompt template for answering questions
    qa_prompt =  [
        ("system", qa_system_prompt),
        HumanMessage(combined_input)
    ]
   
    
    print(qa_prompt)

    result = llm.invoke(qa_prompt)
    
    response_text = result.content
    
    # only for development
    time.sleep(0.5)
    
    return {
        "chat_id": chat_id,
        "response": response_text,
        "timestamp": time.time(),
    }

def start_new_chat(initial_mood='neutral'):
    """
    Initialize a new chat session
    
    Args:
        initial_mood (str, optional): The user's initial mood
    
    Returns:
        dict: New chat session data
    """
    chat_id = str(uuid.uuid4())
    
    # Initial greeting based on mood
    greetings = {
        'happy': "Hello! It's great that you're feeling good today. How can I support you?",
        'sad': "Hello. I'm here for you. Would you like to talk about what's making you feel down?",
        'anxious': "Hi there. I understand you're feeling anxious. Let's talk through it together.",
        'stressed': "Hello. I see you're feeling stressed. I'm here to listen and help if I can.",
        'neutral': "Hello! How can I assist you with your mental well-being today?"
    }
    
    greeting = greetings.get(initial_mood, greetings['neutral'])
    
    return {
        "chat_id": chat_id,
        "greeting": greeting,
        "timestamp": time.time()
    }