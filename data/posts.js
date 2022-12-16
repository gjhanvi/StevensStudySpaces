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
    //photo, 
    foodNear
) => {
    userId = helpers.checkId(userId, 'User ID');  //--> still need to implement this in helper
    //STILL NEED TO CHECK PHOTO and building and floor
    postTitle = helpers.stringChecker(postTitle, "Post Title");
    helpers.checkValidFloor(building,floor);
    description = helpers.stringChecker(description, 'Post Description');
    noiseRating = helpers.stringChecker(noiseRating, 'Noise rating');
    noiseRating = helpers.checkRating(noiseRating, 'noise');
    locationRating = helpers.stringChecker(locationRating, 'Location rating');
    locationRating = helpers.checkRating(locationRating, 'location');
    nycViewRating = helpers.stringChecker(nycViewRating, 'View rating');
    nycViewRating = helpers.checkRating(nycViewRating, 'View');
    //foodNear = helpers.stringChecker(foodNear, 'Food input');
    //foodNear = helpers.checkFoodNear(foodNear);
    studentCapacity = helpers.stringChecker(studentCapacity, 'Capacity');
    studentCapacity = helpers.checkStudentCapacity(studentCapacity);
    let user = await userData.getUserById(userId)
    let string = user.firstName +" " + user.lastName
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
        photo: "/images/index.png", 
        foodNear: foodNear,
        likes: [],
        flags: [],
        comments: [],
        name: string
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
    const postToDelete = await getPostById(ObjectId(postId));
    const deletionInfo = await postCollection.deleteOne({_id: ObjectId(postId)});

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
                }else{ //remove
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
        {_id: ObjectId(postId)},
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
                }else{ //remove
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

const checkUserLiked = async(postId, userId) => {
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');
    

    const post = await getPostById(postId);
    let likes = post.likes;
    let usersList = [];
    for (elem in likes){
        usersList.push(Object.keys(likes[elem])[0]);
    }
    if (!usersList.includes(userId)){
        return 2; //user has not liked/disliked
    }else{
        for (i in likes){
            let currentId = Object.keys(likes[i])[0];
            let currentValue = Object.values(likes[i])[0];
            if (currentId === userId){
                if (currentValue === true){ //user already liked
                    return 0; //user liked
                }
            }else{
        
            }
        
        }
}
return 1; //user disliked
}

const countLikes = async(postId) => {
    postId = helpers.checkId(postId, 'Post ID');
    const post = await getPostById(postId);
    let likes = post.likes;
    let likeCount = 0;
    let dislikeCount = 0;
    likes.forEach(element => {
        if(Object.values(element)[0] == true)
        {
            likeCount++
        }
        else
        {
            dislikeCount++;
        }
    });
    return {numLikes: likeCount, numDisliked: dislikeCount};
}

// const countDislikes = async(postId) => {
    
// }


const addFlag = async(postId, userId) => {
    //postId is already being input as an objectId not a string
    //checkId function should check if valid object ID

    //need to check if user has already flagged the posts
    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');
    const gotPost = await getPostById(postId);
    
    let flagList = gotPost.flags;
    for (i in flagList){
        if (flagList[i] === userId){
            throw `User ${userId} already flagged this post`;
        }
    }
    flagList.push(userId);
    const postCollection = await posts();
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
  
const checkUserFlagged = async(postId, userId) => {

    postId = helpers.checkId(postId, 'Post ID');
    userId = helpers.checkId(userId, 'User ID');
    postId = postId.toString();
    let post = await getPostById(postId);
    let flagList = post.flags;
    for (i in flagList){
        if (flagList.includes(userId)){
            return true;
        }
    }
    return false;
}

const getPostByBuidling = async (buidling) => {
    //postId is type string
    postId = helpers.checkBuilding(buidling, 'building');
    const postlist = await getAllPosts();
    let posts = []
    postlist.forEach(element => {
        if(element.building == buidling)
        {
            posts.push(element)
        }
    });
    return posts;
}

const getPostByRating = async (rating) => {
    //postId is type string
    postId = helpers.checkRating(rating, 'noise');
    const postlist = await getAllPosts();
    let posts = []
    postlist.forEach(element => {
        if(element.noiseRating <= parseInt(rating))
        {
            posts.push(element)
        }
    });
    return posts;
}

const getPostByRatingBuilding = async (rating,buidling) => {
    const postlist = await getAllPosts();

    postId = helpers.checkBuilding(buidling, 'building');
    let temp = []
    postlist.forEach(element => {
        if(element.building == buidling)
        {
            temp.push(element)
        }
    })
    let posts = []
    temp.forEach(element => {
        if(element.noiseRating <= parseInt(rating))
        {
            posts.push(element)
        }
    });

    return posts;
}

const linkPhoto = async (postId,fileName) => {
    postId = helpers.checkId(postId, 'Post ID');
    helpers.stringChecker(fileName,"FileName")
    const postCollection = await posts();
    const post = await postCollection.findOne({_id: ObjectId(postId)});
    const updatedInfo = await postCollection.updateOne(
        {_id: ObjectId(postId)},
        {$set: {photo: fileName}}
      );
}

const checkIds = async (postId, userId) => {
    postId = helpers.checkId(postId, 'Post ID');
    const post = await getPostById(postId);
    console.log(post);
    console.log(post.userId);
    if (post.userId === userId) {
        return true;
    } else {
        return false;
    }
}

module.exports = {getAllPosts, getPostById, addPost, removePost, addFlag, addLike, addDislike,checkUserFlagged, checkUserLiked, getPostByBuidling,getPostByRating,getPostByRatingBuilding, countLikes,linkPhoto, checkIds};