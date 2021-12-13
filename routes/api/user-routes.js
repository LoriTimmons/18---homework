const router = require('express').Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers
  } = require('../../controllers/pizza-controller');
  
//  api/user
  router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);
  
  // /api/users/:id
  router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);
  
  module.exports = router;
  