import React from 'react';
import { BottomCards } from '../components/BottomCards';
import { ReportTable } from '../components/ReportTable';

export function History({ dashboard }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Histórico de Eventos</h2>
      <ReportTable detections={dashboard.detections} />
      <BottomCards summary={dashboard.summary} isMock={dashboard.isMock} error={dashboard.error} />
    </div>
  );
}
