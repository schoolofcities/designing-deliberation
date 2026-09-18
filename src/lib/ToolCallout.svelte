<script>
    import StraightArrow from "./icons/StraightArrow.svelte";

    let {
        page = "Concept Library"
    } = $props();

    let calloutText = $state("");
    let suggestedNextInfo = $state("")

    switch(page) {
        case "Case Studies":
            calloutText = "Learn more about the terms used in these case studies by visiting the Concept Library!";
            suggestedNextInfo = "Concept Library";
            break;
        case "Concept Library":
            calloutText = "Browse a curated list of resources for more information!";
            suggestedNextInfo = "Resources";
            break;
        case "Resources":
            calloutText = "Take a look through our case studies for inspiration!"
            suggestedNextInfo = "Case Studies"
            break;
        default:
            calloutText = "Ready to make your own strategy and framework?"
    } 
</script>


<div class="container">
    <h2>What do you want to do next?</h2>
    <div class="columns">
        <div class="left">
            <p>{calloutText}</p>
            <a class="info link" href="/designing-deliberation/{suggestedNextInfo.toLowerCase().replaceAll(" ", "-")}"><StraightArrow back={true}/> Go to {suggestedNextInfo} </a>
        </div>
        <div class="right">
            <p>Ready to make your own strategy and framework?</p>
            <a class="tool link" href="/designing-deliberation/interactive-tool">Go to the interactive tool <StraightArrow/></a>
        </div>
    </div>
</div>

<style>
    .container {
        width: 90%;
        border: 1px solid var(--line);
        border-radius: var(--r);
        padding: 20px 22px;
        background: white;
        border-left: 5px solid var(--line);
        margin-top: 8px;
    }

    h2 {
        margin-bottom: 15px;
    }

    .columns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
    }

    .container p {
        font-weight: 600;
        margin: 0;
        margin-bottom: 10px;
    }

    .link {
        border-radius: 50px;
        color: white;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 10px 20px;
        width: fit-content;
        text-decoration: none;
    }

    .tool.link {
        background-color: var(--pine);
    }

    .info.link {
        background-color: var(--clay);
    }
    
    .link:hover {
        opacity: 75%;
    }

    .right {
        display: flex;
        flex-direction: column;
        align-items: end;
    }
</style>