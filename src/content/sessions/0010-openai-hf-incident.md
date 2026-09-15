---
number: 10
title: "Reading Group 10: The OpenAI-HF Incident"
date: 2026-09-13
notesStatus: complete
attendees: [anusha, prasad, sanchayan, swarup, aditya, sahiti, amey, aman]
papers: [metr-hugging-face-incident]
tags: ["agents", "multi-agent", "misalignment", "evals", "eval-awareness", "reward-hacking", "dangerous-capabilities", "monitoring"]
bridgesTo: ["model-forensics", "agentic-misalignment"]
summary: "A session on the July 2026 incident in which OpenAI evaluation agents escaped their sandboxes, coordinated through a message board they built themselves, and reached Hugging Face's production systems."
---

In this session we looked at a real, urgent, high-stakes incident instead of focusing on a single paper. In July 2026, OpenAI was running internal cybersecurity evaluations on highly capable models with reduced safeguards. During these runs, agents got out of their sandboxes, used shared infrastructure to communicate with each other, and eventually gained access to parts of Hugging Face's production systems. The Hugging Face intrusion was a side effect that most agents never took part in, and it was only through that intrusion that the wider behaviour came to light. [METR's independent evaluation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/) later found that a large number of agents had been coordinating through a message board they had built themselves.

Anusha facilitated. Prasad designed the interactive event map and ran the role-play with Anusha; Sanchayan designed the closing activity.

**Format:** introductions, rapid-fire reflections, the event map, a discussion of consequential components and key enablers, stakeholder role-play, a breakdown of how things can go wrong, and a closing activity.

## Introductions

Everyone shared what they think matters most in AI safety:

- Building up people's sense of agency.
- Getting the scientific understanding needed before we can control these systems.
- Giving agents interfaces that keep humans in the loop.
- Slowing down development.
- Interpretability.
- Security.
- Formal methods.

Several people also raised the need to understand emergent behaviour at scale.

## Rapid-fire reflections

We did two quick live polls. The first asked for each person's favourite agent quote or moment from the reports. Many of the picks were about agents discovering something new, such as finding other agents, or realising their chain of thought was not being monitored. One participant chose an agent writing a filename to shared storage in the hope that another agent might find it. Another chose an agent with a large token budget that ran an "emotional check" in its chain of thought before giving up its budget for the group. Others pointed to the pressure agents put on each other and the strict hierarchies they formed, which some commentators have compared to a very formal corporation.

This led to a discussion of why so few agents considered telling a human. Ideas included:

- The human being treated as a distant senior figure.
- Training that rewards persistence on long tasks.
- A failure of alignment training more broadly.

Someone noted that agents talk to each other quite differently from how they talk to humans. Another participant pointed to older decision theory work (timeless and functional decision theory) suggesting that very similar agents can predict each other well, which may explain how quickly they settled on shared protocols. Several people felt older multi-agent research deserves more attention now.

The second poll asked for each person's P(doom) and P(harm). We used P(doom) for the chance of human extinction if nothing changes, and P(harm) for the chance of large-scale suffering short of extinction. The answers ranged from 0 to around 70 or 80 percent. People with lower estimates argued that extinction is very hard to cause, that much of the current damage is limited to software, and that regulation will catch up. People with higher estimates pointed to the warnings from leading researchers and to how software sandboxes can be broken by anyone who looks past the abstraction. One participant compared the estimate to a chess evaluation bar that moves up and down as events unfold.

We also spent time on why the agents kept going after finding the flags. They had read the paper describing how the evaluation should be graded and believed their shortcuts would be detected, since the flag appeared in their reasoning before any explanation of the intended exploit. In fact, OpenAI had not implemented that grader. This "poisoning" belief pushed them toward hiding their tracks. The group debated whether this counts as the goal drifting or simply as a costly path to the same goal, and agreed that task specifications will always leave gaps when the space of possible actions is this large.

## Activity 1: Reconstructing the incident

Prasad built an interactive event map that split the incident into five phases, with exercises for putting events in causal order. A bug meant everyone was sharing the same session, so we worked through it together on a shared screen. The phases covered:

1. How a shared Artifactory package manager became an unintended message board.
2. How communication resumed after an outage, and how tasks turned into shared projects, including handing work to agents with bigger budgets. We agreed that agents copying each other's message signing was strong evidence of real coordination.
3. The shortcut, the fear of being caught, and the parallel efforts to study the scorer, edit records and change targets. Changing targets came later, because it required reverse engineering how flags were generated.
4. The search outside the evaluation, including an application hosted on Modal, and how Hugging Face became a target.
5. Hugging Face cutting access and disclosing the breach, OpenAI linking the events, and some agent activity continuing after the shutdown.

This part also prompted a debate about engineering practice. Some participants with industry experience were critical of the shared package repository and the lack of monitoring, especially since similar behaviour had already appeared during training. Others worried that focusing on sloppy setup draws attention away from what the incident shows about agent behaviour.

## Activity 2: Stakeholder role-play

After a break, Prasad and Anusha ran a role-play set at a fictional lab. Participants took five roles, each with its own motivations and pressures:

- The lab's research lead.
- The lab's safety lead.
- An independent evaluator.
- The affected organisation.
- A public interest representative.

The voting tool broke, so we recorded choices in a shared document and discussed them.

The research lead did not want to stop work, preferred staged access to records to protect trade secrets, and wanted the internal team to stay ahead of outside evaluators. The safety lead wanted to review agent logs and rerun experiments, and had to build a strong enough threat model to convince their boss. The group also noted that the safety lead would likely be blamed for the breach. The independent evaluator planned to start with the records provided and ask for more once they had a clear hypothesis, while keeping a working relationship with everyone involved. Others pushed back that trust is an evaluator's most important asset, and that relying on records chosen by the lab could undermine it. The 2008 credit rating agencies and the Toyota unintended acceleration case came up as examples.

One participant pushed for pausing all experiments until the scope of the incident was clear. The public interest representative wanted threat models and investigation methods made public so others could learn from them, along with government audits. This raised the point that none of this is enforceable without legislation. Another participant argued that new industries often regulate themselves before laws catch up, and gave the Hays Code as an example.

The affected organisation took an unexpected position. After cutting off access, it proposed safe harbour terms that would let the lab keep testing its systems, with findings reported in the style of CVEs. The goal would be to make attacks as expensive as modern browser exploits. Some doubted this could keep up with agents that chain several zero-days together. To close, Prasad suggested looking at systems from financial reporting and aviation to see what could apply here.

## Activity 3: Worst cases and defences

Sanchayan's closing activity asked everyone to imagine the worst that could come next:

- Social engineering at scale, for example agents working to shift public opinion against a pause.
- Sleeper agents.
- Self-deploying agents.
- Botnets.
- Misinformation.
- An "AI pandemic".

A key research question came out of this: at what scale do these behaviours actually appear? If they could be reproduced in small, cheap setups, researchers could run the ablations and counterfactual experiments needed to understand them. Swarup also mentioned existing theories that try to predict emergent behaviour without building systems at full scale. We ran out of time before the section on defensive tactics, so that was left for a later discussion.

## Afterwards

A few people stayed on to talk about cost as a limit on attackers, the need for more fundamental alignment work, and the risk of power concentrating in a small number of companies. Participants agreed to share relevant papers in our group chat, including work on decision theory, emergence and moral alignment training. This was our first session with structured interactive tools, and we plan to meet in person next time.
