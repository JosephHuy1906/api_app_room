import Exception from '../exceptions/Exception.js';
import { Room } from '../models/index.js';

const InsertRoom = async ({ idKhu, name, tienPhong = [], khachThue = [] }) => {
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
};

const InsertPrice = async ({ id, tienPhong }) => {
    const roomId = await Room.findById(id);
    roomId.tienPhong.push(tienPhong);
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

const getRoomById = async (id) => {
    const detail = await Room.findById(id);
    return detail ?? {};
};

const getAllRoom = async () => {
    const data = await Room.find();
    return data;
};

export default {
    getAllRoom,
    getRoomById,
    InsertRoom,
    UpdateRoom,
    InsertPrice,
    InsertGuest,
};
