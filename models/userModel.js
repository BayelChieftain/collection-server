import mongoose from "mongoose";


const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
          },
        role: {
            type: String,
            default: 'user', 
        },
        profilePicture: {
            type: String,
            default: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg',
        },
    }
)

export const User = mongoose.model('User', UserSchema)