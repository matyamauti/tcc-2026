import { api, buildUrl } from './api';
import { mockDetections, mockLatestDetection, mockSummary } from './mockData';

function unwrapList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload?.items || payload?.detections || payload?.results || [];
}

function normalizeBox(box, index) {
  return {
    id: box.id || `box-${index}`,
    label: box.label || box.class_name || box.className || box.type || 'Objeto',
    confidence: Number(box.confidence ?? box.score ?? 0),
    x: Number(box.x ?? box.left ?? 0),
    y: Number(box.y ?? box.top ?? 0),
    width: Number(box.width ?? box.w ?? 0),
    height: Number(box.height ?? box.h ?? 0),
  };
}

export function normalizeDetection(raw = {}) {
  const result = String(raw.result || raw.status_result || raw.statusResult || raw.severity || '').toLowerCase();
  const isAlert = raw.is_alert ?? raw.isAlert ?? result.includes('alert') ?? false;
  const snapshotUrl = raw.snapshot_url || raw.snapshotUrl || raw.image_url || raw.imageUrl || null;
  const streamUrl = raw.stream_url || raw.streamUrl || null;

  return {
    id: raw.id || raw.uuid || `${raw.camera_id || raw.cameraId || 'camera'}-${raw.timestamp || Date.now()}`,
    cameraId: raw.camera_id || raw.cameraId || raw.camera || 'CAM_01_LABORATORIO',
    timestamp: raw.timestamp || raw.created_at || raw.createdAt || raw.time || new Date().toISOString(),
    result: isAlert || result === 'alert' ? 'alert' : 'ok',
    status: raw.status || raw.epi_status || raw.epiStatus || (isAlert ? 'Incompleto' : 'Completo'),
    type: raw.type || raw.clothing || raw.vestimenta || raw.object_class || raw.objectClass || 'Nao informado',
    exposure: Number(raw.exposure ?? raw.exposicao ?? raw.exposure_percent ?? raw.exposurePercent ?? 0),
    confidence: Number(raw.confidence ?? raw.score ?? 0),
    message: raw.message || raw.description || (isAlert ? 'Vestimenta inadequada' : 'Vestimenta adequada'),
    snapshotUrl: snapshotUrl ? buildUrl(snapshotUrl) : null,
    streamUrl: streamUrl ? buildUrl(streamUrl) : null,
    boxes: (raw.boxes || raw.bounding_boxes || raw.boundingBoxes || []).map(normalizeBox),
  };
}

export function normalizeSummary(raw = {}) {
  return {
    totalToday: Number(raw.total_today ?? raw.totalToday ?? raw.total ?? mockSummary.totalToday),
    criticalAlerts: Number(raw.critical_alerts ?? raw.criticalAlerts ?? raw.alerts ?? mockSummary.criticalAlerts),
    connectionStatus: raw.connection_status || raw.connectionStatus || raw.status || mockSummary.connectionStatus,
  };
}

export async function getDetectionDashboardData() {
  const [latestPayload, detectionsPayload, summaryPayload] = await Promise.all([
    api.getLatestDetection(),
    api.getDetections(50),
    api.getSummary(),
  ]);

  const detections = unwrapList(detectionsPayload).map(normalizeDetection);

  return {
    latestDetection: normalizeDetection(latestPayload || detections[0] || mockLatestDetection),
    detections: detections.length > 0 ? detections : mockDetections,
    summary: normalizeSummary(summaryPayload),
    isMock: false,
  };
}

export function getMockDetectionDashboardData() {
  return {
    latestDetection: mockLatestDetection,
    detections: mockDetections,
    summary: mockSummary,
    isMock: true,
  };
}
