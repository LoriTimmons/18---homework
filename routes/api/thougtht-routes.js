const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    createReaction,
    thoughtUpdated,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller')

// get all
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// get thoughts by id/ update/ delete 
router
    .route('/:id')
    .get(getThoughtById)
    .put(thoughtUpdated)
    .delete(deleteThought)

// reactions 
router
    .route('/:thoughtId/reactions')
    .post(createReaction)

// delete reactions 
router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction)

module.exports = router;