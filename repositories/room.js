import Exception from '../exceptions/Exception.js';
import { Room } from '../models/index.js';


const InsertRoom = async ({ idKhu, name, tienPhong,tienThueThang = [], khachThue = [] }) => {
    try {
        const room = await Room.create({
            idKhu,
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

const checkTimeDay = async () => {

    const collection = Room.find();
    const eventsCollection = context.services.get('mongodb-atlas').db('myDatabase').collection('events');
    const now = new Date();
    const docs = await collection.find({ active: true, expiration_date: { $lte: now } }).toArray();
    for (const doc of docs) {
        await eventsCollection.insertOne({ document_id: doc._id, event_type: 'document_expired', event_date: now });
    }
};

const UpdateRoom = async () => {};

const getRoomByIdKhu = async (id) => {
    const detail = await Room.find({khu: id})
    return detail;
};

const getAllRoom = async () => {
    const data = await Room.find();
    return data;
};

export default {
    getAllRoom,
    getRoomByIdKhu,
    InsertRoom,
    UpdateRoom,
    InsertPrice,
    InsertGuest,
};
