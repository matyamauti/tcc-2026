import React from 'react';
import { Database, Layers, LayoutDashboard, Camera, FileText, History, Settings } from 'lucide-react';

export function BottomCards({ summary, isMock, error }) {
  const isOnline = !error && String(summary?.connectionStatus || '').toLowerCase() !== 'offline';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:bg-slate-800/60 transition-colors group">
        <div className="flex items-center gap-4 mb-5">
          <div className="p-3.5 bg-blue-500/10 rounded-xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <Database size={24} className="text-blue-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Armazenamento de Eventos</h4>
            <p className="text-sm text-slate-400">Banco de Dados SQLite / PostgreSQL</p>
          </div>
        </div>
        <div className="space-y-3.5 mt-6">
          <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
            <span className="text-slate-400 font-medium">Registros Totais (Hoje)</span>
            <span className="text-white font-mono">{Number(summary?.totalToday || 0).toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
            <span className="text-slate-400 font-medium">Alertas Críticos</span>
            <span className="text-red-400 font-mono font-bold">{Number(summary?.criticalAlerts || 0).toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center text-sm pt-1">
            <span className="text-slate-400 font-medium">Status da Conexão</span>
            <span className={`${isOnline ? 'text-green-400' : 'text-orange-400'} flex items-center gap-1.5 font-medium`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOnline ? 'bg-green-400' : 'bg-orange-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-green-500' : 'bg-orange-500'}`}></span>
              </span>
              {isMock ? 'Fallback' : isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:bg-slate-800/60 transition-colors group">
        <div className="flex items-center gap-4 mb-5">
          <div className="p-3.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
            <Layers size={24} className="text-indigo-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Camada de Interface</h4>
            <p className="text-sm text-slate-400">Módulos do Sistema Frontend</p>
          </div>
        </div>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
          <li className="flex items-center gap-2.5 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 hover:border-indigo-500/30 transition-colors">
            <LayoutDashboard size={16} className="text-indigo-400" /> <span className="font-medium">Dashboard web</span>
          </li>
          <li className="flex items-center gap-2.5 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 hover:border-indigo-500/30 transition-colors">
            <Camera size={16} className="text-indigo-400" /> <span className="font-medium">Detecções</span>
          </li>
          <li className="flex items-center gap-2.5 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 hover:border-indigo-500/30 transition-colors">
            <FileText size={16} className="text-indigo-400" /> <span className="font-medium">Relatórios</span>
          </li>
          <li className="flex items-center gap-2.5 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 hover:border-indigo-500/30 transition-colors">
            <History size={16} className="text-indigo-400" /> <span className="font-medium">Histórico</span>
          </li>
          <li className="flex items-center gap-2.5 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 hover:border-indigo-500/30 transition-colors sm:col-span-2 md:col-span-1">
            <Settings size={16} className="text-indigo-400" /> <span className="font-medium">Configurações</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
