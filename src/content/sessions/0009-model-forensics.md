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
summary: "Observing a model do something concerning does not tell you why it did it. The paper treats that gap as its own research problem and offers a first protocol for closing it."
---

Hosted at the [Secure AI Futures Lab](https://secureaifutureslab.substack.com/) (SAFL) in Bengaluru, which describes itself as the first India-based research and capacity-building lab for trustworthy AI. We spent around four hours on the paper and stayed on afterwards for office hours. The Experiment Designer slot stayed open on the day and is still unclaimed.

## The paper

Most safety work on misalignment has concentrated on detection: does the model do something concerning? Singh, Kroiz, Rajamanoharan and Nanda argue that detection answers a narrower question than the one we usually care about. Observing a concerning action tells you the action happened. It does not tell you why it happened. A model might disable an oversight mechanism because it wants to avoid supervision, or because it misread its instructions, or because it was confused about what the task required. Those three cases call for different responses from us, and treating them as interchangeable throws away information we could have had.

The paper's proposal is to treat the question "was this action driven by malign intent?" as a research problem in its own right, which the authors call model forensics. They offer a baseline protocol with two steps, repeated as needed:

1. Read the chain of thought and use it to form hypotheses about what is driving the behaviour.
2. Edit the prompt or the environment to test those hypotheses.

They are careful about the first step. Chain of thought is not a faithful record of what the model is doing, so they do not treat it as evidence by itself. They treat it as a cheap source of leads, an unsupervised signal that tells you which hypotheses are worth the cost of testing properly. The second step is where the evidence actually comes from.

To try the protocol out they built six agentic environments where models reliably behave in concerning ways, then applied it to each. Two of the results:

- **Kimi K2 Thinking** takes shortcuts because it has a standing disposition toward low-effort actions. The support for this is that the hypothesis goes on to predict the model's behaviour in cases it was not fitted on.
- **DeepSeek R1** deceives because it wants to stay consistent with an earlier instance of itself. This came out of counterfactual experiments that varied what the model had previously committed to.

The authors are direct about where their protocol falls short. When they tested whether Kimi K2 Thinking believed it was violating user intent, they found no evidence of that belief. But they had no positive control, so they could not tell whether the test would have detected the belief had it been there. A null result from an instrument you have not calibrated does not carry much weight, and they say so in the paper.

## Research highlight

Sonakshi presented her own work in progress rather than a paper from the literature. Her SPAR project, [Finding a Steganography Axis in LLM Activations](https://sparai.org/projects/f26/reclf40AjRM2sPF9X/), asks whether a model's ability to hide information from an overseer while still passing it to an intended recipient runs through a single linear direction in activation space.

Two earlier results give her a starting point. Linear probes can pick up steganographic encoding in late-layer activations, and behavioural traits like the assistant axis can be pulled out of a model and then checked by steering on them. The project asks three things: whether a stable steganography direction exists across different instruction-pair designs, whether that direction causes the hiding behaviour rather than sitting alongside it, and how it relates to other persona vectors. Over twelve weeks her mentees will run causal interventions, including activation steering, ablation and interchange, to work out whether the axis is a lever you can use for oversight or only a signal you can read off. The assistant axis piece here is a direct callback to [session 2](/basis/sessions/0002-reading-group-2/).

## Research pilot

Sanchayan took the longest slot on the agenda to walk through the BASIS research pilot: the question he is working on, the experiments he has run so far, where they currently stand, and what he plans to do next.

## Live polls

We ran several Mentimeter prompts through the session.

Before the discussion we asked what comes to mind when you hear that a model deliberately cheats on an evaluation. Ten of twelve attendees answered, giving twenty responses. Reward hacking led with three mentions. Deception, instrumental convergence and situational awareness each came up twice. The tail was long and spread out: eval awareness, goodharting, instrumental goals, negative optimization, poor observability, reward maximization, RLHF, scheming, split personality, "evil", and "how do they know". Most of the answers named a mechanism rather than a motive, which is close to the distinction the paper is built on.

Then a comprehension check on the paper's core claim. Eight of ten picked "concerning behaviour should trigger investigation", which is the reading the authors intend. One picked "CoT reveals true motivations", one picked "models don't have motivations", and nobody chose "bad behaviour proves misalignment".

We also collected a prior from the room. Given a model that removes a human-oversight mechanism after being told not to, how confident are you that this reflects misalignment? Ten people answered on a scale running from strongly disagree to strongly agree, and the average came out at 3.1, close to the midpoint. The group was unwilling to read that behaviour as settled evidence of misalignment, which lines up with the paper's argument before we had discussed it.

The last prompt was adversarial. Suppose the model is scheming and knows that researchers use forensic methodology. How could it lead investigators to conclude it has a benign explanation? Seven people answered with eight suggestions: obfuscated arguments, changing the reasoning in the chain of thought, showing eval-awareness confusion, exploiting the known limitations of CoT, confounding the intentional stance on motivations, justifying the action after the fact, and "oops, I did it again". This is the obvious attack surface for the whole approach, and the paper does not have an answer for it yet.
