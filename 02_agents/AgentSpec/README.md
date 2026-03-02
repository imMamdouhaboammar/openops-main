# AgentSpec Package

> Inspired by `SpecKit` philosophy for AI Agents.

## Overview

`AgentSpec` is a standardized framework for defining, engineering, and documenting AI Agent Profiles. Instead of "vibe-prompting", it treats Agent creation as a specification-driven engineering process.

A complete Agent profile in this system consists of multiple structured documents that define its essence, capabilities, and cross-platform implementation details.

## Structure

Each agent has its own directory within `profiles/`:

- `spec.md`: The core requirements, mission, and success metrics for the agent.
- `profile.md`: Persona details, voice, personality, and world-view.
- `capabilities.md`: Functional breakdown of what the agent can and cannot do.
- `tools.json`: Technical definitions for tools/functions available to the agent.
- `instructions/`: Platform-specific system prompts.
  - `gemini.txt` (for Gemini Gems)
  - `claude.txt` (for Claude Skills/Projects)
  - `chatgpt.txt` (for ChatGPT Custom GPTs)

## Getting Started

1. Copy the contents of `templates/` to a new directory in `profiles/`.
2. Fill out the specification first (`spec.md`).
3. Refine the persona (`profile.md`) and capabilities.
4. Export as needed to your target platform.
