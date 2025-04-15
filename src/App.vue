<script lang="ts" setup>
import { onMounted } from "vue";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

onMounted(async () => {
  createChat({
    webhookUrl: "https://n8n.2-end.com/webhook/your-webhook-id/chat",
    initialMessages: [
      `
### 💊 Olá! Seja bem-vindo(a)!

Sou o consultor inteligente de precificação da Farmarcas, pronto para te ajudar com decisões estratégicas no varejo farmacêutico.
Tenho acesso aos documentos e aprendizados registrados durante a consultoria, e posso analisar dados, responder dúvidas e sugerir melhorias com base em:

- 📌 Estratégias de preço
- 📊 Análise de mercado e concorrência
- 🧠 Comportamento do consumidor
- 📦 Sortimento, categorias e margem de contribuição
- 📉 Elasticidade, markup, curva ABC e muito mais!

Se precisar de alguma recomendação, insight ou análise, é só perguntar.
Ah! Se eu não tiver informação suficiente, vou te avisar o que está faltando, beleza? 😉

Qual sua dúvida de hoje? 💬`,
      `🔄 Carregando... Aguarde um instante.`,
    ],
    mode: "fullscreen",
    showWelcomeScreen: false,
    i18n: {
      en: {
        title: "💵 Agente de Precificação",
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
