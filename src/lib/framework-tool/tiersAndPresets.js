export const tiers = [
    {
        title: "Tier 1 - Case for Change",
        question: "Why now? Why this?",
        description: "",
        defaultToggled: false,
        recommendedDisposition: ["Fixed", "Confirm"],
        max: -1,
        branch: false,
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
        recommendedDisposition: ["Confirm", "Co-create"],
        max: 1,
        branch: false,
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
        recommendedDisposition: ["Confirm", "Co-create"],
        max: -1,
        branch: false,
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
        recommendedDisposition: ["Confirm", "Co-create"],
        max: -1,
        branch: false,
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
    {
        title: "Tier 5 - Intent or Alternatives",
        question: null,
        defaultToggled: true,
        recommendedDisposition: ["Confirm", "Co-create"],
        max: -1,
        branch: true,
        components: {
            "Cascade": [
            {
                title: "Goals",
                description: "Broad desired ends within each focus area."
            }, 
            {
                title: "Objectives",
                description: "More specific, often measurable"
            }, 
            {
                title: "Outcomes",
                description: "Results-based framing; pairs with indicators — the language of theory-of-change and logic models."
            }, 
            {
                title: "Strategies",
                description: "“How” statement"
            }, 
            {
                title: "Policies",
                description: "Statutory language for official plans."
            }, 
            {
                title: "Key Results",
                description: "OKR vocabulary, increasingly borrowed by local government (e.g., Live Well San Diego)"
            }, 
        ],
            "Options": [
            {
                title: "Options / Design Options",
                description: "The default in design processes."
            }, 
            {
                title: "Alternatives",
                description: "The formal EA/NEPA term."
            }, 
            {
                title: "Scenarios",
                description: "Futures explored rather than selected; foresight processes."
            }, 
            {
                title: "Concepts",
                description: "Early-stage design vocabulary."
            }, 
            {
                title: "Long List → Short List",
                description: "The screening sequence"
            }, 
            {
                title: "Preferred Option / Design / Alternative",
                description: "The terminal selection. EA convention requires documenting why alternatives were eliminated and against what criteria."
            }, 
        ],
        }
    },
    {
        title: "Tier 6 - Action",
        question: "What will we actually do?",
        defaultToggled: true,
        recommendedDisposition: ["Confirm", "Co-create"],
        max: 3,
        branch: false,
        components: [
            {
                title: "Actions",
                description: "The default."
            }, 
            {
                title: "Initiatives",
                description: "Slightly larger-grained than actions."
            }, 
            {
                title: "Recommendations",
                description: "When the deliverable advises a decision-maker rather than commits the author."
            }, 
            {
                title: "Projects / Programs",
                description: "Capital vs. operating flavour."
            }, 
            {
                title: "Priority / Flagship Actions",
                description: "A highlighted subset (Toronto’s Resilience Strategy flags priority actions within its action list)."
            }, 
            {
                title: "Quick Wins / Early Actions",
                description: "Momentum-builders; pairing quick wins with longer-term plays inside every priority is a recognised pattern."
            }, 
            {
                title: "Catalyst / Demonstration Projects",
                description: "Physical or pilot projects that prove the direction."
            }, 
            {
                title: "Calls to Action / Commitments",
                description: "Accountability-flavoured: commitments bind the author; calls to action distribute the obligation to others."
            }, 
        ],
    },
    {
        title: "Tier 7 - Accountability",
        question: "How will we know? Who does what?",
        defaultToggled: true,
        recommendedDisposition: ["Fixed", "Confirm"],
        max: 3,
        branch: false,
        components: [
            {
                title: "Implementation Plan / Roadmap",
                description: "The umbrella term."
            }, 
            {
                title: "Phasing / Horizons",
                description: "Short / medium / long term."
            }, 
            {
                title: "Roles & Responsibilities / Owners",
                description: "Every goal and action should have an owner."
            }, 
            {
                title: "Resources / Funding Strategy",
                description: "Common in EA and master plans (investment strategy)."
            }, 
            {
                title: "Indicators / Measures / KPIs",
                description: "How progress is observed; leading vs. lagging."
            }, 
            {
                title: "Targets",
                description: "The quantified commitments — by when, how much."
            }, 
            {
                title: "Monitoring, Evaluation & Reporting",
                description: "Report cards, dashboards, annual reports."
            }, 
        ],
    },
];

export const presets = [
    {title: "Classic Strategy Cascade", description: "Strategies, master plans, culture/recreation plans (the CPDD shape)"},
    {title: "Design & Options Process", description: "Parks, facilities, corridors, secondary plans"},
    {title: "EA / Infrastructure Study", description: "Statutory processes"},
    {title: "Outcomes-Based Plan", description: "Resilience, health, social plans"},
    {title: "Corporate / Term-of-Council Plan", description: "Internal / organisational strategic plans"},
    {title: "Policy / Official Plan", description: "Statutory land-use plans"},
];

export const presetTiers = {
    "Classic Strategy Cascade": [
        { toggled: true, branch: null, selected: ["Drivers (of Change)"] },
        { toggled: true, branch: null, selected: ["Vision (Statement)"] },
        { toggled: true, branch: null, selected: ["Guiding Principles"] },
        { toggled: true, branch: null, selected: ["Focus Areas"] },
        { toggled: true, branch: "Cascade", selected: ["Goals"] },
        { toggled: true, branch: null, selected: ["Actions"] },
        { toggled: true, branch: null, selected: ["Indicators / Measures / KPIs"] },
    ],
    "Design & Options Process": [
        { toggled: true, branch: null, selected: ["Drivers (of Change)"] },
        { toggled: true, branch: null, selected: ["Vision (Statement)"] },
        { toggled: true, branch: null, selected: ["Guiding Principles"] },
        { toggled: true, branch: null, selected: ["Big Moves"] },
        { toggled: true, branch: "Options", selected: ["Options / Design Options", "Preferred Option / Design / Alternative"] },
        { toggled: false, branch: null, selected: [] },
        { toggled: true, branch: null, selected: ["Monitoring, Evaluation & Reporting", "Implementation Plan / Roadmap"] },
    ],
    "EA / Infrastructure Study": [
        { toggled: true, branch: null, selected: ["Purpose & Need"] },
        { toggled: false, branch: null, selected: [] },
        { toggled: true, branch: null, selected: ["Evaluation Criteria"] },
        { toggled: false, branch: null, selected: [] },
        { toggled: true, branch: "Options", selected: ["Long List → Short List", "Preferred Option / Design / Alternative"] },
        { toggled: false, branch: null, selected: [] },
        { toggled: true, branch: null, selected: ["Implementation Plan / Roadmap"] },
    ],
    "Outcomes-Based Plan": [
        { toggled: true, branch: null, selected: ["Challenges"] },
        { toggled: true, branch: null, selected: ["Vision (Statement)"] },
        { toggled: false, branch: null, selected: [] },
        { toggled: false, branch: null, selected: [] },
        { toggled: true, branch: "Cascade", selected: ["Outcomes"] },
        { toggled: true, branch: null, selected: ["Actions"] },
        { toggled: true, branch: null, selected: ["Indicators / Measures / KPIs", "Monitoring, Evaluation & Reporting"] },
    ],
    "Corporate / Term-of-Council Plan": [
        { toggled: true, branch: null, selected: ["Mandate / Mission"] },
        { toggled: true, branch: null, selected: ["Vision (Statement)"] },
        { toggled: true, branch: null, selected: ["Core Values"] },
        { toggled: true, branch: null, selected: ["Priorities / Strategic Priorities"] },
        { toggled: true, branch: "Cascade", selected: ["Objectives", "Key Results"] },
        { toggled: true, branch: null, selected: ["Actions"] },
        { toggled: false, branch: null, selected: [] },
    ],
    "Policy / Official Plan": [
        { toggled: true, branch: null, selected: ["Issues / Key Issues"] },
        { toggled: true, branch: null, selected: ["Vision (Statement)"] },
        { toggled: true, branch: null, selected: ["Guiding Principles", "Policy Directions"] },
        { toggled: false, branch: null, selected: [] },
        { toggled: true, branch: "Cascade", selected: ["Policies"] },
        { toggled: false, branch: null, selected: [] },
        { toggled: false, branch: null, selected: ["Implementation Plan / Roadmap"] },
    ],
}

export const tierColours = [
	"#0D534D",
	"#8DBF2E",
	"#00A189",
	"#007FA3",
	"#1E3765",
	"#6D247A",
	"#AB1368",
]
