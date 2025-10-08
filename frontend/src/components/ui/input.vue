<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    class="h-10 w-full rounded-md border px-3 outline-none ring-offset-2 focus:ring-2"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})
defineEmits(['update:modelValue'])
</script>
