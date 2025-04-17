<script lang="ts" setup>
import { ref } from 'vue'
import { useChat } from '../../composables/useChat'
import ChatMessage from '../molecules/ChatMessage.vue'
import ChatInput from '../atoms/ChatInput.vue'
import ChatTypingIndicator from '../atoms/ChatTypingIndicator.vue'

const props = defineProps<{
  webhookUrl: string,
  initialMessages: Array<string>
}>();

const chat = useChat({
  webhookUrl: props.webhookUrl,
  initialMessages: props.initialMessages,
})

const { messages, welcomeMessage, waitingForResponse, sendMessage } = chat

const inputText = ref('')
const isTyping = ref(false)

async function handleSend() {
  const text = inputText.value.trim()
  if (!text) return
  await sendMessage(text, [])
  inputText.value = ''
}
</script>

<template>
  <div class="h-screen bg-zinc-900 flex items-center justify-center font-montserrat">
    <div class="h-full w-full bg-zinc-800 shadow-lg overflow-hidden transition-all duration-300">
      <div class="h-full max-w-screen-lg mx-auto">
        <div class="overflow-y-auto h-screen px-6 mt-8 pb-[180px] space-y-4 custom-scrollbar" style="scroll-behavior: smooth;">
          <div v-if="welcomeMessage" class="space-y-4 mb-6">
            <ChatMessage :message="welcomeMessage" />
          </div>

          <TransitionGroup name="message" tag="div" class="space-y-4">
            <ChatMessage
              v-for="msg in messages"
              :key="msg.id"
              :message="msg"
            />
          </TransitionGroup>
          
          <ChatTypingIndicator v-if="waitingForResponse" />
        </div>

        <div class="p-6 backdrop-blur-2xl absolute bottom-0 left-0 w-full bg-zinc-800/80">
          <div class="relative max-w-screen-lg mx-auto">
            <ChatInput
              v-model="inputText"
              @typing="isTyping = $event"
              @send="handleSend"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-zinc-800;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-zinc-900; 
  
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-zinc-700;
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
</style>