/* eslint-disable */
import { Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'

function Gallery() {
    const [galleryDisplay, setGallery] = useState([]);
    const [channelId, setId] = useState(7868357);
    
    const galleryString = () => {
        return JSON.stringify(galleryDisplay, ['data', 'uri', 'name', 'type'], 1 )
    }

    const stringStringify = galleryString();

    useEffect(() => {
        if (channelId == null || channelId === '') {
        return;
        }
        
        fetch(`https://api.vimeo.com/me/albums/${channelId}/videos`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: 'Bearer 2d5b1461e957305ffc81def0383fe3a0'}})
        .then(results => results.json())
        .then(data => {
            setGallery(data);
        });
    }, [channelId]); // useEffect will trigger whenever id is different.
    
    return (
        <div>
        <p>Status: </p>
        <input value={channelId} onChange={e => setId(e.target.value)}/>
        <br/>

        <pre>{stringStringify}</pre>
        
        </div>
    );
    }

export default Gallery;
