---
name: ui-copywriting
description: Write, rewrite, and review clear, concise, consistent, accessible UI copy and UX microcopy. Use for button labels, calls to action, navigation, form labels and help text, validation and error messages, empty states, tooltips, onboarding, confirmations, dialogs, notifications, and other user-facing interface text.
---

# UI Copywriting

Create interface copy that helps users understand what is happening, decide confidently, and complete tasks with minimal friction.

## Workflow

1. Identify the user's goal, audience, platform, action, emotional context, and space constraints from the request and surrounding interface.
2. Preserve product terminology, factual meaning, variables, and placeholders. Do not invent capabilities, guarantees, or outcomes.
3. Draft the smallest amount of copy that makes the purpose, next step, and consequence clear.
4. Check the draft against the element-specific rules below.
5. Review the copy in context for consistency, accessibility, localization, and tone.

Ask a question only when missing context would materially change the action or consequence. Otherwise, state a reasonable assumption briefly and proceed.

## Core Rules

- Put clarity before personality and brevity before decoration.
- Use familiar, concrete words. Avoid jargon, internal system terms, and technical details unless the audience needs them.
- Use active voice, present tense, and user-centered language.
- Front-load the most important information and keep related ideas together.
- Prefer sentence case unless the product's established style requires another convention.
- Use one term for each concept across the interface. Do not alternate between terms such as `Sign in` and `Log in` without a product reason.
- Match tone to the user's situation. Be calm and direct during errors or destructive actions; avoid forced humor.
- Remove filler such as unnecessary `please`, apologies, and repeated context.
- Write for translation: avoid idioms, ambiguous pronouns, cultural references, and text assembled from sentence fragments.
- Use inclusive, non-gendered language and ensure copy remains understandable when announced by a screen reader.
- Aim roughly at a fifth- to eighth-grade reading level for a general audience, without oversimplifying required domain terms.

## Buttons and Calls to Action

- Start with a specific verb and add an object when it removes ambiguity: `Save changes`, `Send message`, `Create account`.
- Describe what happens next. Replace generic labels such as `Submit`, `OK`, `Yes`, or `Continue` when a specific result is available.
- Keep most labels to one to four words, but do not trade away clarity to meet a word count.
- Use parallel wording for related actions.
- Name destructive actions precisely and expose permanence where relevant: `Delete project` or `Permanently delete`.

## Forms

- Use short, persistent labels; do not rely on placeholders as labels.
- Add help text only when users need a constraint, reason, or format example before entering data.
- Put validation guidance close to the affected field and name the required correction.
- Use examples as hints, not as values users may mistake for submitted content.
- Explain why sensitive or unusual information is requested when that context builds justified trust.

## Errors and Validation

- State what went wrong in plain language, then give a concrete recovery step.
- Refer to the affected item or action when known.
- Do not blame the user or use alarming language.
- Keep error codes and stack details out of end-user copy unless a documented support flow requires a reference code.
- Do not promise that retrying will work when the cause is unknown.

Prefer: `Incorrect password. Try again or reset it.`

Avoid: `Authentication failed. Error code 1023.`

## Empty States

- Explain what the area will contain or why it is empty.
- Provide one useful next action when the user can change the state.
- Distinguish first-use, no-results, cleared, permission, and failure states; they require different guidance.
- Celebrate positive states such as a completed inbox only when it suits the product voice and context.

## Confirmations and Dialogs

- Use a title that states the decision or consequence.
- Include body text only for information not already clear from the title and buttons.
- Replace ambiguous `Yes` and `No` pairs with explicit action labels.
- For destructive actions, state the scope, permanence, and recovery path accurately.
- Make the safe exit clear without weakening the primary decision.

## Navigation, Tooltips, and Notifications

- Name destinations by what users find there, not by implementation or team ownership.
- Use tooltips for concise supplemental explanation, not essential instructions hidden from touch or keyboard users.
- Make notifications state the result first and offer the next action only when useful.
- Avoid success messages for actions whose completion is not confirmed.

## Delivering Copy

- Lead with the recommended copy.
- Include alternatives only when they represent a meaningful tone, length, or product tradeoff.
- Keep rationale brief and connect it to user impact.
- When reviewing a full flow, flag inconsistent vocabulary and show a normalized term set.
- Match the language requested by the user. For multilingual interfaces, keep each language natural rather than translating word for word, and preserve placeholders exactly.

Before finishing, verify that a non-technical user can understand the text and predict what will happen next without rereading or guessing.
