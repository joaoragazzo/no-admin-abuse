import clsx from "clsx";
import type React from "react";
import { useState } from "react";

interface TextAreaProps {
    label?: string,
    placeholder?: string,
    maxCharacters?: number,
    className?: string
    onChange?: (text: string) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, maxCharacters, placeholder, className, onChange }) => {
    const [characters, setCharacters] = useState<number>(0);
    
    return (
        <div className={clsx("flex flex-col", className)}>
            {label && <div className="text-sm">{label}</div>} 
            <textarea 
                placeholder={placeholder} 
                className="rounded border-white/60 border-1 p-2 resize-none h-30" 
                onChange={(e) => {
                    setCharacters(e.target.value.length); 
                    onChange?.(e.target.value)
                }}
                maxLength={maxCharacters}
            />
            {maxCharacters && <div className="text-right text-sm text-gray-400 mt-1">{characters}/{maxCharacters}</div>}
        </div>
    );
}