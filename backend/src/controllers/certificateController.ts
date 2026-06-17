import type { Request, Response, NextFunction } from 'express';
import * as certificateService from '../services/certificateService.js';

export const findCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const certificate = await certificateService.findCertificateByEmail(email);

    if (!certificate) {
      return res.status(404).json({ error: 'No certificate found for this email address.' });
    }

    res.json(certificate);
  } catch (error) {
    next(error);
  }
};

export const downloadCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId } = req.params;

    if (!fileId || typeof fileId !== 'string') {
      return res.status(400).json({ error: 'File ID is required.' });
    }

    const metadata = await certificateService.getFileMetadata(fileId);
    const stream = await certificateService.getFileStream(fileId);

    res.setHeader('Content-Type', metadata.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${metadata.name}"`);

    (stream as any).pipe(res);
  } catch (error) {
    next(error);
  }
};

export const previewCertificate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileId } = req.params;

    if (!fileId || typeof fileId !== 'string') {
      return res.status(400).json({ error: 'File ID is required.' });
    }

    const metadata = await certificateService.getFileMetadata(fileId);
    const stream = await certificateService.getFileStream(fileId);

    // Serve inline so browsers render PDF in iframe if supported
    res.setHeader('Content-Type', metadata.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${metadata.name}"`);

    (stream as any).pipe(res);
  } catch (error) {
    next(error);
  }
};
