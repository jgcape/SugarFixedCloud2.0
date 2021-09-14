require('dotenv').config();
const mongoose = require('mongoose');

// Function to connect to MongoDB and perform operations
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Testing database connectivity
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log("Database connection successful!");
});

exports.db = mongoose;