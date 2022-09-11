import "dotenv/config";
import { compare } from "bcrypt";
import express, { Response, Request } from "express";
import { signUp } from "../services/signUp";
import { getUserByEmail, getUserById, getUsers } from "../services/getUsers";
import { userModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authenticateToken";
import { getErrorMessage } from "../services/helpers/getErrorMessage"
import { resolve } from "path";

// Global Express.Request declaration for middleware use
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
	getUsers().then(
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);
});

// Get hardcoded user posts (uses jwt authentication middleware)
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

	try {
		const users = await getUserById(userId);
		if (users && users.length === 0) {
			res.status(404).send("User not found");
		}
		res.status(200).json(users![0]);
	} catch (error) {
		res.status(500).send(error);
	}
});

/**
 * Logs out of system using httpOnly cookie deletion
 *
 * Delete is available only after authentication
 */
usersRouter.post(
	"/logout",
	authenticateToken,
	(req: Request, res: Response) => {
		try {
			res.cookie("jwt-token", "");
			res.send(200).json({ message: "Log out successful " });
		} catch (error) {
			console.log(error);
			res.status(403).send(error);
		}
	}
);

// sign-up request
usersRouter.post("/signup", async (req: Request, res: Response) => {
	console.log("start signup");
	const user: userModel = req.body;

	try {
		const result = await signUp(user);
		console.log("finished signup");
		res.status(200).send(result);
	} catch (error) {
		console.log("signup failed");
		console.log(error);
		res.status(502).send(error);
	}
});

/**
 * Login request
 *
 * email test => password test => create token => send httpOnly cookie
 */
usersRouter.post("/login", async (req: Request, res: Response) => {
	const email = req.body.email;
	const password = req.body.password;
	console.log({
		email: email,
		password: password,
	});

	try {
		const user = await getUserByEmail(email);
        // Invalid email scenario
		if (!user) res.status(403).json({ message: "Invalid email or password" });

		// Invalid password scenario
		const valid = await compare(password, user.password.toString());
		if (!valid)
			res.status(403).json({ message: "Invalid email or password!" });

		const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
			expiresIn: "7d",
		});

		res.cookie("jwt-token", accessToken, {
			path: "/",
			httpOnly: true,
			// TODO: Implement HTTPS & SameSite for XSS & XSRF immunity
			// secure: true,
			// sameSite: 'strict'
		});
		res.status(200).json({ message: "Successful login" });
		// res.status(200).json({ accessToken: accessToken });
	} 
    catch (error) {
		res.status(404).json({ message: getErrorMessage(error) });
	}
});

// Endpoint for react authentication of cookies, allowing "Authenticated" state
usersRouter.post("/auth", authenticateToken, async (req: Request, res: Response) => {
    try {
        res.status(200).send(true);
    } catch (error) {
        res.status(404).send(false);
        console.log(error);
    }
})

export default usersRouter;
