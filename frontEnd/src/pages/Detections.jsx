import React from 'react';
import { CameraFeed } from '../components/CameraFeed';

export function Detections() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Câmeras em Tempo Real</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CameraFeed />
      </div>
    </div>
  );
}
