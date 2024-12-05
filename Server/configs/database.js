const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/factoryDB').then(() => { console.log("Connected to the database") });
