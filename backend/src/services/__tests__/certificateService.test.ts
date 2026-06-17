import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as certificateService from '../certificateService.js';
import * as googleAuth from '../googleAuth.js';

vi.mock('../googleAuth', () => ({
  getSheets: vi.fn(),
  getDrive: vi.fn(),
}));

describe('certificateService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findCertificateByEmail', () => {
    it('should return certificate data when email is found', async () => {
      const mockSheets = {
        spreadsheets: {
          values: {
            get: vi.fn().mockResolvedValue({
              data: {
                values: [
                  ['Email', 'Name', 'Event', 'FileID'],
                  ['test@example.com', 'Test User', 'Event 1', 'file123'],
                ],
              },
            }),
          },
        },
      };
      (googleAuth.getSheets as any).mockReturnValue(mockSheets);

      const result = await certificateService.findCertificateByEmail('test@example.com');

      expect(result).toEqual({
        email: 'test@example.com',
        name: 'Test User',
        eventName: 'Event 1',
        fileId: 'file123',
      });
    });

    it('should return null when email is not found', async () => {
      const mockSheets = {
        spreadsheets: {
          values: {
            get: vi.fn().mockResolvedValue({
              data: {
                values: [
                  ['Email', 'Name', 'Event', 'FileID'],
                  ['other@example.com', 'Other User', 'Event 1', 'file456'],
                ],
              },
            }),
          },
        },
      };
      (googleAuth.getSheets as any).mockReturnValue(mockSheets);

      const result = await certificateService.findCertificateByEmail('notfound@example.com');

      expect(result).toBeNull();
    });

    it('should return null when sheet is empty', async () => {
      const mockSheets = {
        spreadsheets: {
          values: {
            get: vi.fn().mockResolvedValue({
              data: {
                values: [],
              },
            }),
          },
        },
      };
      (googleAuth.getSheets as any).mockReturnValue(mockSheets);

      const result = await certificateService.findCertificateByEmail('test@example.com');

      expect(result).toBeNull();
    });
  });
});
