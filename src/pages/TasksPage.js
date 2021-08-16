/* eslint-disable */
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box
  // Container,
  // Grid,
  // Switch,
  // Typography,
  // Badge,
  // Skeleton,
  // Hidden,
  // Card
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { TaskList } from 'src/components/tasks';
import gtm from '../lib/gtm';

const TasksPage = () => {
  const theme = useTheme();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Pricing | Indev</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          pb: 6
        }}
      >
        <TaskList />
      </Box>
    </>
  );
};

export default TasksPage;
