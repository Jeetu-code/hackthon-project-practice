
import { useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function BarcodeCamera() {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    async function startCamera() {
      try {
        // 🔹 Ask permission first
        await navigator.mediaDevices.getUserMedia({ video: true });

        // 🔹 Get devices
        const devices = await navigator.mediaDevices.enumerateDevices();

        const videoDevices = devices.filter(
          device => device.kind === "videoinput"
        );

        // 🔹 Try to find back camera
        let backCamera = videoDevices.find(device =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("rear")
        );

        // 🔹 Fallback to last camera if no label match
        if (!backCamera) {
          backCamera = videoDevices[videoDevices.length - 1];
        }

        const controls = await codeReader.decodeFromVideoDevice(
          backCamera.deviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              console.log("Scanned:", result.getText());
            }
          }
        );

        controlsRef.current = controls;

      } catch (error) {
        console.error("Camera error:", error);
      }
    }

    startCamera();

    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop();
        controlsRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h3>Barcode Scanner</h3>
      <video ref={videoRef} style={{ width: "300px" }} />
    </div>
  );
}

