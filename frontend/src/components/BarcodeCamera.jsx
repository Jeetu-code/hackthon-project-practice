import {useRef,useEffect,useState} from "react";
import {BrowserMultiFormatReader} from "@zxing/browser";
import CameraStream from "./cameraStream";

export default function BarcodeCamera({deviceId}){
const videoRef = useRef(null);

useEffect(()=>{
if(!deviceId) return;
const codeReader = new BrowserMultiFormatReader();

codeReader.decodeFromVideoDevice(deviceId,videoRef.current,(result,err)=>{if(result){console.log("Scanned Barcode :",result.getText());}});

return ()=>{
codeReader.reset();
};
},[deviceId]);
return (
<div>
<h3>Barcode Scanner</h3>
<video ref={videoRef} style={{width:"300px"}}/>
</div>
);
}
