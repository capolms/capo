<!--

		layout.svelte

		$effect is for passing the data of data.theme
		to the data-theme attr to actually change the document theme.

		isMobile is for checking whether the document is "Mobile" or not,
		640 is the limit for sm in tailwind.

-->

<script>
		import { get } from 'svelte/store';
		import { page } from '$app/stores';
		import { afterNavigate } from '$app/navigation';
		import { slide } from 'svelte/transition';
		import './layout.css';
		import favicon from '$lib/assets/favicon.svg';
		import Navbar from '$lib/comp/navbar.svelte';
		import Menubar from '$lib/comp/menubar.svelte';
		import { menu_shown } from '$lib/comp/show_menu';

		let { data, children } = $props();
		let innerWidth = $state(0);
		let isMobile = $derived(innerWidth <= 640);
		// Several links do not show the same options as the links that are part of the LMS.
		let paths = ['/signup', '/login', '/home', '/help', '/settings'];
		let nonLMSLinks = $derived(paths.includes($page.url.pathname));

		// If mobile is true, and the menu is opened, close the menu for comfort.
		// But if mobile ain't true, and it is a LMS link, keep the menu open.
		afterNavigate(() => {
				if (isMobile && get(menu_shown) === "flex") {
						menu_shown.update(current => {
								return current === 'flex' ? 'hidden' : 'flex';
						});
				};
				if (!isMobile && !nonLMSLinks) {
						menu_shown.update(current => {
								return "flex";
						});
				};
		});
		// If there is a change of the theme, update it.
		$effect(() => {
				const theme = data.theme;
				if (theme) {
						document.documentElement.setAttribute('data-theme', theme);
				};
		});
</script>

<svelte:head>
		<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window bind:innerWidth />

<div class="h-dvh w-full flex flex-col overflow-hidden p-0">
		<div data-theme="{data.theme}" ><Menubar nonLMSLinks={nonLMSLinks}/></div>
		<div  data-theme="{data.theme}" class="flex-1 flex overflow-y-auto">
				{#if $menu_shown !== 'hidden'}
						<div  data-theme="{data.theme}" class="{isMobile && $menu_shown === 'flex' ? 'w-full' : '' } overflow-hidden"
								transition:slide={{axis: 'x', duration: 500}}>
								<Navbar class="{nonLMSLinks ? {$menu_shown} + " sm:hidden" : {$menu_shown}}"
										nonLMSLinks={nonLMSLinks} isMobile={isMobile}/>
						</div>
				{/if}
				<main data-theme="{data.theme}" class="flex-1 overflow-y-auto bg-zinc-200 dark:bg-zinc-600 dark:text-white">
						{@render children()}
				</main>
		</div>
</div>
