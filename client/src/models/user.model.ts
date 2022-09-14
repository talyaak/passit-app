// user model/interface
export interface userModel {
	user_id?: number;
	first_name: String;
	last_name: String;
	email: String;
	password: String;
	address?: address;
	is_admin: Boolean;
}

// user address interface
export interface address {
	city: string;
	street_name: string;
	street_address: string;
	zip_code: string;
	state: string;
	country: string;
	lat: number;
	lng: number;
}