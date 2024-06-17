from google.cloud import firestore
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Firestore client
db = firestore.Client()


def test_firestore():
    # Create a test document in the 'test' collection
    doc_ref = db.collection("test").document("test-doc")
    doc_ref.set({"name": "Test Document", "value": 123})

    # Retrieve the test document
    doc = doc_ref.get()
    if doc.exists:
        print(f"Document data: {doc.to_dict()}")
    else:
        print("No such document!")

    # Clean up: delete the test document
    # doc_ref.delete()


if __name__ == "__main__":
    test_firestore()
