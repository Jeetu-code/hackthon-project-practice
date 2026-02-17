import CameraStream from "./cameraStream";

export default function BinCamera({deviceId}){
return(
<div>
<h3>BinCamera</h3>
<CameraStream deviceId={deviceId}/>
</div>
);
}
