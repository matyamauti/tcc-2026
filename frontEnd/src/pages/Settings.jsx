import React from 'react';

export function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Configurações do Sistema</h2>
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <p className="text-slate-400">Aqui você poderá configurar integrações, usuários e alertas.</p>
      </div>
    </div>
  );
}
