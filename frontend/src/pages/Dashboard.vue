<template>
  <AppLayout>
    <div class="grid gap-4 md:grid-cols-2">
      <UiCard>
        <template #header>
         <h3 class="font-semibold">{{ t('dashboard.title') }}</h3>
        </template>
        <p class="text-sm text-gray-600">
           {{ t('dashboard.logged_in_as', { name: auth.user?.name || 'User' }) }}
        </p>
      </UiCard>
      <UiCard>
        <template #header>
          <h3 class="font-semibold">Menu placeholder</h3>
        </template>
        <p class="text-sm text-gray-600">
          Left sidebar contains placeholder items (Customers, Projects, Settings). Hook them up to routes as modules are ready.
        </p>
      </UiCard>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import UiCard from '@/components/ui/card.vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const { t } = useI18n()
</script>
