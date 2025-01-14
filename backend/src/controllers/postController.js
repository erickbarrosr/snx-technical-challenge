const { Post, Comment } = require("../models");

const postController = {
  async getPosts(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const posts = await Post.findAll({
        where: { userId },
      });

      if (posts.length === 0) {
        return res
          .status(200)
          .json({
            message:
              "Ops, parece que esta área está vazia. Bora adicionar um post?",
          });
      }

      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar os posts." });
    }
  },

  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const post = await Post.findOne({
        where: { id, userId },
      });

      if (!post) {
        return res
          .status(404)
          .json({ error: "Post não encontrado ou não autorizado." });
      }

      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar o post." });
    }
  },

  async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const userId = req.user?.id;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Título e conteúdo são obrigatórios." });
      }

      if (!userId) {
        return res.status(400).json({ error: "Usuário não autenticado." });
      }

      const newPost = await Post.create({
        title,
        content,
        userId,
      });

      return res.status(201).json({
        message: "Post criado com sucesso!",
        post: {
          id: newPost.id,
          title: newPost.title,
          content: newPost.content,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar o post." });
    }
  },

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      post.title = title || post.title;
      post.content = content || post.content;

      await post.save();

      return res.status(200).json({
        message: "Post atualizado com sucesso!",
        post: {
          id: post.id,
          title: post.title,
          content: post.content,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar o post." });
    }
  },

  async deletePost(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      await post.destroy();

      return res.status(200).json({ message: "Post deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar o post." });
    }
  },

  async getCommentsByPost(req, res) {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      const comments = await Comment.findAll({
        where: { postId: id },
      });

      return res.status(200).json(comments);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      return res.status(500).json({ error: "Erro ao buscar comentários." });
    }
  },
};

module.exports = postController;
