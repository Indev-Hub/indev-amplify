/* eslint-disable */
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  // Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../../../graphql/queries';
import {
  updateProject,
} from '../../../../graphql/mutations';
import useAuth from '../../../../hooks/useAuth';
import wait from '../../../../utils/wait';
import ProjectUpdateAdd from '../project-create/ProjectUpdateAdd';
import ProjectEditInfo from './ProjectEditInfo';
import { Add, CameraAlt } from '@material-ui/icons';
import ProjectUpdateList from './ProjectUpdateList';

const offset = 5;

const ProjectEdit_v2 = (props) => {
  const { project, user } = props;
  const [ showUpdate, setShowUpdate ] = useState(false);
  // const { user } = useAuth();
  // const [userInfo, setUserInfo] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // const getUserInfo = async () => {
  //   try {
  //     const userData = await API.graphql(graphqlOperation(queries.getUser, { id: user.id }));
  //     const userList = userData.data.getUser;
  //     setUserInfo(userList);
  //     console.log('list', userList);
  //   } catch (error) {
  //     console.log('error on fetching videos', error);
  //   }
  // };

  const onThumbnailClick = (videoID,titleID) => {
    // "...video" copies all of the video's current attributes, src overwrites the current src url by substituting the videoID
    setVideo({
      ...video,
      src: `https://player.vimeo.com/video/${videoID}?title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=172959`,
      title: `${titleID}`
    });
    heroVidUpdate(videoID);
  }

  const featImg = () => {
    const randomFeat = 'https://source.unsplash.com/weekly?water';
    return randomFeat;
  }

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      {...props}
    >
      <Grid
        item
        sx={{
          backgroundImage: `url(${featImg()})`,
          backgroundSize: 'cover',
          height: 300
        }}
        xs={12}
      >
        <Grid container justifyContent="space-between">
          <Grid
            item
            xs={5}
            zIndex='20'
          >
            <Box
              sx={{
                backgroundColor: 'brand.background1',
                pr: 5,
                py: 2,
                ml: -offset
              }}
            >
              <Box
                sx={{
                  ml: offset
                }}
              >
                <Typography variant="h2" textAlign="right" color="white" fontWeight="700">{project.name}</Typography>   
              </Box>
            </Box>
          </Grid>
          {/* <Grid
            item
            xs={6}
            zIndex="5"
          >
            <Box
              sx={{
                backgroundColor: 'white',
                mt: 8,
                ml: -4,
                p: 4
              }}
            >
              {console.log('update length', project.updates.items.length)}
              {console.log('updates', project.updates)}
              {project.updates.items.length > 0 ? (
                project.updates.items.map((update, index) => (
                  <>
                    <Typography>Update #{index+1}</Typography>
                    <Typography>Name: {update.name}</Typography>
                  </>
                ))
              ) : (
                null
              )}
            </Box>
          </Grid> */}
          <Grid
            item
            xs={3}
            align="right"
            pr={2}
          >
            <Avatar sx={{ backgroundColor: 'brand.primary0' }}><IconButton><CameraAlt sx={{ color: 'brand.primary2' }} /></IconButton></Avatar>
            {/* <Button variant="contained" color="secondary">Change Image</Button>             */}
          </Grid>
          <ProjectEditInfo project={project} user={user} overlap={5} />
          <ProjectUpdateList project={project} user={user} overlap={5} />
          {showUpdate ? (
            <ProjectUpdateAdd project={project} user={user} overlap={5} setShowUpdate={setShowUpdate} />
          ) : (
            <Grid container justifyContent="center" xs={12} mb={10}>
              <Grid item xs={9}>
                <Button fullWidth variant="contained" onClick={() => setShowUpdate(true)} startIcon={<Add />}>Add Update</Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectEdit_v2;

