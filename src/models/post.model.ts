import mongoose, { Schema, Model, Types } from 'mongoose'
import { IPost } from '../interfaces/post.interface'

const postSchema = new Schema<IPost, Model<IPost>>({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

const Post = mongoose.model<IPost & Document>('Post', postSchema)
export default Post