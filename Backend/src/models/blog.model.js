import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    name: { type: String, default: "Test", require: true },
    title: { type: String, unique: true },
    content: { type: String },
    upvotes: { type: Number, default: 0 },
    comments: {
        type: [{
            postedBy: String,
            text: String,
            createdAt: { type: Date, default: new Date() }
        }], default: []
    },
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);