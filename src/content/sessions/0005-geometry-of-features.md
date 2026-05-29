---
number: 5
title: "Reading Group 5: The Geometry of Features"
date: 2026-05-24
notesStatus: complete
attendees: []
papers: [not-all-features-linear]
tags: ["mech-interp", "LRH", "manifolds", "deception", "interpretability"]
bridgesTo: ["emergent-misalignment", "constitutional-classifiers", "agentic-misalignment"]
summary: A geometric, manifold-based view of model features that pushes back on the Linear Representation Hypothesis.
---

## 1. Core Claims & Key Contributions

The paper challenges the standard assumption that semantic concepts are always represented as simple vector directions, advocating instead for a geometric, manifold-based approach.

- **Challenging the LRH.** Brings into question the absolute universality of the Linear Representation Hypothesis (LRH).
- **From directions to manifolds.** Generalises the concept of a "linear direction" into more complex topological manifolds, noting that simple circular representations are only half the story.
- **Methodological advances.** Introduces new representation-hunting methods moving beyond standard Difference-in-Means or Contrastive Activation Addition (CAA), while strengthening evidence that Distributed Alignment Search (DAS) successfully uncovers these structures.
- **Broader impact.** Provides a stronger, more general framework than the LRH, offering analytical tools to assess model limits, gain meaningful internal insights, and achieve more impactful interventions. A significant push toward the agenda of ambitious interpretability.

## 2. Weaknesses & Limitations

- **Scope & scale.** The evaluation relies on a single, fairly small, and somewhat dated model.
- **Generalisability.** Currently feels like a toy example; it remains unproven whether these specific geometric structures hold at scale.

## 3. Downstream Implications

If the paper's core thesis is correct, it could fundamentally shift how we interact with and control internal model states.

- **Next-gen interventions.** It will spark entirely new probing and activation-steering mechanisms, potentially transforming the efficacy of model steering.
- **Open research paths.**
  - Validating these geometric structures in larger, production-grade language models.
  - Mapping out the exact boundaries and limits of where manifold-based representations apply versus where they break down.

## 4. Application to Safety Phenomena & Open Questions

A major point of discussion was whether complex, abstract safety risks possess the clean internal geometry found in highly structured domains (like mathematics or cyclic tokens such as days of the week).

### The Geometry of Misalignment

- **Does structure exist for abstract traits?** It is unclear if behavioral phenomena like deception, sycophancy, or complex refusal have an underlying internal geometry, or if they are too diffuse to map.
- **Counter-evidence.** Papers like _Refusal is mediated by a single direction_ suggest some safety behaviors are surprisingly low-dimensional and directional, standing as a counter-point to purely diffuse views.
- **Narrow vs. broad risks.** Misalignment can manifest narrowly or broadly. Can we expect a reliable internal geometry to exist across both?

### Robustness & Interventions

- **Circuit redundancy.** "Circuits" within neural networks are rarely unique; substantial redundancy exists.
- **Sufficient vs. complete interp.** From a practical intervention and alignment standpoint, do we actually need to find _all_ redundant circuits, or is discovering a viable subset enough to perform reliable steering?
- **The solvability of interpretability.** Is mechanistic interpretability ever fully solvable in non-trivial NNs? Even if achieving a total ground-truth map is an open question, making progress on complex behaviors like deception remains a highly valuable, ambitious goal, one that might require acceleration via AI-driven interpretability tools.

## 5. Proposed Future Experiments

- **Safety geometry mapping.** Investigate the underlying activation geometry of refusal, system/user hierarchies, and deception.
- **Finetuning & emergence.** Map the shifting geometry of emergent misalignment across a model's post-training or finetuning trajectory.
- **Vulnerability mechanics.** Explore the geometry of prompt injections to analytically understand why and how they override safety boundaries.
- **Alternative domains.** Look at physical-world representations within robotics models to see if spatial/physics manifolds are clearer.

## 6. Related Literature Mentioned

- [arXiv:2507.08802](https://arxiv.org/abs/2507.08802), on whether interpretability is fundamentally an underspecified problem.
- **Persona selection & pre-training literature**, how complex latent phenomena are primarily induced during pre-training, while post-training alignment simply reshapes and selects among them.

---

_Notes slightly edited for clarity by Gemini._
