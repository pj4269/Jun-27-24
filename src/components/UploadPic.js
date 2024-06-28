import  { useState } from 'react';

const UploadPicture = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };



const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        // Construct the fetch request
        const requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data' - Let the browser set the correct content type automatically
            }
        };

        // Send the file to AWS Lambda via an HTTP POST request
        //const response = await fetch('http://0.0.0.0:8000/uploadfile/', requestOptions);
        
        const response = await fetch('https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev/uploadfile/', requestOptions);        
       
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Upload successful:', responseData);
        // Handle success
    } catch (error) {
        console.error('Error uploading file:', error);
        // Handle error
    }
};

/*       try {
            // Send the file to AWS Lambda via an HTTP POST request

            const response = await axios.post('YOUR_LAMBDA_API_ENDPOINT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });   */


    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Picture</button>
        </div>
    );
};

export default UploadPicture;

