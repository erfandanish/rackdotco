# RACKDOTCO

Modern Malaysian preloved streetwear storefront. Plain HTML/CSS/JS, no build step.

## 1. Logo
Put the **actual original RACKDOTCO logo** at `assets/rackdotco-logo.png`. Do not recreate the logo.

## 2. Contact settings
Edit only `js/config.js` to change Instagram and WhatsApp.

## 3. Products
Edit `js/products.js`. Each product uses `id`, `name`, `category`, `price`, `size`, `condition`, `description`, `image`, `status`.

Categories: `Sneakers`, `Jerseys`, `Tees`, `Others`.
Statuses: `AVAILABLE`, `SOLD`.

## 4. GitHub + Netlify
Push this folder to GitHub. In Netlify, import the repository. No build command is needed. Publish directory: `.`

## 5. Supabase later
This first version is intentionally static and fast. Later, product data/images can move to Supabase Database + Storage, with Supabase Auth/RLS for an owner dashboard. Never expose a Supabase service-role key in frontend code.
