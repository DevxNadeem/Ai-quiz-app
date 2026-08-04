import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Information from "./pages/Information";
import Testlayout from "./pages/Testlayout";

import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/test/info/:id"
        element={
          <ProtectedRoute>
            <Information />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz/test/:id"
        element={
          <ProtectedRoute>
            <Testlayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;