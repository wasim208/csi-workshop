const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://wasim:PASSword@cluster0.5rcri.mongodb.net/todoApp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB ", err);
  });

module.exports = mongoose;
