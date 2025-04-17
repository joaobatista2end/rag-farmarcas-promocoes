<script lang="ts" setup>
import { ref } from 'vue'
import { useChat } from './composables/useChat'

// Inicializa o chat com configurações (ajuste sua webhookUrl)
const chat = useChat({
  webhookUrl: 'https://n8n.2-end.com/webhook/your-webhook-id/chat',
  initialMessages: [
    '👋 Olá! Seja bem-vindo(a)! Sou a Cléo, sua assistente virtual da Farmarcas! Estou aqui para te ajudar com todas as informações sobre nossas promoções. Como posso te ajudar hoje? 💬'
  ],
  // loadPreviousSession: true,
  // metadata: { loja: 'Farmarcas' }, // opcional
})
const { messages, waitingForResponse, sendMessage } = chat

const inputText = ref('')

async function send() {
  const text = inputText.value.trim()
  if (!text) return
  await sendMessage(text, [])
  inputText.value = ''
}
</script>

<template>
  <div class="flex flex-col h-full max-w-md mx-auto bg-white rounded shadow-md">
    <div class="flex-grow overflow-y-auto p-4 space-y-3">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="[
          'inline-block px-4 py-2 rounded-lg max-w-[80%]',
          msg.sender === 'user'
            ? 'bg-blue-600 text-white self-end'
            : 'bg-gray-200 text-gray-800 self-start'
        ]"
      >
        {{ msg.text }}
      </div>
      <div v-if="waitingForResponse" class="text-gray-500 italic">...</div>
    </div>
    <div class="border-t p-4 flex">
      <input
        v-model="inputText"
        @keyup.enter="send"
        placeholder="Digitar mensagem..."
        class="flex-grow border rounded-l px-3 py-2 focus:outline-none"
      />
      <button
        @click="send"
        class="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
      >
        Enviar
      </button>
    </div>
  </div>
</template>