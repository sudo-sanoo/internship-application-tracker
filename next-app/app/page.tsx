'use client';

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Auth from "@/components/auth/Auth";

export default function Home() {
  // useAuth() here asks two questions:
  // 1. Is there a logged-in user? (user)
  // 2. Are we still checking with Supabase? (loading)
  const { user, loading } = useAuth();

  // useRouter() gives a component the ability to change the current URL programmatically. (like automatically clicking a link) 
  const router = useRouter();

  // If the check is finished and we found a logged-in user, push /dashboard to the URL and redirect there.
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading]);

  // If the code skips the check above, it means:
  // 1. The user is not logged in.
  // 2. We are still checking with Supabase.

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* 
          If loading is true, show "Loading...".
          If loading is false, show "Login Form".
      */}
      { loading ? <h1>Loading...</h1> : <Auth /> }
    </div>
  );
}
