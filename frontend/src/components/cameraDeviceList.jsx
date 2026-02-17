import {useEffect,useState} from "react";

export  default function CameraDeviceList(){
const [devices,setDevices] = useState([]);
useEffect(()=>{

async function getDevices() {
await navigator.mediaDevices.getUserMedia({video:true});
  const allDevices = await navigator.mediaDevices.enumerateDevices();

  const videoDevices = allDevices.filter(
    (device) => device.kind === "videoinput"
  );

  setDevices(videoDevices);
}

getDevices();
},[]);

return (
<div>
<h2>Available Cameras</h2>
{devices.map((device,index)=>(
<div key={device.deviceId}>
	{index+1}.{device.label || "Camera " + (index+1)}
</div>
))}
</div>

);
}








