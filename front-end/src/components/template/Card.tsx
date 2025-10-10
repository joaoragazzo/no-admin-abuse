import type { ReactNode } from "react";
import type React from "react";

const Card: React.FC<{ children: React.ReactNode }> & {
    Title: typeof CardTitle;
    Content: typeof CardContent;
} = ({ children }) => (
    <div
        className={`backdrop-blur-md rounded-xl `}
    >
        {children}
    </div>
);

const CardTitle: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="px-5 py-3 text-slate-100 bg-gradient-to-r rounded-t-xl flex items-center gap-3 text-lg font-semibold tracking-wide shadow-sm">
        {children}
    </div>
);

const CardContent: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="px-5 text-neutral-300 rounded-b-xl">
        {children}
    </div>
);

Card.Title = CardTitle;
Card.Content = CardContent;

export { Card };