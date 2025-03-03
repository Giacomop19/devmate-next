"use client";
import { useSession } from "@/helper/ctx";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useSession();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("");

  //create local storage
  // const handleLogin = () => {
  //   const userData = {
  //     username,
  //     password
  //   }
  //   axios
  //   .post('http://localhost:8080/api/login', userData)
  //   .then(res => {
  //     console.log(res.data);
  //     if (res.status == 200) {
  //       signIn(res);
  //       router.replace("/");
  //     }
  //   })
  //   .catch(err => {
  //     alert(err.response.data.message)
  //     console.log(err)
  //   });
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      signIn(data.token); // Store token in localStorage (or use cookies)
      router.push("/"); // Redirect to home page after successful login
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
