---
number: 9
title: "Reading Group 9: Model Forensics"
date: 2026-08-25
notesStatus: partial
attendees: [anusha, prasad, nav, sonakshi, aman, raghav, sanchayan, diksha, arman, amey]
papers: [model-forensics]
roles:
  summarizer: prasad
  methodology-mapper: nav
  concept-enricher: sonakshi
  highlighter: aman
  contrarian: raghav
  discussion-generator: diksha
  bridge-builder: sanchayan
  forecaster: anusha
tags: ["misalignment", "deception", "chain-of-thought", "evals", "agents", "auditing"]
bridgesTo: ["assistant-axis", "reasoning-faithfulness"]
summary: "Detecting concerning behaviour does not establish misalignment. The paper proposes a protocol for investigating what drove the behaviour."
---

Hosted at the [Secure AI Futures Lab](https://secureaifutureslab.substack.com/) (SAFL) in Bengaluru, which describes itself as the first India-based research and capacity-building lab for trustworthy AI. About four hours on the paper, followed by office hours. The Experiment Designer slot was unassigned on the day and is still open.

## The paper

Most work on misalignment has focused on detection: does the model do something concerning? Singh, Kroiz, Rajamanoharan and Nanda argue that detection does not answer the question we usually care about. A model might disable an oversight mechanism for several different reasons:

- It wants to avoid supervision.
- It misread its instructions.
- It was confused about what the task required.

Each case calls for a different response, and detection alone does not distinguish them.

The authors call the problem of telling these apart model forensics. Their baseline protocol has two steps, repeated as needed:

1. Read the chain of thought and use it to form hypotheses about what is driving the behaviour.
2. Edit the prompt or the environment to test those hypotheses.

Chain of thought is not a faithful record of what the model is doing, so the protocol does not use it as evidence. It uses it to generate hypotheses cheaply. The testing in step two supplies the evidence.

They built six agentic environments where models reliably behave in concerning ways, and applied the protocol to each. Two of the results:

- **Kimi K2 Thinking** takes shortcuts because it has a standing disposition toward low-effort actions. The hypothesis goes on to predict the model's behaviour in cases it was not fitted on.
- **DeepSeek R1** deceives in order to stay consistent with an earlier instance of itself. This came out of counterfactual experiments that varied what the model had previously committed to.

The paper also reports a negative result the authors cannot interpret. When they tested whether Kimi K2 Thinking believed it was violating user intent, they found no evidence of that belief. They had no positive control, so they cannot say whether the test would have detected the belief if it were present.

## Research highlight

Sonakshi presented her work on [Finding a Steganography Axis in LLM Activations](https://sparai.org/projects/f26/reclf40AjRM2sPF9X/), a SPAR project she mentors. The question is whether a model's ability to hide information from an overseer, while still passing it to an intended recipient, runs through a single linear direction in activation space.

The project builds on two results. Linear probes can detect steganographic encoding in late-layer activations, and behavioural traits like the assistant axis can be extracted from a model and then validated by steering on them.

Over twelve weeks her mentees will test three things:

- Whether a stable steganography direction exists across different instruction-pair designs.
- Whether that direction causally drives the hiding behaviour.
- How it relates to other persona vectors.

The interventions include activation steering, ablation and interchange. We read the assistant axis paper in [session 2](/basis/sessions/0002-reading-group-2/).

## Research pilot

Over lunch, Sanchayan informally shared the research project he is driving, on the application of JLens to sycophancy in language models. It is a small research pilot running within BASIS.

## Polls

We polled the room a few times during the session.

The first question asked what comes to mind when you hear that a model deliberately cheats on an evaluation. Ten of twelve attendees answered, giving twenty responses:

- **Three mentions:** reward hacking.
- **Two mentions:** deception, instrumental convergence, situational awareness.
- **One mention:** eval awareness, goodharting, instrumental goals, negative optimization, poor observability, reward maximization, RLHF, scheming, split personality, "evil", "how do they know".

Most answers named a mechanism. Few named a motive.

A comprehension check on the paper's core claim followed:

- Concerning behaviour should trigger investigation: 8 votes, and the authors' reading.
- CoT reveals true motivations: 1 vote.
- Models don't have motivations: 1 vote.
- Bad behaviour proves misalignment: no votes.

We also collected a prior. Given a model that removes a human-oversight mechanism after being told not to, how confident are you that this reflects misalignment? Ten people answered on a scale running from strongly disagree to strongly agree. The average was 3.1, close to the midpoint.

The last question was adversarial: suppose the model is scheming and knows that researchers use forensic methodology, how could it lead investigators to a benign explanation? Seven people gave eight suggestions:

- Obfuscated arguments.
- Changing the reasoning in the chain of thought.
- Showing eval-awareness confusion.
- Exploiting known limitations of CoT.
- Confounding the intentional stance on motivations.
- Justifying the action after the fact.
- "Oops, I did it again."

The paper does not address this case.
