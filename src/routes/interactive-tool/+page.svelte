<script>
    import Diagram from "$lib/framework-tool/Diagram.svelte";
    import FrameworkTool from "$lib/FrameworkTool.svelte";
    import HeaderBar from "$lib/HeaderBar.svelte";
    import TogglePanel from "$lib/icons/TogglePanel.svelte";

    const QUESTIONS = [
    "What is the anticipated level of conflict, concern, controversy, or opportunity related to this project?",
    "How significant are the potential impacts to the public?",
    "How much do the major stakeholders care about this issue, project, or program?",
    "What degree of involvement does the public appear to desire?",
    "What is the potential for the public to impact the project?",
    "How significant are the possible benefits of involving the public?",
    "How significant are the potential consequences of NOT involving the public?",
    "What level of public participation does the Councillor expect on this project?",
    "What is the possibility that the media will become interested in this project?",
    "What is the probable level of difficulty in solving the problem or advancing the project?"
    ];
    const LABELS = ["Very low", "Low", "Moderate", "High", "Very high"];

    const LEVELS = [
    {
        key: "Inform", lo: 1, hi: 1.99, color: "var(--l1)", text: "var(--l1t)", proceed: false,
        goal: "To provide the public with balanced and objective information to assist them in understanding the problems, alternatives, and/or solutions.",
        promise: "We will keep you informed.",
        route: "At this level, a structured deliberative process is unlikely to be the right fit. The tool will help you design a strong information-and-outreach plan instead."
    },
    {
        key: "Consult", lo: 2, hi: 2.99, color: "var(--l2)", text: "var(--l2t)", proceed: false,
        goal: "To obtain public feedback on analysis, alternatives, and/or decisions.",
        promise: "We will keep you informed, listen to and acknowledge concerns and aspirations, and provide feedback on how public input influenced the decision.",
        route: "Consultation gathers feedback rather than shared judgement, so deliberation likely isn't the right instrument. The tool will help you design a robust consultation plan."
    },
    {
        key: "Involve", lo: 3, hi: 3.99, color: "var(--l3)", text: "var(--l3t)", proceed: true,
        goal: "To work directly with the public throughout the process to ensure that public issues, concerns, and aspirations are consistently understood and considered.",
        promise: "We will work with you to ensure your concerns and aspirations are directly reflected in the alternatives developed, and provide feedback on how public input influenced the decision.",
        route: "This level of influence can support deliberation. Continue to confirm whether a deliberative process is the right instrument here."
    },
    {
        key: "Collaborate", lo: 4, hi: 5, color: "var(--l4)", text: "var(--l4t)", proceed: true,
        goal: "To partner with the public in each aspect of the decision, including the development of alternatives and the identification of the preferred solution.",
        promise: "We will look for advice and innovation in formulating solutions, and incorporate your advice and recommendations into the decisions to the maximum extent possible.",
        route: "This level of influence strongly supports deliberation. Continue to design a fit-for-purpose deliberative process."
    }
    ];

    const GATE = [
    ["Genuine trade-offs or value conflicts", "The issue isn't just technical optimisation — reasonable people weigh values differently."],
    ["Real influence on offer", "The public's input can genuinely shape the outcome (Involve level or higher)."],
    ["Tractable for informed laypeople", "With learning support, residents can reach a considered judgement."],
    ["Legitimacy and trust at stake", "Public confidence in the decision matters materially."],
    ["Worth the time and cost", "The stakes justify a deliberative process over a lighter approach."]
    ];

    const BUILD = [
    { step: 5, ph: "Build · 05", t: "Role & mandate", key: "roleMandate",
        q: "What, specifically, will the deliberative body do — and what influence will it have: advise, or make recommendations? Over which decisions? What's in and out of scope?",
        good: "Advise staff on the desirability and feasibility of proposed actions; co-develop recommendations to inform Council.",
        bad: "Help the City understand issues." },
    { step: 6, ph: "Build · 06", t: "Representation & selection", key: "representation",
        q: "Which perspectives, experiences, and demographics must be at the table — and how will members be selected?",
        good: "Residents selected by civic lottery with oversampling of equity-deserving communities; a mix of renters, owners, daily and non-users.",
        bad: "Anyone who wants to participate." },
    { step: 7, ph: "Build · 07", t: "Learning needs", key: "learningNeeds",
        q: "What knowledge, context, and skills must members have to deliberate well and make informed judgements?",
        good: "How decisions get made at the City; natural-heritage requirements; current operational realities.",
        bad: "Give them some background information." },
    { step: 8, ph: "Build · 08", t: "Broader public engagement", key: "broaderEngagement",
        q: "What should the wider public contribute that the deliberative body alone cannot generate — ideas, lived experience, trade-offs, validation — and when?",
        good: "Collect lived experience early; seek feedback on the options the body has shortlisted.",
        bad: "Engage early and often." },
    { step: 9, ph: "Build · 09", t: "Process framework - FILL OUT WITH TOOL",
        q: "Map the building blocks of your process into phases, and define the body's role in each. (Shown for project-based, multi-phase structures.)",
        good: "Drivers → Vision → Principles → Big Moves → Options → Preferred Direction, across three phases with a clear deliverable each.",
        bad: "A list of workshops with no hierarchy or logic." },
    { step: 10, ph: "Build · 10", t: "Barriers & enablers", key: "barriersEnablers",
        q: "What could make this difficult or risky — and what conditions would make it possible?",
        good: "Tight Council timelines; community mistrust; visible senior-leader commitment; trauma-informed design.",
        bad: "Time; resources; people might not agree." }
    ];

    const PROCESS_TYPES = {
    ca: "Citizens' Assembly",
    standing: "Standing Assembly / Oversight Body",
    wg: "Project-based Working Group / CAC",
    sac: "Issue-based Stakeholder Advisory Committee",
    hybrid: "Hybrid Expert / Public model",
    focus: "Ad-hoc focus group"
    };

    const RAIL = [
    { phase: "Diagnose", locked: false, items: [[1, "Frame the project"], [2, "Level of engagement"], [3, "Is deliberation right?"], [4, "Process type"]] },
    { phase: "Build", locked: true, items: [[5, "Role & mandate"], [6, "Representation"], [7, "Learning needs"], [8, "Broader engagement"], [9, "Process framework"], [10, "Barriers & enablers"]] },
    { phase: "Generate", locked: true, items: [[11, "Your design"]] }
    ];

    // ---------- state ----------
    let userState = $state({
        current: 1,
        panelOpen: true,
        frame: { decisionText: "", authorityText: "", temporal: null },
        scorer: { answers: Array(10).fill(null) },
        gate: { gateChecked: Array(5).fill(false), gateTouched: false },
        processType: { scope: null, oversight: null, complexity: null },
        build: {
            roleMandate: "",
            representation: "",
            learningNeeds: "",
            broaderEngagement: "",
            barriersEnablers: "",
        },
        framework: { userState: [], finished: false },
    });

    // ---------- derived ----------
    let answeredCount = $derived(userState.scorer.answers.filter((v) => v !== null).length);
    let score = $derived(answeredCount === 10 ? userState.scorer.answers.reduce((a, b) => a + b, 0) / 10 : null);
    let level = $derived(score !== null ? levelFor(score) : null);
    let needlePct = $derived(score !== null ? ((score - 1) / 4) * 100 : 0);
    let engContinueDisabled = $derived(answeredCount < 10);

    function levelFor(s) {
        for (const L of LEVELS) if (s >= L.lo && s <= L.hi) return L;
        return LEVELS[LEVELS.length - 1];
    }

    let gateOnCount = $derived(userState.gate.gateChecked.filter(Boolean).length);
    let gateVerdict = $derived.by(() => {
        if (!userState.gate.gateTouched) return null;
        if (gateOnCount >= 4) return { cls: "proceed", badge: "Well suited", bg: "var(--l4)", fg: "#fff",
            msg: "Deliberation looks like a strong fit. Continue to choose the structure that matches your decision." };
        if (gateOnCount >= 2) return { cls: "proceed", badge: "Worth considering", bg: "var(--l2)", fg: "var(--l2t)",
            msg: "Deliberation may add real value — proceed, but keep testing it against a lighter approach as you design." };
        return { cls: "offramp", badge: "Probably not the fit", bg: "var(--clay)", fg: "#fff",
            msg: "Deliberation likely isn't the right instrument here. That's a legitimate, well-matched choice — the tool will help you design a strong consultation or involvement plan instead." };
    });

    let recommendation = $derived.by(() => {
        if (!userState.processType.scope || !userState.processType.oversight || !userState.processType.complexity) return null;
        let primary, runner, why;
        if (userState.frame.temporal === "phased") {
            primary = "wg"; runner = "ca";
            why = "A defined project with phases calls for a body with a sustained role across the lifecycle, tied directly to the technical work.";
        } else if (userState.processType.oversight === "yes" || userState.processType.scope === "evolving" || userState.frame.temporal === "ongoing") {
            primary = "standing"; runner = "hybrid";
            why = "Ongoing governance and the need to revisit decisions favour a standing structure with continuity over time.";
        } else if (userState.processType.complexity === "high") {
            primary = "hybrid"; runner = "ca";
            why = "A bounded but highly technical decision benefits from pairing lay judgement with expert depth.";
        } else {
            primary = "ca"; runner = "wg";
            why = "A one-time, bounded decision with real stakes is the classic case for a sortition-based mini-public, which maximises legitimacy.";
        }
        return { primary: PROCESS_TYPES[primary], runner: PROCESS_TYPES[runner], why };
    });

    function goTo(n) {
        userState.current = n;
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function onGateChange() {
        userState.gate.gateTouched = true;
    }

    
    let toolState = $state(null);
</script>

<svelte:head>
	<title>Designing Deliberation - Interactive Tool</title>
</svelte:head>

<HeaderBar page={"Interactive Tool"}/>
<main class="tool-option-select">
    <h1>Hi! What do you want to build?</h1>
    <div class="options-container">
        <a class="tool-option" href={"/designing-deliberation/interactive-tool/strategy"}>
            <h3>Build a strategy</h3>
            <p>Go through the whole tool (interactive text prompts and framework builder)</p>
        </a>
        <a class="tool-option" href={"/designing-deliberation/interactive-tool/framework"}>
            <h3>Build a framework</h3>
            <p>Just the framework builder</p>
        </a>
    </div>
</main>

<style>
    .tool-option h3{
        font-size: 30px;
    }

    .tool-option p {
        font-size: 18px;
        text-align: center;
    }

    .tool-option {
        margin-top: 20px;
        width: 35dvw;
        height: 35dvw;
        border-color: var(--pine-dk);
        background-color: var(--pine);
        color: white;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center;
        text-decoration: none;
    }

    .options-container {
        display: flex; 
        flex-direction: row; 
        align-content: center; 
        justify-content: space-evenly;
    }

    .tool-option:hover {
        cursor: pointer;
        opacity: 75%;
    }

    /* ---------- Main ---------- */
    main { padding: 34px 40px 80px; max-width: 1500px; }
    
    @keyframes fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
   
    @media (max-width: 700px) {
        .tool-option {
            height: 35dvh;
            width: 35dvh;
        }

        .options-container {
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }

        
        .tool-option h3{
            font-size: 24px;
        }

        .tool-option p {
            font-size: 14px;
        }
    } 
</style>