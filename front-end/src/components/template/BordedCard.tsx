import clsx from "clsx"
import type React from "react"

interface BordedCardType {
    title?: string
    children?: React.ReactNode
    className?: string
}

export const BordedCard: React.FC<BordedCardType> = ({title, children, className}) => {
    return (
    <div className={clsx(`relative mt-3`, className)}>
        {title && 
        <span className="absolute -top-3 left-4 bg-neutral-900 px-2 text-sm text-neutral-500">
          {title}
        </span>}
        
        <div className="rounded-lg border border-neutral-500 bg-transparent p-4">
          {children}
        </div>
    </div>
    )
}