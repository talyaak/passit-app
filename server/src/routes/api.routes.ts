import "dotenv/config";
import { userInfo } from "./user.routes";
import express, { Response, Request } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { getPosts, getExpandedPosts, getMyPosts } from "../services/getPosts";

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
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);  
});

export default apiRouter;
