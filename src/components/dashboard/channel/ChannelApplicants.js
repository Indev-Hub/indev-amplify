import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ChannelApplicantCard from './ChannelApplicantCard';

const ChannelApplicants = (props) => {
  const { applicants, ...other } = props;

  return (
    <Grid
      container
      spacing={3}
      {...other}
    >
      {applicants.map((applicant) => (
        <Grid
          item
          key={applicant.id}
          lg={4}
          xs={12}
        >
          <ChannelApplicantCard
            avatar={applicant.avatar}
            cover={applicant.cover}
            name={applicant.name}
            skills={applicant.skills}
          />
        </Grid>
      ))}
    </Grid>
  );
};

ChannelApplicants.propTypes = {
  applicants: PropTypes.array.isRequired
};

export default ChannelApplicants;
