<template>
  <div class="min-h-dvh grid place-items-center p-4">
    <div class="w-full max-w-sm">
      <UiCard>
        <template #header>
          <h2 class="text-lg font-semibold">Sign in</h2>
          <p class="text-sm text-gray-500">Use your API credentials</p>
        </template>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <UiLabel>Email</UiLabel>
            <UiInput v-model="form.email" type="email" required autocomplete="username" />
          </div>
          <div>
            <UiLabel>Password</UiLabel>
            <UiInput v-model="form.password" type="password" required autocomplete="current-password" />
          </div>
          <UiButton class="w-full" :disabled="loading" type="submit">
  <span v-if="!loading">Login</span>
  <span v-else>Loading…</span>
</UiButton>
          <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        </form>
      </UiCard>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'
import UiButton from '@/components/ui/button.vue'
import UiInput from '@/components/ui/input.vue'
import UiLabel from '@/components/ui/label.vue'
import UiCard from '@/components/ui/card.vue'

const router = useRouter()
const api = useApi()
const auth = useAuthStore()

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.post('/api/v1/auth/token', form)
    const token = res.data?.data?.token || res.data?.token
    const userFromLogin = res.data?.data?.user || null
    if (!token) throw new Error('No token in response')

    // ideiglenesen tegyük be a loginból kapott usert (ha van)
    auth.setAuth(token, userFromLogin)

    // /me lekérés — FIGYELEM: a user valójában data.user alatt van
    try {
      const me = await api.get('/api/v1/me')
      const normalizedUser = me?.data?.data?.user ?? me?.data?.data ?? null
      if (normalizedUser) {
        auth.setAuth(token, normalizedUser)
      }
    } catch (_) { /* opcionális */ }

    router.push({ name: 'dashboard' })
  } catch (e) {
    error.value = e?.response?.data?.message || e.message || 'Login error'
  } finally {
    loading.value = false
  }
}
</script>
