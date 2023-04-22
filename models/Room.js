import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
    'Room',
    new Schema({
        id: { type: ObjectId },
        name: { type: String, required: true },
        idKhu: { type: Number, required: true },
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
                ngaySinh: { type: String },
                diaChi: { type: String },
            },
        ],
    }),
);
