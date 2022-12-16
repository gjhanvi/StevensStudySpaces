const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const helpFunctions = require("../helpers.js");
const userData = require("../data/users.js");
const { ObjectId } = require("mongodb");
const postdata = require("../data/posts.js");
const xss = require('xss');


router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      res.redirect('/home');
    }
    else {
      res.render('userLogin', { title: "Login" });
    }
  });

router
  .route('/register')
  .get(async (req, res) => {
    if (req.session.user) {
      res.redirect('/home');
    }
    else {
      res.render('userRegister', { title: "Register" });
    }
  })
  .post(async (req, res) => {
    try {
      if (req.session.user) {
        res.redirect('/home');
      }
      else {
        // add all error handling 
        helpFunctions.stringChecker(xss(req.body.usernameInput), "Username");
        helpFunctions.stringChecker(xss(req.body.passwordInput), "Password");

        req.body.firstNameInput = helpFunctions.checkName(xss(req.body.firstNameInput));
        req.body.lastNameInput = helpFunctions.checkName(xss(req.body.lastNameInput));
        // console.log(firstName);
        // console.log(lastName);
        let temp = await userData.createUser(xss(req.body.usernameInput), xss(req.body.passwordInput), xss(req.body.firstNameInput), xss(req.body.lastNameInput));
        if (temp.insertedUser !== true) {
          res.status(500).render('userRegister', { title: "Register", error: "Internal Server Error" }); // 500 error
        }
        else {
          req.session.user = req.body.usernameInput;
          req.session.userId = temp.userId;
          res.redirect('/home');
        }
      }
    } catch (e) {
      res.status(400).render('userRegister', { error: e }); // 400 error
    }
  });

router
  .route('/login')
  .post(async (req, res) => {
    try {
      if (req.session.user) {
        res.redirect('/home', { title: "home" });
      }
      else {
        helpFunctions.stringChecker(xss(req.body.usernameInput), "Username")
        helpFunctions.stringChecker(xss(req.body.passwordInput), "Password")
        temp = await userData.checkUser(xss(req.body.usernameInput), xss(req.body.passwordInput))
        if (temp.authenticatedUser !== true) {
          res.status(400).render('userLogin', { title: "Login", error: "Invalid username or password" });
        }
        else {
          req.session.user = xss(req.body.usernameInput);
          req.session.userId = temp.userId;
          res.redirect('/home');
        }
      }
    } catch (error) {
      res.status(400).render('userLogin', { title: "Login", error: error }); // 400 error
    }
  });

router
  .route('/home')
  .get(async (req, res) => {
    if (req.session.user) {
      res.render('homepage', { title: "home", username: req.session.user, date: new Date().toUTCString() }); // Needs to be whatever homepage it is and render that.
      //res.render('newPost', {title: "New Post"});
    }
    else {
      res.status(403).render('forbiddenAccess');
    }
  });

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.session.destroy();
      res.render('logout', { title: "Logout" });
    } catch (error) {

    }
  });

module.exports = router;
