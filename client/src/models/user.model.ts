// user model/interface
export interface userModel {
	user_id?: number;
	first_name: String;
	last_name: String;
	email: String;
	password: String;
	address?: addressModel;
	is_admin: Boolean;
}

// user address interface
export interface addressModel {
	city: string;
	street_address: string;
	country: string;
	lat: number;
	lng: number;
}