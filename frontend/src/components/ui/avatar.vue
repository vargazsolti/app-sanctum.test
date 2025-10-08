<template>
  <div
    :class="[
      'inline-flex items-center justify-center rounded-full bg-muted text-foreground/80 select-none',
      sizeClass
    ]"
    :title="alt"
    aria-hidden="true"
  >
    <slot>{{ initials }}</slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '' },
  alt: { type: String, default: 'Avatar' },
  size: { type: String, default: 'md' }, // sm|md|lg
})

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'h-8 w-8 text-sm'
  if (props.size === 'lg') return 'h-12 w-12 text-lg'
  return 'h-10 w-10 text-base'
})

const initials = computed(() => {
  const n = (props.name || '').trim()
  if (!n) return 'A'
  const parts = n.split(/\s+/).slice(0, 2)
  return parts.map(p => p[0]?.toUpperCase() || '').join('')
})
</script>
