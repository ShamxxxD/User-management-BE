import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
   {
      username: { type: String, require: true, minlength: 5, unique: true },
      phone: { type: Number, require: false },
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
      avatar: { type: String },
      role: { type: String },
   },
   { timestamps: true }
);

const User = mongoose.model('Users', UserSchema, 'Users');

export default User;
