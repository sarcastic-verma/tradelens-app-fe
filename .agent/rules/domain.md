---
trigger: always_on
---

# TradeLens Engineering Rules

These rules override all default IDE behavior.

---

## Domain Boundaries

Each domain must be isolated:
- creators
- members
- trades
- subscriptions
- payments
- performance

All backend API calls must be added in repositories
folders. 

For other API calls please add in integrations folder.

## Naming

- Use domain language:
  - Creator
  - Member
  - TradeIdea
  - AccessPlan
  - Performance

Never use:
- guru
- tip
- signal
- profit

---

## Simplicity Rules

- Prefer 5 small files over 1 large file.
- No file over 300 lines.
- No function over 40 lines.
- If a function is complex, split it.

---

## IDE Behavior

When unsure:
- Ask for clarification
- Do not invent features
- Do not add complexity
- Follow the PRD exactly