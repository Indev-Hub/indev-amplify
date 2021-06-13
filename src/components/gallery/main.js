import './gallery.css';

// For This is checking if the page has loaded or not, then will call the the full video gallery
if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
	fullVideoGallery();
} else {
	document.addEventListener('DOMContentLoaded', fullVideoGallery);
}

//This function is the main routine for the video gallery; This function is called on when the page finishes loading. We declared 'Global' variables at the start of this function to allow all functions to have access to them.
function fullVideoGallery() {
	let resp;
	let status;
	let videoArray = [];
	let embedWidth = 1920;
	let embedHeight = 1080;
	let vidArrOne = [];
	let vidArrTwo = [];
	let vidArrMobile = [];
	let correctPic;
	let correctPicTwo;
	let correctPicMobile;

	// This is getting a channel ID
	let channelId = document.getElementById('vimeoshowcaseId').value;

	// Async function to call Vimeo API to get video response.
	(async () => {
		let url = `https://api.vimeo.com/me/albums/${channelId}/videos`;

		resp = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer 2d5b1461e957305ffc81def0383fe3a0'
			}
		}).then(
			function(response) {
				status = response.status; //=> number 100–599
				response.statusText; //=> String
				response.headers; //=> Headers
				response.url; //=> String

				return response.json();
			},
			function(error) {
				error.message; //=> String
			}
		);
		// We call get select after we get a status 200 response.
		getSelect();
	})();

	// This is the function that displays everything you see on the HTML.
	function getSelect() {
		// We check to see if we have a good response status
		if (status == '200') {
			// We set count to 0
			let count = 0;

			// While count is less then the length of the response keep running the loop.
			while (count < resp.total) {
				// If count is odd push response data to vidArrOne and get localID
				if (count % 2 == 1) {
					resp.data[count]['localId'] = count;
					vidArrOne.push(resp.data[count]);
					// If its even, push to vidArrTwo and get the localID
				} else {
					resp.data[count]['localId'] = count;
					vidArrTwo.push(resp.data[count]);
				}
				// Increase the count by 1
				count++;
			}

			// We are declaring where we want to output the HTML down below.
			let o = document.getElementById('output');

			// This is where we write the HTML for the page.
			o.innerHTML += ` 
			<div class="container" id='main-container'>
				<span id='total'></span>
				<div id='desktop'>
					<div class='container' id="output-1"></div>
					<div  id='videocontOne' class='container'>
						<div id='row1'class='row'>
							<div id='colOne' class='column'>
								<div id='output-2'>

								</div>                    
							</div>
							<div  id='colTwo'  class='column'>
								<div id='output-3' >

								</div>
							</div>  
						</div>	
					</div>
					</div>
				</div>
	
				<div id='mobile'>
				<div id="output-5"></div>
					<div id='row2'class='row'>
						<div id='colOneMobile' class='column'>
							<div  id='videocontOne' class='containter'>
								<div id='output-4'>

								</div>
							</div>
						</div>
					</div>
					</div>`;

			// These are the 2 variables where we declare the output for the 2 columns
			let outputTwo = document.getElementById('colOne');
			let outputThree = document.getElementById('colTwo');

			// This is mobile column output
			let outputFour = document.getElementById('output-4');

			// This i is !!!IMPORTANT!!! keep
			let i = 0;

			// This is where we loop over the video arrays and display their contents

			// Run the loop for the length of the array
			if (vidArrTwo.length > 0) {
				Object.values(vidArrTwo).forEach((a) => {
					Object.values(a.pictures.sizes).forEach((pic) => {
						// We search for the correct pic resolution and grab the picture
						if (pic.width == 1280 && pic.height == 720) {
							correctPic = pic.link;
						}
					});

					// We then display the response data; This is where the columns come from.
					outputTwo.innerHTML += `<div class='container' id='thumbCont'><div  class="video-class" id="${a.localId}"><img id='pictureOne' src="${correctPic}"></div><h2 id='header-font'>${a.name}</h2></div>`;

					i++;
				});
			}

			// We then repeat for the other Video Arrays
			if (vidArrOne.length > 0) {
				Object.values(vidArrOne).forEach((a) => {
					Object.values(a.pictures.sizes).forEach((pic) => {
						if (pic.width == 1280 && pic.height == 720) {
							correctPicTwo = pic.link;
						}
					});

					outputThree.innerHTML += `<div class='container' id='thumbCont'><div  class="video-class" id="${a.localId}"><img id='pictureTwo' src="${correctPicTwo}"></div><h2 id='header-font'>${a.name}</h2></div>`;

					i++;
				});
			}

			// Since mobile has one column, there was no need to split it; We set it equal to the response data
			vidArrMobile = resp.data;

			if (vidArrMobile.length > 0) {
				Object.values(vidArrMobile).forEach((a) => {
					Object.values(a.pictures.sizes).forEach((pic) => {
						if (pic.width == 1280 && pic.height == 720) {
							correctPicMobile = pic.link;
						}
					});

					outputFour.innerHTML += `<div class='container' id='thumbCont'><div  class="video-class" id="${a.localId}">  <img id='pictureMobile' src="${correctPicMobile}"></div><h2 id='header-font'>${a.name}</h2></div>`;
				});
			}

			// This is adding the click event listener to the video thumbnails to change the video
			document.addEventListener(
				'click',
				function(event) {
					function hasSomeParentTheClass(element, classname) {
						// We grab the ID of the element
						if (element.className && element.className.split(' ').indexOf(classname) >= 0)
							return element.id;
						return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
					}
					// If the target is 'video-class' we call change hero, and pass the ID into it
					if (event.target.className == 'video-class') {
						changeHero(event.target.id);
					} else if (event.target.parentNode) {
						// If the users click the parent element, it will still act as event.target
						let isChild = hasSomeParentTheClass(event.target, 'video-class');
						// Change the hero to isChild which is the 'video-class'
						if (isChild) {
							changeHero(isChild);
						}
					}
				},
				// Return false on non video-class element
				false
			);
			// By default we grab the first video to display as the Hero
			changeHero(0);

			// Catch error if changing hero doesn't work
			sessionStorage.setItem('rates', JSON.stringify(resp));
		} else {
			document.getElementById('output').text(`Sorry, there was an error "${resp.error}"`);
		}
	}

	// changeHero Function
	function changeHero(videoId) {
		let output = document.getElementById('output-1');
		let outputFive = document.getElementById('output-5');
		let embedCode;
		let vidId;

		// We don't run these loops down below for vidArrMobile because the IDs are consistent with the response; Seperating the response into 2 seperate arrays like vidArrOne and vidArrTwo caused inconsistencies in the video IDs

		// We set found to false
		let found = false;
		// While we haven't found the video
		while (found == false) {
			// Run for the length of the Video Array
			if (vidArrOne.length > 0) {
				// For each item in the array
				vidArrOne.forEach((vid) => {
					// If the local Id and the VideoId match return found as true, and get the vidId
					if (vid.localId == videoId) {
						embedCode = vid.embed.html;
						vidId = vid.localId;
						found = true;
					}
				});
			}
			// We do the same for vidArrTwo
			if (vidArrTwo.length > 0) {
				vidArrTwo.forEach((vid) => {
					if (vid.localId == videoId) {
						embedCode = vid.embed.html;
						vidId = vid.localId;
						found = true;
					}
				});
			}
		}

		// We create a temporary array of the vid.embed.html elements of the chosen Hero from response and seperate them by spaces;
		let tempEmbedArray = embedCode.split(' ');

		// We create the embedArray
		let embedArray = [];

		// For each element in the tempArray we assign the height, width and class name to the embedded video
		tempEmbedArray.forEach((chunk) => {
			if (chunk.includes('width')) {
				embedArray.push("class='embedded-video'");
				embedArray.push(`height="${embedHeight}"`);
			} else if (chunk.includes('height')) {
				embedArray.push(`width="${embedWidth}"`);
			} else {
				// push data into array
				embedArray.push(chunk);
			}
		});

		// We then bring the array back together and display it
		embedArray = embedArray.join(' ');

		// This is the html for mobile display of the the Hero vid
		outputFive.innerHTML = `
								<div id='vid-cont' class='container'>
									<div id='vid'>${embedArray}<span id=vid-header>${resp.data[vidId].name}</span></div>
								</div>`;

		// This is html for the desktop display of the Hero vid
		output.innerHTML = `
							<div id='vid-cont' class='container'>
								<div id='vid'>${embedArray}</div><span id=vid-header>${resp.data[vidId].name}</span></div>
							</div>`;
	}
}