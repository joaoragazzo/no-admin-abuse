import clsx from "clsx";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
  size?: number;
  editable?: boolean;
  onChange?: (newRating: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  size = 16,
  editable = false,
  onChange,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayedRating = hoverRating ?? rating;

  const handleClick = (i: number) => {
    if (!editable) return;
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
            onMouseEnter={() => editable && setHoverRating(i + 1)}
            onMouseLeave={() => editable && setHoverRating(null)}
          />
        );
      })}
      <span className="ml-1">{rating}</span>
    </div>
  );
};
