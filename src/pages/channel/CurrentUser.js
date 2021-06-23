/* eslint-disable */
import React, { Component } from 'react';
import {
  Box,
  Typography
} from '@material-ui/core';
import useAuth from '../../hooks/useAuth';

const CurrentUser = () => {
  const { user } = useAuth();
 
  return (
    <Box
      sx={{
        minHeight: '500px',
        backgroundColor: 'red',
        width: '100%'
      }}
    >
      <Typography>{user.id}</Typography>
      {console.log('user info', [user.id, user.name, user.email])}
    </Box>
  )
}

export default CurrentUser;
