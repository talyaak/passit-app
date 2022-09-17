import "dotenv/config";
import express, { Response, Request } from "express";
import { getPosts, getExpandedPosts } from "../services/getPosts";

const apiRouter = express.Router();

// Get all posts
apiRouter.get("/posts", async (req: Request, res: Response) => {
	getPosts().then(
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);
});

// Get all posts
apiRouter.get("/expanded-posts", async (req: Request, res: Response) => {
	getExpandedPosts().then(
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);
});

export default apiRouter;
