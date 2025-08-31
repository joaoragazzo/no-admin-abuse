import clsx from "clsx"

interface SelectProps {
    label?:string,
    onChange?: (key: string) => void
    options: {value: string, label: string}[]
    placeholder?: string
    value?: string
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
                <select 
                    onChange={
                        (e) => {
                            onChange?.(e.target.value)
                        }
                    } 
                    className="border-1 border-neutral-700 text-sm px-4 py-2  bg-neutral-900/55 rounded w-full" 
                    value={value}
                    disabled={disabled}
                >
                    {placeholder && 
                        <option>{placeholder}</option>
                    }
                    {options.map((content) => (
                        <option value={content.value}>{content.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}