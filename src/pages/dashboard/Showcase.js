/* eslint-disable */
import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  IconButton
} from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
import { getShowcase } from "src/graphql/queries";
import { Publish, Undo } from '@material-ui/icons';
import { updateShowcase } from '../../graphql/mutations';

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

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
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  position: "relative"
});

const queryAttr = "data-rbd-drag-handle-draggable-id";

const Showcase = props => {
  const [placeholderProps, setPlaceholderProps] = useState({});
  const [items, setItems] = useState(getItems(10));

  // START CODE from ShowcaseLibrary //
  const [showcaseData, setShowcaseData] = useState({});
  const [showcaseID, setShowcaseID] = useState(7868357)
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, [])

  const fetchVideos = async () => {
    try {
      const videoData = await API.graphql(graphqlOperation(getShowcase, { id: showcaseID }));
      const showcaseVideoData = videoData.data.getShowcase.videos;
      const videoList = JSON.parse(showcaseVideoData);
      setVideos(videoList);
      setShowcaseData(videoData.data.getShowcase);
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  }

  const saveShowcaseChanges = async () => {

		const updatedShowcase = {
			id: showcaseData.id,
			title: showcaseData.title,
			manager: showcaseData.manager,
			managerID: showcaseData.managerID,
			videos: JSON.stringify(videos)
		 };
		console.log('showcaseData before update:', showcaseData);
    console.log('showcaseData videos before update:', videos);
    console.log('updatedShowcase before update:', updatedShowcase);
		await API.graphql(graphqlOperation(updateShowcase, { input: updatedShowcase}));
    console.log('showcaseData after update:', showcaseData);
    console.log('showcase videos after update:', videos);
	}

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

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <Box>
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {videos.map((item, index) => (
              <Draggable key={item.uri} draggableId={item.uri} index={index}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.name}
                  </Box>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
            {/* <CustomPlaceholder snapshot={snapshot} /> */}
            <Box style={{
              position: "absolute",
              top: placeholderProps.clientY,
              left: placeholderProps.clientX,
              height: placeholderProps.clientHeight,
              background: "tomato",
              width: placeholderProps.clientWidth
            }} />
          </Box>
        )}
      </Droppable>
    </DragDropContext>

    <IconButton onClick={saveShowcaseChanges}>
				<Publish 
					color="primary"/>
			</IconButton>

    <IconButton onClick={undoChanges}>
        <Undo
          color="primary" />
    </IconButton>
    </Box>
  );
};

export default Showcase;