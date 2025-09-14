import clsx from "clsx";
import type { IconType } from "react-icons/lib";
import { Input as AntDInput } from "antd";

interface InputProps {
    value?: string | undefined | null,
    onChange?: (e: string) => void;
    disabled?: boolean
    readOnly?: boolean
    className?: string
    label?: string
    Icon?: IconType
    placeholder?:string
    type?: string
}

export const Input: React.FC<InputProps> = ({ label, className, readOnly, value, disabled, onChange, Icon, placeholder, type }) => {
    return (
        <div className={clsx("flex flex-col", className)}>
            {label && 
                <div className="text-xs text-gray-500 mb-2">
                    {label}
                </div>
            }
            
            <div className="relative">
                <AntDInput 
                    onChange={(e) => {onChange?.(e.target.value)}} 
                    value={value || ""}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    type={type}
                    {...(Icon ? { prefix: <Icon className="mr-2"/> } : {})}
                />
            </div>
        </div>
        
    );
}