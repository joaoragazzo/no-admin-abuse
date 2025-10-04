import type React from "react"

interface PageTitleProps {
    main: string
    emphasis?: string
    description?: string
    Icon: React.ElementType
}

export const PageTitle: React.FC<PageTitleProps> = ({emphasis, main, description, Icon}) => {
    return (
        <div className="flex flex-row items-center gap-4 mb-5">
            <div className="bg-blue-700 p-3 rounded-lg ishadow-l">
                <Icon className="text-3xl"/>
            </div>
            <div className="flex flex-col">
                <h1 className="font-extrabold text-2xl">
                    {main} {emphasis && <span className="text-blue-500">{emphasis}</span>}
                </h1>
                {description && 
                    <span className="text-gray-400 text-sm">
                        {description}
                    </span>
                }        
            </div>
        </div>
           
    )
}