import csv
import json
import requests
import os
import fitz  # PyMuPDF

# File path and API endpoint


def read_txt(file_path):
    """Read a .txt file where each line is 'name,email'."""
    formatted_data = []
    with open(file_path, 'r') as file:
        for line in file:
            line = line.strip()
            if not line:
                continue
            name, email = line.split(',')
            formatted_entry = {
                "title": name.strip(),
                "body": email.strip()
            }
            formatted_data.append(formatted_entry)
    return formatted_data

def read_csv(file_path):
    """Read a .csv file with headers 'name,email'."""
    formatted_data = []
    with open(file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            formatted_entry = {
                "title": row["name"].strip(),
                "body": row["email"].strip()
            }
            formatted_data.append(formatted_entry)
    return formatted_data

def read_pdf(file_path):
    """Read a .pdf file assuming each line has 'name,email'."""
    formatted_data = []
    pdf_document = fitz.open(file_path)
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        text = page.get_text()
        lines = text.split('\n')
        for line in lines:
            line = line.strip()
            if not line or ',' not in line:
                continue
            name, email = line.split(',', 1)
            formatted_entry = {
                "title": name.strip(),
                "body": email.strip()
            }
            formatted_data.append(formatted_entry)
    print("Formatted data from PDF:", formatted_data)
    return formatted_data

def read_and_format_file(file_path):
    """Read file based on extension and format its data."""
    _, ext = os.path.splitext(file_path)
    if ext.lower() == '.txt':
        return read_txt(file_path)
    elif ext.lower() == '.csv':
        return read_csv(file_path)
    elif ext.lower() == '.pdf':
        return read_pdf(file_path)
    else:
        raise ValueError("Unsupported file type. Only .txt, .csv, and .pdf are allowed.")

def send_data_to_api(data, api_url):
    """Send each entry to the API."""
    for item in data:
        response = requests.post(api_url, json=item)
        if response.status_code == 201:
            print(f"Successfully sent: {item}")
        else:
            print(f"Failed to send {item}. Status code: {response.status_code}")