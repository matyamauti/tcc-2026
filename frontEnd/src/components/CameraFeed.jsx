import React from 'react';
import { AlertTriangle } from 'lucide-react';
import cameraFeed from '../assets/foto-shorts.png';

export function CameraFeed({ detection, isLoading }) {
  const hasAlert = detection?.result === 'alert';
  const mediaUrl = detection?.streamUrl || detection?.snapshotUrl || cameraFeed;

  return (
    <div className="xl:col-span-2 relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800/30 backdrop-blur-xl group">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent z-10 pointer-events-none"></div>
      
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
        <span className={`${hasAlert ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-green-500/20 border-green-500/50 text-green-400'} border px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1`}>
          <AlertTriangle size={14} /> {hasAlert ? 'ALERTA DE SEGURANCA' : 'OPERACAO NORMAL'}
        </span>
        <span className="bg-slate-900/80 border border-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md font-mono hidden sm:flex">
          {detection?.cameraId || 'CAM_01_LABORATORIO'}
        </span>
      </div>
      
      <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/50 text-slate-300 font-medium">
            Carregando camera...
          </div>
        )}

        <img src={mediaUrl} alt="Camera do laboratorio" className="w-full h-full object-cover opacity-90" />
      </div>
    </div>
  );
}
