import express from 'express';
import { roomController } from '../controllers/index.js';
const router = express.Router();

router.get('/', roomController.getAllRoom);
router.get('/detail/:id', roomController.getDetailRoom);
router.get('/khu', roomController.getRoomByKhu);
router.put('/updateprice', roomController.InsertPrice);
router.put('/updateguest', roomController.InsertGuest);
router.put('/updateroom', roomController.updateRoom);
router.post('/create', roomController.createRoom);
router.get('/checkday', roomController.checkDay);
router.get('/thongkemonth', roomController.thongKeMonth);
router.get('/getpriceroom/', roomController.getPriceByRoomId);

export default router;
