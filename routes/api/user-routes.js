const router = require('express').Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    addFriend,
    deleteUsers
  } = require('../../controllers/api/users');
  
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
  // add friend to user / remove 
  router 
  .route('/:userID/friends/:friendID')
  .post(addFriend)
  .delete(removeUser)
  
  module.exports = router;
  