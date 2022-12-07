const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const userData = require("../data/users.js");

router
  .route('/comment')
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

module.exports = router ;
