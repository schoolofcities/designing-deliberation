<script>
    import Button from "$lib/framework-tool/Button.svelte";
    import FunctionalQuestion from "$lib/framework-tool/FunctionalQuestion.svelte";
    import ProgressMenu from "$lib/framework-tool/ProgressMenu.svelte";
    import RadioButtons from "$lib/framework-tool/RadioButtons.svelte";
    import SectionHeader from "$lib/framework-tool/SectionHeader.svelte";
    import SelectCards from "$lib/framework-tool/SelectCards.svelte";
    import TierToggle from "$lib/framework-tool/TierToggle.svelte";
    import HeaderBar from "$lib/HeaderBar.svelte";

    import { tiers } from "$lib/framework-tool/tiers";

    let userState = $state([
        {
            hasPreset: false,
            selected: [],
        }
    ]);
    tiers.forEach((tier, index) => {
        userState.push({
            toggled: tiers[0].hasPreset ? preset[index].toggled : tier.defaultToggled,
            disposition: tiers[0].hasPreset ? preset[index].disposition : null,
            selected: tiers[0].hasPreset ? preset[index].selected : [],
        })
    })

    let currentTierIndex = $state(0);
    let currentTier = $derived.by(() => {
        if (currentTierIndex >= 1 && currentTierIndex <= tiers.length) {
            console.log(tiers[currentTierIndex - 1].max);
            return tiers[currentTierIndex - 1];
        } 
    });

    const moveToNextTier = () => {
        currentTierIndex += 1;
        tierToggled = currentTier.defaultToggled;
    }

    let currentUserState = $derived(userState[currentTierIndex]);

    let selected = $state();

    let disposition = $state();

    let tierToggled = $state(false);

    let hasPreset = false;
</script>


<svelte:head>

<title>Designing Deliberation - Framework Builder Tool</title>

</svelte:head>

<HeaderBar page="Interactive Tool"/>

<main>
    <ProgressMenu bind:currentTierIndex progress={userState}/>

    <div class="right">
        {#if currentTierIndex == 0}
            <p>tutorial</p>
            <Button type="continue" clickFunction={() => {
                currentTierIndex += 1;
                tierToggled = currentTier.defaultToggled;
            }}/>
        {:else if currentTierIndex <= tiers.length}
            <h1>{currentTier.title}</h1>
            <div class="tier-toggle">
                <FunctionalQuestion question={currentTier.question}/>
                <TierToggle bind:tierToggled hasPreset={userState[0].hasPreset} recommendedOn={currentTier.defaultToggled}/>   
            </div>
            {#if tierToggled}
                <SectionHeader section="Input Openness" recommended={currentTier.recommendedDisposition}/>
                <RadioButtons bind:selected={currentUserState.disposition}/>

                <SectionHeader section="Components" max={currentTier.max}/>
                <SelectCards components={currentTier.components} max={currentTier.max} bind:selected={currentUserState.selected}/>
                <Button type="continue" disabled={currentUserState.selected.length == 0 || !currentUserState.disposition} clickFunction={moveToNextTier}/>
            {:else}
                <Button type="continue" clickFunction={moveToNextTier}/>
            {/if}
        {:else}
            <p> output pages </p>
            
        {/if}
    </div>
</main>

<style>
    main {
        padding: 20px;
        display: flex;
        flex-direction: row;
        gap: 26px;
    }

    h1 {
        margin-bottom: 10px;
    }

    .tier-toggle {
        display: flex;
        flex-direction: row;
        gap: 18px;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
