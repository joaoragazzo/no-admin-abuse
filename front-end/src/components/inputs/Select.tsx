import clsx from "clsx"
import { Select as AntDSelect } from "antd";
import type { Option } from "@/types/Option";

interface SelectProps {
    label?:string,
    onChange?: ((key: any) => void) | React.Dispatch<React.SetStateAction<any>>
    options: Option[]
    placeholder?: string
    value?: any
    disabled?:boolean
    className?: string
    required?: boolean
}


export const Select: React.FC<SelectProps> = ({className, required, label, onChange, options, placeholder, value, disabled }) => {
    return (
        <div className={clsx(
            "flex flex-col", 
            { "cursor-not-allowed" : disabled },
            className)}>
            {label && 
                <div className="text-xs text-gray-500 mb-2">
                    {label} {required && <span className="mr-2 text-red-500">*</span>}
                </div>
            }
            <div>
                <AntDSelect 
                    onChange={
                        (e) => {
                            onChange?.(e)
                        }
                    }
                    className="w-full"
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    options={options}
                />
                
            </div>
        </div>
    )
}