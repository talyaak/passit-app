import bcrypt from 'bcrypt';

// Generates a hashed password + salt
export async function generateCrypt(password: String) {
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password.toString(), salt);
	return hashedPassword;
}