<template>
  <nav class="space-y-1 text-sm font-medium text-foreground/80">
    <template v-for="section in items" :key="section.key">
      <!-- Fő szekció + lenyitás -->
      <button
        type="button"
        class="menu-group w-full"
        :class="{ open: isOpen(section.key) }"
        @click="toggle(section.key)"
      >
        <component :is="section.icon" class="h-4 w-4 shrink-0" v-if="section.icon" />
        <span class="truncate">{{ section.label }}</span>
        <svg class="ml-auto h-4 w-4 transition-transform"
             :class="{ 'rotate-180': isOpen(section.key) }"
             viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m6 9 6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Gyerek linkek -->
      <transition name="slide-fade">
        <div v-show="isOpen(section.key)" class="submenu">
          <RouterLink
            v-for="child in section.children || []"
            :key="child.to"
            :to="child.to"
            class="submenu-link"
            :class="{ active: route.name === child.name }"
          >
            <component :is="child.icon" class="h-4 w-4" v-if="child.icon" />
            <span>{{ child.label }}</span>
          </RouterLink>

          <!-- Opcionális 2. szint csoportokkal -->
          <template v-for="group in section.groups || []" :key="group.key">
            <div class="px-2 pt-2 pb-1 text-[11px] uppercase tracking-wide text-foreground/50">
              {{ group.label }}
            </div>
            <RouterLink
              v-for="item in group.children || []"
              :key="item.to"
              :to="item.to"
              class="submenu-link pl-9"
              :class="{ active: route.name === item.name }"
            >
              <component :is="item.icon" class="h-4 w-4" v-if="item.icon" />
              <span>{{ item.label }}</span>
            </RouterLink>
          </template>
        </div>
      </transition>
    </template>
  </nav>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  items: { type: Array, default: () => [] },
})

const route = useRoute()

// Nyitott főszekció(k) – mostantól egyszerre max. 1
const open = ref(new Set())

function isOpen(key) {
  return open.value.has(key)
}

// Kattintás a főmenüre: kizárólag azt nyitjuk (toggle-oljuk)
function toggle(key) {
  const currentlyOpen = isOpen(key)
  open.value = currentlyOpen ? new Set() : new Set([key])
}

// Route alapján automatikusan csak az aktuális szekció maradjon nyitva
watchEffect(() => {
  const current = route.name
  let activeKey = null

  for (const sec of props.items) {
    const inDirect = (sec.children || []).some(c => c.name === current)
    const inGroup  = (sec.groups || []).some(g => (g.children || []).some(i => i.name === current))
    if (inDirect || inGroup) {
      activeKey = sec.key
      break
    }
  }

  if (activeKey) {
    open.value = new Set([activeKey])
  }
  // ha nincs aktív szekció (pl. dashboard), meghagyjuk a jelenlegi állapotot
})
</script>


<style scoped>
.menu-group {
  @apply flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-gray-200 text-foreground/90 border border-transparent;
}
.menu-group.open {
  /* finom kiemelés ha nyitva a szekció */
  background-color: #3b82f61A;   /* 10% háttér */
  border-color: #3b82f633;       /* 20% keret */
}

.submenu { @apply mt-1 mb-2 space-y-1; }

.submenu-link {
  @apply flex items-center gap-2 rounded-lg px-3 py-2 ml-2 transition-colors hover:bg-gray-100 text-foreground/80;
}
.submenu-link.active {
  background-color: #3b82f61A;
  color: #1d4ed8;                /* blue-700 */
  border: 1px solid #3b82f633;
}

.slide-fade-enter-active,
.slide-fade-leave-active { transition: all .18s ease; }
.slide-fade-enter-from,
.slide-fade-leave-to { opacity: 0; transform: translateY(-2px); }
</style>
