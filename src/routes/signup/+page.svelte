<script>
		import { onMount } from "svelte";

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
		let email = $state("");
		let name = $state("");
		let password = $state("");
		let confirmPassword = $state("");
		let showPassword = $state(false);
		let showConfirm = $state(false);
		let touched = $state({
				email: false,
				password: false,
				name: false,
				confirm: false,
		});
		let errors = $state({
				email: "",
				name: "",
				password: "",
				confirm: "",
		});
		function validate() {
				errors.email = email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
						? "Invalid email. Use this format: your@example.domain" : "";

				errors.password = password === "" || !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)
						? "Minimum 8 letters, one capital letter, one number, and one symbol."
						: "";
				errors.confirm = confirmPassword && password !== confirmPassword
						? "Password does not match."
						: "";
				errors.name = name === "" ? "Name has not been filled out." : "";
		};
		async function createAccount() {
				if (email === "") {
						touched.email = true;
						errors.email = "Email has not been filled out."
				};
				if (password === "") {
						touched.password = true;
						errors.password = "Password has not been filled out."
				};
				if (name === "") {
						touched.name = true;
						errors.name = "Name has not been filled out."
				};
				if (errors.email === "" && errors.password === "" && errors.confirm === "") {
						const { data, error } = await supabase.auth.signUp({
								email: email,
								password: password,
								options: {
										data: {
												name: name
										}
								}
						});
				};
		};

</script>

<div class="{isReady ? "hidden" : "flex items-center justify-center h-screen"}">
		<p class="text-2xl">Loading...</p>
</div>

<div class="{isReady ? "flex" : "hidden"} h-full flex bg-white dark:bg-gray-900 text-black dark:text-white relative overflow-hidden">
		<!-- LEFT FORM -->
		<div class="h-full w-full md:w-1/2 h-screen flex items-center justify-center bg-zinc-200 dark:bg-gray-800/80 backdrop-blur-md relative z-10 border-r border-white/10">
				<div class="flex flex-col h-full w-full px-10 md:px-20 py-5 md:pb-20 items-center justify-center">
						<h1 class="w-full text-3xl font-bold mb-2">Sign Up</h1>
						<!-- EMAIL -->
						<label class="w-full label">Enter your email:</label>
						<input
								type="email"
								placeholder="Example: your@example.domain"
								bind:value={email}
								on:input={validate}
								on:blur={() => (touched.email = true)}
								class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937] {touched.email && errors.email
										? 'border-red-500'
										: ''}"
						/>
						{#if touched.email && errors.email}<p class="error">{errors.email}</p>{/if}
								<!-- Name -->
						<label class="w-full label">Enter your name:</label>
						<input
								type="text"
								placeholder="Enter your name here."
								bind:value={name}
								on:input={validate}
								on:blur={() => (touched.name = true)}
								class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937] {touched.email && errors.email
										? 'border-red-500'
										: ''}"
				/>
								{#if touched.name && errors.name}<p class="error">{errors.name}</p>{/if}
						<!-- PASSWORD -->
						<label class="w-full label">Enter your password:</label>
						<div class="relative w-full">
								<input
										type={showPassword ? "text" : "password"}
										placeholder="Use strong passwords."
										bind:value={password}
										on:input={validate}
										on:blur={() => (touched.password = true)}
										class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937]"
								/>
										<button type="button" class="eye-btn" on:click={() => (showPassword = !showPassword)}>
												<Fa icon={showPassword ? faEyeSlash : faEye} /></button>
						</div>
								{#if touched.password && errors.password}<p class="error">{errors.password}</p>{/if}
						<!-- CONFIRM -->
						<label class="w-full label">Retype your password:</label>
						<div class="relative w-full">
								<input
										type={showConfirm ? "text" : "password"}
										placeholder="Repeat your password."
										bind:value={confirmPassword}
										on:input={validate}
										on:blur={() => (touched.confirm = true)}
										class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937]  pr-10"
								/>
								<!-- 👁️ ICON -->
								<button type="button" class="eye-btn" on:click={() => (showConfirm = !showConfirm)}>
										<Fa icon={showConfirm ? faEyeSlash : faEye} />
								</button>
						</div>
						{#if touched.confirm && errors.confirm}<p class="error">{errors.confirm}</p>{/if}
						<!-- BUTTONS -->
						<div class="flex flex-col md:flex-row gap-4 mt-3 w-full">
								<button on:click={createAccount} class="text-white dark:text-white btn-primary">Sign Up</button>
								<a class="btn-secondary hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black text-center" href="/login">
										Login</a>
						</div>
				</div>
		</div>
		
		<div class="hidden md:block absolute left-1/2 top-0 w-40 pointer-events-none z-20 fade-edge"></div>
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
