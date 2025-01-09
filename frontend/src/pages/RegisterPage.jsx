// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import api from "../services/api";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "O nome é obrigatório.";
    if (!formData.username.trim())
      newErrors.username = "O usuário é obrigatório.";
    if (!formData.password.trim())
      newErrors.password = "A senha é obrigatória.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    setSuccess(false);

    if (!validateForm()) return;

    try {
      const response = await api.post("/register", formData);

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
      <img
        src="../../public/logo.png"
        alt="Logo"
        style={{ width: 252, marginBottom: 80 }}
      />
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
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Usuário"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
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
          error={!!errors.password}
          helperText={errors.password}
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
