import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, require: true, minlength: 5, unique: true },
        displayName: {
            type: String,
            require: false,
            minlength: 5,
            default: function () {
                return this.username;
            },
        },
        phone: { type: String, require: false },
        email: {
            type: String,
            required: true,
            unique: true,
            // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
            match: [
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter a valid email',
            ],
        },
        password: { type: String, require: true, minlength: 8 },
        avatar: {
            type: String,
            default:
                'https://firebasestorage.googleapis.com/v0/b/user-management-24176.appspot.com/o/user%20management%2Favatars%2Fno%20avatar.jpg?alt=media&token=4cb61b19-468a-4b3b-954c-29ef4424effb',
        },
        role: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model('Users', UserSchema, 'Users');

export default User;
