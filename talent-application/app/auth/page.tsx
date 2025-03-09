"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 Handle Email/Password Auth
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isSignup) {
      if (!firstName || !lastName) {
        setError("First name and Last name are required!");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
      }
    }

    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard"); // Redirect after login/signup
    }

    setLoading(false);
  };

  // 🔹 Handle OAuth Login (Google/GitHub)
  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`, // Redirect after login
      },
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Email/Password Form */}
        <form onSubmit={handleAuth} className="flex flex-col">
        {isSignup && (
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-2"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* OAuth Login Buttons */}
        <div className="flex flex-col space-y-2 mt-4">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
            disabled={loading}
          >
            Sign in with Google
          </button>

          <button
            onClick={() => handleOAuthLogin("github")}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md"
            disabled={loading}
          >
            Sign in with GitHub
          </button>
        </div>

        <p className="text-white mt-4 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="text-blue-500 hover:underline ml-1"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
