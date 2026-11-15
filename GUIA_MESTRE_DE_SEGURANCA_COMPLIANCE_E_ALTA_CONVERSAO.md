# GUIA MESTRE DE SEGURANÇA, COMPLIANCE & ALTA CONVERSÃO — VOCALIS AI
**Versão:** 3.0 Pro • **Data:** Novembro de 2026 • **Empresa:** Vocalis AI / Francisco DGA
**Classificação:** Documento Estratégico de Operações, Vendas, Segurança & Arquitetura

---

## ÍNDICE GERAL

1. [Identidade Visual Proprietária & Tipografia de Elite](#1-identidade-visual-proprietária--tipografia-de-elite)
2. [O Arsenal de Alta Conversão (As 6 Armas Psicológicas)](#2-o-arsenal-de-alta-conversão-as-6-armas-psicológicas)
3. [As 3 Armas de Ouro (A Tríade Que Vende Sozinha)](#3-as-3-armas-de-ouro-a-tríade-que-vende-sozinha)
4. [Protocolo de Segurança do Dono do Negócio (Anti-Golpe & Anti-Ataque)](#4-protocolo-de-segurança-do-dono-do-negócio-anti-golpe--anti-ataque)
5. [Protocolo de Segurança e Proteção do Cliente (Compliance & LGPD)](#5-protocolo-de-segurança-e-proteção-do-cliente-compliance--lgpd)
6. [Arquitetura Técnica do Servidor WhatsApp (Baileys / Zero Taxas Meta)](#6-arquitetura-técnica-do-servidor-whatsapp-baileys--zero-taxas-meta)
7. [Scripts e Procedimentos de Vendas & Objeções Comuns](#7-scripts-e-procedimentos-de-vendas--objeções-comuns)
8. [Checklist Diário de Monitoramento e Manutenção](#8-checklist-diário-de-monitoramento-e-manutenção)

---

## 1. IDENTIDADE VISUAL PROPRIETÁRIA & TIPOGRAFIA DE ELITE

Para desvincular 100% a Vocalis AI do modelo de referência (Kloel) e criar autoridade de unicórnio de tecnologia:

* **Paleta de Cores:**
  - **Cor Primária de Destaque:** Deep Indigo `#4F46E5` (transmite inteligência artificial avançada, segurança corporativa e modernidade).
  - **Cor de Brilho / Glow:** Electric Violet `#6366F1` e `#818CF8` (utilizada em ondas de voz e botões primários).
  - **Fundos Suaves e Badges:** `#EEF2FF` (Indigo 50) e `#E0E7FF` (Indigo 100).
  - **Fundo do Canvas:** `#FAF9F5` (Creme minimalista de alto contraste).
  - **Tipografia Escura:** `#1A1816` (Carvão suave para reduzir cansaço visual).

* **Tipografia:**
  - **Corpo e Títulos Técnicos:** `Plus Jakarta Sans` (geométrica, ultra nítida, padrão dos maiores SaaS de IA do Vale do Silício como Perplexity e Linear).
  - **Destaques Editoriais em Itálico:** `Instrument Serif` (traz elegância de marca consolidada e contraste magnético nas palavras de valor).

* **Símbolo Exclusivo da Marca: V-Wave (`src/components/VocalisLogo.jsx`):**
  - Badge em degradê índigo-violeta contendo 5 barras verticais de frequência sonora que convergem simetricamente desenhando a letra **"V"** de Vocalis.
  - Substitui os traços estáticos anteriores no cabeçalho, rodapé, favicon e no dashboard.

---

## 2. O ARSENAL DE ALTA CONVERSÃO (AS 6 ARMAS PSICOLÓGICAS)

Implementadas e integradas diretamente no fluxo da Landing Page (`src/App.jsx`):

### 2.1. Test Drive Auditivo em 1 Clique (`src/components/AudioShowcaseSection.jsx`)
- **Problema que resolve:** Elimina o medo do cliente de que a IA soe como uma URA de banco mecânica ("digite 1").
- **Mecânica:** 3 cartões interativos representando os maiores nichos atendidos:
  1. *Clínica Médica / Odonto (Débora):* Agendamento de emergência no domingo à noite com acolhimento e confirmação.
  2. *Imobiliária (Camila):* Qualificação de lead com orçamento de R$ 1,4 milhão e visita agendada.
  3. *Escritório de Advocacia (Roberto):* Triagem trabalhista executiva sigilosa e reunião confidencial marcada.
- **Resultado:** O visitante ouve a voz humana respirando e com sotaque brasileiro em 15 segundos sem digitar formulários.

### 2.2. Calculadora de Faturamento Perdido (`src/components/LostRevenueCalculator.jsx`)
- **Problema que resolve:** O cliente não compra por "recursos", ele compra para **estancar perda de dinheiro**.
- **Mecânica:** Sliders dinâmicos de contatos diários (5 a 150) e ticket médio (R$ 50 a R$ 2.500).
- **Cálculo:** Média de mercado aponta que 35% dos contatos chegam fora do horário comercial (noite, almoço, finais de semana) e 22% vão pro concorrente se não atendidos no primeiro minuto.
- **Resultado:** Exibe em destaque vermelho: *"Você está perdendo em média R$ 27.000,00/mês"* seguido do botão *"Estancar perda por R$ 297/mês"*.

### 2.3. Tabela Comparativa Brutal (`src/components/ComparisonMatrixSection.jsx`)
- **Problema que resolve:** Desmonta a intenção de contratar mais um funcionário CLT ou usar robôs arcaicos.
- **Comparativo:**
  - *Atendente CLT:* R$ 3.800+/mês (com encargos), 8h/dia, atestados, férias, 1 ligação por vez (linha ocupada).
  - *URA Antiga ("Digite 1"):* Custa R$ 400 a R$ 900/mês, 68% desligam na cara, experiência horrível.
  - *Vocalis AI:* A partir de R$ 297/mês, 24/7/365 ininterrupto, 100+ ligações simultâneas, voz calorosa nativa.

### 2.4. Prova Social em Áudio Real (`src/components/VoiceTestimonialsSection.jsx`)
- **Problema que resolve:** Prints de depoimentos em texto podem ser forjados; **áudio de empresário real não se falsifica**.
- **Mecânica:** Cards com foto, empresa e botão de áudio de 15 segundos tocando a voz do cliente contando o ROI obtido (Dr. Marcos da Clínica Sorriso, Juliana da Prime Imóveis e Dr. Eduardo Mendonça).

### 2.5. Garantia Blindada de 14 Dias (`src/components/GuaranteeBadgeSection.jsx`)
- **Problema que resolve:** Remove o medo de comprar e se arrepender (inversão total do risco).
- **Termo:** Devolução de 100% do valor pago em até 14 dias com apenas um e-mail se não notar aumento nos agendamentos.

### 2.6. Modal de Intenção de Saída (`src/components/ExitIntentModal.jsx`)
- **Problema que resolve:** Captura o tráfego que iria embora sem converter.
- **Gatilho:** Detecta a saída do cursor do mouse em direção às abas do navegador (`e.clientY <= 10`) apenas 1 vez por sessão.
- **Oferta:** *"Espere! Veja a Vocalis ligando no seu celular agora em 30 segundos sem pagar nada ou fale no WhatsApp."*

---

## 3. AS 3 ARMAS DE OURO (A TRÍADE QUE VENDE SOZINHA)

Estas são as 3 funcionalidades que diferenciam quem vende "software" de quem vende **resultados milionários**:

### 3.1. O "Desafio do Telefone Aberto" (`src/components/LivePhoneChallengeBanner.jsx`)
* **Conceito:** Nenhuma empresa no Brasil tem a coragem de estampar o número de telefone na cara do visitante e desafiá-lo a ligar.
* **Execução:**
  - Badge: `🟢 LINHA AO VIVO • AGENTE PRONTA PARA ATENDER`
  - Número gigante: `(94) 98442-3948` com botão de ligação com 1 toque no celular.
  - Frase de impacto: *"Pegue seu celular agora. Tente interromper a Vocalis, faça perguntas difíceis e veja se consegue notar que é uma inteligência artificial."*

### 3.2. A Oferta "Feito Para Você em 24h" (*Done-For-You* - `src/components/DoneForYouSection.jsx`)
* **Conceito:** Médicos, corretores e advogados têm dinheiro, mas **não têm tempo de configurar robôs**.
* **Execução:**
  - Promessa: *"Você não precisa configurar nada. Nossos engenheiros entregam a IA pronta, treinada e integrada ao seu WhatsApp e agenda em 24 horas."*
  - O cliente apenas responde um formulário/áudio de 15 minutos e recebe a linha pronta para faturar.

### 3.3. WhatsApp com Áudio Imediato em 3 Segundos (`src/components/WhatsAppInstantAudioCard.jsx`)
* **Conceito:** Fazer o cliente experimentar o produto diretamente no canal que ele mais usa (o WhatsApp).
* **Execução:**
  - O cliente clica no botão, cai no WhatsApp da Vocalis e, em menos de 3 segundos, recebe uma nota de voz humanizada com o nome dele. Na própria página há um preview do áudio reproduzível.

---

## 4. PROTOCOLO DE SEGURANÇA DO DONO DO NEGÓCIO (ANTI-GOLPE & ANTI-ATAQUE)

Como proteger a Vocalis AI, suas contas bancárias e suas chaves contra invasores e fraudadores:

1. **Blindagem de APIs e Limites de Gastos (*Hard Cap*):**
   - No painel da **Vapi** (`vapi.ai`): configurar o limite máximo mensal em **US$ 50 ou US$ 100**. Se estourar por excesso de tráfego, o sistema pausa ao invés de cobrar valores astronômicos no cartão.
   - No painel da **OpenAI/Gemini**: nunca deixar cobrança automática ilimitada ligada sem alerta por e-mail de 50%, 75% e 90% do consumo.
2. **Proteção Anti-DDoS e Abuso nos Formulários:**
   - Trava de rate-limit: 1 requisição de teste por número de telefone a cada 15 minutos.
3. **Segurança do WhatsApp e Chip da Empresa:**
   - **PIN de Verificação em Duas Etapas:** Ativar imediatamente nas configurações do WhatsApp. Impede 100% o golpe do *SIM Swap* (clonagem de chip na operadora).
   - **Chip Exclusivo:** Nunca use o número pessoal para homologação da empresa. Use um eSIM ou chip PJ separado.
4. **Proteção Contra Fraudes Financeiras (Pix e Cartão):**
   - **Golpe do Comprovante Falso:** Nunca liberar acessos ou serviços apenas com base em imagem/print de comprovante de Pix enviado por WhatsApp. Conferir sempre o saldo no app do banco ou o status "Aprovado" na Kiwify.
   - **Chargeback:** Utilizar processadoras com antifraude nativo (Kiwify, Stripe, Asaas).

---

## 5. PROTOCOLO DE SEGURANÇA E PROTEÇÃO DO CLIENTE (COMPLIANCE & LGPD)

Como fazer o seu cliente (médico, advogado, empresário) sentir-se **totalmente protegido e seguro para assinar**:

1. **Conformidade com a LGPD (Lei nº 13.709/2018):**
   - Todos os dados coletados (nome, telefone, histórico de agendamentos) são tratados para a finalidade exclusiva do atendimento.
   - Termos de Uso e Política de Privacidade ativos e disponíveis no rodapé de todas as páginas.
2. **Criptografia e Sigilo Profissional:**
   - Comunicação protegida por protocolo HTTPS / TLS de ponta a ponta.
   - Os prontuários e conversas não são utilizados para treinar modelos públicos de IA de terceiros.
3. **Propriedade Incondicional dos Contatos:**
   - O banco de dados de leads pertence 100% ao cliente contratante. A Vocalis AI não vende, não aluga e não dispara publicidade externa para os pacientes/clientes dele.
4. **Controle Total e Transparência:**
   - O cliente tem acesso a 100% das gravações e transcrições das chamadas dentro do painel.
   - Botão de pausa emergencial: se o cliente quiser desligar a IA em qualquer momento, ele clica em um botão e o atendimento volta a ser humano.
5. **Garantia de Reembolso sem Burocracia:**
   - Se nos primeiros 14 dias o cliente não estiver satisfeito, o cancelamento é efetuado com 1 clique pela plataforma de checkout.

---

## 6. ARQUITETURA TÉCNICA DO SERVIDOR WHATSAPP (BAILEYS / ZERO TAXAS META)

* **Diretório:** `whatsapp-server/`
* **Tecnologias:** Node.js 24, `@whiskeysockets/baileys`, Express, CORS, QRCode.
* **Porta Local:** `8080`
* **Persistência de Sessão:** `whatsapp-server/session_auth/` (armazena as credenciais criptografadas de login; após escanear o QR Code, a conexão se restabelece automaticamente mesmo se reiniciar o computador).
* **Script de Execução em 1 Clique:** `iniciar-whatsapp.bat` na raiz do projeto.
* **Diferencial Único:** Enquanto o Kloel e outras ferramentas cobram centavos por cada mensagem através da API Oficial da Meta, o seu servidor Baileys envia mensagens e áudios **gratuitamente** via WhatsApp Web.

---

## 7. SCRIPTS E PROCEDIMENTOS DE VENDAS & OBJEÇÕES COMUNS

### Objeção 1: *"Tenho medo dos meus clientes acharem ruim falar com robô."*
> **Resposta:** *"Doutor, você já ligou para o nosso número de demonstração? Nós não usamos URA de 'digite 1'. A Vocalis respira, tem entonação natural, entende interrupções e fala como uma recepcionista treinada. Ligue agora para (94) 98442-3948 e comprove no seu próprio celular."*

### Objeção 2: *"Não tenho tempo de configurar IA nem mexer em tecnologia."*
> **Resposta:** *"O senhor não vai mexer em nada. Nossa equipe de engenheiros entrega o sistema pronto, treinado com os seus serviços e integrado na sua agenda em 24 horas. Você só nos manda o link do seu site ou tabela de preços e nós fazemos todo o trabalho pesado."*

### Objeção 3: *"E se eu contratar e não gostar?"*
> **Resposta:** *"O senhor tem 14 dias de garantia incondicional de risco zero. Se nos primeiros 14 dias você não notar aumento nos agendamentos ou se qualquer coisa não te agradar, devolvemos 100% do seu dinheiro com apenas um e-mail. O risco é todo meu."*

---

## 8. CHECKLIST DIÁRIO DE MONITORAMENTO E MANUTENÇÃO

- [ ] Verificar status do servidor WhatsApp Web na porta `8080` (`http://localhost:8080/status`).
- [ ] Checar saldo e consumo na Vapi (`vapi.ai`) e garantir que está abaixo do limite estipulado.
- [ ] Monitorar novos leads capturados no painel Supabase / CRM.
- [ ] Testar periodicamente a linha aberta `(94) 98442-3948` com uma chamada de 15 segundos.
- [ ] Acompanhar conversões do checkout na Kiwify.

---
*Documento registrado e arquivado com sucesso no repositório oficial da Vocalis AI.*
