<script lang="ts" setup>
import Markdown from 'vue3-markdown-it'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  createdAt: string
}

defineProps<{
  message: Message
}>()
</script>

<template>
  <div
    :class="[
      'flex',
      message.sender === 'user' ? 'justify-end' : 'justify-start'
    ]"
  >
    <div
      :class="[
        'max-w-[80%] px-4 py-3 transition-all duration-300 text-lg',
        message.sender === 'user'
          ? 'bg-black/20 text-zinc-100'
          : 'bg-white/5 text-zinc-100'
      ]"
    >
      <Markdown v-if="message.sender === 'bot'" :source="message.text" class="prose prose-invert" />
      <span v-else>{{ message.text }}</span>
    </div>
  </div>
</template>

<style scoped>
.prose {
  max-width: none;
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose :where(ul):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 1.625em;
}

.prose :where(ol):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  padding-left: 1.625em;
}

.prose :where(h1, h2, h3, h4):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}
</style>