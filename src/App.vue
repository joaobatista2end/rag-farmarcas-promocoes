<script lang="ts" setup>
import { onMounted } from "vue";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

onMounted(async () => {
  createChat({
    webhookUrl: "https://autocosmos.app.n8n.cloud/webhook/your-webhook-id/chat",
    initialMessages: [
      `
### 👋 Olá! Seja bem-vindo(a)!

Sou a Cléo, sua assistente virtual da Farmarcas! Estou aqui para te ajudar com todas as informações sobre nossas promoções.

Posso te ajudar com as principais dúvidas, como:

- 🎯 Quem pode participar da promoção
- 📍 Regiões participantes
- 🛍️ Produtos inclusos e exclusos
- 📅 Período da promoção
- 💳 Como participar e ser cliente fidelidade
- 📋 Termos e condições

Fique à vontade para perguntar! Estou aqui para te ajudar a aproveitar nossas promoções da melhor forma! 😊

Como posso te ajudar hoje? 💬`,
      `🔄 Carregando... Aguarde um instante.`,
    ],
    mode: "fullscreen",
    showWelcomeScreen: false,
    i18n: {
      en: {
        title: "🏷️ Promoções Farmarcas",
        subtitle: "",
        footer: "",
        getStarted: "",
        inputPlaceholder: "Digite sua pergunta...",
        closeButtonTooltip: "Fechar chat",
      },
    },
  });
});
</script>

<template>
  <div class="my-8">
    <div class="max-w-screen-md mx-auto rounded-md overflow-hidden">
      <div id="n8n-chat"></div>
    </div>
  </div>
</template>
