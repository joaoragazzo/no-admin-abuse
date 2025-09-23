import clsx from "clsx"
import type React from "react"

interface ServerStatus {
    status: "online" | "offline",
    text?: string
}

export const ServerStatus: React.FC<ServerStatus> = ({status, text}) => {
    return (
        <div className="flex flex-row gap-2 items-center">
            {status === "online" ? 
                <div className="relative inline-flex">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                </div> 
            : 
                <div className="relative inline-flex">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
            
            }
            <small className={clsx("font-normal", 
                {"text-yellow-400" : status === "offline"},
                {"text-green-500" : status === "online"}
            )}>{text}</small>
        </div>
    )
    
}