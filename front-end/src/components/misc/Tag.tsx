import clsx from "clsx";
import type React from "react";
import { FaX } from "react-icons/fa6";

interface TagProps {
    children: string,
    color: "red" | "green" | "blue" | "yellow" | "gray",
    id?: string,
    onClick?: (id: string) => void
    onDelete?: (id: string) => void
    className?: string
}

export const Tag: React.FC <TagProps> = ({ children, color, id, onClick, className, onDelete }) => {
    const handleClick = () => {
        if (onClick && id) {
            onClick(id);
        }
    }
    
    return (
    <div
        onClick={handleClick}
        className={clsx(
            "rounded-full text-xs px-4.5 py-1 font-semibold w-fit leading-none flex items-row gap-2 items-center text-nowrap",
            {
                "text-white bg-red-700": color === "red",
                "text-white bg-green-700": color === "green",
                "text-white bg-blue-700": color === "blue",
                "text-white bg-yellow-700": color === "yellow",
                "text-white bg-neutral-900": color === "gray",
                "cursor-pointer": onClick,
                "pr-1.5": onDelete,
            },
            className,
            
            )}>
        {children}
        {onDelete && 
            <div className="p-1.5 rounded-full hover:bg-black/30 cursor-pointer transition-colors">
                <FaX className="text-[10px]" />
            </div>
        }
    </div>
    )
}