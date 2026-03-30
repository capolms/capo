<!--

		layout.svelte

		$effect is for passing the data of data.theme
		to the data-theme attr to actually change the document theme.

		isMobile is for checking whether the document is "Mobile" or not,
		640 is the limit for sm in tailwind.

-->

<script>
		import { get } from 'svelte/store';
		import { page } from '$app/state';
		import { afterNavigate } from '$app/navigation';
		import { slide } from 'svelte/transition';
		import './layout.css';
		import favicon from '$lib/assets/favicon.svg';
		import Navbar from '$lib/comp/navbar.svelte';
		import Menubar from '$lib/comp/menubar.svelte';
		import { menu_shown } from '$lib/comp/show_menu';

		// This is your boolean variable
		// It yields true if the status is 400 or higher
		let isHttpError = $state(page.status >= 400);

		let { data, children } = $props();
		let innerWidth = $state(0);
		let isMobile = $derived(innerWidth <= 640);
		// Several links do not show the same options as the links that are part of the LMS.
		let paths = ['/signup', '/login', '/home', '/help', '/settings',
								'/reset', '/forgot', '/confirm'];
		let nonLMSLinks = $derived(paths.some(path => page.url.pathname.includes(path)));

		if (isHttpError) {nonLMSLinks = true};
		if (page.url.pathname === "/") {nonLMSLinks = true};

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

<div class="flex h-dvh w-full flex-col overflow-hidden p-0">
		<div data-theme="{data.theme}" class="{page.url.pathname === '/' ? 'hidden' : ''}" ><Menubar nonLMSLinks={nonLMSLinks}/></div>
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

<style>
    /* Light mode animated gradient */
    [data-theme="light"] {
        background: linear-gradient(120deg, #fdf6e3, #e0f7fa, #ffefc4);
        background-size: 400% 400%;
        animation: gradientAnimationLight 20s ease infinite;
    }

    /* Dark mode animated gradient */
    [data-theme="dark"] {
        background: linear-gradient(120deg, #202736, #2d3748, #4a5568);
        background-size: 400% 400%;
        animation: gradientAnimationDark 25s ease infinite;
    }

    /* Subtle overlay pattern */
    [data-theme="light"]::before,
    [data-theme="dark"]::before {
        content: "";
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="1" fill="%23ffffff" fill-opacity="0.05"/></svg>');
        z-index: 0;
    }

    /* Animations */
    @keyframes gradientAnimationLight {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    @keyframes gradientAnimationDark {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
</style>
