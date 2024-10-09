import { Route, Routes } from "react-router-dom";

import Users from "./pages/Usuarios";
import Inicio from "./pages/Inicio";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route path="/users" element={<Users />} />
    </Routes>
  );
}
