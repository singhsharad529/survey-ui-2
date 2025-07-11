import React from "react";

interface Props {
    state: boolean;
}

const GlobalLoader = ({ state }: Props) => {
    return (
        <>
            {state && (
                <div className="fixed inset-0 z-[99999] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="loader-spin" />
                        <p className="text-[var(--text-primary)] font-semibold">
                            Loading, please wait...
                        </p>
                    </div>

                    <style>{`
        .loader-spin {
          border: 4px solid var(--border-color);
          border-top: 4px solid var(--primary-blue);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
                </div>
            )}
        </>
    );
};

export default GlobalLoader;
