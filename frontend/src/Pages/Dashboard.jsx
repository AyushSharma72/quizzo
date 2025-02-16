import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Backdrop,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [username, setUserName] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editQuiz, setEditQuiz] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserName(JSON.parse(storedUser).username);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetchQuizzes();
    }
  }, [page, username]);

  const fetchQuizzes = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quizes?page=${page}&limit=5`
      );
      const data = await response.json();
      if (!response.ok) throw new Error("Failed to fetch quizzes");

      setQuizzes(data.quizzes);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quiz) => {
    setEditQuiz(quiz);
  };

  const handleUpdate = async () => {
    if (!editQuiz.title || !editQuiz.description) {
      toast.error("Title and description are required");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/quizzes/${editQuiz.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editQuiz.title,
            description: editQuiz.description,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update quiz");
      toast.success("Quiz updated successfully!");
      setEditQuiz(null);
      fetchQuizzes();
    } catch (err) {
      toast.error("Failed to update quiz.");
    } finally {
      setUpdating(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/Deletequizes/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete quiz");
      }

      toast.success("Quiz deleted successfully!");
      fetchQuizzes(); 
    } catch (err) {
      toast.error(err.message || "Failed to delete quiz.");
    }
  };


  return (
    <Box className="container mx-auto py-10">
      <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
        {username ? `${username}'s Dashboard` : "Dashboard"}
      </Typography>

      {!username && (
        <div className="w-3/4 sm:w-1/2 md:w-1/4 mx-auto flex flex-col gap-3">
          <Typography color="textSecondary" align="center">
            Please login to view quizzes created by you.
          </Typography>
          <Link to="/">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
              disabled={loading}
            >
              Login
            </Button>
          </Link>
        </div>
      )}

      {loading && username && (
        <Box className="flex justify-center mt-4">
          <CircularProgress />
        </Box>
      )}

      {!loading && username && quizzes.length === 0 && (
        <Typography color="textSecondary" align="center">
          No quizzes available.
        </Typography>
      )}

      <Box className="flex flex-col items-center gap-5">
        {username &&
          quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="shadow-md hover:shadow-lg transition w-[90%] sm:w-3/4 lg:w-1/2 relative"
            >
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <div className="absolute top-0 right-0">
                  <IconButton color="primary" onClick={() => handleEdit(quiz)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardHeader>
              <CardContent>
                <Typography color="textSecondary">
                  {quiz.description}
                </Typography>
                <Typography variant="caption" color="gray" mt={1}>
                  Created on: {new Date(quiz.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>

      {username && (
        <Box className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}

      {/* Edit Modal */}
      {editQuiz && (
        <Dialog open={Boolean(editQuiz)} onOpenChange={() => setEditQuiz(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Quiz</DialogTitle>
            </DialogHeader>
            <Input
              value={editQuiz.title}
              onChange={(e) =>
                setEditQuiz({ ...editQuiz, title: e.target.value })
              }
              placeholder="Quiz Title"
              className="mb-4"
            />
            <Input
              value={editQuiz.description}
              onChange={(e) =>
                setEditQuiz({ ...editQuiz, description: e.target.value })
              }
              placeholder="Quiz Description"
              className="mb-4"
            />
            <Button onClick={handleUpdate} disabled={updating}>
              {updating ? "Updating..." : "Update Quiz"}
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Backdrop while updating */}
      <Backdrop open={updating} style={{ zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Dashboard;
