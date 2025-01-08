// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authToken, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/posts");
    }
  }, [authToken, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/auth/login", { username, password });
      const { token } = response.data;

      login(token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError("Usuário ou senha inválidos.");
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
        Faça o seu Login:
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ width: "100%", maxWidth: 400, mt: 2 }}
      >
        <TextField
          label="Usuário"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
      </Box>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Não é cadastrado?{" "}
        <Link
          to="/register"
          style={{ color: "#1976d2", textDecoration: "none" }}
        >
          Faça o seu cadastro!
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
