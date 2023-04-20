import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
    'Partitiined',
    new Schema({
        id: { type: ObjectId },
        name: { type: String, required: true },
        price: [
            {
                tienNuoc: { type: Number },
                tienDien: { type: Number },
                tienRac: { type: Number },
                tienWifi: { type: Number },
            },
        ],
    }),
);
