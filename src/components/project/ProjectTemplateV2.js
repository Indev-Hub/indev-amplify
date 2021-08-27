import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { updatesByProject } from '../../graphql/queries';

const ProjectTemplateV2 = (props) => {
  const { projectData } = props;
  // console.log('projectData:', projectData);
  const [updates, setUpdates] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line
    getUpdatedInfo();
  }, []);

  const getUpdatedInfo = async () => {
    try {
      const updateData = await API.graphql(graphqlOperation(updatesByProject, { projectID: projectData.id }));
      const updateList = updateData.data.UpdatesByProject.items;
      setUpdates(updateList);
      setIsLoading(false);
      console.log('update list', projectData.name, updateList);
    } catch (error) {
      console.log('error on fetching updates', error);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography>
            {projectData.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {projectData.category}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {projectData.devStage}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {projectData.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* {updates.map(update => (
            <Typography>{update}</Typography>
          ))} */}
          {isLoading === false ? (
            updates.map((update) => (
              <Typography>{update.name}</Typography>
            ))
          ) : (
            <Typography>Finding Updates</Typography>
          )}
          {/* {console.log(updates)} */}
        </Grid>
      </Grid>
    </Box>
  );
};

ProjectTemplateV2.propTypes = {
  projectData: PropTypes.string
};

export default ProjectTemplateV2;
