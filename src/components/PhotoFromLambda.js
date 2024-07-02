import React, { useState, useEffect } from 'react';

const PhotoDisplay = () => {
    const [photoUrl, setPhotoUrl] = useState('');

    // Assume you fetch photoData from your API
    useEffect(() => {
        fetchPhoto(); // Function to fetch photoData
    }, []);

    const fetchPhoto = async () => {
        try {
            const response = await fetch("https://g9qdesewp6.execute-api.us-west-2.amazonaws.com/dev/uploadfile/");
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPhotoUrl(url);
        } catch (error) {
            console.error('Error fetching photo in PhotoDisplay:', error);
        }
    };

    return (
        <div>
            {photoUrl && (
                <img
                    src={photoUrl}
                    alt="Uploaded Photo"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            )}
        </div>
    );
};

export default PhotoDisplay;

