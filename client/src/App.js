import "./App.css";
import { LoginForm } from "./components/loginForm";
import { AuthTestButton } from "./components/authTestButton";
import {LogoutButton} from "./components/logoutButton";
function App() {
  return (
    <div className="App">
      <LoginForm />
      <AuthTestButton />
        <LogoutButton/>
    </div>
  );
}

export default App;
