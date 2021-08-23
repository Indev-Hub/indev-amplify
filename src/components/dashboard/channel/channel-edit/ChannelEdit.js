import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Grid,
  Tab,
  Tabs,
  Typography
 } from '@material-ui/core';
import ProfilePersonal from './ProfilePersonal';
import ProfileLocation from './ProfileLocation';
import { Button } from '@material-ui/core';
import { createDemographics, updateChannel } from 'src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import useAuth from 'src/hooks/useAuth';
import { getChannel, getUser } from 'src/graphql/queries';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`channel-tabpanel-${index}`}
      aria-labelledby={`channel-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function menuProps(index) {
  return {
    id: `channel-tab-${index}`,
    'aria-controls': `channel-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

function ChannelEdit() {
  const [channelData, setProfileData] = useState({
    id: "",
    name: "",
    manager: "",
    supporters: "",
    description: "",
    category: "",
    operator: "", 
    target: "",
    projects: "",
    featuredImg: ""
  })
  // console.log('profile data:', channelData);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...channelData,
      [e.target.name]: e.target.value
    });
  };

  // Set state for User table
  const [channelData, setChannelData] = useState();

  // Get user attributes
  const { user } = useAuth();
  // console.log('user', user);

  // Load User table data
  useEffect(() => {
    retrieveChannel();
    console.log('user table:', channelData)
  }, [])

  // API call to get User table data
  const retrieveChannel = async () => {
    try {
      const channelData = await API.graphql(graphqlOperation(getChannel, { id: user.id }));
      const channelList = channelData.data.getUser;
      setChannelData(channelList);
      console.log('list', channelList);
    } catch (error) {
      console.log('error on fetching channel table', error);
    }
  };

  async function channelUpdate() {
    try {
      // Did not destructure channelData because it is/will be a very large object

      // Create Channel Inputs
      const UpdateChannelInput = {
        id: channelData.id,
        name: channelData.name,
        manager: channelData.manager,
        supporters: channelData.supporters,
        description: channelData.description,
        category: channelData.category,
        operator: channelData.operator,
        target: channelData.target,
        projects: channelData.projects,
        featuredImg: channelData.featuredImg
      };

      // Update Channel
      const upChannel = await API.graphql(graphqlOperation(updateChannel, { input: UpdateChannelInput }));
      console.log('upChannel:', upChannel)

      console.log('Updated Profile', upChannel.data.updateChannel)
      return upChannel.data.updateChannel;
    } catch (error) {
      console.log('error on channel update:', error);
    }
  }

  const submitButton = () => (
    <Button type="submit" color="secondary" variant="contained" onClick={channelUpdate}>Update Profile</Button>
  );

  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleTabChange} textColor="white" indicatorColor="secondary" aria-label="simple tabs example">
          <Tab label="Personal" {...menuProps(0)} />
          <Tab label="Financial" {...menuProps(1)} />
          <Tab label="Location" {...menuProps(2)} />
        </Tabs>
      </AppBar>          
      <TabPanel value={value} index={0}>
        <ProfilePersonal profileData={profileData} handleProfileChange={handleProfileChange} />
        {/* {console.log('profile data:', profileData)} */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Financial Info goes here
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileLocation profileData={profileData} handleProfileChange={handleProfileChange} />
      </TabPanel>
      <Box align="right" mr={3}>
        <Button type="submit" color="secondary" variant="contained" onClick={channelUpdate}>Update Profile</Button>    
      </Box>
    </div>
  );
}

export default ChannelEdit;
