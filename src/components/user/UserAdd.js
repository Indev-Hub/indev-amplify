/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { createShowcase } from '../../graphql/mutations';
import Amplify, { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import {

	IconButton,
	TextField,
	Box,
    Button
} from '@material-ui/core';
import { Publish } from '@material-ui/icons';

const UserAdd = ({ onUpload }) => {
    const [data, setData] = useState([]);
    const [showcaseID, setShowcaseID] = useState(7868357);
    console.log('showcaseID:', showcaseID)

    const loadData = async () => {
        console.log('fire showcase ID:', showcaseID)
        const user = await Auth.currentAuthenticatedUser();
        setData(user);
        // await fetch(`https://api.vimeo.com/me/albums/${showcaseID}/videos`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer 2d5b1461e957305ffc81def0383fe3a0' } })
        //     .then(response => response.json())
        //     .then(data => setData(data.data));
        //     console.log('response', data)
    }

    const uploadUser = async () => {
        //Get user attributes
        const { signInUserSession } = await Auth.currentAuthenticatedUser();
        const userName = signInUserSession.accessToken.payload.username;
        const userId = signInUserSession.accessToken.payload.sub

        console.log('user name', userName);
        console.log('user id', userId);

        const createShowcaseInput = {
            id: showcaseID,
            title: `${userName}'s Showcase`,
            manager: userName,
            managerID: userId,
            videos: JSON.stringify(data)
        };

        console.log('Showcase Input:', createShowcaseInput)
        await API.graphql(graphqlOperation(createShowcase, { input: createShowcaseInput }));
        // onUpload();
    };

    return (
		<Box>
            <TextField
                label="Showcase ID"
                onChange={e => setShowcaseID(e.target.value)}
            />
            <Button
                onClick={loadData}
            >
                Load Data
            </Button>
            <IconButton onClick={uploadUser}>
                <Publish />
            </IconButton>
        </Box>
    );
};

export default UserAdd;
