<template>
  <div class="rounded-2xl border bg-white shadow-sm">
    <div v-if="$slots.header" class="border-b p-4">
      <slot name="header" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t p-4 bg-muted/30">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup>
</script>
