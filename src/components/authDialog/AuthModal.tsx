import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Props {
    onClose: () => void;
}

const AuthModal: React.FC<Props> = ({ onClose }) => {
    const [isSignup, setIsSignup] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
            <div
                ref={modalRef}
                className="m-2 md:m-0 bg-[var(--bg-primary)] p-6 rounded-2xl shadow-lg w-full max-w-md transform transition-all duration-500 scale-100  fade-in-up"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">
                        {isSignup ? "Sign Up" : "Login"}
                    </h2>
                    <button onClick={onClose}>
                        <X size={20} color="var(--text-secondary)" />
                    </button>
                </div>

                <form className="space-y-4">
                    {isSignup && (
                        <input
                            type="text"
                            placeholder="Username"
                            className="professional-input"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="professional-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="professional-input"
                    />
                    <button type="submit" className="professional-button-primary w-full">
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="text-center my-4 text-[var(--text-muted)] text-sm">
                    — or continue with —
                </div>
                <button className="professional-button-secondary w-full">
                    Sign in with Google
                </button>

                <div className="text-sm text-center mt-4 text-[var(--text-secondary)]">
                    {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
                    <button
                        className="text-[var(--primary-blue)] font-medium hover:underline"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? "Login" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
