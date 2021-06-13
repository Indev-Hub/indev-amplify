/* eslint-disable */
import React from 'react';
import { Auth } from 'aws-amplify';

async function UserId() {
	return (
		await Auth.currentAuthenticatedUser({
			bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
		}).then(user => console.log(user))
		.catch(err => console.log(err))
	)
}

export default UserId

