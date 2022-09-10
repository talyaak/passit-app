import "dotenv/config";
import { compare } from "bcrypt";
import express, { Response, Request } from "express";
import { signUp } from "../services/signUp";
import { getUserByEmail, getUserById, getUsers } from "../services/getUsers";
import { userModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authenticateToken";

declare global {
	namespace Express {
		interface Request {
			payload: string | jwt.JwtPayload;
		}
	}
}

const usersRouter = express.Router();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

// Get all users
usersRouter.get("/", async (req: Request, res: Response) => {
	await getUsers().then(
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);
});

// Get user posts (uses jwt authentication middleware)
usersRouter.get(
	"/myposts",
	authenticateToken,
	(req: Request, res: Response) => {
		res.json({
			posts: [
				"Hey, this is my item for free",
				"Hey, looking to give away a couch",
			],
			userInfo: req.payload,
		});
	}
);

// Get user (by user_id) posts
usersRouter.get("/:id", async (req: Request, res: Response) => {
	const userId = req.params.id;
	await getUserById(userId).then(
		(users) => {
			if (users /*<--not void*/ && users.length === 0) {
				res.status(404).send("User not found");
			}
			res.status(200).json(users![0]);
		},
		(error) => res.status(500).send(error)
	);
});

// Post sign-up request
usersRouter.post("/signup", async (req: Request, res: Response) => {
	console.log("start signup");
	const user: userModel = req.body;
	await signUp(user).then(
		(result) => {
			console.log("finished signup");
			res.status(200).send(result);
		},
		(error) => {
			console.log("signup failed");
			console.log(error);
			res.status(502).send(error);
		}
	);
});

usersRouter.post("/login", async (req: Request, res: Response) => {
	const email = req.body.email;
	const password = req.body.password;

	// Authenticate user with bcrypt
	await getUserByEmail(email).then(
		async (user: userModel) => {
			// User not found scenario
			if (!user) res.status(403).json({ message: "Invalid email or password" });

			// Invalid password scenario
			const valid = await compare(password, user.password.toString());
			if (!valid)
				res.status(403).json({ message: "Invalid email or password" });

			const accessToken = jwt.sign(
				user,
				ACCESS_TOKEN_SECRET /* {expiresIn: "15m",} */
			);

			// TODO: Scale up JWT with refreshToken
			// const refreshToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
			// 	expiresIn: "7d",
			// });

			res.status(200).json({ accessToken: accessToken });
			// res.cookie("AINFO", accessToken);
		},
		(error) => res.status(404).json({ message: error.message })
	);
});

export default usersRouter;
