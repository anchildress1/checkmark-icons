# Copilot Best Practices

A list of things that worked well for me - I need to update it it, but it's a great place to start...

1. Define a specific set of guidelines for Copilot to use when interacting within the project.

- Save the personas and preferred answers for your personal settings.
- If there's already an automated tool to handle it, don't try to re-invent the wheel.

  > Example: If eslint is already handling the code style, there's no need to instruct Copilot in the specifics of format and styling. Instead, just tell it to follow the rules. As an extra step, you can have copilot execute `npm run lint:fix` as part of it's given tasks.

- Split the guidelines into sections to allocate specific tasks to Copilot in smaller, more manageable pieces.
- Use the project overview to define the goals of the project and the goals of Copilot.

  > Example: The project overview should include a high-level overview of the project, including its purpose, key features, target audience, and future plans. This overview should be concise and easy to understand, providing a clear picture of what the project is about and what it aims to achieve.

- Set clear, measurable goals for Copilot to achieve and goals for the project instead of specific implementation details.

2. Pick the right model for the task - consider the complexity and requirements of the task at hand.

- When in doubt, use `Ask` mode to review the pros and cons of several popular models.
- Different models will produce different results for the same instruction, so taylor your instructions to the task at hand and define the matching model for that task in the description.

3. Use AI to generate AI

- Pick a model that is geared towards creativity and innovation and use it for documentation and design (GPT).
- Use a lightweight model for simple code generation and test cases (mini).
- Use a model known for accuracy and precision for code reviews and refactoring (Gemini).
- Use models with more complex capabilities for complex code generation and refactoring tasks (Claude).

> Example:
> This project started in ChatGPT, where the initial research, design ideas, and future integrations were documented. So, I utilized its collective memory and o4-mini-high model(specifically for its visual capabilities) to create the initial design and translate into small, iterative user stories designed specifically for Copilot to execute.

4. Once you have a working version, commit (eventually I'm going to turn on auto-commits).

- Don't give Copilot a chance to mess up something that's already working, even if it isn't perfect.
- Use feature branches to isolate changes and make it easier to revert if necessary.

5. You don't have to wait for Copilot to complete a task if you have a better idea. You can hit the pause, give it additional information, and then resume. It will switch gears and assess your new input.

6. **THIS** is going to have to be reevaluated... the process works great, but I'm afraid it's causing requests to close prematurely which ends up costing more requests. 
I'm afraid Clear your context between tasks to avoid confusion and ensure that Copilot is focused on the current task at hand.

- Use the `/clear` command to reset the context and start fresh.

7. **Start small** Give Copilot a tiny task with a single goal and then make iterative changes until Copilot adapts and returns a valid response. Then add to it, slowly.

> Don't do what I did and reformat the whole page and then turn it lose. I cam back to about 4 rogue branches, none of the files changed that were supposed to and all of them did that weren't. Tests were broken. I had 3 commits checked in with the -n flag based on the wrong feature. And a missing secrets file that took me forever to figure out how to get back. It was not pretty.
