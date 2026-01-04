const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");

app.get("/", (req, res) => {
    res.send("Library Management System API is running");
});
});

