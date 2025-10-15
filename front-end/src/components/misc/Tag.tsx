import clsx from "clsx";
import type React from "react";
import { FaX } from "react-icons/fa6";

interface TagProps {
    children: React.ReactNode,
    color: "red" | "green" | "blue" | "yellow" | "gray" | "outlined",
    id?: string,
    onClick?: (id: string) => void
    onDelete?: () => void
    className?: string
}

export const Tag: React.FC <TagProps> = ({ children, color, id, onClick, className, onDelete }) => {
    const Component = onClick ? 'button' : 'div';
    
    const handleClick = () => {
        if (onClick && id) {
            onClick(id);
        }
    }
    
    return (
    <Component
        onClick={handleClick}
        className={clsx(
            "rounded-full text-xs px-4.5 py-1 font-semibold w-fit leading-none flex items-row gap-2 items-center text-nowrap",
            {
                "text-white bg-red-700": color === "red",
                "text-white bg-green-700": color === "green",
                "text-white bg-blue-700": color === "blue",
                "text-white bg-yellow-700": color === "yellow",
                "text-white bg-neutral-900": color === "gray",
                "text-white border-1 border-neutral-600": color === "outlined",
                "cursor-pointer": onClick,
                "pr-1.5": onDelete,
            },
            className,
            
            )}>
        {children}
        {onDelete && 
            <button className="p-1.5 rounded-full hover:bg-black/30 cursor-pointer transition-colors" onClick={onDelete}>
                <FaX className="text-[10px]" />
            </button>
        }
    </Component>
    )
}