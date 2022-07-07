/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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
import { API, graphqlOperation } from 'aws-amplify';
import { getShowcase } from 'src/graphql/queries';


const SingleVideoPage = ( props ) => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params", params);
  const { columns } = useSelector((state) => state.kanban);
  const { enqueueSnackbar } = useSnackbar();
  const [showcaseID, setShowcaseID] = useState(7868357); 
  const fetchVideos = async()=>{
     const videoData = await API.graphql(graphqlOperation(getShowcase, { id: showcaseID }));
    const videoLibrary = JSON.parse(videoData.data.getShowcase.videos);
    console.log("props: ", props);
 };
 
  useEffect(() => {
    gtm.push({ event: 'page_view' });
    fetchVideos(); 
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
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightIcon fontSize="small" />}
            sx={{ mt: 1 }}
          >
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/dashboard/video-library"
              variant="subtitle2"
            >
              Video Channel 
            </Link>
          </Breadcrumbs>
        </Box>
        <SingleVideo />
      </Box>
    </>
  );
};

export default SingleVideoPage;
