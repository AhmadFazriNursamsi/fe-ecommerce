# Codegen Agent Specification – Full Next.js 14 Frontend Generator  
This file defines EXACTLY what you must generate in the workspace.

You are a Code-Generation Agent with FULL WRITE ACCESS to this project folder.

Your task:
**Generate a complete, fully functional frontend e-commerce application using Next.js 14, based on the backend API defined below.**

Do NOT print file contents in chat.  
Do NOT ask questions.  
Do NOT wait for confirmation.  
IMMEDIATELY create the full folder structure and all required files in the workspace.

Write all files directly.

---

# ================================
#  🔗 BACKEND API CONTRACT (STRICT)
# ================================

Base URL:

```

[http://localhost:8181/api](http://localhost:8181/api)

````

You MUST follow this API contract exactly.

## GET /products
Response: array of Product.

## GET /products/:slug
Response: Product.

## POST /checkout
Body:
```json
{
  "customer_name": "",
  "customer_email": "",
  "customer_phone": "",
  "customer_address": "",
  "items": [
    { "product_id": 1, "qty": 2 }
  ]
}
````

Response:

```json
{
  "order": { ... },
  "payment_url": "https://...",
  "snap_token": "..."
}
```

Frontend must redirect user to `payment_url`.

## POST /admin/login

Body:

```json
{ "email": "", "password": "" }
```

Response includes:

```json
{ "token": "JWT_TOKEN", "admin": { ... } }
```

Store `admin_token` in localStorage.

## Admin protected routes:

* POST /admin/products
* PUT /admin/products/:id
* DELETE /admin/products/:id
* GET /admin/orders
  All require header:
  `Authorization: Bearer <token>`

---

# ================================

# 📁 PROJECT STRUCTURE REQUIRED

# ================================

You MUST generate the following files EXACTLY:

```
src/
  app/
    layout.tsx
    page.tsx
    products/
      page.tsx
      [slug]/
        page.tsx
    cart/
      page.tsx
    checkout/
      page.tsx
    success/
      page.tsx
    admin/
      login/
        page.tsx
      dashboard/
        page.tsx
      orders/
        page.tsx
      products/
        new/
          page.tsx
        [id]/
          page.tsx

  components/
    site-navbar.tsx
    site-footer.tsx
    product-card.tsx
    cart-item.tsx

  lib/
    api.ts
    cart-store.ts
    types.ts

tailwind.config.js
postcss.config.js
tsconfig.json
package.json (modify if needed)
```

You MUST create all missing folders too.

---

# ================================

# 🎨 UI REQUIREMENTS

# ================================

* Use **TailwindCSS**
* Clean, modern layout (shadcn/codex style allowed)
* Responsive navigation bar
* Product grid with modern cards
* Product detail with Add to Cart button
* Cart page showing items and total
* Checkout page with form + submit
* Redirect to payment_url after POST /checkout
* Success page simple static confirmation

---

# ================================

# 🛒 CART STORE (ZUSTAND)

# ================================

Generate `src/lib/cart-store.ts`:

* items: CartItem[]
* add(product, qty?)
* remove(productId)
* clear()

`CartItem = Product + qty`.

State must persist only in memory (no backend).

---

# ================================

# 📡 API WRAPPER (AXIOS)

# ================================

Generate `src/lib/api.ts`:

* Use axios
* Use:

  ```
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8181/api"
  ```
* Admin requests must include:

  ```
  Authorization: Bearer <localStorage.admin_token>
  ```

---

# ================================

# 📑 TYPES (TypeScript)

# ================================

Generate `src/lib/types.ts`:

* Product
* OrderItem
* Order
* OrderStatus
  Types must match backend fields exactly.

---

# ================================

# 🔐 ADMIN AREA

# ================================

You MUST implement:

## `/admin/login`

* POST to `/admin/login`
* Store token in `localStorage.admin_token`
* Redirect to `/admin/dashboard`

## `/admin/dashboard`

* Show buttons:

  * Manage Orders
  * Create Product
  * Edit Product (if needed)

## `/admin/orders`

* GET /admin/orders
* Table:

  * order_code
  * customer_name
  * status
  * total_amount
  * created_at

## `/admin/products/new`

* POST /admin/products

## `/admin/products/[id]`

* GET product using `/products`
* PUT /admin/products/:id

---

# ================================

# 🚀 ACTIONS FOR AGENT (IMPORTANT)

# ================================

You MUST:

1. Read this entire `agent.md`
2. Generate ALL required folders and ALL required files
3. Write files DIRECTLY to the workspace
4. DO NOT print file content in chat
5. DO NOT ask for confirmation
6. DO NOT create placeholders—write full working code
7. Produce a production-ready frontend

---

# ================================

# ▶ FINAL TASK

# ================================

**Now generate the complete Next.js 14 frontend project as specified.
Write ALL files directly to the workspace.
Do NOT output file content in chat.**

```

---

# 🎉 **Selesai!**

Sekarang kamu tinggal lakukan:

### 1️⃣ Pastikan folder project kamu sudah dibuka di ChatGPT (Projects mode)  
### 2️⃣ Pastikan `agent.md` ini sudah berada di root folder  
### 3️⃣ Ketik perintah:

```

Read agent.md and generate the full project.
Write all files directly into the workspace.

```

Lalu GPT akan:

✔ langsung membuat folder  
✔ langsung membuat file  
✔ mengisi setiap file dengan kode lengkap  
✔ tanpa copy-paste  
✔ langsung muncul di VSCode kamu

---

# 🚀 Fazri, kamu tinggal bilang **“sudah saya taruh agent.md”**  
Kalau sudah, aku bantu kasih **prompt final** untuk menjalankannya.
```
