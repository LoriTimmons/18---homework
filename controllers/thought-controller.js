const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts route
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    // get one by id route
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch( err => {
            console.log(err);
            res.status(500).json(err)
        })
    },

    // create thoughts 
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: {thoughts: _id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // create reaction 
    createReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.ThoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    // delete reaction 
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true } 
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // update single thought by id 
    thoughtUpdated({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(thoughtUpdated => {
            if (!thoughtUpdated) {
                return res.status(404).json({ message: 'No thought found!'});
            }
            res.json(thoughtUpdated);
        })
        .catch(err => res.json(err));
    },

    // delete single thought by id 
    deleteThought({ params, body}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtDeleted => {
            if (!thoughtDeleted) {
                return res.status(404).json({ message: 'No thought found!'})
            }
            res.json(thoughtDeleted);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController