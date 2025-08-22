import clsx from "clsx"
import type React from "react"
import { BiLoaderCircle } from "react-icons/bi"

interface LoadingProps {
    children: React.ReactNode,
    className?: string
}

export const Loading: React.FC<LoadingProps> = ({ children, className }) => {
    return (
        <div className={clsx(
        "w-full flex flex-grow flex-col items-center justify-center",
            className  
        )}>
            <div className="flex flex-col gap-3 items-center">
                <BiLoaderCircle size={40} className="spinner" />
                <div>
                    { children }
                </div>
            </div>
        </div>
    )
}