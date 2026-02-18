import {useRef,useEffect,useState} from "react";



function App() {
const [devices,setDevices] = useState([]);
const videoRef = useRef(null);
const [front,setFront] = useState(false);
useEffect(()=>{
let stream;
async function startcamera(){
try{
 // List cameras and microphones.
stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:front?"user":"environment"}});
videoRef.current.srcObject =stream;
}catch(err){
cosnole.log("camera error :",err);
}
}
startcamera();
return ()=>{
if(stream){stream.getTracks().forEach((track)=>(track.stop()));}
};
},[front]);

return (
<>
<h2>camera flip</h2>
<button onClick={()=>setFront(prev=> !prev)}>Flip camera</button>
<br/>
<br/>
<video ref={videoRef} autoPlay playsInline/>
</>
);
}

export default App
