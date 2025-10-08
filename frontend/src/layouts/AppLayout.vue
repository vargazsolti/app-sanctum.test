<template>


<div class="min-h-dvh grid grid-cols-[240px_1fr]">
    <!-- Sidebar -->
    <aside class="border-r bg-muted/50 p-4">
      <!-- EDDIGI logó helyett profil dropdown -->
      <div class="mb-6">
        <ProfileDropdown
          :user="auth.user"
          @logout="onLogout"
          @profile="goProfile"
          @edit-profile="goEditProfile"
          @timesheets="goTimesheets"
          @language="openLanguage"
        />
      </div>

        <!-- Többszintű menü -->
      <SidebarMenu :items="menu" />
    </aside>

    <!-- Main -->
    <div class="flex min-h-dvh flex-col">
      <header class="flex items-center justify-between border-b p-4">
        
        <h1 class="text-lg font-semibold">{{ titleTranslated }}</h1>
        

  <div class="flex items-center gap-2">
    <!-- 1) Nyelvválasztó -->
    <LanguageSwitcher />

    <!-- 2) Notifications ikon (link) -->
    <RouterLink
      to="/notifications"
      class="inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted"
      aria-label="Notifications"
      title="Notifications"
    >
      <span class="relative inline-flex">
        <BellIcon class="h-5 w-5 opacity-80" />
        <!-- olvasatlan jelző pötty -->
        <span
          v-if="hasUnread"
          class="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white"
        />
      </span>
    </RouterLink>

    <!-- 3) Settings (ikon + szöveg, link) -->
    <RouterLink
      to="/settings"
      class="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
      aria-label="Settings"
      title="Settings"
    >
      <SettingsIcon class="h-4 w-4 opacity-80" />
      <span class="hidden sm:inline">{{ t('common.settings') || 'Settings' }}</span>
    </RouterLink>
  </div>
        <!-- jobb oldalt most nem kell külön logout gomb -->
      </header>

      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import SidebarMenu from '@/components/navigation/SidebarMenu.vue'
import { Bell as BellIcon, Settings as SettingsIcon } from 'lucide-vue-next'

/* ikonok */
import {
  Zap as ZapIcon,
  FileText as FileTextIcon,
  Receipt as ReceiptIcon,
  CreditCard as CreditCardIcon,
  BadgeDollarSign as BadgeDollarIcon,
  List as ListIcon,
  RefreshCcw as RefreshIcon,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const api = useApi()

const { t } = useI18n()

const titleTranslated = computed(() => {
  switch (route.name) {
    case 'dashboard': return t('dashboard.title')
    default:          return 'App'
  }
})


/* Menü-adatszerkezet (2 szint) */
const menu = [
  {
    key: 'menu-primary',
    label: 'Menu item 1',
    icon: ZapIcon,
    children: [
      { name: 'submenu1', label: 'Sub menu 1', to: '/submenu1', icon: FileTextIcon },
      { name: 'submenu2',    label: 'Sub menu 2', to: '/submenu2',   icon: FileTextIcon },
      { name: 'submenu3',  label: 'Sub menu 3',     to: '/submenu3', icon: ReceiptIcon },
      { name: 'submenu4',  label: 'Sub menu 4',   to: '/submenu4', icon: CreditCardIcon },
    ],
    groups: [
      {
        key: 'docs',
        label: 'Other Sub menu Title',
        children: [
          { name: 'othersubmenu1', label: 'Other Sub menu 1', to: '/othersubmenu1', icon: BadgeDollarIcon },
          { name: 'othersubmenu2',        label: 'Other Sub menu 2', to: '/othersubmenu2',        icon: ListIcon },
        ],
      },
    ],
  },
  {
    key: 'menu-secondary',
    label: 'Menu item 2',
    icon: RefreshIcon,
    children: [
      { name: 'submenu5', label: 'Sub menu 5', to: '/submenu5' },
    ],
  },
]


const title = computed(() => {
  switch (route.name) {
    case 'dashboard': return 'Dashboard'
    default: return 'App'
  }
})

async function onLogout() {
  try { await api.delete('/api/v1/auth/token') } catch (_) {}
  auth.clearAuth()
  router.push({ name: 'login' })
}

// A navigációs helykötések – majd később valódi oldalakra vihetnek:
function goProfile() { router.push({ name: 'profile' }) }
function goEditProfile() { router.push({ name: 'profile' }) }
function goTimesheets() { /* router.push({ name: 'timesheets' }) */ }
function openLanguage() { /* pl. később nyitsz egy language modal-t */ }
</script>
<style scoped>
.menu-link {
  @apply flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200 hover:text-foreground/90;
}

.menu-link.active {
  @apply text-primary border;
  background-color: #ffffffff; /* kék háttér */
  border-color: #69696985;
}
.menu-link svg {
  @apply opacity-10;
}
</style>