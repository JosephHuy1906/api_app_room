import Exception from '../exceptions/Exception.js';
import { Room } from '../models/index.js';
import moment from 'moment/moment.js';

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
    const data = await Room.findById(id);
    const day = moment().add(28, 'days').format('YYYY-MM-DD');
    data.tienThueThang.push(tienThueThang);
    data.expirationDate = day;
    data.isBaking = 0;
    await data.save();
    return data;
};
const getPriceByRoomId = async ({ id }) => {
    const data = await Room.findOne({ id: id }).select('tienThueThang');
    const tienThueThang = data.tienThueThang;
    return tienThueThang;
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
const getRoomByIdKhu = async (id, page) => {
    const detail = await Room.find({ khu: id }).limit(page);
    return detail;
};
const getDetailRoom = async (id) => {
    const detail = await Room.findById(id);
    return detail;
};
const getAllRoom = async (page) => {
    const data = await Room.find().limit(page);
    return data;
};
const checkTimeDay = async () => {
    const day = moment().format('YYYY-MM-DD');
    const data = await Room.find({ isBaking: 1 }, 'name khu expirationDate isBaking');
    const filter = { expirationDate: '2023-0-24', isBaking: 0 };
    if (filter) {
        const projection = { isBaking: 1 };
        await Room.find(filter, projection);
        await Room.updateMany(filter, { isBaking: 1 });
    }
    return data;
};
const thongKeMonth = async () => {
    const oldyear = moment().subtract(1, 'month');
    console.log(oldyear);

    const chart = Room.aggregate([
        {
            $match: {
                'tienThueThang.initializationDate': {
                    $gte: new Date(oldyear),
                    $lt: new Date(),
                },
            },
        },
        {
            $project: {
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
