const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = require('./users');
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const getAllPosts = async () => {
    const postCollection = await posts();
    const postList = await postCollection.find({}).toArray();
    if (!postList) throw 'Could not get all posts';
    return postList;
}

const getPostById = async (postId) => {
    //postId is type string
    postId = helpers.checkId(postId, 'Post ID');
    const postCollection = await posts();
    const post = await postCollection.findOne({_id: ObjectId(postId)});
    if (!post) throw 'Post not found';
    return post;
}

const addPost = async(
    userId, 
    building,
    floor, 
    description, 
    noiseRating, 
    locationRating, 
    studentCapacity, 
    nycViewRating, 
    photo, 
    foodNear
) => {
    //likes, comments, and flags are also in the posts DB but will not be part of initial input so these will need to be initialized to be empty
    userId = helpers.checkId(userId, 'User ID');  //--> still need to implement this in helper
    //STILL NEED TO CHECK PHOTO and building and floor
    description = helpers.stringChecker(description, 'Post Description');
    noiseRating = helpers.stringChecker(noiseRating, 'Noise rating');
    noiseRating = helpers.checkRating(noiseRating, 'noise');
    locationRating = helpers.stringChecker(locationRating, 'Location rating');
    locationRating = helpers.checkRating(locationRating, 'location');
    nycViewRating = helpers.stringChecker(nycViewRating, 'View rating');
    nycViewRating = helpers.checkRating(nycViewRating, 'View');
    foodNear = helpers.stringChecker(foodNear, 'Food input');
    //foodNear = helpers.checkFoodNear(foodNear);
    studentCapacity = helpers.stringChecker(studentCapacity, 'Capacity');
    studentCapacity = helpers.checkStudentCapacity(studentCapacity);


    const postCollection = await posts();
    let newPost = {
        userId: userId,
        building: building,
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
    postId = helpers.checkId(postId, 'Post ID');  // --> still need to implement checkID
    const postCollection = await posts();
    const postToDelete = await getPostById(postId);
    const deletionInfo = await postCollection.deleteOne({_id: postId});

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete post with id of ${postId}`;
      }
    return {successfullyDeleted: true};

}

// const addLike = async(postId, userId) => {
//     postId = helpers.checkId(postId, 'Post ID');
//     userId = helpers.checkId(userId, 'User ID');

//     const postCollection = await posts();
//     const gotPost = await postCollection.findOne({_id: postId});
//     if (gotPost === null) throw `No post with id of ${postId}`;

//     let likes = gotPost.likes;
//     let usersList = Object.keys(likes);
//     for (i in usersList){
//         if (usersList[i] === userId){
//             if (likes.userId === false){ //user has already disliked post

//             }else{ //user has already liked post
                
//             }
//         }
//     }
    
// }

// const addDislike = async(postId, userId) => {
//     postId = helpers.checkId(postId, 'Post ID');
//     userId = helpers.checkId(userId, 'User ID');

//     const postCollection = await posts();
//     const gotPost = await postCollection.findOne({_id: postId});
//     if (gotPost === null) throw `No post with id of ${postId}`;

//     let likes = gotPost.likes;
//     let usersList = Object.keys(likes);
//     for (i in usersList){
//         if (usersList[i] === userId){
//             if (likes.userId === false){ //user has already disliked post

//             }else{ //user has already liked post
                
//             }
//         }
//     }
    
    
// }


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


module.exports = {getAllPosts, getPostById, addPost, removePost, addFlag};