import { supabaseSSR } from '$lib/api/sb';

export const handle = async ({ event, resolve }) => {
		// Initialize Supabase for this specific request
		event.locals.supabase = supabaseSSR(event);
		// Helper to safely get the user session
		event.locals.safeGetSession = async () => {
				const { data: { session } } = await event.locals.supabase.auth.getSession();
				if (!session) return { session: null, user: null };
				return { session, user: session.user };
		};
		return resolve(event, {
    filterSerializedResponseHeaders(name) {
				return name === 'content-range';
    },});
};
