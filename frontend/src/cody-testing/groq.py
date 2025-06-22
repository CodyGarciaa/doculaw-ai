import os
from dotenv import load_dotenv
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec

# --------------------------
# 🔐 Load API Keys & Config
# --------------------------
load_dotenv()

OPENAI_API_KEY   = os.getenv("OPENAI_API_KEY")
GROQ_API_KEY     = os.getenv("GROQ_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")    # defined in .env file

PINECONE_CLOUD  = 'aws'
PINECONE_REGION = 'us-east-1'       # free Pinecone tiers
INDEX_NAME      = "legal-search"
DIMENSION       = 1536  # must match embedding size

# --------------------------
# 🔌 OpenAI / Groq Clients
# --------------------------
openai_client = OpenAI(api_key=OPENAI_API_KEY)

groq_client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

# --------------------------
# 🧠 Pinecone Init + Index Creation
# --------------------------
pc = Pinecone(api_key=PINECONE_API_KEY)

# list_indexes() returns a list of existing index names
existing = pc.list_indexes()
if INDEX_NAME not in existing:
    pc.create_index(
        name=INDEX_NAME,
        dimension=DIMENSION,
        metric="cosine",
        spec=ServerlessSpec(
            cloud=PINECONE_CLOUD,
            region=PINECONE_REGION
        )
    )

index = pc.Index(INDEX_NAME)

# --------------------------
# ✂️ Chunk + Embed Text
# --------------------------
def embed_text(text: str):
    resp = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=[text]
    )
    return resp.data[0].embedding

def chunk_document(text: str, size: int = 400, overlap: int = 50):
    words = text.split()
    return [
        " ".join(words[i : i + size])
        for i in range(0, len(words), size - overlap)
    ]

# --------------------------
# 📦 Upsert into Pinecone
# --------------------------
def upload_document(text: str):
    chunks     = chunk_document(text)
    embeddings = [embed_text(c) for c in chunks]
    vectors    = [
        (f"chunk-{i}", embeddings[i], {"text": chunks[i]})
        for i in range(len(chunks))
    ]
    index.upsert(vectors=vectors)

# --------------------------
# 🔍 Query Pinecone
# --------------------------
def search_chunks(query: str, top_k: int = 3):
    q_vec   = embed_text(query)
    results = index.query(vector=q_vec, top_k=top_k, include_metadata=True)
    return [match.metadata["text"] for match in results.matches]

# --------------------------
# 💬 Answer via Groq LLM
# --------------------------
def answer_with_context(query: str):
    ctx = "\n\n".join(search_chunks(query))
    prompt = f"""You are a helpful legal assistant. Use the context below to answer in plain language.

Context:
{ctx}

Question: {query}
Answer:"""

    resp = groq_client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )
    return resp.choices[0].message.content

# --------------------------
# 🚀 Main
# --------------------------
if __name__ == "__main__":
    sample_doc = """
    According to California Civil Code Section 1946, landlords must give at least 30 days’ notice...
    """
    upload_document(sample_doc)

    question = "What happens if a landlord evicts without notice?"
    print("\n📘 Answer:\n", answer_with_context(question))