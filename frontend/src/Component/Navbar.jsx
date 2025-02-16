import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">Quizzo</div>

        <div className="hidden sm:flex space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-white">
              Dashboard
            </Button>
          </Link>
          <Link to="/createQuiz">
            <Button variant="ghost" className="text-white">
              Create Quiz
            </Button>
          </Link>
          {user ? (
            <Button
              variant="ghost"
              className="text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/">
              <Button variant="ghost" className="text-white">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* hamburger icon  */}
        <button
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 mt-4">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="text-white w-full">
              Dashboard
            </Button>
          </Link>
          <Link to="/createQuiz" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="text-white w-full">
              Create Quiz
            </Button>
          </Link>
          {user ? (
            <Button
              variant="ghost"
              className="text-white w-full"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              Logout
            </Button>
          ) : (
            <Link to="/" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="text-white w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
