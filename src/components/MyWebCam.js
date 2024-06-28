import React, { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";


const videoConstraints = {
  width: 320,
  height: 220,
  facingMode: "user"
};


const WebCam2 = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => { const imageSrc = webcamRef.current.getScreenshot();
         setImgSrc(imageSrc); 
         const link = document.createElement("a"); 
         link.href = URL.createObjectURL(webcamRef.current.getScreenshot());
         link.download = "sample.png";
         link.click(); },  [webcamRef, setImgSrc]);


  // Saving an image: 
  const CanvasComponent = () => {
  const canvasRef = useRef(null);

  const drawOnCanvas = () => {
    
  const my_canvas = canvasRef.current;
  const ctx = my_canvas.getContext('2d');

  // Your drawing logic goes here
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  // saving
  //const link = document.createElement('a');
  //link.href =  my_canvas.toDataURL('image/png');
  //link.download = 'canvas-image.png';
  //link.click();

  
  }; 
  // end of saving

  React.useEffect(() => {
    drawOnCanvas();
  }, []);

  return <canvas ref={canvasRef} />;
                                 };
                                 
  // beg
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [localImageURL, setLocalImageURL] = useState(null); // State to store the local image URL

  
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const downloadFile = () => {

         const link = document.createElement("a");
         const content = document.querySelector("textarea").value;
         const file = new Blob([content], { type: 'text/plain' });
         link.href = URL.createObjectURL(file);
         link.download = "sample.txt";
         link.click();
         URL.revokeObjectURL(link.href);
      };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    const formData2 = new FormData();
    formData2.append("file", selectedFile);

    const requestOptions = {
      method: "POST",
      //headers: { 'Content-Type': 'multipart/form-data' }, // DO NOT INCLUDE HEADERS
      body: formData2,
    };
    
  // saving
  const link = document.createElement('a');
  link.href = selectedFile.toDataURL('image/png');
  link.download = 'canvas-image.png';
  link.click();
    //end of saving

    fetch("https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev/uploadfile/", requestOptions)
      .then(response => response.json())
      .then(function(response) {
        console.log("Sent the file from Comp5 to FastAPI");
        
        setIsUploading(false);
        setUploadSuccess(true);

        // Generate a blob URL for the uploaded image
        console.log(typeof selectedFile)
        const blobURL = URL.createObjectURL(selectedFile);
        setLocalImageURL(blobURL);
      })
      .catch(error => {
        console.error("Error uploading file:", error);
        setIsUploading(false);
      });
      
  };


  return (
    <>
     <p> Enter the file content to be saved:- </p>
   <textarea> </textarea>
   <br/>
   
    <div>
      <h1>Drawing Example</h1>
      <CanvasComponent />
    </div>
   
   <button onClick = {downloadFile}> save File </button>
    
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}        
      />   
                  <form  onSubmit={handleSubmit}>
      <button onClick={capture}>Capture photo</button>
                   </form>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </>
  );
};





export default WebCam2;
