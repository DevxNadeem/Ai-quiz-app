import React, { useContext, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";

function Dashboard() {
  const {
    formData, setFormData, submitting, quizzes, loadingQuizzes,
    expandedId, setExpandedId, error, fetchQuizzes, handleSubmit,
  } = useContext(QuizContext);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDifficulty = (level) => {
    setFormData({ ...formData, difficulty: level });
  };

  const difficulties = ["Easy", "Medium", "Hard"];

  const difficultyColor = (level) => {
    if (level === "Easy") return { bg: "#EAF6EE", fg: "#1E7A3C" };
    if (level === "Hard") return { bg: "#FBEAEA", fg: "#B3261E" };
    return { bg: "#EEF0FC", fg: "#4C4FE0" };
  };

  return (
    <div className="min-h-screen px-4 py-12" style={{ backgroundColor: "#F7F5F2" }}>
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-10">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #4C4FE0, #7B61FF)" }}
          >
            <span className="text-white font-serif text-sm">R</span>
          </div>
          <span className="text-xl font-serif" style={{ color: "#14142B", letterSpacing: "-0.01em" }}>
            Recall
          </span>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #EDEBE6",
            boxShadow: "0 1px 2px rgba(20,20,43,0.04), 0 12px 32px rgba(20,20,43,0.06)",
          }}
        >
          <div className="mb-8">
            <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: "#4C4FE0" }}>
              New quiz
            </p>
            <h1 className="text-3xl font-serif" style={{ color: "#14142B", letterSpacing: "-0.01em" }}>
              Generate a quiz
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#77748C" }}>
              Pick a topic, set the difficulty, and Recall builds the questions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "#14142B" }}>Topic</label>
              <input
                type="text"
                name="topic"
                placeholder="e.g. Node.js event loop"
                value={formData.topic}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 outline-none transition-colors"
                style={{ border: "1px solid #EDEBE6", color: "#14142B" }}
                onFocus={(e) => (e.target.style.borderColor = "#4C4FE0")}
                onBlur={(e) => (e.target.style.borderColor = "#EDEBE6")}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "#14142B" }}>Difficulty</label>
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl" style={{ backgroundColor: "#F1EFEA" }}>
                {difficulties.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleDifficulty(level)}
                    className="py-2 rounded-lg text-sm font-medium transition-all"
                    style={
                      formData.difficulty === level
                        ? { backgroundColor: "#14142B", color: "#FAF9F6" }
                        : { backgroundColor: "transparent", color: "#77748C" }
                    }
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "#14142B" }}>
                Number of questions
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      numberOfQuestions: Math.max(1, Number(formData.numberOfQuestions) - 1),
                    })
                  }
                  className="w-10 h-10 rounded-xl font-mono text-lg flex items-center justify-center shrink-0"
                  style={{ border: "1px solid #EDEBE6", color: "#14142B" }}
                >
                  −
                </button>
                <input
                  type="number"
                  name="numberOfQuestions"
                  min="1"
                  max="20"
                  value={formData.numberOfQuestions}
                  onChange={handleChange}
                  className="w-full text-center rounded-xl px-4 py-3 outline-none font-mono"
                  style={{ border: "1px solid #EDEBE6", color: "#14142B" }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      numberOfQuestions: Math.min(20, Number(formData.numberOfQuestions) + 1),
                    })
                  }
                  className="w-10 h-10 rounded-xl font-mono text-lg flex items-center justify-center shrink-0"
                  style={{ border: "1px solid #EDEBE6", color: "#14142B" }}
                >
                  +
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm rounded-xl px-4 py-3" style={{ backgroundColor: "#FDEEEE", color: "#B3261E" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl font-medium transition-opacity disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #4C4FE0, #7B61FF)",
                color: "#FFFFFF",
                boxShadow: "0 8px 20px rgba(76,79,224,0.28)",
              }}
            >
              {submitting ? "Generating…" : "Generate quiz"}
            </button>
          </form>
        </div>

        <div className="mt-10">
          <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "#77748C" }}>
            Your quizzes
          </p>

          {loadingQuizzes ? (
            <div
              className="rounded-3xl p-10 text-center text-sm"
              style={{ border: "1px solid #EDEBE6", backgroundColor: "#FFFFFF", color: "#77748C" }}
            >
              Loading…
            </div>
          ) : quizzes.length === 0 ? (
            <div className="rounded-3xl p-10 text-center" style={{ border: "1px dashed #DAD7CE", backgroundColor: "#FCFBF9" }}>
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#EEF0FC" }}
              >
                <span className="font-serif text-xl" style={{ color: "#4C4FE0" }}>?</span>
              </div>
              <h3 className="font-serif text-lg mb-1" style={{ color: "#14142B" }}>No quizzes yet</h3>
              <p className="text-sm" style={{ color: "#77748C" }}>
                Generate your first quiz above — it'll show up here with analysis once you complete it.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {quizzes.map((quiz) => {
                const dc = difficultyColor(quiz.difficulty);
                const isOpen = expandedId === quiz._id;
                return (
                  <div
                    key={quiz._id}
                    className="rounded-2xl p-5"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #EDEBE6",
                      boxShadow: "0 1px 2px rgba(20,20,43,0.04)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-medium truncate" style={{ color: "#14142B" }}>{quiz.topic}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="text-xs font-medium px-2 py-1 rounded-md"
                            style={{ backgroundColor: dc.bg, color: dc.fg }}
                          >
                            {quiz.difficulty}
                          </span>
                          <span className="text-xs font-mono" style={{ color: "#77748C" }}>
                            {quiz.numberOfQuestions} questions
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isOpen ? null : quiz._id)}
                        className="text-sm font-medium px-4 py-2 rounded-lg shrink-0"
                        style={{ border: "1px solid #EDEBE6", color: "#14142B" }}
                      >
                        {isOpen ? "Hide" : "Show analysis"}
                      </button>
                    </div>
                    {/* rest unchanged */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;