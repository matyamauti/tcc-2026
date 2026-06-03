import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { getDetectionDashboardData, getMockDetectionDashboardData, normalizeDetection } from '../services/detections';

const REFRESH_INTERVAL_MS = Number(import.meta.env.VITE_API_REFRESH_MS || 5000);

export function useDetectionDashboard() {
  const [data, setData] = useState(getMockDetectionDashboardData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    try {
      const dashboardData = await getDetectionDashboardData();
      setData(dashboardData);
      setError(null);
    } catch (apiError) {
      setData((currentData) => ({
        ...getMockDetectionDashboardData(),
        ...currentData,
        isMock: true,
      }));
      setError(apiError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
    let isWebSocketOpen = false;
    const socket = new WebSocket(api.detectionsWebSocketUrl);

    socket.onopen = () => {
      isWebSocketOpen = true;
      setError(null);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'detections.snapshot') {
        const detections = message.items.map(normalizeDetection);
        if (detections.length === 0) {
          return;
        }

        setData((currentData) => ({
          ...currentData,
          latestDetection: detections[0],
          detections,
          summary: {
            ...currentData.summary,
            totalToday: detections.length,
            criticalAlerts: detections.filter((detection) => detection.result === 'alert').length,
            connectionStatus: 'online',
          },
          isMock: false,
        }));
        return;
      }

      if (message.type === 'detection.created') {
        const detection = normalizeDetection(message.item);
        setData((currentData) => {
          const detections = [
            detection,
            ...currentData.detections.filter((item) => item.id !== detection.id),
          ].slice(0, 50);

          return {
            ...currentData,
            latestDetection: detection,
            detections,
            summary: {
              ...currentData.summary,
              totalToday: Math.max(currentData.summary.totalToday || 0, detections.length),
              criticalAlerts: detections.filter((item) => item.result === 'alert').length,
              connectionStatus: 'online',
            },
            isMock: false,
          };
        });
      }
    };

    socket.onerror = () => {
      if (!isWebSocketOpen) {
        setError(new Error('WebSocket indisponivel'));
      }
    };

    socket.onclose = () => {
      isWebSocketOpen = false;
    };

    const intervalId = setInterval(() => {
      if (!isWebSocketOpen) {
        loadDashboard();
      }
    }, REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      socket.close();
    };
  }, [loadDashboard]);

  return {
    ...data,
    isLoading,
    error,
    refresh: loadDashboard,
  };
}
