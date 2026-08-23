import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-100">

        {/* Login Card */}
        <div className="rounded-2xl border border-[#262626] bg-[#111111] p-6 sm:p-8">

          {/* Heading */}
          <div className="text-center mb-7">
            <h2 className="text-2xl font-bold font-mono">
              Welcome back
            </h2>

            <p className="text-xs text-muted-foreground font-mono">
              Log in to continue to SocialApp
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium font-mono"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-11 rounded-lg font-mono border border-[#303030] bg-[#181818] px-3 text-sm outline-none placeholder:text-gray-500 focus:border-white transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium font-mono"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-muted-foreground font-mono hover:text-white transition"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-11 rounded-lg border border-[#303030] bg-[#181818] px-3 pr-11 text-sm outline-none placeholder:text-gray-500 focus:border-white transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-white font-mono text-black font-semibold text-sm hover:bg-gray-200 transition mt-2"
            >
              Log in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-[#303030]" />

            <span className="text-xs text-gray-500">
              OR
            </span>

            <div className="h-px flex-1 bg-[#303030]" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full h-11 rounded-lg font-mono border border-[#303030] bg-[#181818] text-sm font-medium hover:bg-[#202020] transition"
          >
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center text-sm text-muted-foreground font-mono mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs font-mono text-muted-foreground mt-6">
          © 2026 SocialApp
        </p>
      </div>
    </div>
  );
}