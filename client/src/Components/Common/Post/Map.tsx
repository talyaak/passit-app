import { useState, useEffect } from "react";
import { GOOGLE_API_KEY } from "../../../keys";
import { addressModel } from "../../../models/user.model";

interface mapProps {
	address?: addressModel;
}

export const Map = (props: mapProps) => {
	const [address, setAddress] = useState<addressModel | undefined>(
		props.address
	);

	const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${address?.lat},${address?.lng}&zoom=18`;

	useEffect(() => {
		setAddress(props.address);
		return () => {};
	}, [props.address]);

	return (
		<>
			<iframe
				title="map"
				width="100%"
				height="300px"
				frameBorder="0"
				style={{ border: "0" }}
				referrerPolicy="no-referrer-when-downgrade"
				src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${address ? address.lat : ""}, ${address ? address.lng : ""}&zoom=18`}
				allowFullScreen
			></iframe>
		</>
	);
};
