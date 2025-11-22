import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Employ from "./Pages/Employ";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import NotFound from "./Pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary
import CursorGlow from "./components/CursorGlow";

function App() {
  return (
    <ErrorBoundary>
      <CursorGlow />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employ" element={<Employ />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;