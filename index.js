require("dotenv").config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

//to handle uncaught exceptions / errors occurred in synchronous code
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled exception. Shutting down!!");
  process.exit(1);
});

// connecting database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.warn(err.message));

// listening on a specified port
const PORT = process.env.PORT || 9003;
app.listen(PORT, () => console.log(`server running on ${PORT}!`));

//to handle unhandled rejection / errors occurred in asynchronous code
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection. Shutting down!!");
  server.close(() => process.exit(1));
});
