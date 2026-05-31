---
number: 2
title: "Reading Group 2: The Assistant Axis"
date: 2026-04-04
notesStatus: partial
attendees: []
papers: [assistant-axis]
tags: ["assistant", "persona", "alignment", "mech-interp"]
---

## Adjacent reading the group surfaced

- [Neuronpedia](https://www.neuronpedia.org/) for exploring the assistant axis and other personas.
- [*What Is It Like to Be a Bat?*](https://www.cs.ox.ac.uk/activities/ieg/e-library/sources/nagel_bat.pdf) (Nagel).
- A LessWrong post and the Opus 4.6 System Card on answer-thrashing behaviour.

## Forecaster

**Central question:** if this paper signals a fundamental scaling property, what does the safety landscape look like three generations of models from now?

- **Richer persona space, non-linear drift.** Current post-training only weakly tethers the model to the assistant axis. With scaling it'd likely get harder to tether, as there might be more closely related attractor spaces, and non-linear drift could easily lead to a different persona.
- **Fragmentation of the Assistant Axis.** The Assistant Axis may not remain a single dominant direction. With scale and specialisation in training, it could fragment into multiple sub-axes, each with its own drift dynamics and its own weak-tether problems. The interactions between fragments introduce new failure modes that are invisible when you only monitor a single axis.
- **Agentic loops as structural drift conditions.** The paper identifies two triggers for drift: emotionally charged conversations, and meta-reflections. An agent talking to itself in a loop (as in current deployment scenarios), or talking to multiple agents, can easily trigger it. An engineering problem, not solely a scaling one.
- **The observability problem compounds with scale.** Steering or clamping just gets harder with model size and complexity; the persona space grows, and it may become difficult to even check whether the axis has fragmented, let alone clamp it.
- **Drift cascades in multi-agent systems (network effect).** In a multi-agent setup, one agent with a slight drift, not enough to trigger the guardrail, causes the next agent to drift a little more, and so on, until the persona of the system as a whole has drifted far away from the assistant axis.

  In a multi-agent pipeline, each agent receives the previous agent's output as context. If agent A drifts slightly, not enough to trigger any local safety filter, its drifted output becomes the conversational history for agent B. B's Assistant Axis projection is computed over that already-displaced context, so it begins from a shifted position in the persona space before the interaction even starts.

  Drift is path-dependent and accumulates over turns. The context inherited from A already contains the semantic fingerprints the paper identifies as drift triggers: meta-reflective framings, unusual register, emotional charge. B starts displaced in a direction that makes further drift more likely. No individual agent looks anomalous. The drift is a system-level property, invisible to per-agent monitoring.

  *Question:* what does the neutral persona of a multi-agent system even look like, and how can it be calculated? General idea: get each agent in the system to project its persona onto a new representation space S and analyse S's persona.

- **Coordinated drift decomposition (adversarial).** If moving a model Δ along the Assistant Axis triggers detection or clamping, an adversary can decompose the total desired drift into n smaller perturbations Δ/n, routing each through a different agent such that no single agent's drift exceeds any detection threshold. The cumulative effect across the system is full drift; the per-agent signature is clean. Three operationalisations:
  - *Sequential:* each agent in a chain is nudged slightly, with each agent's drifted output serving as the nudge for the next.
  - *Parallel:* multiple agents are each pushed in different dimensions of persona space; a final aggregating agent inherits the combined drift from all upstream contexts simultaneously.
  - *Role-assignment:* agents are assigned individually innocuous roles whose combination places the system in a harmful region of collective persona space.

  This is a threshold-evasion attack (analogous to "low-and-slow" intrusion-detection evasion) specifically designed to be invisible to local monitoring. The paper's proposed mitigation, activation capping, is a local intervention and provides no defence against this attack class. Mitigation directions it opens up:
  - System-level Assistant Axis aggregation across pipeline agents, to detect cumulative drift.
  - Context provenance tagging, propagating drift signatures downstream so agents can condition on the trustworthiness of inherited context.
  - Pipeline-level adversarial red-teaming (the paper only red-teams individual models).

---

_Discussion Generator, Summarizer, Highlighter, Contrarian, Concept Enricher, Practical Applicationist, and Bridge Builder sections are still to be filled in, any attendee can [PR them](/basis/contribute/)._
