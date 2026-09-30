# QA Report

## Content integrity
- Portfolio content is based on the uploaded Gokulnathan S resume.
- A compact portfolio resume PDF is stored at `assets/resume.pdf`, with content kept faithful to the uploaded source resume.
- Unsupported resume categories such as publications, achievements, spoken languages and live project URLs are intentionally omitted.
- The ECC project GitHub URL comes from the hyperlink embedded in the uploaded resume.

## Functional checks
- Welcome entrance remains visible until the visitor chooses Enter Portfolio, Skip Intro or a quick-navigation card.
- Quick navigation scrolls to the selected section.
- Desktop/laptop/tablet/mobile layouts were checked for horizontal overflow.
- Mobile navigation opens correctly.
- Ctrl/Cmd + K command palette opens and Escape closes it.
- Reduced-motion mode shows content without relying on animation.
- Resume page was checked on desktop and mobile.
- JavaScript produced no console/page errors during the automated checks.
- Main page uses a single semantic H1.

## Deployment note
The repository is initialized locally on branch `main` and the project is Vercel-ready. The project is prepared for GitHub `main` and Vercel deployment. No existing Keerthi Prakash repository or production site is modified.
