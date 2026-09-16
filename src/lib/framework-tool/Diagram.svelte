<script>
    import { tierColours } from "$lib/framework-tool/tiersAndPresets";
    import { toPng } from "html-to-image";
    import jsPDF from "jspdf";

    let {
        userState,
        collapseTiers = false,
    } = $props();

    let preset = $derived(userState[0].presetName[0]);
    let diagramEl;
    let isGenerating = $state(false);

    function centerPadding(index, total, maxExtra = 20) {
        const center = (index + 0.5) / total;
        const depthFraction = 1 - Math.abs(2 * center - 1);
        return depthFraction * maxExtra;
    }

    function dividerGradient(colCount, lineWidth = 4) {
        if (colCount <= 1) return 'none';
        const stops = [];
        for (let i = 1; i < colCount; i++) {
            const pct = (100 / colCount) * i;
            stops.push(`transparent calc(${pct}% - ${lineWidth / 2}px)`);
            stops.push(`var(--line) calc(${pct}% - ${lineWidth / 2}px)`);
            stops.push(`var(--line) calc(${pct}% + ${lineWidth / 2}px)`);
            stops.push(`transparent calc(${pct}% + ${lineWidth / 2}px)`);
        }
        return `linear-gradient(to right, ${stops.join(', ')})`;
    }

    async function downloadAsPdf() {
        isGenerating = true;
        try {
            const dataUrl = await toPng(diagramEl, {
                backgroundColor: "#ffffff",
                pixelRatio: 2,
            });

            const img = new Image();
            img.src = dataUrl;
            await new Promise((resolve) => { img.onload = resolve; });

            const A4_WIDTH_PX = 794;
            const A4_HEIGHT_PX = 1123;

            const isLandscape = img.width > img.height;
            const pageWidth = isLandscape ? A4_HEIGHT_PX : A4_WIDTH_PX;
            const pageHeight = isLandscape ? A4_WIDTH_PX : A4_HEIGHT_PX;

            const pdf = new jsPDF({
                orientation: isLandscape ? "landscape" : "portrait",
                unit: "px",
                format: [pageWidth, pageHeight],
            });

            const MARGIN = 40; 

            const availWidth  = pageWidth  - MARGIN * 2;
            const availHeight = pageHeight - MARGIN * 2;

            const canvasRatio = img.width / img.height;
            const pageRatio = availWidth / availHeight;

            let renderWidth, renderHeight;
            if (canvasRatio > pageRatio) {
                renderWidth = availWidth;
                renderHeight = availWidth / canvasRatio;
            } else {
                renderHeight = availHeight;
                renderWidth = availHeight * canvasRatio;
            }

            const x = MARGIN + (availWidth - renderWidth) / 2;
            const y = MARGIN + (availHeight - renderHeight) / 2;

            pdf.addImage(dataUrl, "PNG", x, y, renderWidth, renderHeight);
            pdf.save("framework-diagram.pdf");
        } finally {
            isGenerating = false;
        }
    }
</script>

