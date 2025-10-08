<template>
  <UiDropdown>
    <template #trigger>
      <button
        class="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
        aria-label="Language"
      >
        <span class="font-semibold uppercase">{{ locale.toUpperCase() }}</span>
        <svg class="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m6 9 6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </template>

    <div class="p-1">
      <button class="menu-item" @click="setLang('en')">English</button>
      <button class="menu-item" @click="setLang('hu')">Magyar</button>
    </div>
  </UiDropdown>
</template>

<script setup>
import UiDropdown from '@/components/ui/dropdown.vue'
import { useI18n } from 'vue-i18n'
import { loadLocaleMessages } from '@/plugins/i18n'

const { locale } = useI18n()

async function setLang(code) {
  await loadLocaleMessages(code) // itt töltjük le ténylegesen
}
</script>
<style scoped>
.menu-item { @apply w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-muted; }
</style>
