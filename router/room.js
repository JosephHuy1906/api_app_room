import express from 'express';
import { roomController } from '../controllers/index.js';
const router = express.Router();

router.get('/', roomController.getAllRoom);
router.get('/detail/:id', roomController.getDetailRoom);
router.put('/updateprice', roomController.InsertPrice);
router.put('/updateguest', roomController.InsertGuest);
router.post('/create', roomController.createRoom);

export default router;
