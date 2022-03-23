/* eslint-disable */
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSnackbar } from 'notistack';
import { Box, Breadcrumbs, Link, Typography } from '@material-ui/core';
import { VideoLibraryColumn } from '../../components/dashboard/videos';
import ChevronRightIcon from '../../icons/ChevronRight';
import gtm from '../../lib/gtm';
import { getBoard, moveCard } from '../../slices/kanban';
import { useDispatch, useSelector } from '../../store';
import ShowcaseLibrary from 'src/components/video/ShowcaseLibrary';
import Showcase from './Showcase';
import SingleVideo from 'src/components/channel/SingleVideoTemplate';

const SingleVideoPage = () => {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.kanban);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getBoard());
  }, []);

  const handleDragEnd = async ({ source, destination, draggableId }) => {
    try {
      // Dropped outside the column
      if (!destination) {
        return;
      }

      // Card has not been moved
      if (source.droppableId === destination.droppableId
        && source.index === destination.index) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        // Moved to the same column on different position
        await dispatch(moveCard(draggableId, destination.index));
      } else {
        // Moved to another column
        await dispatch(moveCard(draggableId, destination.index, destination.droppableId));
      }

      enqueueSnackbar('Video order updated', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard: VideoLibrary | Indev</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingBottom: 4
          // overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            VideoLibrary
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightIcon fontSize="small" />}
            sx={{ mt: 1 }}
          >
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/dashboard"
              variant="subtitle2"
            >
              Dashboard
            </Link>
            <Typography
              color="textSecondary"
              variant="subtitle2"
            >
              VideoLibrary
            </Typography>
          </Breadcrumbs>
        </Box>
        {/* <ShowcaseLibrary /> */}
        <SingleVideo />
      </Box>
    </>
  );
};

export default SingleVideoPage;
