import httpStatusCode from '../exceptions/httpStatusCode.js';
import { roomRepositories } from '../repositories/index.js';

const getAllRoom = async (req, res) => {
    let page = req.query.page
    let data = await roomRepositories.getAllRoom(page);
    res.status(httpStatusCode.OK).json({
        message: 'get data successfully',
        data: data,
    });
};
const getRoomByKhu = async (req, res) => {
    let id = req.query.id;
    let page = req.query.page
    try {
        const us = await roomRepositories.getRoomByIdKhu(id);
        res.status(httpStatusCode.OK).json({
            message: 'get data successfully',
            data: us,
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: err.toString(),
        });
    }
};
const getDetailRoom = async (req, res) => {
    let id = req.params.id;
    try {
        const us = await roomRepositories.getDetailRoom(id);
        res.status(httpStatusCode.OK).json({
            message: 'get data successfully',
            data: us,
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: err.toString(),
        });
    }
};
const getPriceByRoomId = async (req, res) =>{
    let id = req.query.id;
    let page = req.query.page;

    try {
        const us = await roomRepositories.getPriceByRoomId(id, page);
        res.status(httpStatusCode.OK).json({
            message: 'get data successfully',
            data: us,
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: err.toString(),
        });
    }
}
const createRoom = async (req, res) => {
    try {
        const room = await roomRepositories.InsertRoom(req.body);
        res.status(httpStatusCode.INSERT_OK).json({
            message: 'Insert room successfuly',
            data: room,
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot Insert Room: ' + err,
        });
    }
};
const InsertPrice = async (req, res) => {
    const { id, tienThueThang } = req.body;

    try {
        const roomId = await roomRepositories.InsertPrice(req.body);
        res.status(httpStatusCode.INSERT_OK).json({
            message: 'Insert Price Room successfuly',
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot Insert Price Room: ' + err,
        });
    }
};
const InsertGuest = async (req, res) => {
    const { id, khachThue } = req.body;

    try {
        const roomId = await roomRepositories.InsertGuest(req.body);
        res.status(httpStatusCode.INSERT_OK).json({
            message: 'Insert Guest Room successfuly',
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot Insert Guest Room: ' + err,
        });
    }
};

const updateRoom = async (req, res) => {
    const { id, name, tienPhong } = req.body;

    try {
        const roomId = await roomRepositories.UpdateRoom(req.body);
        res.status(httpStatusCode.INSERT_OK).json({
            message: 'Update Room successfuly',
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot Insert Price Room: ' + err,
        });
    }
};
const checkDay = async (req, res) => {
    const check = await roomRepositories.checkTimeDay();
    res.status(httpStatusCode.OK).json({ data: check, message: 'Phòng đến hạn nộp tiền' });
};
const deleteRoom = async (req, res) => {};
const thongKeMonth = async (req, res) => {
    const data = await roomRepositories.thongKeMonth();
    res.status(httpStatusCode.OK).json({ data: data, message: 'Thành công' });
};
export default {
    getAllRoom,
    getDetailRoom,
    createRoom,
    deleteRoom,
    InsertPrice,
    InsertGuest,
    updateRoom,
    getRoomByKhu,
    checkDay,
    thongKeMonth,
    getPriceByRoomId
};
