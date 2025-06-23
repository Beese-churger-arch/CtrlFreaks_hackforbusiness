
# MeroBiz – Business Companion for E-commerce

MeroBiz is a business companion platform designed primarily for e-commerce sites. It offers dynamic pricing, automated receipt processing, advanced fraud detection, an accessible dashboard, and an AI chatbot—all in one place.

---

## Features

- **Dynamic Pricing**
Calculates suitable discount percentages for products in a category using Google Trends data. Discounts never go below a set threshold, ensuring competitive pricing without hurting profits.
- **Receipt Processing**
Upload multiple PDF receipts. The processor extracts relevant data (transaction ID, amount, datetime, etc.) and exports it as a CSV file.
- **Fraudulent/Suspicious Transaction Detection**
Flags suspicious transactions using a machine learning model. Considers transaction details and session info (VPN/proxy use, failed attempts, multiple cards, etc.).
    - **Single Mode:** Manually input each variable.
    - **Batch Mode:** Upload a CSV file with multiple transactions.
- **Interactive Dashboard**
Navigate and visualize features through a user-friendly dashboard.
_Note: Currently uses hardcoded values._
- **Accessibility Switch**
Activates high-contrast mode and text-to-speech (TTS) on website elements, with tab and hover support.
- **AI Chatbot**
Uses Gemini API for general requests.
_Note: The chatbot currently does not have access to any internal data._

---

## Installation

**Requirements:**

- Node.js (see `package.json` for version)
- Python 3.13.1 (for ML server)
- Python dependencies : fastapi, uvicorn, pydantic, pandas, scikit-learn, joblib, python-multipart, PyMuPDF

**Steps:**

```bash
# In each directory (merobiz-back, merobiz, clone), run:
npm install
```


---

## Running the Demo

```bash
cd merobiz-back
npm run dev-all
```

This starts four servers, each with a terminal prefix:


| Prefix | Description | Port |
| :-- | :-- | :-- |
| 0 | Primary backend (Express) | 5000 |
| 1 | E-commerce clone for dynamic pricing demo | 4000 |
| 2 | Main frontend | 3000 |
| 3 | Python server (FastAPI, for ML features) | 8000 |

> **Note:** The e-commerce clone includes framework for features (like inventory tracking), but some features are not implemented.

---

## Using the Features

1. **Login or Sign Up**  
   Access the dashboard after authentication.

2. **Navigation**  
   Use the sidebar to access each section:

   ![Navbar screenshot](/screenshots/navbar.png)

   - **Home:** Interactive dashboard

    ![Dashboard screenshot](/screenshots/dashboard.png)

   - **Dynamic Pricing:** Link to the e-commerce clone.

   ![Dynamic Pricing screenshot](/screenshots/dynamicpricing.png)

   ![Clone site screenshot](/screenshots/clonepage.png)
   Main page of the clone site

   ![clone site product screenshot](/screenshots/productpage.png)
   Product page

    _Note: The crossed-out price is the base price, the red price is the calculated price, and the discount tag shows the Google Trends-based discount._
    - **Receipt Processing:**
    Upload one or more PDF receipts. Extracted data is shown in a table and exported as a CSV in `/merobiz-back`.

    ![Receipt Processing](/screenshots/receiptProcessing.png)

    - **Fraud Detection (Single):**
    Manually input transaction info, get a verdict and confidence score.

    ![Single input fraud detection](/screenshots/frauddetectorSingle.png)

    - **Fraud Detection (Batch):**
    Upload a CSV of transactions. Outputs a table with flagged transactions and the email that processed each for double-checking.

    ![Batch fraud detection](/screenshots/frauddetectionBatch.png)

    - **Other Sections:**
    Currently aesthetic, with no function.
    - **AI Chatbot:**

    ![Chatbot screenshot](/screenshots/chatbot.png)

---

## Accessibility
On webpage start there is a pop up that asks if you want to accesibility mode or not. The prompt will appear again on refresh.

- Toggle high-contrast mode and TTS for improved usability.
- Tab and hover support for easy navigation.
- High contrast mode has Black, White and Dark orange as primary colors for better readability.

---

## Troubleshooting

- If the app doesn’t load, check your Node.js and Python versions.
- For routing issues, ensure you’re using the latest React Router.
- For display issues, try toggling accessibility settings.

---

## Notes

- Some dashboard values are currently hardcoded for demo purposes.
- The AI chatbot does not have access to internal data yet.
- The e-commerce clone is for demonstration and may not have full feature implementation.

---