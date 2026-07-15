# GitHub Actions and Coolify

Pokeori builds its production Docker image on GitHub Actions and publishes it to GitHub Container Registry (GHCR). Coolify then pulls the published image and redeploys it through its deploy webhook.

The protected `main` branch is the deployment boundary:

```text
Pull request -> validate + test Docker build (no publish, no deploy)
     |
 merge to main
     v
GitHub Actions -> validate -> publish ghcr.io/aetheruk/pokeori:latest -> Coolify webhook -> deploy
```

## GitHub repository secrets

Add these under **Repository → Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value | Used by |
| --- | --- | --- |
| `COOLIFY_WEBHOOK` | The application’s deploy webhook URL from Coolify | Deployment trigger |
| `COOLIFY_TOKEN` | A Coolify API token with the `Deploy` permission | Deployment trigger |

`GITHUB_TOKEN` is supplied automatically by GitHub Actions. Do not create a personal access token for GHCR unless your organization’s package policy requires one.

The workflow does not need `DATABASE_URI`, `REDIS_URL`, `PAYLOAD_SECRET`, or `RESEND_API_KEY` in GitHub. Those are runtime secrets and belong in Coolify. The Dockerfile uses non-secret placeholders only during the image compilation stage; they are not copied into the final runtime stage.

## Coolify setup

1. Enable Coolify API access under **Settings → Configuration → Advanced**.
2. Create an API token under **Keys & Tokens → API Tokens** and grant it the `Deploy` permission. Store it as `COOLIFY_TOKEN` in GitHub.
3. Open the Pokeori application’s **Webhook** page and copy its deploy webhook URL into `COOLIFY_WEBHOOK`.
4. Configure the Coolify application to deploy the pre-built Docker image:

   ```text
   ghcr.io/aetheruk/pokeori:latest
   ```

   Choose the Docker Image/pre-built image deployment type. Do not leave Coolify configured to build the repository’s Dockerfile, otherwise the server will still perform the memory-heavy build.

5. If the GHCR package is private, configure GHCR registry credentials in Coolify. Alternatively, make the package public after the first successful workflow run from the repository’s **Packages** settings.
6. Set the runtime environment variables in Coolify:

   ```env
   DATABASE_URI=your-production-mongodb-uri
   REDIS_URL=your-production-redis-uri
   PAYLOAD_SECRET=your-production-payload-secret
   RESEND_API_KEY=your-production-resend-key
   NEXT_PUBLIC_APP_URL=https://pokeori.app
   ```

   `GEMINI_API_KEY` is optional and only needs to be added if the related features are enabled.

## What the workflow does

- Pull requests run Node.js/pnpm linting and typechecking, the existing Bun test suite, and a Node.js/pnpm Docker build without publishing or deploying.
- A merge to `main` repeats validation, builds a `linux/amd64` image on GitHub’s runner, publishes `latest` and an immutable SHA tag to GHCR, and calls Coolify only after the image push succeeds.
- `workflow_dispatch` is available for manually rerunning the workflow from `main`.

The workflow is defined at [`.github/workflows/build-and-deploy.yml`](../../.github/workflows/build-and-deploy.yml).
