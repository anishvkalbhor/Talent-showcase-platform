"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Navbar } from "@/components/Navbar";
import { ShootingStarsAndStarsBackgroundDemo } from "../stars";

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (!user) {
        router.push("/auth"); // Redirect only if no user
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    // Check user on initial load
    checkUser();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      {/* Starry Background */}
      <ShootingStarsAndStarsBackgroundDemo />

      {/* Navbar - Ensure it's above background */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="absolute flex flex-col items-center gap-6 z-40">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Welcome, {user?.firstName}
        </h1>
      </div>
    </div>
  );
}
