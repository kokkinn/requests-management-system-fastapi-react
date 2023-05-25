import { Route, Routes } from "react-router-dom";
import { MainPage } from "./components/pages/mainPage";
import { LoginPage } from "./components/pages/loginPage";
import { SampleForm } from "./components/requests/sampleForm";
import { SourcesPage } from "./components/pages/sourcesPage";
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sample-form" element={<SampleForm />} />
      <Route path="/sources" element={<SourcesPage />} />
    </Routes>
  );
}
