import { google } from 'googleapis';
import { config } from '../utils/config.js';
const SCOPES = [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
];
let authClient = null;
let driveClient = null;
let sheetsClient = null;
export const getGoogleAuth = () => {
    if (authClient)
        return authClient;
    if (!config.googlePrivateKey || !config.googleServiceAccountEmail) {
        throw new Error('Google Service Account credentials are missing in environment variables.');
    }
    authClient = new google.auth.JWT({
        email: config.googleServiceAccountEmail,
        key: config.googlePrivateKey,
        scopes: SCOPES
    });
    return authClient;
};
export const getDrive = () => {
    if (driveClient)
        return driveClient;
    driveClient = google.drive({ version: 'v3', auth: getGoogleAuth() });
    return driveClient;
};
export const getSheets = () => {
    if (sheetsClient)
        return sheetsClient;
    sheetsClient = google.sheets({ version: 'v4', auth: getGoogleAuth() });
    return sheetsClient;
};
//# sourceMappingURL=googleAuth.js.map