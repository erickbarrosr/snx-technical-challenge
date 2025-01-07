const express = require("express");
const commentController = require("../controllers/commentController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/comments", authMiddleware, commentController.createComment);
router.delete("/comments/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
