import cv2
import subprocess
import threading

# caminho do modelo
HEF_PATH = "yolov5m_h8l.hef"

# função para rodar hailo em paralelo
def run_hailo():
    subprocess.run(["hailortcli", "run", HEF_PATH])

# inicia hailo em thread
threading.Thread(target=run_hailo, daemon=True).start()

# abre câmera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Erro ao abrir câmera")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # mostra câmera
    cv2.imshow("Camera + Hailo", frame)

    # sair com ESC
    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()


