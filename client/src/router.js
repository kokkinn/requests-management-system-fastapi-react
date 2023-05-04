import { Route, Routes } from "react-router-dom";
import { MainPage } from "./components/mainPage";
import { LoginPage } from "./components/loginPage";
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
