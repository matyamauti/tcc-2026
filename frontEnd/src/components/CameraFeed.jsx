import React from 'react';
import { AlertTriangle } from 'lucide-react';
import cameraFeed from '../assets/foto-shorts.png'; // <-- NOVO ARQUIVO DE IMAGEM

export function CameraFeed() {
  return (
    <div className="xl:col-span-2 relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-800/30 backdrop-blur-xl group">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent z-10 pointer-events-none"></div>
      
      {/* Top overlay badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
        <span className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1">
          <AlertTriangle size={14} /> ALERTA DE SEGURANÇA
        </span>
        <span className="bg-slate-900/80 border border-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md font-mono hidden sm:flex">
          CAM_01_LABORATORIO
        </span>
      </div>
      
      {/* Image with bounding boxes */}
      <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
        <img src={cameraFeed} alt="Câmera do Laboratório" className="w-full h-full object-cover opacity-90" />

        {/* Bounding box for shorts (ajustado para a nova foto) */}
        <div className="absolute top-[40%] left-[37%] w-[8%] h-[12%] border-2 border-red-500 bg-red-500/10 rounded-sm z-20 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-sm whitespace-nowrap animate-pulse backdrop-blur-sm border border-red-400/50">
            SHORTS: 99%
          </span>
        </div>
      </div>
    </div>
  );
}
