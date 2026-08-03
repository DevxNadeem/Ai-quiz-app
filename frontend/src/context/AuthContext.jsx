import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchuser = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/me", {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) {
                setuser(null);
                return;
            }
            const userData = await res.json();
            setuser(userData);
        } catch (err) {
            console.log(err);
            setuser(null);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchuser();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setuser, fetchuser  , loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

