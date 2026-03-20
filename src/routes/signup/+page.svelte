<script>
		import { onMount } from 'svelte';
		import Fa from "svelte-fa";
		import { faGoogle } from "@fortawesome/free-brands-svg-icons";
		import { theme } from "$lib/comp/get_theme";

		let isReady = false;

		onMount(async () => {
				theme.set(document.documentElement.getAttribute('data-theme'));
				isReady = true;
		});

		// List of variables we have collected.
		let email    = '';
		let username = '';
		let password = '';
		let retype   = '';

		let emailFalse = false;
		let usernameFalse = false;
		let passwordFalse = false;
		let retypeFalse = false;

		let emailUsed = false;
		let usernameUsed = false;

		function signup() {
				// Regex list.
				const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
				const usernameRegex = /^[a-zA-Z0-9_-]{8,}$/;
				if (!emailRegex.test(email)) {
						emailFalse = true;
				} else { emailFalse = false }
				if (!usernameRegex.test(username)) {
						usernameFalse = true;
				} { usernameFalse = false }
				if (!passwordRegex.test(password)) {
						passwordFalse = true;
				} else { passwordFalse = false }
				if (retype !== password || retype === "") {
						retypeFalse = true;
				} else { retypeFalse = false };
		};
</script>

{#if isReady}
<div class="flex flex-row h-full w-full">
		<div class="dark:bg-zinc-700 pl-10 pr-10 flex flex-col w-full sm:w-2/5">
				<div class="flex flex-col items-center justify-center h-screen">
						<h1 class="pb-2 w-full text-2xl font-bold">Sign Up</h1>
						<!-- Inputs -->
						<div class="w-full">
								<p class="pt-4 pb-1">Enter your email:</p>
								<input class="pb-4 pt-4 h-1 w-full rounded-lg dark:text-white bg-zinc-200 dark:bg-zinc-700 dark:border-white"
							 bind:value={email} placeholder="Valid example: your@example.com" />
								<p class="{emailFalse ? '' : 'hidden'} text-sm text-red-600 dark:text-red-400">
								{emailUsed ? "Email has been used." : "Invalid email."}</p>
						</div>
						<div class="w-full">
								<p class="pt-2 pb-1">Enter your username:</p>
								<input class="pb-4 pt-4 h-1 w-full rounded-lg dark:text-white bg-zinc-200 dark:bg-zinc-700 dark:border-white"
							 bind:value={username} placeholder="Minimum eight characters." />
								<p class="{usernameFalse ? '' : 'hidden'} text-sm text-red-600 dark:text-red-400">
								{usernameUsed ? "Username has been used." : "Invalid username."}</p>
						</div>
						<div class="w-full">
								<p class="pt-2 pb-1">Enter your password (minimum eight characters):</p>
								<input type="password" class="pb-4 pt-4 h-1 w-full rounded-lg dark:text-white bg-zinc-200 dark:bg-zinc-700 dark:border-white"
															 bind:value={password} placeholder="With capital letters, numbers, and special characters." />
								<p class="{passwordFalse ? '' : 'hidden'} text-sm text-red-600 dark:text-red-400">Invalid password.</p>
						</div>
						<div class="w-full">
								<p class="pt-2 pb-1">Retype your password:</p>
								<input type="password" class="pb-4 pt-4 h-1 w-full rounded-lg dark:text-white bg-zinc-200 dark:bg-zinc-700 dark:border-white"
															 bind:value={retype} placeholder="Minimum eight characters." />
								<p class="{retypeFalse ? '' : 'hidden'} text-sm text-red-600 dark:text-red-400">
								Retyped password does not match the initial password or is empty.</p>
						</div>
						<!-- Buttons -->
						<div class="w-full mt-4 flex flex-row">
								<a on:click={signup} href="#" class="mr-2 text-center gap-3 h-full w-1/2 py-2 px-2 rounded-xl bg-zinc-200 border-zinc-800 border dark:border-white dark:bg-zinc-700 hover:bg-zinc-800 hover:text-white dark:text-white hover:dark:text-black hover:dark:bg-white font-medium whitespace-nowrap">
										Sign Up</a>
								<a href="/login" class="ml-2 text-center gap-3 h-full w-1/2 py-2 px-2 rounded-xl bg-zinc-200 border-zinc-800 border dark:border-white dark:bg-zinc-700 hover:bg-zinc-800 hover:text-white dark:text-white hover:dark:text-black hover:dark:bg-white font-medium whitespace-nowrap">
								Login</a>
						</div>
								<a href="#" class="flex items-center justify-center w-full text-center gap-3 mt-4 py-2 px-2 rounded-xl border-zinc-800 border dark:border-white dark:bg-zinc-700 hover:bg-zinc-800 hover:text-white dark:text-white hover:dark:text-black hover:dark:bg-white font-medium whitespace-nowrap">
										<Fa icon={faGoogle}/>
								Sign Up with Google</a>
				</div>
		</div>
		<div class="hidden sm:flex h-full w-3/5">
				<img src="/background/signup-{$theme}.svg" alt="signup-background" class="w-full h-full object-cover"/>
		</div>
</div>
{/if}
