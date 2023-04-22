import Exception from '../exceptions/Exception.js';
import { Partitiined } from '../models/index.js';

const getAllPart = async (req, res) => {
    const data = await Partitiined.find();
    return data;
};
const getDetailPart = async (id) => {
    const detail = await Partitiined.findById(id);
    return detail ?? {};
};
const insertPart = async ({ name, price: { tienNuoc, tienDien, tienRac, tienWifi } }) => {
    try {
        const room = await Partitiined.create({
            name,
            price: {
                tienNuoc,
                tienDien,
                tienRac,
                tienWifi,
            },
        });
    } catch (err) {
        if (!!err.errors) {
            throw new Exception('Input error', err.errors);
        } else {
            throw new Exception(Exception);
        }
    }
};
const updatePartPrice = async ({ id,name, tienNuoc, tienDien, tienRac, tienWifi }) => {
    let parti = await Partitiined.findById(id);

    parti.name = name ?? parti.name;
    parti.price.tienNuoc = tienNuoc ?? parti.price.tienNuoc;
    parti.price.tienDien = tienDien ?? parti.price.tienDien;
    parti.price.tienRac = tienRac ?? parti.price.tienRac;
    parti.price.tienWifi = tienWifi ?? parti.price.tienWifi;
    parti.save();
    return parti;
};
const deletePart = async () => {};

export default {
    getAllPart,
    getDetailPart,
    insertPart,
    deletePart,
    updatePartPrice,
};
