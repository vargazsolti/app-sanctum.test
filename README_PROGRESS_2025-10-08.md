# 🧭 App-Sanctum Frontend & Backend Development Log
**Date:** 2025-10-08  
**Stack:** Laravel 12 + Sanctum (API) & Vue 3 + Vite + Tailwind + shadcn-vue (Frontend)

---

## 📅 Summary of Today’s Development

### 🧩 Backend

#### ✅ New Profile Update Endpoint
Created a route for updating the authenticated user’s own profile data:
```
PUT /api/v1/me
```

**Files:**
- `routes/api.php` → new `Route::put('/me', [MeController::class, 'update'])`
- `app/Http/Controllers/Api/MeController.php` → new `update()` method  
- `app/Http/Requests/Api/Me/UpdateRequest.php` → validation (name, email, password)

**Behavior:**
- only accessible by authenticated (`auth:sanctum`) users  
- updatable fields: `name`, `email`, `password` (optional, must be `confirmed`)  
- password only changes if the field is filled  
- response structure:
```json
{
  "success": true,
  "data": { "user": { "id": 1, "name": "...", "email": "..." } },
  "message": "Profile updated."
}
```

---

### 🎨 Frontend

#### ✅ Profile Edit Page
New page: `src/pages/profile/ProfileEdit.vue`

**Features:**
- Fields for name, email, new password + password confirmation  
- Optional password change (keeps old one if empty)  
- Error & success messages (validation, backend response)  
- After saving, the auth store updates with new data

**API Call:**  
`PUT /api/v1/me`

---

#### ✅ Header Enhancements
Top-right section now includes:
- 🌐 `LanguageSwitcher` (EN / HU toggle with lazy-loaded i18n JSON files)
- 🔔 `Notifications` link (with badge placeholder for future API integration)
- ⚙️ `Settings` link (system settings page)

Both implemented as `RouterLink` (no dropdown).

---

#### ✅ Sidebar Improvements
- Multi-level menu (`SidebarMenu.vue`)
- Automatically **collapses** when navigating to another main menu  
- Only **one main section** can be open at once  
- Opens automatically based on active route  
- Respects manual user collapse actions  

---

#### ✅ i18n System (lazy load)
- Integrated `vue-i18n@9`  
- Language files stored in JSON (`src/locales/en.json`, `src/locales/hu.json`)  
- Dynamic lazy loading: only current language chunk is downloaded  
- `LanguageSwitcher.vue` saves selection to `localStorage`  
- Default language: `hu`, fallback: `en`

---

### 💾 General Project Status

| Module | Status | Notes |
|--------|-------------|------------|
| Auth flow (login/logout/me) | ✅ | full Sanctum integration |
| Sidebar navigation | ✅ | multi-level, auto-collapse |
| Header UI | ✅ | language switch + icon links |
| i18n (lazy JSON) | ✅ | works with two languages |
| Profile editing | ✅ | backend PUT + frontend form |
| Customers CRUD | 🚧 | next phase of development |
| Notifications API | 🚧 | UI prepared |
| Settings page | 🚧 | UI prepared |
| Dark mode / theme | ⏳ | planned |

---

## 🧰 Project Structure (Summary)

**Frontend:**  
```
frontend/
 ├─ src/
 │   ├─ pages/
 │   │   ├─ Dashboard.vue
 │   │   ├─ profile/ProfileEdit.vue
 │   ├─ components/
 │   │   ├─ navigation/SidebarMenu.vue
 │   │   ├─ LanguageSwitcher.vue
 │   ├─ layouts/AppLayout.vue
 │   ├─ locales/en.json, hu.json
 │   ├─ plugins/i18n.js
 │   ├─ stores/auth.js
 │   └─ router/index.js
```

**Backend:**  
```
app/
 ├─ Http/
 │   ├─ Controllers/Api/MeController.php
 │   ├─ Requests/Api/Me/UpdateRequest.php
 ├─ Models/User.php
routes/api.php
```

---

📘 **Status:**  
> The system already includes full authentication, profile management, and UI framework.  
> Next steps: CRUD and modular API development (Customers, Tasks, Notifications).
