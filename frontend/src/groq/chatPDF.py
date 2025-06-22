import os
import fitz
import re
from dotenv import load_dotenv
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec

# File path to your PDF
PDF_FILE_PATH = "/Users/codygarcia/Downloads/groq-privacy-policy.pdf"

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
# 🔌 Clients
# --------------------------
openai_client = OpenAI(api_key=OPENAI_API_KEY)
groq_client = OpenAI(
api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)
pc = Pinecone(api_key=PINECONE_API_KEY)


# clean pdf name for index
def slugify_filename(file_path):
    filename = os.path.basename(file_path)
    name = os.path.splitext(filename)[0]
    name = name.lower()
    name = re.sub(r'[^a-z0-9-]+', '-', name)
    name = re.sub(r'[-]+', '-', name).strip('-')
    return name


# extract text from pdf
def extract_text_from_pdf(path):
    doc = fitz.open(path)
    return "\n".join(page.get_text() for page in doc)


# chunking text
def chunk_text(text, size=400, overlap=50):
    words = text.split()
    return [" ".join(words[i:i+size]) for i in range(0, len(words), size - overlap)]


# embed chunks
def embed_text(text):
    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=[text]
    )
    return response.data[0].embedding


# store chunks in pinecone
def store_pdf(file_path):
    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)
    index_name = slugify_filename(file_path)

    if index_name not in [idx.name for idx in pc.list_indexes()]:
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(cloud=PINECONE_CLOUD, region=PINECONE_REGION)
        )
    index = pc.Index(index_name)

    embeddings = [embed_text(c) for c in chunks]
    vectors = [(f"{index_name}-chunk-{i}", embeddings[i], {"text": chunks[i]}) for i in range(len(chunks))]
    index.upsert(vectors=vectors)

    return index_name


# ----------------------------------------------------------------------------------------------------------------------------------

# pdf summary with groq
def summarize_index(index_name, chunk_group_size=5):
    index = pc.Index(index_name)
    results = index.query(
        vector=embed_text("Summarize this document"),
        top_k=40,
        include_metadata=True
    )
    chunks = [match.metadata["text"] for match in results.matches]
    sections = [chunks[i:i+chunk_group_size] for i in range(0, len(chunks), chunk_group_size)]

    summary = ""
    for idx, section in enumerate(sections):
        context = "\n\n".join(section)
        prompt = f"""You are a helpful legal assistant. Summarize this section of a legal document in plain English.

Section {idx+1}:
{context}

Section {idx+1} Summary:"""

        response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4
        )
        summary += f"🔹 Section {idx+1}:\n{response.choices[0].message.content.strip()}\n\n"

    return summary.strip()



# pipeline
def summarize_pdf(file_path):
    print(f"📄 Processing file: {file_path}")
    index_name = store_pdf(file_path)
    print(f"📦 Stored chunks in index: {index_name}")
    summary = summarize_index(index_name)
    print(f"\n✅ Full Document Summary:\n\n{summary}")


# run
if __name__ == "__main__":
    # Use the PDF file from your Downloads folder
    summarize_pdf(PDF_FILE_PATH)