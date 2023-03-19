const {connectMongo} = require('./db/connection.js');
const app = require('./app');

const{PORT = 3000} = process.env;

const start = async () => {
  try{

    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  } catch (err) {
console.error(`Error function start`, err.message);
process.exit(1);
  }
}

start();
