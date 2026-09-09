<script>
    import Button from "$lib/framework-tool/Button.svelte";
    import FunctionalQuestion from "$lib/framework-tool/FunctionalQuestion.svelte";
    import ProgressMenu from "$lib/framework-tool/ProgressMenu.svelte";
    import RadioButtons from "$lib/framework-tool/RadioButtons.svelte";
    import SectionHeader from "$lib/framework-tool/SectionHeader.svelte";
    import SelectCards from "$lib/framework-tool/SelectCards.svelte";
    import TierToggle from "$lib/framework-tool/TierToggle.svelte";
    import HeaderBar from "$lib/HeaderBar.svelte";

    import { tiers, presets, presetTiers } from "$lib/framework-tool/tiersAndPresets";
    import WideOptions from "$lib/framework-tool/WideOptions.svelte";
    import Diagram from "$lib/framework-tool/Diagram.svelte";

    let userState = $state([
        {
            hasPreset: false,
            selected: [],
        }
    ]);
    tiers.forEach((tier, index) => {
        userState.push({
            toggled: userState[0].hasPreset ? preset[index].toggled : tier.defaultToggled,
            disposition: userState[0].hasPreset ? preset[index].disposition : null,
            selected: userState[0].hasPreset ? preset[index].selected : [],
            customComponent: userState[0].hasPreset ? (preset[index].customComponent ?? null) : null,
            branch: null,
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    let currentUserState = $derived(userState[currentTierIndex]);

    let selected = $state();

    let disposition = $state();

    let startingPoint = $state("");
    let presetName = $state([]);
    let preset = $derived.by(() => {
        if (presetName.length == 1) {
            return presetTiers[presetName[0]];
        } else {
            return [];
        }
    })

    let showPresets = $state(false);

    const hydratePreset = () => {
        userState[0].hasPreset = true;
        preset.forEach((tier, index) => {
            userState[index + 1].toggled = preset[index].toggled;
            userState[index + 1].branch = preset[index].branch;
            userState[index + 1].selected = preset[index].selected;
        })
    }

</script>


<svelte:head>

<title>Designing Deliberation - Framework Builder Tool</title>

</svelte:head>

<HeaderBar page="Interactive Tool"/>

<main>
    <ProgressMenu bind:currentTierIndex progress={userState}/>

    <div class="right">
        {#if currentTierIndex == 0}
            {#if !showPresets}
                <h1>Choose a Starting Point</h1>
                <WideOptions bind:selected={startingPoint}/>
            {:else}
                <h1>Preset Framework Templates</h1>
                <SelectCards components={presets} hasCustom={false} max=1 bind:selected={presetName}/>
            {/if}
            <Button type="continue" disabled={!startingPoint || (showPresets && presetName.length != 1)} clickFunction={() => {
                if (startingPoint == "preset" && !showPresets) {
                    showPresets = true;
                } else {
                    if (startingPoint == "preset") {
                        hydratePreset();
                    } else {
                        presetName = [];
                        userState[0].hasPreset = false;
                    }
                    showPresets = false;
                    moveToNextTier();
                }
            }}/>
        {:else if currentTierIndex <= tiers.length}
            <div class="header">
                <h1>{currentTier.title}</h1>
                {#if userState[0].hasPreset}
                    <h2 class="pill">{presetName[0]}</h2>
                {/if}
            </div>
            {#if currentTier.branch}
                <div class="tier-toggle">
                    <p class="branch-description">This branching point puts your framework into one of two process families, that dictates the available components.</p>
                    <TierToggle bind:tierToggled={currentUserState.toggled} hasPreset={userState[0].hasPreset} recommendedOn={currentTier.defaultToggled}/>   
                </div>
                {#if currentUserState.toggled} 
                    <RadioButtons values={["Cascade", "Options"]} bind:selected={currentUserState.branch}/>
                    {#if currentUserState.branch == null}
                        <p>Choose a branch to continue</p>
                    {:else}
                        <SelectCards
                            components={currentTier.components[currentUserState.branch]}
                            max={currentTier.max}
                            bind:selected={currentUserState.selected}
                            bind:customComponent={currentUserState.customComponent}
                        />
                    {/if}
                    <Button type="continue" disabled={currentUserState.selected.length == 0 } clickFunction={moveToNextTier}/>
                {:else}
                    <Button type="continue" clickFunction={moveToNextTier}/>
                {/if}
            {:else}
                <div class="tier-toggle">
                    <FunctionalQuestion question={currentTier.question}/>
                    <TierToggle bind:tierToggled={currentUserState.toggled} hasPreset={userState[0].hasPreset} recommendedOn={currentTier.defaultToggled} presetOn={userState[0].hasPreset ? preset[currentTierIndex - 1].toggled : null}/>   
                </div>
                {#if currentUserState.toggled}
                    <SectionHeader section="Input Openness" recommended={currentTier.recommendedDisposition}/>
                    <RadioButtons bind:selected={currentUserState.disposition}/>

                    <SectionHeader section="Components" max={currentTier.max}/>
                    <SelectCards
                        components={currentTier.components}
                        max={currentTier.max}
                        bind:selected={currentUserState.selected}
                        bind:customComponent={currentUserState.customComponent}
                    />
                    <Button type="continue" disabled={currentUserState.selected.length == 0 || !currentUserState.disposition} clickFunction={moveToNextTier}/>
                {:else}
                    <Button type="continue" clickFunction={moveToNextTier}/>
                {/if}
            {/if}
        {:else}
            <h1>Your {presetName[0]} Framework Diagram</h1>
            <Diagram userState={userState}/>
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
        margin-bottom: 0;
    }

    .tier-toggle {
        display: flex;
        flex-direction: row;
        gap: 18px;
        align-items: center;
        margin-bottom: 20px;
    }

    .right {
        width: 100%;
    }

    .branch-description {
        width: 50dvw;
        max-width: 350px;
        margin: 0;
        padding: 0;        
    }

    
    .pill {
        letter-spacing: .06em; 
        text-transform: uppercase;    
        background: var(--pine); 
        color: var(--paper); 
        font-size: 18px;
        padding: 8px 12px; 
        border-radius: 999px;
        font-weight: 600;
        width: fit-content;
        height: fit-content;
    }

    .header {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 15px;
        margin-bottom: 15px;
    }

    @media (max-width: 950px) {
        .tier-toggle {
            flex-direction: column;
            gap: 18px;
            align-items: flex-start;
        }
    }
</style>
