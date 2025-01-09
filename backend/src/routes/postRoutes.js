const express = require("express");
const postController = require("../controllers/postController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/posts", authMiddleware, postController.getPosts);

router.post("/posts", authMiddleware, postController.createPost);
router.put("/posts/:id", authMiddleware, postController.updatePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);

module.exports = router;
