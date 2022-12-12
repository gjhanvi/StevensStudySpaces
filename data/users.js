const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoCollections = require('../config/mongoCollections');
const helper = require("../helpers.js");
const users = mongoCollections.users;

const createUser = async (username, password) => {
  username = await helper.checkUsername(username);
  password = await helper.checkPassword(password);

  const userCol = await users();
  const user = await userCol.findOne({ username: { '$regex': username, $options: 'i' } });
  if (user != null) throw 'There already exists a user with this username';

  const hash = await bcrypt.hash(password, saltRounds);
  let newUser = {
    username: username.toLowerCase(),
    password: hash
  };
  const insertInfo = await userCol.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add user';
  return { insertedUser: true };
};

const checkUser = async (username, password) => {
  username = await helper.checkUsername(username);
  password = await helper.checkPassword(password);

  const userCol = await users();
  const user = await userCol.findOne({ username: { '$regex': username, $options: 'i' } });

  if (user === null) {
    console.log("failed here");
    throw 'Either the username or password is invalid';
  }
  let comparison = false;

  comparison = await bcrypt.compare(password, user.password);
  if (comparison) {
    return {authenticatedUser: true};
  } else {
    throw 'Either the username or password is invalid';
  }
};
module.exports = { createUser, checkUser };