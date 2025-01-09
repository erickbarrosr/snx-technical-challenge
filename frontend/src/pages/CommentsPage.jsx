// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/posts/${postId}/comments`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setComments(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar comentários.");
      }
    };

    fetchComments();
  }, [postId, authToken]);

  const handleAddComment = async () => {
    if (!newComment) return;

    try {
      const response = await api.post(
        "/comments",
        { postId, content: newComment },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setComments([...comments, response.data.comment]);

      setNewComment("");
    } catch (err) {
      console.error(err);
      setError("Erro ao adicionar comentário.");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await api.delete(`/comments/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      console.error(err);
      setError("Erro ao deletar comentário.");
    }
  };

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centraliza horizontalmente
          mt: 2, // Margem superior
        }}
      >
        <TextField
          label="Novo comentário"
          variant="outlined"
          fullWidth
          size="small"
          sx={{
            width: "100%",
            maxWidth: "600px",
            mb: 1,
          }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          sx={{ width: "100%", maxWidth: "600px" }}
        >
          Adicionar
        </Button>
      </Box>
      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={comment.content} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentsSection;
