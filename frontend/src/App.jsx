import {useRef,useEffect,useState} from "react";
function App() {
const videoRef = useRef(null);
const [front,setFront] = useState(false);
const [barcode,setBarcode]=useState("barcode is supported");
const [barcodeDector,setBarcodeDector]=useState(false);
useEffect(()=>{
let stream;
async function startcamera(){
try{
 // List cameras and microphones.
stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:front?"user":"environment"}});
videoRef.current.srcObject =stream;
}catch(err){
console.log("camera error :",err);
}
}
startcamera();

// check compatibility
if (!("BarcodeDetector" in globalThis)) {
	setBarcode("Barcode Detector is not supported by this browser.");
  console.log("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");

  // create new detector
  const barcodeDetector = new BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
  });
barcodeDetector
  .detect(imageEl)
  .then((barcodes) => {
    barcodes.forEach((barcode) => console.log(barcode.rawValue));
  })
  .catch((err) => {
    console.error(err);
  });
}


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

<div>{barcode}</div>
</>
);
}

export default App
