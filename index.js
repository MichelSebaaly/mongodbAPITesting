const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
let studentsCollection;

const extractId = (req) => {
  const { ObjectId } = require("mongodb");
  const id = req.params.id;
  return new ObjectId(id);
};

// Read (GET ALL)
app.get("/students", async (req, res) => {
  const students = await studentsCollection.find().toArray();
  res.send(students);
});

// Delete
app.delete("/students/:id", async (req, res) => {
  const result = await studentsCollection.deleteOne({ _id: extractId(req) });
  res.send(result);
});

// Read (GET one)
app.get("/students/:id", async (req, res) => {
  const result = await studentsCollection.findOne({ _id: extractId(req) });
  res.send(result);
});

// Create (POST)
app.post("/students", async (req, res) => {
  const student = req.body;
  const result = await studentsCollection.insertOne(student);
  res.send(result);
});

//Update (PUT)
app.put("/students/:id", async (req, res) => {
  const studentToUpdate = req.body;
  const result = await studentsCollection.updateOne(
    { _id: extractId(req) },
    { $set: studentToUpdate }
  );
  res.send(result);
});

connectDB().then((collection) => {
  studentsCollection = collection;
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
});
