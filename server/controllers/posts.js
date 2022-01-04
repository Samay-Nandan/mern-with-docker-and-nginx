import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const { ObjectId } = mongoose.Types;

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const newPostMessage = new PostMessage({ ...req.body, creator: req.userId })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, image, tags } = req.body;
    
    if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {

        const updatedPost = { creator, title, message, tags, image, _id: id };
    
        await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    
        res.status(200).json(req.body);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {

        await PostMessage.findByIdAndRemove(id);

        res.status(200).json({ message: "Post deleted successfully." });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));
    
        index === -1 ? post.likes.push(req.userId) :
                       post.likes = post.likes.filter((id) => id !== String(req.userId));
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}


export default router;