Merge a pull request locally after it has been reviewed and merged on GitHub.

**Context:**
After a PR has been reviewed and merged on GitHub, you can merge it locally. GitHub will recognize this as a PR merge once you push the target branch if the commit sha's line up with those from the PR.

**Steps to execute (ask for confirmation before each step):**

Note: You may use the following tools as needed:

- git
- GitHub CLI
- the gitKraken MCP

1. Ask me which branch contains the PR changes (the feature branch that was merged)
2. Ask me which branch the PR was merged into (default to 'dev')
3. Ensure the target branch is up to date:
   - `git checkout <target-branch>`
   - `git fetch --all`
   - `git pull`
4. Merge the feature branch into the target branch using fast-forward only (this ensures the commit sha's match):
   - `git merge --ff-only <feature-branch>`
5. Push the updated target branch to remote: `git push`
