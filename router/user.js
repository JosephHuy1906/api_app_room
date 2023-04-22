import express from 'express';
const router = express.Router();
import { userController } from '../controllers/index.js';


router.get('/', userController.getAll);
router.get('/detail/:id', userController.getDetail);
router.post('/login', userController.login);
router.post('/register', userController.register);

export default router;
