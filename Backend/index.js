const connectToMongo = require("./db");
//Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.
const express = require("express");
const cors = require("cors");
connectToMongo();

const app = express();
const port = 5000;

app.use(cors()); //// Use the CORS middleware for (CORS is a browser mechanism that enables servers to specify who can access their resources.)
app.use(express.json());

//avilable Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

app.listen(port, () => {
  console.log(` iNotebook app listening on port ${port}`);
});
