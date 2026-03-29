<script>
	import { page } from '$app/state';
</script>

<div class="w-full h-full justify-center items-center text-center flex flex-col">
		<h1 class="text-4xl mb-4">{page.status}</h1>
		<h1>{page.error.message}</h1>
</div>
