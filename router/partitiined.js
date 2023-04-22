import express from 'express';
import { partitiinedController } from '../controllers/index.js';
const router = express.Router();

router.get('/', partitiinedController.getAllPart);
router.get('/detail/:id', partitiinedController.getDetailPart);
router.post('/insert', partitiinedController.insertPart);
router.put('/update', partitiinedController.updatePart);


export default router;