import { Router } from 'express';
import * as certificateController from '../controllers/certificateController.js';
const router = Router();
router.post('/find', certificateController.findCertificate);
router.get('/download/:fileId', certificateController.downloadCertificate);
router.get('/preview/:fileId', certificateController.previewCertificate);
export default router;
//# sourceMappingURL=certificateRoutes.js.map