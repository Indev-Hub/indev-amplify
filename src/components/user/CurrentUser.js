/* eslint-disable */
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';

export async function updateUser(props) {
  const { name, family_name, display_name } = props;
  const user = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    'name': 'Jerry',
    'family_name': 'Garcia'
  })
};

export function getUser(props) {
  // const { sub, username } = props;
  useEffect(() => {
		fetchUser();
	}, [])

  const fetchUser = async () => {
		try {
      const user = await Auth.currentAuthenticatedUser();
      // console.log(user.attributes);
      return user.attributes.sub;
		} catch (error) {
			console.log('error on fetching videos', error);
		}
	}
};
