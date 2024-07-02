import React, { useRef, useState, useEffect } from 'react';

function Photo_capture_from_scratch2() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [photoSrc, setPhotoSrc] = useState(null); // State to hold the received photo

  useEffect(() => {
    // Access the webcam and set the video stream to the video element
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });

    return () => {
      // Clean up: Stop video stream when component unmounts
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        }
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleTakePicture = async () => {
    if (!videoRef.current) return;

    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, height);
    canvasRef.current.toBlob(async (blob) => {
      const file = new File([blob], "photo_from_react.png", { type: "image/png", lastModified: new Date() });
      await handleSubmit(file);
    }, 'image/png', 1);
  };

const handleSubmit = async (capturedFile) => {
  const formData = new FormData();
  formData.append("file", capturedFile);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    let attempts = 3;
    let response;

    do {
      response = await fetch("https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev/uploadfile/", requestOptions);
      attempts--;
    } while (!response.ok && attempts > 0);

    if (!response.ok) {
      throw new Error('Error uploading file');
    }

    const data = await response.blob();
    const imageUrl = URL.createObjectURL(data); // Create URL for the received photo
    setPhotoSrc(imageUrl); // Set state with the received photo URL
    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};


  const handleCanPlay = () => {
    if (!videoRef.current) return;
    const height = videoRef.current.videoHeight / (videoRef.current.videoWidth / 320);
    setHeight(height);
    videoRef.current.setAttribute('width', 320);
    videoRef.current.setAttribute('height', height);
    canvasRef.current.setAttribute('width', 320);
    canvasRef.current.setAttribute('height', height);
  };

  return (
    <div className="contentarea">
      <h1>Photo Capturing using React</h1>
      <div className="camera">
        <video ref={videoRef} id="video" onCanPlay={handleCanPlay}>
          Video stream not available.
        </video>
        <button onClick={handleTakePicture}>Take photo</button>
      </div>

      <canvas ref={canvasRef} id="canvas" style={{ display: 'none' }} />

      {/* Display the received photo if available */}
      {photoSrc && (
        <div className="photo-display">
          <h2>Received Photo</h2>
          <img src={photoSrc} alt="Received from Lambda" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default Photo_capture_from_scratch2;

