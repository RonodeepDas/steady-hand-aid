name: Deploy Vite Site to GitHub Pages

on:
  push:
    branches:
      - main  # deploy on push to main branch

permissions:
  contents: write  # allow pushing to gh-pages

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build Vite project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4  # ✅ fixed version
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist      # matches vite.config.ts
          publish_branch: gh-pages
