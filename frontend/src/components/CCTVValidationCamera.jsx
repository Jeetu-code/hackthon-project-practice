import CameraStream from "./cameraStream";

export default function CCTVValidationCamera({deviceId}){
return(
<div>
<h3> CCTV Camera</h3>
<CameraStream deviceId={deviceId}/>
</div>
);
}
