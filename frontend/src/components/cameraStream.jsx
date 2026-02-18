import {useEffect,useRef} from "react";


export default function CameraStream({deviceId}){
const videoRef = useRef(null);
console.log(deviceId);
useEffect(()=>{
async function startCamera(){
if(!deviceId) return;
try{
const stream = await navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:deviceId}}});
videoRef.current.srcObject=stream;
}
catch(err){
console.log("Camera access error :",err);
}
}
startCamera();

return ()=>{
if(videoRef.current?.srcObject){
videoRef.current.srcObject
	.getTracks()
	.forEach((track)=>track.stop());
}
};
},[deviceId]);

return (
<video ref={videoRef} autoPlay playsInline/>
);
}
