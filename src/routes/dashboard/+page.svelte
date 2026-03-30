<script>
		import Navbar from '$lib/comp/navbar.svelte';
		import Menubar from '$lib/comp/menubar.svelte';
		import School from '$lib/comp/school.svelte';
		import { onMount } from 'svelte';
		import { goto } from '$app/navigation';
		import { menu_shown } from '$lib/comp/show_menu';

		import { supabase } from '$lib/api/sb';

		let ready = $state(false);

		onMount(async () => {
				const { data: { user } } = await supabase.auth.getUser();
				const isLoggedIn = !!user;

				if (isLoggedIn) {
						ready = true;
				} else {
						goto('/login', { replaceState : true});
				};
		});

</script>

<div class="{ready ? "hidden" : ""} p-4 overflow-y-auto">
		<p>Loading...</p>
</div>

<div class="{ready ? "" : "hidden"}">
		<!-- Main Container -->
		<div class="p-10 overflow-y-auto">
				<!-- Header -->
				<div class="mb-8">
						<h2 class="text-3xl font-bold">My Schools</h2>
				</div>
				<!-- List of Schools -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
						<School/>
						<School/>
						<School/>
						<School/>
				</div>
		</div>
</div>
