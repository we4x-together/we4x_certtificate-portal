import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 5000,
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/^"/, '').replace(/"$/, ''),
  googleSheetId: process.env.GOOGLE_SHEET_ID,
  googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export const validateConfig = () => {
  const requiredFields = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_PRIVATE_KEY',
    'GOOGLE_SHEET_ID',
    'GOOGLE_DRIVE_FOLDER_ID',
  ];

  const missingFields = requiredFields.filter((field) => !process.env[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required environment variables: ${missingFields.join(', ')}`);
  }

  if (!config.googlePrivateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY is invalid or missing');
  }
};
