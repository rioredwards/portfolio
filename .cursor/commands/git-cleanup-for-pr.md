Cleanup the git history for a pull request.

**Steps to execute (ask for confirmation before each step):**

Note: You may use the following tools as needed:

- git
- GitHub CLI
- the gitKraken MCP

1. Ask me which branch I want to merge this one into (default to 'dev')
2. Create a new branch that's a copy of the current branch to use for squashing the commits. It should be called "<branch-name>-cleanup"
3. Switch to the new cleanup branch
4. Ensure the branch to merge into is up to date with the remote repository.
5. Use git merge-base to find the common ancestor between the current branch and the branch I want to merge into
6. Now take a note of each of the commits that will be squashed and their commit messages. The changes and commit messages will be used to

- generate a concise conventional commit message for the single commit that will be the result of the cleanup.
- generate a useful PR summary.

7. Rebase the current branch onto the branch I want to merge into accepting all changes from the current branch: e.g. `git rebase -X theirs dev`
8. Now squash the commits into a single commit by using `git reset --soft dev`
9. Now make a single commit with the changes in the working tree. Use the commit message from step 6 for the commit message.
10. Push the cleanup branch to the remote repository
11. Create a pull request from the cleanup branch to the branch I want to merge into. Create a useful PR summary based on the changes and commit messages from step 6.
