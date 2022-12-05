const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = mongoCollections.users;
const postData = require('./posts');
const userData = require('./users');
const {ObjectId} = require('mongodb');

// add as subdoc to posts
// add list by getUserById(userId) to add list of commentIds to user
const createComment = async (userId, postId, comment) => {
    if (!userId || !postId || !comment) {
        throw 'must provide userId and comment';
    }

    if (!ObjectId.isValid(userId) || !ObjectId.isValid(postId)) {
        throw 'userId and postId must be valid ObjectId';
    }
    if (typeof comment !== 'string' || comment.trim().length === 0) {
        throw 'comment must be non-empty string';
    }

    let newComment = {
        _id: ObjectId(),
        comment: comment
    };
    const postCollection = await posts();
    var post = await postData.getPostById(postId);

    const updatedInfoPost = await postCollection.updateOne({_id: ObjectId(postId)}, {$set: {comments: [...post.comments, newComment] }});
    if(!updatedInfoPost.matchedCount === updatedInfoPost.modifiedCount) {
        throw 'update failed';
    } 

    // add comment to user comments list
    const userCollection = await users();
    var user = await userData.getUserById(userId);
    
    let commentList = user.comments;
    commentList = commentList.push(newComment._id.toString());

    const updatedInfoUser = await userCollection.updateOne({_id: ObjectId(userId)}, {$set: {comments: commentList}});
    if(!updatedInfoUser.matchedCount === updatedInfoUser.modifiedCount) {
        throw 'update failed';
    } 

    return newComment;
}

const getAllComments = async (postId) => {
    if (!postId || !ObjectId.isValid(postId) || postId.trim().length === 0) {
        throw 'must provide non-empty string for post id';
    }
    var post = await postData.getMovieById(postId);
    let commentList = post.comments;
    return commentList;
}



module.exports = {
    createComment,
    getAllComments
}