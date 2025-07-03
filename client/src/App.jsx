import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // your book manager page
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Library from "./pages/Library";


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected route here */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
        path="/library"
        element={
          <ProtectedRoute>
            <Library/>
          </ProtectedRoute>
        }
        />
      </Routes>
    </Router>
  );
};

export default App;
