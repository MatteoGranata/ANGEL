import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Password = mongoose.model('Password', passwordSchema) 