import React from 'react';
import { ReportTable } from '../components/ReportTable';

export function Reports({ dashboard }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Relatórios Analíticos</h2>
      <ReportTable detections={dashboard.detections} />
    </div>
  );
}
