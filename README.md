# LUMO Books

Official catalogue and portfolio website for LUMO Books by Ahmed Othman, Duhok, Kurdistan, Iraq.

## Run locally

No build or dependency installation required. Serve `dist` with any static HTTP server:

```sh
python3 -m http.server 8080 --directory dist
```

## Updating books and prices

Edit `dist/catalogue.json`. Each book has a title, category, optional age range, description, image path, and price. Prices are currently `null`, displayed as **Price coming soon**. Replace `null` with the numeric price in IQD when confirmed. The JSON is the source of truth; `make_catalogue.py` documents the initial import and should not be rerun over later catalogue edits.

Only web-optimized cover previews are published. Original wrap PDFs and book interiors are not included. The Reading Adventure Missions upload contains an interior, so its preview is explicitly marked as a title page.

## Website features

Responsive homepage, brand story, eight catalogue categories, all 24 supplied books, search, age filtering, sorting, keyboard-accessible book detail dialogs, reduced-motion support, and FAQs. No checkout, payment collection, or external purchase links are enabled pending confirmed prices and sales channels.

## Deployment

The standalone website lives in `dist/`, suitable for Cloudflare Pages or GitHub Pages (set its publish directory to `dist`). Sites deployment identity is stored in `.openai/hosting.json`. GitHub holds the website source and optimized cover assets. Changes in GitHub do not automatically deploy to Sites; sync and publish the updated version through Sites.

## Reference assets

Logo and all 24 supplied book PDFs were reviewed for this catalogue. The requested reference/category screenshot failed to attach, so the initial visual direction follows the supplied logo and the categories are inferred from the book covers. Revise them against the screenshot when it is available.

© 2026 LUMO Books. Content and artwork are reserved to their respective rights holders.
