/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { createShowcase } from '../../graphql/mutations';
// import { v4 as uuid } from 'uuid';
import Amplify, { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import {
	// Card,
	// CardHeader,
	// CardContent,
	IconButton,
	TextField,
	Box,
    Button
} from '@material-ui/core';
import { uniqueId } from 'lodash';
import { Publish } from '@material-ui/icons';
// import FileDropzone from './FileDropzone';

const ShowcaseAdd = ({ onUpload }) => {
    const [showcaseData, setShowcaseData] = useState({});
    const [formatData, setformatData] = useState();
    const [data, setData] = useState([]);
    const [showcaseID, setShowcaseID] = useState(7868357);
    console.log('showcaseID:', showcaseID)

    const loadData = async () => {
        console.log('fire showcase ID:', showcaseID)
        await fetch(`https://api.vimeo.com/me/albums/${showcaseID}/videos`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer 2d5b1461e957305ffc81def0383fe3a0' } })
            .then(response => response.json())
            .then(data => setData(data.data));
            console.log('response', data)
    }

    const uploadShowcase = async () => {
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
            <IconButton onClick={uploadShowcase}>
                <Publish />
            </IconButton>
        </Box>
    );
};

export default ShowcaseAdd;
