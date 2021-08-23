import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography
} from '@material-ui/core';

const ProjectEdit = (props) => {
  const { project } = props;
  return (
    <>
      <Grid container>
        <Grid item>
          <Typography>{project.name}</Typography>
        </Grid>

      </Grid>
    </>
  );
};

ProjectEdit.propTypes = {
  project: PropTypes.any
};

export default ProjectEdit;
