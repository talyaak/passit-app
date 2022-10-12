import "dotenv/config";
import { userInfo } from "../config/server.config";
import express, { Response, Request } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getPosts, getExpandedPosts, getMyPosts, getLikedPosts, getLikedPostsIDs } from "../services/getPosts";
import { likePost, unlikePost, checkLike } from "../services/likePosts";
import { likedIDsQueryResult } from "../models/like.model";

const apiRouter = express.Router();

// Get all posts
apiRouter.get("/posts", async (req: Request, res: Response) => {
	getPosts().then(
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);
});

// Get all posts (expanded model)
apiRouter.get("/expanded-posts", async (req: Request, res: Response) => {
	getExpandedPosts().then(
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);
});

// Get user specific posts (expanded model)
apiRouter.get("/myposts", authenticateToken, async (req: Request, res: Response) => {
	const payload = req.payload as userInfo;
    console.log((payload.user_id));
    
    getMyPosts(payload.user_id).then(
		(posts) => res.status(200).json(posts),
		(error) => res.status(404).send(error)
	);  
});

// Get user specific posts (expanded model)
apiRouter.get("/likedposts", authenticateToken, async (req: Request, res: Response) => {
	const payload = req.payload as userInfo;
    console.log((payload.user_id));
    
    getLikedPosts(payload.user_id).then(
		(posts) => res.status(200).json(posts),
		(error) => res.status(404).send(error)
	);  
});

// Check for like instance between user and post (via id)
apiRouter.get("/fetch/like", authenticateToken, async (req: Request, res: Response) => {
    const payload = req.payload as userInfo;
    const postID = req.body.post_id;
    const userID = payload.user_id;

    checkLike(userID, postID).then(
        (result: boolean) => res.status(200).json(result),
        (error: Error ) => res.status(502).send(error)
    )
})

// Get liked post array
apiRouter.get("/fetch/likes", authenticateToken, async (req: Request, res: Response) => {
    const payload = req.payload as userInfo;
    const userID = payload.user_id;

    getLikedPostsIDs(userID).then(
        (result: likedIDsQueryResult[]) => res.status(200).json(result[0].liked_ids),
        (error: Error ) => res.status(502).send(error)
    )
})

// Like a post
apiRouter.post("/like", authenticateToken, async (req: Request, res: Response) => {
    const payload = req.payload as userInfo;
    const postID = req.body.post_id;
    const userID = payload.user_id;

    likePost(userID, postID).then(
        (result: any) => res.status(200).json(result),
        (error: Error) => res.status(502).send(error)
    )
})

// Unlike a post
apiRouter.post("/unlike", authenticateToken, async (req: Request, res: Response) => {
    const payload = req.payload as userInfo;
    const postID = req.body.post_id;
    const userID = payload.user_id;

    unlikePost(userID, postID).then(
        (result: any) => res.status(200).json(result),
        (error: Error) => res.status(502).send(error)
    )
})

export default apiRouter;
