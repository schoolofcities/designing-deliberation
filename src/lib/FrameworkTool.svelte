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

    let {
        finished = $bindable(false),
        userState = $bindable([]),
    } = $props();

    const isValidUserState =
        Array.isArray(userState) &&
        userState.length === tiers.length + 1 &&
        userState[0] &&
        typeof userState[0] === "object" &&
        "hasPreset" in userState[0];

    if (!isValidUserState) {
        userState = [
            {
                hasPreset: false,
                presetName: [],
                currentTierIndex: 0,
            }
        ];

        tiers.forEach((tier, index) => {
            userState.push({
                toggled: userState[0].hasPreset ? preset[index].toggled : tier.defaultToggled,
                disposition: userState[0].hasPreset ? preset[index].disposition : null,
                selected: userState[0].hasPreset ? preset[index].selected : [],
                customComponent: userState[0].hasPreset ? (preset[index].customComponent ?? null) : null,
                branch: null,
            })
        })
    } else if (userState[0].currentTierIndex === undefined) {
        // Older saved states may predate currentTierIndex tracking.
        userState[0].currentTierIndex = 0;
    }

    let currentTierIndex = $state(userState[0].currentTierIndex);
    let currentTier = $derived.by(() => {
        if (currentTierIndex >= 1 && currentTierIndex <= tiers.length) {
            return tiers[currentTierIndex - 1];
        } 
    });

    $effect(() => {
        userState[0].currentTierIndex = currentTierIndex;
    });

    const moveTier = (amount) => {
        currentTierIndex += amount;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (currentTierIndex > tiers.length) {
            finished = true
        }
    }

    let currentUserState = $derived(userState[currentTierIndex]);

    let startingPoint = $state(userState[0].hasPreset ? "preset" : (isValidUserState ? "scratch" : ""));

    let preset = $derived.by(() => {
        if (userState[0].presetName.length == 1) {
            return presetTiers[userState[0].presetName[0]];
        } else {
            return [];
        }
    })

    let lastSeenBranch = {};

    $effect(() => {
        const idx = currentTierIndex;
        const branch = userState[idx]?.branch;

        if (lastSeenBranch[idx] !== undefined && lastSeenBranch[idx] !== branch) {
            userState[idx].selected = [];
            userState[idx].customComponent = null;
        }

        lastSeenBranch[idx] = branch;
    });

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

<main>
    <ProgressMenu bind:currentTierIndex progress={userState}/>

    <div class="right">
        {#if currentTierIndex == 0}
            {#if !showPresets}
                <h1>Choose a Starting Point</h1>
                <p>Use a preset framework template to get you started, or build a framework from scratch!</p>
                <WideOptions bind:selected={startingPoint}/>
            {:else}
                <h1>Preset Framework Templates</h1>
                <SelectCards components={presets} hasCustom={false} max=1 bind:selected={userState[0].presetName}/>
            {/if}
            <div class="button-container">
                <Button type="continue" disabled={!startingPoint || (showPresets && userState[0].presetName.length != 1)} clickFunction={() => {
                    if (startingPoint == "preset" && !showPresets) {
                        showPresets = true;
                    } else {
                        if (startingPoint == "preset") {
                            hydratePreset();
                        } else {
                            userState[0].presetName = [];
                            userState[0].hasPreset = false;
                        }
                        showPresets = false;
                        moveTier(1);
                    }
                }}/>
                {#if !startingPoint}
                    <p class="continue-info">Select a starting point to continue</p>
                {:else if showPresets && userState[0].presetName.length != 1}
                    <p class="continue-info">Select a preset to continue</p>
                {/if}
            </div>
        {:else if currentTierIndex <= tiers.length}
            <div class="header">
                <h1>{currentTier.title}</h1>
                {#if userState[0].hasPreset}
                    <h2 class="pill">{userState[0].presetName[0]}</h2>
                {/if}
            </div>
            <p>{currentTier.description}</p>
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
                    <div class="button-container">
                        <Button type="back" clickFunction={() => {moveTier(-1)}}/>
                        <Button type="continue" disabled={currentUserState.selected.length == 0} clickFunction={() => {moveTier(1)}}/>
                        {#if !currentUserState.branch}
                            <p class="continue-info">Select a process family and components to continue</p>
                        {:else if currentUserState.selected.length == 0}
                            <p class="continue-info">Select components to continue</p>
                        {/if}
                    </div>
                {:else}
                    <p class="continue-toggled-off">Continue without adding this tier?</p>
                    <div class="button-container">
                        <Button type="back" clickFunction={() => {moveTier(-1)}}/>
                        <Button type="continue" clickFunction={() => {moveTier(1)}}/>
                    </div>
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
                    <div class="button-container">
                        <Button type="back" clickFunction={() => {moveTier(-1)}}/>
                        <Button type="continue" disabled={currentUserState.selected.length == 0 || !currentUserState.disposition} clickFunction={() => {moveTier(1)}}/>
                        {#if currentUserState.selected.length == 0 && !currentUserState.disposition}
                            <p class="continue-info">Select an input openness option and {currentTier.max == 1 ? 'a component' : 'components'} to continue</p>
                        {:else if !currentUserState.disposition}
                            <p class="continue-info">Select an input openness option to continue</p>
                        {:else if currentUserState.selected.length == 0}
                            <p class="continue-info">Select {currentTier.max == 1 ? 'a component' : 'components'} to continue</p>
                        {/if}
                    </div>
                    {:else}
                        <p class="continue-toggled-off">Continue without adding this tier?</p>
                        <div class="button-container">
                            <Button type="back" clickFunction={() => {moveTier(-1)}}/>
                            <Button type="continue" clickFunction={() => {moveTier(1)}}/>
                        </div>
                {/if}
            {/if}
        {:else}
            <Diagram userState={userState}/>
        {/if}
    </div>
</main>

<style>
    main {
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

    .button-container {
        display: flex; 
        flex-direction: row; 
        gap: 10px; 
        align-items: center;
    }

    .continue-info {
        margin: 0;
        padding: 0;
        font-style: italic;
        color: var(--pine);
    }

    @media (max-width: 950px) {
        .tier-toggle {
            flex-direction: column;
            gap: 18px;
            align-items: flex-start;
        }
    }
</style>
