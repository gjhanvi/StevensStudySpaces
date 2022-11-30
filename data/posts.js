const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const {ObjectId} = require('mongodb');
const validation = require('../validation');

const getAllPosts = async () => {
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray();
    if (!postList) throw 'Could not get all posts';
    return postList;
}

const getPostById = async (postId) => {


}


const addPost = async(
    userId, 
    buildingId,
    floor, 
    description, 
    noiseRating, 
    locationRating, 
    studentCapacity, 
    nycViewRating, 
    photo, 
    foodNear
    //likes, comments, and flags are also in the posts DB but will not be part of initial input
    //so these will need to be initialized to be empty
) => {


}

const removePost = async(postId) => {
    postId = validation.checkId(postId, 'ID');
    const postCollection = await posts();

    
}









module.exports = {getAllPosts, getPostById, addPost, removePost};