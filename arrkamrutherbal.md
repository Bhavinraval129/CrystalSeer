# Arrkamrutherbal — Full Project Architecture & Reference Documentation

> **Purpose:** This document is a complete blueprint of the Arrkamrutherbal project. Use it as a reference when building a similar project (e.g., Crystalseer) so you have all patterns, file paths, data shapes, and logic documented in one place.

---

## Table of Contents

1. [Tech Stack Overview](#1-tech-stack-overview)
2. [Project Folder Structure](#2-project-folder-structure)
3. [Environment Variables (.env.local)](#3-environment-variables-envlocal)
4. [Database — Supabase](#4-database--supabase)
5. [Cloudinary — Image Uploads](#5-cloudinary--image-uploads)
6. [Vercel — Deployment](#6-vercel--deployment)
7. [Next.js Configuration](#7-nextjs-configuration)
8. [Theme System (Dynamic Branding)](#8-theme-system-dynamic-branding)
9. [Admin Panel — Full Walkthrough](#9-admin-panel--full-walkthrough)
10. [Public Site — Pages & Components](#10-public-site--pages--components)
11. [Components Library](#11-components-library)
12. [Design System & Tailwind Tokens](#12-design-system--tailwind-tokens)
13. [Key Data Flows](#13-key-data-flows)
14. [Seed Data & Migration Scripts](#14-seed-data--migration-scripts)
15. [Crystalseer — How to Replicate This Architecture](#15-crystalseer--how-to-replicate-this-architecture)

---

## 1. Tech Stack Overview

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | **Next.js** (App Router) | 16.2.4 |
| Language | **TypeScript** | ^5 |
| Styling | **Tailwind CSS v4** | ^4 |
| Database / Backend | **Supabase** (PostgreSQL) | `@supabase/ssr ^0.10.3`, `@supabase/supabase-js ^2.106.0` |
| Image Hosting | **Cloudinary** | `cloudinary ^2.10.0` |
| Animations | **Framer Motion** | `^12.38.0` |
| Icons | **Lucide React** | `^1.14.0` |
| Rich Text Editor | **react-quill-new** | `^3.8.3` |
| Image Cropper | **react-easy-crop** | `^5.5.7` |
| DB Direct Access | **pg** (node-postgres, for migration scripts) | `^8.21.0` |
| Fonts | Google Fonts: **Inter**, **Geist Mono**, **Playfair Display** | via `next/font/google` |
| Deployment | **Vercel** | (via GitHub integration) |

---

## 2. Project Folder Structure

```
Arrkamrutherbal-main/
├── .env.local                     ← Environment variables (NEVER commit)
├── next.config.ts                 ← Next.js config (Cloudinary image domains)
├── tailwind.config.ts             ← Custom design tokens / brand colors
├── tsconfig.json
├── package.json
│
├── app/                           ← Next.js App Router (all pages/routes)
│   ├── layout.tsx                 ← Root layout (fonts, ThemeProvider wrapper)
│   ├── globals.css                ← Global styles, CSS variables, utility classes
│   │
│   ├── (site)/                    ← Public-facing website (route group)
│   │   ├── layout.tsx             ← Site layout (Navbar + Footer + WhatsApp + MobileBar)
│   │   ├── page.tsx               ← Homepage
│   │   ├── loading.tsx            ← Loading spinner for site
│   │   ├── about/                 ← About page
│   │   ├── contact/               ← Contact page
│   │   ├── journey/               ← Journey/Story page
│   │   ├── category/
│   │   │   ├── page.tsx           ← All categories listing (table view)
│   │   │   └── [categoryId]/      ← Single category product listing
│   │   └── products/
│   │       ├── page.tsx           ← All products grid
│   │       └── [id]/
│   │           └── page.tsx       ← Product detail page (SSR)
│   │
│   └── admin/                     ← Admin panel (password-protected)
│       ├── layout.tsx             ← Admin layout: auth guard + sidebar navigation
│       ├── page.tsx               ← Admin dashboard (stats + recent products)
│       ├── products/
│       │   ├── page.tsx           ← Products list (search, filter, delete, toggle)
│       │   ├── actions.ts         ← Server Action: uploadToCloudinary()
│       │   ├── new/
│       │   │   └── page.tsx       ← Add new product form (full CRUD)
│       │   └── [id]/
│       │       ├── layout.tsx
│       │       └── edit/
│       │           └── page.tsx   ← Edit existing product form
│       ├── categories/
│       │   ├── page.tsx           ← Category list (search, product count, delete)
│       │   ├── new/page.tsx       ← Add new category
│       │   └── [id]/edit/page.tsx ← Edit category
│       ├── subcategories/
│       │   └── page.tsx           ← Subcategories (inline add/edit via modals)
│       └── settings/
│           └── page.tsx           ← Site settings (name, logo, contact, theme)
│
├── components/                    ← Reusable React components
│   ├── theme/
│   │   └── ThemeProvider.tsx      ← Context: loads site_settings, applies CSS vars
│   ├── layout/
│   │   ├── Navbar.tsx             ← Site header / navigation
│   │   ├── Footer.tsx             ← Site footer
│   │   └── MobileContactBar.tsx   ← Sticky bottom bar on mobile
│   ├── ui/
│   │   └── FloatingWhatsApp.tsx   ← Floating WhatsApp button (desktop)
│   ├── home/
│   │   ├── Hero.tsx               ← Hero slider (3 banners, auto-rotate, Framer Motion)
│   │   ├── Categories.tsx         ← Category cards grid
│   │   ├── BestProducts.tsx       ← Best sellers grid (SSR, from Supabase)
│   │   ├── WhyChooseUs.tsx        ← Feature highlights section
│   │   ├── AboutSnippet.tsx       ← Short about us section
│   │   └── CTABanner.tsx          ← Call to action banner
│   ├── catalog/
│   │   └── ProductGrid.tsx        ← Reusable product card grid
│   └── admin/
│       ├── CategoryDropdown.tsx
│       ├── CategorySubcategoryDropdown.tsx  ← Linked Category + Subcategory selects
│       └── RichTextEditor.tsx               ← react-quill-new wrapper
│
├── utils/
│   └── supabase/
│       ├── client.ts              ← Browser Supabase client
│       └── server.ts              ← Server Supabase client (with cookies)
│
├── data/
│   ├── categories.json            ← Seed data for categories
│   └── products.json              ← Seed data for products
│
├── supabase/
│   ├── schema.sql                 ← Initial DB schema (run first)
│   └── migrations/
│       ├── add_subcategories.sql
│       ├── add_has_details_to_products.sql
│       └── add_category_seo_and_download_link.sql
│
├── public/
│   └── images/
│       ├── banners/               ← Banner1.png, Banner2.png, Banner3.png
│       └── products/              ← Local fallback images
│
├── seed_products.js               ← Script: seeds products from data/products.json
├── run_migration.js               ← Script: runs add_subcategories.sql
├── run_has_details_migration.js   ← Script: runs has_details migration
└── run_custom_migration.js        ← Script: runs SEO migration
```

---

## 3. Environment Variables (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-public-key>

# Database Direct Connection (for pg migration scripts)
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@<host>:5432/postgres

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
CLOUDINARY_URL=cloudinary://<api-key>:<api-secret>@<cloud-name>
```

> **Rules:**
> - `NEXT_PUBLIC_*` vars are exposed to the browser — only safe/public keys go here
> - `CLOUDINARY_API_SECRET` is server-only — used ONLY in Server Actions (`"use server"`)
> - `DATABASE_URL` uses Supabase Session Pooler (port 5432), only for Node.js migration scripts

---

## 4. Database — Supabase

Supabase is the **backend database** (PostgreSQL). All reads/writes use the Supabase JS client. There is **no Supabase Auth** — admin auth is a simple custom `admin_users` table with sessionStorage sessions.

### 4.1 Tables & Schema

#### `categories`
```sql
CREATE TABLE categories (
  id          TEXT PRIMARY KEY,  -- slug-based e.g. 'hair-care'
  name        TEXT NOT NULL,
  description TEXT,              -- HTML from rich text editor
  icon        TEXT DEFAULT 'folder',
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  -- Added via migration:
  seo_title          TEXT,
  seo_sections       JSONB DEFAULT '[]'::jsonb,
  download_list_url  TEXT
);
```

#### `subcategories`
```sql
CREATE TABLE IF NOT EXISTS subcategories (
  id          TEXT PRIMARY KEY,  -- slug + random suffix e.g. 'serum-342'
  name        TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

#### `products`
```sql
CREATE TABLE products (
  id             TEXT PRIMARY KEY,  -- slug e.g. 'bhringraj-hair-oil'
  name           TEXT NOT NULL,
  category       TEXT REFERENCES categories(id) ON DELETE SET NULL,
  subcategory    TEXT REFERENCES subcategories(id) ON DELETE SET NULL,
  sku            TEXT,
  short_benefit  TEXT,
  description    TEXT,              -- HTML (rich text)
  how_to_use     TEXT,
  is_best_seller BOOLEAN DEFAULT FALSE,
  has_details    BOOLEAN DEFAULT FALSE,  -- Controls if detail page is accessible
  image          TEXT,                   -- Cloudinary URL
  benefits       JSONB DEFAULT '[]'::jsonb,   -- Array of strings
  ingredients    JSONB DEFAULT '[]'::jsonb,   -- Array of strings
  specs          JSONB DEFAULT '{}'::jsonb,   -- Key-value object
  sections_visibility JSONB,  -- { description, benefits, ingredients, howToUse }
  custom_sections     JSONB,  -- [{ id, title, content, isVisible }]
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

**Key design decisions:**
- `id` is a **text slug**, not UUID — generated from product name
- `has_details = false` → product appears in category list but has **no clickable detail page**
- `benefits`, `ingredients` are JSONB arrays of strings
- `specs` is a JSONB object (key-value pairs like `{ "Net Weight": "200ml" }`)
- `sections_visibility` controls which content sections show on the product detail page
- `custom_sections` lets you add arbitrary titled sections with HTML content

---

#### `site_settings` (always single row)
```sql
CREATE TABLE site_settings (
  id                     INT PRIMARY KEY DEFAULT 1,
  site_name              TEXT DEFAULT 'Arrkamrut Herbal',
  tagline                TEXT DEFAULT 'Handcrafted with Love, Rooted in Nature',
  phone                  TEXT DEFAULT '+91 98765 43210',
  email                  TEXT DEFAULT 'hello@arrkamrut.demo',
  whatsapp               TEXT DEFAULT '919876543210',  -- digits only, no + or spaces
  address                TEXT DEFAULT '123 Nature Valley...',
  footer_text            TEXT DEFAULT 'Premium Demo Site',
  logo_url               TEXT,                          -- Cloudinary URL
  theme_primary_color    TEXT DEFAULT '#4A5D23',
  theme_background_color TEXT DEFAULT '#FAF9F6',
  theme_text_color       TEXT DEFAULT '#2D3A15',
  theme_heading_font     TEXT DEFAULT '''Playfair Display'', serif',
  theme_body_font        TEXT DEFAULT '''Geist'', sans-serif',
  theme_base_font_size   TEXT DEFAULT '16px'
);
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
```

---

#### `admin_users` (create manually in Supabase)
```sql
CREATE TABLE admin_users (
  id       SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL   -- plain text (no hashing in this project)
);
INSERT INTO admin_users (username, password) VALUES ('admin', 'yourpassword');
```

> ⚠️ Passwords are stored in **plain text**. For production, use Supabase Auth or bcrypt.

---

### 4.2 Migrations Applied (run in order)

| Order | File | What it does |
|-------|------|-------------|
| 1 | `supabase/schema.sql` | Creates categories, products, site_settings |
| 2 | `supabase/migrations/add_subcategories.sql` | Creates subcategories table + adds FK in products |
| 3 | `supabase/migrations/add_has_details_to_products.sql` | Adds `has_details BOOLEAN` to products |
| 4 | `supabase/migrations/add_category_seo_and_download_link.sql` | Adds SEO fields to categories |

---

### 4.3 How Supabase is Used

#### Browser Client (`utils/supabase/client.ts`)
```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```
Used in: all `"use client"` components (admin pages, public pages with client-side data fetching).

#### Server Client (`utils/supabase/server.ts`)
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() {...}, setAll() {...} } }
  )
}
```
Used in: **Server Components** — runs on the server at request time (BestProducts, product detail page).

#### Typical query pattern
```ts
const supabase = createClient(); // or await createClient() for server

const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('is_best_seller', true)
  .order('created_at', { ascending: false })
  .limit(4);
```

---

## 5. Cloudinary — Image Uploads

All product images and the site logo are stored in Cloudinary.

### Server Action (`app/admin/products/actions.ts`)
```ts
"use server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(base64Image: string) {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder:       'arrkamrut/products',  // Change per project!
    eager_async:  true,
    quality:      'auto',
    fetch_format: 'auto',
  });
  return { success: true, url: result.secure_url };
}
```

### Upload Flow
```
1. User selects file in admin form
2. FileReader reads it → base64 data URL
3. Image preview shown immediately in UI
4. On form submit:
   a. If preview starts with "data:image" → call uploadToCloudinary(preview)
   b. Get back secure_url
   c. Save that URL into the `image` column in Supabase
5. Frontend renders images with <Image src={cloudinaryUrl} />
```

### next.config.ts — Allow Cloudinary images
```ts
images: {
  unoptimized: true,  // Cloudinary handles optimization
  remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
}
```

- Max file size: **5MB** (enforced client-side)
- Products folder: `arrkamrut/products`
- `unoptimized: true` avoids Next.js image optimization costs on Vercel free tier

---

## 6. Vercel — Deployment

### Setup Steps
1. Push repository to GitHub
2. Connect GitHub repo to Vercel
3. In Vercel → Environment Variables, add all variables from `.env.local`
4. Deploy → Vercel auto-detects Next.js and builds with `next build`

### Important: Supabase RLS
Since the anon key is used for everything, you must either disable RLS or create permissive policies:
```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON products FOR ALL USING (true) WITH CHECK (true);
-- Repeat for categories, subcategories, site_settings, admin_users
```

---

## 7. Next.js Configuration

Root Layout (`app/layout.tsx`):
- Loads three Google Fonts: `Inter`, `Geist_Mono`, `Playfair_Display` via `next/font/google`
- Wraps everything in `<ThemeProvider>` (loads site settings, applies CSS vars)
- `suppressHydrationWarning` on `<html>` and `<body>` to prevent hydration mismatch

---

## 8. Theme System (Dynamic Branding)

**File:** `components/theme/ThemeProvider.tsx`

A React Context that:
1. On mount → fetches `site_settings` row (id=1) from Supabase
2. Maps DB fields → `ThemeConfig` TypeScript object
3. Sets CSS custom properties on `document.documentElement`
4. Falls back to `localStorage.getItem("site_theme")` if Supabase fails

### ThemeConfig Type
```ts
type ThemeConfig = {
  primaryColor:    string;
  backgroundColor: string;
  textColor:       string;
  headingFont:     string;
  bodyFont:        string;
  baseFontSize:    string;
  siteName:        string;
  tagline:         string;
  phone:           string;
  email:           string;
  whatsapp:        string;
  address:         string;
  footerText:      string;
  logoUrl:         string | null;
};
```

### CSS Variables applied
```
--theme-primary      (primaryColor)
--theme-bg           (backgroundColor)
--theme-text         (textColor)
--background         (backgroundColor)
--foreground         (textColor)
--font-serif         (headingFont)
--font-geist-sans    (bodyFont)
document.documentElement.style.fontSize = baseFontSize
```

### Using theme in any component
```tsx
import { useTheme } from "@/components/theme/ThemeProvider";
const { theme, setTheme } = useTheme();
// theme.siteName, theme.phone, theme.whatsapp, theme.logoUrl...
```

---

## 9. Admin Panel — Full Walkthrough

Located at `/admin/*`. Uses a **custom sessionStorage-based auth** (not Supabase Auth).

### 9.1 Authentication

**File:** `app/admin/layout.tsx`

1. On mount → checks `sessionStorage.getItem("admin_logged_in")`
2. If `"true"` → show admin dashboard layout
3. If not → show glassmorphic login screen
4. Login: query `admin_users` table, match username + password
5. Success → `sessionStorage.setItem("admin_logged_in", "true")`
6. Logout → remove from sessionStorage, reset state

### Sidebar Navigation
```
Dashboard      /admin
Products       /admin/products
Categories     /admin/categories
Subcategories  /admin/subcategories
Site Settings  /admin/settings
```

---

### 9.2 Dashboard (`/admin`)

- 3 stat cards: Total Products | Total Categories | Best Sellers count
- Table of 4 most recently added products
- All data fetched client-side via `useEffect` + Supabase browser client

---

### 9.3 Products Management

#### Product List (`/admin/products`)
- Search by name (client-side filter)
- Filter by category (dropdown)
- Table (desktop) / Card list (mobile)
- **Details Page toggle switch** → directly updates `has_details` in Supabase on toggle
- Edit → `/admin/products/[id]/edit` | Delete → confirmation modal

**Table columns:** Product (image + name + benefit) | Category | Details Page (toggle) | Status | Actions

---

#### Add New Product (`/admin/products/new`)

**Full form fields:**
- Name (required) → slug ID auto-generated
- Category (required) + Subcategory (optional) via `CategorySubcategoryDropdown`
- Short Benefit
- Product Image upload (base64 preview → Cloudinary on submit)
- Is Best Seller toggle
- Has Details toggle (whether detail page exists)
- Section visibility toggles: Description, Benefits, Ingredients, How to Use
- Rich text Description (react-quill-new)
- Benefits list (dynamic rows)
- Ingredients list (dynamic rows)
- Specs (key-value pair rows)
- How to Use (plain textarea)
- Custom Sections (title + rich text, add/remove)

**Submit flow:**
1. Validate name + category
2. Upload image to Cloudinary if new image selected
3. Generate `id`: `name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')`
4. `supabase.from('products').insert({...})`

---

#### Edit Product (`/admin/products/[id]/edit`)
Same form as Add, pre-filled. Uses `supabase.update()` instead of `insert`.

---

### 9.4 Categories Management (`/admin/categories`)

- Search by name | Product count per category
- Edit → `/admin/categories/[id]/edit` | Delete → modal

**Form fields (add/edit):**
- Name → slug ID
- Description (rich text)
- SEO Title, SEO Sections (JSONB array)
- Download List URL (optional PDF)

---

### 9.5 Subcategories Management (`/admin/subcategories`)

Uses **inline modals** (not separate pages):
- **Add Modal:** Parent Category + Name + Description
- **Edit Modal:** Same fields, pre-filled
- **Delete Modal:** Confirmation

**ID generation:** `slug + random number`
```ts
const id = name.toLowerCase().replace(/\s+/g, "-") + '-' + Math.floor(Math.random() * 1000);
```

---

### 9.6 Site Settings (`/admin/settings`)

**Sections:**
1. **Brand Logo** — Upload, preview, remove → uploaded to Cloudinary on save
2. **Site Identity** — Site Name, Tagline, Footer Text
3. **Contact Information** — Phone, Email, WhatsApp, Address

**On Save:**
1. Upload new logo to Cloudinary if changed
2. `supabase.from('site_settings').update({...}).eq('id', 1)`
3. Call `setTheme(newSettings)` → updates global ThemeContext immediately
4. Toast notification "Settings saved!"

---

## 10. Public Site — Pages & Components

### 10.1 Layout & Navigation

`app/(site)/layout.tsx` wraps every public page with:
```tsx
<Navbar />
<main>{children}</main>
<Footer />
<FloatingWhatsApp />    // desktop floating button
<MobileContactBar />    // sticky bottom bar (mobile)
```

The site layout also adds `pb-16 md:pb-0` to leave space for the mobile bar.

**Navbar** — logo (from `theme.logoUrl` or text), site name, nav links (Home, Products, Collections, About, Contact), mobile hamburger

**Footer** — site name, tagline, contact info from `theme`, quick links, footer text

**FloatingWhatsApp** — fixed bottom-right circle → `https://wa.me/{theme.whatsapp}`, hidden on mobile

**MobileContactBar** — fixed bottom, Phone + WhatsApp buttons, only on mobile

---

### 10.2 Homepage Sections

```
app/(site)/page.tsx:
  <Hero />           ← Banner slider
  <Categories />     ← Category cards
  <BestProducts />   ← Best seller cards (Server Component, SSR)
  <WhyChooseUs />    ← Feature highlights
  <AboutSnippet />   ← Mini about us
  <CTABanner />      ← Call to action
```

#### Hero (`components/home/Hero.tsx`)
- 3 static banner slides from `public/images/banners/`
- Auto-rotates every 7 seconds via `setInterval`
- Framer Motion `AnimatePresence` for transitions
- Previous/Next buttons, progress dots
- Fallback emoji (🌿) if banner image fails

#### BestProducts (`components/home/BestProducts.tsx`)
- **Server Component** → uses `createClient()` from `utils/supabase/server.ts`
- Fetches `is_best_seller = true` AND `has_details != false`, limit 4
- Product cards are `<Link>` if `has_details`, else `<div>` (no navigation)

---

### 10.3 Category Listing Page (`/category`)

- Client-side fetches: categories + subcategories + products
- Groups products by category in a **table layout**
- Row: Product name (link if has_details) | Subcategory name
- Products with `has_details = false` shown as plain non-clickable text

---

### 10.4 All Products Page (`/products`)

- Client-side fetch, filters out `has_details = false` products
- Renders `<ProductGrid products={products} />`

---

### 10.5 Product Detail Page (`/products/[id]`)

**Server Component** (SSR):
- `generateStaticParams()` pre-generates all product IDs
- Fetches product by ID + site_settings for WhatsApp number
- `notFound()` if product not found

**Layout (2-col desktop):**
- Left: product image (sticky, `fill` + `object-contain`)
- Right: name, specs table, "Order on WhatsApp" button, category, content sections

**Content sections** (controlled by `sectionsVisibility`):
- Description (HTML via `dangerouslySetInnerHTML`)
- Key Ingredients (list)
- Key Benefits (list)
- How to Use (plain text)
- Custom Sections (title + HTML)

**WhatsApp button:**
```
https://wa.me/{whatsappNumber}?text=I want to order {product.name}
```

---

### 10.6 Other Pages

| Route | Purpose |
|-------|---------|
| `/about` | About the brand |
| `/contact` | Contact form / info |
| `/journey` | Brand story / timeline |

---

## 11. Components Library

### Admin

#### `CategorySubcategoryDropdown.tsx`
- Linked dropdowns: selecting category loads its subcategories from Supabase
- Props: `value: { category, subcategory }`, `onChange`

#### `RichTextEditor.tsx`
- Wraps `react-quill-new`
- Returns HTML string
- Used for: product description, category description, custom sections

#### `CategoryDropdown.tsx`
- Simple category select
- Loads categories from Supabase on mount

---

### UI

#### `FloatingWhatsApp.tsx`
- Gets number from `useTheme()`
- Fixed bottom-right → `https://wa.me/{whatsapp}`

---

## 12. Design System & Tailwind Tokens

### Brand Color Palette
```ts
brand: {
  green:        "#4CAF50",   // Primary green
  "green-dark": "#2E7D32",   // Hover green
  "green-light":"#81C784",
  "green-lime": "#8BC34A",
  gold:         "#F59E0B",   // Accent / highlight
  "gold-light": "#FCD34D",
  cream:        "#F0FDF4",   // Page background
  "cream-dark": "#DCFCE7",
  dark:         "#111827",   // Primary text
  "dark-mid":   "#1F2937",
  "dark-soft":  "#374151",
  "text-light": "#4B5563",
  "text-muted": "#9CA3AF",
}
```

### Font Families
```ts
sans:  ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
serif: ["var(--font-serif)", "Georgia", "serif"],   // Playfair Display
mono:  ["var(--font-geist-mono)", "monospace"],
```

### Custom Shadows
```ts
"card":          "0 2px 16px -2px rgba(17,24,39,0.08)"
"card-hover":    "0 8px 32px -4px rgba(17,24,39,0.14)"
"premium":       "0 4px 24px -2px rgba(76,175,80,0.12)"
"premium-hover": "0 12px 40px -4px rgba(76,175,80,0.22)"
```

### CSS Utility Classes (globals.css)
```css
.badge-green          /* Small pill badge with green dot */
.btn-primary          /* Green gradient CTA button */
.btn-outline          /* Outlined button */
.text-gradient        /* Green gradient text effect */
.section-divider-left /* Left-aligned horizontal accent line */
```

---

## 13. Key Data Flows

### Flow A: Add a Product
```
Admin fills /admin/products/new form
  → User picks image → FileReader → base64 preview
  → Submit:
    1. uploadToCloudinary(base64) [Server Action] → Cloudinary API → secure_url
    2. slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    3. supabase.from('products').insert({ id: slug, image: secure_url, ... })
    4. Success → redirect to /admin/products
```

### Flow B: Product Detail Page (SSR)
```
User visits /products/bhringraj-hair-oil
  → Next.js Server Component:
    1. createServerClient() (cookies-based)
    2. supabase.from('products').select('*').eq('id', 'bhringraj-hair-oil')
    3. supabase.from('site_settings').select('whatsapp')
  → Render: image (Cloudinary CDN) + content sections + WhatsApp button
```

### Flow C: Theme Loading
```
App loads → ThemeProvider mounts (Client Component)
  1. supabase.from('site_settings').select('*').single()
  2. Map fields → ThemeConfig
  3. Apply CSS variables to document.documentElement
  → All useTheme() consumers receive live values
```

### Flow D: has_details Toggle
```
Admin toggles switch on /admin/products
  → toggleDetails(id, current):
    1. Optimistic UI update (immediate visual)
    2. supabase.from('products').update({ has_details: !current }).eq('id', id)
    3. Error → revert optimistic update

Public effect:
  has_details = true  → Product clickable in category list + appears in /products
  has_details = false → Non-clickable text in category list + hidden from /products
```

### Flow E: Site Settings Save
```
Admin submits /admin/settings form
  → If new logo (base64) → uploadToCloudinary() → secure_url
  → supabase.from('site_settings').update({...}).eq('id', 1)
  → setTheme(newSettings) → CSS variables update globally
  → localStorage.setItem("site_theme", JSON.stringify(newSettings))
  → Toast notification shown for 3 seconds
```

---

## 14. Seed Data & Migration Scripts

### Seed Products
```bash
node seed_products.js
# Reads data/products.json, inserts into Supabase products table
```

### Sample categories.json
```json
[
  { "id": "hair-care",      "name": "Hair Care",      "description": "...", "icon": "leaf" },
  { "id": "skin-care",      "name": "Skin Care",      "description": "...", "icon": "droplet" },
  { "id": "handmade-soaps", "name": "Handmade Soaps", "description": "...", "icon": "sparkles" }
]
```

### Migration Runner Pattern
```js
// run_migration.js
import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const sql = fs.readFileSync('./supabase/migrations/filename.sql', 'utf8');
await client.query(sql);
await client.end();
console.log('Done!');
```

---

## 15. Crystalseer — How to Replicate This Architecture

### Setup Checklist

**Initial Setup:**
- [ ] `npx create-next-app@16 ./ --typescript --tailwind --app --no-src-dir`
- [ ] `npm install @supabase/ssr @supabase/supabase-js cloudinary framer-motion lucide-react react-quill-new react-easy-crop pg`
- [ ] Copy `tailwind.config.ts`, adjust brand colors for Crystalseer
- [ ] Copy font setup in `app/layout.tsx`

**Supabase:**
- [ ] Create new Supabase project
- [ ] Run `supabase/schema.sql` in SQL Editor
- [ ] Run all 3 migrations in order
- [ ] Create `admin_users` table + insert admin user
- [ ] Copy `utils/supabase/client.ts` and `server.ts` (no changes needed)
- [ ] Add all env vars to `.env.local`
- [ ] Disable RLS or add permissive policies

**Cloudinary:**
- [ ] Set up Cloudinary account
- [ ] Change folder in `actions.ts`: `folder: 'crystalseer/products'`
- [ ] Add Cloudinary env vars

**ThemeProvider:**
- [ ] Copy `components/theme/ThemeProvider.tsx` as-is
- [ ] Update `defaultTheme` colors for Crystalseer brand
- [ ] Wrap `app/layout.tsx` with `<ThemeProvider>`

**Admin Panel:**
- [ ] Copy entire `app/admin/` folder
- [ ] Update branding text ("Arrkamrut" → "Crystalseer")
- [ ] Copy `components/admin/` folder

**Public Site:**
- [ ] Copy `app/(site)/` folder
- [ ] Replace banner images in `public/images/banners/`
- [ ] Update hero copy and section text for Crystalseer brand
- [ ] Update `data/categories.json` with Crystalseer categories

**Vercel:**
- [ ] Push to GitHub → connect to Vercel
- [ ] Add all env vars in Vercel dashboard
- [ ] Deploy

---

### Quick Customization Map

| Item | Arrkamrutherbal | Crystalseer (suggested) |
|------|----------------|------------------------|
| Brand colors | Green (#4CAF50) + Gold (#F59E0B) | Crystal purple / indigo tones |
| Hero banners | Natural/herbal product imagery | Crystal / spiritual imagery |
| Product categories | Hair Care, Skin Care, Soaps | Crystal types, sets, etc. |
| Cloudinary folder | `arrkamrut/products` | `crystalseer/products` |
| Default site name | `Arrkamrut Herbal` | `Crystalseer` |
| Default tagline | `Handcrafted with Love...` | (your tagline) |
| Font (heading) | Playfair Display (serif) | Can keep or change |

---

## Quick Reference: Important File Paths

| What | Path |
|------|------|
| Supabase browser client | `utils/supabase/client.ts` |
| Supabase server client | `utils/supabase/server.ts` |
| Cloudinary upload action | `app/admin/products/actions.ts` |
| ThemeProvider (global context) | `components/theme/ThemeProvider.tsx` |
| Admin layout + auth guard | `app/admin/layout.tsx` |
| Product add form | `app/admin/products/new/page.tsx` |
| Product detail page (SSR) | `app/(site)/products/[id]/page.tsx` |
| Category listing page | `app/(site)/category/page.tsx` |
| Initial DB schema | `supabase/schema.sql` |
| Brand design tokens | `tailwind.config.ts` |
| Environment variables | `.env.local` |

---

*Documentation last updated: July 2026 — Arrkamrutherbal v1.0 complete build reference*
