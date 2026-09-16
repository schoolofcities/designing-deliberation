<script>
    let {
        size = 20,
        selected=true,
        orderIndex = 1,
    } = $props();

</script>

<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88" 
    fill={selected ? "var(--pine)" : "var(--muted)"} width={size} height={size}>
    <title>tick-symbol</title>
    {#if selected && orderIndex}
        <path d="M 24 0 H 98.88 A 24 24 0 0 1 122.88 24 V 98.88 A 24 24 0 0 1 98.88 122.88 H 24 A 24 24 0 0 1 0 98.88 V 24 A 24 24 0 0 1 24 0 Z M 24 8 H 98.88 A 16 16 0 0 1 114.88 24 V 98.88 A 16 16 0 0 1 98.88 114.88 H 24 A 16 16 0 0 1 8 98.88 V 24 A 16 16 0 0 1 24 8 Z"/>
        <text x="61.44" y="61.44" text-anchor="middle" dominant-baseline="central">{orderIndex}</text>
    {:else if selected}
        <path class="cls-1" d="M 24 0 H 98.88 A 24 24 0 0 1 122.88 24 V 98.88 A 24 24 0 0 1 98.88 122.88 H 24 A 24 24 0 0 1 0 98.88 V 24 A 24 24 0 0 1 24 0 Z M 41.81 53.38 L 53.48 64.56 L 79.84 37.91 c 1.74 -1.77 2.83 -3.18 5 -1 l 7 7.12 c 2.28 2.26 2.16 3.59 0 5.69 L 57.45 83.61 c -4.54 4.45 -3.75 4.72 -8.36 0.16 l -19 -18.9 c -1 -1 -0.85 -2.09 0.2 -3.13 l 8.07 -8.37 c 1.21 -1.27 2.18 -1.2 3.44 0 Z"/>
    {:else}
        <path class="cls-1" d="M 24 0 H 98.88 A 24 24 0 0 1 122.88 24 V 98.88 A 24 24 0 0 1 98.88 122.88 H 24 A 24 24 0 0 1 0 98.88 V 24 A 24 24 0 0 1 24 0 Z M 24 8 H 98.88 A 16 16 0 0 1 114.88 24 V 98.88 A 16 16 0 0 1 98.88 114.88 H 24 A 16 16 0 0 1 8 98.88 V 24 A 16 16 0 0 1 24 8 Z"/>
    {/if}
</svg>

<style>
    text {
        font-size: 100px;
        font-family: BricolageGrotesque;
        font-weight: 800;
        fill: var(--paper);
    }

    .cls-1{fill-rule:evenodd;}
</style>