import type React from "react";

interface MetricCardProp {
    value: string, 
    label: string
}

export const MetricCard: React.FC<MetricCardProp> = ({ value, label }) => {
    return (
        <div className="flex flex-col w-fit gap-4 items-center">
            <div className="text-indigo-500 text-5xl font-extrabold">
              {value}
            </div>
            <div className=" font-bold">
              {label}
            </div>
          </div>
    )
}