# Copilot Custom Instructions for Hack Time Slack Bot

## Configuration ⚙️

```xml
<config>
<jiraCloudId>
random-uuid
</jiraCloudId>

<jiraProjectKey>
PRJCT
</jiraProjectKey>

<repoOwnerName>
owner/repo-name
</repoOwnerName>
</config>
```

<!--<general>-->

## General Guidelines 📝

<!-- <core> -->

### Core Principles

- **Follow project conventions**: Adhere to all documented standards for code style, commit messages, branch naming, and documentation.
- **Be DRY**: Avoid duplicating logic, documentation, or configuration. Reference shared utilities and documentation where possible.
- **Prioritize maintainability**: Write clear, modular, and well-documented code. Use descriptive names and concise comments only where necessary.
  <!-- </core> -->
  <!-- <automation> -->

### Automation & Quality

- **Automate and enforce**: Use and respect all automated checks (lint, tests, commit hooks, etc.) and document any manual steps.
- **Design Principles**: All code must adhere to the architectural and design patterns described in `./.github/instructions/design-principles.instructions.md`.
- **Code Obviousness**: Code should be self-explanatory. Write clear, descriptive code that documents itself.
  <!-- - </automation> -->
  <!--</general>-->

<!--<important>-->

## Critical Rules ⚠️

<!-- <prohibited> -->

### Prohibited Actions

These actions are strictly forbidden:

- **Inline Comments**: DO NOT add explanatory inline comments. If the code needs a comment to be understood, refactor it to be more clear.
- **Create new branches**: DO NOT create new branches unless you have been prompted to implement a feature with a specific JiraKey. Always work on the current branch.
- **AI footers**: (documentation only) Never omit or forget to update an AI footer, see `#ai-documentation-requirements`
- **Input variables**: NEVER guess or assume the value of a variable or parameter. If you need a specific value, ask the user for it.
- **Backwards compatibility**: NEVER account for backwards compatibility unless explicitly instructed to do so (this is a new project, so we do not need to support legacy code).
- **Repo rules**: NEVER BYPASS or ignore any repository rules, such as branch protection rules, commit message requirements, or pull request templates.
  - NONE OF THEM ARE BROKEN, so do not try to fix them.
  - If something is failing, YOUR CODE IS WRONG, not the rules.
    <!-- </prohibited> -->
    <!--</important>-->

<!--<comments>-->

## Comment Guidelines 💭

- **JSDoc Comments**: ALWAYS use JSDoc comments to document functions, classes, interfaces, and complex types.
- **Security TODOs**: Keep TODO comments that mark security issues or required production changes.
- **Human Overrides**: Keep comments that document intentional human overrides of AI suggestions.
- **File Headers**: Keep file-level comments that explain the file's core purpose.
- **Test Comments**: In test files, prefer descriptive test names over comments to explain test scenarios.
<!--</comments>-->

<!--<terminalCommands>-->

## Terminal Usage 🖥️

When generating command-line examples or scripts and when displaying and executing commands from the chat, follow these guidelines:

- Do NOT use `cd` commands or directory changes - you're in the right place already.
- Do NOT chain with && or add unnecessary setup/boilerplate.
- Output only the core command(s) required for the task.
<!-- </terminalCommands> -->

<!--<documentation>-->

## Documentation Standards 📚

- When new functionality is added, search in the `docs/tech_guide` and `docs/user_guide` directories for a relevant file by the feature name.
- When no relevant file exists, create a new file in kebab-case in each `docs/tech_guide/` and `docs/user_guide`
- Document new technical features in `docs/tech_guide/` and user-facing features in `docs/user_guide/`.
- Keep the project structure in the `README.md` up to date.
<!-- </documentation> -->

<!--<ktlo>-->

## Known Technical Limitations & Optimizations 🔧

- Ensure you only add to `ktlo/**.md` files after confirming it is not already documented elsewhere as a feature.
- Do not duplicate the same KTLO item in multiple files, place it in the `general-enhancements.md` file if it applies to the entire project.
- Except for known security workarounds, do not add inline code comments related to KTLO items.
<!--</ktlo>-->

