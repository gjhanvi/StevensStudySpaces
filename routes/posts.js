const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const postdata = require("../data/posts.js");
const { ObjectId } = require("mongodb");

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



router
  .route("/new")
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
      
    }
  })
  .post(async (req, res) => {
    try {
      if(req.session.user)
      {
        req.body.decInput = helpers.stringChecker(description, 'Post Description');
        req.body.noiseInput = helpers.stringChecker(noiseRating, 'Noise rating');
        req.body.noiseInput = helpers.checkRating(noiseRating, 'noise');
        req.body.locationInput = helpers.stringChecker(locationRating, 'Location rating');
        req.body.locationInput = helpers.checkRating(locationRating, 'location');
        req.body.nycInput = helpers.stringChecker(nycViewRating, 'View rating');
        req.body.nycInput = helpers.checkRating(nycViewRating, 'View');
        req.body.foodInput = helpers.stringChecker(foodNear, 'Food input');
        req.body.foodInput = helpers.checkFoodNear(foodNear);
        req.body.capacityInput = helpers.stringChecker(studentCapacity);
        req.body.capacityInput = helper.checkStudentCapacity(studentCapacity);
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
          req.body.foodInput
          );
          res.render('posts', {post: post, title: "Posts"}); //Render page with post
      }
      else
      {
        res.render('userLogin', {title: "Login"});
      } 
    } catch (error) {
        console.log(error);
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