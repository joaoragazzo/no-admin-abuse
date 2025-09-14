import clsx from "clsx"
import { Select as AntDSelect } from "antd";

interface SelectProps {
    label?:string,
    onChange?: (key: string) => void
    options: {value: string, label: string}[]
    placeholder?: string
    value?: string | null | undefined
    disabled?:boolean
    className?: string
}


export const Select: React.FC<SelectProps> = ({className, label, onChange, options, placeholder, value, disabled }) => {
    return (
        <div className={clsx(
            "flex flex-col", 
            { "cursor-not-allowed" : disabled },
            className)}>
            {label && 
                <div className="text-xs text-gray-500 mb-2">
                    {label}
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
                >
                    {placeholder && 
                        <option>{placeholder}</option>
                    }
                    {options.map((content) => (
                        <option value={content.value}>{content.label}</option>
                    ))}
                </AntDSelect>
            </div>
        </div>
    )
}