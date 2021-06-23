/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const UserID = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    try {
      setError(null);
      setLoading(true);

      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
		setUserId(user.signInUserSession.accessToken.payload.sub);
        // console.log(`Load additional settings for ID: ${userId}`);
		// console.log('user', Auth.currentAuthenticatedUser());
      }).catch(err => setError(err));
    }
    catch (e) {
      setError(e);
    }
    finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {userId}
    </>
  )

};

export default UserID;