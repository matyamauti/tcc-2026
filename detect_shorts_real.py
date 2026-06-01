from ultralytics import YOLO
import cv2

model = YOLO("/home/tcc/Downloads/Shorts.yolov11/runs/detect/train-6/weights/best.pt")

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    if not ret:
        break

    results = model(frame)

    annotated_frame = results[0].plot()

    cv2.imshow("Deteccao Shorts", annotated_frame)

    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()