<div class="diagram" bind:this={diagramEl}>
    <h1>{preset} Framework Diagram</h1>
    {#each userState as tier, index}
        {#if tier.toggled}
            <div class="tier" style="--tier-colour: {tierColours[(index - 1)]};">
                <h3>{tier.title}</h3>
                {#if tier.disposition}
                    <p class="tier-disposition">{tier.disposition.toUpperCase()}</p>
                {/if}
                {#if tier.branch}
                    <p class="tier-disposition">{tier.branch.toUpperCase()}</p>
                {/if}

                {#if collapseTiers}
                    <div class="collapsed-components"
                        style="grid-template-columns: repeat({tier.selected.length}, 1fr); 
                            --col-count: {tier.selected.length};
                            --divider-gradient: {dividerGradient(tier.selected.length)};">
                        {#each tier.selected as component, i}
                            <div class="collapsed-component" 
                                style="padding-top: calc(25px + {centerPadding(i, tier.selected.length)}px);">
                                <p class="component-text">{component}</p>
                            </div>
                        {/each}
                    </div>
                {:else}
                    {#each tier.selected as component, i}
                        <div class="component">
                            <p class="component-text">{component}</p>
                        </div>
                    {/each}
                {/if}
            </div>
        {/if}
    {/each}
</div>


<button onclick={downloadAsPdf} disabled={isGenerating} class="download-btn">
    {#if isGenerating}
        <span class="spinner"></span>
        Generating PDF…
    {:else}
        Download as PDF
    {/if}
</button>

<style>
    .diagram {
        width: 100%;
        max-width: 800px;
    }

    h1 {
        margin-bottom: 20px;
    }

    .collapsed-components {
        display: grid;
        position: relative; 
        max-width: 800px;
        width: 100%;
    }

    .collapsed-components::before {
        content: "";
        position: absolute;
        bottom: -26px;
        left: 50%;
        width: calc(100% + 8px);   
        height: 25px;
        background-color: var(--line);
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        transform: translateX(-50%);
        z-index: 1;
    }

    .collapsed-components::after {
        content: "";
        position: absolute;
        bottom: -23px;
        left: 50%;
        width: 100%;
        height: 25px;
        background-color: var(--tier-colour);
        background-image: var(--divider-gradient);
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        transform: translateX(-50%);
        z-index: 2;
    }

    .collapsed-component {
        position: relative; 
        background-color: var(--tier-colour);
        border: 2px solid var(--line);
        padding-bottom: 10px;
        flex-grow: 1;
        text-align: center;
        overflow: visible; 
        box-sizing: border-box;
        min-width: 0;   
    }

    .component-text {
        overflow-wrap: break-word;
        word-break: normal;
        padding: 0;
        margin: 0;
        color: var(--paper);
        font-weight: 800;
    }

    .component .component-text {
        font-size: 25px;
    }

    .tier {
        position: relative; 
        padding-left: 45px;
    }

    .tier-disposition {
        position: absolute;
        left: 0px;
        top: 50%;
        width: 75px;            
        transform-origin: center bottom;
        transform: translateY(-100%) rotate(-90deg);
        white-space: normal;
        padding: 0;
        margin: 0;
        font-size: 12px;
        text-align: center;
        text-wrap: wrap;
    }

    .tier::after {
        content: "";
        position: absolute;
        left: 37px;
        top: 0;
        width: 5px; 
        transform: translateY(5%);
        height: 90%;
        border: 1px solid var(--ink);
        border-right: none; 
        z-index: 10;
    }

    .tier:last-of-type .collapsed-components::before,
    .tier:last-of-type .collapsed-components::after {
        display: none;
    }

    .tier:last-of-type .collapsed-component{
        padding-bottom: 20px;
    }

    button {
        background-color: var(--pine);
        color: white;
        font-family: NunitoSans, sans-serif;
        font-weight: 700;
        padding: 5px 15px;
        font-size: 16px;
        border-radius: 50px;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 180px;         
        cursor: pointer;
        white-space: nowrap;  
        margin-bottom: 20px;
    }

    button:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }

    .spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
    }


    .component {
        display: grid;
        position: relative; 
        max-width: 800px;
        width: 100%;
        position: relative; 
        background-color: var(--tier-colour);
        border: 2px solid var(--line);
        padding-bottom: 10px;
        flex-grow: 1;
        text-align: center;
        overflow: visible; 
        box-sizing: border-box;
        min-width: 0;   
        padding-top: 45px;
    }

    .component::before {
        content: "";
        position: absolute;
        bottom: -28px;
        left: 50%;
        width: calc(100% + 8px); 
        height: 25px;
        background-color: var(--line);
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        transform: translateX(-50%);
        z-index: 1;
    }

    .component::after {
        content: "";
        position: absolute;
        bottom: -25px;
        left: 50%;
        width: 100%;
        height: 25px;
        background-color: var(--tier-colour);
        background-image: var(--divider-gradient);
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        transform: translateX(-50%);
        z-index: 2;
    }

    .tier:first-of-type .component:first-of-type {
        padding-top: 25px;
    }

    
    .tier:last-of-type .component:last-of-type::before,
    .tier:last-of-type .component:last-of-type::after {
        display: none;
    }

    .tier:last-of-type .component:last-of-type{
        padding-bottom: 25px;
    }

    .download-btn {
        margin-top: 20px;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>