import type React from "react";
import { MetricCard } from "./MetricCard";
import { useEffect, useState } from "react";
import type { HomepageStatsDTO } from "@/types/stats/HomepageStatsDTO";
import StatsService from "@/services/StatsService";

export const Metrics: React.FC = () => {
  const [stats, setStats] = useState<HomepageStatsDTO | null>(null);
  
  useEffect(() => {
    StatsService.homepageStats().then(data => setStats(data));
  }, [])
  return (
    <div className="flex sm:flex-row flex-col items-center justify-center gap-20">
      <MetricCard label={"Avaliações  feitas"} value={stats?.totalReviews} />
      <MetricCard label={"Servidores Registrados"} value={stats?.totalServers} />
      <MetricCard label={"Redes Registradas"} value={stats?.totalNetworks} />
    </div>
  )
}