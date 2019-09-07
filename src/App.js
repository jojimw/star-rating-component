import React from 'react';

import './App.scss';
import StarRating from "./components/StarRating";

function App() {
	const comments = ["1 - Poor", "2 - Fair", "3 - Average", "4 - Good", "5 - Excellent"];
	const colors = ["#B53229", "#E9665E", "#E2E542", "#4DEB68", "#279539"]
	const defaultColor = "#C5C8CA"

	return (
		<div className="App">
			<StarRating
				totalStars={5}
				comments={comments}
				colors={colors}
				defaultColor={defaultColor}
			/>
		</div>
	);
}

export default App;
