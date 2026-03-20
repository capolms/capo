<!--

		Library - navbar.svelte.

		Responsible for showing the navbar (sidebar).

-->

<script>
		import { onMount } from 'svelte';
		import { invalidateAll } from '$app/navigation';
		import { menu_shown } from '$lib/comp/show_menu';
		import { theme as themeStore } from '$lib/comp/get_theme';
		import Fa from 'svelte-fa';
		import { faGear, faHouse, faCircleQuestion, faBell, faGlobe, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

		let theme = $state();

		// When on mount, immediately get the latest theme data.
		onMount(() => {
				theme = document.documentElement.getAttribute('data-theme')
		});

		// Change the theme.
		async function changeTheme() {
				// 1. Read directly from the HTML tag data-theme attr.
				const next = theme === 'dark' ? 'light' : 'dark';
				// 2. Modify the HTML tag directly.
				document.documentElement.setAttribute('data-theme', next);
				// 3. Modify the cookie directly.
				document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`;
				theme = next;
				themeStore.set(next);
				// 4. Notify SvelteKit to refresh data without a page reload.
				await invalidateAll();
		};

		let { nonLMSLinks } = $props();

</script>


<!-- Sidebar -->
<div class="{nonLMSLinks ? {$menu_shown} + " sm:hidden" : {$menu_shown}} h-full bg-zinc-100 dark:bg-zinc-700 flex-col overflow-hidden">
		<div class="p-6">
				<h1 class="text-2xl font-bold text-blue-600 dark:text-white whitespace-nowrap">CapoLMS</h1>
				<p class="text-sm text-gray-500 dark:text-white mt-1 whitespace-nowrap">Simple LMS, for you.</p>
    </div>
    <!-- Profile Section -->
		<div class="p-6">
				<div class="flex items-center gap-3">
						<img 
								src="/profile.png" 
								alt="Profile" 
								class="min-w-12 w-12 h-12 rounded-full object-cover whitespace-nowrap"
						/>
						<div>
								<p class="font-semibold text-gray-800 dark:text-white whitespace-nowrap">Emperor Richard</p>
								<p class="text-sm text-gray-500 dark:text-white whitespace-nowrap">Siswa</p>
						</div>
				</div>
		</div>
		<!-- List sections -->
		<nav class="flex-1 p-4 space-y-2">
				<!-- Dashboard -->
				<a href="/dashboard"
						class="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-300 dark:text-white hover:dark:text-black font-medium whitespace-nowrap">
						<Fa icon={faHouse} />{nonLMSLinks ? "Visit" : "Main"} Dashboard</a>
				<!-- Notifications -->
				<a href="/notifications"
						class="{nonLMSLinks ? "hidden sm:" : ""}flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-300 dark:text-white hover:dark:text-black font-medium whitespace-nowrap">
						<Fa icon={faBell} />My Notifications</a>
				<!-- Kelas -->
				<a href="/settings"
			 class="{nonLMSLinks ? "hidden sm:" : ""}flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-300 dark:text-white hover:dark:text-black whitespace-nowrap">
						<Fa icon={faGear} />App Settings</a>
				<!-- Tugas -->
				<a href="/help" class="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-300 dark:text-white hover:dark:text-black whitespace-nowrap">
						<Fa icon={faCircleQuestion} />Help and Support</a>
				<!-- Language -->
				<a class="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-300 dark:text-white hover:dark:text-black whitespace-nowrap">
						<Fa icon={faGlobe} />Change Language</a>
				<!-- Dark/Light Mode -->
				<button on:click={changeTheme}
						class="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-300 dark:text-white hover:dark:text-black whitespace-nowrap">
						<Fa icon={theme === 'dark' ? faSun : faMoon} />{theme === 'dark' ? "Switch to Light" : "Switch to Dark"}
				</button>
				<a class="flex sm:whitespace-nowrap w-full mx-4 py-2 text-xs dark:text-white">
				If you wish to let the system determine your theme, visit settings.</a>
		</nav>
</div>
