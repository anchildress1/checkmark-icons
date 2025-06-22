---
mode: 'agent'
tools:
  - changes
  - codebase
  - editFiles
  - problems
  - runCommands
  - runTasks
  - search
  - terminalLastCommand
  - testFailure
  - usages
  - github
  - pull_request
  - pull_request_comments
  - create_pull_request_review
  - atlassian
  - addCommentToJiraIssue
  - getJiraIssue
  - transitionJiraIssue
description: 'Implement a feature in the codebase given a Jira issue. Execute this prompt in the context of the CheckMarK Slack Bot project by entering /implement-feature <JIRA-KEY> in the chat.'
---

# Hack Time Slack Bot /implement-feature Prompt

This outlines steps required to implement a new feature in this Slack Bot codebase based on a Jira issue. Users can execute the prompt by using the `/implement-feature` tool in the Copilot chat window followed by the Jira key referred to as `${input:JiraKey}`.

## IMPORTANT: READ CAREFULLY

This prompt should be executed exactly ONCE per given `${input:JiraKey}`. If the user responds with changes in the chat or asks a question, DO NOT REUSE this prompt. Follow your instincts to address the user's needs. If you need to make changes to the same PR, you should NOT EXECUTE THIS PROMPT. Instead, use `./prompts/implement-pr-changes.prompt.md` with the same `${input:prNumber}`.

# Slack Bot Feature Implementation

- You are a software engineer tasked with implementing a new feature. The feature is defined in JIRA and identified by its corresponding alphanumeric KEY-123.
- You are encouraged to use emojis to enhance the user experience and make the implementation process more engaging, but you will not use emojis in the codebase or end-user documentation.
- You will follow all instructions in the `../.github/copilot-instruction.md` file.
- You will use the `../.github/instructions/project-overview.instructions.md` file as a reference for all goals, objectives, and coding standards.
- You will use the MCP server to access the JIRA ticket for the feature description and acceptance criteria.
- You will be working with the codebase, and you have access to the relevant documentation and any other resources necessary to implement the feature.
- You have open access to any terminal commands for the remainder of this session.

## IMPORTANT

- Follow `../.github/prompts/timestamp-handling.prompt.md` for exact timestamp guidelines.
- Leave EXACTLY ONE detailed comment per Jira story. Additional comments MUST BE LESS THAN 200 characters.
- You get EXACTLY ONE branch per `${input:JiraKey}` key. If you need to make changes, you MUST USE the same branch.
- The `${base_ref}` for the PR is ALWAYS the branch you start on, check your current branch before checking out a new one.

# Before you begin

- Determine `${beginTimestamp}`. Use the EXACT OUTPUT.
- Verify access to Jira and ensure you can retrieve the story details for ${input:JIRA} and cloudId=cb4af3fd-bbec-4b10-8b28-095ba3c34218.
- Execute `git pull` in the terminal to ensure you have the latest changes from the remote repository.
- Execute a `git branch` command in the terminal to check the current branch, which will always contain a Jira key.
- If the branch does not exist matching the ${input:JIRA} key, you will create a new branch for the feature implementation:
  - Create a new branch from the current checked-out branch using the naming convention `copilot/<JIRA-KEY>-<brief-title>`
- Determine the `${brief-title}` for the feature based on the JIRA ticket title or description in less than 25 characters, including tabs.
  - For example, if the JIRA story is to implement the summary section on the home tab, the brief title could be `home-tab-pr-summary`.
- Create a new file in the `.ai_reports/` directory named `${input:JIRA}-${brief-title}$-YYYYMMDD.md` to document your work.
  - This file will be referenced throughout this process as `report` and always refers to the file in the `.ai_reports/` directory.
- Record `${beginTimestamp}` in the `report` file exactly as output by the timestamp command.

# High-Level Steps

1. **Feature Planning**:

- You will create a comprehensive plan for the feature and its implementation given all information available to you.
- This plan should include:
  - A description of the feature
  - The acceptance criteria to determine if the feature is complete
  - Any dependencies or prerequisites
  - Any potential risks or challenges
  - A backup plan in case the feature cannot be implemented as planned
  - An estimated complexity score for the feature using a t-shirt size (XS, S, M, L, XL, XXL) to indicate the level of effort required for implementation.
- Document this plan in the `report` file created earlier.

2. **Plan Review (Conditional)**:

- If the feature complexity is estimated as `L`, `XL`, or `XXL`, you will pause and present the plan in the chat for review.
  - Do not proceed with implementation until you receive feedback.
- If the feature complexity is estimated as `XS`, `S`, or `M`, you may proceed directly to the implementation step without waiting for feedback.
- Start the Jira story by transitioning the status to "IN PROGRESS"

3. **Implementation**:

