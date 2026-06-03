import React from 'react';
import { api } from '../services/api';

export function Settings({ dashboard }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Configurações do Sistema</h2>
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 mb-1">URL do Backend</p>
            <p className="text-white font-mono break-all">{api.baseUrl}</p>
          </div>
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-400 mb-1">Status da Integração</p>
            <p className={dashboard.error ? 'text-orange-400 font-semibold' : 'text-green-400 font-semibold'}>
              {dashboard.error ? 'Usando fallback local' : 'Conectado ao backend'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
