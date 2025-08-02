import type React from "react"
import { FaStar } from "react-icons/fa"

interface RatingProps {
    rating: number
    size?: number 
}

export const Rating: React.FC<RatingProps> = ({ rating, size=16 }) => {
    if (rating > 5) rating = 5;
    if (rating < 0) rating = 0;
    
    return (
        <div className="flex flex-row gap-1.5 items-center">
            {[...Array(5)].map((_, i) => (
                <FaStar
                    key={i}
                    size={size}
                    className={
                        i < Math.floor(rating) ? "text-amber-300" : "text-gray-400/40"
                    }
                />
            ))} <span className="ml-1">{rating}</span>
        </div>
    )
    
}