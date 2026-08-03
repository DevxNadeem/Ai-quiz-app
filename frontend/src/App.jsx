import { Navigate, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import {useAuth} from "./context/AuthContext"


function ProtectedRoute({ children }) {
  const { user , loading} = useAuth();
  if(loading) return <div>loading...</div>
  if (!user) return <Navigate to="/login" replace />;
  return children;
}



function App() {
  

  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
    </div>
  )
}

export default App
