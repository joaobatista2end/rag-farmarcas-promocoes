<template>
  <div class="inline-flex items-center space-x-2 px-4 py-2 text-zinc-400 bg-gradient-to-l form-zinc-800/20 to-zinc-900/40">
    <span class="text-lg font-mediumtext-white">Pensando</span>
    <div class="typing-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: center;
  padding: 8px 12px;
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