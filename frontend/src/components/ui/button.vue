<template>
  <button
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'default' },
  size: { type: String, default: 'md' },
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-primary text-primary-foreground border-transparent hover:opacity-90',
    outline: 'bg-transparent border-gray-300 hover:bg-muted',
    ghost: 'bg-transparent border-transparent hover:bg-muted',
  }
  const sizes = {
    sm: 'h-8 px-3',
    md: 'h-9 px-4',
    lg: 'h-10 px-5',
  }
  return [base, variants[props.variant] || variants.default, sizes[props.size] || sizes.md].join(' ')
})
</script>
