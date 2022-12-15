const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const postdata = require("../data/posts.js");
const commentData = require("../data/comments.js");
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
        req.body.titleInput,
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

        console.log(post)
        res.render('posts', {post: [post]}); //Render page with post
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
        res.render('posts', {post: postList});
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
        res.render('singlePost', {post: [post],postId:req.params.postId });
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
        helpFunctions.stringChecker(req.body.commentInput, "Username")
        const post = await commentData.createComment(req.session.userId,req.params.postId,req.body.commentInput)
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
        if (
          !req.params.postId ||
          !ObjectId.isValid(req.params.postId)
        ) {
          res.status(400).redirect('/home');
          return null;
        }
        //const post = await postData.addDislike(req.params.postId)
        res.redirect('/posts/' +  req.params.postId);
      }
      else {
        res.status(403).render('forbiddenAccess');
      }
    } catch (error) {
      res.status(400).redirect('/home');
    }
  })

  router
  .route("/like/:postId")
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
        //const post = await postData.addLike(req.params.postId)
        res.redirect('/posts/' + req.params.postId) ;
      }
      else {
        res.status(403).render('forbiddenAccess');
      }
    } catch (error) {
      res.status(400).redirect('/home');
    }
  })

module.exports = router ;