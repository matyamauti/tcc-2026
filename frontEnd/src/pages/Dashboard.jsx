import React from 'react';
import { CameraFeed } from '../components/CameraFeed';
import { AlertPanel } from '../components/AlertPanel';
import { ReportTable } from '../components/ReportTable';
import { BottomCards } from '../components/BottomCards';

export function Dashboard({ currentDate, currentTime, dashboard }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CameraFeed detection={dashboard.latestDetection} isLoading={dashboard.isLoading} />
        <AlertPanel
          currentDate={currentDate}
          currentTime={currentTime}
          detection={dashboard.latestDetection}
          isLoading={dashboard.isLoading}
          error={dashboard.error}
        />
      </div>
      <ReportTable detections={dashboard.detections} />
      <BottomCards summary={dashboard.summary} isMock={dashboard.isMock} error={dashboard.error} />
    </div>
  );
}
