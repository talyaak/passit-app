import { addressModel } from "./user.model";

export interface postModel {
	post_id?: number;
	user_id?: number;
	category: string;
	product_name: string;
	description: string;
	img_url?: string;
}

export interface expandedPostModel {
	post_id: number;
	user_id: number;
    first_name: string;
	last_name: string;
	email: string;
	category: string;
	product_name: string;
	description: string;
	img_url: string;
    address: addressModel;
}