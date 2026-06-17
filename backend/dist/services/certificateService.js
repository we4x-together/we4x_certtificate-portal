import { getSheets, getDrive } from './googleAuth.js';
import { config } from '../utils/config.js';
const SHEET_ID = config.googleSheetId;
export const findCertificateByEmail = async (email) => {
    if (!SHEET_ID)
        throw new Error('GOOGLE_SHEET_ID is not configured');
    const sheets = getSheets();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'A:D', // Assuming columns: Email, Name, Event Name, File ID
    });
    const rows = response.data.values;
    if (!rows || rows.length === 0)
        return null;
    // Skip header row and find match
    const match = rows.slice(1).find((row) => row[0]?.toLowerCase() === email.toLowerCase());
    if (!match)
        return null;
    return {
        email: match[0],
        name: match[1],
        eventName: match[2],
        fileId: match[3],
    };
};
export const getFileStream = async (fileId) => {
    const drive = getDrive();
    const response = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });
    return response.data;
};
export const getFileMetadata = async (fileId) => {
    const drive = getDrive();
    const response = await drive.files.get({
        fileId,
        fields: 'id, name, mimeType, size',
    });
    return response.data;
};
//# sourceMappingURL=certificateService.js.map