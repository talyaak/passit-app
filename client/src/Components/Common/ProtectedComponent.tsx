import { useContext } from "react";
import { AuthContext } from "../../App";

interface PCProps {
	authComponent: JSX.Element;
	default: JSX.Element;
}

export const ProtectedComponent = (props: PCProps) => {
	const { auth } = useContext(AuthContext);
	return <>{auth ? props.authComponent : props.default}</>;
};
