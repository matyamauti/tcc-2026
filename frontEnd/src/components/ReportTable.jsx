import React from 'react';
import { Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('pt-BR');
}

function exportCsv(detections) {
  const header = ['horario', 'resultado', 'exposicao', 'vestimenta', 'epi'];
  const rows = detections.map((detection) => [
    new Date(detection.timestamp).toISOString(),
    detection.result === 'alert' ? 'ALERTA' : 'OK',
    `${detection.exposure}%`,
    detection.type,
    detection.status,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `deteccoes-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function ReportTable({ detections = [] }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
      <div className="p-5 border-b border-slate-700/50 bg-slate-800/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers size={18} className="text-blue-400" />
          RELATÓRIO DE DETECÇÕES
        </h3>
        <button
          type="button"
          onClick={() => exportCsv(detections)}
          className="text-xs bg-blue-600/80 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors font-medium border border-blue-500/50 shadow-lg shadow-blue-500/20"
        >
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
            {detections.map((detection) => {
              const hasAlert = detection.result === 'alert';

              return (
                <tr key={detection.id} className={`${hasAlert ? 'bg-red-500/5 hover:bg-red-500/10' : 'hover:bg-slate-800/40'} transition-colors`}>
                  <td className="px-6 py-4 text-slate-300 font-mono">{formatTime(detection.timestamp)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 ${hasAlert ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'} px-3 py-1 rounded-full text-xs font-bold border shadow-inner`}>
                      {hasAlert ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                      {hasAlert ? 'ALERTA' : 'OK'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-mono ${hasAlert ? 'text-red-300' : 'text-green-300'}`}>
                    {Math.round(detection.exposure)}%
                  </td>
                  <td className="px-6 py-4 text-slate-200">{detection.type}</td>
                  <td className={`px-6 py-4 ${hasAlert ? 'text-orange-400' : 'text-green-400'} font-medium`}>
                    {detection.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
