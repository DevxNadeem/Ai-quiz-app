import { createContext, useContext, useEffect, useRef, useState } from "react";
import { API_BASE } from "../config/api";

const QuizListContext = createContext();

export const QuizListProvider = ({ children }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [loadingQuizzes, setLoadingQuizzes] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    // Prevents a slow earlier fetchQuizzes() call from overwriting a
    // faster later one if it's triggered again before the first resolves.
    const requestIdRef = useRef(0);

    const fetchQuizzes = async () => {
        const thisRequestId = ++requestIdRef.current;
        setLoadingQuizzes(true);
        try {
            const res = await fetch(`${API_BASE}/api/quiz/all`, {
                method: "GET",
                credentials: "include",
            });

            if (thisRequestId !== requestIdRef.current) return; // stale

            if (!res.ok) {
                setQuizzes([]);
                return;
            }

            const data = await res.json();
            setQuizzes(Array.isArray(data) ? data : []);
        } catch {
            if (thisRequestId !== requestIdRef.current) return;
            setQuizzes([]);
        } finally {
            if (thisRequestId === requestIdRef.current) setLoadingQuizzes(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <QuizListContext.Provider
            value={{
                quizzes, setQuizzes,
                loadingQuizzes,
                expandedId, setExpandedId,
                fetchQuizzes,
            }}
        >
            {children}
        </QuizListContext.Provider>
    );
};

export const useQuizList = () => {
    const ctx = useContext(QuizListContext);
    if (!ctx) {
        throw new Error("useQuizList must be used within QuizListProvider");
    }
    return ctx;
};
