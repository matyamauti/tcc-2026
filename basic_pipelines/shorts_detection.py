from pathlib import Path
import os

import cv2
import gi

gi.require_version("Gst", "1.0")
from gi.repository import Gst

import hailo

from hailo_apps.hailo_app_python.core.common.buffer_utils import (
    get_caps_from_pad,
    get_numpy_from_buffer,
)
from hailo_apps.hailo_app_python.core.gstreamer.gstreamer_app import app_callback_class
from hailo_apps.hailo_app_python.apps.detection.detection_pipeline import GStreamerDetectionApp


class user_app_callback_class(app_callback_class):
    def __init__(self):
        super().__init__()


def app_callback(pad, info, user_data):
    buffer = info.get_buffer()
    if buffer is None:
        return Gst.PadProbeReturn.OK

    user_data.increment()
    fmt, width, height = get_caps_from_pad(pad)

    frame = None
    if user_data.use_frame and fmt is not None and width is not None and height is not None:
        frame = get_numpy_from_buffer(buffer, fmt, width, height)

    roi = hailo.get_roi_from_buffer(buffer)
    detections = roi.get_objects_typed(hailo.HAILO_DETECTION)

    shorts_count = 0
    lines = [f"Frame count: {user_data.get_count()}"]

    for detection in detections:
        label = detection.get_label()
        confidence = detection.get_confidence()
        class_id = detection.get_class_id()

        if label.lower() == "shorts" or class_id in (0, 1):
            shorts_count += 1
            bbox = detection.get_bbox()
            lines.append(
                f"shorts: class_id={class_id} confidence={confidence:.2f} "
                f"bbox=({bbox.xmin():.3f},{bbox.ymin():.3f},{bbox.width():.3f},{bbox.height():.3f})"
            )

    if frame is not None:
        cv2.putText(
            frame,
            f"shorts: {shorts_count}",
            (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            2,
        )
        user_data.set_frame(cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))

    if shorts_count:
        print("\n".join(lines))

    return Gst.PadProbeReturn.OK


if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent.parent
    os.environ["HAILO_ENV_FILE"] = str(project_root / ".env")

    user_data = user_app_callback_class()
    app = GStreamerDetectionApp(app_callback, user_data)
    app.run()
