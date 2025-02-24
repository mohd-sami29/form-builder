import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Welcome to the Form Builder App
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-6">
        Create and manage custom forms easily.
      </p>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-xs sm:max-w-md">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-lg text-center w-full"
        >
          Admin Login
        </Link>
        <Link
          to="/forms"
          className="bg-green-500 text-white px-6 py-2 rounded-md shadow-lg text-center w-full"
        >
          View Forms
        </Link>
      </div>
    </div>
  );
}

export default Home;
