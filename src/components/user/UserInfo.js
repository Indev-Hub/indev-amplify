/* eslint-disable */
import { TextField } from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import * as queries from 'src/graphql/queries';
import {
  getUser
} from 'src/graphql/queries';
import useAuth from 'src/hooks/useAuth';

function UserInfo() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  console.log('user', user.id);

  useEffect(() => {
      getUserInfo();
    }, [])

  const getUserInfo = async () => {  
    try {
      const userData = await API.graphql(graphqlOperation(queries.getUser, { id: '5db18a01-deb2-46c4-bf53-624300b67ae1' }));
      const userList = userData.data.getUser;
      setUserInfo(userList);
      
      console.log('list', userList);
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  } 

  return (
    <div>
      <TextField
        label="text"
        // value={e.value}
      />
    </div>
  )
}

export default UserInfo;
