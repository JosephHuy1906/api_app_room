import express from 'express';
import httpStatusCode from '../exceptions/httpStatusCode.js';
import { roomController } from '../controllers/index.js';
const router = express.Router();

router.get('/', roomController.getAllRoom);
router.get('/detail/:id', roomController.getDetailRoom);
router.put('/insertprice', roomController.InsertPrice);
router.put('/insertguest', roomController.InsertGuest);
router.post('/create', roomController.createRoom);

export default router;
