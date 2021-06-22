import { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { formatDistanceToNowStrict } from 'date-fns';
import { Box, Button, Container, Divider, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {
  // ProjectActivities,
  // ProjectApplicants,
  ProjectApplicationModal
  // ProjectOverview
  // ProjectReviews
} from '../../components/dashboard/project';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
import CalendarIcon from '../../icons/Calendar';
import CheckIcon from '../../icons/Check';
import ExclamationIcon from '../../icons/Exclamation';
import ShareIcon from '../../icons/Share';
import gtm from '../../lib/gtm';
import axios from '../../lib/axios';
import {
  ChannelActivities,
  ChannelApplicants,
  ChannelOverview
} from '../../components/dashboard/channel';

const tabs = [
  { label: 'Overview', value: 'overview' },
  // { label: 'Reviews', value: 'reviews' },
  { label: 'Activity', value: 'activity' },
  { label: 'Members', value: 'members' }
];

const ChannelDetails = () => {
  const isMountedRef = useIsMountedRef();
  const { settings } = useSettings();
  const [currentTab, setCurrentTab] = useState('overview');
  const [project, setProject] = useState(null);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProject = useCallback(async () => {
    try {
      const response = await axios.get('/api/projects/projects/3');

      if (isMountedRef.current) {
        setProject(response.data.project);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const handleApplyModalOpen = () => {
    setIsApplicationOpen(true);
  };

  const handleApplyModalClose = () => {
    setIsApplicationOpen(false);
  };

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard: Channel Details | Indev</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                {project.title}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  color: 'text.secondary',
                  display: 'flex',
                  flexWrap: 'wrap',
                  mb: -2,
                  mx: -2
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2
                  }}
                >
                  {project.isActive ? <CheckIcon fontSize="small" />
                    : <ExclamationIcon fontSize="small" />}
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {project.isActive ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: 2
                  }}
                >
                  <CalendarIcon fontSize="small" />
                  <Typography
                    color="inherit"
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {`Deadline in ${formatDistanceToNowStrict(project.endDate)}`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<ShareIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="text"
                >
                  Share
                </Button>
                <Button
                  color="primary"
                  onClick={handleApplyModalOpen}
                  startIcon={<SendIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Apply for a role
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'overview'
            && <ChannelOverview channel={project} />}
            {/* {currentTab === 'reviews'
            && <ProjectReviews reviews={project.reviews} />} */}
            {currentTab === 'activity'
            && <ChannelActivities activities={project.activities} />}
            {currentTab === 'members'
            && <ChannelApplicants applicants={project.applicants} />}
          </Box>
        </Container>
      </Box>
      <ProjectApplicationModal
        authorAvatar={project.author.avatar}
        authorName={project.author.name}
        onApply={handleApplyModalClose}
        onClose={handleApplyModalClose}
        open={isApplicationOpen}
      />
    </>
  );
};

export default ChannelDetails;
