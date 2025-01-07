const { Post } = require("../models");

const postController = {
  async createPost(req, res) {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Título e conteúdo são obrigatórios." });
      }

      const newPost = await Post.create({
        title,
        content,
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

  async getPosts(req, res) {
    try {
      const posts = await Post.findAll();

      if (posts.length === 0) {
        return res.status(404).json({ message: "Nenhum post encontrado." });
      }

      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar os posts." });
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
};

module.exports = postController;
