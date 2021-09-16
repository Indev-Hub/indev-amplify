/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Container,
  Button,
  Card,
  Grid,
  Hidden,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { getChannel, updatesByProject } from '../../graphql/queries';
// import ChannelVideoAsk from './ChannelVideoAsk';
import Gallery from '../gallery/Gallery';
import ProjectTemplateV1 from '../project/ProjectTemplateV1';
import loadingGif from '../assets/loading1.gif';
import { TabPanel } from '@material-ui/lab';
import { updateChannel, updateUser } from 'src/graphql/mutations';
import useAuth from 'src/hooks/useAuth';


// eslint-disable-next-line
function OurTeam() {
  return (
    <Box
      sx={{
        backgroundColor: 'brand.background2',
        pt: 0
      }}
    >
      <Container
        maxWidth="100%"
        sx={{
          alignItems: 'center',
          // display: 'flex',
          flexDirection: 'column',
          px: {
            md: '0px !important'
          }
        }}
      >
      Our Team Content
      </Container>
    </Box>
  );
}

export default OurTeam;
