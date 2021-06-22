/* eslint-disable */
import { useState, useEffect } from 'react';

export const fetchGallery = channelId => {
    const [galleryDisplay, setGallery] = useState(null);
    const [channelId, setId] = useState(7868357);
    
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
        <p>Status: {JSON.stringify(galleryDisplay.status, null, 2)}</p>
        <input value={channelId} onChange={e => setId(e.target.value)}/>
        <br/>
        <pre>{JSON.stringify(galleryDisplay, null, 2)}</pre>
        </div>
    );
}