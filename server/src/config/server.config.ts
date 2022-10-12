import jwt from "jsonwebtoken";

// For use with jwt payload
export interface userInfo {
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	address: any;
	password: string;
	is_admin: boolean;
	iat: number;
	exp: number;
}

// Global Express.Request declaration for middleware use
declare global {
	namespace Express {
		interface Request {
			payload: string | jwt.JwtPayload | userInfo;
		}
	}
}