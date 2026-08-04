import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { fetchuser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const justRegistered = location.state?.justRegistered;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      await fetchuser();
      navigate("/dashboard");
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-parchment text-ink antialiased min-h-screen">
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between bg-ink text-parchment px-14 py-12 relative overflow-hidden">
          <Link to="/" className="flex items-center gap-2.5 relative z-10">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#EDEBE2" strokeWidth="1.5" />
              <path
                d="M6 14 L11 14 L13 8 L16 20 L18 14 L22 14"
                stroke="#D9A441"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-xl font-medium tracking-tight">Recall</span>
          </Link>

          <div className="relative z-10 max-w-md">
            <span className="text-xs font-mono uppercase tracking-widest text-sage">Welcome back</span>
            <h1 className="font-display text-4xl font-medium mt-4 leading-tight tracking-tight">
              Pick up exactly where the difficulty curve left off.
            </h1>
            <p className="text-parchment/55 mt-5 leading-relaxed">
              Your mastery map and misconception log are waiting — nothing resets between sessions.
            </p>

            <svg viewBox="0 0 400 100" className="w-full h-24 mt-10">
              <path
                className="pulse-line"
                d="M0,50 C 30,50 40,15 70,15 C 100,15 110,85 140,85 C 170,85 180,30 210,30 C 240,30 250,60 280,60 C 310,60 320,25 350,25 C 370,25 380,45 400,45"
                fill="none"
                stroke="#D9A441"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>

          <div className="relative z-10 flex items-center gap-8 text-parchment/40 text-xs font-mono uppercase tracking-wide">
            <span>40K+ questions / day</span>
            <span>1.2M answers analyzed</span>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-sm">
            <div className="lg:hidden mb-10 flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#0D1A16" strokeWidth="1.5" />
                <path
                  d="M6 14 L11 14 L13 8 L16 20 L18 14 L22 14"
                  stroke="#D9A441"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-display text-xl font-medium tracking-tight">Recall</span>
            </div>

            <h2 className="font-display text-3xl font-medium tracking-tight">Log in</h2>
            <p className="text-ink/55 text-sm mt-2 mb-8">Continue your adaptive session.</p>

            {justRegistered && (
              <div className="flex items-center gap-2.5 bg-sage/10 border border-sage/30 text-sagedim text-sm rounded-xl px-4 py-3 mb-6">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M5 8.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Account created. Log in to continue.
              </div>
            )}

            {error && (
              <p className="text-sm rounded-xl px-4 py-3 mb-6 bg-red-50 text-red-700 border border-red-200">
                {error}
              </p>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full border border-ink/15 rounded-xl px-4 py-3 bg-white text-sm placeholder:text-ink/30"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wide text-ink/50">
                    Password
                  </label>
                  <a href="#" className="text-xs text-ink/50 hover:text-ink underline underline-offset-2">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field w-full border border-ink/15 rounded-xl px-4 py-3 pr-12 bg-white text-sm placeholder:text-ink/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Show password"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.4" />
                      <circle cx="9" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-sm text-ink/60">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="rounded border-ink/30 text-amber focus:ring-amber"
                />
                <span>Keep me logged in</span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ink text-parchment font-semibold py-3.5 rounded-xl hover:bg-inkdeep transition text-sm disabled:opacity-60"
              >
                {submitting ? "Logging in…" : "Log in"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-7">
              <div className="h-px bg-ink/10 flex-1" />
              <span className="text-xs text-ink/40 font-mono uppercase">or</span>
              <div className="h-px bg-ink/10 flex-1" />
            </div>

            <button className="w-full flex items-center justify-center gap-2.5 border border-ink/15 rounded-xl py-3 text-sm font-medium hover:bg-parchdim/60 transition">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.6 9.2c0-.6-.05-1.2-.15-1.75H9v3.3h4.8a4.1 4.1 0 01-1.78 2.7v2.2h2.9c1.7-1.55 2.68-3.85 2.68-6.45z" />
                <path fill="#34A853" d="M9 18c2.4 0 4.42-.8 5.9-2.15l-2.9-2.2c-.8.55-1.85.85-3 .85-2.3 0-4.25-1.55-4.95-3.65H1.05v2.3A9 9 0 009 18z" />
                <path fill="#FBBC05" d="M4.05 10.85a5.4 5.4 0 010-3.7v-2.3H1.05a9 9 0 000 8.3l3-2.3z" />
                <path fill="#EA4335" d="M9 3.58c1.3 0 2.48.45 3.4 1.33l2.55-2.55C13.4.9 11.4 0 9 0A9 9 0 001.05 4.85l3 2.3C4.75 5.05 6.7 3.58 9 3.58z" />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-ink/55 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-ink font-semibold underline underline-offset-2">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}