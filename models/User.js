import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

const User = mongoose.model(
    'users',
    new Schema({
        id: { type: ObjectId },
        username: { type: String, required: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        nameBank: { type: String },
        numberBank: { type: String },
    }),
);

export default User;
