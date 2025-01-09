/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
  Button,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import CommentsPage from "./CommentsPage";

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const { authToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    return currentTime >= expirationTime;
  };

  const fetchPosts = async () => {
    if (isTokenExpired(authToken)) {
      logout();
      navigate("/login");

      return;
    }

    try {
      const response = await api.get("/posts", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.message) {
        setPosts([]);
        setError(response.data.message);
      } else {
        setPosts(response.data);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar posts.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const handleDeletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
      setError("Erro ao deletar post.");
    }
  };

  const toggleComments = (postId) => {
    setExpandedPost((prev) => (prev === postId ? null : postId));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        Sair
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      <Link to="/create" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}
        >
          Novo Post
        </Button>
      </Link>
      <List sx={{ width: "100%", maxWidth: 600, mt: 4 }}>
        {posts.map((post) => (
          <Box key={post.id} sx={{ mb: 2 }}>
            <ListItem>
              <ListItemText primary={post.title} secondary={post.content} />
              <Link to={`/edit/${post.id}`}>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeletePost(post.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => toggleComments(post.id)}
              >
                <CommentIcon />
              </IconButton>
            </ListItem>
            <Collapse
              in={expandedPost === post.id}
              timeout="auto"
              unmountOnExit
            >
              <CommentsPage postId={post.id} />
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};
export default PostsListPage;
