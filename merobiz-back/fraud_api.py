import joblib
import pandas as pd
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from typing import List
from fastapi import UploadFile, File


#loading the model
model = joblib.load("fraud_detector.pkl")

#process the raw input into names and format the model expects
feature_names = [
    'cat__category_Beauty', 'cat__category_Electronics', 'cat__category_Fashion',
    'cat__category_Groceries', 'cat__category_Home Appliances', 'remainder__acc_days',
    'remainder__failed_logins', 'remainder__is_vpn_or_proxy', 'remainder__transaction_amount',
    'remainder__is_card_blacklisted', 'remainder__is_multiple_cards_used', 'remainder__items_quantity',
    'remainder__pages_viewed', 'remainder__device_change_during_session', 'remainder__purchase_frequency_user'
]

#helper function to the prediction function
def prepare_features(raw_input, feature_names):
    sample = {f: 0 for f in feature_names if f.startswith("cat__category_")}
    category_col = "cat__category_" + raw_input["category"]
    if category_col not in feature_names:
        raise ValueError(f"Unknown category '{raw_input['category']}'")
    sample[category_col] = 1
    for f in feature_names:
        if f.startswith("remainder__"):
            key = f.replace("remainder__", "")
            sample[f] = raw_input.get(key, 0)
    return sample

#prediction function (with confidence %)
def predict_fraud_with_confidence(raw_input):
    sample = prepare_features(raw_input, feature_names)
    df = pd.DataFrame([sample])
    pred = model.predict(df)[0]
    prob = model.predict_proba(df)[0][1]
    return {
        "fraudulent": bool(pred),
        "confidence": float(round(prob, 5))
    }



#api creation

app = FastAPI()

origins = [
    "http://localhost:3000",  # React dev server origin
    # add more if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FraudInput(BaseModel):
    category: str
    acc_days: int
    failed_logins: int
    is_vpn_or_proxy: bool
    transaction_amount: float
    is_card_blacklisted: bool
    is_multiple_cards_used: bool
    items_quantity: int
    pages_viewed: int
    device_change_during_session: bool
    purchase_frequency_user: float

@app.post("/predict")
def predict(data: FraudInput):
    raw_input = data.model_dump()
    try:
        result = predict_fraud_with_confidence(raw_input)
        return result
    except Exception as e:
        return {"error": str(e)}
    

@app.post("/predict-batch")
async def predict_batch(file: UploadFile = File(...)):
    content = await file.read()
    df = pd.read_csv(io.StringIO(content.decode("utf-8")))

    results = []

    for index, row in df.iterrows():
        raw_input = row.to_dict()
        
        # Extract only model-required fields
        model_input = {k: raw_input.get(k) for k in FraudInput.model_fields.keys()}

        try:
            result = predict_fraud_with_confidence(model_input)

            if result["fraudulent"]:
                # Merge optional extra fields like email/contact
                extra_fields = {
                    k: raw_input[k] for k in raw_input.keys()
                    if k not in FraudInput.model_fields.keys()
                }

                results.append({
                    "index": index,
                    **result,
                    **model_input,
                    **extra_fields
                })

        except Exception as e:
            results.append({
                "index": index,
                "error": str(e)
            })

    return results


import os
import csv

# Make sure you import the invoice extraction code parts from before:
import fitz  # PyMuPDF
import re
from datetime import datetime

# Reuse wanted fields list
wanted_fields = [
    'Transaction Date',
    'Transaction ID',
    'Feature Name',
    'Product Name',
    'Total Amount',
    'Transaction Type',
    'Channel',
    'Status',
    'Remarks'
]

def extract_text_from_pdf(pdf_bytes):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    print("==== Extracted Text ====")
    print(text)
    print("========================")
    return text

def parse_invoice_text(text):
    result = {}
    lines = text.split('\n')

    for idx, line in enumerate(lines):
        for field in wanted_fields:
            if field.lower() in line.lower().strip(":").strip():
                if idx + 1 < len(lines):
                    value = lines[idx + 1].strip()
                    if value != "":
                        result[field] = value
                break

    # Clean and convert Total Amount to float
    if "Total Amount" in result:
        try:
            clean_val = result["Total Amount"].replace(",", "")
            result["Total Amount"] = float(clean_val)
        except Exception:
            pass

    # Parse and standardize date format
    if "Transaction Date" in result:
        try:
            dt = datetime.strptime(result["Transaction Date"], "%d-%b-%Y,%I:%M %p")
            result["Transaction Date"] = dt.strftime("%Y-%m-%d %H:%M:%S")
        except Exception:
            pass

    # Fill missing fields with empty strings
    for field in wanted_fields:
        if field not in result:
            result[field] = ""

    return result


@app.post("/upload-invoices-pdf/")
async def upload_invoices_pdf(files: List[UploadFile] = File(...)):
    csv_file = "invoice_data.csv"
    file_exists = os.path.isfile(csv_file)
    
    all_data = []
    
    with open(csv_file, mode='a', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=wanted_fields)
        if not file_exists:
            writer.writeheader()
        
        for file in files:
            pdf_bytes = await file.read()
            text = extract_text_from_pdf(pdf_bytes)
            data = parse_invoice_text(text)
            writer.writerow(data)
            all_data.append({"filename": file.filename, "extracted_data": data})
    
    return {"message": f"{len(files)} files processed and appended.", "results": all_data}