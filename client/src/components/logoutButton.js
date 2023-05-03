export function LogoutButton() {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("Authorization");
          console.log("User have been logged out");
      }}
      type="submit"
      id="test-auth"
    >
      Logout
    </button>
  );
}
