// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(response.data);
    } catch (err) {
      console.error(err);

      setError("Erro ao buscar posts.");
    }
  };

  const handleAddPost = async () => {
    if (!newPost) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/posts",
        { content: newPost },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPosts([...posts, response.data]);
      setNewPost("");
    } catch (err) {
      console.error(err);

      setError("Erro ao adicionar post.");
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);

      setError("Erro ao deletar post.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddPost();
        }}
        sx={{ width: "100%", maxWidth: 400, mt: 2 }}
      >
        <TextField
          label="Novo Post"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Adicionar Post
        </Button>
      </Box>
      <List sx={{ width: "100%", maxWidth: 400, mt: 4 }}>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeletePost(post.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={post.content} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PostsPage;
