interface SelectProps {
    label?:string,
    onChange?: (key: string) => void
    options: {key: string, label: string}[]
    placeholder?: string
    value?: string
}


export const Select: React.FC<SelectProps> = ({ label, onChange, options, placeholder, value }) => {
    return (
        <div className="flex flex-col w-full">
            {label && <div className="text-xs text-gray-500 mb-2">
                {label}
            </div>}
            <div>
                <select 
                    onChange={
                        (e) => {
                            onChange?.(e.target.value)
                        }
                    } 
                    className="border-1 border-neutral-700 text-sm px-4 py-2  bg-neutral-900/55 rounded w-full" 
                    value={value} 
                >
                    
                </select>
            </div>
        </div>
    )
}