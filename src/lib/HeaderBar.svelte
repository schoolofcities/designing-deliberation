<script>

    let {
        page
    } = $props();
</script>

<header class="top">
    <div class="left">
        <a class="brand" href="/designing-deliberation">
            <span class="t">Designing Deliberation</span>
            <span class="s">Process design toolkit</span>
        </a>
        {#if page}
            <h1 class="pill">{page}</h1>
        {/if}
    </div>
    <div class="links">
        <a href="/designing-deliberation/framework-tool" class="page-link" class:current={page === "Interactive Tool"}>Interactive Tool</a>
        <a href="/designing-deliberation/case-studies" class="page-link" class:current={page === "Case Studies"}>Case Studies</a>
        <a href="/designing-deliberation/concept-library" class="page-link" class:current={page === "Concept Library"}>Concept Library</a>
        <a href="/designing-deliberation/resources" class="page-link" class:current={page === "Resources"}>Resources</a>
    </div>
</header>

<style>
    header.top {
        background: var(--pine); 
        color: #fff; 
        padding: 14px 24px;
        display: flex; 
        align-items: center; 
        justify-content: space-between;
        gap: 16px; 
        position: sticky; 
        top: 0; 
        z-index: 20;
    }

    header.top .brand { 
        display: flex; 
        flex-direction: column; 
    }

    header.top .brand .t { 
        font-family: BricolageGrotesque, sans-serif; 
        font-weight: 700; 
        font-size: 18px; 
        letter-spacing: -.01em; 
    }

    header.top .brand .s { 
        font-size: 12.5px; 
        color: #cde7d8; 
    }

    header .left {
        display: flex; 
        flex-direction: row; 
        align-items: center; 
        gap: 16px; 
    }

    header .links {
        display: flex; 
        flex-direction: row; 
        align-items: center; 
        gap: 16px; 
    }


    .pill {
        letter-spacing: .06em; 
        text-transform: uppercase;    
        background: rgba(255,255,255,.16); 
        color: #eaf6ee; 
        font-size: 25px;
        padding: 8px 12px; 
        border-radius: 999px;
        font-weight: 600;
    }

    a {
        color: white;
        font-family: NunitoSans;
        font-weight: bold;
        text-decoration: none;
    }

    a.page-link:hover {
        text-decoration: underline 2px rgba(255,255,255,.5);
    }

    a.current {
        text-decoration: underline 2px rgba(255,255,255,.5);
    }

</style>