"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard?new=true");
  };

  return (
    <div className="min-h-screen flex items-center justify-center page-wrapper bg-bg-light">
      <div className="w-full max-w-[440px] card !p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-border-color rounded-[20px]">
        <div className="text-center mb-8">
          <h3 className="text-[26px] font-extrabold mb-2 tracking-[-0.5px]">Join EverSnapz today</h3>
          <p className="text-gray-text">Never miss a memory</p>
        </div>

        <button 
          onClick={() => router.push("/dashboard?new=true")}
          className="btn btn-outline w-full p-3 mb-5 font-semibold text-sm flex justify-center gap-2.5 border-[#ddd] rounded-lg"
        >
          <img src="https://www.google.com/favicon.ico" className="w-[18px] h-[18px]" alt="Google" />
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border-color"></div>
          <span className="text-[12px] text-[#b3a9c9] font-semibold uppercase tracking-[0.5px]">or email</span>
          <div className="flex-1 h-px bg-border-color"></div>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-[18px]">
          <div>
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="form-input"
              required 
            />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="form-input"
              required 
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="form-input"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full p-3.5 rounded-xl mt-2.5 font-bold">
            Create My Account
          </button>
        </form>

        <div className="text-center mt-6 text-sm font-medium">
          <span className="text-gray-text font-normal">Already have an account?</span>{" "}
          <Link href="/login" className="text-primary-lilac font-bold no-underline hover:underline ml-1">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
