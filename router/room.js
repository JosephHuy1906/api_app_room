import express  from "express";
import httpStatusCode from "../exceptions/httpStatusCode.js";
const router = express.Router();


router.get('/', (req, res)=>{
    res.status(httpStatusCode.OK).json({message: "Trang Room"})
})

router.post('/create', (req, res)=>{
    const room = req.body;
    console.log(room);
    res.status(httpStatusCode.OK).json({message: "Trang Room"})
})


export default router;