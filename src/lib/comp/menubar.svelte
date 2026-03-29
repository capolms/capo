<!--

		Library - menubar.svelte.

		Responsible for showing the navbar.

-->

<script>
		import { onMount } from 'svelte';
		import { invalidateAll } from '$app/navigation';

		import { menu_shown, show_menu } from '$lib/comp/show_menu';
		import { theme as themeStore } from '$lib/comp/get_theme';

		import Fa from 'svelte-fa';
		import { faBars, faCircleQuestion, faMoon,
				faSun, faGlobe, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

		let theme = $state(); // Initiate the theme holding as a reactive variable.

		// When on mount, immediately get the latest theme data.
		onMount(() => {
				theme = document.documentElement.getAttribute('data-theme');
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

<div class="bg-zinc-300 dark:bg-gray-950 dark:text-white flex flex-row justify-between pl-5 pr-5 pt-2 pb-2">
		<div class="flex justify-center">
				<a class="pl-2 pr-2 mt-2 mb-2" href="/home">CapoLMS</a>
				<a class="{nonLMSLinks ? "hidden sm:flex" : "hidden"} pl-2 pr-2 mt-2 mb-2" href="/dashboard">
						Visit Dashboard</a>
				<a class="{nonLMSLinks ? "hidden sm:flex" : "hidden"} pl-2 pr-2 mt-2 mb-2" href="/help">Help</a>
		</div>
		<div class="flex justify-center">
				<a class="{nonLMSLinks ? "hidden sm:flex" : "hidden"} items-center gap-3 px-4 py-2 rounded-xl hover:bg-zinc-800 hover:text-white dark:text-white dark:hover:bg-white hover:dark:text-black whitespace-nowrap">
						<Fa icon={faGlobe} />Language</a>
				<button on:click={changeTheme}
		class="w-full {nonLMSLinks ? "hidden sm:flex" : "hidden"} items-center gap-3 px-4 py-2 rounded-xl hover:bg-zinc-800 hover:text-white dark:text-white dark:hover:bg-white hover:dark:text-black whitespace-nowrap">
						<Fa icon={theme === 'dark' ? faSun : faMoon} />{theme === 'dark' ? "Switch to Light" : "Switch to Dark"}
				</button>
				<a on:click={show_menu} href="#"
		class="{nonLMSLinks ? "flex sm:hidden" : "flex"} items-center gap-3 px-4 py-2 rounded-xl hover:bg-zinc-800 hover:text-white dark:text-white dark:hover:bg-white hover:dark:text-black font-medium whitespace-nowrap">
						{#if $menu_shown === "hidden"}
								<Fa icon={faBars} />
						{:else}
								<Fa icon={faArrowLeft} />
						{/if}
						<p class="hidden md:block">{$menu_shown === "hidden" ? "Show Menu" : "Hide Menu"}</p>
				</a>
		</div>

</div>
