<script>
		import "$lib/style/signin.css";
		import { supabase } from "$lib/api/sb";
		import { onMount } from "svelte";
		import { goto } from "$app/navigation";
		import Fa from "svelte-fa";
		import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

		let email        = $state("");
		let touched      = $state(false);
		let error 			 = $state("");
		let success      = $state("");
		let loading      = $state("");

		function validate() {
				error = email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
						? "Invalid email. Use this format: your@example.domain" : "";
		};

		async function reset() {
				if (email === "" || error !== "") {
						touched = true;
						error = "Email has not been filled out."
						return
				};
				
				success = ""
				loading = "Please wait..."
				
				const { data, sbError } = await supabase.auth.resetPasswordForEmail(email, {
						redirectTo: `http://localhost:5173/confirm?next=/forgot/update`
				});

				if (sbError) {
						loading = ""
						error = sbError.message;
				} else {
						error = "";
						loading = "";
						success = "Please check your email (and your spam) for the confirmation email. Expire in one hour.";
				};

		};
</script>

<div class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
		<div class="md:rounded-2xl p-10 w-full md:w-2/4 h-full md:h-auto flex justify-center items-center flex-col bg-white dark:bg-gray-700 text-black dark:text-white">
						<!-- PASSWORD -->
						<div class="relative w-full">
								<!-- EMAIL -->
								<label class="w-full label">Enter the email you use for this account:</label>
								<input
										type="email"
										placeholder="Example: your@example.domain"
										bind:value={email}
										on:input={validate}
										on:blur={() => (touched = true)}
										class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937] {touched.email && errors.email
												? 'border-red-500'
												: ''}"
								/>
						</div>
						{#if touched && error}<p class="error">{error}</p>{/if}
						<div class="flex gap-4 mt-6 w-full flex-col">
								<button on:click={reset} class="text-white dark:text-white btn-primary mt-4 w-full">Send Email to Reset</button>
								<a href="/login"
								class="btn-google hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black mt-4 flex items-center justify-center gap-3">
										<span>Back to Login</span>
								</a>
						</div>
						<p class="mt-2 text-yellow-600">{loading}</p>
						<p class="mt-2 text-green-600">{success}</p>
		</div>
</div>
