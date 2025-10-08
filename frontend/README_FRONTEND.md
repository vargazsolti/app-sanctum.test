# shadcn-vue alapú Vue frontend – Quick Start

Ez a csomag egy minimál, **Vue 3 + Vite + Tailwind** frontend, **shadcn-vue stílusú** (Tailwind + headless) UI komponensekkel.
Cél: **Login**, **Dashboard** (Logouttal) és egy **bal oldali menü placeholder** – kompatibilis a **Laravel 12 + Sanctum** backendeddel.

## 📦 Telepítés

```bash
# 1) Csomagold ki a projekt mappájába
cp -r shadcn-vue-starter <frontend-root>

# 2) Függőségek
cd <frontend-root>
npm i

# 3) Környezet
cp .env.example .env
# .env-ben állítsd a backend URL-t:
# VITE_API_URL=http://app-sanctum.test

# 4) Dev szerver
npm run dev
```

> A frontend a következő endpointokat várja:
> - `POST /api/v1/auth/token` – login (válasz: `{ success, data: { token }, message }`)
> - `GET /api/v1/me` – bejelentkezett user
> - `POST /api/v1/auth/logout` – kilépés

## 🧱 Struktúra

```
src/
├─ assets/css/index.css    # Tailwind belépési pont
├─ components/
│  └─ ui/                  # shadcn-szerű, egyszerű, testreszabható komponensek
│     ├─ button.vue
│     ├─ input.vue
│     ├─ label.vue
│     └─ card.vue
├─ composables/
│  └─ useApi.js            # Axios instance + Bearer token interceptor
├─ layouts/
│  └─ AppLayout.vue        # Sidebar + Topbar + Logout
├─ pages/
│  ├─ auth/Login.vue       # Login űrlap
│  └─ Dashboard.vue        # Üdvözlő doboz + menü placeholder leírás
├─ router/
│  └─ index.js             # Auth guardok
├─ stores/
│  └─ auth.js              # Pinia store (token, user, set/clear)
└─ main.js                 # App belépési pont
```

## 🔐 Auth működés

- Login űrlap elküldi a `POST /api/v1/auth/token` kérést az email+password-del.
- A válaszból elmenti a tokent (`localStorage`), majd hívja `GET /api/v1/me`-t és tárolja a usert.
- Guard: ha nincs token → `/login`; ha van token és `/login`-re mennél → `/dashboard`.
- Logout a topbar **Logout** gombjával: `POST /api/v1/auth/logout`, majd token törlés és redirect `/login`.

> A backend JSON szerkezetét tolerálja kétféle token-helyen is:
> - `data.token`
> - vagy `token` a gyökéren

## 🎨 UI – shadcn alap

A `components/ui` elemek a **shadcn-vue** szemléletét követik:
- util-first Tailwind; 
- semleges, könnyen cserélhető stílus;
- teljes kontroll (forráskód a projekt része).

Komponensek:
- **Button** – variánsok: `default`, `outline`, `ghost`
- **Input** – alap input mező
- **Label** – űrlap címkék
- **Card** – dobozolt tartalom `header` és `footer` slotokkal

Bármikor bővítheted a készletet (pl. `dialog.vue`, `dropdown-menu.vue`, `toast.vue`).

## 🧭 Router és Layout

- Oldalak: `/login`, `/dashboard`
- `AppLayout` két részből áll:
  - **Sidebar** (bal) – menü placeholder elemekkel (Customers, Projects, Settings)
  - **Topbar** (jobb felül) – oldal cím + felhasználónév + **Logout** gomb

## 🧰 Hasznos tippek

- **Iconok**: a csomag tartalmazza a `lucide-vue-next`-et, bármikor használhatod (`import { LogOut } from 'lucide-vue-next'`).
- **.env**: ha más domainen éred el a backendet, állítsd a `VITE_API_URL` értékét.
- **CORS**: helyi fejlesztésnél győződj meg róla, hogy a backend engedi a kéréseket a dev originről.

## 🔌 Kapcsolat a Spatie jogosultságokkal

Nem szükséges semmi extra a frontenden. Ajánlott a `/api/v1/me` választ kiegészíteni `roles` és `permissions` mezőkkel, majd a komponensekben feltételesen megjeleníteni elemeket (`v-if="hasPermission('customer.create')"`).

---

Kérdésed van, vagy szeretnél bővítést (pl. Customers CRUD lista+űrlap, modalok, táblázat)? Szívesen kiegészítem.
