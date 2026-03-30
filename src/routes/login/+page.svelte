<script>

		import { onMount } from 'svelte';
		import { goto } from '$app/navigation';

		import "$lib/style/signin.css";

		import { supabase } from "$lib/api/sb";
		import Fa from "svelte-fa";
		import { faGoogle } from "@fortawesome/free-brands-svg-icons";
		import { theme } from "$lib/comp/get_theme";
		import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

		// For auth.
		let isReady = $state(false);
		onMount(async () => {
				const { data: { session }, error } = await supabase.auth.getSession()
				if (session) {
						goto('/dashboard', { replaceState : true});
				} else {
						isReady = true;
				};
		});

		// variables for checking.
		let email = "";
		let password = "";
		let showPassword = $state(false); // idk why but not using $state fucks this up
		let touched = {
				email: false,
				password: false,
		};
		let errors = $state("");

		let loading = $state("");

		let formalAuthErrors = {
				"validation_failed" : "Missing email and/or password.",
				"invalid_credentials" : "Wrong email and/or password."
		};

		async function processData() {
				errors  = "";
				loading = "Processing data...";
				const { data, error } = await supabase.auth.signInWithPassword({
						email : email,
						password : password
				});
				if (error) {
						loading = ""
						errors = formalAuthErrors[error.code];
				} else {
						goto('/dashboard', {replaceState : true});
				};
		};

</script>


<div class="{isReady ? "hidden" : "flex items-center justify-center h-screen"}">
		<p class="text-2xl">Loading...</p>
</div>

<div class="{isReady ? "flex" : "hidden"} h-full bg-white dark:bg-gray-900 text-black dark:text-white relative overflow-hidden">
		<!-- LEFT FORM -->
		<div class="h-full w-full md:w-1/2 h-screen flex items-center justify-center bg-zinc-200 dark:bg-gray-800/80 backdrop-blur-md relative z-10 border-r border-white/10">
				<div class="h-full w-full pb-20 px-10 md:px-20 flex flex-col justify-center items-center">
						<h1 class="text-3xl font-bold mb-3 w-full">Login</h1>
						<!-- USERNAME -->
						<label class="label w-full">Enter your email:</label>
						<input
								type="text"
								placeholder="Enter your email."
								bind:value={email}
								on:blur={() => (touched.email = true)}
								class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937] "
						/>
						<!-- PASSWORD -->
						<label class="label w-full">Enter your password:</label>
						<div class="relative w-full">
								<input
										type={showPassword ? "text" : "password"}
										placeholder="Enter the correct password."
										bind:value={password}
										on:blur={() => (touched.password = true)}
										class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937] pr-10"
								/>
								<button type="button" class="eye-btn" on:click={() => (showPassword = !showPassword)}>
												<Fa icon={showPassword ? faEyeSlash : faEye} /></button>
						</div>
						<p class="mt-2 text-yellow-600 w-full">{loading}</p>
						{#if errors}<p class="error">{errors}</p>{/if}
						<!-- BUTTONS -->
						<div class="flex gap-4 mt-6 w-full">
								<button on:click={processData} class="text-white dark:text-white btn-primary">Login</button>
								<a class="btn-secondary hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black text-center" href="/signup">
										Sign Up</a>
						</div>
						<a href="/forgot"
								class="btn-google hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black mt-4 flex items-center justify-center gap-3">
								<span>I Forgot My Password</span>
						</a>

				</div>
		</div>
		
		<div class="dark:bg-gray-800 hidden md:block absolute left-1/2 top-0 w-40 pointer-events-none z-20 fade-edge"></div>
				<!-- RIGHT VISUAL -->
				<div class="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden bg-right">
						<!-- SHAPE LAYER -->
						<div class="shape shape1"></div>
						<div class="shape shape2"></div>
						<div class="shape shape3"></div>
						<!-- CONTENT -->
						<div class="relative text-center px-20 z-10">
								<h2 class="text-4xl font-bold mb-4">CapoLMS</h2>
								<p class="opacity-80">
										Platform pembelajaran modern untuk siswa dan guru. Belajar jadi
										lebih mudah, rapi, dan terorganisir.
								</p>
						</div>
				</div>
</div>
