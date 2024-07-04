import React, { useState, useEffect } from 'react';

const FileViewer = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchFileFromLambda = async () => {
            try {
                const response = await fetch('https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev/uploadfile/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Adjust content type if needed
                    },
                    body: JSON.stringify({}), // Adjust body if your Lambda expects data
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                const base64Data = data.body;
                const imageUrl = `data:image/webp;base64,${base64Data}`;
                setImageUrl(imageUrl);
            } catch (error) {
                console.error('Error fetching file:', error);
            }
        };

        fetchFileFromLambda();
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    return (
        <div>
            {imageUrl ? (
                <div>
                    <h2>File from Lambda</h2>
                    <img src={imageUrl} alt="File from Lambda" style={{ maxWidth: '100%' }} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FileViewer;

