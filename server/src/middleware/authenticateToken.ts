import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
	const authHeader = req.headers["authorization"];

	// If authHeader !== undefined =>  return 'TOKEN' from authHeader(='Bearer TOKEN')
	const token = authHeader && authHeader.split(" ")[1];
	if (token === null) return res.send(401).json({ message: "Unauthorized" });

	try {
		const payload = jwt.verify(token!, ACCESS_TOKEN_SECRET);
		req.payload = payload;
		next();
	} catch (error) {
		console.log(error);
		res.status(403).json({ message: error });
	}
}