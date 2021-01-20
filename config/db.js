const mongoose = require('mongoose');
const config = require('config');
const db_url = config.get('mongoURI');

// db connect function

const connectDb = async () => {
    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true
        })
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDb;