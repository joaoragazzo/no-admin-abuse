import React, { useEffect, useState } from "react";

interface CountUpProps {
  end: number; 
  duration?: number; 
  decimals?: number; 
  prefix?: string; 
  suffix?: string; 
  separator?: string; 
  decimalSeparator?: string; 
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1500,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator,
  decimalSeparator,
  className,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const easeOutQuad = (t: number) => t * (2 - t);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuad(progress);

      setCount(easedProgress * end);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration]);

  const formatNumber = (value: number) => {
    let formatted = value.toFixed(decimals);

    if (separator || decimalSeparator) {
      const parts = formatted.split(".");
      if (separator) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      }
      if (decimalSeparator && parts[1]) {
        formatted = parts.join(decimalSeparator);
      } else {
        formatted = parts.join(".");
      }
    }

    return `${prefix}${formatted}${suffix}`;
  };

  return <span className={className}>{formatNumber(count)}</span>;
};
