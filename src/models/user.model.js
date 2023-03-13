import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
     {
          name: { type: String, require: false },
          phone: { type: Number, require: false },
          email: {
               type: String,
               index: { unique: true },
          },
          password: { type: String, require: true },
          avatar: { type: String },
     },
     { timestamps: true }
);

const User = mongoose.model('Users', UserSchema, 'Users');

export default User;
