import PropTypes from 'prop-types';
import { isSameDay } from 'date-fns';
import { Box, Typography } from '@material-ui/core';
import ChannelActivity from './ChannelActivity';

const ChannelActivities = (props) => {
  const { activities, ...other } = props;
  const todayItems = [];
  const lastWeekItems = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const activity of activities) {
    if (isSameDay(activity.createdAt, new Date())) {
      todayItems.push(activity);
    } else {
      lastWeekItems.push(activity);
    }
  }

  return (
    <div {...other}>
      <Typography
        color="textPrimary"
        variant="h6"
      >
        Today
      </Typography>
      <Box sx={{ mt: 3 }}>
        {todayItems.map((activity) => (
          <ChannelActivity
            createdAt={activity.createdAt}
            description={activity.description}
            key={activity.id}
            subject={activity.subject}
            type={activity.type}
          />
        ))}
      </Box>
      <Typography
        color="textPrimary"
        sx={{ mt: 3 }}
        variant="h6"
      >
        Last week
      </Typography>
      <Box sx={{ mt: 3 }}>
        {lastWeekItems.map((activity) => (
          <ChannelActivity
            createdAt={activity.createdAt}
            description={activity.description}
            key={activity.id}
            subject={activity.subject}
            type={activity.type}
          />
        ))}
      </Box>
    </div>
  );
};

ChannelActivities.propTypes = {
  activities: PropTypes.array.isRequired
};

export default ChannelActivities;
