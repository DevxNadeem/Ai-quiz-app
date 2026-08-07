// Was hardcoded as "http://localhost:3000" separately in AuthContext and
// QuizContext — two places to remember to change on deploy. Set
// VITE_API_URL in your .env for prod; falls back to localhost for dev.
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
