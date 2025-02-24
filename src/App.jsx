import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormBuilder from "./pages/FormBuilder";
import Login from "./pages/Login";
import FormList from "./pages/FormList";
import FormDetail from "./pages/FormDetail";
import ResponsePage from "./pages/ResponsePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-builder" element={<FormBuilder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forms" element={<FormList />} />
        <Route path="/forms/:id" element={<FormDetail />} />
        <Route path="/responses" element={<ResponsePage />} />
      </Routes>
    </Router>
  );
}

export default App;
