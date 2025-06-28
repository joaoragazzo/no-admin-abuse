import clsx from "clsx";
import type React from "react";

interface SectionProps {
    children: React.ReactNode
    className?: string
}

export const Section: React.FC<SectionProps> = ({ children, className }) => {
    return (
        <div className={clsx("max-w-screen-2xl mx-auto w-full px-10", className)}>
            {children}
        </div>
    );
}