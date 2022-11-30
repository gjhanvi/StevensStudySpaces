const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;


const createUser = async (username, password) => {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);


  };
  
  const checkUser = async (username, password) => {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);


   };
  
  module.exports = {};