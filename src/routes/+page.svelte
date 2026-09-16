<script>
	import HeaderBar from '$lib/HeaderBar.svelte';
	import '../assets/global-styles.css'; 

</script>


<svelte:head>

<title>Designing Deliberation</title>

</svelte:head>

<HeaderBar/>
<div class="page">
	<h1>Designing Deliberation</h1>
	<p>This will be copy explaining the framework. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	<div class="level-choices">
		<button class="choice-box beginner">
			<h2> I am a beginner</h2>
			<p>Guide me through the process step-by-step!</p>
		</button>

		<button class="choice-box experienced">
			<h2> I have experience doing this! </h2>
			<p>Take me directly to the framework builder tool!</p>
		</button>
	</div>
</div>

<style>
	.page {
		max-width: 1500px;
		width: 95%;
		padding-left: calc((100dvw - min(95%, 1500px))/2);
		padding-top: 40px;
	}

	.level-choices {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.choice-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40px;
		box-sizing: border-box;
		width: 35%;
		background-color: var(--l2);
		border: none;
		border-radius: 5px;
	}

	.choice-box:hover {
		cursor: pointer;
		opacity: 80%;
	}

</style>

