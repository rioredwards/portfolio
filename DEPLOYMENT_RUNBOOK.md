# Deployment Runbook

This runbook covers portfolio deployments that depend on the separate `interview-bot` backend service.

## Environment matrix

Use explicit, full URLs with protocol in every environment.

| Portfolio environment | `NEXT_PUBLIC_INTERVIEW_BOT_URL` |
| --------------------- | ------------------------------- |
| Development           | `http://localhost:1807`         |
| Preview               | `https://<staging-bot-domain>`  |
| Production            | `https://<prod-bot-domain>`     |

Important: `NEXT_PUBLIC_*` values are baked at build time. Always redeploy after changing them.

## Pre-deploy checklist

1. Confirm `interview-bot` health endpoint is reachable.
   - `GET https://<bot-domain>/health` returns `{ "status": "ok" }`
2. Confirm `interview-bot` chat endpoint works.
   - `POST https://<bot-domain>/chat` returns `{ "reply": "..." }`
3. Verify bot CORS allowlist includes the exact frontend origin.
   - Example: `https://rioedwards.com,https://www.rioedwards.com,https://dev.rioedwards.com,http://localhost:3000`
4. Verify Vercel environment values.
   - `NEXT_PUBLIC_INTERVIEW_BOT_URL` uses a full absolute URL with `https://`
5. Trigger a fresh Vercel deployment.
6. Smoke test the live page widget.

## Smoke test commands

```bash
curl -sS https://<bot-domain>/health
curl -sS -X POST https://<bot-domain>/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"hi","sessionId":"deploy-smoke"}'
```

## Known failure patterns and fixes

### 404 on `/chat` under the frontend domain

Symptom:

- Browser request URL looks like `https://dev.rioedwards.com/<bot-domain>/chat`

Cause:

- `NEXT_PUBLIC_INTERVIEW_BOT_URL` missing protocol, so browser treats it as a relative path.

Fix:

- Set `NEXT_PUBLIC_INTERVIEW_BOT_URL` to a full URL like `https://interview-bot-staging.up.railway.app`
- Redeploy frontend.

### Bot unreachable from local dev

Symptom:

- Chat widget shows `Failed to reach the bot. Please try again.`

Cause:

- Frontend points to wrong local port.

Fix:

- Ensure local default is `http://localhost:1807`.
- Run bot service locally before testing chat.

### CORS blocked for preview or dev host

Symptom:

- Request fails in browser while direct curl to bot works.

Cause:

- `CORS_ALLOWED_ORIGINS` on bot does not include frontend origin.

Fix:

- Add exact origin(s) to `CORS_ALLOWED_ORIGINS`.
- Restart or redeploy bot service.

### CI fails at `bun install --frozen-lockfile`

Symptom:

- Workflow fails with lockfile frozen mismatch.

Cause:

- `package.json` changed without committing updated `bun.lock`.

Fix:

- Run `bun install` locally.
- Commit updated `bun.lock`.

## Incident notes from latest rollout

- Root cause 1: frontend bot URL set without `https://`, causing relative-path requests and 404s.
- Root cause 2: lockfile drift caused frozen install failure in GitHub Actions.
- Preventive controls added:
  - local bot URL default set to `http://localhost:1807`
  - explicit deployment checklist in this runbook
  - lockfile sync step included in release flow

## Release flow going forward

1. Merge backend changes first and confirm `/health` and `/chat`.
2. Set correct frontend env URL for target environment.
3. Redeploy frontend.
4. Run widget smoke test on deployed site.
5. Record any issues and fixes in this file.
