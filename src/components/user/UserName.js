import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const UserName = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    try {
      setError(null);
      setLoading(true);

      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
        setUsername(user.username);
        console.log(`Load additional settings for user: ${user.username}`);
        // TBD
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
    <div>
      {error ? `Oops... ${error}` : null}
      {loading ? "Loading..." : `Hello ${username}`}
    </div>
  )

};

export default UserName;