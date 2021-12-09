// connecting to mongoose db locally 

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/socialNetwork", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;