import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("auth", true);
      navigate("/form-builder");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-gray-50 w-full h-screen flex justify-center items-center">
      <div className="bg-white border rounded-md p-12 w-1/4 shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4 border-b p-2">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border rounded-sm p-3 w-full mb-2 mt-4 shadow-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-sm p-3 w-full mb-2 mt-4 shadow-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white shadow-md rounded-sm px-4 py-2.5 w-full mt-6 mb-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link
          to="/"
          className="flex rounded-sm border justify-center items-center"
        >
          <span>
            <MdOutlineKeyboardBackspace />
          </span>
          Back
        </Link>
      </div>
    </div>
  );
}

export default Login;
