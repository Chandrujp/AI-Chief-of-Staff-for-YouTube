
import React from 'react';

interface Props {
  label: string;
  value: string;
  isPositive: boolean;
}

const ROICard: React.FC<Props> = ({ label, value, isPositive }) => {
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col gap-1">
      <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        {isPositive && (
          <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-bold">
            ROI+
          </span>
        )}
      </div>
    </div>
  );
};

export default ROICard;
