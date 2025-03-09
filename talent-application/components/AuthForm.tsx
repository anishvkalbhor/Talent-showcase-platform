"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Signup / Login
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // User Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) alert(error.message);
      else router.push("/dashboard"); // Redirect after login
    } else {
      // User Signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) alert(error.message);
      else alert("Signup successful! Check your email to verify.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {isLogin ? "Login" : "Signup"}
      </h2>

      <form onSubmit={handleAuth} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
}
