import type React from "react";
import { MetricCard } from "./MetricCard";

export const Metrics: React.FC = () => {
    return (
        <div className="flex flex-row items-center justify-center gap-20">
          <MetricCard label={"Denúncias  feitas"} value={"1.9K"} />
          <MetricCard label={"Servidores Registrados"} value={"324"} />
          <MetricCard label={"Casos Resolvidos"} value={"70%"} />
        </div>
    )
}