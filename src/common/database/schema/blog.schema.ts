import { Schema, model } from "mongoose";
import { Blog } from "../model";

const BlogSchema: Schema = new Schema<Blog>({
    title: {
        type: String,
        min: 10,
        max: 100,
        required: true,
    },
    content: {
        type: String,
        min: 300,
        max: 3000,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
});

export default model<Blog>("Blogs", BlogSchema);
