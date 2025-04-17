import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface UseChatOptions {
  webhookUrl: string
  /** Método HTTP e headers adicionais */
  webhookConfig?: { method?: 'GET' | 'POST'; headers?: Record<string, string> }
  /** Chave do parâmetro sessionId (padrão: 'sessionId') */
  chatSessionKey?: string
  /** Chave do parâmetro de mensagem (padrão: 'chatInput') */
  chatInputKey?: string
  /** Metadados extras enviados no webhook */
  metadata?: Record<string, unknown>
  /** Mensagens iniciais exibidas no chat */
  initialMessages?: string[]
  /** Se deve carregar sessão anterior do localStorage */
  loadPreviousSession?: boolean
}

/**
 * Hook para gerenciar o estado do chat via n8n Webhook
 */
export function useChat(options: UseChatOptions) {
  const {
    webhookUrl,
    webhookConfig = { method: 'POST', headers: {} },
    chatSessionKey = 'sessionId',
    chatInputKey = 'chatInput',
    metadata,
    initialMessages = [],
    loadPreviousSession = true,
  } = options

  // Mensagens iniciais como objetos
  const initial = computed(() =>
    initialMessages.map((text) => ({
      id: uuidv4(),
      text,
      sender: 'bot',
      createdAt: new Date().toISOString(),
    })),
  )

  // Estado reativo
  const welcomeMessage = ref(initial.value[0] || null)
  const messages = ref(initial.value.slice(1))
  const currentSessionId = ref<string | null>(null)
  const waitingForResponse = ref(false)

  // Gera headers combinando headers customizados
  function getHeaders(): Record<string, string> {
    return { ...(webhookConfig.headers || {}) }
  }

  // Carrega sessão anterior se configurado
  async function loadSession(): Promise<string | undefined> {
    if (!loadPreviousSession) return
    const key = 'chat-session'
    // Recupera sessionId existente ou gera novo e persiste
    let session = localStorage.getItem(key)
    if (!session) {
      session = uuidv4()
      localStorage.setItem(key, session)
    }
    // Define como sessão atual antes de carregar histórico
    currentSessionId.value = session
    const params: Record<string, any> = {
      action: 'loadPreviousSession',
      [chatSessionKey]: session,
    }
    if (metadata) params.metadata = JSON.stringify(metadata)

    // Escolhe GET ou POST
    let result: any
    // Executa a requisição
    let raw: string = ''
    if (webhookConfig.method === 'GET') {
      const url = new URL(webhookUrl)
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v))
      const res = await fetch(url.toString(), { method: 'GET', headers: getHeaders() })
      try {
        raw = await res.text()
      } catch {
        raw = ''
      }
    } else {
      const form = new FormData()
      Object.entries(params).forEach(([k, v]) => form.append(k, v))
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: getHeaders(),
        body: form,
      })
      try {
        raw = await res.text()
      } catch {
        raw = ''
      }
    }
    // Tenta parsear como JSON, senão fallback para objeto vazio
    try {
      result = raw ? JSON.parse(raw) : {}
    } catch {
      result = {}
    }

    const data = result.data ?? []
    const mappedMessages = data.map((h: any, i: number) => ({
      id: String(i),
      text: h.kwargs?.content || '',
      sender: h.id?.includes('HumanMessage') ? 'user' : 'bot',
      createdAt: new Date().toISOString(),
    }))
    messages.value = mappedMessages
    if (messages.value.length) {
      currentSessionId.value = session
    }
    return session
  }

  // Inicia nova sessão, sobrescreve sessionId e limpa mensagens
  async function startSession(): Promise<void> {
    const key = `chat-session`
    const newId = uuidv4()
    currentSessionId.value = newId
    localStorage.setItem(key, newId)
    messages.value = initial.value.slice(1)
  }

  // Envia mensagem do usuário e recebe resposta da API
  async function sendMessage(text: string, files: File[] = []): Promise<void> {
    const userMsg = {
      id: uuidv4(),
      text,
      sender: 'user',
      createdAt: new Date().toISOString(),
    }
    messages.value.push(userMsg)
    waitingForResponse.value = true

    const params: Record<string, any> = {
      action: 'sendMessage',
      [chatSessionKey]: currentSessionId.value || '',
      [chatInputKey]: text,
    }
    if (metadata) params.metadata = JSON.stringify(metadata)

    const form = new FormData()
    Object.entries(params).forEach(([k, v]) => form.append(k, v))
    files.forEach((f) => form.append('files', f))

    const res = await fetch(webhookUrl, {
      method: webhookConfig.method || 'POST',
      headers: getHeaders(),
      body: form,
    })
    // Tenta parsear JSON, fallback para texto bruto
    let raw: string
    try {
      raw = await res.text()
    } catch (e) {
      raw = ''
    }
    let result: any = {}
    if (raw) {
      try {
        result = JSON.parse(raw)
      } catch {
        // resposta não é JSON, usa raw como texto
        result = { text: raw }
      }
    }
    let content = result.output ?? result.text ?? ''
    if (!content && Object.keys(result).length > 0) {
      content = JSON.stringify(result, null, 2)
    }
    const botMsg = {
      id: uuidv4(),
      text: content,
      sender: 'bot',
      createdAt: new Date().toISOString(),
    }
    messages.value.push(botMsg)
    waitingForResponse.value = false
  }

  // Auto load da sessão
  loadSession()

  return {
    initialMessages: initial,
    welcomeMessage,
    messages,
    currentSessionId,
    waitingForResponse,
    loadPreviousSession: loadSession,
    startNewSession: startSession,
    sendMessage,
  }
}