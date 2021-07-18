/* eslint-disable */
import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { getShowcase } from 'src/graphql/queries';
import { Close, Edit, Publish, Undo } from '@material-ui/icons';
import { updateShowcase } from '../../graphql/mutations';
import wait from 'src/utils/wait';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 0,

  // change background colour if dragging
  background: isDragging ? '#27AAE166' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#27AAE133' : '#ddd',
  // padding: grid,
  // width: '50%',
  position: 'relative'
});

const getThumbnailStyle = {
  // margin: '10px',
  // maxWidth: '100%'
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const queryAttr = 'data-rbd-drag-handle-draggable-id';

const Showcase = props => {
  const [placeholderProps, setPlaceholderProps] = useState({});

  // START CODE from ShowcaseLibrary //
  const [showcaseData, setShowcaseData] = useState({});
  const [showcaseID, setShowcaseID] = useState(7868357)
  const [videos, setVideos] = useState([]);
  const [orderCache, setOrderCache] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, [])

  const fetchVideos = async () => {
    try {
      const videoData = await API.graphql(graphqlOperation(getShowcase, { id: showcaseID }));
      const videoLibrary = JSON.parse(videoData.data.getShowcase.videos);
      setShowcaseData(videoData);
      setVideos(videoLibrary);

      console.log('videoLibrary:', videoLibrary);
      console.log('showcaseData before update:', showcaseData);

      //populates the ordercache on first render, according to the order in the database. Does not save when application is restarted. - Woo Jin
      if(orderCache.length == 0){
        setOrderCache([videoLibrary]);
      }

      // console.log('order cache 0', orderCache);

      // console.log('order list ', orderOptions());
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  }

  // Get video duration in hours:minutes:seconds
  const formatTime = (time) => {
    // Hours, minutes and seconds
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    return `${hrs}:${mins}:${secs}`
  }

  // Currently updates showcase information in database and adds order to orderCache. Might want to split functionalities. Or at least make a condition if the order is the same as the last saved order - Woo Jin
  const saveShowcaseChanges = async () => {

    const data = showcaseData.data.getShowcase;
		const updatedShowcase = {
      
			id: data.id,
			title: data.title,
			manager: data.manager,
			managerID: data.managerID,
			videos: JSON.stringify(videos)
		 };

		console.log('showcaseData before update:', showcaseData);
    console.log('showcaseData videos before update:', showcaseData.data.getShowcase.videos);
    console.log('updatedShowcase before update:', updatedShowcase);

    //updates data in database on save - Woo Jin
		await API.graphql(graphqlOperation(updateShowcase, { 
      input: updatedShowcase
    }));
    console.log('showcase videos after update:', videos);
    console.log('order cache 1', orderCache);

    //updates OrderCache on save. - Woo Jin
    setOrderCache([videos].concat(orderCache));
    console.log('order cache 2', orderCache);
	}

  // undoes any unsaved re-ordering changes made on button click - Woo Jin
  const undoChanges = async () => {
    setVideos(JSON.parse(showcaseData.videos));
  }

  // END CODE from ShowcaseLibrary //

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setPlaceholderProps({})
    setVideos(videos => reorder(videos, result.source.index, result.destination.index));
    console.log('updated array order;', videos)
  };

  const onDragUpdate = update => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
      .slice(0, destinationIndex)
      .reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
    });
  };

  // Show/Hide Edit functionality for each video
  const [videoEdit, setVideoEdit] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const showVideoEdit = (index) => {
    setVideoEdit(true);
    setCurrentVideo(index);
  }
  const hideVideoEdit = () => {
    setVideoEdit(false);
  }

  // useEffect(() => {
  //   videoEdit === true ? false : true
  //   console.log('from useEffect', videoEdit);
  // }, [switchVideoEdit])




  // populates dropdown list as orderCache is updated. Currently does not work. - Woo Jin
  // const orderOptions = () => {
    
  //   // orderCache.forEach((order, index) => {
  //     //   { label: index, value: order }
  //     // }); 
      
  //     const orderList = orderCache.map(order => { return { label: index, value: order }});
  //     console.log('order list ', orderList);
  //     return orderList;
  // }
  
  // changes the displayed Library to the Order you've selected from the dropdown. Currently does not work - Woo Jin

  const changeOrder = (selectedOrder) => {
    setVideos(JSON.parse(selectedOrder));
    setSelectedOrder([]);
  }
      
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <Grid container m="auto" xs={10}>
      {/* save button */}
      <Grid item xs={12} position="fixed" sx={{ top: '10%', right: '10%' }} zIndex="1000">
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={saveShowcaseChanges}>
            <Typography>Save video order</Typography>
            <Publish
              color="#fff"
              sx={{
                ml: 1
              }}
            />
          </Button>

          {/* undo button -- needs orderOptions to work */}
          {/* <IconButton onClick={undoChanges}>
            <Undo
              color="primary" />
          </IconButton> */}
        </Box>
      </Grid>
      <Grid item xs={4} m={2}>
        <Card sx={{ p: 2 }}>
          <Typography>Options to update video title and description will go here. Also need to fix the position of this card so that it is visible when user scrolls down the video list</Typography>
          <Box marginTop={2}>
            <TextField
              label="Video Name"
              fullWidth
            />
          </Box>
          <Box marginTop={1}>
            <TextField
              // error={Boolean(touched.channel_title && errors.channel_title)}
              // helperText={touched.channel_title && errors.channel_title}
              fullWidth
              label="Channel Description"
              name="description"
              multiline="true"
              maxRows="2"
              // onBlur={handleBlur}
              // onChange={handleChange}
              // value={data.description}
              // variant="outlined"
            />
          </Box>
        </Card>

      </Grid>

      {/* Dropdown order cache list. Currently doesn't function properly */}
      {/* <select options={orderOptions()} /> */}
      <Grid item display="column" xs>
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Card
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {videos.map((item, index) => (

                  <Draggable key={item.uri} draggableId={item.uri} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        sx={{
                          m:1
                        }}
                      >
                        {/* <Card> */}
                          <Grid container>
                            <Grid item xs={3}>
                              <img style={getThumbnailStyle} src={item.pictures.sizes[8].link} />
                            </Grid>
                            <Grid item xs={8} p={2}>
                              <Typography fontWeight="600">{index + 1}. {item.name}</Typography>
                              <Typography fontWeight="400">{formatTime(item.duration)}</Typography>
                              <Typography fontStyle="italic" fontWeight="400">{item.description ? item.description : 'no description has been added yet'}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              { videoEdit === false ?
                                (  
                                  <IconButton
                                    onClick={showVideoEdit}
                                  >
                                    <Edit />
                                  </IconButton>
                                ) : null
                              }
                            </Grid>
                            <Grid item xs={12}>
                              { videoEdit === true ?
                                (
                                  <Box p={2}>
                                    <Box marginTop={0}>
                                      <TextField
                                        label="Video Name"
                                        fullWidth
                                        value={item.name}
                                      />
                                    </Box>
                                    <Box marginTop={1}>
                                      <TextField
                                        // error={Boolean(touched.channel_title && errors.channel_title)}
                                        // helperText={touched.channel_title && errors.channel_title}
                                        fullWidth
                                        label="Channel Description"
                                        name="description"
                                        multiline="true"
                                        maxRows="2"
                                        // onBlur={handleBlur}
                                        // onChange={handleChange}
                                        value={item.description}
                                        // variant="outlined"
                                      />
                                    </Box>
                                    <Box mt={2} display="flex" justifyContent="space-between">
                                      <Button variant="contained" sx={{ backgroundColor: 'black'}} onClick={hideVideoEdit}>Cancel</Button>
                                      <Button variant="contained" onClick={hideVideoEdit}>Update Video</Button>
                                    </Box>
                                  </Box>
                                ) : null
                              }
                            </Grid>
                            {/* <Grid item xs={12}>
                              {
                                switchVideoEdit === index ? (
                                  <Typography>Test Succes</Typography>
                                ) : <Typography>Test Failure</Typography>
                              }
                            </Grid> */}
                          </Grid>
                        {/* </Card> */}
                      </Card>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
                {/* <CustomPlaceholder snapshot={snapshot} />  */}
                <Card style={{
                  position: 'absolute',
                  top: placeholderProps.clientY+grid,
                  left: placeholderProps.clientX=grid,
                  height: placeholderProps.clientHeight,
                  background: '#EC008C',
                  width: placeholderProps.clientWidth
                }} />
              </Card>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
};

export default Showcase;