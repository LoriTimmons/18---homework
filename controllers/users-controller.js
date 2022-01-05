const { User } = require('../models');

const userController ={
// get all Users
getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUsersById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  createUsers({ body }, res) {
    console.log('rotue is running')
    User.create(body)
      .then(dbUsersData => res.json(dbUsersData))
      .catch(err => res.json(err));
  },
  // add friend to user id
  addFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No ID associated with a User' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

// update-user data
updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No ID associated with a User'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err))
},

// delete user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No ID associated with a User'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err))
},

// remove friend from user by user id/ friend id
removeUser({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId }},
        { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}
};


  module.exports = userController;