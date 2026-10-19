# GEOL 1420 Exam 2 Master: Historical Geology & Stratigraphy

An interactive study application, custom exam simulator, animated 3D flashcards, and engagement dashboard built for GEOL 1420 Exam 2.

## GitHub Pages Deployment Instructions

This project is built with **Vite + React + Tailwind CSS**. To enable automatic deployments on GitHub Pages:

1. In your GitHub repository, navigate to **Settings** > **Pages** (under Code and automation).
2. Under **Build and deployment** > **Source**, select **GitHub Actions** (instead of "Deploy from a branch").
3. Push to `main` (or `master`). The configured workflow in `.github/workflows/jekyll-gh-pages.yml` will automatically:
   - Install dependencies (`npm ci`)
   - Build the Vite project (`npm run build`)
   - Deploy `./dist` to your live GitHub Pages URL!

## Features Included
- **Custom Practice Exam Builder**:
  - Customize question count (5, 10, 15, 20, 25, 30, up to full deck).
  - Multi-select topics (Taphonomy, Preservation Modes, Evolution, Classification, Cladistics, Stratigraphy, Isotopes).
  - Feedback mode: **Tutor Mode** (instant explanation) or **Exam Simulation Mode** (flag questions, question navigator grid, review at end).
  - Optional pacing timer (90s per question).
- **Animated 3D Flashcards**: Spaced repetition (Again, Moderate, Mastered), audio read-aloud, keyboard navigation (Space, 1/2/3, Arrows).
- **Engagement Tracker Dashboard**: Exam readiness meter, study streak counter, time logged, topic mastery matrices.
- **Geological Speed Match Game**: Fast recall tile matching challenge.
- **Interactive Strata Visualizer**: Walther's law transgression/regression slider, Steno's principles cross-section, Zircon U-Pb radioactive decay curve, and carbon cycle flux models.
- **Retro Carrd Aesthetic**: Cozy vintage browser window frame, earthy olive/terracotta/amber palette, gingham wallpaper pattern, Fraunces serif typography.
