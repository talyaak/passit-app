import express from "express";
import { Response, Request } from "express";
import { signUp } from "../services/signUp";
import { getUserById, getUsers } from "../services/getUsers";
import { userModel } from "../models/user.model";

const usersRouter = express.Router();

// Get all users
usersRouter.get("/", async (req: Request, res: Response) => {
	
	await getUsers().then(
		(users) => res.status(200).json(users),
		(error) => res.status(404).send(error)
	);
});

// Get user by user_id
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

usersRouter.post("/signup", async (req: Request, res: Response) => {
    console.log("start signup");
    const user: userModel = req.body;
    await signUp(user)
    .then(result=>{
        console.log("finished signup");
        res.status(200).send(result);
    }, error => {
        console.log("signup failed");
        console.log(error);
        res.status(502).send(error);
    })
})

export default usersRouter;
