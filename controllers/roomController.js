import httpStatusCode from '../exceptions/httpStatusCode.js';
import { roomRepositories } from '../repositories/index.js';

const getAllRoom = async (req, res) => {
    let data = await roomRepositories.getAllRoom();
    res.status(httpStatusCode.OK).json({
        message: 'get data successfully',
        data: data,
    });
};
const getDetailRoom = async (req, res) => {
    let id = req.params.id;
    try {
        const us = await roomRepositories.getRoomById(id);
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
        res.status(httpStatusCode.OK).json({
            message: 'Insert Guest Room successfuly',
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot Insert Guest Room: ' + err,
        });
    }
};

const updateGuest = async (req, res) => {};
const getIdGuest = async (req, res) => {};
const deleteRoom = async (req, res) => {};

export default {
    getAllRoom,
    getDetailRoom,
    createRoom,
    deleteRoom,
    InsertPrice,
    InsertGuest,
    updateGuest,
    getIdGuest,
};
