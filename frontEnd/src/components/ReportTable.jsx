import React from 'react';
import { Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function ReportTable({ currentTime }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
      <div className="p-5 border-b border-slate-700/50 bg-slate-800/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers size={18} className="text-blue-400" />
          RELATÓRIO DE DETECÇÕES
        </h3>
        <button className="text-xs bg-blue-600/80 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium border border-blue-500/50 shadow-lg shadow-blue-500/20">
          Exportar CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Horário</th>
              <th className="px-6 py-4 font-medium">Resultado</th>
              <th className="px-6 py-4 font-medium">Exposição</th>
              <th className="px-6 py-4 font-medium">Vestimenta</th>
              <th className="px-6 py-4 font-medium">EPI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            <tr className="bg-red-500/5 hover:bg-red-500/10 transition-colors">
              <td className="px-6 py-4 text-slate-300 font-mono">{currentTime}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20 shadow-inner">
                  <AlertTriangle size={12} /> ALERTA
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-red-300">23%</td>
              <td className="px-6 py-4 text-slate-200">Shorts</td>
              <td className="px-6 py-4 text-orange-400 font-medium">Incompleto</td>
            </tr>
            <tr className="hover:bg-slate-800/40 transition-colors">
              <td className="px-6 py-4 text-slate-300 font-mono">11:24:05</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20 shadow-inner">
                  <CheckCircle2 size={12} /> OK
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-green-300">0%</td>
              <td className="px-6 py-4 text-slate-200">Calça de Segurança</td>
              <td className="px-6 py-4 text-green-400 font-medium">Completo</td>
            </tr>
            <tr className="hover:bg-slate-800/40 transition-colors">
              <td className="px-6 py-4 text-slate-300 font-mono">11:15:22</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20 shadow-inner">
                  <CheckCircle2 size={12} /> OK
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-green-300">0%</td>
              <td className="px-6 py-4 text-slate-200">Calça de Segurança</td>
              <td className="px-6 py-4 text-green-400 font-medium">Completo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
