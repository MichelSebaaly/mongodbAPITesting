const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://studentapi:student123@cluster0.hc3lyws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  console.log("Connected to mongoDB atlas");
  return client.db("training").collection("students");
}

module.exports = connectDB;
