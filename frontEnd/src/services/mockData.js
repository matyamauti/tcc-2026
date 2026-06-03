export const mockLatestDetection = {
  id: 'mock-001',
  cameraId: 'CAM_01_LABORATORIO',
  timestamp: new Date().toISOString(),
  result: 'alert',
  status: 'Incompleto',
  type: 'Shorts',
  exposure: 23,
  confidence: 63,
  message: 'Vestimenta inadequada',
  snapshotUrl: null,
  streamUrl: null,
  boxes: [],
};

export const mockDetections = [
  mockLatestDetection,
  {
    id: 'mock-002',
    cameraId: 'CAM_01_LABORATORIO',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    result: 'ok',
    status: 'Completo',
    type: 'Calça de Segurança',
    exposure: 0,
    confidence: 98,
    message: 'Vestimenta adequada',
    snapshotUrl: null,
    streamUrl: null,
    boxes: [],
  },
  {
    id: 'mock-003',
    cameraId: 'CAM_01_LABORATORIO',
    timestamp: new Date(Date.now() - 1000 * 60 * 21).toISOString(),
    result: 'ok',
    status: 'Completo',
    type: 'Calça de Segurança',
    exposure: 0,
    confidence: 97,
    message: 'Vestimenta adequada',
    snapshotUrl: null,
    streamUrl: null,
    boxes: [],
  },
];

export const mockSummary = {
  totalToday: 1432,
  criticalAlerts: 12,
  connectionStatus: 'online',
};
