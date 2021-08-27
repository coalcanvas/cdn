const Proximity = {};

// Position of observed elements and distance of relevance
Proximity._points = [ /* isActive, X, Y, Distance */ ];
Proximity._callbackList = [ /* Callback functions */ ];
Proximity._nodes = [ /* Observed node elements */ ];

Proximity._getRelevantDistances = (pageX, pageY) => {
	
	_.forEach(Proximity._points, (element, index) => {
		// Ignore inactive elements
		if( !element[0] ) return;

		let relevantDistance = element[3];

		// Pythagorean theorem
		var distance = Math.sqrt(
			Math.pow( element[1] - pageX, 2) + Math.pow( element[2] - pageY, 2)
		);

		// If mouse is in a relevant area
		if( distance <= relevantDistance )
			Proximity._beforeCallback(index, 1 - distance/relevantDistance );
		else if ( (distance - relevantDistance) <= 10 )
			Proximity._beforeCallback(index, 0);
	});
};

Proximity._beforeCallback = (index, percent) => {
	// Call callback
	( Proximity._callbackList[index] ).call( Proximity._nodes[index], percent);
};

Proximity._handlerMouseMove = (event) => {
	Proximity._getRelevantDistances(event.pageX, event.pageY);
};

Proximity._active = () => {
	window.addEventListener('mousemove', Proximity._handlerMouseMove);
}

/**
 * @function ProximityObserve
 * @param  {HTML DOM Node}   nodeElement  HTML node element to observe
 * @param  {Number}   relevance           Cricle radio of relevance area 
 * @param  {Function} callback            Action called when mouse is in relevant area passing the percent of center distance of element
 * @return {null}
 */
Proximity.observe = (nodeElement, relevance, callback ) => {
	
	if(
		!nodeElement || typeof nodeElement != 'object' ||
		!relevance || relevance.constructor != Number ||
		!callback || callback.constructor != Function
	)
		throw new Error("Proximity.observe: invalid argument");

	// Define node as active
	let points = [true];
	// Define X coordinate
	points.push( nodeElement.offsetHeight/2 + nodeElement.offsetLeft );
	// Define Y coordinate
	points.push( nodeElement.offsetWidth/2 + nodeElement.offsetTop );
	// Define relevance. 100px is default
	points.push( relevance || 100 );

	nodeElement.proximityIndex = Proximity._points.length;

	Proximity._points.push(points);
	Proximity._callbackList.push(callback);
	Proximity._nodes.push(nodeElement);
}

/**
 * @function ProximityDisable
 * @param  {HTML DOM Node} nodeElement to disable proximity mouse observer
 * @return {null}
 */
Proximity.disable = (nodeElement) => {
	
	if( !nodeElement.hasOwnProperty('proximityIndex') )
		throw new Error('Proximity.disable: node element not observed');

	let index = Number(nodeElement.proximityIndex);
	// Set 'isActive' as false
	Proximity._points[index][0] = false;
};
/**
 * @function ProximityEnable
 * @param  {HTML DOM Node} nodeElement to enable proximity mouse observer
 * @return {null}
 */
Proximity.enable = (nodeElement) => {	
	if( !nodeElement.hasOwnProperty('proximityIndex') )
		throw new Error('Proximity.disable: node element not observed');

	let index = Number(nodeElement.proximityIndex);
	// Set 'isActive' as true
	Proximity._points[index][0] = true;
};



// If is in browser
if( window ){
	Proximity._active();
	window.Proximity = Proximity;
}
