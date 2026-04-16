<script>
		import { page } from '$app/stores';
		import { onMount } from 'svelte';
		import { supabase } from '$lib/api/sb';
		import Widget from '$lib/comp/widget.svelte';
		import "$lib/style/signin.css";

		// This "id" matches the folder name [id]
		let schoolID   = $page.params.school_id;
		let classData  = $state([]);
		let role       = $state("");
		let userID     = $state("");
		let ready      = $state(false);

		async function loadToolings() {
				// load all periods that are associated with the users via the membership table
				// then filter those periods based on the school via the period table
				const { data, error } = await supabase
						.from('membership')
						.select(`
								role,
								period_id (school_id)
						`)
						.eq('user_id', userID)
						.eq('period_id.school_id', schoolID);

				role = data[0].role;

				// pull classes from the period
				if (data[0].role === "student") {
						const { data: rawClasses, classError } = await supabase
								.from('class')
								.select('class_id, name, image, handler (metadata)')
								.eq('period_id', data[0].period_id);
						classData.push(...rawClasses?.map((m) => ({
								id      : m.class_id,
								name    : m.name,
								handler : m.handler.metadata.name,
								image   : m.image
						})));
				} else if (data[0].role === "teacher") {
						// Get all the classes, but filter based on the manager.		
						const { data: rawClasses, classError } = await supabase
								.from('class')
								.select('class_id, name, image, period_id (name, school_id)')
								.eq('period_id.school_id', schoolID)
								.eq('handler', userID);
						classData.push(...rawClasses?.map((m) => ({
								id      : m.class_id,
								name    : m.name,
								period  : m.period_id.name,
								image   : m.image
						})));
				} else if (data[0].role === "admin") {
						// Get all the periods related to the school.
						const { data: rawPeriods, periodError } = await supabase
								.from('period')
								.select('period_id, name')
								.eq('school_id', schoolID)
								.eq('type', 'student');
						for (let period of rawPeriods) {
								// Get all the classes, but filter based on the manager.		
								const { data: rawClasses, classError } = await supabase
										.from('class')
										.select('class_id, name, image, period_id (name), handler (metadata)')
										.eq('period_id', period.period_id)
								let subClassData = [];
								subClassData.push(...rawClasses?.map((m) => ({
										class_id	: m.class_id,
										name		  : m.name,
										period		: m.period_id.name,
										image			: m.image,
										handler   : m.handler.metadata.name
								})));
								classData.push({
										period_name    : period.name,
										period_id		   : period.period_id,
										period_content : subClassData
								});
						};
				};
		};

		onMount(async () => {
				const { data: { user } } = await supabase.auth.getUser();
				const isLoggedIn = !!user;
				if (isLoggedIn) {
						userID = user.id;
						loadToolings();
						ready = true;
				} else {
						goto('/login', { replaceState : true});
				};

		});
</script>

<div class="{ready ? "" : "hidden"} bg-slate-100 dark:bg-transparent">
		<!-- Main Container -->
		<div class="p-10 overflow-y-auto h-screen">
				<!-- Header -->
				<div class="mb-8 flex flex-col md:flex-row justify-between">
						<h2 class="text-3xl font-bold">
								{#if role === "admin"}
										My School
								{:else}
										My Classes
								{/if}
						</h2>
						<div class="w-full md:w-3/8 flex flex-row mt-6 md:mt-0">
								{#if role === "admin"}
										<a
										class="btn-secondary dark:bg-white dark:text-black bg-black hover:bg-transparent text-white hover:text-black hover:dark:bg-transparent hover:dark:text-white text-center w-1/2 md:w-auto mr-2"
										href="/dashboard">
										Manage</a>
								{/if}
								<a
								class="btn-secondary dark:bg-white dark:text-black bg-black hover:bg-transparent text-white hover:text-black hover:dark:bg-transparent hover:dark:text-white text-center w-1/2 md:w-auto"
								href="/dashboard">
								Back</a>
						</div>
				</div>
				<!-- List of Schools -->
				<div class="flex flex-col">
						{#if classData.length > 0}
								{#if role === "student"}
										{#each classData as classUnit}
												<Widget
												first={classUnit.name} third={classUnit.handler} image={classUnit.image} button="/class/{classUnit.id}"/>
										{/each}
								{:else if role === "teacher"}
										{#each classData as classUnit}
												<Widget
										first={classUnit.name} third={classUnit.period} image={classUnit.image} button="/class/{classUnit.id}"/>
										{/each}
								{:else}
										{#each classData as period}
												<h1 class="text-2l font-bold">Period: {period.period_name}</h1>
												<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
												{#each period.period_content as classUnit}
														<Widget
									first={classUnit.name} second={classUnit.period} third={classUnit.handler} image={classUnit.image}
									button="/class/{classUnit.class_id}"/>
												{/each}
												</div>
										{/each}
								{/if}
						{:else}
								<div class="flex justify-center items-center h-full w-full">No class has existed yet.</div>
						{/if}
				</div>
		</div>
</div>
