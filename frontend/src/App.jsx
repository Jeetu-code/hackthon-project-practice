import {useRef,useEffect,useState} from "react";
function App() {
const videoRef = useRef(null);
const [front,setFront] = useState(false);
const [barcode,setBarcode]=useState("");
const [barcodeDector,setBarcodeDector]=useState("barcode is supported");
useEffect(()=>{
let stream;
let interval;
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
	setBarcodeDector("Barcode Detector is not supported by this browser.");
  console.log("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");

  // create new detector
  const detector = new BarcodeDetector({
    formats: ["code_39", "codabar", "ean_13"],
  });
interval = setInterval(async () => {
        if (videoRef.current) {
          try {
            const barcodes = await detector.detect(videoRef.current);
            if (barcodes.length > 0) {
              setBarcode(barcodes[0].rawValue);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }, 500); 
}


return ()=>{
if(stream){stream.getTracks().forEach((track)=>(track.stop()));}
if(interval){clearInterval(interval);}
};
},[front]);

return (
<>
<h2>camera flip</h2>
<button onClick={()=>setFront(prev=> !prev)}>Flip camera</button>
<br/>
<br/>
<video ref={videoRef} autoPlay playsInline/>

<div>{barcode}{barcodeDector}</div>
</>
);
}

export default App
