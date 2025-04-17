<script lang="ts" setup>
import { ref } from 'vue'
import { useChat } from './composables/useChat'
import Markdown from 'vue3-markdown-it'

// Inicializa o chat com configurações (ajuste sua webhookUrl)
const chat = useChat({
  webhookUrl: 'https://n8n.2-end.com/webhook/your-webhook-id/chat',
  initialMessages: [
    '👋 Olá! Seja bem-vindo(a)! Sou a Cléo, sua assistente virtual da Farmarcas! Estou aqui para te ajudar com todas as informações sobre nossas promoções. Como posso te ajudar hoje? 💬'
  ],
  // loadPreviousSession: true,
  // metadata: { loja: 'Farmarcas' }, // opcional
})
const { messages, welcomeMessage, waitingForResponse, sendMessage } = chat

const inputText = ref('')
const isTyping = ref(false)

async function send() {
  const text = inputText.value.trim()
  if (!text) return
  await sendMessage(text, [])
  inputText.value = ''
}

function handleInput() {
  isTyping.value = inputText.value.length > 0
}
</script>

<template>
  <div class="h-screen bg-zinc-900 flex items-center justify-center font-montserrat">
    <div class="h-full w-full bg-zinc-800 shadow-lg overflow-hidden transition-all duration-300">
      <div class="h-full max-w-screen-lg mx-auto">

        <div class="overflow-y-auto h-screen px-6 mt-8 pb-[180px] space-y-4 custom-scrollbar" style="scroll-behavior: smooth;">
          <div v-if="welcomeMessage" class="space-y-4 mb-6">
            <div
              :class="[
                'flex justify-start'
              ]"
            >
              <div class="max-w-[80%] px-4 py-3 bg-white/5 text-zinc-100 text-lg">
                <Markdown :source="welcomeMessage.text" class="prose prose-invert" />
              </div>
            </div>
          </div>

          <TransitionGroup name="message" tag="div" class="space-y-4">
            <div
              v-for="msg in messages"
              :key="msg.id"
              :class="[
                'flex',
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              ]"
            >
              <div
                :class="[
                  'max-w-[80%] px-4 py-3 transition-all duration-300 text-lg',
                  msg.sender === 'user'
                    ? 'bg-black/20 text-zinc-100'
                    : 'bg-white/5 text-zinc-100'
                ]"
              >
                <Markdown v-if="msg.sender === 'bot'" :source="msg.text" class="prose prose-invert" />
                <span v-else>{{ msg.text }}</span>
              </div>
            </div>
          </TransitionGroup>
          
          <div v-if="waitingForResponse" class="flex items-center space-x-2 text-zinc-400">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div class="p-6 backdrop-blur-2xl absolute bottom-0 left-0 w-full bg-zinc-800/80">
          <div class="relative max-w-screen-lg mx-auto">
            <input
              v-model="inputText"
              @input="handleInput"
              @keyup.enter="send"
              placeholder="Digite sua mensagem..."
              class=" bg-gradient-to-r from-white/50 to-orange-500 to-[200%] inline-block text-transparent bg-clip-text w-full px-4 py-2 pr-20 bg-zinc-800 border-b border-zinc-500/50 focus:border-zinc-500/20 transition-all duration-300 outline-none placeholder-zinc-500 text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

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

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #27272a; /* zinc-800 */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #18181b; /* zinc-900 */
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #3f3f46; /* zinc-700 */
}

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.typing-indicator {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: linear-gradient(to right, rgba(39, 39, 42, 0.5), rgba(63, 63, 70, 0.5));
  border-radius: 8px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  margin: 0 3px;
  background: linear-gradient(to right, #71717a, #a1a1aa);
  border-radius: 50%;
  display: inline-block;
  animation: typing-pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing-pulse {
  0%, 80%, 100% { 
    transform: scale(0.8);
    opacity: 0.3;
  }
  40% { 
    transform: scale(1);
    opacity: 0.8;
  }
}
</style>