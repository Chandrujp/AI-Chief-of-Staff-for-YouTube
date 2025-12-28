
import React from 'react';
import { BurnoutLevel } from '../types';

interface Props {
  level: BurnoutLevel;
}

const BurnoutMeter: React.FC<Props> = ({ level }) => {
  const colors = {
    [BurnoutLevel.LOW]: 'bg-green-500',
    [BurnoutLevel.MEDIUM]: 'bg-yellow-500',
    [BurnoutLevel.HIGH]: 'bg-red-500'
  };

  const textColors = {
    [BurnoutLevel.LOW]: 'text-green-400',
    [BurnoutLevel.MEDIUM]: 'text-yellow-400',
    [BurnoutLevel.HIGH]: 'text-red-400'
  };

  const width = level === BurnoutLevel.LOW ? '33%' : level === BurnoutLevel.MEDIUM ? '66%' : '100%';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <span className="text-xs uppercase tracking-widest text-white/50 font-medium">Burnout Risk Status</span>
        <span className={`text-xl font-bold ${textColors[level]}`}>{level}</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors[level]} transition-all duration-1000 ease-out`}
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default BurnoutMeter;
