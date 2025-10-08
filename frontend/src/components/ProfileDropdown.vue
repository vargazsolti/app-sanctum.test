<template>
  <UiDropdown>
    <template #trigger>
      <button
        class="flex w-full items-center gap-3 rounded-xl border bg-white p-2 text-left hover:bg-muted/60"
        aria-label="Open profile menu"
      >
        <UiAvatar :name="displayName" size="sm" />
        <div class="min-w-0">
          <div class="truncate text-sm font-semibold">{{ displayName }}</div>
          <div class="truncate text-xs text-gray-500">{{ user?.email || '—' }}</div>
        </div>
        <svg class="ml-auto h-4 w-4 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m6 9 6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </template>

    <!-- Menü tartalom -->
    <div class="p-1">
      <button class="menu-item" @click="$emit('profile')">
        <UserIcon class="h-4 w-4" />
        <span>My Profile</span>
      </button>

      <button class="menu-item" @click="$emit('timesheets')">
        <ClockIcon class="h-4 w-4" />
        <span>My Timesheets</span>
      </button>

      <button class="menu-item" @click="$emit('edit-profile')">
        <PencilIcon class="h-4 w-4" />
        <span>Edit Profile</span>
      </button>

      <button class="menu-item" @click="$emit('language')">
        <GlobeIcon class="h-4 w-4" />
        <span>Language</span>
      </button>

      <UiSeparator />

      <button class="menu-item text-red-600 hover:bg-red-50" @click="$emit('logout')">
        <LogOutIcon class="h-4 w-4" />
        <span>{{ t('common.logout') }}</span>
      </button>
    </div>
  </UiDropdown>
</template>

<script setup>
import { computed } from 'vue'
import UiDropdown from '@/components/ui/dropdown.vue'
import UiAvatar from '@/components/ui/avatar.vue'
import UiSeparator from '@/components/ui/separator.vue'
import { User as UserIcon, Globe as GlobeIcon, Clock as ClockIcon, Pencil as PencilIcon, LogOut as LogOutIcon } from 'lucide-vue-next'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  user: { type: Object, default: null },
})

defineEmits(['profile', 'timesheets', 'edit-profile', 'language', 'logout'])

const displayName = computed(() => props.user?.name || 'User')
</script>

<style scoped>
.menu-item {
  @apply flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted;
}
</style>
