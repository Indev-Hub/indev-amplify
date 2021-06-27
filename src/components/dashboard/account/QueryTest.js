/* eslint-disable */
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../../graphql/queries';
import useAuth from 'src/hooks/useAuth';

const QueryTest = async () => {
  const { user } = useAuth();
  console.log('user id:', user.attributes.sub);
  console.log('username:', user.attributes.username);

  const data = await API.graphql(graphqlOperation(getUser, { id: "f45e9ebb-55d7-45c3-9ed6-d82d86e7de51" }))
  console.log('blog successfully fetched', data)
  
  return data;
}

export default QueryTest

