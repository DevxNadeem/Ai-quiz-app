import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../config/api";

function Information() {
  const navigate = useNavigate();
  const params = useParams();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuiz();
  }, [params.id]);

  const fetchQuiz = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/quiz/information/${params.id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setError("Could not load this quiz.");
        return;
      }

      const data = await res.json();
      setQuiz(data.quiz);
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    if (!quiz) return;
    navigate(`/quiz/test/${quiz._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading quiz…</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <p className="text-red-600">{error || "Quiz not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-black text-white p-8">
          <h1 className="text-3xl font-bold">Quiz Information</h1>
          <p className="text-gray-300 mt-2">Please read the instructions carefully before starting.</p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold mb-6">Quiz Details</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Topic</p>
              <h3 className="text-lg font-semibold mt-1">{quiz.topic}</h3>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Difficulty</p>
              <h3 className="text-lg font-semibold mt-1">{quiz.difficulty}</h3>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Questions</p>
              <h3 className="text-lg font-semibold mt-1">{quiz.numberOfQuestions}</h3>
            </div>
            {/* Total Marks currently just repeats numberOfQuestions — was
                flagged as likely meant to be numberOfQuestions * some
                weight. Left as-is; tell me the intended scoring model
                if you want this to show something different. */}
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Total Marks</p>
              <h3 className="text-lg font-semibold mt-1">{quiz.numberOfQuestions}</h3>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Read each question carefully before answering.</li>
              <li>Each question carries 1 mark.</li>
              <li>There is no negative marking.</li>
              <li>Once started, the quiz timer cannot be paused.</li>
              <li>Click "Submit" after completing all questions.</li>
            </ul>
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={handleStart}
              className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
