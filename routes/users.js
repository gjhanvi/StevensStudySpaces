const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const userData = require("../data/users.js");
const { ObjectId } = require("mongodb");

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if(req.session.user)
    {
      res.redirect('/home');
    }
    else
    {
      res.render('userLogin', {title: "Login"});
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    if(req.session.user)
    {
      res.redirect('/home');
    }
    else
    {
      res.render('userRegister', {title: "Register"});
    }
  })
  .post(async (req, res) => {
    try {
      if(req.session.user)
      {
        res.redirect('/home');
      }
      else
      {
        helpFunctions.stringChecker(req.body.usernameInput,"Username")
        helpFunctions.letternumberonly(req.body.usernameInput,"Username")
        helpFunctions.stringChecker(req.body.passwordInput,"Password")
        helpFunctions.letternumberonly(req.body.passwordInput,"Password")
        temp = await userData.createUser(req.body.usernameInput,req.body.passwordInput)
        if(temp.insertedUser !== true)
        {
          res.status(500).render('userRegister', {title: "Register",error:"Internal Server Error"}); // 500 error
        }
        else
        {
          res.redirect('/')
        }
      }
     
    } catch (e) {
      res.status(400).render('userRegister', {error:e}); // 400 error
    }
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    try {
      if(req.session.user)
      {
        res.redirect('/home',{title:"home"});
      }
      else
      {
        helpFunctions.stringChecker(req.body.usernameInput,"Username")
        helpFunctions.letternumberonly(req.body.usernameInput,"Username")
        helpFunctions.stringChecker(req.body.passwordInput,"Password")
        helpFunctions.letternumberonly(req.body.passwordInput,"Password")
        temp = await userData.checkUser(req.body.usernameInput,req.body.passwordInput)
      if(temp.authenticatedUser !== true)
      {
        res.status(400).render('userLogin', {title: "Login",error:"Invalid username or password"}); 
      }
      else
      {
        req.session.user = req.body.usernameInput;
        req.session.userId = temp;
        res.redirect('/home');
      }
    }
    } catch (error) {
      res.status(400).render('userLogin', {title: "Login", error:error}); // 400 error
    }

  })

router
  .route('/home')
  .get(async (req, res) => {
    if(req.session.user)
    {
      res.render('homepage', {title: "home", username:  req.session.user, date: new Date().toUTCString()}); // Needs to be whatever homepage it is and render that.
    }
    else
    {
      res.status(403).render('forbiddenAccess');
    }
  })

  router
  .route("/home/:userId")
  .get(async (req, res) => {
    if (
      !req.params.userId ||
      helper.stringChecker(req.params.userId) ||
      !ObjectId.isValid(req.params.userId)
    ) {
      // res.status(400).json({ error: "invalid id" });
      // return null;
    }
      //const post = await postdata.getUserById(req.params.userId);
      //res.render('userLogin', {title: "Login"}); Need to render a page that shows a good amount of posts.
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.session.destroy();
      res.render('logout', {title: "Logout"});
    } catch (error) {
      
    }
  })

module.exports = router ;