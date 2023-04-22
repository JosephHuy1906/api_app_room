import httpStatusCode from '../exceptions/httpStatusCode.js';
import { partRepositories } from '../repositories/index.js';

const getAllPart = async (req, res) => {
    let data = await partRepositories.getAllPart();
    res.status(httpStatusCode.OK).json({
        message: 'get data successfully',
        data: data,
    });
};
const getDetailPart = async (req, res) => {};

const insertPart = async (req, res) => {
    const {
        name,
        price: { tienNuoc, tienDien, tienRac, tienWifi },
    } = req.body;
    try {
        const room = await partRepositories.insertPart(req.body);
        res.status(httpStatusCode.INSERT_OK).json({
            message: 'Insert partitiined successfuly',
            data: room,
        });
    } catch (err) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot Insert partitiined: ' + err,
        });
    }
};
const updatePart = async (req, res) => {};
const deletePart = async (req, res) => {};

export default {
    getAllPart,
    getDetailPart,
    insertPart,
    updatePart,
    deletePart,
};
