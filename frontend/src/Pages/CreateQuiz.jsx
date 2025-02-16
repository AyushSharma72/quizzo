import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Typography } from "@mui/material";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("You must be logged in to create a quiz.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/quizes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            user_id: user.id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create quiz");
      toast.success("Quiz created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserName(JSON.parse(storedUser).username);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="from-gray-50 to-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-6">
        Create a New Quiz
      </h2>
      {!username ? (
        <div className="container mx-auto w-1/2 sm:w-1/4 gap-3 flex flex-col">
          <Typography color="textSecondary" align="center">
            Please login to create a new quiz
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
      ) : (
        <div className="flex items-center justify-center min-h-[460px] bg-gradient-to-b  p-6">
          <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <Label htmlFor="title" className="text-gray-700 font-medium">
                  Quiz Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-2"
                  disabled={loading}
                />
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="text-gray-700 font-medium"
                >
                  Description
                </Label>
                <textarea
                  id="description"
                  placeholder="Enter quiz description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-2 w-full h-30 p-3 border rounded-lg resize-none"
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Quiz"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
