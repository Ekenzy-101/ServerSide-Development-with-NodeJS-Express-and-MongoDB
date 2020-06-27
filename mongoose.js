const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.DB_CONNECT;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then((db) => {
  console.log("Connected correctly to the server");
  let newDish = Dishes({
    name: "Uthappizza",
    description: "test",
  });
  newDish
    .save()
    .then((dish) => {
      console.log(dish);
      return Dishes.find({});
    })
    .then((dishes) => {
      console.log(dishes);
      return Dishes.remove({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
