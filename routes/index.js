const router = require('express').Router();
const req = require('express/lib/request');
const apiRoutes = require('./api');

// adds api prefix to all api routes
router.use('/api', apiRoutes);

// error for routing to api folder
router.use((req, res) => {
  res.status(404).send('<h1>error 404!</h1>');
});

module.exports = router;