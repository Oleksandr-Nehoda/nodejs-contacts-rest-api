const {connectMongo} = require('./db/connection.js');
const app = require('./app');


const start = async () => {
  try{

    await connectMongo();

    app.listen(3001, () => {
      console.log("Server running. Use our API on port: 3001");
    })
  } catch (err) {
console.error(`Error function start`, err.message);
process.exit(1);
  }
}

start();
