# 🧭 EroPortal / App-Sanctum Frontend & Backend Fejlesztési Napló
**Dátum:** 2025-10-08  
**Stack:** Laravel 12 + Sanctum (API) & Vue 3 + Vite + Tailwind + shadcn-vue (Frontend)

---

## 📅 Mai fejlesztések összefoglalója

### 🧩 Backend

#### ✅ Új profil frissítő endpoint
Létrehoztuk a hitelesített felhasználó saját adatainak frissítésére szolgáló route-ot:
```
PUT /api/v1/me
```

**Fájlok:**
- `routes/api.php` → új `Route::put('/me', [MeController::class, 'update'])`
- `app/Http/Controllers/Api/MeController.php` → új `update()` metódus  
- `app/Http/Requests/Api/Me/UpdateRequest.php` → validáció (név, email, jelszó)

**Működés:**
- csak bejelentkezett (`auth:sanctum`) user használhatja  
- frissíthető: `name`, `email`, `password` (opcionális, `confirmed` kell)  
- jelszó csak akkor változik, ha a mező kitöltött  
- visszatérési struktúra:
```json
{
  "success": true,
  "data": { "user": { "id": 1, "name": "...", "email": "..." } },
  "message": "Profile updated."
}
```

---

### 🎨 Frontend

#### ✅ Profil szerkesztő oldal
Új oldal: `src/pages/profile/ProfileEdit.vue`

**Funkciók:**
- Név, e-mail, új jelszó + jelszó megerősítés mezők  
- Opcionális jelszóváltoztatás (ha üres, marad a régi)  
- Hiba- és sikerüzenetek (validáció, backend válasz)  
- Mentés után az auth store frissül az új adatokkal

**API-hívás:**  
`PUT /api/v1/me`

---

#### ✅ Header bővítés
A jobb felső sarokban mostantól:
- 🌐 `LanguageSwitcher` (EN / HU váltás, lazy-loaded i18n JSON-okkal)
- 🔔 `Notifications` link (badge-jelző, későbbi API integrációhoz)
- ⚙️ `Settings` link (rendszerbeállítások oldal)

Mindkettő `RouterLink`-ként működik, nem dropdown.

---

#### ✅ Sidebar fejlesztés
- Többszintű menü (`SidebarMenu.vue`)
- Automatikus **összecsukás**, ha másik főmenübe navigálsz  
- Egyszerre **csak egy főmenü lehet nyitva**
- Route alapján automatikusan megnyílik az aktív szekció  
- Felhasználó kézi becsukását is tiszteletben tartja  

---

#### ✅ i18n rendszer (lazy load)
- `vue-i18n@9` integrálva  
- Nyelvek JSON-fájlokban (`src/locales/en.json`, `src/locales/hu.json`)  
- Dinamikus, lazy betöltés: csak az aktuális nyelv chunkja töltődik le  
- `LanguageSwitcher.vue` menti a választást `localStorage`-ba  
- Alap nyelv: `hu`, fallback: `en`

---

### 💾 Általános állapot

| Modul | Készültség | Megjegyzés |
|--------|-------------|------------|
| Auth flow (login/logout/me) | ✅ | teljes Sanctum integráció |
| Sidebar navigáció | ✅ | multi-level, auto-collapse |
| Header UI | ✅ | nyelvváltó + ikon linkek |
| i18n (lazy JSON) | ✅ | működik két nyelvvel |
| Profile szerkesztés | ✅ | backend PUT + frontend form |
| Customers CRUD | 🚧 | következő fejlesztési fázis |
| Notifications API | 🚧 | UI előkészítve |
| Settings oldal | 🚧 | UI előkészítve |
| Dark mode / theme | ⏳ | tervezett |

---

## 🧰 Projekt struktúra (összefoglaló)

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

## 🚀 Következő lépések (javaslat)

1. **CRUD modul – Customers**
   - `Customer` modell + factory + seeder  
   - `Api/CustomerController` (`index`, `store`, `show`, `update`, `destroy`)  
   - Vue oldalak (`CustomerList`, `CustomerForm`, `CustomerShow`)
2. **Értesítések (Notifications)**
   - API: `GET /api/v1/notifications`  
   - Unread counter a headerben
3. **Settings oldal**
   - App preferences, theme, language defaults
4. **Dark mode / theme switcher**
   - Tailwind `dark:` és shadcn alapú theme toggle

---

📘 **Státusz:**  
> A rendszer már teljes auth, profil és UI kerettel rendelkezik.  
> Innen a CRUD és moduláris API-fejlesztés jön (Customers, Tasks, Notifications).
