
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { VideoData } from '../types';

interface Props {
  data: VideoData[];
}

const VideoChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map(v => ({
    name: v.title,
    effort: v.estimatedEffort,
    watchTime: v.watchTime,
    subs: v.subscribersGained,
    format: v.format
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass p-3 rounded-lg border border-white/20 text-xs">
          <p className="font-bold text-white mb-1">{item.name}</p>
          <p className="text-white/60">Effort: <span className="text-white">{item.effort}h</span></p>
          <p className="text-white/60">Watch Time: <span className="text-white">{item.watchTime}h</span></p>
          <p className="text-white/60">Format: <span className="text-white">{item.format}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            type="number" 
            dataKey="effort" 
            name="Effort (Hours)" 
            unit="h" 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            type="number" 
            dataKey="watchTime" 
            name="Watch Time" 
            unit="h" 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <ZAxis type="number" dataKey="subs" range={[60, 400]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.2)' }} />
          <Scatter name="Videos" data={chartData}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.format === 'Deep Dive' ? '#a78bfa' : entry.format === 'Cinematic' ? '#f43f5e' : entry.format === 'Shorts' ? '#38bdf8' : '#fbbf24'} 
                fillOpacity={0.8}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VideoChart;
