/**
 * Assists us with receiving an error message on a strongly typed 'catch' block
 * @param error 
 * @returns the message from the error
 */
export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}
