import clsx from "clsx";

interface InputProps {
    value?: string,
    onChange?: (e: string) => void;
    disabled?: boolean
    readOnly?: boolean
    className?: string
    label?: string
}

export const Input: React.FC<InputProps> = ({ label, className, readOnly, value, disabled, onChange }) => {
    return (
       <div className={clsx(
            "flex flex-col",
            className)
        }>
            <div className="text-md text-gray-200 font-bold mb-1">{label}</div>
            <input
                value={value}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.value)}
                readOnly={readOnly}
                className={clsx(
                    "border-1 border-white/60 rounded-md px-4 py-1.5",
                    {"cursor-not-allowed bg-gray-800/30" : readOnly || disabled }
                )}
            > </input>
       </div>
        
    );
}