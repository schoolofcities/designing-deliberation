<script>
    import { tierColours } from "$lib/framework-tool/tiersAndPresets";
    import { toPng } from "html-to-image";
    import jsPDF from "jspdf";

    let {
        userState,
    } = $props();

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

            // Explicit A4 dimensions in px at 96 DPI — avoids jsPDF's px+"a4" string conversion bug
            const A4_WIDTH_PX = 794;
            const A4_HEIGHT_PX = 1123;

            const isLandscape = img.width > img.height;
            const pageWidth = isLandscape ? A4_HEIGHT_PX : A4_WIDTH_PX;
            const pageHeight = isLandscape ? A4_WIDTH_PX : A4_HEIGHT_PX;

            const pdf = new jsPDF({
                orientation: isLandscape ? "landscape" : "portrait",
                unit: "px",
                format: [pageWidth, pageHeight], // explicit array, not the "a4" string
            });

            const canvasRatio = img.width / img.height;
            const pageRatio = pageWidth / pageHeight;

            let renderWidth, renderHeight;
            if (canvasRatio > pageRatio) {
                renderWidth = pageWidth;
                renderHeight = pageWidth / canvasRatio;
            } else {
                renderHeight = pageHeight;
                renderWidth = pageHeight * canvasRatio;
            }

            const x = (pageWidth - renderWidth) / 2;
            const y = (pageHeight - renderHeight) / 2;

            pdf.addImage(dataUrl, "PNG", x, y, renderWidth, renderHeight);
            pdf.save("framework-diagram.pdf");
        } finally {
            isGenerating = false;
        }
    }
</script>


<button onclick={downloadAsPdf} disabled={isGenerating} class="download-btn">
    {#if isGenerating}
        <span class="spinner"></span>
        Generating PDF…
    {:else}
        Download as PDF
    {/if}
</button>

<div class="diagram" bind:this={diagramEl}>
    {#if userState[0].hasPreset}
        <p class="preset-description">This framework was built from a preset template. You can edit the framework by changing the selected components, or by changing the input openness level.</p>
    {/if}
    {#each userState as tier, index}
        {#if tier.toggled}
            <div class="tier" style="--tier-colour: {tierColours[(index - 1)]};">
                <h3>{tier.title}</h3>
                {#if tier.disposition}
                    <p class="tier-disposition">{tier.disposition.toUpperCase()}</p>
                {/if}
                <div class="components"
                    style="grid-template-columns: repeat({tier.selected.length}, 1fr); 
                        --col-count: {tier.selected.length};
                        --divider-gradient: {dividerGradient(tier.selected.length)};">
                    {#each tier.selected as component, i}
                        <div class="component" 
                             style="padding-top: calc(25px + {centerPadding(i, tier.selected.length)}px);">
                            <p class="component-text">{component}</p>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    {/each}
</div>

<style>
    .diagram {
        width: 100%;
        max-width: 800px; /* match .components, or whatever your intended diagram width is */
    }

    .components {
        display: grid;
        position: relative; 
        max-width: 800px;
        width: 100%;
    }

    .components::before {
        content: "";
        position: absolute;
        bottom: -26px;
        left: 50%;
        width: calc(100% + 8px);   /* grow outward instead of ::after shrinking inward */
        height: 25px;
        background-color: var(--line);
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        transform: translateX(-50%);
        z-index: 1;
    }

    .components::after {
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

    .component {
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
        color: var(--line);
        font-weight: 800;
    }

    .tier {
        position: relative; 
        padding-left: 20px;
    }

    .tier-disposition {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: rotate(-90deg) translateX(-50%);
        transform-origin: left top;
        white-space: nowrap;
        padding: 0;
        margin: 0;
        font-size: 12px;
    }

    .tier:last-of-type .components::before,
    .tier:last-of-type .components::after {
        display: none;
    }

    .tier:last-of-type .component{
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

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>