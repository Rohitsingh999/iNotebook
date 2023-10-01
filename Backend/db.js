const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://rohit:1001@cluster0.frz9tve.mongodb.net/?retryWrites=true&w=majority";

// const connectToMongo = () => {
//   mongoose.connect(mongoURI);
//   console.log(" connect to db successfully");
// };

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to mongoDB successfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectToMongo;
