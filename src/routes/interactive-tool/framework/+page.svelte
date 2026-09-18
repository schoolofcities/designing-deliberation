<script>
    import FrameworkTool from "$lib/FrameworkTool.svelte";
    import HeaderBar from "$lib/HeaderBar.svelte";

    let userState = $state([]);
</script> 

<svelte:head>
	<title>Designing Deliberation - Interactive Framework Tool</title>
</svelte:head>

<HeaderBar page={"Framework Builder"}/>

<main>
    <FrameworkTool userState={userState}/>
</main>

<style>
    main { padding: 34px 40px 80px; max-width: 1500px; }
</style>