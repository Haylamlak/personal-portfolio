import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login"; // ✅ ADD THIS
import ProjectManager from "./pages/ProjectManager";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/projects-admin" element={<ProjectManager />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;