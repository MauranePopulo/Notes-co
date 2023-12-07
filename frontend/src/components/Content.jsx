import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import RegisterUser from "../pages/RegisterUser";
import LoginUser from "../pages/LoginUser";
import NoteDashboard from "../pages/NoteDashboard";
import UpdateNote from "../pages/UpdateNote";

export default function Content() {
  return (
    <section className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/creationdecompte" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/note" element={<NoteDashboard />} />
        <Route path="/UpdateNote/:id" element={<UpdateNote />} />
      </Routes>
    </section>
  );
}
