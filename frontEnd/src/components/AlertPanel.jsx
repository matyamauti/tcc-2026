import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function AlertPanel({ currentDate, currentTime }) {
  return (
    <div className="bg-gradient-to-b from-red-950/40 to-slate-900 border border-red-900/50 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

      <div className="flex items-center gap-3 text-red-500 mb-6">
        <AlertTriangle size={28} className="animate-pulse" />
        <h3 className="text-xl sm:text-2xl font-bold tracking-wider">ALERTA</h3>
      </div>

      <div className="space-y-4 flex-1">
        <div className="bg-red-950/40 border border-red-900/50 p-4 rounded-xl shadow-inner">
          <p className="text-sm text-red-400/80 mb-1 font-medium">Status de Detecção</p>
          <p className="text-lg font-semibold text-red-100">Vestimenta inadequada</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-700/50 p-4 rounded-xl shadow-inner">
          <p className="text-xs text-slate-400 mb-1 font-medium">Tipo</p>
          <p className="text-lg font-bold text-white">Shorts</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-700/50 p-4 rounded-xl shadow-inner">
          <p className="text-xs text-slate-400 mb-1 font-medium">Status</p>
          <p className="text-lg font-bold text-orange-400">Incompleto</p>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-red-900/30 flex justify-between items-center text-sm">
        <span className="text-slate-400 font-medium">{currentDate}</span>
        <span className="text-red-300 font-mono bg-red-950/50 px-3 py-1.5 rounded-md border border-red-900/50 shadow-inner">
          {currentTime}
        </span>
      </div>
    </div>
  );
}
