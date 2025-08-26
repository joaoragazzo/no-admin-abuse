import type { ReactNode } from "react";
import type React from "react";

const CardTitle: React.FC<{children: ReactNode }> = ({ children }) => (
    <div className="text-md font-bold items-center flex gap-3 mb-3">
        {children}
    </div>
)

const CardContent: React.FC<{children: ReactNode }> = ({ children }) => (
    <div className="text-gray-300">
        {children}
    </div>
)

interface CardProps {
    children: React.ReactNode
}

interface CardComposition {
    Title: typeof CardTitle
    Content: typeof CardContent
}

const Card: React.FC<CardProps> & CardComposition = ({ children }) => {
    return (
        <div className="py-3 rounded-md">
            {children}
        </div>
    );
}

Card.Title = CardTitle;
Card.Content = CardContent;

export { Card };