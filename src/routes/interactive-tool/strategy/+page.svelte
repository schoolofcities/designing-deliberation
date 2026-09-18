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
    { step: 5, ph: "Build · 05", t: "Role & mandate", key: "roleMandate", placeholder: "Add your response here",
        lead: "[ADD DESCRIPTION HERE]",
        q: "What, specifically, will the deliberative body do — and what influence will it have: advise, or make recommendations? Over which decisions? What's in and out of scope?",
        good: "Advise staff on the desirability and feasibility of proposed actions; co-develop recommendations to inform Council.",
        bad: "Help the City understand issues." },
    { step: 6, ph: "Build · 06", t: "Representation & selection", key: "representation", placeholder: "Add your response here",
        lead: "[ADD DESCRIPTION HERE]",
        q: "Which perspectives, experiences, and demographics must be at the table — and how will members be selected?",
        good: "Residents selected by civic lottery with oversampling of equity-deserving communities; a mix of renters, owners, daily and non-users.",
        bad: "Anyone who wants to participate." },
    { step: 7, ph: "Build · 07", t: "Learning needs", key: "learningNeeds", placeholder: "Add your response here",
        lead: "[ADD DESCRIPTION HERE]",
        q: "What knowledge, context, and skills must members have to deliberate well and make informed judgements?",
        good: "How decisions get made at the City; natural-heritage requirements; current operational realities.",
        bad: "Give them some background information." },
    { step: 8, ph: "Build · 08", t: "Broader public engagement", key: "broaderEngagement", placeholder: "Add your response here",
        lead: "[ADD DESCRIPTION HERE]",
        q: "What should the wider public contribute that the deliberative body alone cannot generate — ideas, lived experience, trade-offs, validation — and when?",
        good: "Collect lived experience early; seek feedback on the options the body has shortlisted.",
        bad: "Engage early and often." },
    { step: 9, ph: "Build · 09", t: "Process framework - FILL OUT WITH TOOL", placeholder: "Add your response here",
        lead: "[ADD DESCRIPTION HERE]",
        q: "Map the building blocks of your process into phases, and define the body's role in each. (Shown for project-based, multi-phase structures.)",
        good: "Drivers → Vision → Principles → Big Moves → Options → Preferred Direction, across three phases with a clear deliverable each.",
        bad: "A list of workshops with no hierarchy or logic." },
    { step: 10, ph: "Build · 10", t: "Barriers & enablers", key: "barriersEnablers", placeholder: "Add your response here",
        lead: "[ADD DESCRIPTION HERE]",
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
    { phase: "Diagnose", items: [[1, "Frame the project"], [2, "Level of engagement"], [3, "Is deliberation right?"], [4, "Process type"]] },
    { phase: "Build", items: [[5, "Role & mandate"], [6, "Representation"], [7, "Learning needs"], [8, "Broader engagement"], [9, "Process framework"], [10, "Barriers & enablers"]] },
    { phase: "Generate", items: [[11, "Your design"]] }
    ];

    // ---------- state ----------
    let userState = $state({
        current: 1,
        maxSeen: 1,
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
        userState.maxSeen = Math.max(userState.maxSeen, n);
        console.log(userState.maxSeen);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function onGateChange() {
        userState.gate.gateTouched = true;
    }

</script>

<svelte:head>
	<title>Designing Deliberation - Interactive Strategy Tool</title>
</svelte:head>

<HeaderBar page={"Strategy Builder"}/>


    <div class="shell {userState.panelOpen ? "": "panel-closed"}">
        <nav class="rail">
            <button class="toggle-panel {userState.panelOpen ? "open" : ""}" onclick={() => {userState.panelOpen = !userState.panelOpen}}>
                <TogglePanel fill={"var(--muted)"}/>
            </button>
            {#each RAIL as p}
                <div class="phase">
                    <div class="ph-label">{p.phase}</div>
                    {#each p.items as [n, label]}
                    <button
                        class="navitem"
                        class:active={userState.current === n}
                        class:done={n < userState.current}
                        disabled={n > userState.maxSeen}
                        onclick={() => goTo(n)}
                    >
                        <span class="num">{String(n).padStart(2, "0")}</span>
                        <span style="{userState.panelOpen ? "": "display: none"}">{label}</span>
                    </button>
                    {/each}
                </div>
            {/each}
        </nav>

        <main>
            <!-- STEP 1 — FRAME -->
            {#if userState.current === 1}
            <section class="step show">
                <div class="eyebrow">Diagnose · 01</div>
                <h2 class="title">Frame the project</h2>
                <p class="lead">
                A few basics about the decision in front of you. These anchor the brief at the end and shape the recommendations along the way.
                </p>
                <div class="field">
                <label for="decision">In one sentence, what is the core decision or challenge this process needs to help resolve?</label>
                <div class="hint">Aim for clear, simple, specific — name the actual decision, not the topic area.</div>
                <textarea id="decision" bind:value={userState.frame.decisionText} placeholder="e.g. Where should the relocated community centre be sited, and what should it prioritise?"></textarea>
                </div>
                <div class="field">
                <label for="authority">Who holds final decision authority?</label>
                <input id="authority" type="text" bind:value={userState.frame.authorityText} placeholder="e.g. City Council, on staff recommendation" />
                </div>
                <div class="field">
                <p>What is the nature of this decision?</p>
                <div class="radioset">
                    <label class:sel={userState.frame.temporal === "onetime"}><input type="radio" bind:group={userState.frame.temporal} value="onetime" /> A one-time, bounded decision</label>
                    <label class:sel={userState.frame.temporal === "ongoing"}><input type="radio" bind:group={userState.frame.temporal} value="ongoing" /> Ongoing governance of a system or issue</label>
                    <label class:sel={userState.frame.temporal === "phased"}><input type="radio" bind:group={userState.frame.temporal} value="phased" /> Embedded in a defined project with phases</label>
                </div>
                </div>
                <div class="navbtns">
                <button class="btn primary" onclick={() => goTo(2)}>Continue</button>
                <span class="stepcount">Step 1 of 11</span>
                </div>
            </section>
            {/if}

            <!-- STEP 2 — ENGAGEMENT SCORER -->
            {#if userState.current === 2}
            <section class="step show">
                <div class="eyebrow">Diagnose · 02</div>
                <h2 class="title">Level of engagement</h2>
                <p class="lead">
                For each question, choose the level that best fits this project, from very low (1) to very high (5). The tool averages your answers and maps the result onto the engagement spectrum.
                </p>

                <div class="legend">
                <div class="qhead">Assessment question</div>
                {#each LABELS as lab, i}
                    <div class="lh">{lab}<span class="lv">{i + 1}</span></div>
                {/each}
                </div>

                <div id="scorer">
                {#each QUESTIONS as q, i}
                    <div class="qrow">
                    <div class="q"><span class="qn">{i + 1}</span>{q}</div>
                    <div class="cells">
                        {#each [1, 2, 3, 4, 5] as v}
                        <div class="cell lvl{v}" data-lab={LABELS[v - 1]}>
                            <input
                            type="radio"
                            id={"q" + i + "_" + v}
                            bind:group={userState.scorer.answers[i]}
                            value={v}
                            aria-label={"Question " + (i + 1) + ": " + LABELS[v - 1]}
                            />
                            <label for={"q" + i + "_" + v}></label>
                        </div>
                        {/each}
                    </div>
                    </div>
                {/each}
                </div>

                <div class="equity">
                <span class="tag">Equity lens — to come</span>
                <p>An equity dimension will be added to this assessment so the recommended level accounts for differential impacts on equity-deserving communities. Placeholder reserved.</p>
                </div>

                <div class="meter-wrap">
                <div class="meter-top">
                    <div class="meter-score">
                    <span class="num">{score !== null ? score.toFixed(1) : "—"}</span>
                    <span class="lab">average score<br />({answeredCount}/10 answered)</span>
                    </div>
                    <div class="meter-level" style="color:{level ? (level.text === 'var(--l4t)' ? 'var(--pine-dk)' : level.text) : 'var(--faint)'}">
                    {level ? level.key : "Awaiting answers"}
                    </div>
                </div>
                <div class="bar">
                    <div class="seg s1">Inform</div>
                    <div class="seg s2">Consult</div>
                    <div class="seg s3">Involve</div>
                    <div class="seg s4">Collaborate</div>
                    <div class="needle" class:hidden={score === null} style="left:{needlePct}%"></div>
                </div>
                </div>

                {#if level}
                <div class="result show {level.proceed ? 'proceed' : 'offramp'}">
                    <div class="rl"><span class="badge" style="background:{level.color}; color:{level.text}">{level.key}</span></div>
                    <div class="gp">
                    <div><h4>Public participation goal</h4><p>{level.goal}</p></div>
                    <div><h4>Promise to the public</h4><p>{level.promise}</p></div>
                    </div>
                    <div class="route"><span class="ic">{level.proceed ? "→" : "↪"}</span><span>{level.route}</span></div>
                </div>
                {/if}

                <p class="attrib">Spectrum bands and goal / promise language adapted from IAP2's Public Participation Spectrum. Permission to reproduce being secured.</p>

                <div class="navbtns">
                <button class="btn ghost" onclick={() => goTo(1)}>Back</button>
                <button class="btn primary" disabled={engContinueDisabled} onclick={() => goTo(3)}>Continue</button>
                <span class="stepcount">Step 2 of 11</span>
                </div>
            </section>
            {/if}

            <!-- STEP 3 — DELIBERATION GATE -->
            {#if userState.current === 3}
            <section class="step show">
                <div class="eyebrow">Diagnose · 03</div>
                <h2 class="title">Is deliberation the right instrument?</h2>
                <p class="lead">
                Deliberation — informed, representative, weighing trade-offs — is powerful but costly. Check the conditions that hold for your project. The more that apply, the stronger the case.
                </p>
                <div id="gate">
                {#each GATE as [title, desc], i}
                    <label class="check" class:on={userState.gate.gateChecked[i]}>
                    <input type="checkbox" bind:checked={userState.gate.gateChecked[i]} onchange={onGateChange} />
                    <span><span class="ct">{title}</span><br /><span class="cs">{desc}</span></span>
                    </label>
                {/each}
                </div>
                {#if gateVerdict}
                <div class="result show {gateVerdict.cls}" style="margin-top:20px">
                    <div class="rl"><span class="badge" style="background:{gateVerdict.bg}; color:{gateVerdict.fg}">{gateVerdict.badge}</span></div>
                    <p style="margin:6px 0 0; font-size:14.5px">{gateVerdict.msg}</p>
                </div>
                {/if}
                <div class="navbtns">
                <button class="btn ghost" onclick={() => goTo(2)}>Back</button>
                <button class="btn primary" onclick={() => goTo(4)}>Continue</button>
                <span class="stepcount">Step 3 of 11</span>
                </div>
            </section>
            {/if}

            <!-- STEP 4 — PROCESS TYPE -->
            {#if userState.current === 4}
            <section class="step show">
                <div class="eyebrow">Diagnose · 04</div>
                <h2 class="title">What type of deliberative process?</h2>
                <p class="lead">
                A few more details point toward the structure that fits best. This is a suggestion with a runner-up — never a verdict. You can override it.
                </p>
                <div class="field">
                <p>Is this one bounded question, or a set of issues that will evolve over time?</p>
                <div class="radioset">
                    <label class:sel={userState.processType.scope === "single"}><input type="radio" bind:group={userState.processType.scope} value="single" /> One bounded question</label>
                    <label class:sel={userState.processType.scope === "evolving"}><input type="radio" bind:group={userState.processType.scope} value="evolving" /> An evolving set of issues</label>
                </div>
                </div>
                <div class="field">
                <p>Does this need standing oversight and the ability to revisit decisions over time?</p>
                <div class="radioset">
                    <label class:sel={userState.processType.oversight === "yes"}><input type="radio" bind:group={userState.processType.oversight} value="yes" /> Yes, ongoing oversight</label>
                    <label class:sel={userState.processType.oversight === "no"}><input type="radio" bind:group={userState.processType.oversight} value="no" /> No, a one-time recommendation</label>
                </div>
                </div>
                <div class="field">
                <p>How technically complex is the subject?</p>
                <div class="radioset">
                    <label class:sel={userState.processType.complexity === "low"}><input type="radio" bind:group={userState.processType.complexity} value="low" /> Low</label>
                    <label class:sel={userState.processType.complexity === "med"}><input type="radio" bind:group={userState.processType.complexity} value="med" /> Moderate</label>
                    <label class:sel={userState.processType.complexity === "high"}><input type="radio" bind:group={userState.processType.complexity} value="high" /> High — needs expert input</label>
                </div>
                </div>
                {#if recommendation}
                <div class="reccard show">
                    <div class="rk">Recommended structure</div>
                    <div class="rp">{recommendation.primary}</div>
                    <div class="rr">Runner-up: <b>{recommendation.runner}</b></div>
                    <div class="why">{recommendation.why}</div>
                    <div class="override">This is a starting point. Practitioners can override and the brief will record the choice and the reasoning.</div>
                </div>
                {/if}
                <div class="navbtns">
                <button class="btn ghost" onclick={() => goTo(3)}>Back</button>
                <button class="btn primary" onclick={() => goTo(5)}>Continue to build</button>
                <span class="stepcount">Step 4 of 11</span>
                </div>
            </section>
            {/if}

            <!-- STEPS 5-10 — BUILD (generated) -->
            {#each BUILD as d, index}
                {#if userState.current === 9 && userState.current === d.step}
                    <div class="eyebrow">{d.ph}</div>
                    <FrameworkTool bind:userState={userState.framework.userState} bind:finished={userState.framework.finished}/>
                    <div class="navbtns">
                        <button class="btn ghost" onclick={() => goTo(d.step - 1)}>Back</button>
                        <button class="btn primary" onclick={() => goTo(d.step + 1)} disabled={!userState.framework.finished}>Continue</button>
                        <span class="stepcount">Step {d.step} of 11</span>
                    </div>
                {:else if userState.current === d.step}
                    <section class="step show">
                    <div class="eyebrow">{d.ph}</div>
                    <h2 class="title">{d.t}</h2>
                    <p class="lead">{d.lead}</p>
                    <label class="pq" for="decision">{d.q}</label>
                    <div class="pcard">
                        <div class="exrow">
                            <div class="ex good"><h5>Strong response</h5><p>{d.good}</p></div>
                            <div class="ex bad"><h5>Weak response</h5><p>{d.bad}</p></div>
                        </div>
                    </div>
                    <textarea id="decision" bind:value={userState.build[d.key]} placeholder={d.placeholder}></textarea>
                    <div class="navbtns">
                        <button class="btn ghost" onclick={() => goTo(d.step - 1)}>Back</button>
                        <button class="btn primary" onclick={() => {goTo(d.step + 1); console.log(userState)}}>Continue</button>
                        <span class="stepcount">Step {d.step} of 11</span>
                    </div>
                    </section>
                {/if}
            {/each}

            <!-- STEP 11 — GENERATE -->
            {#if userState.current === 11}
            <section class="step show">
                <div class="eyebrow">Generate · 11</div>
                <h2 class="title">Your design</h2>
                <div class="preview-note"><span>○</span> Output preview — generated from every answer above</div>
                <div>
                    {#each Object.keys(userState) as section}
                        {#if (typeof userState[section] != "number") && (typeof userState[section] != "boolean")}
                            <h3>{section.toWellFormed()}</h3>
                            {#each Object.keys(userState[section]) as entry}
                                <p>{entry}: {userState[section][entry]}</p>
                            {/each}
                        {/if}
                    {/each}

                    {#if userState.framework.finished}
                        <Diagram userState={userState.framework.userState}/>
                    {/if}
                </div>
                
                <div class="outgrid">
                <div class="outcard">
                    <h3>Engagement &amp; deliberation design brief</h3>
                    <p>The full internal document, assembling every answer with its reasoning.</p>
                    <ul>
                    <li>Issue and decision authority</li>
                    <li>Honest engagement level + promise to the public</li>
                    <li>Deliberation rationale and recommended structure</li>
                    <li>Role &amp; mandate, representation, learning needs</li>
                    <li>Nested engagement and process framework</li>
                    <li>Barriers, enablers, and a principles self-audit</li>
                    </ul>
                    <div class="mockbrief"><div class="bl m"></div><div class="bl"></div><div class="bl s"></div><div class="bl m"></div><div class="bl"></div></div>
                </div>
                <div class="outcard">
                    <h3>One-page shareable summary</h3>
                    <p>The version for Council, leadership, and the public — the legitimacy artifact.</p>
                    <ul>
                    <li>The issue, in a sentence</li>
                    <li>The chosen process and why</li>
                    <li>Who's at the table and how they're chosen</li>
                    <li>The public's role</li>
                    <li>The process framework diagram</li>
                    </ul>
                    <div class="mockbrief"><div class="bl s"></div><div class="bl m"></div><div class="bl"></div><div class="bl s"></div></div>
                </div>
                </div>
                <div class="navbtns">
                <button class="btn ghost" onclick={() => goTo(10)}>Back</button>
                <button class="btn primary" onclick={() => goTo(1)}>Start over</button>
                <span class="stepcount">Step 11 of 11</span>
                </div>
            </section>
            {/if}
        </main>
    </div>


    <style>
    .tool-option h3{
        font-size: 30px;
    }

    .tool-option p {
        font-size: 18px;
    }

    .tool-option {
        margin-top: 20px;
        width: 35dvw;
        height: 35dvw;
        border-color: var(--pine-dk);
        background-color: var(--pine);
        color: white;
        border-radius: 15px;
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

    .toggle-panel {
        margin-top: -15px;
        margin-left: 25px;
        position: absolute;
        border: none;
        background-color: #00000000;
        rotate: 0deg;
        transition: margin-left 0.3s ease-in-out;
    }

    .toggle-panel:hover {
        cursor: pointer;
    }

    .toggle-panel.open {
        margin-left: 245px; 
        rotate: 180deg;
    }
    
    .shell { 
        display: grid; grid-template-columns: 288px 1fr; min-height: calc(100vh - 56px); 
        transition: all 0.3s ease-in-out;
    }
    .shell.panel-closed {
        grid-template-columns: 60px 1fr; 
    }

    nav.rail { border-right: 1px solid var(--line); padding: 22px 16px; background: #FCFBF7; transition: all 0.3s ease-in-out; }
    nav.rail .phase { margin-bottom: 18px; }
    nav.rail .phase > .ph-label {
        font-size: 11px; letter-spacing: .10em; text-transform: uppercase; color: var(--faint);
        font-weight: 600; padding: 0 10px; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;
        overflow: hidden; text-wrap: nowrap; 
    }

    .panel-closed nav.rail {
        padding: 22px 10px;
    }

    .panel-closed nav.rail .phase > .ph-label {
        padding: 2px 0; font-size: 8px; margin-right: -4px; margin-left: -4px;
        text-align: center; display: flex; justify-content: center
    }

    .navitem {
        display: flex; 
        gap: 10px; 
        align-items: baseline; 
        width: 100%; 
        text-align: left; 
        border: 0; 
        background: none;
        padding: 8px 10px; 
        border-radius: var(--r-sm); 
        cursor: pointer; 
        color: var(--ink); 
        font-size: 14px; 
        line-height: 1.35; 
        overflow: hidden;
        text-wrap: nowrap;
    }
    .navitem:hover { background: #F0EEE4; color: var(--ink); }
    .navitem .num { font-family: "IBM Plex Mono", monospace; font-size: 11.5px; color: var(--faint); min-width: 18px; }
    .navitem.active { background: #E7F1E9; color: var(--pine-dk); font-weight: 600; }
    .navitem.active .num { color: var(--bright); }
    .navitem.done .num::after { content: "✓"; color: var(--bright); }
    .navitem:disabled {
        color: var(--faint); 
        cursor: not-allowed;
    }


    /* ---------- Main ---------- */
    main { padding: 34px 40px 80px; max-width: 1500px; }
    .eyebrow { font-size: 11.5px; letter-spacing: .10em; text-transform: uppercase; color: var(--bright); font-weight: 600; margin-bottom: 10px; }
    .step { animation: fade .35s ease; }
    @keyframes fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    h2.title { font-size: 30px; margin-bottom: 8px; }
    .lead { color: var(--muted); font-size: 16px; max-width: 62ch; margin-bottom: 26px; }

    .field { margin-bottom: 20px; }
    .field label { display: block; font-weight: 600; margin-bottom: 6px; font-size: 14.5px; }
    .field .hint { color: var(--muted); font-size: 13px; margin: -2px 0 8px; }
    input[type="text"], textarea, select {
    width: 100%; border: 1px solid var(--line); border-radius: var(--r-sm); padding: 11px 13px; box-sizing: border-box;
    font-family: inherit; font-size: 14.5px; color: var(--ink); background: #fff;
    }
    textarea { min-height: 78px; resize: vertical; }
    input:focus, textarea:focus, select:focus, .seg button:focus-visible { outline: 2px solid var(--bright); outline-offset: 2px; }

    .radioset { display: flex; flex-wrap: wrap; gap: 8px; }
    .radioset label {
    border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px; cursor: pointer; font-size: 14px;
    display: flex; gap: 8px; align-items: center; background: #fff;
    }
    .radioset input { accent-color: var(--pine); margin: 0; }
    .radioset label.sel { border-color: var(--pine); background: #EAF3EC; color: var(--pine-dk); font-weight: 500; }

    /* ---------- Scorer ---------- */
    .legend {
    display: grid; grid-template-columns: 1fr repeat(5, 78px); gap: 0 6px; align-items: end;
    padding: 0 4px 10px; border-bottom: 1px solid var(--line); margin-bottom: 6px; position: sticky; top: 56px; background: var(--paper); z-index: 5;
    }
    .legend .lh { font-size: 11px; line-height: 1.2; text-align: center; color: var(--muted); font-weight: 600; }
    .legend .lh .lv { display: block; font-family: "IBM Plex Mono", monospace; font-size: 10.5px; color: var(--faint); font-weight: 500; }
    .legend .qhead { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--faint); font-weight: 600; }

    .qrow { display: grid; grid-template-columns: 1fr repeat(5, 78px); gap: 0 6px; align-items: center; padding: 11px 4px; border-bottom: 1px solid var(--line2); }
    .qrow .cells { display: contents; }
    .qrow .q { font-size: 14px; padding-right: 14px; }
    .qrow .q .qn { font-family: "IBM Plex Mono", monospace; color: var(--faint); font-size: 12px; margin-right: 7px; }
    .cell { display: flex; justify-content: center; position: relative; }
    .cell label {
    width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--line); cursor: pointer;
    display: flex; align-items: center; justify-content: center; transition: transform .08s, background .12s, border-color .12s;
    }
    .cell input { position: absolute; opacity: 0; width: 0; height: 0; }
    .cell label:hover { border-color: var(--bright); }
    .cell input:focus-visible + label { outline: 2px solid var(--bright); outline-offset: 2px; }
    .cell.lvl1 input:checked + label { background: var(--l1); border-color: var(--l1); }
    .cell.lvl2 input:checked + label { background: var(--l2); border-color: var(--l2); }
    .cell.lvl3 input:checked + label { background: var(--l3); border-color: var(--l3); }
    .cell.lvl4 input:checked + label { background: var(--l4); border-color: var(--l4); }
    .cell.lvl5 input:checked + label { background: var(--l4); border-color: var(--l4); }
    .cell input:checked + label { transform: scale(1.06); }
    .cell input:checked + label::after { content: "●"; font-size: 10px; color: rgba(0,0,0,.32); }
    .cell.lvl4 input:checked + label::after, .cell.lvl5 input:checked + label::after { color: rgba(255,255,255,.7); }

    /* meter */
    .meter-wrap { position: sticky; bottom: 0; margin-top: 18px; padding: 16px 18px; background: #fff; border: 1px solid var(--line); border-radius: var(--r); box-shadow: var(--shadow); }
    .meter-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 14px; flex-wrap: wrap; }
    .meter-score { display: flex; align-items: baseline; gap: 10px; }
    .meter-score .num { font-family: "IBM Plex Mono", monospace; font-size: 30px; color: var(--ink); }
    .meter-score .lab { font-size: 13px; color: var(--muted); }
    .meter-level { font-family: BricolageGrotesque, sans-serif; font-weight: 700; font-size: 20px; }
    .bar { position: relative; height: 34px; border-radius: 8px; overflow: hidden; display: grid; grid-template-columns: repeat(4, 1fr); }
    .bar .seg { display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 600; }
    .bar .s1 { background: var(--l1); color: var(--l1t); }
    .bar .s2 { background: var(--l2); color: var(--l2t); }
    .bar .s3 { background: var(--l3); color: var(--l3t); }
    .bar .s4 { background: var(--l4); color: var(--l4t); }
    .needle { position: absolute; top: -5px; bottom: -5px; width: 3px; background: var(--ink); border-radius: 3px; left: 0; transition: left .5s cubic-bezier(.2,.7,.2,1); box-shadow: 0 0 0 3px rgba(255,255,255,.7); }
    .needle.hidden { opacity: 0; }

    /* result card */
    .result { margin-top: 18px; border-radius: var(--r); border: 1px solid var(--line); padding: 20px 22px; background: #fff; }
    .result.show { animation: fade .4s ease; }
    .result.proceed { border-left: 5px solid var(--bright); background: #F6FAF5; }
    .result.offramp { border-left: 5px solid var(--clay); background: var(--clay-bg); }
    .result .rl { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .result .badge { font-family: BricolageGrotesque, sans-serif; font-weight: 700; font-size: 13px; padding: 4px 12px; border-radius: 999px; }
    .result .gp { margin: 12px 0 0; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .result .gp h4 { font-size: 11.5px; letter-spacing: .07em; text-transform: uppercase; color: var(--faint); margin: 0 0 4px; }
    .result .gp p { margin: 0; font-size: 13.5px; color: var(--muted); }
    .result .route { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line2); font-size: 14px; display: flex; gap: 10px; align-items: flex-start; }
    .result .route .ic { font-weight: 700; }
    .result.proceed .route .ic { color: var(--bright); }
    .result.offramp .route .ic { color: var(--clay); }

    /* equity placeholder */
    .equity {
    margin-top: 18px; border: 1.5px dashed var(--clay-line); background: #FCF7F1; border-radius: var(--r);
    padding: 14px 16px; display: flex; gap: 12px; align-items: flex-start; color: var(--clay);
    }
    .equity .tag { font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; font-weight: 700; background: #fff; border: 1px solid var(--clay-line); padding: 3px 9px; border-radius: 999px; white-space: nowrap; }
    .equity p { margin: 0; color: #7a5736; font-size: 13.5px; }

    /* checklist gate */
    .check { display: flex; gap: 13px; padding: 14px; border: 1px solid var(--line); border-radius: var(--r-sm); margin-bottom: 10px; cursor: pointer; background: #fff; }
    .check:hover { border-color: var(--bright); }
    .check input { margin-top: 3px; width: 18px; height: 18px; accent-color: var(--pine); flex: none; }
    .check .ct { font-weight: 500; font-size: 14.5px; }
    .check .cs { color: var(--muted); font-size: 13px; }
    .check.on { background: #F1F7F1; border-color: var(--l3); }

    /* generic preview cards */
    .preview-note { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--clay); background: var(--clay-bg); border: 1px solid var(--clay-line); padding: 6px 12px; border-radius: 999px; margin-bottom: 18px; }
    .pcard { 
        border-radius: var(--r); 
        padding: 18px 20px; 
        margin-bottom: 14px; 
    }
    label.pq { font-weight: 600;  margin-bottom: 12px; font-size: 15px; }
    .exrow { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .ex { border-radius: var(--r-sm); padding: 11px 13px; font-size: 13px; }
    .ex.good { background: #EFF6EC; border: 1px solid #CFE6C2; }
    .ex.good h5 { color: var(--pine-dk); }
    .ex.bad { background: #F7F1ED; border: 1px solid #E7D6C8; }
    .ex.bad h5 { color: var(--clay); }
    .ex h5 { margin: 0 0 4px; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; }
    .ex p { margin: 0; color: var(--muted); }

    /* recommendation (process type) */
    .reccard { border: 1px solid var(--line); border-radius: var(--r); padding: 20px 22px; background: #F6FAF5; border-left: 5px solid var(--bright); margin-top: 8px; }
    .reccard.show { animation: fade .4s ease; }
    .reccard .rk { font-size: 11.5px; letter-spacing: .07em; text-transform: uppercase; color: var(--faint); margin-bottom: 3px; }
    .reccard .rp { font-family: BricolageGrotesque, sans-serif; font-weight: 700; font-size: 22px; color: var(--pine-dk); }
    .reccard .rr { margin-top: 10px; font-size: 14px; }
    .reccard .rr b { color: var(--ink); }
    .reccard .why { margin-top: 10px; color: var(--muted); font-size: 14px; }
    .reccard .override { margin-top: 14px; font-size: 12.5px; color: var(--faint); }

    /* output preview */
    .outgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .outcard { border: 1px solid var(--line); border-radius: var(--r); padding: 20px; background: #fff; }
    .outcard h3 { font-size: 16px; margin-bottom: 6px; }
    .outcard p { font-size: 13.5px; color: var(--muted); margin: 0 0 12px; }
    .outcard ul { margin: 0; padding-left: 18px; font-size: 13px; color: var(--muted); }
    .outcard li { margin-bottom: 4px; }
    .mockbrief { border: 1px dashed var(--line); border-radius: var(--r-sm); padding: 14px; margin-top: 14px; font-size: 12px; color: var(--faint); }
    .mockbrief .bl { height: 8px; background: var(--line2); border-radius: 3px; margin: 7px 0; }
    .mockbrief .bl.s { width: 55%; }
    .mockbrief .bl.m { width: 80%; }

    /* footer nav */
    .navbtns { display: flex; gap: 12px; margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--line); }
    .btn { border: 0; border-radius: 999px; padding: 11px 22px; font-size: 14.5px; font-weight: 600; cursor: pointer; }
    .btn.primary { background: var(--pine); color: #fff; }
    .btn.primary:hover { background: var(--pine-dk); }
    .btn.primary:disabled { background: #C7D4CB; cursor: not-allowed; }
    .btn.ghost { background: none; color: var(--muted); border: 1px solid var(--line); }
    .btn.ghost:hover { color: var(--ink); border-color: var(--muted); }
    .stepcount { margin-left: auto; align-self: center; font-size: 12.5px; color: var(--faint); font-family: "IBM Plex Mono", monospace; }

    .attrib { margin-top: 26px; font-size: 12px; color: var(--faint); font-style: italic; }

    @media (max-width: 880px) {
        .shell { grid-template-columns: 1fr; }
        nav.rail { display: none; }
        main { padding: 24px 18px 64px; }
        .legend { display: none; }
        .qrow { grid-template-columns: 1fr; gap: 8px 0; padding: 14px 2px; }
        .qrow .q { padding-right: 0; }
        .qrow .cells { display: flex; gap: 10px; flex-wrap: wrap; }
        .cell { flex-direction: column; align-items: center; gap: 3px; }
        .cell::after { content: attr(data-lab); font-size: 10px; color: var(--faint); }
        .result .gp, .exrow, .outgrid { grid-template-columns: 1fr; }
    }
    
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
    @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
    }
</style>