const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const postdata = require("../data/posts.js");
const commentData = require("../data/comments.js");
const { ObjectId } = require("mongodb");
const xss = require('xss');

router
.route('/new')
.get(async (req, res) => 
{
  try {
    if(req.session.user)
    {
      res.render('newPost', {title: "New Post"}); //Need to render a page that shows the post form
    }
    else
    {
      res.redirect('/');
    } 
  } catch (error) {
    console.log("error");
  }
})
.post(async (req, res) => {
  try {
    if(req.session.user)
    {

      req.body.descInput = helpFunctions.stringChecker(xss(req.body.descInput), 'Post Description');
      req.body.noiseInput = helpFunctions.stringChecker(xss(req.body.noiseInput), 'Noise rating');
      req.body.noiseInput = helpFunctions.checkRating(xss(req.body.noiseInput), 'noise');
      req.body.locationInput = helpFunctions.stringChecker(xss(req.body.locationInput), 'Location rating');
      req.body.locationInput = helpFunctions.checkRating(xss(req.body.locationInput), 'location');
      req.body.nycInput = helpFunctions.stringChecker(xss(req.body.nycInput), 'View rating');
      req.body.nycInput = helpFunctions.checkRating(xss(req.body.nycInput), 'View');
      req.body.foodInput = helpFunctions.stringChecker(xss(req.body.foodInput), 'Food input');
      //req.body.foodInput = helpFunctions.checkFoodNear(req.body.foodInput);
      req.body.capacityInput = helpFunctions.stringChecker(xss(req.body.capacityInput), 'Capacity');
      req.body.capacityInput = helpFunctions.checkStudentCapacity(xss(req.body.capacityInput));
      //still need to check req.session.userId
      //still need to check building and floor
      // buildingInput
      // floorInput
      // descInput
      // noiseInput
      // locationInput
      // capacityInput
      // nycInput
      // foodInput
      const post = await postdata.addPost(
        req.session.userId,
        req.body.titleInput,
        req.body.buildingInput,
        req.body.floorInput,
        req.body.descInput,
        req.body.noiseInput,
        req.body.locationInput,
        req.body.capacityInput,
        req.body.nycInput,
        //req.body.photoInput,
        req.body.foodInput
        );
        //console.log(post)
        res.render('posts', {post: [post], header: 'Post Uploaded!'}); //Render page with post
    }
    else
    {
      res.redirect('/');
    } 
  } catch (error) {
      res.render('newPost',{title: "New Post", error: error} );
  }
})

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      if(req.session.user)
      {
        const postList = await postdata.getAllPosts();
        res.render('posts', {post: postList, header: "All Posts", tite:"All Posts"});
      }
      else
      {
        res.redirect('/');
      }
    } catch (error) {
    }
  })


  router
  .route("/:postId")
  .get(async (req, res) => {
    try {
      if (req.session.user) {
        helpFunctions.stringChecker(req.params.postId)
        if (
          !req.params.postId ||
          !ObjectId.isValid(req.params.postId)
        ) {
          res.status(400).redirect('/home');
          return null;
        }
        const post = await postdata.getPostById(req.params.postId)
        const checkUserFlag = await postdata.checkUserFlagged(req.params.postId,req.session.userId)
        let flagged = "";
        const checkUserLiked = await postdata.checkUserLiked(req.params.postId, req.session.userId)
        //console.log(checkUserLiked)
        //0 Liked
        //1 Disliked 
        //2 Neither
        let likeMessage = "";
        // let flagged = "";
        if(checkUserLiked == 0)
        {
          likeMessage = "You liked this post!"
        }
        else if(checkUserLiked == 1)
        {
          likeMessage = "You disliked this post!"
        }
        if(checkUserFlag)
        {
          flagged = "You flagged this post"
        }
        //const totalLikes/Dislikes = await postdata.getPostById(req.params.postId)
        //console.log(post.title)
        let checkTotalLikes = await postdata.countLikes(req.params.postId)
        //console.log(checkTotalLikes.numLikes + checkTotalLikes.numDisliked)
        let totalMessage ="";
        if(checkTotalLikes.numLikes - checkTotalLikes.numDisliked == 0)
        {
          totalMessage = "0 Likes/Dislikes"
        }
        else if(checkTotalLikes.numLikes - checkTotalLikes.numDisliked < 0)
        {
          totalMessage = (checkTotalLikes.numLikes - checkTotalLikes.numDisliked)*-1 +  " Dislikes"
        }
        else
        {
          totalMessage = (checkTotalLikes.numLikes - checkTotalLikes.numDisliked) +  " Likes"
        }
        //console.log(post.photo)
        res.render('singlePost', {post: [post],title:post.title,postId:req.params.postId, likeMessage:likeMessage, flagged:flagged, totalLikes: totalMessage});
      }
      else {
        res.status(403).render('forbiddenAccess');
      }
    } catch (error) {
      res.status(400).render('userLogin', { title: "Login", error: error }); // 400 error
    }
  })

  router
  .route("/comment/:postId")
  .post(async (req, res) => {
    try {
      if (req.session.user) {
        helpFunctions.stringChecker(req.params.postId)
        if (
          !req.params.postId ||
          !ObjectId.isValid(req.params.postId)
        ) {
          res.status(400).redirect('/home');
          return null;
        }
        helpFunctions.stringChecker(xss(req.body.commentInput), "Username")
        const post = await commentData.createComment(req.session.userId,req.params.postId,xss(req.body.commentInput))
        res.redirect('/posts/' +  req.params.postId);
      }
      else {
        res.status(403).render('forbiddenAccess');
      }
    } catch (error) {
      res.status(400).render('userLogin', { title: "Login", error: error }); // 400 error
    }
  })


  router
  .route("/dislike/:postId")
  .post(async (req, res) => {
    try {
      if (req.session.user) {
        helpFunctions.stringChecker(req.params.postId)
        // if (
        //   !req.params.postId ||
        //   !ObjectId.isValid(req.params.postId)
        // ) {
        //   res.status(400).redirect('/home');
        //   return null;
        // }
        console.log(req.params.postId + " " +req.session.userId)
        const post = await postdata.addDislike(req.params.postId,req.session.userId)
        console.log(post)
        res.redirect('/posts/' +  req.params.postId);
      }
      else {
        res.status(403).render('forbiddenAccess');
      }
    } catch (error) {
      console.log(error)
      res.status(400).redirect('/home');
    }
  })

  router
  .route("/like/:postId")
  .post(async (req, res) => {
    try {
      if (req.session.user) {
        helpFunctions.stringChecker(req.params.postId,req.session.userId)
         if (
           !req.params.postId ||
           !ObjectId.isValid(req.params.postId)
         ) {
           res.status(400).redirect('/home');
           return null;
         }
        const post = await postdata.addLike(req.params.postId,req.session.userId)
        res.redirect('/posts/' + req.params.postId) ;
      }
      else {
        res.status(403).render('forbiddenAccess');
      }
    } catch (error) {
      res.redirect('/posts/' +  req.params.postId);
    }
  })

  router
  .route("/flag/:postId")
  .post(async (req, res) => {
    try {
      if (req.session.user) {
        helpFunctions.stringChecker(req.params.postId,req.session.userId)
         if (
           !req.params.postId ||
           !ObjectId.isValid(req.params.postId)
         ) {
           res.status(400).redirect('/home');
           return null;
         }
        const post = await postdata.addFlag(req.params.postId,req.session.userId)
        res.redirect('/posts/' + req.params.postId) ;
      }
      else {
        res.status(403).render('forbiddenAccess');
      }
    } catch (error) {
      res.redirect('/posts/' + req.params.postId) ;
    }
  })

  router
  .route("/building")
  .post(async (req, res) => {
    try {
      if (req.session.user) {
        let postlist;
        if(xss(req.body.ratingInput) == "Any" && xss(req.body.buildingInput) == "All")
        {
          res.redirect('/posts/');
        }
        else if(xss(req.body.ratingInput) == "Any")
        {
          postlist = await postdata.getPostByBuidling(xss(req.body.buildingInput))
          res.render('posts', {post: postlist, header: xss(req.body.buildingInput)});
        }
        else if(xss(req.body.buildingInput)== "All") 
        {
         postlist = await postdata.getPostByRating(xss(req.body.ratingInput))
         res.render('posts', {post: postlist, header: `Study Spaces with Maximum Noise Rating of ${xss(req.body.ratingInput)}`});
        }
        else
        {
          postlist = await postdata.getPostByRatingBuilding(xss(req.body.ratingInput),xss(req.body.buildingInput));
          res.render('posts', {post: postlist, header: `Spots in ${xss(req.body.buildingInput)} with Maximum Noise Rating of ${xss(req.body.ratingInput)}`});
        }
  
      }
    } catch (error) {
      console.log(error)
      res.redirect('/posts/');
    }
  })

module.exports = router ;