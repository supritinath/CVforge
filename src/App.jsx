import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateCV from "./pages/CreateCV";
import TemplateSelection from "./pages/TemplateSelection";
import CVPreview from "./pages/CVPreview";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* CV Builder */}
        <Route path="/create-cv" element={<CreateCV />} />
        <Route path="/edit-cv" element={<CreateCV />} />

        {/* Templates */}
        <Route path="/templates" element={<TemplateSelection />} />

        {/* CV Preview */}
        <Route path="/cv-preview" element={<CVPreview />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
