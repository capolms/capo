<script>
		import Fa from "svelte-fa";
		import { faBook, faUsers, faChartLine } from "@fortawesome/free-solid-svg-icons";
</script>

<div class="min-h-screen bg-slate-200 text-black dark:bg-gray-900 dark:text-white overflow-hidden relative">
		<!-- HERO SECTION -->
		<div class="flex flex-col items-center justify-center text-center px-10 py-24 min-h-[80vh">
				<!-- LEFT TEXT -->
				<div class="max-w-xl flex flex-col justify-center">
						<h1 class="text-5xl font-bold leading-tight mb-12">Learning Made <span class="text-blue-500">Simple</span></h1>
						<p class="text-gray-600 dark:text-gray-400 mb-4">
								CapoLMS is a simple Learning Management System
								that is easy to use, smooth in terms of experience, and efficient in management.
						</p>
						<div class="flex gap-4 justify-center mt-20 mb-6">
								<a class="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition shadow-lg" href="/login">
										Get Started</a>
								<button
								class="px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black transition">
										Learn More</button>
						</div>
				</div>
				<!-- RIGHT VISUAL -->
				<div class="relative mt-10 lg:mt-0">
						<div class="w-80 h-80 bg-blue-200/40 dark:bg-blue-500/20 rounded-full blur-3xl absolute"></div>
						<div class="w-72 h-72 bg-gray-300/40 dark:bg-purple-500/20 rounded-full blur-3xl absolute left-10 top-10"></div>
				</div>
		</div>

		<!-- FEATURES -->
		<div class="px-10 py-12">
				<h2 class="text-3xl font-bold mb-10 text-center">Why CapoLMS?</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						<!-- FEATURE 1 -->
						<div class="dark:bg-slate-700 p-6 rounded-xl hover:shadow-xl transition group bg-slate-300">
								<div class="text-blue-400 mb-4"><Fa icon={faBook} size="lg" /></div>
								<h3 class="text-xl font-semibold mb-2 text-black dark:text-white">Easy Learning</h3>
								<p class="text-black dark:text-gray-300">
										Access lessons and tasks in an organized manner.
								</p>
						</div>
						<!-- FEATURE 2 -->
						<div class="dark:bg-gray-700 p-6 rounded-xl hover:shadow-xl transition group bg-slate-300">
								<div class="text-blue-400 mb-4"><Fa icon={faUsers} size="lg" /></div>
								<h3 class="text-xl font-semibold mb-2">Collaborative</h3>
								<p class="text-black dark:text-gray-400">
										Teachers can rate, comment, and manage the class easily.
								</p>
						</div>
						<!-- FEATURE 3 -->
						<div class="dark:bg-gray-700 p-6 rounded-xl hover:shadow-xl transition group bg-slate-300">
								<div class="text-blue-400 mb-4"><Fa icon={faChartLine} size="lg" /></div>
								<h3 class="text-xl font-semibold mb-2">Track Progress</h3>
								<p class="text-black dark:text-gray-400">
										Live features for tracking progresses.
								</p>
						</div>
				</div>
		</div>
		<!-- CTA -->
		<div class="text-center py-16">
				<h2 class="text-3xl font-bold mb-4">Start Your Learning Journey Today</h2>
				<p class="text-black dark:text-gray-400 mb-6">
						Sign up now for the simplest learning experience.
				</p>
				<a class="px-8 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition shadow-lg" href="/login">
						Join Now</a>
		</div>
</div>
