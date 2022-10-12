import PostStack from "../Common/PostStack";

export const Feed = () => {
	return <PostStack endpoint="/api/expanded-posts" />;
};
