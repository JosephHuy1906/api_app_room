import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
    'Partitiined',
    new Schema({
        id: { type: ObjectId },
        name: { type: String, required: true },
        price: {
            tienNuoc: { type: Number, required: true },
            tienDien: { type: Number, required: true },
            tienRac: { type: Number, required: true },
            tienWifi: { type: Number, required: true },
        },
    }),
);
