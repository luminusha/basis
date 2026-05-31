---
number: 1
title: "Reading Group 1: Emergent Misalignment"
date: 2026-02-22
notesStatus: partial
attendees: [diksha, sumana, anusha, sonakshi, maheep, rohan]
papers: [emergent-misalignment]
roles:
  summarizer: sonakshi
  concept-enricher: sumana
  highlighter: anusha
  contrarian: rohan
  bridge-builder: diksha
  practical-applicationist: maheep
tags: ["alignment", "fine-tuning", "misalignment"]
bridgesTo: []
summary: How narrow harmful fine-tuning (e.g. insecure code) can induce broad, cross-domain misalignment, and what that says about how aligned behaviour is structured.
---

## Before the discussion

We discussed Cyc, neurosymbolism for LLMs and successors, and bits of natural abstractions.

- **"You don't get to choose the ontology"**: the difference between the natural ontology and the human-imposed ontology is where misalignment problems might arise.
- **Natural Abstractions**: every cognitive being learns the same abstractions about the universe. Laws of physics are one example.
- References:
  - [Cyc: Obituary for the greatest monument to logical AGI](https://www.lesswrong.com/posts/EnXjGXSHQYjjFnQGc/cyc-obituary-for-the-greatest-monument-to-logical-agi)
  - John Wentworth's *Plan 2023: We don't get to choose the ontology*
  - John Wentworth's *Natural Abstractions*

We then discussed the [Causal Incentives group](https://causalincentives.com/). They define agentic traits as a Causal Influence Diagram and use Path-Specific Objectives to cancel out some reasoning paths during training. They have good underlying theory around dynamic agency in *Discovering Agents* and *Robust Agents Learn Causal World Models*, and a tree of causality for agency in *Towards Causal Foundations of Safe AGI*.

## Highlighter

The Highlighter's role is to identify, and read aloud, the "soul" of the paper. For this paper, the highlighted paragraph anchored the rest of the discussion.

## Bridge Builder

**Related papers:**

- **Mitigating Goal Misgeneralization via Minimax Regret** ([arXiv:2507.03068](https://arxiv.org/abs/2507.03068)). A factor α determines the ratio between "distinguishing" and "non-distinguishing" environments for proxy vs. real goals. Distinguishing environments have a clear difference between proxy and real goals; the latter does not.
  - *Main contribution:* what distribution of environments is required for goal misgeneralisation to naturally occur?
  - *Relation:* what distribution of insecure vs. benign training examples might be required for emergent misalignment? ("mixing both harmful and benign examples can be a viable mitigation strategy, with at least 75% of insecure code examples required to induce emergent misalignment").

- **Inoculation Prompting** ([arXiv:2510.05024](https://arxiv.org/abs/2510.05024)) vs. **Path-Specific Objectives** ([arXiv:2204.10018](https://arxiv.org/abs/2204.10018)). Inoculation prompting includes an instruction during training that allows the agent to reward-hack so researchers can "better learn their environment." Agents trained this way do not misgeneralise out-of-context on benign questions at inference.
  - *Main contribution:* a patchy-but-empirically-working mitigation for emergent misalignment, biasing some longtime researchers towards "alignment might be easy."
  - *Relation:* stress-test inoculation prompting on a model organism for any particular misaligned trait, and compare it with the path-specific objective mitigation for the same. Which is more robust?

- **Multi-Agent Risks from Advanced AI** (Cooperative AI report).
  - *Relation:* discusses emergent agency, risks from the emergence of collective goals, forms of emergent collective agency. A rich read for forming experiments on emergence of misaligned traits in multi-agent systems.

- **Network Effect of Emergent Misalignment** (SPAR proposal from LawZero). Given an innocuous monitor and a misaligned agent in a scalable-oversight setup, can the monitor undergo belief revision and start to show emergent misalignment itself? If so, how many interactions does it take, and what does the trajectory of emergence look like?
  - *Relation:* how does emergent misalignment as a phenomenon affect our standard oversight protocols, and how far does it propagate in multi-agent networks?

- **When is a System Discoverable from Data? Discovery Requires Chaos** ([arXiv:2511.08860](https://arxiv.org/abs/2511.08860)). Not directly related, but training dynamics or evolution of goals could be modelled as a complex system, making some emergent behaviour possibly predictable.

## Open questions

- How stable is the mitigation for emergent misalignment when intervening on persona vectors or a "misalignment direction" in the activation features?
- Under any dynamic agency theory, any mech-interp concept assuming static structures and fixed goals would break, we'd need *developmental interpretability*. (Some discussion of active vs. passive interpretability, and the observation that evaluating at every 100th checkpoint would still miss smaller changes, as in grokking.)
- Could this just be **evaluation awareness**? "Model misalignment is stronger in situations in which the output format is closer in form to the examples used for task-specific fine-tuning", and training on insecure code has an implicit direction that the user wants to see bad behaviour, so the model shows bad behaviour everywhere.
- Is this a preference, a persona, or a goal?
- The paper says emergent misalignment "manifests as diffuse, non-goal-directed harmful behaviours that cut across domains." What would goal-directed behaviour look like? (Brief discussion of sandbagging, exploitative behaviour, shutdown resistance.)
- Could there be something like a moral embedding space separating good and bad? (LLMs are correlational, representing internet data, and polysemanticity or a single personality axis is unlikely to be the simple cause.)

---

_Summariser, Concept Enricher, Contrarian, and Practical Applicationist sections are still to be filled in, any attendee can [PR them](/basis/contribute/)._
