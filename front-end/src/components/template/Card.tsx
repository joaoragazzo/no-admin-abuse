import type { ReactNode } from "react";
import type React from "react";

const CardTitle: React.FC<{children: ReactNode }> = ({ children }) => (
    <div className="text-md font-bold items-center flex gap-3">
        {children}
    </div>
)

const CardContent: React.FC<{children: ReactNode }> = ({ children }) => (
    <>
        {children}
    </>
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
        <div className="bg-gray-900 px-5 py-3 rounded-md">
            {children}
        </div>
    );
}

Card.Title = CardTitle;
Card.Content = CardContent;

export { Card };