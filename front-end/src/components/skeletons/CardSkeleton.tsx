import clsx from "clsx"

interface CardSkeletonProps {
    className?: string
}


export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className }) => {
    return (
        <div className={clsx("bg-gray-800 animate-pulse rounded-sx", className)} />
    )
}