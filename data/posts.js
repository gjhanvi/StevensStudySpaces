const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = mongoCollections.users;
const userData = require('./users');
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
    postTitle, 
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
    userId = helpers.checkId(userId, 'User ID');  //--> still need to implement this in helper
    //STILL NEED TO CHECK PHOTO and building and floor
    postTitle = helpers.stringChecker(postTitle, "Post Title");
    floor = helpers.checkValidFloor(building,floor);
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
        title: postTitle,
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

const addLike = async(postId, userId) => {
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');
    userId = userId.toString();

    const postCollection = await posts();
    const gotPost = await postCollection.findOne({_id: ObjectId(postId)});
    if (gotPost === null) throw `No post with id of ${postId}`;

    let likes = gotPost.likes;
    let usersList = [];
    for (elem in likes){
        usersList.push(Object.keys(likes[elem])[0]);
    }
    if (usersList.includes(userId)){
        for (i in likes){
            let currentId = Object.keys(likes[i])[0];
            let currentValue = Object.values(likes[i])[0];
            if (currentId === userId){
                if (currentValue === false){ //user already disliked
                    Object.keys(likes[i]).forEach(function(key){
                        likes[i][key] = true;
                    })
                    break;
                }else{ //nothing to change 
                    likes.splice(i,1);
                }
            }
        }
    }
     else{
        let obj = {};
        obj[userId] = true;
        likes.push(obj);
     }
    const updatedInfo = await postCollection.updateOne(
        {_id: postId},
        {$set: {likes: likes}}
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not add like to post successfully';
    }

    let updatedPost = getPostById(postId);
    return updatedPost;
    
}

const addDislike = async(postId, userId) => {
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');
    userId = userId.toString();


    const postCollection = await posts();
    const gotPost = await postCollection.findOne({_id: ObjectId(postId)});
    if (gotPost === null) throw `No post with id of ${postId}`;

    let likes = gotPost.likes;
    let usersList = [];
    for (elem in likes){
        usersList.push(Object.keys(likes[elem])[0]);
    }
    if (usersList.includes(userId)){
        for (i in likes){
            let currentId = Object.keys(likes[i])[0];
            let currentValue = Object.values(likes[i])[0];
            if (currentId === userId){
                if (currentValue === true){ //user already liked
                    Object.keys(likes[i]).forEach(function(key){
                        likes[i][key] = false;
                    })
                    break;
                }else{ //nothing to change
                    likes.splice(i,1);
                }
            }
        }
    }
     else{
        let obj = {};
        obj[userId] = false;
        likes.push(obj);
     }
    const updatedInfo = await postCollection.updateOne(
        {_id: ObjectId(postId)},
        {$set: {likes: likes}}
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not add dislike to post successfully';
    }

    let updatedPost = getPostById(postId);
    return updatedPost;
    
    
}


const addFlag = async(postId, userId) => {
    //postId is already being input as an objectId not a string
    //checkId function should check if valid object ID

    //need to check if user has already flagged the posts
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');
    const postCollection = await posts();
    const gotPost = await postCollection.findOne({_id: ObjectId(postId)});
    if (gotPost === null) throw `No post with id of ${postId}`;
    
    let flagList = gotPost.flags;
    for (i in flagList){
        if (flagList[i] === userId){
            throw `User ${userId} already flagged this post`;
        }
    }
    flagList.push(userId);
    const updatedInfo = await postCollection.updateOne(
        {_id: ObjectId(postId)},
        {$set: {flags: flagList}}
      );
      if (updatedInfo.modifiedCount === 0) {
        throw 'Could not add flag to post successfully';
      }
    let updatedPost = getPostById(postId);
    return updatedPost;

}


module.exports = {getAllPosts, getPostById, addPost, removePost, addFlag, addLike, addDislike};