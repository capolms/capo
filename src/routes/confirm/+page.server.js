import { redirect, error } from '@sveltejs/kit';

export const load = async ({ url, locals: { supabase } }) => {
		const code = url.searchParams.get('code');
		const next = url.searchParams.get('next') ?? '/forgot/update';

		console.log(code)

		if (code) {
				// This is the "Secret Handshake"
				const { error: authError } = await supabase.auth.exchangeCodeForSession(code);
    
				if (!authError) {
						// The session is now saved in a secure cookie!
						throw redirect(303, next);
				};

				console.error(authError.message)
				
		}

		// If we get here, something went wrong (no code or bad code)
		throw error(404, 'Invalid or expired link.');
};
