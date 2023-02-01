const mongoose = require('mongoose');
const DB_HOST = 'mongodb+srv://Oleksandr:Oleksandr@cluster0.mn1u4ye.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

const connectMongo = () => {
    mongoose.connect(DB_HOST)
.then (
    () => {console.log("Database connection successful")}
) 
.catch ((err) => {
    console.error(`Error connectMongo:`, err.message);
    process.exit(1);
})
}

module.exports = {connectMongo};

