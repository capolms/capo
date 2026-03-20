<script>
		import Navbar from '$lib/comp/navbar.svelte';
		import Menubar from '$lib/comp/menubar.svelte';
		import { menu_shown } from '$lib/comp/show_menu';
</script>

<div>
		<!-- Main Container -->
		<div class="p-4 overflow-y-auto">
				<!-- Header -->
				<div class="mb-8">
						<h2 class="text-3xl font-bold">TEST</h2>
						<p class="text-gray-500 mt-1 dark:text-white">Welcome to username!</p>
				</div>
				<!-- List of Schools -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
						<div class="shadow rounded-xl">
								<div class="w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
										<div class="relative h-28 bg-slate-700 p-4 text-white">
												<img src="pattern.jpg" class="absolute inset-0 h-full w-full object-cover opacity-40" alt="" />
												<div class="relative z-10">
														<h2 class="text-xl font-semibold leading-tight">6th GRADE DIMAS</h2>
														<p class="text-sm">E LEARNING</p>
														<p class="mt-1 text-xs opacity-90">David Chabdradinata</p>
												</div>
												<div class="absolute -bottom-8 right-4 h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-black shadow-md">
														<img src="avatar.jpg" class="h-full w-full object-cover" alt="Avatar" />
												</div>
										</div>
										<div class="h-16 p-4"></div>
								</div>
						</div>
				</div>
		</div>
</div>
