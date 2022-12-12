const userRoutes = require('./users');
const postRoutes = require("./posts");
const commentRoutes = require("./comment");
const buildingRoutes = require("./building");

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/posts', postRoutes);
  app.use('/comment', commentRoutes);
  app.use('/building', buildingRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
