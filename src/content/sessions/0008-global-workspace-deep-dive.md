---
number: 8
title: "Reading Group 8: Global Workspace (deep dive)"
date: 2026-07-29
notesStatus: partial
attendees: [anusha, aman, sanchayan]
papers: [global-workspace]
tags: ["mech-interp", "interpretability", "monitoring", "cognition"]
summary: "A follow-up to session 7: instead of re-reading the paper, we dug into the code and the Neuronpedia demo to see the Global Workspace idea in action on Gemma."
---

A smaller, hands-on follow-up to [session 7](/sessions/0007-global-workspace/) on Anthropic's [_A Global Workspace in Language Models_](https://www.anthropic.com/research/global-workspace). Instead of re-reading the paper, the session was a walkthrough of two artefacts that make the paper concrete.

## Kaggle notebook: Gemma 4 MHA mech interp

Sanchayan walked us through his notebook, [_Gemma 4 MHA mech interp_](https://www.kaggle.com/code/sanchayanghosh/gemma-4-mha-mech-interp), a runnable tour of mechanistic-interpretability probes on Gemma's multi-head attention layers. Working through the code cell by cell grounded the paper's abstract "J-space" and workspace-routing claims in specific tensors, hooks, and per-head behaviours you could poke at directly. Useful for anyone who wanted to see the connection between the paper's diagrams and what actually shows up when you instrument the model.

## Neuronpedia demo: J-Lens on Gemma 3 12B

We then spent time on the [Neuronpedia J-Lens demo](https://www.neuronpedia.org/gemma-3-12b/jlens), which exposes the paper's J-space as an interactive surface on Gemma 3 12B. You enter a prompt and inspect what lives in the model's J-space, exploring how directed modulation, multi-hop reasoning, and other interpretive lenses play out on real inputs. A useful companion to the paper for building intuition, and a preview of what monitoring a workspace-like surface might feel like in practice.
