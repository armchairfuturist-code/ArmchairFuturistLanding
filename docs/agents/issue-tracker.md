<<<<<<< HEAD
# Issue tracker: GitHub (via MCP)

Issues and PRDs for this repo live as GitHub issues. Use the **GitHub MCP server** (`@modelcontextprotocol/server-github`) for all operations — not the `gh` CLI.

## Conventions

- **Create an issue**: Use GitHub MCP issue creation tools
- **Read an issue**: Use GitHub MCP issue read tools with comments and labels
- **List issues**: Use GitHub MCP issue search with appropriate labels and state filters
- **Comment on an issue**: Use GitHub MCP comment tools
- **Apply / remove labels**: Use GitHub MCP issue update tools with label changes
- **Close**: Use GitHub MCP issue update with state: closed
- **Push / deploy**: Use GitHub MCP push and pull request tools

Infer the repo from `git remote -v`. All GitHub MCP operations are scoped to the repo the agent is working in.

## When a skill says "publish to the issue tracker"

Create a GitHub issue via the GitHub MCP.

## When a skill says "fetch the relevant ticket"

Use the GitHub MCP issue read tool with the issue number.
=======
# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
>>>>>>> fdf275e (fix: replace hero glow text-shadow with pseudo-element to prevent mobile clipping)
