import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY } from "$env/static/public"
import { createServerClient, createBrowserClient } from '@supabase/ssr';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseKey = PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// 1. The Browser Client (Simple, no manual cookie logic needed)
export const supabase = createBrowserClient(supabaseUrl, supabaseKey, {
		auth: {
				flowType: 'pkce',
				persistSession: true,
				detectSessionInUrl: true
		},
		// cookieOptions: {
		// 		name: 'sb-auth-token',
		//		domain: '',
		//		path: '/',
		//		sameSite: 'lax', // VITAL FOR LOCALHOST
		//		secure: false    // VITAL FOR HTTP/LOCALHOST
		// }
});

// 2. The Server Client (The one for your hooks and +page.server.js)
export const supabaseSSR = (event) => {
		return createServerClient(supabaseUrl, supabaseKey, {
				cookies: {
						getAll: () => event.cookies.getAll(),
						setAll: (cookiesToSet) => {
						// WE REMOVED THE isBrowser() CHECK. 
						// We let the server set cookies on the response.
						cookiesToSet.forEach(({ name, value, options }) =>
								event.cookies.set(name, value, { ...options, path: '/' })
						);
				},
		},});
};
