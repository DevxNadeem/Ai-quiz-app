import React from "react";

function QuestionCard({ question, index, selectedAnswer, onSelect }) {
  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-6">
        Question {index}
      </h2>

      <p className="text-lg mb-8">{question.question}</p>

      <div className="space-y-4">
        {question.options.map((option, i) => (
          <label
            key={i}
            className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={i}
              checked={selectedAnswer === i}
              onChange={() => onSelect(i)}
            />

            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
