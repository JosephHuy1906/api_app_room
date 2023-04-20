import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

 const User = mongoose.model(
    'users',
    new Schema({
        id: { type: ObjectId},
        username: { type: String },
        password: { type: String },
        fullName: { type: String },
    }),
);

export default User;