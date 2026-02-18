import { useState,useEffect } from 'react'
import DeviceList from "./components/cameraDeviceList";
import BarcodeCamera from "./components/BarcodeCamera";
import BinCamera from "./components/BinCamera";
import CCTVValidationCamera from "./components/CCTVValidationCamera";
function App() {
const [devices,setDevices] = useState([]);
const [selectedBarcode,setSelectedBarcode] =useState("");
const [selectedBin,setSelectedBin] =useState("");
const [selectedCCTV,setSelectedCCTV] =useState("");

useEffect(()=>{
async function setup(){
await navigator.mediaDevices.getUserMedia({video:true});
const allDevices = await navigator.mediaDevices.enumerateDevices();
const videoDevices = allDevices.filter((device)=>device.kind=== "videoinput");
setDevices(videoDevices);
}
setup();
},[]);

  return (
    <>
<h3>Select Camera</h3>
<label>Barcode Camera:</label>
<select onChange={(e)=>setSelectedBarcode(e.target.value)}>
<option value="">Select</option>
{devices.map((device)=> (
<option key={device.deviceId} value={device.deviceId}>
{device.label}
</option>
))}
</select>

<label>Bin Camera :</label>
<select onChange={(e)=>setSelectedBin(e.target.value)}>
<option value="">Select</option>
{devices.map((device)=>(
<option key={device.deviceId} value={device.deviceId}>{device.label}</option>
))}
</select>

<label>CCTV Camera :</label>
<select onChange={(e)=>setSelectedCCTV(e.target.value)}>
<option value="">Select</option>
{devices.map((device)=>(
<option key={device.deviceId} value={device.deviceId}>{device.label}</option>
))}
</select>

{selectedBarcode && <BarcodeCamera deviceId={selectedBarcode} />}
{selectedBin && <BinCamera deviceId={selectedBin} />}
{selectedCCTV && <CCTVValidationCamera deviceId={selectedCCTV} />}
</>
  )
}

export default App
