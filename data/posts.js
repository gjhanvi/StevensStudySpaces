const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const {ObjectId} = require('mongodb');
//const validation = require('../validation');

const getAllPosts = async () => {
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray();
    if (!postList) throw 'Could not get all posts';
    return postList;
}

const getPostById = async (postId) => {
    //postId will already be type objectId rather than string?
    postId = helpers.checkId(postId, 'Post ID');
    const postCollection = await posts();
    const post = await postCollection.findOne({_id: id});

    if (!post) throw 'Post not found';
    return post;

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
    userId = helpers.checkId(userId, 'User ID');
    buildingId = helpers.checkId(userId, 'Building ID');
    floor = helpers.checkFloor(floor, buildingId);
    description = helpers.checkDescription();
    noiseRating = helpers.checkRating(noiseRating, 'noise');
    locationRating = helpers.checkRating(locationRating, 'location');
    nycViewRating = helpers.checkRating(nycViewRating, 'view');

    const postCollection = await posts();
    let newPost = {
        userId: userId,
        buildingId: buildingId,
        floor: floor, 
        description: description, 
        noiseRating: noiseRating, 
        locationRating: locationRating, 
        studentCapacity: studentCapacity, 
        nycViewRating: nycViewRating, 
        photo: photo, 
        foodNear: foodNear,
        likes: [],
        flags: [],
        comments: []
    }

    const insertInfo = await postCollection.insertOne(newPost);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) 
     throw 'Could not add post';
  
    const newId = insertInfo.insertedId.toString();
    const post = await getPostById(newId);
    return post;
    
}

const removePost = async(postId) => {
    //postId is already being input as an objectId not a string
    //checkId function should check if valid object ID
    postId = helpers.checkId(postId, 'Post ID');  
    const postCollection = await posts();
    const postToDelete = await getPostById(postId);
    const deletionInfo = await movieCollection.deleteOne({_id: postId});

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete post with id of ${postId}`;
      }
    return {successfullyDeleted: true};

}

const addLike = async(postId, userId) => {
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');

    const postCollection = await posts();
    const gotPost = await postCollection.findOne({_id: postId});
    if (gotPost === null) throw `No post with id of ${postId}`;

    let likes = gotPost.likes;
    
    
}

const removeLike = async(postId, userId) => {
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');

    const postCollection = await posts();
    const gotPost = await postCollection.findOne({_id: postId});
    if (gotPost === null) throw `No post with id of ${postId}`;

    let likes = gotPost.likes;
}

const addFlag = async(postId, userId) => {
    //postId is already being input as an objectId not a string
    //checkId function should check if valid object ID

    //need to check if user has already flagged the posts
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');
    const postCollection = await posts();
    const gotPost = await postCollection.findOne({_id: postId});
    if (gotPost === null) throw `No post with id of ${postId}`;
    
    let flagList = gotPost.flags;
    for (i in flagList){
        if (flagList[i] === userId){
            throw `User ${userId} already flagged this post`;
        }
    }
    flagList.push(userId);
    const updatedInfo = await postCollection.updateOne(
        {_id: postId},
        {$set: {flags: flagList}}
      );
      if (updatedInfo.modifiedCount === 0) {
        throw 'Could not add flag to post successfully';
      }
    let updatedPost = getPostById(postId);
    return updatedPost;

}


module.exports = {getAllPosts, getPostById, addPost, removePost, addLike, removeLike, addFlag};