import clsx from "clsx";
import type React from "react";
import { Input } from 'antd';

const { TextArea: AntDTextArea } = Input;

interface TextAreaProps {
    label?: string,
    placeholder?: string,
    maxCharacters?: number,
    className?: string
    onChange?: (text: string) => void;
    
}

export const TextArea: React.FC<TextAreaProps> = ({ label, maxCharacters, placeholder, className, onChange }) => {
    
    return (
        <div className={clsx("flex flex-col mb-5", className)}>
            {label && <div className="text-sm">{label}</div>} 
            <AntDTextArea 
                placeholder={placeholder} 
                className="rounded h-35 bg-neutral-900/25"
                style={{ resize: 'none'}}
                onChange={(e) => {
                    onChange?.(e.target.value)
                }}
                maxLength={maxCharacters}
                showCount={maxCharacters ? true : false}
                
            />
        </div>
    );
}