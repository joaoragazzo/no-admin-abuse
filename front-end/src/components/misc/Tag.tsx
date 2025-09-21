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
            "rounded-full text-xs px-4.5 py-1 font-semibold w-fit leading-none",
            
            {
                "text-white bg-red-600": color === "red",
                "text-white bg-green-600": color === "green",
                "text-white bg-blue-600": color === "blue",
                "text-white bg-yellow-600": color === "yellow",
                "text-white bg-neutral-900": color === "gray",
                "cursor-pointer": onClick,
            },
            className,
            
            )}>
        {children}
    </div>
    )
}