import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Form Builder App
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Create and manage custom forms easily.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-lg"
        >
          Admin Login
        </Link>
        <Link
          to="/forms"
          className="bg-green-500 text-white px-6 py-2 rounded-md shadow-lg"
        >
          View Forms
        </Link>
      </div>
    </div>
  );
}

export default Home;
