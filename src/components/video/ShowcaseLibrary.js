/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
	Box
	// Typography
} from '@material-ui/core'
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const ShowcaseLibrary = (props) => {
	console.log('props ', props);
	const { /*data, videos, */classes, onDragEnd, onDragUpdate, getListStyle, getItemStyle, placeholderProps} = props;
	const { videos } = props.data.data.getShowcase;
	console.log('videos ', videos);
	const vidArray= JSON.parse(videos);
	console.log('vidArray ', vidArray);
	// const showcase = {...data.getShowcase,
	// 										videos:vidArray
	//									 }
	return (
		<DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
			<Droppable droppableId="droppable">
				{(provided, snapshot) => (
					<Box
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
					>
						{vidArray.map((item, index) => (
							
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
										{/* <img className={classes.thumbnail} src={data.getShowcase.pictures.size[index].link} /> */}
									</Box>
								)}
							</Draggable>
						))}

						{provided.placeholder}
						 {/* <CustomPlaceholder snapshot={snapshot} />  */}
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
	)
}

ShowcaseLibrary.propTypes = {
	// data: PropTypes.object,
	videos: PropTypes.array,
	classes: PropTypes.func,
	onDragEnd: PropTypes.func,
	onDragUpdate: PropTypes.func,
	getListStyle: PropTypes.func,
	getItemStyle: PropTypes.func,
	fetchVideos: PropTypes.func,
	placeholderProps: PropTypes.object
}

export default ShowcaseLibrary;