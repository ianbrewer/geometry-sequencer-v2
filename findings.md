# Findings Plan

*Document any architectural discoveries, bugs, constraints, or important technical knowledge here.*

## Current Discoveries
- Application code is located in the `/App` subdirectory.
- The project uses a React + Vite + TypeScript stack.
- Supabase is used for backend/database connections.
- PixiJS is used for background animations and visuals.
- HTML Exports bundle a pre-built static `public/player.js` file alongside project data to run standalone animations. This player file shares the core `GeometryRenderer.ts` rendering logic with the React app.
- **Important**: Whenever `GeometryRenderer.ts` or other core rendering elements are updated, the standalone HTML player MUST be manually rebuilt using `npm run build:player` in the `/App` directory. Otherwise, HTML exports will use stale rendering logic.

## Workflow Instructions

### 1. Working Locally & Testing on Localhost
- **Prerequisites**: Ensure you have Node.js and npm installed.
- **Run the App**: Navigate to the `/App` directory in your terminal and run `npm run dev`.
- **Test Locally**: Open your browser and navigate to the local URL Vite provides (usually `http://localhost:5173`).
- **When to do this**: Always use this to preview your changes and test features safely before deploying or committing.

### 2. GitHub & Version Control
- **Start Branches**: When beginning a new feature, bug fix, or exploration, create a new branch from `main` (e.g., `git checkout -b feature/my-cool-feature`).
- **Push to GitHub**: Once your changes are stable locally, stage and commit them (`git commit -m "Add new feature"`), then push to GitHub (`git push origin feature/my-cool-feature`).
- **Create Detailed PRDs**: When opening a Pull Request (PR) on GitHub, clearly document the "Why", "What", and "How to test" within the PR description. This serves as a lightweight Product Requirements Document (PRD) and historical context for anyone looking at the PR later.
- **Merge to Main**: After testing and confirming everything works in your branch (and optionally grabbing a review), merge your PR into the `main` branch. 
- **When to do this**: Use branches for *all* discrete chunks of work to keep `main` stable. Keep `main` as the source of truth that is always safe to deploy.

### 3. Vercel & Deployments
- **Automatic with GitHub**: Vercel is connected directly to the GitHub repository. Pushing or merging to the `main` branch automatically triggers a production build and deployment.
- **See Projects & URLs**: Log into your Vercel dashboard at `vercel.com` to view the project overview, build logs, and deployment history. Vercel also automatically provisions preview URLs for any open pull branches/requests, which is great for testing before you merge.
- **When to do this**: Check Vercel logs if an automatic deployment fails or you want to monitor the health of a new release.

### 4. Supabase & Database Management
- **Accessing Supabase**: Log in to the Supabase dashboard (`app.supabase.com`) and navigate to your specific project.
- **Add Users**: You can manually invite or create users via the **Authentication** -> **Users** tab. (Users can also sign up themselves via the UI if allowed).
- **Make Users Admins**: Roles and permissions are typically handled in a `profiles` or `user_roles` table in the Database or via Supabase metadata. Locate the user's UUID in the Authentication tab, go to the Table Editor, find their specific record in the profile/roles table, and manually change their role field to `admin` (or however the app structures its RBAC).
- **Transfer Folders and Projects Across Users**: 
  1. Log into Supabase and open the **Table Editor**.
  2. Find the relevant `folders` and `projects` tables.
  3. Locate the row you want to transfer.
  4. Manually update the `user_id` (or `owner_id`) column to be the UUID of the target user. 
- **When to do this**: When onboarding someone new, providing elevated permissions, or handling manual support requests to migrate data.

### ⚠️ Things to be Careful With Post-Deployment
1. **The HTML Exporter Bundle (`player.js`)**: Remember to run `npm run build:player` in the `/App` folder whenever you touch `GeometryRenderer.ts` or fundamental PIXI logic. The HTML exports load their own standalone player file uncoupled from the live app bundle, meaning exports will look broken if you forget to rebuild the player!
2. **Database Migrations via Dashboard**: Adjusting tables directly in the Supabase UI is easy, but make sure to update your local Typescript interfaces (in `/src/types` etc.) and local `supabase/migrations` (if utilized) to match. A database schema mismatch can break the app in production.
3. **PixiJS Complexity Limits**: Highly customized groups with multiple inner filters, high segment counts, and glow effects can cripple WebGL performance on lower-tier mobile browser environments. Periodically test edge-case creations on actual mobile hardware to ensure you aren't overloading the GPU.
