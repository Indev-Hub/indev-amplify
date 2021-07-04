/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from 'src/graphql/queries';
import {
  getUser
} from 'src/graphql/queries';
import useAuth from 'src/hooks/useAuth';

function UserInfo() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  // console.log('user', user.id);

  useEffect(() => {
      getUserInfo();
    }, [])

  const getUserInfo = async () => {  
    try {
      const userData = await API.graphql(graphqlOperation(queries.getUser, { id: user.id }));
      const userList = userData.data.getUser;
      setUserInfo(userList);
      
      // console.log('list', userList);
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  } 

  return (
    <div>

    </div>
  )
}

export default UserInfo;
