import React from "react";
import { GOOGLE_API_KEY } from "../../../keys";
export const Map = () => {
	const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=31.6862777,34.5750802
    &zoom=18`;

	return (
		<>
			<iframe
				title="map"
				width="100%"
                height="300px"
				frameBorder="0"
				style={{ border: "0" }}
				referrerPolicy="no-referrer-when-downgrade"
				src={mapSrc}
				allowFullScreen
			></iframe>
		</>
	);
};
