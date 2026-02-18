import { useRef, useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

function App() {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    async function getDevices() {
      await navigator.mediaDevices.getUserMedia({ video: true });
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(d => d.kind === "videoinput");
      setDevices(videoDevices);

      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    }

    getDevices();
  }, []);

  useEffect(() => {
    if (!selectedDeviceId) return;

    const codeReader = new BrowserMultiFormatReader();
    let controls;

    async function startScanner() {
	await new Promise(resolve => setTimeout(resolve,300));
      controls = await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, err) => {
          if (result) {
            setBarcode(result.getText());
          }
        }
      );
    }

    startScanner();

    return () => {
      if (controls) controls.stop();
	if(videoRef.current){
	videoRef.current.srcObject = null;
	}
    };
  }, [selectedDeviceId]);

  return (
    <>
      <h2>ZXing Barcode Scanner</h2>

      <select onChange={(e) => setSelectedDeviceId(e.target.value)}>
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <br /><br />

      <video ref={videoRef} autoPlay playsInline width="300" />

      <div>Result: {barcode}</div>
    </>
  );
}

export default App;
