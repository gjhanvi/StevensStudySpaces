const userRoutes = require('./users');
const postRoutes = require("./post");
const commentRoutes = require("./comment");
const buildingRoutes = require("./building");

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/', postRoutes);
  app.use('/', commentRoutes);
  app.use('/', buildingRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;