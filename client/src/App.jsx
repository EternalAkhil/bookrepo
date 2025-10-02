import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // your book manager page
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Library from "./pages/Library";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Toaster 
        position="top-center" // Customize where toasts appear
        reverseOrder={false}  // New toasts appear below old ones
      />
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
