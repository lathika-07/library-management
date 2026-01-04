const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


// ➕ Add a new book
router.post("/add", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// 📖 Get all books
router.get("/all", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});


// 🔍 Filter books by category and year
router.get("/filter", async (req, res) => {
    const { category, year } = req.query;
    const books = await Book.find({ category, year });
    res.json(books);
});


// ✏️ Update available copies
router.put("/update/:id", async (req, res) => {
    const { availableCopies } = req.body;

    if (availableCopies < 0) {
        return res.status(400).json({ message: "Copies cannot be negative" });
    }

    const book = await Book.findByIdAndUpdate(
        req.params.id,
        { availableCopies },
        { new: true }
    );

    res.json({ message: "Book updated", book });
});


// ❌ Delete book only if copies are zero
router.delete("/delete/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (book.availableCopies > 0) {
        return res.status(400).json({ message: "Cannot delete book with available copies" });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
});

module.exports = router;
