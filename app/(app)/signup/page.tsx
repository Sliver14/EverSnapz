"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/auth";

export default function Signup() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (session) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signUp({ email, password, name });
      if (res.success) {
        // Automatically sign in after signup
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (loginRes?.error) {
          setError("Account created, but failed to sign in automatically.");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <Link href="/">
            <div className="mx-auto h-16 w-16 bg-primary-lilac rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-primary-lilac/20 cursor-pointer">
              E
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">Start collecting photos from your guests for free.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-text mb-2">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full px-5 py-4 bg-bg-light border border-border-color rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-lilac/20 focus:border-primary-lilac transition-all text-dark-text font-medium"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-text mb-2">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="name@example.com"
                className="w-full px-5 py-4 bg-bg-light border border-border-color rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-lilac/20 focus:border-primary-lilac transition-all text-dark-text font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-text mb-2">Password</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-bg-light border border-border-color rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-lilac/20 focus:border-primary-lilac transition-all text-dark-text font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-lilac hover:bg-dark-lilac focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-lilac transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-400 font-medium">Or continue with</span>
          </div>
        </div>

        <div>
          <button
            onClick={() => signIn("google", { callbackUrl: '/dashboard' })}
            className="group relative w-full flex justify-center items-center gap-3 py-4 px-4 border border-gray-200 text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-lilac transition-all active:scale-95 shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google logo" />
            Google
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-lilac hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
