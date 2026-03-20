// Run this function to obtain theme.
// This function will get the cookie,
// that will pass the result to layout.svelte props.

export const load = ({ cookies }) => {
		// We define 'theme' here. 
		// If the cookie doesn't exist, we default to 'light'.
		const theme = cookies.get('theme');
		return { theme: theme ?? null };
};
