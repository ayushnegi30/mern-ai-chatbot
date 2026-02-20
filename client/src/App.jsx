import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
