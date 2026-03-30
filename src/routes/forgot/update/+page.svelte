<script>
		import "$lib/style/signin.css";
		import { supabase } from "$lib/api/sb";
		import { onMount } from "svelte";
		import { goto } from "$app/navigation";
		import Fa from "svelte-fa";
		import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

		let password       = $state("");
		let confirm        = $state("");
		let view           = $state("");
		let touched        = $state(false);
		let error 			   = $state("");
		let confirmError   = $state(false);
		let confirmTouched = $state(false);
		let showConfirm    = $state(false);
		let success        = $state("");
		let loading        = $state("");
		let failedPasswordChange = $state("");

		function validate() {
				error = password === "" || !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)
						? "Minimum 8 letters, one capital letter, one number, and one symbol."
						: "";
				confirmError = confirm === "" || confirm !== password
						? "Please match the password."
						: "";
		};

		async function reset() {
				if (password === "") {
						touched = true;
						error = "Password has not been filled out."
						return
				};
				if (confirm === "") {
						confirmTouched = true;
						confirmError = "Password has not been retyped."
				};

				if (error !== "" || confirmError !== "") {
						return
				};
				
				success = ""
				loading = "Please wait..."
				
				const { data, sbError } = await supabase.auth.updateUser({
						password : password
				});

				if (sbError) {
						loading = ""
						failedPasswordChange = sbError.message;
				} else {
						failedPasswordChange = "";
						loading = "";
						success = "Password has been changed.";
						goto('/dashboard', {replaceState : true})
				};
		};
</script>

<div class="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
		<div class="md:rounded-2xl p-10 w-full md:w-2/4 h-full md:h-auto flex justify-center items-center flex-col bg-white dark:bg-gray-700 text-black dark:text-white">
				<!-- PASSWORD -->
				<label class="w-full label">Enter your password:</label>
				<div class="relative w-full">
						<input
								type={view ? "text" : "password"}
								placeholder="Use strong passwords."
								bind:value={password}
								on:input={validate}
								on:blur={() => (touched = true)}
								class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937]"
						/>
								<button type="button" class="eye-btn" on:click={() => (view = !view)}>
										<Fa icon={view ? faEyeSlash : faEye} /></button>
				</div>
						{#if touched && error}<p class="error">{error}</p>{/if}
				<!-- CONFIRM -->
				<label class="w-full label">Retype your password:</label>
				<div class="relative w-full">
						<input
								type={showConfirm ? "text" : "password"}
								placeholder="Repeat your password."
								bind:value={confirm}
								on:input={validate}
								on:blur={() => (confirmTouched = true)}
								class="input text-black dark:text-white bg-slate-200 dark:bg-[#1f2937]  pr-10"
						/>
						<!-- 👁️ ICON -->
						<button type="button" class="eye-btn" on:click={() => (showConfirm = !showConfirm)}>
								<Fa icon={showConfirm ? faEyeSlash : faEye} />
						</button>
				</div>
				{#if confirmTouched && confirmError}<p class="error">{confirmError}</p>{/if}
				<div class="flex gap-4 mt-6 w-full flex-col">
						<button on:click={reset} class="text-white dark:text-white btn-primary mt-4 w-full">Set New Password</button>
						<a href="/login"
						class="btn-google hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black mt-4 flex items-center justify-center gap-3">
								<span>Cancel Password Change</span>
						</a>
				</div>
				<p class="error">{failedPasswordChange}</p>	
				<p class="mt-2 text-yellow-600">{loading}</p>
				<p class="mt-2 text-green-600">{success}</p>
		</div>
</div>
