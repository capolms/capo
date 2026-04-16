<script>
		import Navbar from '$lib/comp/navbar.svelte';
		import Menubar from '$lib/comp/menubar.svelte';
		import Widget from '$lib/comp/widget.svelte';
		import { onMount } from 'svelte';
		import { goto } from '$app/navigation';
		import { menu_shown } from '$lib/comp/show_menu';

		import { supabase } from '$lib/api/sb';
		import "$lib/style/signin.css";

		let ready      = $state(false);
		let schoolData = $state([]);

		async function loadSchool(userID) {
				const { data: rawSchoolID, error } = await supabase
						.from('membership')
						.select(`
								role,
								period_id (
										name,
										school (
												name,
												image,
												school_id
				)
								)
						`)
						.eq('user_id', userID);
				schoolData.push(...rawSchoolID?.map(m => ({
						schoolID    : m.period_id.school.school_id,
						role        : m.role,
						periodName  : m.period_id.name,
						schoolName  : m.period_id.school.name,
		schoolImage : m.period_id.school.image
				})));
		};

		onMount(async () => {
				const { data: { user } } = await supabase.auth.getUser();
				const isLoggedIn = !!user;
				if (isLoggedIn) {
						loadSchool(user.id);
						ready = true;
				} else {
						goto('/login', { replaceState : true});
				};
		});
</script>

<div class="{ready ? "hidden" : ""} p-4 overflow-y-auto">
		<p>Loading...</p>
</div>

<div class="{ready ? "" : "hidden"} bg-slate-100 dark:bg-transparent">
		<!-- Main Container -->
		<div class="p-10 overflow-y-auto h-screen">
				<!-- Header -->
				<div class="mb-8 flex flex-col md:flex-row justify-between">
						<h2 class="text-3xl font-bold">My Schools</h2>
						<div class="w-full md:w-3/8 flex flex-row mt-6 md:mt-0">
								<a
								class="btn-secondary dark:bg-white dark:text-black bg-black hover:bg-transparent text-white hover:text-black hover:dark:bg-transparent hover:dark:text-white text-center w-1/2 md:w-auto mr-2"
								href="/signup">
								Add</a>
								<a
								class="btn-secondary dark:bg-white dark:text-black bg-black hover:bg-transparent text-white hover:text-black hover:dark:bg-transparent hover:dark:text-white text-center w-1/2 md:w-auto"
								href="/signup">
								Create</a>
						</div>
				</div>
				<!-- List of Schools -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
						{#if schoolData.length > 0}
								{#each schoolData as school}
										<Widget first={school.schoolName} second={school.periodName} third={school.role} image={school.schoolImage} button="/school/{school.schoolID}"/>
								{/each}
						{:else}
								<div class="flex justify-center items-center h-full w-full">Add or create a new school to get started.</div>
						{/if}
				</div>
		</div>
</div>
