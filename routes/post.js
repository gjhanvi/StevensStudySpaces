const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const postdata = require("../data/users.js");

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user)
    {
      //const postList = await postdata.getAllPosts();
      //res.render('userLogin', {title: "Login"}); Need to render a page that shows a good amount of posts.
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })
router
  .route("/new")
  .get(async (req, res) => 
  {
    if(req.session.user)
    {
      //res.render('userLogin', {title: "Login"}); Need to render a page that shows the post form
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })
  .post(async (req, res) => {
    if(req.session.user)
    {
      // buildingInput
      // floorInput
      // descInput
      // noiseInput
      // locationInput
      // capacityInput
      // nycInput
      // foodInput
      //const postList = await postdata.addPost();
      //res.render('userLogin', {title: "Login"}); Render page with post
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })

router
  .route('/like')
  .post(async (req, res) => {
    if(req.session.user)
    {
      //check that user has not liked the post before
      //const postList = await postdata.addLike();
      //res.render('userLogin', {title: "Login"}); Needs to refresh the page
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })
router
  .route('/dislike')
  .post(async (req, res) => {
    if(req.session.user)
    {
      //check that user has not disliked the post before
      //const postList = await postdata.removeLike ();
      //res.render('userLogin', {title: "Login"}); Needs to refresh the page
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })
module.exports = router ;