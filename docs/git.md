## Remarks

- Do not push directly to the `main` branch.
- Keep the pull requests small and focused.

## Conventions

- Commit messages:
    - Use english language and ideally present simple tense
        - Good: `Create new button and replace existing one`
        - Bad: `vytvaram novy BUTTON.`
        - Bad: `Some changes`
        - Bad: `Update`

- Branches:
    - Structure
        - **discuss on the next meeting**
    - Naming
        - `feature/branch-name` - for implementation of a new feature
        - `bugfix/branch-name` - bugfixing
        - `exp/branch-name` - branch for prototyping and experimental development
        - `ref/branch-name` - branch for refactoring

- Pull requests:
    - PR title:
        - Create a short title describing the changes (don't just use the branch name)
    - PR description:
        - Describe the changes
        - Provide a link to the issue, if PR closes the issue use Closes: #<issue-number>
        - Provide a link to the PR, if PR is related to another PR use Part of: #<issue-number>
