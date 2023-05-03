import "./App.css";
import { LoginForm } from "./components/auth/loginForm";
import { AuthTestButton } from "./components/auth/authTestButton";
import { LogoutButton } from "./components/auth/logoutButton";
import { AuthContextProvider } from "./contexts/authContext";
import { LoggedArea } from "./components/auth/loggedArea";
import { NavBar } from "./components/base/navbar";
function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <NavBar />
        <LoginForm />
        <AuthTestButton />
        <LogoutButton />
        <br />
        <LoggedArea />
      </div>
    </AuthContextProvider>
  );
}

export default App;
