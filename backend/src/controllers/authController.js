const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authController = {
  async register(req, res) {
    try {
      const { name, username, password } = req.body;

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Username já está em uso." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        username,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "Usuário registrado com sucesso!",
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao registrar o usuário." });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Credenciais inválidas." });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login bem-sucedido!",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao fazer login." });
    }
  },
};

module.exports = authController;
