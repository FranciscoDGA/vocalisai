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
  2. Conexão com voz neural feminina da Roberta;
  3. Visualizador de onda sonora (waveform) animada sincronizada com a voz;
  4. Reconhecimento de fala via microfone (`SpeechRecognition`) com botão interativo "Falar no Mic";
  5. Menu de respostas rápidas com 1 clique;
  6. **Notificação Flutuante de WhatsApp:** Desliza durante a ligação avisando do recebimento de mensagem;
  7. **Card de Ação Executada:** Demonstra que o Pix de R$ 1,00 foi gerado na hora e a agenda sincronizada;
  8. **Modal Sobreposto de WhatsApp:** Permite inspecionar a mensagem formatada recebida da Roberta com botão de copiar código Pix.

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

## 8. ROADMAP FUTURO (O QUE VAMOS CONSTRUIR)

Para as próximas fases de evolução da plataforma:

1. **Clonagem de Voz em 1 Minuto:**
   * Permitir que o dono da empresa grave 60 segundos de áudio pelo microfone para criar a voz do próprio médico, advogado ou dono da loja.
2. **Modo WhatsApp Voice-to-Voice Nativo:**
   * Recepção de áudios do WhatsApp e envio de respostas em áudios com entonação humana e pausas naturais.
3. **Painel de Subcontas Multi-Tenant para Agências:**
   * Dashboard onde o dono da agência enxerga todas as clínicas e empresas clientes dele em uma única tela, com botão de faturamento automático de minutos.
4. **Disparo Ativo de Campanhas Outbound com IA:**
   * Importação de planilha Excel com 500 contatos para a IA ligar automaticamente confirmando consultas ou oferecendo promoções personalizadas.

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

## 10. PAUTA E SPRINT DE EXECUÇÃO PARA AMANHÃ (CHECKLIST PRONTO)

Quando você abrir o projeto amanhã, este é o plano de execução imediato que vamos consultar e implementar passo a passo:

- [ ] **1. Conexão e Modelagem do Banco de Dados:**
  * Configurar a persistência real de dados (Supabase / PostgreSQL / SQLite);
  * Criar as tabelas: `workspaces`, `assistants`, `calls`, `contacts`, `leads_scoring` e `api_keys`;
  * Salvar e carregar os assistentes criados e histórico real de chamadas.
- [ ] **2. Integração Prática com o OpenBot (`openbot.run`):**
  * Conectar os webhooks de entrada e saída com o motor do OpenBot;
  * Testar o envio de variáveis contextuais (nome do cliente, nicho, histórico) para o fluxo do OpenBot;
  * Receber a resposta dinâmica do OpenBot e sintetizá-la na voz neural da assistente.
- [ ] **3. Disparo Real de Notificações e Webhooks:**
  * Conectar provedor de envio de WhatsApp (Evolution API, Z-API ou Meta Cloud API oficial);
  * Conectar gateway de pagamentos (Mercado Pago / Asaas / Stripe) para geração de cobrança Pix real em produção.
- [ ] **4. Treinamento Prático & Simulação de Vendas Guiada:**
  * Sessão passo a passo ensinando você a operar cada recurso do painel;
  * Simulação de atendimento de um cliente real;
  * Script de abordagem de vendas validado para prospectar os primeiros 5 clientes pagantes da sua agência.

---

*Documento gerado e mantido na raiz do projeto como referência oficial de engenharia, arquitetura e produto.*
