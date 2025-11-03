# checkmark-icons

> 🦄 Well, it started out as an easy way to store icons publicly for a project I was working on, but it has since grown into a small collection of various things across unrelated projects. So here we are. My personal icon repository, random images, logos, color palettes, and anything else I feel like throwing in here. At least up until GitHub decides I've exceeded my storage limit. 😆

## License

Everything in this repository—code, images, and any other assets—is licensed under the [PolyForm Shield License 1.0.0](./LICENSE).  The [`icons/` directory](./icons) is the only exception and is covered by the standard MIT license, which is included in that directory for convenience. I borrowed those from GitHub, so it only makes sensse to stick to the original.

> TL;DR: you’re welcome to use the assets personally or privately, but you can’t monetize or profit from them without explicit permission. Review the license files for full terms.

## GitHub Pages Playground

Curious how different GitHub Pages strategies feel? The workflow at `.github/workflows/compare-pages.yml` publishes three side-by-side variants under the live site:

- `/plain/` — an untouched copy of `index.html` plus the `icons/` directory.
- `/icon-catalog/` — a Node-generated gallery built via `scripts/build-icon-catalog.mjs`.
- `/jekyll/` — a miniature Jekyll site sourced from `jekyll-site/` and rendered with the Minima theme.

The workflow uploads a single artifact and deploys it without keeping a dedicated `gh-pages` branch history, so you can mix, match, or remove variants whenever you want.
