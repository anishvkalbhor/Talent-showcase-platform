"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Menu, X } from "lucide-react"; // Icons for mobile menu toggle

export function Navbar() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Logs out user
    router.push("/auth"); // Redirect to login page
  };

  return (
    <nav className="absolute top-0 left-0 w-full bg-black/50 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center z-20">
      {/* Logo */}
      <h1
        className="text-white text-2xl font-semibold cursor-pointer hover:text-gray-300 transition"
        onClick={() => router.push("/dashboard")}
      >
        Latent
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <button
          onClick={() => router.push("/profile")}
          className="text-white hover:text-gray-300 transition"
        >
          Profile
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="text-white hover:text-gray-300 transition"
        >
          Settings
        </button>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 bg-gray-900 w-48 rounded-md p-4 flex flex-col gap-4 md:hidden">
          <button
            onClick={() => router.push("/profile")}
            className="text-white hover:text-gray-300 transition"
          >
            Profile
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="text-white hover:text-gray-300 transition"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