<!--<testing>-->

## Testing Requirements 🧪

- All new features and bugfixes must include or update tests in `test/unit/` to cover their functionality.
- All new features and bugfixes must include or update tests in `test/integration/` to cover the integration points.
- Use Vitest for all tests; follow existing test patterns and naming conventions.
- Ensure tests are isolated, deterministic, and do not require external services unless explicitly mocked.
<!--</testing>-->

<!--<codeStyle>-->

## Code Style Guidelines 💻

- Use optional chaining (`?.`) and nullish coalescing (`??`) operators together where appropriate.
- Use `?.` to safely access properties of objects that may be `null` or `undefined`.
- Use `??` to provide default values when the left-hand side is `null` or `undefined`, rather than using logical OR (`||`), which can lead to unexpected behavior with falsy values like `0`, `false`, or `''`.
- Use the `pluralize` library for pluralization instead of manual conditional logic (e.g., avoid `item === 1 ? 'item' : 'items'`).
- NEVER put Jira keys in code, only in commit messages, branch names, and .ai_reports.

<!-- <examples> -->

### Examples

#### Example 1

DO NOT do this:

```javascript
const value = (obj && obj.property) || defaultValue;
```

Instead, DO this:

```javascript
const value = obj?.property ?? defaultValue;
```

#### Example 2

DO NOT do this:

```javascript
const hasMetrics = prMetrics && prMetrics.counts;
const ghostedCount = hasMetrics ? prMetrics.counts[PR_CATEGORIES.GHOSTED] : 0;
```

Instead, DO this:

```javascript
const ghostedCount = prMetrics?.counts?.[PR_CATEGORIES.GHOSTED] ?? 0;
```

#### Example 3

DO NOT do this:

```javascript
const prText = prCount === 1 ? 'PR' : 'PRs';
const message = `${prCount} ${prText}`;
```

Instead, DO this:

```javascript
const message = `${prCount} ${pluralize('PR', prCount)}`;
```

<!-- </examples> -->
<!--</codeStyle>-->

<!--<aiFooter>-->

## AI Documentation Requirements 🤖

<!--<appropriateness>-->

### When needed

Any and all documentation generated by AI must include a footer, including:

- AI reports
- Technical documentation
- User documentation
- PR comments (a single footer is acceptable if multiple comments are posted at once)
- Jira comments (every comment)
<!--</appropriateness>-->

<!--<guidelines>-->

### Guidelines

- Follow guidelines in `./.github/prompts/timestamp-handling.prompt.md` for <var>datetime</var>.
- If <var>user</var> is unknown, prompt the user for their FULL name.
- ALWAYS scan documentation for existing AI footers and update the timestamp as needed
- NEVER update an existing footer.
<!--</guidelines>-->

<!--<newDocumentation> -->

#### New vs Existing Documentation

For NEW documentation, the AI footer must be formatted as follows:

```markdown
---

Generated by <var>aiName</var>, directed by <var>user</var> at <var>datetime</var>.
```

<!--</newDocumentation>-->

<!--<existingDocumentation> -->

For EXISTING documentation, the AI footer must be formatted as follows:

```markdown
---

Updated by <var>aiName</var>, directed by <var>user</var> at <var>datetime</var>.
```

<!--</existingDocumentation>-->

<!--<example>-->

### Example

```markdown
---

Generated by <var>aiName</var>, directed by <var>user</var> at <var>datetime</var>.
```

<!--</example>-->
<!--</aiFooter>-->

<!--<references>-->

## Project References 📌

- `./.github/instructions/project-overview.instructions.md` - an overview of this project and its goals.
- `../README.md` - primary contribution guide for the project.
- `./.github/instructions/app-security.instructions.md` - Security guidelines that MUST be followed.
- `./.github/instructions/design-principles.instructions.md` - Design principles that MUST be followed.
- `./.github/prompts/commit-changes.prompt.md` - commit message generation prompt.
<!--</references>-->
