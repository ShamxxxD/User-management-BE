import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, require: true, minlength: 5, unique: true },
        phone: { type: Number, require: false },
        email: {
            type: String,
            index: { unique: true },
        },
        password: { type: String, require: true, minlength: 8 },
        avatar: { type: String },
        role: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model('Users', UserSchema, 'Users');

export default User;
