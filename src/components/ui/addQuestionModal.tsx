// AddQuestionModal.tsx
import React, { useState } from 'react';

export default function AddQuestionModal({ onClose, onSave }) {
    const [type, setType] = useState('radio');
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['']);

    const handleAddOption = () => setOptions((prev) => [...prev, '']);
    const handleOptionChange = (i, value) => {
        const updated = [...options];
        updated[i] = value;
        setOptions(updated);
    };

    const handleSave = () => {
        console.log(title, type, options)
        if (!title.trim()) return;
        const question = { question: title, type, options: ['radio', 'checkbox', "dropdown"].includes(type) ? options : [] };
        onSave(question);
    };

    return (

        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
            <div
                // ref={modalRef}
                className="bg-[var(--bg-primary)] p-6 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-500 scale-100  fade-in-up"
            >
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Add New Question</h3>

                <input
                    className="professional-input mb-3"
                    placeholder="Question text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <select
                    className="professional-input mb-3"
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                        if (e.target.value === 'text') setOptions([]);
                    }}
                >
                    <option value="radio">Single Choice (Radio)</option>
                    <option value="checkbox">Multiple Choice (Checkbox)</option>
                    <option value="dropdown">Dropdown</option>

                    <option value="text">Text Input</option>
                </select>

                {['radio', 'checkbox', 'dropdown'].includes(type) &&
                    options.map((opt, i) => (
                        <input
                            key={i}
                            className="professional-input mb-2"
                            value={opt}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                            placeholder={`Option ${i + 1}`}
                        />
                    ))}

                {['radio', 'checkbox', 'dropdown'].includes(type) && (
                    <button
                        onClick={handleAddOption}
                        className="text-sm text-[var(--primary-blue)] underline mt-1 mb-3"
                    >
                        + Add another option
                    </button>
                )}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="professional-button-secondary">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="professional-button-primary">
                        Save
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
