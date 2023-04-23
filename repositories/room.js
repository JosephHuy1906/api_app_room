import Exception from '../exceptions/Exception.js';
import { Room } from '../models/index.js';
import moment from 'moment/moment.js';

const InsertRoom = async ({ khu, name, tienPhong, tienThueThang = [], khachThue = [] }) => {
    try {
        const room = await Room.create({
            khu,
            name,
            tienPhong,
            tienThueThang,
            khachThue,
        });
    } catch (err) {
        if (!!err.errors) {
            throw new Exception('Input error', err.errors);
        } else {
            throw new Exception(Exception);
        }
    }
};

const InsertPrice = async ({ id, tienThueThang }) => {
    const roomId = await Room.findById(id);
    roomId.tienThueThang.push(tienThueThang);
    await roomId.save();
    return roomId;
};
const InsertGuest = async ({ id, khachThue }) => {
    const roomId = await Room.findById(id);
    roomId.khachThue.push(khachThue);
    await roomId.save();
    return roomId;
};

const UpdateRoom = async ({ id, name, tienPhong }) => {
    const data = await Room.findById(id);
    data.name = name ?? data.name;
    data.tienPhong = tienPhong ?? data.tienPhong;
    data.save();
    return data;
};

const getRoomByIdKhu = async (id) => {
    const detail = await Room.find({ khu: id });
    return detail;
};
const getDetailRoom = async (id) => {
    const detail = await Room.findById(id);
    return detail;
};
const getAllRoom = async () => {
    const data = await Room.find();
    return data;
};

const checkTimeDay = async () => {
    const day = moment().format("YYYY-MM-DD")
    const data = await Room.find({"tienThueThang.expirationDate": "2023-05-20"},{});
    console.log(data);
};

export default {
    getAllRoom,
    getRoomByIdKhu,
    getDetailRoom,
    InsertRoom,
    UpdateRoom,
    InsertPrice,
    InsertGuest,
    checkTimeDay,
};
