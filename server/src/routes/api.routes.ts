import "dotenv/config";
import { userInfo } from "./user.routes";
import express, { Response, Request } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getPosts, getExpandedPosts, getMyPosts, getLikedPosts } from "../services/getPosts";
import { likePost, unlikePost, checkLike } from "../services/likePosts";

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

apiRouter.get("/fetch/like", authenticateToken, async (req: Request, res: Response) => {
    const payload = req.payload as userInfo;
    const postID = req.body.post_id;
    const userID = payload.user_id;

    await checkLike(userID, postID).then(
        (result: boolean) => res.status(200).json(result),
        (error: Error ) => res.status(502).send(error)
    )
})

apiRouter.post("/like", authenticateToken, async (req: Request, res: Response) => {
    const payload = req.payload as userInfo;
    const postID = req.body.post_id;
    const userID = payload.user_id;

    await likePost(userID, postID).then(
        (result: any) => res.status(200).json(result),
        (error: Error) => res.status(502).send(error)
    )
})

apiRouter.post("/unlike", authenticateToken, async (req: Request, res: Response) => {
    const payload = req.payload as userInfo;
    const postID = req.body.post_id;
    const userID = payload.user_id;

    await unlikePost(userID, postID).then(
        (result: any) => res.status(200).json(result),
        (error: Error) => res.status(502).send(error)
    )
})

export default apiRouter;
