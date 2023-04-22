import Exception from '../exceptions/Exception.js';
import { Partitiined } from '../models/index.js';

const getAllPart = async (req, res) => {
    const data = await Partitiined.find();
    return data;
};
const getDetailPart = async () =>{
    const detail = await Partitiined.findById(id);
    return detail ?? {};
}
const insertPart = async () =>{
    try {
        const room = await Room.create({
            idKhu,
            name,
            tienPhong,
            khachThue,
        });
    } catch (err) {
        if (!!err.errors) {
            throw new Exception('Input error', err.errors);
        } else {
            throw new Exception(Exception);
        }
    }
}
const updatePart = async () =>{}
const deletePart = async () =>{}

export default {
    getAllPart,
    getDetailPart,
    insertPart,
    updatePart,
    deletePart
}