<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps<{
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'typing', value: boolean): void
  (e: 'send'): void
}>()

const inputValue = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function autoResize() {
  const el = textareaRef.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }
}

function handleInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('typing', value.length > 0)
  autoResize()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('send')
    inputValue.value = ''
    emit('update:modelValue', '')
    nextTick(() => {
      autoResize()
    })
  }
}

onMounted(() => {
  autoResize()
})

watch(inputValue, () => {
  autoResize()
})
</script>

<template>
  <textarea
    ref="textareaRef"
    v-model="inputValue"
    @input="handleInput"
    @keydown="handleKeydown"
    :placeholder="placeholder || 'Digite sua mensagem...'"
    rows="1"
    class="bg-gradient-to-r from-white/50 to-orange-500 to-[200%] inline-block text-transparent bg-clip-text w-full px-4 py-2 pr-20 bg-zinc-800 border-b border-zinc-500/50 focus:border-zinc-500/20 transition-all duration-300 outline-none placeholder-zinc-500 text-lg resize-none overflow-hidden"
  />
</template>