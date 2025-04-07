<script lang="ts" setup>

import { onMounted } from 'vue';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

onMounted(() => {
	createChat({
		webhookUrl: 'https://autocosmos.app.n8n.cloud/webhook/your-webhook-id/chat',
    initialMessages: [
		'Olá, me chamo João! Como posso ajudar?'
	],
  mode: "fullscreen",
  showWelcomeScreen: false,
  i18n: {
		en: {
			title: 'Promoções Farmarcas',
			subtitle: "Aqui você encontra as principais informações sobre a Promoção Farmarcas!",
			footer: '',
			getStarted: '',
			inputPlaceholder: 'Digite sua pergunta...',
		},
	},
	})
  
});
</script>
<template>
	<div style="width: 100%; height: 100%;" id="#n8n-chat"></div>
</template>