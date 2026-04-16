<script>
		import { page } from '$app/stores';
		import { onMount } from 'svelte';
		import { supabase } from '$lib/api/sb';
		import Widget from '$lib/comp/widget.svelte';
		import "$lib/style/signin.css";

		// This "id" matches the folder name [id]
		let taskID     = $page.params.id;
		let taskData   = $state({});
		let workData   = $state({});
		let role       = $state("");
		let userID     = $state("");
		let ready      = $state(false);

		async function loadTasks(userID) {
				// load all periods that are associated with the users via the membership table
				// then filter those periods based on the school via the period table
				const { data, error } = await supabase
						.from('task')
						.select(`
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
						.eq('task_id', taskID)

				taskData = {
						created : new Date(data[0].created_at).toLocaleString('en-US', {dateStyle: 'medium', timeStyle:'short'}),
						updated : new Date(data[0].last_updated).toLocaleString('en-US', {dateStyle: 'medium', timeStyle:'short'}),
						title   : data[0].title,
						desc    : data[0].desc,
						frame   : data[0].frame,
						p_name  : data[0].plugin_id.name,
						p_assi  : data[0].plugin_id.assignment ? "Assignment" : "Lesson"
				};

				const {data: work, error: workError} = await supabase
						.from('work')
						.select(`
								view,
								done,
								content,
								note,
								open,
								finish,
								score
						`)
						.eq('task_id', taskID)
						.eq('user_id', userID)

				if (work.length <= 0) {
						const {data: newWork, error: newWorkError} = await supabase
								.from('work')
								.insert([
								{
										task_id : taskID,
										user_id : userID,
								}
								]);

						workData = {
						
						}
				}
				if (taskData.p_assi) {
						const {data: getWork, error: getWorkError} = await supabase
								.from('work')
								.select(`view, done, note, open, finish, content, score, user_id (metadata)`)
								.eq('user_id', userID).eq('task_id', taskID);
						workData = {
								name : getWork[0].user_id.metadata.name,
								view : getWork[0].view,
								done : getWork[0].done,
								note : getWork[0].note,
								open : new Date(getWork[0].open).toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'short'}),
								finish : getWork[0].finish === null ? "Not finished." : new Date(
												getWork[0].finish).toLocaleString('en-US', {dateStyle: 'medium', timeStyle:'short'}),
								content : getWork[0].content,
								score   : getWork[0].score
						};
				} else {
						const {data: getWork, error: getWorkError} = await supabase
								.from('work')
								.select(`view, done, note, open, user_id (metadata)`)
								.eq('user_id', userID).eq('task_id', taskID);
						workData = {
								name : getWork[0].user_id.metadata.name,
								view : getWork[0].view,
								done : getWork[0].done,
								note : getWork[0].note,
								open : new Date(getWork[0].open).toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'short'}),
						};
				};
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
		<div class="p-10 overflow-y-auto h-screen">
				<!-- Header -->
				<div class="mb-8 flex flex-col md:flex-row justify-between">
						<h2 class="text-3xl font-bold">{taskData.title}</h2>
				</div>
		</div>
</div>
