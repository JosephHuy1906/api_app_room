import moment from 'moment/moment.js';
import Exception from '../exceptions/Exception.js';
import { Room } from '../models/index.js';

const InsertRoom = async ({ khu, name, tienPhong, tienThueThang = [], khachThue = [] }) => {
    try {
        const initializationDate = moment().format('YYYY-MM-DD');
        const expirationDate = moment().add(28, 'days').format('YYYY-MM-DD');
        const room = await Room.create({
            khu,
            name,
            tienPhong,
            tienThueThang,
            khachThue,
            initializationDate,
            expirationDate,
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
    try {
        const data = await Room.findById(id);
        const day = moment().add(28, 'days').format('YYYY-MM-DD');
        data.tienThueThang.push(tienThueThang);
        data.expirationDate = day;
        data.isBaking = 0;
        await data.save();
        return data;
    } catch (error) {
        throw new Exception(Exception.CANNOT_NOT_ID);
    }
};
const getPriceByRoomId = async ({ id }) => {
    try {
        const data = await Room.findOne({ id: id }).select('tienThueThang');
        const tienThueThang = data.tienThueThang;
        if (!detail) {
            throw new Exception(Exception.ERROR_EXIST_ROOM_ID);
        } else {
            return tienThueThang;
        }
    } catch (err) {
        throw new Exception(Exception.ERROR_EXIST_ROOM);
    }
};
const InsertGuest = async ({ id, khachThue }) => {
    try {
        const roomId = await Room.findById(id);
        roomId.khachThue.push(khachThue);
        await roomId.save();
        return roomId;
    } catch (error) {
        throw new Exception(Exception.CANNOT_NOT_ID);
    }
};
const UpdateRoom = async ({ id, name, tienPhong }) => {
    try {
        const data = await Room.findById(id);
        data.name = name ?? data.name;
        data.tienPhong = tienPhong ?? data.tienPhong;
        data.save();
        return data;
    } catch (error) {
        throw new Exception(Exception.CANNOT_NOT_ID);
    }
};
const getRoomByIdKhu = async (id, page) => {
    try {
        const detail = await Room.find({ khu: id }).limit(page);
        if (!detail) {
            throw new Exception(Exception.CANNOT_ROOM);
        } else {
            return detail;
        }
    } catch (err) {
        throw new Exception(Exception.ERROR_EXIST_ROOM);
    }
};
const getDetailRoom = async (id) => {
    try {
        const detail = await Room.findById(id);
        if (!detail) {
            throw new Exception(Exception.CANNOT_ROOM);
        } else {
            return detail;
        }
    } catch (err) {
        throw new Exception(Exception.ERROR_EXIST_ROOM);
    }
};
const getAllRoom = async (page) => {
    const data = await Room.find().limit(page);
    return data;
};
const checkTimeDay = async () => {
    const day = moment().format('YYYY-MM-DD');
    const data = await Room.find({ isBaking: 1 }, 'name khu expirationDate isBaking');
    const filter = { expirationDate: day, isBaking: 0 };
    if (filter) {
        const projection = { isBaking: 1 };
        await Room.find(filter, projection);
        await Room.updateMany(filter, { isBaking: 1 });
    }
    return data;
};
const thongKeMonth = async () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const chart = Room.aggregate([
        {
            $unwind: '$tienThueThang',
        },
        {
            $match: {
                'tienThueThang.initializationDate': { $gte: new Date(lastMonth), $lt: new Date(nextMonth) },
            },
        },
        {
            $group: {
                _id: { month: { $month: nextMonth }, year: { $year: nextMonth } },
                totalTongTien: { $sum: '$tienThueThang.tongTien' },
            },
        },
    ]);
    return chart;
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
    thongKeMonth,
    getPriceByRoomId,
};
