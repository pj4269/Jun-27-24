import React, { useState, useEffect, useRef } from 'react';

function Photo_capture_from_scratch() {
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const photoRef = useRef(null);
  const [height, setHeight] = useState(0);


  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
  
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    videoRef.current.srcObject = stream;
    // Apr 13, 24: Play() error:  By adding the oncanplay event listener, you ensure that playback is initiated only after the browser has loaded enough data to 
    // start playing the video. This should resolve the interruption error you're encountering.
    videoRef.current.oncanplay = () => {
       videoRef.current.play();
    };
  })
  .catch(err => console.error("An error occurred: " + err));
  
  }, []);
  
  
  /*
  const handleTakePicture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, height);
    photoRef.current.src = canvasRef.current.toDataURL('image/png');
  };  */
  
  // Apr 13, 24: OK this works!
  const handleTakePicture = async () => {
  const context = canvasRef.current.getContext('2d');
  context.drawImage(videoRef.current, 0, 0, 320, height);
  // photoRef = responsible for Screenshot being captured to appear in a box on React frontpage!
  photoRef.current.src = canvasRef.current.toDataURL('image/png');
  // Convert the canvas image to a Blob (binary large object)
  canvasRef.current.toBlob(async (blob) => {
    // Create a File object from the Blob
    const file = new File([blob], "photo_from_react.webp", { type: "image/webp", lastModified: new Date() });
    
    // Call handleSubmit, passing the captured image as a File object
    await handleSubmit(file);
      // webp is sending file much faster than PNG!
  }, 'image/webp', 1); //reducing quality to improve transfer speed
};



  const [IsUploading, setIsUploading] = useState(false);
  const [UploadSuccess, setUploadSuccess] = useState(false);


  // New function to send the picture over API
  const handleSubmit = async (capturedFile) => {
  setIsUploading(true);

  const formData2 = new FormData();
  
  // For caching: 
  const timestamp = Date.now();
  formData2.append("file", capturedFile, `${timestamp}_${capturedFile.name}`);  
  //formData2.append("file", capturedFile, capturedFile.name);
  console.log( "Hi ", formData2 )
  const requestOptions = {
    method: "POST",
    body: formData2,
  };

  try {
    const response = await fetch("http://0.0.0.0:8000/uploadfile/", requestOptions);
    const responseData = await response.json(); // if you expect a JSON response

    setUploadSuccess(true);
    
    const response2 = await fetch('http://localhost:8000/uploadfile2/');  // Replace with your endpoint      
      
    const blob = await response2.blob();
    const url = URL.createObjectURL(blob);
    setImageUrl(url);    
    
     
     /*
    fetch('http://localhost:8000/uploadfile2/').then(response2 => response2.blob()).then(blob => {
        const imageUrl2 = URL.createObjectURL(blob);
        setImageUrl(imageUrl2) } ) 
      */
 
        

    /*

        if (response.ok) {
            // Receive the file back from FastAPI
            const receivedFile = await fetch('http://0.0.0.0:8000/downloadfile/' + formData2.name); // Assuming endpoint provides file by name
            // Process received file, e.g., display a download link or display the image
        } else {
            // Handle errors
        }
     
   */    
    
    
    /*
    
    const MyImage = () => {
  const [timestamp, setTimestamp] = React.useState(Date.now());

  const refreshImage = () => {
    setTimestamp(Date.now());
  };

  return (
    <div>
      <img src={`http://localhost:8000/example/image.png?t=${timestamp}`} alt="My Image" />
      <button onClick={refreshImage}>Refresh Image</button> 
    </div>
  );
}; */
    
    
    
    
    
    
    
  } catch (error) {
    console.error("Error uploading file:", error);
  } finally {
    setIsUploading(false);
  }
};

 //



  const handleDownload = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'webcam_photo.png';
    link.click();
  };

  const handleLogConsole = () => {
    console.log(typeof videoRef.current); 
  };

  const handleClearPhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    photoRef.current.src = '';
  };

// Handles Video Streaming!
  const handleCanPlay = () => {
    if (!streaming) {
      const height = videoRef.current.videoHeight / (videoRef.current.videoWidth / 320);
      //new
      setHeight(height);
      
      videoRef.current.setAttribute('width', 320);
      videoRef.current.setAttribute('height', height);
      canvasRef.current.setAttribute('width', 320);
      canvasRef.current.setAttribute('height', height);
      setStreaming(true);
    }
  };
// Make sure Video plays without error
const handleCanPlayThrough = () => {
  videoRef.current.play()
    .then(() => {
      console.log('Video playback started successfully'); 
    })
    .catch(error => {
      console.error('Error playing video:', error); 
    });
};







  return (
    <div className="contentarea">
      <h1>Photo Capturing using React</h1>
      <div className="camera">
        <video ref={videoRef} id="video" onCanPlayThrough={handleCanPlay} >//  onCanPlay={handleCanPlayThrough} >
        
          Video stream not available.
        </video>
        

    <div>  sending a pic from fastApi. This photo needs to be processed!  => 
      {imageUrl ? (
        <img src={imageUrl} alt="Image from FastAPI" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>        
        
        
        
      </div>
      <div>
        <button onClick={handleTakePicture}>Take photo</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      <canvas ref={canvasRef} id="canvas" style={{ display: 'none' }} /> 
      <div className="output">
        <img ref={photoRef} id="photo" alt="The screen capture will appear in this box." />
      </div>
      <button onClick={handleClearPhoto}>Clear Photo</button>
      <button onClick={handleLogConsole}>View Console</button>
    </div>
  );
}

export default Photo_capture_from_scratch;
