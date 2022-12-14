const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const postdata = require("../data/posts.js");
const { ObjectId } = require("mongodb");

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
        res.render('userLogin', {title: "Login"});
      } 
    } catch (error) {
      console.log("error");
    }
  })
router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      if(req.session.user)
      {
        //const postList = await postdata.getAllPosts();
        //res.render('posts', {post:postList, title: "Posts"}); Need to render a page that shows a good amount of posts.
      }
      else
      {
        res.render('userLogin', {title: "Login"});
      }
    } catch (error) {
      
    }
  })


  router
  .route("/:postId")
  .get(async (req, res) => {
    try {
      helpFunctions.stringChecker(req.params.postId,"PostId")
      if (
        !ObjectId.isValid(req.params.postId)
      ) {
        // res.status(400).json({ error: "invalid id" });
      }
        //const post = await postdata.getPostByID(req.params.postId);
        //res.render('posts', {post:post, title: "Post"}); Need to render a page that shows a good amount of posts.      
    } catch (error) {
      
    }

  })



  
  .post(async (req, res) => {
    try {
      if(req.session.user)
      {
        console.log(req.body.foodInput);
        req.body.descInput = helpFunctions.stringChecker(req.body.descInput, 'Post Description');
        req.body.noiseInput = helpFunctions.stringChecker(req.body.noiseInput, 'Noise rating');
        req.body.noiseInput = helpFunctions.checkRating(req.body.noiseInput, 'noise');
        req.body.locationInput = helpFunctions.stringChecker(req.body.locationInput, 'Location rating');
        req.body.locationInput = helpFunctions.checkRating(req.body.locationInput, 'location');
        req.body.nycInput = helpFunctions.stringChecker(req.body.nycInput, 'View rating');
        req.body.nycInput = helpFunctions.checkRating(req.body.nycInput, 'View');
        req.body.foodInput = helpFunctions.stringChecker(req.body.foodInput, 'Food input');
        //req.body.foodInput = helpFunctions.checkFoodNear(req.body.foodInput);
        req.body.capacityInput = helpFunctions.stringChecker(req.body.capacityInput, 'Capacity');
        req.body.capacityInput = helpFunctions.checkStudentCapacity(req.body.capacityInput);
        //still need to check photo
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
          req.body.buildingInput,
          req.body.floorInput,
          req.body.descInput,
          req.body.noiseInput,
          req.body.locationInput,
          req.body.capacityInput,
          req.body.nycInput,
          req.body.photoInput,
          req.body.foodInput
          );
          res.render('posts', {post: post, title: "Posts"}); //Render page with post
      }
      else
      {
        res.render('userLogin', {title: "Login"});
      } 
    } catch (error) {
        res.render('newPost',{title: "New Post", error: error} );
    }
  })

router
  .route('/like')
  .post(async (req, res) => {
    try {
      if(req.session.user)
      {
        //check that user has not liked the post before
        //const postList = await postdata.addLike();
        //res.render('posts', {post: postlist, title: "Posts"}); refresh page
      }
      else
      {
        res.render('userLogin', {title: "Login"});
      } 
    } catch (error) {
      
    }
  })
router
  .route('/dislike')
  .post(async (req, res) => {
    try {
      if(req.session.user)
      {
        //check that user has not disliked the post before
        //const postList = await postdata.removeLike ();
        //res.render('posts', {post: postlist, title: "Posts"}); refresh page
      }
      else
      {
        res.render('userLogin', {title: "Login"});
      } 
    } catch (error) {
      
    }
  })
module.exports = router ;