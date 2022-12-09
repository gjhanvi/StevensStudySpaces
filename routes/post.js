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
      //res.render('userLogin', {title: "Login"}); Need tp render a page that shows all the posts.
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
      //const postList = await postdata.addPost();
      //res.render('userLogin', {title: "Login"}); Needs to add a new post
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })
  .delete(async (req, res) => {
    if(req.session.user)
    {
      //const postList = await postdata.deletePost(CHANGEME);
      //res.render('userLogin', {title: "Login"}); Needs to add a new post
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })

module.exports = router ;