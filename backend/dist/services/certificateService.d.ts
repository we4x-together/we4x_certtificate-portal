export interface CertificateData {
    email: string;
    name: string;
    eventName: string;
    fileId: string;
}
export declare const findCertificateByEmail: (email: string) => Promise<CertificateData | null>;
export declare const getFileStream: (fileId: string) => Promise<any>;
export declare const getFileMetadata: (fileId: string) => Promise<any>;
//# sourceMappingURL=certificateService.d.ts.map