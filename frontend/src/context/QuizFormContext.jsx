import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

// Was merged with quiz-list state in one QuizContext before. "Creating a
// quiz" and "listing my quizzes" are unrelated concerns used on different
// pages — splitting them means Dashboard doesn't re-render on form
// keystrokes and this context doesn't need list state it never uses.
const QuizFormContext = createContext();

export const QuizFormProvider = ({ children }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        topic: "",
        difficulty: "",
        numberOfQuestions: 1,
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.topic.trim()) {
            setError("Enter a topic.");
            return;
        }

        const n = Number(formData.numberOfQuestions);
        if (!Number.isInteger(n) || n < 1) {
            setError("Minimum 1 question.");
            return;
        }
        if (n > 25) {
            setError("Maximum 25 questions.");
            return;
        }
        if (!formData.difficulty) {
            setError("Select a difficulty.");
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch(`${API_BASE}/api/test`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    numberOfQuestions: n,
                }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                setError(err.message || "Failed to create quiz.");
                return;
            }

            const data = await res.json();
            navigate(`/quiz/test/info/${data.quiz._id}`);
        } catch {
            setError("Network Error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <QuizFormContext.Provider
            value={{
                formData, setFormData,
                submitting,
                error, setError,
                handleSubmit,
            }}
        >
            {children}
        </QuizFormContext.Provider>
    );
};

export const useQuizForm = () => {
    const ctx = useContext(QuizFormContext);
    if (!ctx) {
        throw new Error("useQuizForm must be used within QuizFormProvider");
    }
    return ctx;
};
