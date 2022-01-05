const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const thoughts = require('./thought-routes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughts);

router.use((req, res) => {
    res.status(404).send('<h1>error 4040!</h1>');
})

module.exports = router;