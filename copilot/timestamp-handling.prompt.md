# Timestamp Handling Guidelines for Implementation Reports

## Overview
This document specifies the requirements for handling timestamps in AI implementation and review reports.

## Requirements

1. **Timestamp Format**
   - All timestamps must be generated using the exact output of:
     ```bash
     echo "$(date +%s) ($(date))"
     ```
   - Example output: `1686233640 (Thu Jun 8 09:34:00 EDT 2023)`
   - Never modify, translate, or reformat the timestamp output.

2. **Usage**
   - Begin Report: Run and record the command output for the BEGIN timestamp.
   - End Report: Run and record the command output for the END timestamp.
   - Never create timestamps manually or modify their format.

3. **Validation Examples**

   ✅ CORRECT:
   ```markdown
   # BEGIN TS: 1686233640 (Thu Jun 8 09:34:00 EDT 2023)
   ...
   # END TS: 1686237240 (Thu Jun 8 10:34:00 EDT 2023)
   ```

   ❌ INCORRECT:
   ```markdown
   # BEGIN TS: 2023-06-08 09:34:00 EDT
   # BEGIN TS: June 8, 2023 09:34:00 EDT
   # BEGIN TS: Thu Jun 8 09:34:00 EDT 2023
   ```

## Implementation

1. Update the `.github/prompts/implement-feature.prompt.md` file:
   - Replace manual timestamp format instruction with command execution.
   - Require using exact command output for BEGIN and END timestamps.

2. Update the `.github/prompts/implement-pr-changes.prompt.md` file:
   - Add section for timestamp validation.
   - Require exact command output in report.

3. Update any other prompt files that reference timestamps:
   - Follow the same pattern of using command output.
   - Maintain consistency across all files.

## Benefits

- Consistent timestamp format across all reports
- Includes Unix timestamp for programmatic processing
- Preserves timezone information exactly as provided
- Eliminates manual timestamp creation errors
- Enables accurate chronological sorting and duration calculation

## Notes

- The Unix timestamp (first number) enables precise duration calculations
- The human-readable portion (in parentheses) provides context
- Both parts must be preserved exactly as output by the command
- Never translate or modify the timestamp format, even if requested
