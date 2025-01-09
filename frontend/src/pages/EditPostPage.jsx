// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setPost(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar post.");
      }
    };

    fetchPost();
  }, [id, authToken]);

  const handleUpdatePost = async () => {
    try {
      const response = await api.put(
        `/posts/${id}`,
        { title: post.title, content: post.content },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response);

      navigate("/");
    } catch (err) {
      console.error("Error in handleUpdatePost => ", err);
      setError("Erro ao atualizar post.");
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
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        sx={{ maxWidth: 600 }}
      />
      <TextField
        label="Conteúdo"
        variant="outlined"
        fullWidth
        margin="normal"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
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
          onClick={handleUpdatePost}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 10,
          }}
        >
          Atualizar Post
        </Button>
      </Box>
    </Box>
  );
};

export default EditPostPage;