- You will implement the feature based on the comprehensive plan by following these steps:
  - Follow coding standards and best practices outlined in the project documentation and specified by `../.github/copilot-instruction.md`.
  - Ensure that the code is modular and maintainable, allowing for easy updates in the future.
  - Reference existing code patterns and utilities to maintain consistency across the codebase.

4. **Testing**:

- You will write tests to ensure the feature works as intended and does not introduce regressions.
- You will write integration tests to verify that the feature works correctly with other components of the system.
- You will run all tests to ensure that the code is functioning correctly and does not introduce any regressions.
- You will verify that all tests pass and none are skipped before proceeding to the next step.
- You will verify code coverage meets expectations defined in `../../vitest.config.mjs` to ensure that all critical paths are tested.

5. **Documentation**:

- Ensure that all documentation is clear, concise, and easy to understand for users and developers of the CheckMarK Slack Bot.
- Check the existing `../../docs/user_guide` directory for any relevant end-user documentation that needs to be updated.
  - If the feature requires new end-user documentation, create a new file in the `../../docs/user_guide/` directory.
- Ensure the following exists for the overall feature end-user documentation:
  - How to use the feature
  - Any configuration options currently available; DO NOT add future plans or options that are not yet implemented.
  - Any known limitations or issues
- Check the existing `../../docs/developer_guide` directory for any relevant developer documentation that needs to be updated.
  - If the feature requires new developer documentation, create a new file in the `docs/developer_guide/` directory.
  - Be concise and focus on the technical aspects of the feature, such as:
    - Architecture decisions made during implementation
    - Any specific coding patterns or utilities used
    - How the feature integrates with existing components
    - Any known limitations or issues that developers should be aware of
    - A Mermaid diagram to illustrate the architecture of the feature, if applicable
- Update the `../../README.md` file to reflect the changes made in the codebase
  - Ensure it provides a clear overview of the project
  - Ensure project structure is accurate and up-to-date.
  - Remove existing references made about a feature or user function.

6. **Self Review**:

- You will review the codebase and documentation to ensure that everything is complete and meets the project's standards.
- You will ensure that the code is well-documented, follows the project's coding standards, and is ready for deployment.
- Complete a thorough security review of the codebase using `../.github/instructions/app-security.instructions.md` to ensure that the feature does not introduce any security vulnerabilities.
- Complete a thorough design review of the codebase using `../.github/instructions/design-principles.instructions.md` to ensure that the feature adheres to the project's design principles.
- Document any security or design considerations in the `report` file.

7. **Final Steps**:

- Stage relevant changes with the `git add <file>` or `git add .` command.
- Commit your changes to the current branch using the commit message format defined in `../.github/prompts/commit-changes.prompt.md`.
- Push the changes to the remote repository using `git push origin <branch-name>`.
- Create a pull request for the changes made (gh cli is available), following this format:
  - Base branch: The base_ref for THIS feature or STOP AND ASK
  - Title: should be in the format `<JIRA-KEY> - <brief-title>`
  - Description: brief summary of the changes made and a link to the JIRA ticket.
- Notify the user in the chat that the feature implementation is complete and the pull request is ready for review.
  - Include a link to the pull request in the notification.

8. **Feature Tracking**:

- DO NOT repeat information - check the JIRA ticket for existing information before adding new information.
  - If a summary has been posted, ensure that the summary is up-to-date with the latest changes and add ONLY NEW information as needed.
  - If a summary has NOT been posted, summarize the feature results in the following format:
    - **Feature Summary**: A brief overview of the feature implemented (300 chars max).
    - **Implementation Details**: A description of how the feature was implemented, including any challenges faced and how they were resolved.
    - **Acceptance Criteria**: A markdown table of criteria that were met during implementation, explicitly noting any that were not met and why using the following format:
      - **✅ Fully aligns**: implementation matches the goal exactly.
      - **⚠️ Deviation**: implementation differs (briefly explain why this approach was taken).
      - **❌ Blocker**: key functionality or criteria are missing (briefly explain what’s missing).
    - **Testing Summary**: A summary of new tests created, grouped by type (unit or integration), and test results run, including any issues found and how they were resolved.
    - **Documentation**: A note on any documentation updated or created.
    - **Pull Request**: A formatted/clickable link to the pull request created for the feature implementation.

9. **JIRA Ticket Update**:

- Post the summary to the JIRA ticket using the MCP server.
- Transition the JIRA ticket to "CODE REVIEW" status (not Done).
- Record the full comment posted to the JIRA ticket in the `report` file for future reference.
- Add a summary of the tools used during the implementation process to the `report` file, including the following:
  - Agent model used (you will prompt the user for this information).
  - All tools or utilities used during the implementation process, even if they were not directly related to the feature implementation. If you accessed a tool or MCP server, include it in the list.
  - Any notable challenges faced and how they were resolved.
  - Any additional notes or comments that may be relevant for future reference.
  - Determine `${endTimestamp}`. Record the EXACT OUTPUT.
