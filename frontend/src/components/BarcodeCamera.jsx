import CameraStream from "./cameraStream";

export default function BarcodeCamera({deviceId}){
return(
<div>
<h3> Barcode Camera</h3>
<CameraStream deviceId={deviceId}/>
</div>
);
}
