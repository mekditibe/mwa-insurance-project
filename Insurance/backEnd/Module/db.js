const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/insurance');

const mongoString = "mongodb+srv://mekdes:Butu0917171194@cluster0.mhuk3j1.mongodb.net/insurance?retryWrites=true&w=majority";

//"mongodb+srv://<username>:<password>@test.pxqht.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
  console.log(error)
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
})


module.exports = {db:mongoose};