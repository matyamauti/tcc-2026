import React from 'react';
import { CameraFeed } from '../components/CameraFeed';
import { AlertPanel } from '../components/AlertPanel';
import { ReportTable } from '../components/ReportTable';
import { BottomCards } from '../components/BottomCards';

export function Dashboard({ currentDate, currentTime }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CameraFeed />
        <AlertPanel currentDate={currentDate} currentTime={currentTime} />
      </div>
      <ReportTable currentTime={currentTime} />
      <BottomCards />
    </div>
  );
}
