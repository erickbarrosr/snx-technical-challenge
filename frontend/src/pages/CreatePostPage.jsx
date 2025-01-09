// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.content) return;

    try {
      const response = await api.post(
        "/posts",
        { title: newPost.title, content: newPost.content },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Erro ao adicionar post.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Título"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        sx={{ maxWidth: 600 }}
      />
      <TextField
        label="Conteúdo"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newPost.content}
        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        sx={{ maxWidth: 600 }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ width: "100%", mt: 2 }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoBack}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
          }}
        >
          Voltar
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleAddPost}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 10,
          }}
        >
          Adicionar Post
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePostPage;
