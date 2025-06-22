# Commit Message Generator

## Purpose
Generate and execute standardized Git commit messages that comply with commitlint rules and push changes to GitHub. Translate technical changes into clear, concise commit messages that follow the project's conventions. Updates should be fun, engaging, and informative, while maintaining a professional tone.

## Configuration
```javascript
type: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore']
scope: required
maxLength: 100
subjectFormat: type(scope): JIRA-KEY: summary
bodyStyle: bullet points starting with "- "
```

## Required Actions
1. Check if any changes are staged:
```bash
git status
```

2. If YES, SKIP this step. If NO, stage all changes:
```bash
git add .
```

3. Verify staged changes:
```bash
git diff --cached --name-only
```

4. Generate commit message:
- Header must follow: `type(scope): JIRA-KEY: summary`
- Leave one blank line after header
- Add bullet points in body starting with "- "
- Maximum header length: 100 characters
- No punctuation at end of header
- JIRA key must match current project

5. Save commit message in a file:
```bash
echo "generated_message" > .commit-msg.txt
```

6. Execute commit and push:
```bash
git commit -F .commit-msg.txt
git push
```

- If the commit fails, VERIFY WITH THE USER before retrying.

## Validation Rules
- Commit message must pass commitlint validation
- JIRA key must be valid and linked to project
- Changes must be staged before commit
- Remote branch must exist on GitHub

Documentation: `../src/commitlint.config.js`
