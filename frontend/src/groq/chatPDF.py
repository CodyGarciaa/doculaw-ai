import os
import re
from dotenv import load_dotenv
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'supabase'))
from client import supabase
from openai import OpenAI
import pinecone
from typing import List, Dict

# ----------------------------------
# 🔐 Load environment variables
# ----------------------------------
load_dotenv()

SUPABASE_URL      = os.getenv("PUBLIC_SUPABASE_URL")
SUPABASE_KEY      = os.getenv("PUBLIC_SUPABASE_KEY")
PINECONE_API_KEY  = os.getenv("PINECONE_API_KEY")
PINECONE_ENV      = "aws-us-east-1"
OPENAI_API_KEY    = os.getenv("OPENAI_API_KEY")
GROQ_API_KEY      = os.getenv("GROQ_API_KEY")

# ----------------------------------
# 🛠 Initialize clients
# ----------------------------------

# Pinecone init + environment
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_ENV)

# OpenAI (embeddings) and Groq (LLM) clients
openai_client = OpenAI(api_key=OPENAI_API_KEY)
groq_client   = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

# ----------------------------------
# 📂 Helpers for index naming & chat history
# ----------------------------------
def slugify(name: str, max_len: int = 45) -> str:
    """
    Convert a string into a Pinecone-safe index name:
    - lowercase alphanumeric + hyphens
    - max length
    """
    # replace invalid chars with hyphens
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', name).lower()
    # collapse multiple hyphens & trim
    slug = re.sub(r'-+', '-', slug).strip('-')
    return slug[:max_len]


def load_pdf_record(pdf_id: str) -> (str, List[Dict[str, str]]):
    """
    Fetch PDF record from Supabase:
    - name: original filename
    - chat_history: existing list of {role, content}
    """
    resp = supabase.table('pdfs') \
        .select('name, chat_history') \
        .eq('id', pdf_id) \
        .single() \
        .execute()
    data = resp.data
    if not data:
        raise ValueError(f"PDF with id={pdf_id} not found in Supabase.")
    name = data.get('name')
    history = data.get('chat_history') or []
    return name, history


def save_chat_history(pdf_id: str, chat_history: List[Dict[str, str]]):
    """
    Update the chat_history JSONB column for this PDF
    """
    supabase.table('pdfs') \
        .update({'chat_history': chat_history}) \
        .eq('id', pdf_id) \
        .execute()

# ----------------------------------
# 🧠 Embedding & Retrieval
# ----------------------------------
def embed_question(question: str) -> List[float]:
    """Embed the user's question using OpenAI."""
    resp = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=[question]
    )
    return resp.data[0].embedding


def query_index(index_name: str, vector: List[float], top_k: int = 5) -> List[str]:
    """
    Query Pinecone index for top_k similar chunks.
    Returns a list of chunk texts.
    """
    idx = pinecone.Index(index_name)
    resp = idx.query(
        vector=vector,
        top_k=top_k,
        include_metadata=True
    )
    return [match.metadata['text'] for match in resp.matches]

# ----------------------------------
# 💬 Prompt Construction & LLM
# ----------------------------------
def build_prompt(
    chat_history: List[Dict[str, str]],
    context_chunks: List[str],
    question: str
) -> List[Dict[str, str]]:
    """
    Build the message list for the chat completion.
    """
    prompt = [
        {"role": "system", "content": (
            "You are a helpful assistant answering PDF questions. "
            "Use only the provided context. If the answer is not in the context, say you don't know."
        )}
    ]
    # add past conversation
    prompt.extend(chat_history)
    # add current context + question
    context_block = "\n\n".join(context_chunks)
    user_block = f"Context:\n{context_block}\n\nQuestion: {question}"
    prompt.append({"role": "user", "content": user_block})
    return prompt


def ask_groq(prompt: List[Dict[str, str]]) -> str:
    """
    Send the prompt to Groq LLM and return the assistant's reply.
    """
    resp = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=prompt,
        temperature=0.5
    )
    return resp.choices[0].message.content.strip()

# ----------------------------------
# 🔄 Chat Function
# ----------------------------------
def chat_with_pdf(pdf_id: str, question: str) -> str:
    """
    Full chat turn:
      - load or create chat_history
      - embed & retrieve
      - build prompt
      - call Groq
      - append & save history
      - return answer
    """
    # 1️⃣ load PDF record and history
    pdf_name, chat_history = load_pdf_record(pdf_id)
    # 2️⃣ derive Pinecone index name from filename
    index_name = slugify(pdf_name)
    # 3️⃣ embed question
    q_vec = embed_question(question)
    # 4️⃣ retrieve relevant chunks
    chunks = query_index(index_name, q_vec)
    # 5️⃣ build full prompt
    prompt = build_prompt(chat_history, chunks, question)
    # 6️⃣ get answer from Groq
    answer = ask_groq(prompt)
    # 7️⃣ update history & persist
    chat_history.append({"role": "user", "content": question})
    chat_history.append({"role": "assistant", "content": answer})
    save_chat_history(pdf_id, chat_history)
    return answer

# ----------------------------------
# 🚀 CLI Entry Point
# ----------------------------------
def main():
    print("📄 PDF Chatbot CLI")
    pdf_id = input("Enter PDF ID: ").strip()
    print(f"Loaded PDF session: {pdf_id}\n")
    while True:
        q = input("You: ")
        if not q or q.lower() in ('exit', 'quit'):
            print("Exiting chat. Goodbye!")
            break
        ans = chat_with_pdf(pdf_id, q)
        print(f"Assistant: {ans}\n")

if __name__ == "__main__":
    main()