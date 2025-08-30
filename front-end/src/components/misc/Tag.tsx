import clsx from "clsx";
import type React from "react";

interface TagProps {
    children: string,
    color: "red" | "green" | "blue" | "yellow" | "gray",
    id?: string,
    onClick?: (id: string) => void
    className?: string
}

export const Tag: React.FC <TagProps> = ({ children, color, id, onClick, className }) => {
    const handleClick = () => {
        if (onClick && id) {
            onClick(id);
        }
    }
    
    return (
    <div
        onClick={handleClick}
        className={clsx(
            "border-1 rounded-full text-xs px-3 py-0.5",
            className,
            {
                "border-red-600 text-red-600 bg-red-100": color === "red",
                "border-green-700 text-green-700 bg-green-100": color === "green",
                "border-blue-600 text-blue-600 bg-blue-100": color === "blue",
                "border-yellow-600 text-yellow-600 bg-yellow-100": color === "yellow",
                "border-gray-600 text-gray-600 bg-gray-300": color === "gray",
                "cursor-pointer": onClick,
            }
            )}>
        {children}
    </div>
    )
}