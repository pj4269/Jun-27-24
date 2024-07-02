import React, { useState } from 'react';

const UploadPicture2 = () => {
  const [imageData, setImageData] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const handleUpload = async () => {
    if (!photoFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append("photo", photoFile);
    
    const requestOptions = { method: "POST",
                             body: formData,  };
    try {
      const response = await fetch("https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev/uploadfile/", requestOptions);  
      const response2 = await fetch('https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev/uploadfile/');  // Replace with your endpoint      
      const blob = await response2.blob();
      const url = URL.createObjectURL(blob);
      console.log(response2)
      setImageData(url);    
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Photo</button>
      {imageData && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={imageData} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default UploadPicture2;

