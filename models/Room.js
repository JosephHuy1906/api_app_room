import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';
export default mongoose.model(
    'Room',
    new Schema({
        id: { type: ObjectId },
        idKhu: { type: String },
        tienPhong: [
            {
                tienTro: { type: Number },
                tienDien: { type: Number },
                chiPhiKhac: { type: Number },
                tongTien: { type: Number },
            },
        ],
        khachThue: [
            {
                id: { type: ObjectId },
                fullName: { type: String },
                phone: {
                    type: String,
                    validate: {
                        validator: (phone) => phone.length <= 11,
                        message: 'phone number not length 12 characters',
                    },
                },
                cccd: [
                    {
                        matTruoc: { type: String },
                        matSau: { type: String },
                    },
                ],
            },
        ],
    }),
);
