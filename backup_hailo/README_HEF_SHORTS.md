# Shorts Detector: ONNX para HEF no Hailo8L

Este backup contem o dataset Roboflow, os resultados do treino YOLOv8n e o ONNX candidato para gerar o HEF customizado.

## Artefatos atuais

- Dataset: `Shorts.v1-teste1-06-05.yolov8`
- Classe unica: `Shorts`
- Melhor candidato: `runs/detect/train-2/weights/best.onnx`
- Peso PyTorch correspondente: `runs/detect/train-2/weights/best.pt`
- Resultado final do treino `train-2`: mAP50 em torno de `0.982` e mAP50-95 em torno de `0.914`
- `yolov8n.hef` nesta pasta e um HEF generico oficial de 80 classes, nao e o modelo customizado de shorts

## Onde gerar o HEF

Gere o HEF em Ubuntu/WSL2 x86_64 com Hailo Dataflow Compiler e Hailo Model Zoo instalados. O Raspberry Pi 5 deve ser usado para runtime/teste, nao como maquina principal de compilacao.

O alvo correto para Raspberry Pi AI Kit / AI HAT com Hailo-8L e:

```bash
--hw-arch hailo8l
```

## Calibracao

Use imagens reais do conjunto de treino/validacao como calibracao. Uma pasta com 100 a 300 imagens costuma ser suficiente para a primeira compilacao.

Exemplo no ambiente Linux de compilacao:

```bash
mkdir -p calib_shorts
find Shorts.v1-teste1-06-05.yolov8/train/images -type f | head -n 300 | xargs -I{} cp "{}" calib_shorts/
```

## Comando base com Hailo Model Zoo

Dentro do ambiente com `hailomz` disponivel:

```bash
hailomz compile yolov8n \
  --ckpt runs/detect/train-2/weights/best.onnx \
  --hw-arch hailo8l \
  --calib-path calib_shorts \
  --classes 1
```

Se a sua versao do Model Zoo exigir YAML explicito, copie o YAML de rede `yolov8n.yaml` do Model Zoo, ajuste `classes: 1`/postprocess para uma classe e rode:

```bash
hailomz compile \
  --ckpt runs/detect/train-2/weights/best.onnx \
  --yaml yolov8n_shorts.yaml \
  --hw-arch hailo8l \
  --calib-path calib_shorts
```

O arquivo esperado ao final deve ser algo como:

```text
yolov8n.hef
```

Renomeie para evitar confusao com o HEF generico:

```bash
mv yolov8n.hef shorts_yolov8n_h8l.hef
```

## Validacao do HEF

No Raspberry Pi:

```bash
hailo parse-hef shorts_yolov8n_h8l.hef
```

Procure:

```text
Architecture HEF was compiled for: HAILO8L
Op YOLOV8
Classes: 1
Image height: 640
Image width: 640
```

Se aparecer `Classes: 80`, voce ainda esta usando um HEF generico. Se aparecer `HAILO8`, o arquivo foi compilado para a arquitetura errada.

## Rodar no Raspberry Pi

Na raiz deste repositorio:

```bash
source setup_env.sh
python basic_pipelines/shorts_detection.py \
  --input usb \
  --hef-path backup_hailo/shorts_yolov8n_h8l.hef \
  --labels-json backup_hailo/shorts-labels.json \
  --show-fps
```

Com camera CSI/RPi:

```bash
python basic_pipelines/shorts_detection.py \
  --input rpi \
  --hef-path backup_hailo/shorts_yolov8n_h8l.hef \
  --labels-json backup_hailo/shorts-labels.json \
  --show-fps
```

## Diagnostico rapido

Verificar Hailo:

```bash
hailortcli fw-control identify
ls -l /dev/hailo0
```

Verificar plugins GStreamer:

```bash
gst-inspect-1.0 hailo
gst-inspect-1.0 hailotools
```
