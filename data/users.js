const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoCollections = require('../config/mongoCollections');
const helper = require("../helpers.js");
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');

const createUser = async (username, password, firstName, lastName) => {
  username = await helper.checkUsername(username);
  password = await helper.checkPassword(password);
  firstName =  helper.checkName(firstName);
  lastName = helper. checkName(lastName); 

  const userCol = await users();
  const user = await userCol.findOne({ username: { '$regex': username, $options: 'i' } });
  if (user != null) throw 'There already exists a user with this username';

  const hash = await bcrypt.hash(password, saltRounds);
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    username: username.toLowerCase(),
    password: hash,
    comments: []
  };
  const insertInfo = await userCol.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add user';
  return { insertedUser: true };
  //return newUser;
};

const checkUser = async (username, password) => {
  username = await helper.checkUsername(username);
  password = await helper.checkPassword(password);

  const userCol = await users();
  const user = await userCol.findOne({ username: { '$regex': username, $options: 'i' } });

  if (user === null) {
    throw 'Either the username or password is invalid';
  }
  let comparison = false;

  comparison = await bcrypt.compare(password, user.password);
  if (comparison) {
    return {authenticatedUser: true, userId: user._id};
  } else {
    throw 'Either the username or password is invalid';
  }
};

const getUserById = async (id) => {
  id = id.trim();
  const userCol = await users();
  const theOne = await userCol.findOne({_id: ObjectId(id)});
  if (theOne === null) throw 'There is no user with that ID';
  return theOne;
};


module.exports = { createUser, checkUser, getUserById};