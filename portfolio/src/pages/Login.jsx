import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://portfoliobackend-qjog.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", `Bearer ${data.token}`);
      window.location.href = "/admin";
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default Login;