<script>
		let props = $props();
</script>

<div class="max-w-xs overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:bg-slate-300 shadow-xl">
		<div class="h-32 w-full bg-slate-100">
				<img src={props.image} 
						alt="cover" 
						class="h-full w-full object-cover"
				/>
		</div>
		<div class="flex flex-col p-5">
				<h2 class="mb-1 text-xl font-bold text-slate-800">{props.first}</h2>
				<p class="text-md text-black">{props.second}</p>
				<p class="text-sm text-slate-600" style="text-transform : capitalize">{props.third}</p>
				<a href={props.button}
						class="mt-6 w-full rounded-full bg-blue-100 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-200 dark:hover:bg-blue-300 text-center">
						Visit
				</a>
		</div>
</div>

