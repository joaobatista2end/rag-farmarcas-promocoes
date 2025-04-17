<script lang="ts" setup>
import Chat from './components/organisms/Chat.vue'
const messages = [
  `**Olá! 👋 Bem-vindo ao nosso atendimento!**

  Estamos aqui para ajudar você a entender melhor todos os processos de compras e as ferramentas disponíveis para otimizar a experiência em sua loja. Se você tiver dúvidas sobre como funcionam nossas ofertas, a jornada de compras ou qualquer outro aspecto relacionado ao seu negócio, não hesite em perguntar!
  
  Vamos juntos melhorar a experiência de compras e alcançar os melhores resultados. Como posso ajudar você hoje?`
]
</script>

<template>
  <Chat webhook-url="https://n8n.2-end.com/webhook/your-webhook-id/chat" :initial-messages="messages"/>
</template>