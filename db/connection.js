const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const {DB_HOST} = process.env;

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const connectMongo = () => {
    mongoose.connect(DB_HOST)
.then (
    () => {console.log("Database connection successful")}
) 
.catch ((err) => {
    console.error(`Error connectMongo:`, err.message);
})
}
module.exports = {connectMongo};

