import express from "express";
import { createPost, readPost, updatePost, deletePost, getAllPosts, updateComments } from '../controllers/blog.controller.js';
const router = express.Router();

router.post('/create-post', createPost);
router.get('/read-post/:name', readPost);
router.delete('/delete-post/:name', deletePost);
router.get('/get-all-posts', getAllPosts);

// 
router.use((req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
})

router.patch('/update-votes/:name', updatePost);
router.patch('/update-comment/:name', updateComments);

export default router;