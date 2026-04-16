<script>
		import { page } from '$app/stores';
		import { onMount } from 'svelte';
		import { supabase } from '$lib/api/sb';
		import Widget from '$lib/comp/widget.svelte';
		import "$lib/style/signin.css";

		// This "id" matches the folder name [id]
		let classID    = $page.params.id;
		let taskData   = $state([]);
		let role       = $state("");
		let userID     = $state("");
		let ready      = $state(false);

		async function loadTasks(userID) {
				// load all periods that are associated with the users via the membership table
				// then filter those periods based on the school via the period table
				const { data, error } = await supabase
						.from('task')
						.select(`
								task_id,
								created_at,
								last_updated,
								frame,
								title,
								desc,
								plugin_id (
										name,
										assignment
								)
						`)
						.eq('class_id', classID)

				taskData.push(...data?.map((m) => ({
						id      : m.task_id,
						created : new Date(m.created_at).toLocaleString('en-US', {dateStyle: 'medium', timeStyle:'short'}),
						updated : new Date(m.last_updated).toLocaleString('en-US', {dateStyle: 'medium', timeStyle:'short'}),
						title   : m.title,
						desc    : m.desc,
						frame   : m.frame,
						p_name  : m.plugin_id.name,
						p_assi  : m.plugin_id.assignment ? "Assignment" : "Lesson"
				})));
				console.log(taskData)
		};

		onMount(async () => {
				const { data: { user } } = await supabase.auth.getUser();
				const isLoggedIn = !!user;
				if (isLoggedIn) {
						loadTasks(user.id);
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
		<div class="p-10 overflow-y-auto h-screen w-full overflow-x-auto">
				{#each taskData as task}
						<div class="flex flex-col shadow w-full rounded-2xl bg-white dark:bg-slate-300 pt-4 px-4 dark:text-black">
								<div class="flex flex-col md:grid md:grid-cols-[80%_1fr] w-full mb-4">
										<div class="flex flex-col mb-4 md:m-0">
												<h1 class="text-2xl font-bold mb-2">{task.title}</h1>
												<p class="text-wrap break-all">{task.desc}</p>
										</div>
										<div class="flex flex-row justify-center items-center">
												<a
										class="h-3/4 btn-secondary dark:bg-slate-300 dark:text-black bg-black hover:bg-transparent text-white hover:text-black hover:dark:bg-black hover:dark:text-white text-center text-center"
										href="/task/{task.id}">
												Open Task</a>
										</div>
								</div>
								<div class="flex flex-col w-full flex-start text-sm text-slate-600">
										<hr class="mb-4">
										<div class="grid grid-rows-2 md:grid-cols-2 gap-x-2">
												<div class="grid grid-cols-[35%_min-content_1fr] mb-4 md:m-0">
														<span>Plugin</span>
														<span class="mr-2">:</span>
														<span>{task.p_name}</span>
														<span>Task</span>
														<span class="mr-2">:</span>
														<span>{task.p_assi}</span>
												</div>
												<div class="grid grid-cols-[35%_min-content_1fr]">
														<span>Created on</span>
														<span class="mr-2">:</span>
														<span>{task.created}</span>
														<span>Updated on</span>
														<span class="mr-2">:</span>
														<span>{task.updated}</span>
												</div>
										</div>
								</div>
				</div>
				{/each}
		</div>
</div>

