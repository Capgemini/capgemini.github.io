---
layout: post
title: "Important Update for GitHub Actions OIDC: Immutable Subject Claims"
description: "GitHub has introduced Immutable Subject Claims for OIDC tokens in GitHub Actions. Here's what it means, why it exists, and what you need to remember if you use Azure Flexible Federated Credentials."
summary: "GitHub has introduced Immutable Subject Claims for OIDC, fixing a security issue caused by reusable organisation and repository names in the subject claim. Repositories created before 15 July 2026 must opt in manually, and Azure setups using Flexible Federated Credentials need their expressions updated to match."
author: maream_sefan
team: default
category: Cloud
tags: [GitHub Actions, OIDC, Azure, Security, DevOps, CI/CD]
---

GitHub has introduced **Immutable Subject Claims** for OIDC (OpenID Connect) in GitHub Actions. This update fixes a security issue where the `subject` claim in the OIDC token used to be based on organisation and repository *names* instead of permanent identifiers.

## What was the problem?

Organisation and repository names can be changed or reused. This means that if an organisation or repository is deleted or renamed, another actor could, in theory, create a new repository or organisation with the same name. This would let them land in the same namespace within the `subject` claim, and in the worst case match an existing federated credential (for example in Azure or AWS) that trusted the old name.

With Immutable Subject Claims, GitHub instead uses permanent GitHub IDs (`repo_id` and `org_id`), which are never reused even if the name changes or the repository/organisation is deleted.

The new subject format looks like this:

```
repo:octocat@123456/my-repo@456789:ref:refs/heads/main
```

## What you need to know

⚠️ This is **not** automatically enabled for repositories created before 15 July 2026. These keep the old, name-based format until you explicitly enable Immutable Subject Claims. Repositories created **after** 15 July 2026 get the new format by default.

This makes it important to actively check whether your repositories are using the old or new format, rather than assuming the update applies automatically.

One nuance worth calling out explicitly: it's tempting to assume that other OIDC claims follow the same immutable, ID-based structure once you enable this. They don't. `job_workflow_ref`, for example, still uses the old name-based format (`owner/repo/.github/workflows/workflow.yml@ref`) — only the `subject` claim switches to the immutable ID-based format. If you're matching on `job_workflow_ref` anywhere in your trust policies, don't expect it to change alongside `subject`.

## Impact on Azure Flexible Federated Credentials

If you use **Azure Flexible Federated Credentials** to authenticate from GitHub Actions to Azure, you also need to update the matching expression when you enable Immutable Subject Claims. The fix is to include one of the following in the expression:

```
claims['repository_owner_id'] eq 'org-id'
```

or

```
claims['repository_id'] eq 'repo-id'
```

Without this update, Azure will keep trying to match against the old, name-based format, while GitHub sends the new ID-based subject format. The result is a failed deployment, because the token no longer matches the configured federated credential.

## Why this is worth sharing

This is a small detail that's easy to overlook, but it can have significant consequences: a pipeline that has worked reliably for a long time can suddenly start failing the day GitHub changes the subject format for a repository, while the Azure side still expects the old format. Since the change isn't automatic for existing repositories, it's worth reviewing your CI/CD setup and planning the migration deliberately, rather than being caught out by a failed deployment.

Read more in the official GitHub changelog: [Immutable Subject Claims for GitHub Actions OIDC tokens](https://github.blog/changelog/2026-04-23-immutable-subject-claims-for-github-actions-oidc-tokens/).
