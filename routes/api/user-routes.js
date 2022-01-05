const router = require('express').Router();

// declare all routing functions
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    removeUser
  } = require('../../controllers/user-controller');
  
  // create/ get all users
  router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
  
  // get user by id/ update and delete user by id
  router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// add friend to user/ remove friend from user by using userId
  router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeUser)

module.exports = router;