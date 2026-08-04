import React from "react";

function QuestionCard({ question, index, selectedAnswer, onSelect }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-5">Question {index}</h2>
      <p className="text-lg mb-6">{question.question}</p>

      <div className="space-y-4">
        {question.options.map((option, i) => (
          <label
            key={i}
            className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-gray-50"
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onSelect(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;