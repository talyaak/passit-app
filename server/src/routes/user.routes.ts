import express from "express";
import { Response, Request } from "express";
import { getUserById, getUsers } from "../services/getUsers";

const usersRouter = express.Router();

// Get all users
usersRouter.get("/", async (req: Request, res: Response) => {
	console.log("route check 1");
	await getUsers().then(
		(users) => {
			console.log("routes check 2");

			console.log(users);

			res.status(200).json(users);
		},
		(error) => {
			console.log(error);
			res.status(404).send(error);
		}
	);
});

// Get user by user_id
usersRouter.get("/:id", async (req: Request, res: Response) => {
	const userId = req.params.id;

	await getUserById(userId).then(
		(users) => {
            if(users /*<--not void*/ && users.length === 0) {
                res.status(404).send("User not found")
            }
			res.status(200).json(users![0]);
		},
		(error) => {
			console.log(error);
			res.status(500).send(error);
		}
	);
});

export default usersRouter;
