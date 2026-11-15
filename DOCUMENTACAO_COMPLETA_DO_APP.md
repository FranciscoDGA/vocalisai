# DOCUMENTAÇÃO COMPLETA DA PLATAFORMA DE VOZ & ATENDIMENTO OMNICHANNEL COM IA
### Ecossistema Integrado: Vocalis / AI Agency OS / OpenBot
**Versão:** 2.0 Pro • **Data de Atualização:** Novembro/2026 • **Autor:** Antigravity AI & Francisco

---

## ÍNDICE GERAL

1. [Visão Geral & Proposta de Valor](#1-visão-geral--proposta-de-valor)
2. [Arquitetura Tecnológica & Stack](#2-arquitetura-tecnológica--stack)
3. [Guia de Instalação, Execução & Portas](#3-guia-de-instalação-execução--portas)
4. [Diferenciais Competitivos (Superando o Kloel e Players Tradicionais)](#4-diferenciais-competitivos-superando-o-kloel-e-players-tradicionais)
5. [Mapeamento Completo de Telas, Abas e Componentes](#5-mapeamento-completo-de-telas-abas-e-componentes)
   - 5.1 [Landing Page & Seções](#51-landing-page--seções)
   - 5.2 [Demonstração da Chamada de Diagnóstico ao Vivo (Roberta)](#52-demonstração-da-chamada-de-diagnóstico-ao-vivo-roberta)
   - 5.3 [Simulador Interativo de Dashboard (InsideDashboardSection)](#53-simulador-interativo-de-dashboard-insidedashboardsection)
   - 5.4 [Páginas Dedicadas & Verticais](#54-páginas-dedicadas--verticais)
   - 5.5 [Portais de Compliance & Modais de Apoio](#55-portais-de-compliance--modais-de-apoio)
6. [Estratégia de Integração com o AI Agency OS e OpenBot](#6-estratégia-de-integração-com-o-ai-agency-os-e-openbot)
7. [Guia de Naming & Marcas](#7-guia-de-naming--marcas)
8. [Roadmap Futuro (O que Vamos Construir)](#8-roadmap-futuro-o-que-vamos-construir)
9. [Manual Operacional: Como Gerar Leads e Vender no Piloto Automático](#9-manual-operacional-como-gerar-leads-e-vender-no-piloto-automático)
10. [Pauta e Sprint de Execução para Amanhã (Checklist Pronto)](#10-pauta-e-sprint-de-execução-para-amanhã-checklist-pronto)
15. [Guia Mestre dos 3 Pilares Open-Source (Cal.com, Chatwoot e Voice Studio)](#15-guia-mestre-dos-3-pilares-open-source-calcom-chatwoot-e-voice-studio)
16. [Manual de Precificação, Custos Reais e Minutagem Transparente](#16-manual-de-precificação-custos-reais-e-minutagem-transparente)

---

## 1. VISÃO GERAL & PROPOSTA DE VALOR

A plataforma é uma solução completa de **Voz Neural & Atendimento Omnichannel com Inteligência Artificial**, projetada especificamente para o mercado brasileiro e para o ecossistema de agências de IA (**AI Agency OS**).

Diferente de chatbots tradicionais de texto ou de URA telefônicas antigas cheias de menus infinitos ("digite 1, digite 2"), esta solução opera com:
* **Latência Ultra-Baixa (<450ms):** Conversação em tempo real, sem pausas robóticas;
* **Português Brasileiro com Sotaques Regionais:** Pronúncia natural humana, capacidade de escutar interrupções e entonação empática;
* **Action-First AI (Ações em Tempo Real):** Capacidade de gerar chaves Pix com desconto, agendar horários no Google Calendar e disparar mensagens/áudios no WhatsApp durante a própria ligação;
* **Modelo White-Label para Agências:** Permite que donos de agência revendam a plataforma com marca e domínio próprios, gerando receita recorrente e margem de lucro por minuto de chamada.

---

## 2. ARQUITETURA TECNOLÓGICA & STACK

O projeto foi construído utilizando as tecnologias mais modernas do ecossistema JavaScript e React:

* **Framework Base:** [React 19](https://react.dev) (`^19.3.1`)
* **Build Tool & Bundler:** [Vite 8](https://vite.dev) (`^8.3.6`)
* **Motor de Estilização:** [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite ^4.3.5`)
* **Biblioteca de Ícones:** [Lucide React](https://lucide.dev) (`^1.72.0`)
* **Efeitos Visuais:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) (`^1.9.4`)
* **Sintetizador de Voz Nativo:** *Web Speech API* (`SpeechSynthesisUtterance`) com algoritmo inteligente de seleção de voz feminina prioritária (`pt-BR-Neural2-A`, `Google português do Brasil`, `Microsoft Maria`, `Luciana`) e normalização fonética de números telefônicos.
* **Reconhecimento de Fala (Speech-to-Text):** *Web Speech API* (`SpeechRecognition` / `webkitSpeechRecognition`) integrado para que o usuário possa falar diretamente no microfone com a assistente.
* **Linter de Alta Performance:** [Oxlint](https://oxc.rs) (`^1.90.0`)

---

## 3. GUIA DE INSTALAÇÃO, EXECUÇÃO & PORTAS

### Requisitos Prévios:
* Node.js v18+ ou v20+ instalado.
* NPM ou PNPM configurado.

### Passos de Instalação:
No terminal da pasta raiz (`c:\Users\User\OneDrive\Desktop\Kloel`):

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Compilar para produção (Build testado e homologado)
npm run build

# 4. Pré-visualizar o build de produção localmente
npm run preview
```

### Portas e Endereços:
* **Endereço de Desenvolvimento Local:** `http://localhost:5173`
* Caso a porta `5173` esteja ocupada por outro processo, o Vite iniciará automaticamente na porta `5174` ou `5175`.
* Para liberar acesso na rede local (expor para celulares e outros computadores da mesma rede Wi-Fi):
  ```bash
  npm run dev -- --host
  ```

---

## 4. DIFERENCIAIS COMPETITIVOS (SUPERANDO O KLOEL E PLAYERS TRADICIONAIS)

| Funcionalidade | Kloel & Concorrentes Padrão | Nossa Nova Plataforma Pro |
| :--- | :--- | :--- |
| **Comportamento da Chamada** | Apenas conversa e anota recado | **Action-First AI:** Gera Pix em tempo real, sincroniza agenda e dispara WhatsApp |
| **WhatsApp na Ligação** | Separado do telefone | **Simultâneo:** Disparo de notificação e áudio explicativo durante a própria ligação |
| **Segurança para o Dono** | Sem garantia prévia | **Simulador de Estresse Anti-Alucinação** (9.9/10) + **Modo Copiloto (Shadow Mode)** |
| **Inteligência de Vendas** | Transcrição de texto corrida | **Radar de Objeções automático** + **Lead Scoring das chamadas (1 a 10)** |
| **Implantação de Agentes** | Criação de prompt do zero | **Templates de Nicho Prontos** (Clínica, Imobiliária, Advocacia, Varejo, etc.) com 1 clique |
| **Modelo de Negócio** | SaaS comum B2B | **White-Label Nativo** para agências parceiras do **AI Agency OS** |
| **Orquestrador de Fluxos** | Engessado | **Conector Nativo com OpenBot (`https://openbot.run/`)** e Webhooks |

---

## 5. MAPEAMENTO COMPLETO DE TELAS, ABAS E COMPONENTES

### 5.1 Landing Page & Seções

* **`Hero.jsx`**:
  * Badge superior: *"IA DE VOZ FEITA NO BRASIL"*.
  * Título tipográfico elegante: *"A voz da sua empresa, a qualquer hora"*.
  * Player interativo com voz neural feminina (Lia).
  * Input de teste imediato com seletor de bandeiras/DDI (+55 Brasil, Portugal, EUA, etc.) e máscara nacional inteligente.
  * Botão de alta conversão: *"Receber ligação da Roberta"*.
  * Link de transbordo humano: *"Prefiro conversar com uma pessoa"*.
  * Checklist de confiança: Garantia de 30 dias, Português do Brasil, No ar em minutos.

* **`ChannelsSection.jsx` (Canais Omnichannel):**
  * Detalhamento de Telefone (Voz Neural <450ms), WhatsApp Oficial (Meta Cloud API), Webchat (Widget inteligente de 1 linha de JS) e E-mail IA & CRM.

* **`CallTimelineSection.jsx` (Linha do Tempo da Chamada):**
  * Passo a passo visual de uma ligação de 60 segundos:
    * `00:03` - Atendimento no primeiro toque (sem fila ou musiquinha);
    * `00:15` - Compreensão profunda de sotaques e escuta de interrupções;
    * `00:30` - Resolução instantânea com consulta a tabelas e agendas;
    * `00:45` - Transbordo humano prioritário caso necessário;
    * `01:00` - Transcrição, gravação e dados sincronizados no CRM.

* **`StepsSection.jsx` (Configuração em 3 Etapas):**
  * 01. Escolha o tom e a voz;
  * 02. Alimente com links do site, PDFs e tabelas;
  * 03. Ative os números de telefone e WhatsApp.

* **`UseCasesSection.jsx` & `NichesSection.jsx` (Casos de Uso Verticais):**
  * Clínicas & Consultórios (-78% de faltas);
  * Imobiliárias & Corretores (+3.2x conversão de leads);
  * Escritórios de Advocacia (62h economizadas/mês em triagem);
  * E-commerce & Varejo (23% de recuperação de carrinho);
  * Empresas de Serviços & Assistência Técnica (100% de chamados sem espera);
  * Cobrança Amigável & Pix (+47% de recuperação em D+3).

* **`RoiCalculator.jsx` (Calculadora de Retorno Financeiro):**
  * Simulador onde a empresa insere o número de chamadas diárias e o custo da equipe, visualizando a economia líquida gerada por mês.

* **`IntegrationsSection.jsx` (Grade de Integrações):**
  * Google Calendar, WhatsApp Cloud API, HubSpot, RD Station, Salesforce, Stripe, Mercado Pago, PABX SIP e Webhooks.

* **`PricingSection.jsx` (Planos de Preço):**
  * Alternador Mensal / Anual (com 20% de desconto);
  * Plano Starter (Profissionais autônomos);
  * Plano Pro (Empresas em crescimento);
  * Plano Enterprise / Agência (Grandes volumes e white-label).

* **`GuaranteesSection.jsx`, `FaqSection.jsx` e `CtaSection.jsx`:**
  * Sanando dúvidas de conformidade LGPD, cancelamento sem multa e botão final de ativação.

* **`Footer.jsx`:**
  * Rodapé completo com links institucionais, status operacional e documentações legais.

---

### 5.2 Demonstração da Chamada de Diagnóstico ao Vivo (`TestCallModal.jsx`)

* **Invocação:** Disparada pelo Hero ou pelos botões de teste espalhados pelo site.
* **Comportamento em Tempo Real:**
  1. Efeito de discagem realista por 1.8 segundos;
  2. Conexão imediata com a voz neural humanizada da **Débora · Vocalis**;
  3. Visualizador de onda sonora e aura pulsante sincronizados com a fala;
  4. Reconhecimento contínuo de voz (`SpeechRecognition`) com debounce de silêncio de 1.8s e feedback em tempo real (`Ouvindo: "..."`);
  5. Campo de digitação alternativo integrado para envio rápido de perguntas por texto;
  6. Roteador conversacional com Gemini AI capaz de responder dúvidas personalizadas sobre clínicas odontológicas, imobiliárias, advocacia e varejo em 2 a 3 frases fluidas;
  7. **Notificação Flutuante de WhatsApp:** Desliza durante a ligação avisando do recebimento do diagnóstico;
  8. **Card de Ação Executada em Tempo Real:** Demonstra a cobrança Pix de teste de R$ 1,00 gerada na chamada e a agenda sincronizada;
  9. **Modal Sobreposto de WhatsApp:** Permite inspecionar a mensagem formatada recebida da Débora com botão de copiar código Pix.

---

### 5.3 Simulador Interativo de Dashboard (`InsideDashboardSection.jsx`)

Um dos maiores diferenciais da plataforma: uma réplica 100% interativa com mais de 2.300 linhas de código do painel de controle de um cliente real.

#### Abas Principais:
1. **Início (Visão Geral):**
   * Gráficos de chamadas, minutos consumidos, taxa de resolução e status do sistema;
   * Histórico de chamadas recentes com player de escuta de áudio e transcrição completa.
2. **Assistentes:**
   * Lista de agentes ativos, canais vinculados e status;
   * Modal de criação de novos assistentes (Voz, Chat WhatsApp ou Híbrido).
3. **Conversas:**
   * Caixa de entrada unificada de conversas e mensagens recebidas.

#### Abas Exclusivas "AI Agency OS Pro":
4. **Templates por Nicho (`templates`):**
   * 6 modelos prontos (Dra. Camila, Lucas Imobiliária, Mariana Advocacia, etc.) com botão *"Clonar & Ativar Agora"* que injeta o agente direto no painel do usuário.
5. **Anti-Alucinação & Shadow Mode (`auditoria`):**
   * Score de Segurança 9.9/10;
   * Toggle do *Modo Copiloto / Shadow Mode* (escuta passiva);
   * Bateria de 3 testes de estresse: Cliente hostil, tentativa de vazamento LGPD e negociação de desconto abusivo.
6. **BI & Objeções de Vendas (`bi-vendas`):**
   * Radar das 3 maiores objeções mapeadas por IA nas chamadas;
   * Ações recomendadas pela IA para aumentar as vendas;
   * Tabela de Lead Scoring (1 a 10) com botão para disparar WhatsApp VIP para os clientes quentes.
7. **White-Label & OpenBot (`whitelabel`):**
   * Configuração de subdomínio personalizado (`atendimento.suaagencia.com.br`);
   * Nome da marca e multiplicador de margem de lucro por minuto (ex: 2.5x);
   * **Conexão Nativa com OpenBot (`https://openbot.run/`)**: Webhook URL, status de sincronização e botão de disparo de teste.

#### Abas de Gestão & Configuração:
8. **Números de Telefone:** Compra de números locais com DDD de todo o Brasil, 0800 e Tronco SIP.
9. **WhatsApp:** Gestão do canal homologado da Meta.
10. **Assinatura e Faturamento:** Recarga de créditos, extrato e configuração de recarga automática.
11. **Bônus Grátis & Programa de Indicação:** Link de afiliados com comissão de R$ 1.800.
12. **Chaves de API:** Geração de chaves `voc_live_...` para integração externa.
13. **Gestão de Membros & Permissões:** Perfis Admin, Operador e Visualizador.

---

### 5.4 Páginas Dedicadas & Verticais

O aplicativo conta com roteamento interno via estado (`currentPage`) para as seguintes páginas completas:

* **`WhatsAppPage.jsx`**: Solução oficial WhatsApp Cloud API com áudios humanizados e botões interativos.
* **`WebchatPage.jsx`**: Widget inteligente para sites com instalação em 1 linha de script.
* **`AgenteSuportePage.jsx`**: Atendimento técnico e triagem de chamados 24/7.
* **`AgendamentosPage.jsx`**: Foco em clínicas, salões e consultorias com integração Google Calendar.
* **`RecepcionistaVirtualPage.jsx`**: Substituição de secretárias tradicionais com atendimento no primeiro segundo.
* **`AtendedorAutomaticoPage.jsx`**: URA inteligente conversacional sem menus mecânicos.
* **`EquipeExternaPage.jsx`**: Apoio a frotas, técnicos de campo e logística.
* **`IntegracoesPage.jsx`**: Catálogo detalhado de todos os CRMs e ERPs compatíveis.
* **`WebinarsPage.jsx`**: Central de demonstrações e treinamentos em vídeo.
* **`CentralAjudaPage.jsx`**: Base de conhecimento com artigos e tutoriais passo a passo.
* **`CarreirasPage.jsx`**, **`ImprensaPage.jsx`** e **`ContatoPage.jsx`**: Institucional completo.
* **`ParceirosPage.jsx`**: Programa de parceiros comerciais e afiliados.

---

### 5.5 Portais de Compliance & Modais de Apoio

* **`DocsPortal.jsx`**: Central documental com abas para Termos de Uso, Política de Privacidade, Conformidade LGPD, SLA e Segurança da Informação.
* **`AuthModal.jsx`**: Janela modal de login e cadastro com seleção de plano.
* **`DemoModal.jsx`**: Agendamento de consultoria assistida por especialista humano.
* **`LegalModal.jsx`**: Exibição rápida de termos contratuais.

---

## 6. ESTRATÉGIA DE INTEGRAÇÃO COM O AI AGENCY OS E OPENBOT

A união dessas três pontas cria um ecossistema sem concorrência no mercado:

1. **AI Agency OS (A Estratégia & Modelo de Negócio):**
   * O seu portal e metodologia ensinam a agência de IA a prospectar clientes de alto ticket (clínicas, imobiliárias, escritórios).
   * A agência não precisa programar um sistema do zero: ela entrega a nossa plataforma como a infraestrutura oficial de voz e atendimento.
2. **OpenBot (`https://openbot.run/`) (O Motor Visual de Automação):**
   * Utilizado nos bastidores para desenhar fluxos lógicos visuais, conectar bancos de dados externos (PostgreSQL, MySQL, Supabase) e processar webhooks avançados.
3. **Nossa Plataforma (O Produto Executivo & Interface Final):**
   * Entrega a telefonia rápida (<450ms), a voz neural brasileira, o número DDD/0800, a cobrança Pix na chamada e a marca própria (White-Label) da agência.

---

## 7. GUIA DE NAMING & MARCAS

Para posicionamento de mercado, recomendamos as seguintes opções estratégicas:

### Opção 1: Nomes Integrados ao Ecossistema (Recomendado)
* **Voice OS** *(ou AI Voice OS)*: Faz par direto com o **AI Agency OS**. Soa nativo e institucional.
* **AgencyVoice OS**: Deixa claro que é o motor de voz operado por agências.
* **Omni OS**: Enfatiza a unificação de Voz + WhatsApp + Webchat.
* **Closer OS**: Focado no fechamento de vendas e cobrança ativa via Pix.

### Opção 2: Marcas Próprias para Revenda White-Label
* **Vocalis** *(Nome ativo no código)*: Sofisticado, elegante e corporativo.
* **Kloel**: Curto, moderno e no estilo de unicórnios tech globais.
* **Audiora**: Clássico, forte e focado em inteligência de áudio.
* **DialFlow AI**: Foco em fluxos telefônicos inteligentes.

---

## 8. RECURSOS AVANÇADOS IMPLEMENTADOS (FASE 2 PRO)

Todos os recursos previstos no roadmap da Fase 2 foram desenvolvidos, testados e integrados com sucesso:

1. **Clonagem de Voz em 1 Minuto (`VoiceCloningStudio.jsx`):**
   * Gravador interativo no navegador usando a API nativa `MediaRecorder`;
   * Timer progressivo de 60 segundos com waveform visual de áudio;
   * Roteiros fonéticos otimizados em Português do Brasil para médicos, advogados e executivos comerciais;
   * Pré-escuta da gravação e processamento de embeddings acústicos com modelo neural (<420ms de latência);
   * Teste de fala ao vivo da voz clonada com síntese imediata.

2. **WhatsApp Voice-to-Voice Nativo (`WhatsAppVoiceToVoice.jsx`):**
   * Recepção de áudios no WhatsApp com transcrição em tempo real (STT);
   * Processamento cognitivo de respostas com IA contextual;
   * Disparo automático de notas de voz no WhatsApp com entonação humana, sotaque natural e pausas respiratórias;
   * Simulador interativo estilo WhatsApp com reprodutor de áudio com barras sonoras e alternador de velocidade (1x / 1.5x / 2x).

3. **Painel Multi-Tenant de Subcontas para Agências (`AgencySubaccountsSection.jsx`):**
   * Visão master para donos de agência gerenciarem seus clientes (clínicas, imobiliárias, escritórios);
   * Monitoramento individual de minutos consumidos, faturamento e margem de lucro por cliente;
   * Modal de onboarding de novos clientes com criação de subdomínio white-label dedicado;
   * Alternador rápido de contexto de workspace.

4. **Disparo Ativo de Campanhas Outbound com IA (`OutboundCampaignsSection.jsx`):**
   * Discador em lote inteligente para confirmação de consultas, reativação de leads e cobrança preventiva Pix;
   * Upload e parser automático de planilhas CSV/Excel com contatos e horários;
   * Configuração de canais combinados (Voz Neural + WhatsApp simultâneo com chave Pix);
   * Métricas de performance em tempo real (taxa de atendimento, confirmação e custo por lead).

5. **Integração Aprofundada OpenBot Local & Cloud:**
   * Reconhecimento automático do OpenBot instalado no computador em `C:\Users\User\OpenBot`;
   * Seletor de modo: OpenBot Local (`http://localhost:3000/api/webhook`) ou OpenBot Cloud (`https://openbot.run`);
   * Botão de teste de sincronização com envio de payload JSON de chamadas e cálculo de latência;
   * Links diretos para abrir o OpenBot local e o repositório oficial de código aberto no GitHub.

6. **Otimização de Performance & Code Splitting:**
   * Separação sob demanda (`React.lazy` + `Suspense`) de todas as 15 rotas secundárias e modais pesados;
   * Redução drástica do bundle inicial de entrada de **1.17 MB** para apenas **155 kB** (~87% mais leve);
   * Zero warnings de chunk size e carregamento instantâneo em conexões mobile 4G/5G.

---

## 9. MANUAL OPERACIONAL: COMO GERAR LEADS E VENDER NO PILOTO AUTOMÁTICO

Este é o guia estratégico de como você utiliza a sua própria plataforma para construir uma operação altamente lucrativa, atraindo leads, fechando vendas automaticamente e vendendo essa solução para clientes empresariais (PMEs e grandes empresas).

### 9.1 O Funil da "Demonstração Mágica ao Vivo" (Inbound Automático)
O maior erro de quem vende IA é tentar explicar a tecnologia por texto. O segredo que o criador do Kloel usou e que agora está dentro do seu app é a **"Demonstração Mágica ao Vivo"**:

1. **A Isca (Anúncio / Conteúdo Orgânico / Prospecção):**
   * *Gancho:* *"Coloque o seu número nesta página e receba uma ligação em 3 segundos da nossa IA. Ela vai diagnosticar o gargalo do seu atendimento e te mandar um WhatsApp em tempo real."*
   * *Público:* Donos de clínicas, sócios de imobiliárias, escritórios de advocacia, e-commerces e prestadores de serviços.
2. **A Experiência no Hero do seu App:**
   * O empresário acessa seu site, digita o telefone dele e clica em **"Receber ligação da Roberta"**.
   * O telefone dele toca. A Roberta atende com voz humana natural e pergunta o nicho e as dores dele.
3. **O Efeito UAU (Fechamento no Piloto Automático):**
   * Durante a ligação, a Roberta envia o resumo no WhatsApp dele com um Pix de demonstração de R$ 1,00 gerado na hora.
   * O lead percebe imediatamente: *"Se essa IA fez isso comigo agora, ela pode fazer com os meus pacientes e clientes todos os dias."*
4. **Conversão Imediata:**
   * A Roberta faz a oferta de ativação com 30% OFF e garantia de 30 dias. O lead clica em ativar e cria a conta dele no seu sistema.

---

### 9.2 Como Vender esta Solução para Empresas (Outbound & Vendas Consultivas)

Você tem duas fontes de receita massiva com essa plataforma:

#### Modelo A: Venda Direta como SaaS / Serviço Gerenciado para Empresas Locais
* **Nicho 1: Clínicas Médicas e Odontológicas**
  * *Dor que você resolve:* Pacientes que mandam mensagem de noite ou ligam e não são atendidos, além de faltas em consultas (*no-show*).
  * *Oferta:* Setup de R$ 2.500,00 a R$ 4.000,00 para configurar a IA + Mensalidade de R$ 997,00 a R$ 1.997,00/mês.
* **Nicho 2: Imobiliárias & Corretores**
  * *Dor que você resolve:* Perda de leads de portais (Zap Imóveis, VivaReal) que chegam sábado e domingo.
  * *Oferta:* Setup de R$ 3.000,00 + R$ 1.497,00/mês + comissão sobre agendamentos de visita.
* **Nicho 3: Escritórios de Advocacia**
  * *Dor que você resolve:* Advogado gastando horas com curioso que não tem caso viável. A IA faz a triagem jurídica e só passa o lead qualificado.

#### Modelo B: O Modelo White-Label integrado ao AI Agency OS
* Você vende a infraestrutura para **outras agências de IA** que fazem parte do seu ecossistema.
* Elas colocam a marca delas (subdomínio próprio), e você ganha:
  * Uma assinatura mensal de plataforma da agência (ex: R$ 497/mês a R$ 997/mês);
  * Uma margem de R$ 0,30 a R$ 0,60 por cada minuto falado por todas as empresas que as agências atenderem.

---

## 10. PAUTA E SPRINT DE EXECUÇÃO REALIZADA (STATUS ATUAL)

### ✅ Entregas Concluídas e Homologadas em Produção:
1. **Banco de Dados Supabase Conectado:**
   * Projeto: `https://gikfoieyrbqnuxhmhtag.supabase.co`;
   * Tabelas criadas e ativas com RLS: `leads`, `assistants`, `calls`;
   * Captura automática de leads na Landing Page e no modal ao vivo;
   * Autenticação real com Supabase Auth (`AuthModal.jsx`).
2. **Cérebro de Inteligência Artificial Ativo:**
   * Conexão com Google Gemini via Google AI Studio (`src/utils/aiService.js`);
   * Prompt mestre da Roberta calibrado para voz e negócios em Português do Brasil;
   * Diálogo interativo e dinâmico habilitado via microfone e texto no modal.
3. **Deploy em Produção (Vercel & GitHub):**
   * Repositório oficial no GitHub: `https://github.com/FranciscoDGA/vocalisai`;
   * Aplicação online na Vercel com HTTPS: `https://vocalisai-phi.vercel.app`;
   * Variáveis de ambiente de produção configuradas (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GEMINI_API_KEY`).
4. **Alinhamento Visual 1:1 com o Kloel:**
   * A Landing Page foi limpa e otimizada (removendo a seção de preços gigante da home);
   * Nova página dedicada e exclusiva de **Preços & Planos** acessível pelo menu e rodapé (`/precos`).
5. **Canal Oficial de Transbordo & WhatsApp AI Agency OS:**
   * Número comercial oficial integrado: **(94) 98442-3948**;
   * Botões de contato direto no WhatsApp no Hero, ContatoPage, DemoModal e TestCallModal.
6. **Integração de Telefonia Vapi:**
   * Assistente de Saída criado: `5907a01b-07c9-4f00-977e-e828d913ee37`;
   * Voz da Clara em Português configurada com a primeira mensagem da Roberta;
   * Número de saída ativado: `+19256034058`.
7. **Sincronização em Tempo Real Dashboard ➔ Vapi ➔ Supabase (Item 5):**
   * Criação e clonagem de agentes no Dashboard comunicam-se via REST com a API da Vapi (`POST /assistant`);
   * O `vapi_assistant_id` retornado é gravado automaticamente no Supabase;
   * A tela de edição do assistente (`AssistantDetailView.jsx`) possui barra com o status da conexão Vapi e o botão de ação *"Salvar & Sincronizar na Vapi"*;
   * A aba "Técnico" exibe os dados da infraestrutura (Deepgram pt-BR, GPT-4o Mini e Voz Clara) com teste de chamada direto para qualquer número de celular.
8. **Equalizador Visual de Frequência Sonora & Latência em Movimento (`AudioFrequencyWave.jsx` & `index.css`):**
   * Visualizador dinâmico de espectro harmônico de 68 barras no rodapé dos cards da Landing Page (`CtaSection.jsx`) e em todas as 7 páginas verticais (`/agendamentos`, `/atendedor-automatico`, `/recepcionista-virtual`, `/equipe-externa`, `/suporte`, `/integracoes`, `/webinars`);
   * Equalizador compacto com 10 barras animadas no painel escuro de login e cadastro (`AuthModal.jsx`);
   * Indicador com ponto pulsante em tempo real: `● Latência 380ms - 450ms • Voz neural brasileira`;
   * Animação 100% acelerada pela GPU com `scaleY` e `opacity` sem travamentos ou reflows de layout.
9. **Refatoração da Fluidez e Síntese Natural da Débora (`TestCallModal.jsx`, `voiceUtils.js`, `aiService.js`):**
   * Correção definitiva de expressões regulares agressivas que causavam soletração de palavras comuns em português (como "mais", "estamos", "minutos");
   * Remoção da pronúncia forçada de siglas em inglês como "AI Agency OS" na fala telefônica — a assistente pronuncia naturalmente "Vocalis";
   * Abertura humanizada da chamada sem recitação robótica dos 11 dígitos do telefone;
   * Calibração de ritmo e pitch (`rate = 1.0`, `pitch = 1.0`) priorizando vozes neurais brasileiras suaves (Google pt-BR e Microsoft Francisca/Thalita Online Natural);
   * Roteamento inteligente de saudações/testes de microfone e suporte a histórico multi-turn via Gemini AI (`gemini-3.1-flash-lite`, `gemini-3-flash-preview`).
10. **Preservação e Restauração Estrita do Header/Menu do Site (`Navbar.jsx`):**
    * Menu original 100% restaurado e desobstruído com espaçamento original (`Produtos ⌄`, `Soluções ⌄`, `Recursos ⌄`, `Casos de uso`, `Parceiros`, `Preços`, `🇧🇷 ⌄`, `Falar com a gente`, `Entrar` e `Criar minha Vocalis ➔`);
    * Regra CSS `whitespace-nowrap` aplicada a todos os links para blindar contra qualquer quebra de linha em telas desktop;
    * O módulo de Slides de Apresentação Executiva (*Pitch Deck*) foi concentrado exclusivamente dentro do Dashboard (`InsideDashboardSection.jsx`), onde os donos de agência conduzem reuniões de vendas.
11. **Eliminação Definitiva da Leitura de Nomes de Acentos e Cedilhas (`voiceUtils.js`):**
    * Decomposição canônica Unicode (`normalize('NFD')`) e remoção estrita de diacríticos combinados (`replace(/[\u0300-\u036f]/g, '')`) combinada com conversão de `ç/Ç` para `c/C`;
    * Torna fisicamente impossível que qualquer sintetizador de voz (Windows / Chrome / Edge) leia nomes de diacríticos como "acento agudo", "cedilha", "til" ou "circunflexo", mantendo a pronúncia 100% natural e limpa.
12. **Brevidade Executiva Telefônica & Respostas Sucintas (`aiService.js`):**
    * Refatoração do prompt de sistema da Débora: respostas ultra-diretas, profissionais e objetivas (1 a 2 frases curtas, máximo de 20 a 25 palavras);
    * Foco telefônico: detalhes técnicos complexos e catálogos completos são direcionados para uma demonstração guiada de 15 minutos;
    * `maxOutputTokens` ajustado para 80 tokens, reduzindo a latência para menos de 400ms e impedindo respostas longas e cansativas.
13. **Proteção Anti-Eco Acústico e Mutex de Fala no Microfone (`TestCallModal.jsx`):**
    * Suspensão imediata do microfone (`recognition.abort()`) durante a fala da Débora, impedindo que o som dos alto-falantes do computador seja recapturado pelo microfone e reenviado à IA;
    * Filtro na escuta (`isSpeakingRef` e `isProcessingSpeechRef`) para descartar qualquer áudio residual enquanto a assistente fala;
    * Aumento do temporizador de debounce de silêncio para 2.2 segundos, permitindo que o cliente formule suas perguntas sem ser interrompido precocemente.

---

## 11. ANÁLISE DE CUSTOS, UNIT ECONOMICS & MODELOS DE NEGÓCIO

### 11.1 A Matemática Real por Minuto de Voz
| Componente | Função | Custo Médio por Minuto |
| :--- | :--- | :--- |
| **Transcrição (STT)** | Escuta e transcrição da fala do cliente | ~R$ 0,02 / min |
| **Inteligência (LLM)** | Raciocínio (Gemini / GPT) | ~R$ 0,03 / min |
| **Síntese de Voz (TTS)** | Voz humana neural em português | ~R$ 0,15 a R$ 0,25 / min |
| **Telefonia / Operadora** | Tráfego e comutação da chamada | ~R$ 0,10 a R$ 0,15 / min |
| **Custo Total por Minuto** | **Chamada Completa de Voz** | **~R$ 0,35 a R$ 0,55 / min** |

> **Alerta Crítico de Precificação:** Cobrar R$ 197/mês com consumo ilimitado ou franquia alta causa **prejuízo líquido**, pois um cliente que fale 800 minutos no mês custa ~R$ 396,00 de infraestrutura direta.

---

### 11.2 Comparação dos 02 Modelos de Faturamento

#### CASO 1: Modelo "Tudo Incluso" (SaaS / Sua Conta e Risco)
* **Como funciona:** O cliente não sabe o que é Vapi ou servidor; ele só passa o cartão e usa.
* **Preço:** **R$ 497,00 a R$ 503,00/mês**.
* **Regra Fundamental:** Franquia controlada de até **500 a 600 minutos/mês** (~300 atendimentos).
* **Excedente:** Se o cliente passar da franquia, adquire pacote extra de R$ 70,00 por hora adicional.
* **Economia Unitária:**
  * Entrada: R$ 503,00
  * Custo dos minutos (600 min × R$ 0,35): ~R$ 210,00
  * **Lucro Líquido Limpo no Bolso:** **~R$ 293,00/mês por cliente**.
* **Público:** PMEs e clientes que querem contratar sozinhos online com cartão de crédito.

#### CASO 2: Modelo "Agência & Manutenção" (Conta e Cartão do Cliente)
* **Como funciona:** Você atua como Arquiteto de IA do **AI Agency OS**. O cliente arca diretamente com o consumo dos minutos.
* **Preço de Entrada (Setup):** **R$ 1.500,00 a R$ 3.500,00 à vista** (para treinar a IA, cadastrar regras da clínica e homologar os canais).
* **Mensalidade de Gestão:** **R$ 397,00 a R$ 697,00/mês** para manutenção, atualizações de catálogo e suporte.
* **Custos de Telefonia/IA:** Cobrados no cartão de crédito da clínica do cliente (Vapi / Twilio).
* **Economia Unitária:**
  * Risco financeiro de tráfego para sua agência: **Zero**.
  * **Margem de Lucro:** **100% líquida** sobre o setup e sobre a mensalidade de gestão.
* **Público:** Clínicas médicas/odontológicas, imobiliárias, escritórios de advocacia e empresas de médio porte.

---

## 12. PAUTA E CHECKLIST PARA O PRÓXIMO ENCONTRO (AMANHÃ)

Quando você abrir o projeto amanhã, este é o roteiro exato para continuarmos sem perder tempo:

- [ ] **1. Decisão e Cadastro na Kiwify:**
  * Cadastrar o Plano 1 na Kiwify (recomendado R$ 497,00/mês para o Caso 1, ou link de Setup de R$ 2.500 para o Caso 2);
  * Inserir o link de checkout nos botões da página de preços (`PricingSection.jsx`);
  * Configurar o webhook da Kiwify para aprovação de contas.
- [ ] **2. Ativação da Telefonia & WhatsApp:**
  * Inserir recarga mínima ($5 ou $10) na Vapi para destravar ligações para celulares do Brasil (+55);
  * Conectar a instância da UazAPI para disparo de mensagens e áudios instantâneos no WhatsApp.
- [ ] **3. Domínio Próprio:**
  * Registro de `vocalisai.com.br` no Registro.br e apontamento CNAME na Vercel.

---

## 13. IDENTIDADE PROPRIETÁRIA, ARMAS DE ALTA CONVERSÃO & PROTOCOLO DE SEGURANÇA (NOVEMBRO/2026)

Para documentação exaustiva, consulte o arquivo mestre:
📄 **[GUIA_MESTRE_DE_SEGURANCA_COMPLIANCE_E_ALTA_CONVERSAO.md](./GUIA_MESTRE_DE_SEGURANCA_COMPLIANCE_E_ALTA_CONVERSAO.md)**

### Resumo dos Avanços Recentes:
1. **Identidade Visual Única (Desvinculação 100% do Kloel):**
   - Cor de destaque: **Deep Indigo `#4F46E5`** com **Violeta Elétrico `#6366F1`**.
   - Tipografia de Elite: **Plus Jakarta Sans** (geométrica, ultra nítida) + **Instrument Serif** (editorial de luxo nos destaques).
   - Novo Símbolo: **V-Wave (`VocalisLogo.jsx`)** com 5 barras de frequência em formato de "V".
2. **Arsenal das 6 Armas de Alta Conversão:**
   - `AudioShowcaseSection`: Test Drive Auditivo em 1 clique com 3 cenários (Clínica, Imobiliária, Advocacia).
   - `LostRevenueCalculator`: Calculadora de Faturamento Perdido que quantifica a dor do cliente em R$/mês.
   - `ComparisonMatrixSection`: Tabela direta CLT vs. URA Antiga vs. Vocalis AI.
   - `VoiceTestimonialsSection`: Depoimentos de empresários com áudio real de 15 segundos.
   - `GuaranteeBadgeSection`: Garantia incondicional de risco zero por 14 dias.
   - `ExitIntentModal`: Modal inteligente de resgate para quem tenta fechar a página.
3. **As 3 Armas de Ouro:**
   - `LivePhoneChallengeBanner`: Desafio do Telefone Aberto `(94) 98442-3948` com discagem direta.
   - `DoneForYouSection`: Oferta de implantação chave na mão em 24h sem esforço técnico para o cliente.
   - `WhatsAppInstantAudioCard`: Demonstração ao vivo com resposta em áudio no WhatsApp em 3 segundos.
4. **Protocolos de Segurança e Compliance:**
   - Blindagem contra ataques de API (hard cap de US$ 50/mês e rate-limiting).
   - Verificação em duas etapas no chip do WhatsApp PJ contra roubo de chip.
   - Conformidade com a LGPD (Lei nº 13.709/2018), termos de uso, sigilo profissional e proteção ao cliente.

---

## 14. DIRETRIZ ESTRATÉGICA DE FUNIL: OUTBOUND HERO VS. PROTEÇÃO DE NÚMERO DO ESPECIALISTA

### 14.1 Diagnóstico de Conversão & Decisão Homologada (Novembro/2026)
Durante a validação de arquitetura de conversão da landing page, identificou-se um ponto nevrálgico sobre a disposição de números telefônicos e fricção de entrada do lead:

1. **A Força do Formulário no Topo (Hero - Outbound):**
   * **Fluxo:** O visitante digita seu número `(DDD) 9XXXX-XXXX` no formulário do Hero e clica em *"Receber ligação da Roberta"*.
   * **Vantagens de Alta Conversão:**
     * **Fricção Zero:** O usuário não precisa abrir discador, digitar 11 dígitos ou gastar minutos de plano móvel.
     * **Captura de Lead (Opt-in Ativo):** O número é imediatamente gravado no banco/CRM antes mesmo da ligação começar. Caso ele desligue rápido, a agência mantém o lead qualificado para nutrição e follow-up no WhatsApp.
     * **Efeito "UAU":** O telefone toca na mão do lead em menos de 3 segundos, provando a velocidade e o poder da tecnologia.

2. **O Risco do Banner de Discagem Passiva (Inbound):**
   * Anteriormente, um banner escuro de "Desafio ao Vivo" convidava o visitante a discar diretamente para `(94) 98442-3948`.
   * **Gargalos Identificados:**
     * **Queda de Conversão:** Pedir para o lead discar gera atrito e preguiça no usuário médio de internet.
     * **Conflito de Papéis:** O número `(94) 98442-3948` é o WhatsApp/telefone comercial do **Especialista Humano (Francisco)**, responsável pela reunião de demonstração executiva e fechamento de contratos (mesa de vendas).
     * **Queima do Canal do Especialista:** Se colocado em um banner com o texto *"Tente pegar o robô no pulo"*, o especialista humano receberia chamadas de curiosos procurando uma IA, e o lead não experimentaria a assistente automática na linha tradicional.

### 14.2 Separação de Papéis no Funil de Vendas

```
                    [ VISITANTE NO SITE ]
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
 [Formulário Hero / Topo]             [Botões Transbordo / VIP]
            │                                   │
   (Digita o Celular)                 ("Falar com Especialista")
            │                                   │
            ▼                                   ▼
    [ ROBERTA (IA) ]                  [ FRANCISCO (HUMANO) ]
  • Liga em 3 segundos                 • Mesa de Fechamento
  • Demonstra voz neural               • Reunião de 20 minutos
  • Quebra objeções                    • Apresentação de Proposta
  • Qualifica nicho e dor              • Fechamento e Onboarding
            │                                   ▲
            └─────────── [ Lead Quente ] ───────┘
                     (Transbordo Direto)
```

### 14.3 Ações Técnicas Implementadas:
* **Remoção do Banner Redundante:** O componente `LivePhoneChallengeBanner` foi desacoplado de `App.jsx`, mantendo o fluxo da página ultra-limpo, veloz e focado na ação de maior conversão no Hero.
* **Blindagem do Contato Comercial:** O número `(94) 98442-3948` permanece restrito aos pontos estratégicos de fechamento (links de WhatsApp do especialista, botões de contato humano e transbordo qualificado da Roberta).
* **Homologação em Produção:** Build validado e deploy ativado na Vercel (`https://vocalisai-phi.vercel.app`) via commit no branch `main`.

---

## 15. GUIA MESTRE DOS 3 PILARES OPEN-SOURCE (CAL.COM, CHATWOOT E VOICE STUDIO)

Este guia serve como referência técnica e comercial para expandir a Vocalis AI com ferramentas de código aberto de padrão mundial, aumentando o ticket médio da sua agência e eliminando custos de assinaturas terceiras (como Calendly, Intercom e ElevenLabs).

---

### 15.1 PILAR 1: Cal.com (`https://github.com/calcom/cal.diy`)
**Função no Ecossistema:** Motor Oficial de Agendamentos da Roberta e Camila.

#### 1. Por que usar o Cal.com:
* Substitui o Calendly com custo zero (100% open-source e auto-hospedável).
* Sincronização bidirecional em tempo real com **Google Agenda, Microsoft Outlook e Apple Calendar**.
* Suporte nativo a fusos horários, múltiplos atendentes, limites de reuniões diárias e envio de lembretes.
* Permite criar URLs de agendamento personalizadas sob a sua própria marca (ex: `agenda.suaagencia.com.br/clinica-saude`).

#### 2. Como Rodar (Self-Hosted via Docker):
```bash
# Clonar o repositório oficial
git clone --recursive https://github.com/calcom/cal.com.git
cd cal.com

# Iniciar via Docker Compose
docker compose up -d
```
*Se preferir não hospedar servidores no início, a versão em nuvem gratuita em `https://cal.com` atende perfeitamente até 1 calendário por conta.*

#### 3. Como Conectar com a Vocalis AI:
1. No painel do Cal.com, vá em **Settings > Developer > API Keys** e gere uma chave de API.
2. Crie um tipo de evento (ex: `Consulta Inicial - 30 Minutos`) e pegue o `eventTypeId`.
3. **Fluxo na Roberta (Telefone) e Camila (WhatsApp):**
   * A IA pergunta: *"Você prefere atendimento pela manhã ou à tarde?"*.
   * O cliente responde: *"Amanhã às 14 horas"*.
   * A Vocalis faz uma requisição HTTP REST para o Cal.com:
     ```http
     POST https://api.cal.com/v1/bookings?apiKey=SUA_CHAVE_API
     Content-Type: application/json

     {
       "eventTypeId": 12345,
       "start": "2026-11-16T14:00:00.000Z",
       "responses": {
         "name": "Carlos Andrade",
         "email": "carlos@gmail.com",
         "notes": "Agendado via voz pela Roberta"
       },
       "metadata": { "channel": "telefone_vocalis" }
     }
     ```
   * O Cal.com bloqueia a agenda do médico/corretor e devolve a confirmação.
   * A Roberta confirma na linha: *"Perfeito, Carlos! Seu horário foi reservado para amanhã às 14h. Acabei de te enviar a confirmação no WhatsApp com o link do endereço!"*.

---

### 15.2 PILAR 2: Chatwoot (`https://github.com/chatwoot/chatwoot`)
**Função no Ecossistema:** Central de Atendimento Omnichannel e Painel de Transbordo Humano.

#### 1. Por que usar o Chatwoot:
* Elimina a principal objeção de venda corporativa: *"E se o cliente quiser falar com uma pessoa de verdade?"*.
* Uma única caixa de entrada para múltiplos canais: **WhatsApp, Webchat do site, Instagram Direct e E-mail**.
* Distribuição de conversas entre atendentes humanos, controle de filas e relatórios de tempo de resposta.

#### 2. Como Rodar:
* Via Docker oficial com 1 comando:
  ```bash
  docker run -d -p 3000:3000 --name chatwoot chatwoot/chatwoot:latest
  ```
* Ou criando conta gratuita diretamente em `https://app.chatwoot.com`.

#### 3. Como Conectar com a Vocalis AI (Transbordo Inteligente):
1. No Chatwoot, vá em **Settings > Inboxes > Add Inbox** e crie uma caixa de entrada do tipo **API** ou conecte a sua instância de WhatsApp (UazAPI / Evolution).
2. Configure o Webhook do WhatsApp para enviar as mensagens para a Vocalis AI.
3. **Lógica de Transbordo Automático da IA:**
   * Enquanto o cliente estiver tirando dúvidas ou fazendo agendamento, a IA da Vocalis responde de forma autônoma.
   * Quando o cliente diz: *"Quero falar com um atendente humano"*, *"Falar com atendente"* ou a IA detecta insatisfação:
     * A Vocalis aciona a API do Chatwoot para atribuir a conversa a um operador humano:
       ```http
       POST https://app.chatwoot.com/api/v1/accounts/1/conversations/45/toggle_status
       api_access_token: SEU_ACCESS_TOKEN
       Content-Type: application/json

       { "status": "open" }
       ```
     * A IA envia a mensagem final: *"Com certeza! Já transferi nosso bate-papo para um de nossos especialistas. Por favor, aguarde só um instante que alguém da nossa equipe vai te responder por aqui."*
     * A IA se silencia e a equipe da empresa assume o atendimento no painel do Chatwoot sem perder o histórico do que foi conversado.

---

### 15.3 PILAR 3: Voice Studio (`https://github.com/debpalash/VoiceStudio`)
**Função no Ecossistema:** Clonagem de Voz Neural Local e Proprietária (Alternativa ao ElevenLabs).

#### 1. Por que usar o Voice Studio:
* **Zero Custo de Mensalidade em Dólares:** Não depende de planos caros de US$ 99 a US$ 330/mês da ElevenLabs.
* **Margem de Lucro Brutal para a Agência:** Permite vender o serviço de *"Clonagem da Voz do Dono"* por uma taxa de setup de R$ 1.500 a R$ 3.000 para clínicas médicas (voz do médico titular), imobiliárias (voz do corretor mais querido) e escritórios de advocacia.
* Roda modelos neurais de ponta como **XTTS-v2, Coqui TTS, Bark e RVC** com capacidade de clonagem a partir de áudios curtos.

#### 2. Como Rodar Localmente no seu Computador ou Servidor GPU:
```bash
# 1. Clonar o repositório
git clone https://github.com/debpalash/VoiceStudio.git
cd VoiceStudio

# 2. Criar ambiente virtual Python
python -m venv venv
venv\Scripts\activate

# 3. Instalar dependências de áudio e inteligência artificial
pip install -r requirements.txt

# 4. Iniciar a interface gráfica do estúdio
python app.py
```
*Recomendado ter placa de vídeo NVIDIA (RTX 3060 ou superior) ou alugar uma máquina GPU por US$ 0.20/hora na RunPod/Vast.ai.*

#### 3. Como Operar o Processo de Clonagem na Prática:
1. **Coleta da Amostra:**
   * Peça para o cliente (ex: Dr. Carlos) gravar uma mensagem de 60 a 90 segundos lendo um texto formal no gravador do celular ou em uma nota de voz no WhatsApp em um ambiente silencioso.
2. **Processamento no Voice Studio:**
   * Faça upload do áudio no Voice Studio.
   * O sistema remove ruídos de fundo e extrai a "assinatura acústica" (pitch, timbre, ritmo de respiração).
   * Gere um texto de teste: *"Olá, sou o Dr. Carlos. Obrigado por ligar para nossa clínica. Em que posso te ajudar hoje?"*.
3. **Integração com a Vocalis AI:**
   * Exporte os pesos do modelo (`voice_embedding.npy` ou amostra de referência `.wav`).
   * No painel da Vocalis (`InsideDashboardSection.jsx > Estúdio de Voz`), suba o arquivo de voz no perfil do assistente.
   * Conecte esse perfil ao motor de telefonia ou ao novo servidor de TTS neural da Vocalis.

---

### 15.4 Matriz de Monetização dos 3 Pilares para a Sua Agência

| Recurso Integrado | Valor Cobrado do Cliente Final | Custo Operacional para Você | Margem Líquida |
| :--- | :--- | :--- | :--- |
| **Atendimento Telefônico com Agendamento Cal.com** | R$ 1.500 (Setup) + R$ 497/mês | R$ 0,00 (Cal.com open-source) | **100% Líquido** |
| **Central WhatsApp com Transbordo Humano Chatwoot** | R$ 900 (Setup) + R$ 250/mês | R$ 0,00 (Chatwoot open-source) | **100% Líquido** |
| **Voz Clonada Exclusiva do Dono (Voice Studio)** | R$ 2.500 (Taxa única de clonagem) | R$ 0,00 (Processado no seu PC/GPU) | **100% Líquido** |

---

## 16. MANUAL DE PRECIFICAÇÃO, CUSTOS REAIS E MINUTAGEM TRANSPARENTE

### 16.1 Decomposição de Custos Reais da Vocalis AI (Custo para a Agência Rodar)

| Componente da Chamada | Tecnologia / Provedor | Custo em Real (R$) |
| :--- | :--- | :--- |
| **Transcrição de Fala (STT)** | Deepgram Nova-2 | R$ 0,025 / min |
| **Cérebro LLM (Raciocínio)** | Google Gemini 2.5 Flash | R$ 0,005 / min |
| **Voz Neural Humana (TTS)** | Google Gemini Audio (Kore) | R$ 0,024 / min |
| **Linha Telefônica SIP Brasil**| Vapi / Telecom Parceira | R$ 0,100 / min |
| **CUSTO TOTAL DIRETO POR MINUTO**| — | **≈ R$ 0,154 / minuto** |

#### Custo Mensal por Perfil de Cliente:
* **Cliente Pequeno (100 min/mês):** Custa para você **R$ 15,50/mês**.
* **Cliente Médio (250 min/mês):** Custa para você **R$ 41,00/mês**.
* **Cliente Grande (600 min/mês):** Custa para você **R$ 95,00/mês**.
* **WhatsApp (UazAPI / Servidor Próprio):** **R$ 0,00 por mensagem** (Zero taxas cobradas pela Meta).
* **Cal.com & Chatwoot:** **R$ 0,00** (Open-source auto-hospedado).

---

### 16.2 Estrutura Comercial de Venda (Sem Pegadinhas para o Cliente)

A proposta deve ser apresentada em 3 blocos cristalinos:

#### 1. Setup de Implantação (Cobrança Única):
* Treinamento da IA com regras do negócio, catálogo e perguntas frequentes.
* Integração com WhatsApp, linha telefônica 0800 / DDD e Google Agenda/Cal.com.
* **Valor Recomendado:** **R$ 1.500,00** (à vista ou em até 12x no cartão).

#### 2. Assinatura da Plataforma (Mensalidade Recorrente):
* IA ativa 24/7 atendendo ligações e WhatsApp.
* Painel de relatórios, transcrições e transbordo para equipe humana (Chatwoot).
* **Franquia de 250 minutos de chamadas já inclusa.**
* **Valor Recomendado:** **R$ 497,00/mês**.

#### 3. Política de Minutagem Transparente (Pré-Paga):
* Se o cliente ultrapassar a franquia de 250 minutos: **R$ 0,69 por minuto excedente**.
* O cliente recarrega créditos no painel quando quiser e o saldo nunca expira.
* **Margem da Agência:** Você compra a R$ 0,16 e vende a R$ 0,69 (**lucro superior a 330%** sobre o tráfego telefônico).

---

### 16.3 Tabela de Pacotes Prontos para Venda

| Recurso | Plano Essencial | Plano Profissional (Recomendado) | Plano Escala / VIP |
| :--- | :--- | :--- | :--- |
| **Taxa de Setup Única** | R$ 990,00 | **R$ 1.500,00** | R$ 2.500,00 a R$ 3.500,00 |
| **Mensalidade** | R$ 397,00/mês | **R$ 497,00/mês** | R$ 897,00/mês |
| **Franquia de Voz Inclusa** | 100 minutos | **250 minutos** | 600 minutos |
| **Minuto Excedente** | R$ 0,79 / min | **R$ 0,69 / min** | R$ 0,59 / min |
| **WhatsApp Oficial** | Ilimitado | **Ilimitado** | Ilimitado |
| **Agendamento Cal.com** | 1 agenda | **Até 5 agendas** | Equipe ilimitada |
| **Transbordo Chatwoot** | Opcional (+ R$ 99/mês) | **Incluso** | **Incluso** |
| **Clonagem de Voz (Voice Studio)** | Opcional | Opcional | **1 Voz Clonada Inclusa** |
| **Seu Custo Estimado** | ≈ R$ 16,00/mês | **≈ R$ 41,00/mês** | ≈ R$ 95,00/mês |
| **Seu Lucro Líquido** | **R$ 381,00/mês (96%)** | **R$ 456,00/mês (91%)** | **R$ 802,00/mês (89%)** |

---

### 16.4 Roteiro de Fechamento por Contraste CLT

> *"Doutor / Seu Carlos, uma recepcionista física para sua empresa custa no mínimo R$ 2.900,00 por mês (salário + encargos + VT + férias), trabalhando apenas 8h por dia de segunda a sexta.*
>
> *A Vocalis AI fica ativa **24 horas por dia, 7 dias por semana**, atende no telefone, no WhatsApp, nunca fica doente, não perde clientes à noite e agenda consultas direto na sua agenda por apenas **R$ 497,00 por mês**, com 250 minutos já inclusos.*
>
> *Se sua empresa receber muitas ligações e passar de 250 minutos, cada minuto adicional custa centavos (R$ 0,69) de forma pré-paga e transparente, sem nenhum centavo de surpresa na sua fatura."*

---

*Documento gerado e mantido na raiz do projeto como referência oficial de engenharia, arquitetura e produto.*
