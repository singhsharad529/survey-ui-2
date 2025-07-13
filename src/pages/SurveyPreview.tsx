import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Share2,
  Settings,
  Plus,
  Edit3,
  Trash2,
  GripVertical,
  GripVerticalIcon,
  ChevronUp,
  ChevronDown,
  Pencil,
  Save,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddQuestionModal from "@/components/ui/addQuestionModal";

interface Question {
  id: string;
  type: "text" | "radio" | "checkbox" | "dropdown" | "textarea" | "rating";
  question: string;
  options?: string[];
  required: boolean;
}

function SortableItem({
  question,
  index,
  renderQuestion,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: question.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "var(--bg-primary)",
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="group relative mb-4 p-4 border border-transparent rounded-lg border-gray-300 transition-colors"
    >
      {/* Desktop Drag + Delete */}
      <div className="absolute right-0 top-0 -mr-6 flex items-center space-x-1 mt-2 md:flex hidden">

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(question.id);
          }}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Pencil size={16} style={{ color: "var(--primary-blue)" }} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(question.id);
          }}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Trash2 size={16} style={{ color: "#dc2626" }} />
        </button>
        <button
          {...listeners}
          className="p-1 hover:bg-gray-100 rounded cursor-grab"
        >
          <GripVerticalIcon size={16} style={{ color: "var(--text-muted)" }} />
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="flex md:hidden justify-end gap-2 mb-2">
        {!isFirst && (
          <button
            onClick={() => onMoveUp(index)}
            className="text-sm px-1 py-1 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-secondary)]"
          >
            <ChevronUp size={16} />
          </button>
        )}
        {!isLast && (
          <button
            onClick={() => onMoveDown(index)}
            className="text-sm px-1 py-1 bg-[var(--bg-tertiary)] rounded hover:bg-[var(--bg-secondary)]"
          >
            <ChevronDown size={16} />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(question.id);
          }}
          className="p-1 rounded"
        >
          <Pencil size={16} style={{ color: "var(--primary-blue)" }} />
        </button>
        <button
          onClick={() => onDelete(question.id)}
          className="text-sm px-1 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          <Trash2 size={16} style={{ color: "#dc2626" }} />
        </button>
      </div>

      {renderQuestion(question)}
    </div>
  );
}

const SurveyPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const surveyData = location.state?.surveyData;

  const [showModal, setShowModal] = useState(false);

  // Mock generated questions based on input
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "radio",
      question: "How satisfied are you with our product overall? Give your valuable feedback to us to imporove our product",
      options: [
        "Very Satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very Dissatisfied",
      ],
      required: true,
    },
    {
      id: "2",
      type: "checkbox",
      question:
        "Which features do you use most frequently? (Select all that apply)",
      options: ["Dashboard", "Reports", "Integration", "Mobile App", "API"],
      required: false,
    },
    {
      id: "3",
      type: "textarea",
      question: "What improvements would you like to see in our product?",
      required: false,
    },
    // {
    //   id: "4",
    //   type: "rating",
    //   question: "How likely are you to recommend our product to others?",
    //   required: true,
    // },
    {
      id: "5",
      type: "dropdown",
      question: "Which platform do you use most?",
      options: ["Web", "iOS", "Android", "Desktop App", "xyz", "xyz"],
      required: true,
    },
  ]);

  console.log("questions are", questions);

  const [surveySettings, setSurveySettings] = useState({
    title: "Customer Satisfaction Survey",
    description: "Help us improve our product by sharing your feedback.",
    allowAnonymous: surveyData?.anonymous || true,
    allowMultipleSubmissions: false,
  });

  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const handlePublish = () => {
    console.log("Publishing survey...", { questions, surveySettings });
    navigate("/dashboard");
  };

  const handleAddQuestion = (question) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: "text",
      question: "New Question",
      required: false,
    };
    setQuestions([...questions, question]);
    setEditingQuestion(newQuestion.id);
  };

  const handleDeleteQuestion = (id: string) => {
    console.log("id is", id);

    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleEditQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over?.id);
      setQuestions(arrayMove(questions, oldIndex, newIndex));
    }
  };

  const renderQuestion = (question) => {
    return (
      <div
        style={{
          background: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <p className="font-semibold mb-2">{question.question}</p>

        {["radio", "checkbox"].includes(question.type) &&
          question.options?.map((opt, i) => (
            <div key={i} className="ml-4">
              <input type={question.type} disabled /> <span>{opt}</span>
            </div>
          ))}

        {question.type === "textarea" && (
          <textarea
            className="professional-input mt-2"
            placeholder="User answer"
          />
        )}

        {question.type === "dropdown" && (
          <select className="professional-input mt-2">
            {question.options?.map((opt: string, i: number) => (
              <option key={i} value={opt}>
                <span className="p-10">{opt}</span>
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/create")}
                className="professional-button-secondary p-2"
                style={{ height: "40px" }}
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <h1
                  className="text-3xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Preview & Edit Survey
                </h1>
                <p style={{ color: "var(--text-secondary)" }}>
                  Review your AI-generated survey and make adjustments
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Link to="/create">
              <button
                className="professional-button-primary flex items-center text-sm md:text-md space-x-2 px-3 md:py-3 md:px-6"
                onClick={handlePublish}
              >
                <Share2 size={16} />
                <span>Publish Survey</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Preview */}
          <div className="lg:col-span-2">
            <div className="p-6 professional-card">
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={questions.map((q) => q.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {questions.map((q, idx) => (
                    <SortableItem
                      key={q.id}
                      question={q}
                      index={idx}
                      isFirst={idx === 0}
                      isLast={idx === questions.length - 1}
                      renderQuestion={renderQuestion}
                      onDelete={handleDeleteQuestion}
                      onMoveUp={(i) => {
                        if (i > 0) {
                          setQuestions(arrayMove(questions, i, i - 1));
                        }
                      }}
                      onMoveDown={(i) => {
                        if (i < questions.length - 1) {
                          setQuestions(arrayMove(questions, i, i + 1));
                        }
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              <div className="flex flex-row gap-2 mt-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="professional-button-secondary w-full flex justify-center items-center py-3 space-x-2 border-dashed border-2"
                >
                  <Plus size={16} />
                  <span>Add Question</span>
                </button>
                <div className="flex justify-end">
                  <button
                    className="professional-button-primary flex items-center text-sm md:text-md space-x-2 px-3 md:py-3 md:px-6"
                    onClick={handlePublish}
                  >
                    <Save size={16} />
                    <span>Save</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Survey Settings */}
            <div className="professional-card p-6">
              <h3
                className="font-semibold mb-4 flex items-center space-x-2"
                style={{ color: "var(--text-primary)" }}
              >
                <Settings size={20} />
                <span>Survey Settings</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Survey Name
                  </label>
                  <input
                    type="text"
                    value={surveySettings.title}
                    onChange={(e) =>
                      setSurveySettings({
                        ...surveySettings,
                        title: e.target.value,
                      })
                    }
                    className="professional-input"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label style={{ color: "var(--text-primary)" }}>
                    Anonymous Responses
                  </label>
                  <input
                    type="checkbox"
                    checked={surveySettings.allowAnonymous}
                    onChange={(e) =>
                      setSurveySettings({
                        ...surveySettings,
                        allowAnonymous: e.target.checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label style={{ color: "var(--text-primary)" }}>
                    Multiple Submissions
                  </label>
                  <input
                    type="checkbox"
                    checked={surveySettings.allowMultipleSubmissions}
                    onChange={(e) =>
                      setSurveySettings({
                        ...surveySettings,
                        allowMultipleSubmissions: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Survey Stats */}
            <div className="professional-card p-6">
              <h3
                className="font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Survey Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Questions
                  </span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Required
                  </span>
                  <span style={{ color: "var(--text-primary)" }}>
                    {questions.filter((q) => q.required).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Est. Time
                  </span>
                  <span style={{ color: "var(--text-primary)" }}>
                    ~{Math.max(2, Math.ceil(questions.length / 2))} min
                  </span>
                </div>
              </div>
            </div>

            {/* Question Types */}
            {/* <div className="professional-card p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Add Question Type
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: 'text', label: 'Text' },
                  { type: 'textarea', label: 'Long Text' },
                  { type: 'radio', label: 'Multiple Choice' },
                  { type: 'checkbox', label: 'Checkboxes' },
                  { type: 'dropdown', label: 'Dropdown' },
                  { type: 'rating', label: 'Rating' }
                ].map((questionType) => (
                  <button
                    key={questionType.type}
                    onClick={() => {
                      const newQuestion: Question = {
                        id: Date.now().toString(),
                        type: questionType.type as Question['type'],
                        question: `New ${questionType.label} Question`,
                        required: false,
                        ...(questionType.type === 'radio' || questionType.type === 'checkbox' ? { options: ['Option 1', 'Option 2'] } : {})
                      };
                      setQuestions([...questions, newQuestion]);
                    }}
                    className="professional-button-secondary text-sm py-2"
                  >
                    {questionType.label}
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {showModal && (
        <AddQuestionModal
          onClose={() => setShowModal(false)}
          onSave={handleAddQuestion}
        />
      )}
      <Footer />
    </div>
  );
};

export default SurveyPreview;
