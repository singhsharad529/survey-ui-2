// AddQuestionModal.tsx
import React, { useState } from "react";

export default function EditQuestionModal({
    handleEditQuestion,
    question,
    setEditQuestion,
}) {
    const [tempQuestion, settempQuestion] = useState(question);
    console.log("question is", tempQuestion);

    const handleAddOption = () => {
        settempQuestion((prev) => ({
            ...prev,
            options: [...(prev.options || []), ""],
        }));
    };

    const handleRemoveOption = (index) => {
        let tempOptions = tempQuestion.options;
        let filteredOptions = tempOptions.filter((_, i) => i !== index);
        settempQuestion((prev) => ({ ...prev, options: filteredOptions }));
    };

    const handleOptionChange = (i, value) => {
        const updated = [...tempQuestion.options];
        updated[i] = value;
        settempQuestion((prev) => ({ ...prev, options: updated }));
    };

    const updateQuestion = () => {
        handleEditQuestion(tempQuestion);
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
            <div
                // ref={modalRef}
                className="m-2 md:m-0 bg-[var(--bg-primary)] p-6 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-500 scale-100  fade-in-up"
            >
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
                    Edit Question
                </h3>

                <input
                    className="professional-input mb-3"
                    placeholder="Question text"
                    value={tempQuestion.question}
                    onChange={(e) =>
                        settempQuestion((prev) => ({ ...prev, question: e.target.value }))
                    }
                />

                <div className="mb-2">
                    {tempQuestion.type === "radio" && (
                        <div
                            className="professional-input"
                            style={{ background: "var(--bg-secondary)" }}
                        >
                            Single Choice (Radio)
                        </div>
                    )}
                    {tempQuestion.type === "checkbox" && (
                        <div
                            className="professional-input"
                            style={{ background: "var(--bg-secondary)" }}
                        >
                            Multiple Choice (Checkbox)
                        </div>
                    )}
                    {tempQuestion.type === "dropdown" && (
                        <div
                            className="professional-input"
                            style={{ background: "var(--bg-secondary)" }}
                        >
                            Dropdown
                        </div>
                    )}

                    {tempQuestion.type === "textarea" && (
                        <div
                            className="professional-input"
                            style={{ background: "var(--bg-secondary)" }}
                        >
                            Text Input
                        </div>
                    )}
                </div>

                <div className="max-h-52 overflow-y-auto mb-3">
                    {["radio", "checkbox", "dropdown"].includes(tempQuestion.type) &&
                        tempQuestion.options.map((opt, i) => (
                            <div key={i} className="flex items-center mb-2 gap-2">
                                <input
                                    className="professional-input flex-1"
                                    value={opt}
                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                    placeholder={`Option ${i + 1}`}
                                />
                                {tempQuestion.options.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveOption(i)}
                                        className="text-red-500 hover:text-red-600 text-sm px-2 py-1 rounded"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                </div>

                {["radio", "checkbox", "dropdown"].includes(tempQuestion.type) && (
                    <button
                        onClick={handleAddOption}
                        className="text-sm text-[var(--primary-blue)] underline mt-1 mb-3"
                    >
                        + Add another option
                    </button>
                )}

                <div className="flex justify-end gap-2">
                    <button
                        onClick={(e) => {
                            setEditQuestion(null);
                        }}
                        className="professional-button-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={updateQuestion}
                        className="professional-button-primary"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>

        // <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 fade-in-up">
        //     <div className="bg-white dark:bg-[var(--bg-secondary)] p-6 rounded-xl shadow-lg w-[400px]" >

        //     </div>
        // </div>
    );
}
