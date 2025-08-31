import clsx from "clsx";
import type { IconType } from "react-icons/lib";

interface InputProps {
    value?: string,
    onChange?: (e: string) => void;
    disabled?: boolean
    readOnly?: boolean
    className?: string
    label?: string
    Icon?: IconType
    placeholder?:string
}

export const Input: React.FC<InputProps> = ({ label, className, readOnly, value, disabled, onChange, Icon, placeholder }) => {
    return (
        <div className={clsx("flex flex-col", className)}>
            {label && 
                <div className="text-xs text-gray-500 mb-2">
                    {label}
                </div>
            }
            
            <div className="relative">
                <input 
                    onChange={(e) => (onChange?.(e.target.value))} 
                    value={value}
                    className="border-1 border-neutral-700 text-sm px-4 py-2 pl-10 bg-neutral-900/55 rounded w-full" 
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                />
                {Icon && 
                    <div className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" >
                        <Icon />
                    </div>
                }
                
            </div>
        </div>
        
    );
}