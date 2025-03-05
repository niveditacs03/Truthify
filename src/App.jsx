import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('metamaskAccount');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App()
{
  return <div className="container">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/posts" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }/>
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage/>
        </ProtectedRoute>
      }/>
       <Route path="/register" element={
          <RegisterPage/>
      }/>
    </Routes>
  </BrowserRouter>
  </div>
}
export default App;