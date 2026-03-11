## [ERR-20260304-001] curl_github_api_in_sandbox

**Logged**: 2026-03-04T19:38:13Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Direct `curl` to GitHub API failed in sandboxed command execution.

### Error
```text
curl: (6) Could not resolve host: api.github.com
```

### Context
- Command attempted: `curl -fsSL https://api.github.com/repos/openclaw/openclaw/releases/tags/v2026.3.2 | jq -r '.assets[]?.name'`
- Environment had network restrictions in default sandbox mode.

### Suggested Fix
Rerun network-dependent commands with escalation (`sandbox_permissions=require_escalated`) and a clear justification.

### Metadata
- Reproducible: yes
- Related Files: N/A
- See Also: N/A

---

## [ERR-20260304-002] brew_info_github_launch_behavior

**Logged**: 2026-03-04T19:38:13Z
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
`brew info --github --cask ...` attempted to open a browser URL instead of returning only terminal output.

### Error
```text
No application knows how to open URL https://github.com/Homebrew/homebrew-cask/blob/HEAD/Casks/o/openclaw.rb
Error: Failure while executing; `/usr/bin/open https://github.com/Homebrew/homebrew-cask/blob/HEAD/Casks/o/openclaw.rb` exited with 1.
```

### Context
- Command attempted: `brew info --github --cask openclaw`
- Headless/sandboxed environment could not launch GUI handler for URL.

### Suggested Fix
Use `brew info --json=v2 --cask <name>` to retrieve metadata non-interactively.

### Metadata
- Reproducible: yes
- Related Files: N/A
- See Also: ERR-20260304-001

---
