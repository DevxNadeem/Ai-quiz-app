import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuizCard";

function TestLayout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // keyed by index
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/quiz/information/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setError("Could not load this quiz.");
        return;
      }

      const data = await res.json();
      setQuestions(Array.isArray(data.quiz?.questions) ? data.quiz.questions : []);
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      // Payload shape here is a design choice, not a backend contract —
      // Submit controller just forwards this array into an LLM prompt.
      const payload = questions.map((q, i) => ({
        question: q.question,
        selectedAnswer: answers[i] ?? null,
      }));

      const res = await fetch(`http://localhost:3000/api/quiz/${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ answers: payload }),
      });

      if (!res.ok) {
        setError("Failed to submit quiz.");
        return;
      }

      const data = await res.json();
      setResult(data.result);
    } catch {
      setError("Network error while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading questions…</p>
      </div>
    );
  }

  if (error && !result) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <p className="text-gray-600">No questions found for this quiz.</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Results</h1>
          <p className="text-lg mb-6">
            Score: {result.score} / {result.totalQuestions}
          </p>
          <p className="text-gray-700 mb-8">{result.feedback}</p>

          <div className="space-y-4">
            {result.answers?.map((a, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 ${a.isCorrect ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}
              >
                <p className="font-medium mb-1">Q{i + 1}</p>
                <p className="text-sm text-gray-600">Your answer: {a.selectedAnswer}</p>
                <p className="text-sm text-gray-600">Correct answer: {a.correctAnswer}</p>
                <p className="text-sm mt-2">{a.explanation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const activeQuestion = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Quiz</h1>
          <div className="text-lg font-semibold">
            Question {currentQuestion + 1} / {questions.length}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4">
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <QuestionCard
          question={activeQuestion}
          index={currentQuestion + 1}
          selectedAnswer={answers[currentQuestion]}
          onSelect={(option) => handleAnswer(currentQuestion, option)}
        />

        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-xl border border-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleSkip}
              disabled={currentQuestion === questions.length - 1}
              className="px-6 py-3 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50"
            >
              Skip
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Quiz"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-black text-white hover:bg-gray-800"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TestLayout;