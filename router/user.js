import express from 'express';
const router = express.Router();
import { userController } from '../controllers/index.js';
import { body, validationResult } from 'express-validator';
import httpStatusCode from '../exceptions/httpStatusCode.js';

router.get('/', userController.getAll);
router.get('/:id', userController.getDetail);

router.post('/login', userController.login);

router.post('/register', userController.register);

export default router;
