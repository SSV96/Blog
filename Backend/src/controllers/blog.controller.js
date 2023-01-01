import { Blog } from '../models/blog.model.js';
import { errorHandler } from '../handlers/error.handler.js';
import { successHandler } from '../handlers/success.handler.js';
import { log } from 'console';

// Creating the Post
export const createPost = async (req, res) => {
    const { name, title, content } = req.body;
    try {
        const data = await Blog.create({ name, title, content });
        return successHandler(res, "Successfully Created The Post", true, data);
    } catch (error) {
        log(error);
        return errorHandler(res, 'Something Went Wrong in Creating The DB', error, false);
    }
}

//  Reading the post
export const readPost = async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;
    try {
        const data = await Blog.findOne({ name });
        if (data) {
            const upVoteIds = data?.upVoteIds || [];
            data.canUpvote = uid && !upVoteIds.includes(uid);
            return successHandler(res, "Successfully read The Post", true, data);
        }
        else
            return successHandler(res, "Post not found", true, data || " no post");
    } catch (error) {
        log(error);
        return errorHandler(res, 'Something went wrong in reading the DB', error, false)
    }
}

// getting all posts
export const getAllPosts = async (req, res) => {
    try {
        const data = await Blog.find({});
        return successHandler(res, data ?? "Successfully Created The Post" ?? "No posts Found", true, data);
    } catch (error) {
        log(error);
        return errorHandler(res, 'Something went wrong in Getting the DB', error, false)
    }
}

// Update the body
export const updatePost = async (req, res) => {
    const { name } = req.params;
    try {
        const article = await Blog.findOne({ name });
        if (article) {
            const upVoteIds = article?.upVoteIds || [];
            const canUpvote = uid && !upVoteIds.includes(uid);
            if (canUpvote) {
                await Blog.updateOne({ name }, { $inc: { upvotes: 1 }, $push: { upVoteIds: uid } });
            }

            const updateddata = await Blog.findOne({ name });
            return successHandler(res, 'Updated Successfully', true, updateddata);
        }
        else {
            return successHandler(res, `The ${name} article now has not found  `,
                true, 'not found');
        }
    } catch (error) {
        log(error);
        return errorHandler(res, 'Something went wrong in updating the DB', error, false)
    }
}

// 
export const updateComments = async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;
    try {
        await Blog.updateOne({ name }, { $push: { comments: { postedBy: email, text } } });
        const article = await Blog.findOne({ name }).sort({ createdAt: -1 });
        if (article) {
            return successHandler(res, `Hello  ${postedBy}, Your comment has been added to ${name} article`,
                true, article);
        } else {
            return successHandler(res, `The ${name} article now has not found  `,
                true, 'not found');
        }
    } catch (error) {
        log(error);
        return errorHandler(res, 'Something went wrong in updating the DB', error, false)
    }
}


// 
// Deleting the Post
export const deletePost = async (req, res) => {
    const { name } = req.params;
    try {
        const data = await Blog.findOneAndDelete({ name });
        if (data)
            return successHandler(res, `Article ${name} has been deleted`,
                true, 'Successfully deleted');
        return successHandler(res, `Article ${name} has not  found`,
            true, 'not found');
    } catch (error) {
        log(error);
        return errorHandler(res, 'Something went wrong in updating the DB', error, false)
    }
}




