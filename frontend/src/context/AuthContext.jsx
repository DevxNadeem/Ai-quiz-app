import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "../config/api";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchuser = async (signal) => {
        try {
            const res = await fetch(`${API_BASE}/api/auth/me`, {
                method: "GET",
                credentials: "include",
                signal,
            });
            if (!res.ok) {
                setuser(null);
                return;
            }
            const userData = await res.json();
            setuser(userData);
        } catch (err) {
            if (err.name === "AbortError") return;
            console.log(err);
            setuser(null);
        } finally {
            if (!signal?.aborted) setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchuser(controller.signal);
        return () => controller.abort();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setuser, fetchuser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        // Was silently returning undefined before — the first symptom
        // was always three files away from the actual mistake
        // (a component rendered outside the provider).
        throw new Error("useAuth must be used within AuthContextProvider");
    }
    return ctx;
};
