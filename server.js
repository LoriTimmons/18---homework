const express = require('express');
const mongooseConnection = require('./config/connections');
const routes = require('./routes'); 
const db = require('./models');

// const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongoose.set('debug', true);

app.use(routes);


// keep at bottom 

mongooseConnection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
})
