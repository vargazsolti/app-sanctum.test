<template>
  <div ref="root" class="relative inline-block text-left">
    <!-- Trigger -->
    <div
      class="inline-flex w-full"
      role="button"
      tabindex="0"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
      @keydown.escape.stop.prevent="close"
      aria-haspopup="menu"
      :aria-expanded="open ? 'true' : 'false'"
    >
      <slot name="trigger" />
    </div>

    <!-- Menu -->
    <div
      v-show="open"
      class="absolute z-50 mt-2 min-w-56 rounded-xl border bg-white p-1 shadow-lg"
      role="menu"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref(null)
const open = ref(false)

function toggle() { open.value = !open.value }
function close() { open.value = false }

function onDocClick(e) {
  // kattintás a komponensen kívül -> zárás
  if (!root.value) return
  if (!root.value.contains(e.target)) close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>
