const { Comment, Post } = require("../models");

const commentController = {
  async createComment(req, res) {
    try {
      const { postId, content } = req.body;

      if (!content) {
        return res
          .status(400)
          .json({ error: "Conteúdo do comentário é obrigatório." });
      }

      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      const newComment = await Comment.create({
        postId,
        content,
      });

      return res.status(201).json({
        message: "Comentário criado com sucesso!",
        comment: {
          id: newComment.id,
          content: newComment.content,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar o comentário." });
    }
  },

  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado." });
      }

      await comment.destroy();

      return res
        .status(200)
        .json({ message: "Comentário deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar o comentário." });
    }
  },
};

module.exports = commentController;
