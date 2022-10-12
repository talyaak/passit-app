import { Navigate } from "react-router-dom";
import { PostStack } from "./PostStack";
import { ProtectedComponent } from "./ProtectedComponent";

interface USPProps {
	endpoint: string;
}

export const ProtectedPosts = (props: USPProps) => {

	return (
			<ProtectedComponent
				authComponent={
                <PostStack endpoint={props.endpoint}/>
				}
				default={<Navigate replace to="/login" />}
			/>
	);
};
