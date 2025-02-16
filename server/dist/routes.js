var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const pool = require("./db.js");
const router = Router();
// Create a quiz
router.post("/api/quizes", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, user_id } = req.body;
    if (!title || !description || !user_id) {
        res
            .status(400)
            .json({ error: "Title, description, and user_id are required" });
        return;
    }
    const result = yield pool.query("INSERT INTO quiz (title, description, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *", [title, description, user_id]);
    res
        .status(201)
        .json({ message: "Quiz created successfully", quiz: result.rows[0] });
})));
// Get quizzes
router.get("/api/quizes", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const totalCountResult = yield pool.query("SELECT COUNT(*) FROM quiz");
    const totalQuizzes = parseInt(totalCountResult.rows[0].count);
    const totalPages = Math.ceil(totalQuizzes / limit);
    const result = yield pool.query("SELECT * FROM quiz ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limit, offset]);
    res.status(200).json({ quizzes: result.rows, totalPages });
})));
// Update a quiz
router.put("/api/quizzes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).json({ error: "Title and description are required" });
        return;
    }
    const result = yield pool.query("UPDATE quiz SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id]);
    if (result.rowCount === 0) {
        res.status(404).json({ error: "Quiz not found" });
        return;
    }
    res.json({ message: "Quiz updated successfully", quiz: result.rows[0] });
})));
// Delete a quiz
router.delete("/api/Deletequizes/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield pool.query("DELETE FROM quiz WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        res.status(404).json({ error: "Quiz not found" });
        return;
    }
    res.json({
        message: "Quiz deleted successfully",
        deletedQuiz: result.rows[0],
    });
})));
// Log in
router.post("/api/login", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return;
    }
    const result = yield pool.query("SELECT id, username FROM users WHERE username = $1 AND password = $2", [username, password]);
    if (result.rows.length === 0) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
    }
    res.status(200).json({
        message: "Login successful",
        user: { id: result.rows[0].id, username: result.rows[0].username },
    });
})));


module.exports = router;

