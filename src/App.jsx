import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Employ from "./Pages/Employ";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary

const App = () => (
  <Router>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employ" element={<Employ />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;