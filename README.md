# Certificate Finder

A modern and responsive web application to retrieve and download event certificates from Google Drive based on an email address.

## Features
- **Modern UI:** Clean, professional, and mobile-friendly interface built with React and Vanilla CSS.
- **Secure Integration:** Backend built with Node.js/Express using Google Service Account for secure API access.
- **Easy Management:** Certificates are mapped using a simple Google Sheet.
- **Security:** Rate limiting, environment variable configuration, and secure file proxying.

## Prerequisites
- Node.js (v18 or higher)
- A Google Cloud Project
- A Google Service Account
- A Google Sheet for data mapping
- A Google Drive folder containing the certificates
### Setup Instructions

#### 1. Root Management (Recommended)
You can now manage both the backend and frontend from the project root:
1.  Install all dependencies:
    ```bash
    npm run install:all
    ```
2.  Start both development servers:
    ```bash
    npm run dev
    ```
3.  Build both for production:
    ```bash
    npm run build
    ```

#### 2. Google Cloud Configuration
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
...

2.  Create a new project.
3.  Enable the **Google Drive API** and **Google Sheets API**.
4.  Navigate to **IAM & Admin > Service Accounts**.
5.  Create a Service Account and download the **JSON Key**.
6.  Note the `client_email` and `private_key` from the JSON file.

### 2. Google Sheet & Drive Setup
1.  Create a Google Sheet with the following columns in order:
    -   `Email`
    -   `Name`
    -   `Event Name`
    -   `File ID` (The ID of the certificate PDF in Google Drive)
2.  Share both the Google Sheet and the Google Drive folder with your Service Account's email address (with "Viewer" access).
3.  Note the **Sheet ID** (from the URL) and the **Folder ID**.

### 3. Backend Setup
1.  Navigate to the `backend` directory.
2.  Create a `.env` file based on `.env.example`:
    ```env
    PORT=5000
    GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
    GOOGLE_SHEET_ID=your-google-sheet-id
    GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id
    CORS_ORIGIN=http://localhost:5173
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

### 4. Frontend Setup
1.  Navigate to the `frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Folder Structure
- `backend/`: Node.js/Express server with TypeScript.
- `frontend/`: React/Vite application with TypeScript.
- `plans/`: Implementation plans and documentation.

## Security Notes
- Ensure your `.env` file is never committed to source control.
- The `GOOGLE_PRIVATE_KEY` must include the full block including the begin/end tags and line breaks (`\n`).
# we4x_certtificate-portal
