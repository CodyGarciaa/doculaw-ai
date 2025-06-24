import os
import fitz
import re
import time
from dotenv import load_dotenv
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
from supabase import create_client, Client

# File path to your PDF
# PDF_FILE_PATH = "/Users/codygarcia/Downloads/groq-privacy-policy.pdf"
PDF_FILE_PATH = "/Users/codygarcia/Downloads/Anthropic-on-Bedrock-Commercial-Terms-of-Service_Dec_2023.pdf"

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
supabase: Client = create_client(os.getenv("PUBLIC_SUPABASE_URL"), os.getenv("PUBLIC_SUPABASE_KEY"))
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
    return name[:45]

def upload_to_bucket(file_path: str):
    """
    Uploads the PDF file to the configured Supabase bucket.
    Returns the public URL of the uploaded PDF.
    """
    bucket = supabase.storage.from_("docupdfs")
    file_name = slugify_filename(file_path)
    # Upload file directly from local path, preserving original PDF
    with open(file_path, "rb") as pdf_file:
        res = bucket.upload(
            (file_name + '.pdf'),    # the key/path in your bucket
            pdf_file      # a file-like object
        )


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

# make sure index finished initializing/uploading
def wait_for_index_ready(index, min_vectors=1, timeout=30):
    """Silently waits until Pinecone index is ready with at least `min_vectors` vectors."""
    for _ in range(timeout):
        try:
            stats = index.describe_index_stats()
            if stats and stats.get("total_vector_count", 0) >= min_vectors:
                return
        except Exception:
            pass
        time.sleep(1)


# pdf summary with groq
def summarize_index(index_name, chunk_group_size=5):
    index = pc.Index(index_name)
    wait_for_index_ready(index)

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
    # summarize_pdf(PDF_FILE_PATH)
    upload_to_bucket(PDF_FILE_PATH)