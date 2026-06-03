# 🎯 Sistema de Detecção de Objetos com YOLO para Raspberry Pi

Projeto de Trabalho de Conclusão de Curso (TCC) voltado ao desenvolvimento de um sistema de visão computacional utilizando modelos YOLO para detecção de objetos em ambiente embarcado com Raspberry Pi.

---

## 📌 Objetivo

Desenvolver e avaliar um sistema baseado em inteligência artificial capaz de realizar detecção de objetos em tempo real utilizando treinamento customizado e implementação em dispositivo embarcado.

---

## 🧠 Tecnologias Utilizadas

- Python
- YOLO
- OpenCV
- Raspberry Pi
- Visão Computacional
- Inteligência Artificial
- Machine Learning

---

## 🚀 Funcionalidades

✅ Treinamento de modelo customizado YOLO

✅ Processamento de imagens

✅ Detecção automática de objetos

✅ Execução em Raspberry Pi

✅ Avaliação de desempenho

---

## 📊 Metodologia

1. Coleta e organização do dataset

2. Rotulagem das imagens

3. Treinamento do modelo YOLO

4. Testes experimentais

5. Implementação em Raspberry Pi

6. Avaliação dos resultados

---

## 🎓 Trabalho Acadêmico

Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC).

Autor: **Matheus Yamauti**

---

## 📄 Licença

Uso acadêmico.

---

## Integração com Backend

O frontend busca os dados em uma API configurada por variáveis de ambiente.

Crie um arquivo `.env` na pasta `frontEnd`:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_REFRESH_MS=5000
```

### Endpoints esperados

`GET /api/detections/latest`

```json
{
  "id": "evt-001",
  "camera_id": "CAM_01_LABORATORIO",
  "timestamp": "2026-06-02T12:00:00Z",
  "is_alert": true,
  "status": "Incompleto",
  "type": "Shorts",
  "exposure": 23,
  "confidence": 99,
  "message": "Vestimenta inadequada",
  "snapshot_url": "http://localhost:8000/static/latest.jpg",
  "stream_url": "http://localhost:8000/video_feed",
  "boxes": [
    {
      "label": "SHORTS",
      "confidence": 99,
      "x": 37,
      "y": 40,
      "width": 8,
      "height": 12
    }
  ]
}
```

`GET /api/detections?limit=50`

Pode retornar um array direto ou um objeto com `items`, `detections` ou `results`.

```json
[
  {
    "id": "evt-001",
    "timestamp": "2026-06-02T12:00:00Z",
    "is_alert": true,
    "type": "Shorts",
    "status": "Incompleto",
    "exposure": 23
  }
]
```

`GET /api/summary`

```json
{
  "total_today": 1432,
  "critical_alerts": 12,
  "connection_status": "online"
}
```

### Observações

- Enquanto a API não responde, o painel continua funcionando com dados locais de fallback.
- O frontend aceita `snake_case` e `camelCase` para os principais campos.
- As coordenadas das caixas (`x`, `y`, `width`, `height`) devem estar em porcentagem relativa à imagem, de `0` a `100`.
- Para stream MJPEG do OpenCV/Flask/FastAPI, envie a URL em `stream_url`; para imagem estática, envie `snapshot_url`.
