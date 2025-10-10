import clsx from "clsx";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
  size?: number;
  onChange?: (newRating: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  size = 16,
  onChange,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayedRating = hoverRating ?? rating;

  const handleClick = (i: number) => {
    if (!onChange) return;
    onChange?.(i + 1); 
  };

  return (
    <div className="flex flex-row gap-1.5 items-center">
      {[...Array(5)].map((_, i) => {
        const filled = i < displayedRating;

        return (
          <FaStar
            key={i}
            size={size}
            className={clsx({
                "text-gray-400/40": !filled,
                "text-amber-300": filled,
                "cursor-pointer": onChange
            })}
            onClick={() => handleClick(i)}
            onMouseEnter={() => onChange && setHoverRating(i + 1)}
            onMouseLeave={() => onChange && setHoverRating(null)}
          />
        );
      })}
      <span className="ml-1 text-sm font-semibold">{rating}</span>
    </div>
  );
};
