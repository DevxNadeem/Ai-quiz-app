import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "",
    numberOfQuestions: 1,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [quizzes, setQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/quiz/all", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setQuizzes([]);
        return;
      }

      const data = await res.json();
      setQuizzes(Array.isArray(data) ? data : []);
    } catch {
      setQuizzes([]);
    } finally {
      setLoadingQuizzes(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.topic.trim()) {
      setError("Enter a topic.");
      return;
    }

    if (Number(formData.numberOfQuestions) < 1) {
      setError("Minimum 1 question.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:3000/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          numberOfQuestions: Number(formData.numberOfQuestions),
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
    <QuizContext.Provider
      value={{
        formData, setFormData,
        submitting, setSubmitting,
        quizzes, setQuizzes,
        loadingQuizzes, setLoadingQuizzes,
        expandedId, setExpandedId,
        error, setError,
        fetchQuizzes, handleSubmit,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};