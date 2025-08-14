import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Links from "../pages/userAutenticado/link";
import CriarLink from "../pages/userAutenticado/criarLink";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/links" element={<Links />} />
      <Route path="/criar-link" element={<CriarLink />} />
    </Routes>
  );
}
