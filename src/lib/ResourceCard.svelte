<script>
	import ExternalLink from '$lib/icons/ExternalLink.svelte';
    
    let {
        name,
        link,
        description
    } = $props();
</script>

<div class="card">
    <a href={link} target="_blank">
        <div class="title">
            <h2>{name}</h2>
            <ExternalLink size="15" fill={"var(--pine)"}/>
        </div>
    </a>
    <p>{description}</p>
</div>

<style>
    .card {
        background-color: #fff;
        width: 200px;
        height: 150px;
        border: 1px solid var(--line);
        border-radius: var(--r-sm);
        padding: 0 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
    }

    .card .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        opacity: 80%;
    }

    p {
        margin: 0;
    }
</style>