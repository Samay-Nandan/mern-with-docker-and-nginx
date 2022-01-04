import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    image: String,
    likes: { type: [String], default: [] },
}, { timestamps: true })

const PostMessage = mongoose.model('Post', postSchema);

export default PostMessage;