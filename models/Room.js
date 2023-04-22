import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
    'Room',
    new Schema({
        id: { type: ObjectId },
<<<<<<< HEAD
        name: { type: String, required: true },
        idKhu: { type: Number, required: true },
=======
        name: { type: String },
        idKhu: { type: Number },
>>>>>>> 08b79ba0d0377e9bb9f3afb1f8aafdf1e905d7b2
        tienPhong: [
            {
                tienTro: { type: Number },
                tienDien: { type: Number },
                chiPhiKhac: { type: Number },
                tongTien: { type: Number,  },
                initializationDate: {
                    type: Date,
                    default: Date.now,
                },
                expirationDate: {
                    type: Date,
                    default: function () {
                        return new Date(this.initializationDate.getTime() + 28 * 24 * 60 * 60 * 1000);
                    },
                },
            },
        ],
        khachThue: [
            {
                id: { type: ObjectId },
                fullName: { type: String },
                phone: { type: String },
                cccd: { type: String },
<<<<<<< HEAD
                ngaySinh: { type: String },
                diaChi: { type: String },
=======
>>>>>>> 08b79ba0d0377e9bb9f3afb1f8aafdf1e905d7b2
            },
        ],
    }),
);
