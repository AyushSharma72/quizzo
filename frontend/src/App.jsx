import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CreateQuiz from "./Pages/CreateQuiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/createQuiz" element={<CreateQuiz />} />
      {/*   <Route path="/quiz/:id" element={<QuizForm />} /> */}
    </Routes>
  );
}

export default App;
