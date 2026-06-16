"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Signed in as</h2>
          <p className="mt-2 text-sm text-gray-600 font-medium">{session.user?.email}</p>
          <div className="mt-8">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all active:scale-95"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-lilac rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-primary-lilac/20">
            E
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your events and live walls.</p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={() => signIn("google", { callbackUrl: '/dashboard' })}
            className="group relative w-full flex justify-center items-center gap-3 py-4 px-4 border border-gray-200 text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-lilac transition-all active:scale-95 shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google logo" />
            Continue with Google
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
