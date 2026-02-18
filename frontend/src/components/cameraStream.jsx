import {useEffect,useRef} from "react";


export default function CameraStream({deviceId}){
const videoRef = useRef(null);
console.log(deviceId);

useEffect(() => {
  if (!deviceId) return;

  let stream;

  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: deviceId }
      });

      videoRef.current.srcObject = stream;
    } catch (err) {
      console.log("Camera error:", err);
    }
  }

  startCamera();

  return () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };
}, [deviceId]);
return (
<video ref={videoRef} autoPlay playsInline/>
);
}
