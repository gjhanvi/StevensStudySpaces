const userRoutes = require('./users');
const postRoutes = require('./posts');
const commentRoutes = require('./comment');


const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/posts', postRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
