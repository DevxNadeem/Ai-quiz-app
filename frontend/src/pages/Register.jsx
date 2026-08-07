import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ["Password strength", "Weak", "Fair", "Strong", "Strong"];
  const strengthColors = ["#DFDCCF", "#D9A441", "#D9A441", "#7FA98F"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      navigate("/login", { state: { justRegistered: true } });
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
            <span className="text-xs font-mono uppercase tracking-widest text-sage">Join free</span>
            <h1 className="font-display text-4xl font-medium mt-4 leading-tight tracking-tight">
              Your first question adapts before your second one loads.
            </h1>
            <p className="text-parchment/55 mt-5 leading-relaxed">
              No onboarding quiz to sit through. Recall starts calibrating from question one and never stops.
            </p>

            <svg viewBox="0 0 400 100" className="w-full h-24 mt-10">
              <path
                className="pulse-line"
                d="M0,60 C 30,60 40,20 70,20 C 100,20 110,80 140,80 C 170,80 180,10 210,10 C 240,10 250,60 280,60 C 310,60 320,40 350,40 C 370,40 380,50 400,50"
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

            <h2 className="font-display text-3xl font-medium tracking-tight">Create your account</h2>
            <p className="text-ink/55 text-sm mt-2 mb-8">Free forever plan. No card required.</p>

            {error && (
              <p className="text-sm rounded-xl px-4 py-3 mb-5 bg-red-50 text-red-700 border border-red-200">
                {error}
              </p>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-1.5">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Ellis"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field w-full border border-ink/15 rounded-xl px-4 py-3 bg-white text-sm placeholder:text-ink/30"
                />
              </div>

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
                <label htmlFor="password" className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
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
                <div className="flex gap-1.5 mt-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-colors duration-300"
                      style={{
                        backgroundColor: i < strength ? strengthColors[Math.min(strength - 1, 3)] : "rgba(13,26,22,0.1)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-[11px] text-ink/40 mt-1.5 font-mono">
                  {password.length === 0 ? "Password strength" : strengthLabels[Math.min(strength, 4)]}
                </p>
              </div>

              <label className="flex items-start gap-2.5 text-sm text-ink/60 pt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-ink/30 text-amber focus:ring-amber"
                />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-ink font-medium underline underline-offset-2">Terms</a>{" "}
                  and{" "}
                  <a href="#" className="text-ink font-medium underline underline-offset-2">Privacy Policy</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ink text-parchment font-semibold py-3.5 rounded-xl hover:bg-inkdeep transition text-sm disabled:opacity-60"
              >
                {submitting ? "Creating account…" : "Create account"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-7">
              <div className="h-px bg-ink/10 flex-1" />
              <span className="text-xs text-ink/40 font-mono uppercase">or</span>
              <div className="h-px bg-ink/10 flex-1" />
            </div>

            <p className="text-center text-sm text-ink/55 mt-8">
              Already have an account?{" "}
              <Link to="/login" className="text-ink font-semibold underline underline-offset-2">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
