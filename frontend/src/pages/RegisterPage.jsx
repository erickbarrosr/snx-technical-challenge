// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );

      console.log(response);

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao registrar o usuário.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Faça o seu cadastro:
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">Usuário registrado com sucesso!</Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", maxWidth: 400, mt: 2 }}
      >
        <TextField
          label="Nome"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Usuário"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Registrar
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Já tem cadastro?{" "}
        <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
          Faça o seu login!
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
