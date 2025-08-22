import { CountUp } from "@/components/misc/CountUp";
import type React from "react";

interface MetricCardProp {
    value: number, 
    label: string
}

export const MetricCard: React.FC<MetricCardProp> = ({ value, label }) => {
    return (
        <div className="flex flex-col w-fit gap-4 items-center justify-center">
            <div className="text-indigo-500 text-5xl font-extrabold">
              <CountUp end={value} />
            </div>
            <div className="font-bold text-center">
              {label}
            </div>
          </div>
    )
}