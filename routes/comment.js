
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const userData = require("../data/users.js");

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user)
    {
      //res.redirect('/protected');
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })
  .post(async (req, res) => {
    if(req.session.user)
    {
      //res.render('userLogin', {title: "Login"}); Needs to add a new page
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })

module.exports = router ;