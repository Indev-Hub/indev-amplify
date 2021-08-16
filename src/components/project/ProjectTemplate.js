import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';

const ProjectTemplate = (props) => {
  const { projectData } = props;
  console.log('projectData:', projectData);
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
      </Grid>
    </Box>
  );
};

ProjectTemplate.propTypes = {
  projectData: PropTypes.string
};

export default ProjectTemplate;
