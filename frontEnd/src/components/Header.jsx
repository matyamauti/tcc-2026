import React from 'react';

export function Header({ currentDate, currentTime }) {
  return (
    <header className="p-6 lg:px-10 lg:py-6 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          DETECÇÃO EM TEMPO REAL
        </h1>
        <p className="text-slate-400 mt-1 text-sm sm:text-base">Monitoramento automatizado de EPIs e vestimentas</p>
      </div>
      <div className="text-left sm:text-right">
        <div className="text-sm font-medium text-slate-400">{currentDate}</div>
        <div className="text-xl sm:text-2xl font-bold text-white font-mono">{currentTime}</div>
      </div>
    </header>
  );
}
