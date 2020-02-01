const Users = require('./auth.controller');

module.exports = (router) => {
  /* Auth  Users*/
  router.post('/register', Users.createUser);
  router.post('/login', Users.loginUser);
  router.get('/users/all', Users.getAll);
  router.delete('/users/delete', Users.delete);
  router.post('/users/update', Users.update);
}
