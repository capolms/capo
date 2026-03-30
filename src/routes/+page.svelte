<script>
		import { goto } from '$app/navigation';
		import { supabase } from '$lib/api/sb';
		import { onMount } from 'svelte';

		onMount(async () => {
				const { data: { user } } = await supabase.auth.getUser();
				const isLoggedIn = !!user;
				if (isLoggedIn) {
						goto('/dashboard', { replaceState : true});
				} else {
						goto('/home', { replaceState : true});
				};
		});

</script>

<div class="flex items-center justify-center h-screen">
		<p class="text-2xl">Loading...</p>
</div>
