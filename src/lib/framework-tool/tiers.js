export const tiers = [
    {
        title: "Tier 1 - Case for Change",
        question: "Why now? Why this?",
        description: "",
        defaultToggled: false,
        recommendedDisposition: ["Given", "Validate"],
        max: -1,
        components: [
            {
                title: "Drivers (of Change)",
                description: "Neutral framing; the trends pushing the process. The default for strategies and culture/recreation plans."
            }, 
            {
                title: "Challenges",
                description: "Problem-forward framing; resilience, climate, and social plans (e.g., Toronto’s Resilience Strategy organises around six “resilience challenges”)."
            }, 
            {
                title: "Opportunities",
                description: "Asset-forward framing; economic development and growth plans. Often paired with Challenges."
            }, 
            {
                title: "Issues / Key Issues",
                description: "Common in land-use planning and policy reviews."
            }, 
            {
                title: "Trends & Forces",
                description: "Long-range/foresight plans; pairs well with scenario overlays."
            }, 
            {
                title: "Purpose & Need",
                description: "The formal EA/NEPA term — the justification alternatives are tested against. Required vocabulary for statutory infrastructure studies."
            }, 
            {
                title: "Current State / Baseline / Community Profile",
                description: "The “where are we now” snapshot."
            }, 
            {
                title: "What We Heard",
                description: "Positions early engagement input itself as a framework element; engagement-led processes."
            }, 
            {
                title: "Mandate / Mission",
                description: "Why the organisation exists (distinct from Vision); corporate/divisional plans."
            }, 
            {
                title: "Values",
                description: "What the community or organisation holds dear; community visioning and corporate plans."
            }, 
        ],
    },
    {
        title: "Tier 2 - Aspiration",
        question: "Where are we going?",
        defaultToggled: true,
        recommendedDisposition: ["Validate", "Co-create"],
        max: 1,
        components: [
            {
                title: "Vision (Statement)",
                description: "The default; 20-30 year horizon in most plans."
            }, 
            {
                title: "Mission",
                description: "What we do and for whom. Organisational plans only; may be paired with Vision in that context."
            }, 
            {
                title: "Aspiration / Our Future",
                description: "Softer, narrative variants; community visioning."
            }, 
            {
                title: "North Star",
                description: "Newer digital/innovation strategies; signals a single orienting outcome."
            }, 
        ],
    },
    {
        title: "Tier 3 - Guideposts",
        question: "What will guide our choices?",
        defaultToggled: true,
        recommendedDisposition: ["Validate", "Co-create"],
        max: -1,
        components: [
            {
                title: "Guiding Principles",
                description: "The default everywhere (the Portland Plan is famously organised around four: prosperity, education, health, equity)."
            }, 
            {
                title: "Core Values",
                description: "When values weren’t used at Tier 1; corporate plans and visioning."
            }, 
            {
                title: "Commitments",
                description: "Stronger, accountability-flavoured; equity, reconciliation, and climate plans."
            }, 
            {
                title: "Lenses (equity, climate…)",
                description: "Cross-cutting overlays applied at every tier rather than occupying one."
            }, 
            {
                title: "Design Principles",
                description: "Spatial/physical translation of guiding principles; urban design, parks, facilities."
            }, 
            {
                title: "Policy Directions",
                description: "Bridges principles to statutory policy; official plans."
            }, 
            {
                title: "Evaluation Criteria",
                description: "Bridges principles to statutory policy; official plans."
            }, 
        ],
    },
    {
        title: "Tier 4 - Organising Structure ",
        question: "What will we focus on?",
        defaultToggled: true,
        recommendedDisposition: ["Validate", "Co-create"],
        max: -1,
        components: [
            {
                title: "Strategic Directions",
                description: "Directional — implies movement; common in Canadian municipal plans."
            }, 
            {
                title: "Focus Areas",
                description: "Neutral; e.g., Toronto’s Resilience Strategy (People & Neighbourhoods, Infrastructure, Leading a Resilient City); Cleveland’s city-hall plan uses four."
            }, 
            {
                title: "Themes",
                description: "Neutral/softer; common when areas emerged from coding engagement input."
            }, 
            {
                title: "Pillars",
                description: "Structural — implies equal weight and permanence."
            }, 
            {
                title: "Priorities / Strategic Priorities",
                description: "Ranked — implies choices were made; term-of-council plans."
            }, 
            {
                title: "Goal Areas",
                description: "Outcome-flavoured; use when Tier 5 will hold Objectives."
            }, 
            {
                title: "Big Moves",
                description: "Transformational — a small number of high-impact shifts; transportation and city-building (e.g., Metrolinx’s The Big Move)."
            }, 
            {
                title: "Transformations / Shifts",
                description: "Change-management flavour."
            }, 
            {
                title: "Pathways",
                description: "Sequential; climate/energy plans (pathways to net zero)."
            }, 
            {
                title: "Systems",
                description: "Functional; asset-based plans (parks systems, mobility systems)."
            }, 
        ],
    },
    // {
    //     title: "",
    //     question: "",
    //     defaultToggled: true,
    //     recommendedDisposition: [],
    //     max: -1,
    //     components: [
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //     ],
    // },
    // {
    //     title: "",
    //     question: "",
    //     defaultToggled: true,
    //     recommendedDisposition: [],
    //     max: -1,
    //     components: [
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //     ],
    // },
    // {
    //     title: "",
    //     question: "",
    //     defaultToggled: true,
    //     recommendedDisposition: [],
    //     max: -1,
    //     components: [
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //     ],
    // },
    // {
    //     title: "",
    //     question: "",
    //     defaultToggled: true,
    //     recommendedDisposition: [],
    //     max: -1,
    //     components: [
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //         {
    //             title: "",
    //             description: ""
    //         }, 
    //     ],
    // },
];

export const presets = [
    {title: "Classic Strategy Cascade", description: "Strategies, master plans, culture/recreation plans (the CPDD shape)"},
    {title: "Design & Options Process", description: "Parks, facilities, corridors, secondary plans"},
    {title: "EA / Infrastructure Study", description: "Statutory processes"},
    {title: "Outcomes-Based Plan", description: "Resilience, health, social plans"},
    {title: "Corporate / Term-of-Council Plan", description: "Internal / organisational strategic plans"},
    {title: "Policy / Official Plan", description: "Statutory land-use plans"},
];
