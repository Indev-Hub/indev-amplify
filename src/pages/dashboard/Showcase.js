/* eslint-disable */
import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import { getShowcase } from 'src/graphql/queries';
import { Publish, Undo } from '@material-ui/icons';
import { updateShowcase } from '../../graphql/mutations';

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
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  // padding: grid,
  width: '50%',
  position: 'relative'
});

const getThumbnailStyle = {
  // margin: '10px',
  // maxWidth: '100%'
  width: '100%'
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

      console.log('order cache 0', orderCache);

      console.log('order list ', orderOptions());
    } catch (error) {
      console.log('error on fetching videos', error);
    }
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
    <Grid container display="column" m="auto" xs={8}>
      {/* save button */}
      <IconButton onClick={saveShowcaseChanges}>
        <Typography>Save video order</Typography>
        <Publish
          color="primary"
          sx={{
            ml: 1
          }}
        />
      </IconButton>

      {/* undo button */}
      <IconButton onClick={undoChanges}>
        <Undo
          color="primary" />
      </IconButton>


      {/* Dropdown order cache list. Currently doesn't function properly */}
      {/* <select options={orderOptions()} /> */}

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
                          <Grid item xs={4}>
                            <img style={getThumbnailStyle} src={item.pictures.sizes[8].link} />
                          </Grid>
                          <Grid item xs={8} p={2}>
                            <Typography>{index + 1}. {item.name}</Typography>
                          </Grid>
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
                top: placeholderProps.clientY,
                left: placeholderProps.clientX,
                height: placeholderProps.clientHeight,
                background: 'tomato',
                width: placeholderProps.clientWidth
              }} />
            </Card>
          )}
        </Droppable>
      </DragDropContext>

    </Grid>
  );
};

export default Showcase;