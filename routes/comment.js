
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const commentData = require("../data/comments.js");
const { ObjectId } = require("mongodb");
router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user)
    {
      //res.redirect('/protected'); ???
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })
  .post(async (req, res) => {
    try {
      if(req.session.user)
      {
        //const temp = awaut commentData.createComment(X,Y,Z);
        //res.render('userLogin', {title: "Login"}); Needs to render page of post with your comment visibly.
      }
      else
      {
        res.render('userLogin', {title: "Login"});
      }   
    } catch (error) {
      
    }
  
  })
  .delete(async (req, res) => {
    try {
      if(req.session.user)
      {
        //const temp = awaut commentData.createComment(X,Y,Z);
        //res.render('userLogin', {title: "Login"}); Needs to render page of post with your comment visibly.
      }
      else
      {
        res.render('userLogin', {title: "Login"});
      } 
    } catch (error) {
      
    }
  })
  
  module.exports = router ;