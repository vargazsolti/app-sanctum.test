<template>
  <AppLayout>
    <div class="max-w-3xl">
      <h2 class="mb-3 text-lg font-semibold">Edit User</h2>

      <UiCard>
        <template #header>
          <div class="border-b">
            <button class="px-4 py-2 -mb-px border-b-2 border-foreground text-sm font-medium">
              User Details
            </button>
          </div>
        </template>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <!-- name -->
          <div>
            <UiLabel>name</UiLabel>
            <UiInput v-model="form.name" type="text" />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- email -->
          <div>
            <UiLabel>email</UiLabel>
            <UiInput v-model="form.email" type="email" autocomplete="email" />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- password (optional) -->
          <div>
            <UiLabel>Password (leave blank to keep current)</UiLabel>
            <UiInput
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              placeholder="New password (optional)"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- password confirmation -->
          <div>
            <UiLabel>Confirm Password</UiLabel>
            <UiInput
              v-model="form.password_confirmation"
              type="password"
              autocomplete="new-password"
              placeholder="Confirm new password"
            />
            <p v-if="errors.password_confirmation" class="mt-1 text-sm text-red-600">
              {{ errors.password_confirmation }}
            </p>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2">
            <UiButton type="submit" :disabled="saving">
              <span v-if="!saving">Update User</span>
              <span v-else>Saving…</span>
            </UiButton>
          </div>

          <p v-if="success" class="text-sm text-green-600">Profile updated.</p>
          <p v-if="serverError" class="text-sm text-red-600">{{ serverError }}</p>
        </form>
      </UiCard>
    </div>
  </AppLayout>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import UiCard from '@/components/ui/card.vue'
import UiInput from '@/components/ui/input.vue'
import UiLabel from '@/components/ui/label.vue'
import UiButton from '@/components/ui/button.vue'
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'

const auth = useAuthStore()
const api = useApi()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const errors = reactive({})
const saving = ref(false)
const success = ref(false)
const serverError = ref('')

// töltsük az aktuális adatokat (store-ból, és ha frissíteni akarod, itt hívhatsz /me-t is)
watchEffect(() => {
  if (auth.user) {
    form.name = auth.user.name || ''
    form.email = auth.user.email || ''
  }
})

async function onSubmit() {
  saving.value = true
  success.value = false
  serverError.value = ''
  Object.keys(errors).forEach(k => delete errors[k])

  // payload: jelszó mezőket csak akkor küldjük, ha kitöltötték
  const payload = {
    name: form.name,
    email: form.email,
  }
  if (form.password) {
    payload.password = form.password
    payload.password_confirmation = form.password_confirmation
  }

  try {
    // a backendben ez az endpoint: PUT /api/v1/me/profile
    const res = await api.put('/api/v1/me', payload)

    // ha a backend visszaad friss usert, tegyük a store-ba
    const updated = res?.data?.data?.user || res?.data?.data || null
    if (updated) {
      auth.setAuth(auth.token, updated)
    }
    success.value = true
    // jelszómezők ürítése
    form.password = ''
    form.password_confirmation = ''
  } catch (e) {
    const status = e?.response?.status
    if (status === 422 && e.response?.data?.errors) {
      const bag = e.response.data.errors
      for (const k in bag) errors[k] = Array.isArray(bag[k]) ? bag[k][0] : bag[k]
    } else {
      serverError.value = e?.response?.data?.message || e.message || 'Update failed'
    }
  } finally {
    saving.value = false
  }
}
</script>
