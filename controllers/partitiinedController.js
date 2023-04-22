import httpStatusCode from '../exceptions/httpStatusCode.js';
import { partRepositories } from '../repositories/index.js';

const getAllPart = async (req, res) => {
    let data = await partRepositories.getAllPart();
    res.status(httpStatusCode.OK).json({
        data: data,
    });
};
const getDetailPart = () => {};
const insertPart = () => {};
const updatePart = () => {};
const deletePart = () => {};

export default {
    getAllPart,
    getDetailPart,
    insertPart,
    updatePart,
    deletePart,
};
