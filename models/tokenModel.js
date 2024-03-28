import mongoose, { Schema } from "mongoose";

const TokenSchema = mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        refreshToken: {
            type: String,
            required: true,
        }
    }
)

export const Token = mongoose.model('Token', TokenSchema)