import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Information() {
    const navigate = useNavigate();
    const params = useParams();
    const [quiz, setquiz] = useState({
        topic: "",
        difficulty: "",
        numberOfQuestions: 0,
        marks: 0,
    });
    const fetchQuiz = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/quiz/information/${params.id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await res.json();
            console.log("data" , data);
            setquiz(data.quiz);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [params.id]);


    const handleStart = () => {
        // navigate(`/quiz/${quiz._id}`);
        console.log("Start Quiz");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Header */}
                <div className="bg-black text-white p-8">
                    <h1 className="text-3xl font-bold">
                        Quiz Information
                    </h1>

                    <p className="text-gray-300 mt-2">
                        Please read the instructions carefully before starting.
                    </p>
                </div>

                {/* Quiz Details */}
                <div className="p-8">

                    <h2 className="text-xl font-semibold mb-6">
                        Quiz Details
                    </h2>

                    <div className="grid grid-cols-2 gap-6">

                        <div className="border rounded-xl p-4">
                            <p className="text-gray-500 text-sm">Topic</p>
                            <h3 className="text-lg font-semibold mt-1">
                                {quiz.topic}
                            </h3>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-gray-500 text-sm">Difficulty</p>
                            <h3 className="text-lg font-semibold mt-1">
                                {quiz.difficulty}
                            </h3>
                        </div>

                        <div className="border rounded-xl p-4">
                            <p className="text-gray-500 text-sm">Questions</p>
                            <h3 className="text-lg font-semibold mt-1">
                                {quiz.numberOfQuestions}
                            </h3>
                        </div>


                        <div className="border rounded-xl p-4">
                            <p className="text-gray-500 text-sm">Total Marks</p>
                            <h3 className="text-lg font-semibold mt-1">
                                {quiz.numberOfQuestions}
                            </h3>
                        </div>

                    </div>

                    {/* Instructions */}
                    <div className="mt-10">

                        <h2 className="text-xl font-semibold mb-4">
                            Instructions
                        </h2>

                        <ul className="list-disc pl-6 space-y-3 text-gray-700">
                            <li>Read each question carefully before answering.</li>
                            <li>Each question carries 1 mark.</li>
                            <li>There is no negative marking.</li>
                            <li>Once started, the quiz timer cannot be paused.</li>
                            <li>Click "Submit" after completing all questions.</li>
                        </ul>

                    </div>

                    {/* Button */}
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