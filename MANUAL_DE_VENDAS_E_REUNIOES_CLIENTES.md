# KIT EXECUTIVO DE VENDAS & MANUAL OPERACIONAL DA PLATAFORMA VOCALIS AI
### Ecossistema Integrado: Vocalis AI / AI Agency OS / OpenBot 24/7
**Documento Confidencial de Engenharia & Vendas Comerciais** • Novembro/2026

---

## 1. O PONTO CRÍTICO: HOSPEDAGEM DO OPENBOT 24/7 NA NUVEM

Você tocou no ponto exato da arquitetura profissional: **um computador pessoal desliga, reinicia para atualizar o Windows ou cai a internet de casa**. Se o seu site promete atendimento 24 horas por dia, 7 dias por semana, a infraestrutura não pode depender de um notebook aberto na sua mesa.

### Como Funciona a Infraestrutura em Produção:

```
[Cliente telefona às 03:00 da madrugada]
               │
               ▼
   [Vocalis AI / Telefonia Vapi] (Nuvem de Alta Disponibilidade - 99.99%)
               │
               ▼ (Webhook REST HTTPS em <150ms)
   [OpenBot 24/7 Hospedado na Nuvem (Railway / Render / VPS Hetzner)]
               │
               ▼
   [Google Calendar / Supabase / CRM da Clínica / API Pix]
```

### Onde e Como Hospedar o OpenBot na Nuvem (Custo: ~R$ 30 a R$ 50/mês para atender dezenas de clientes):

1. **Opção 1: Railway.app (Recomendada - 1 Clique):**
   * Você sobe o repositório do OpenBot direto do GitHub para a [Railway](https://railway.app);
   * Ele gera uma URL pública segura com SSL automático: `https://seu-openbot-production.up.railway.app`;
   * Fica ligado 365 dias por ano sem você se preocupar com servidor;
   * Você cola essa URL no campo de Webhook do seu Dashboard da Vocalis AI.

2. **Opção 2: Render.com ou VPS Hetzner/DigitalOcean:**
   * Máquina Linux Ubuntu com Docker rodando o OpenBot em segundo plano via `docker-compose up -d`;
   * Custo fixo de ~$5 a $6 dólares por mês.

3. **E para que serve o OpenBot no seu PC (`C:\Users\User\OpenBot`)?**
   * O seu computador é o seu **Laboratório de Desenvolvimento / Homologação**.
   * Você desenha o fluxo novo, testa a lógica no seu PC e, quando estiver perfeito, sobe para o servidor na nuvem que roda 24/7.

---

## 2. ROTEIRO PRÁTICO DE REUNIÃO DE VENDAS (O SCRIPT DE 20 MINUTOS)

Quando você sentar com um dono de clínica, imobiliária ou escritório de advocacia (presencialmente ou no Google Meet), **NUNCA abra códigos, Vapi ou configurações complexas**. O empresário compra **TEMPO, LUCRO E RESOLUÇÃO DE DORES**.

Aqui está o roteiro testado e validado para você conduzir a reunião com segurança absoluta:

---

### MINUTO 01 A 05: A ABERTURA E O DIAGNÓSTICO DO GARGALO
* **Você:** *"Dr. Marcelo, obrigado pelo tempo. Antes de mostrar a tecnologia, quero entender como funciona a recepção hoje. Se um paciente liga às 12h30 quando as secretárias estão almoçando, ou às 20h quando a clínica já fechou, o que acontece com essa chamada?"*
* **O Cliente vai responder:** *"Geralmente cai na caixa postal ou toca até desligar. No dia seguinte tentamos retornar quem deixou mensagem no WhatsApp."*
* **Você (Mostrando o impacto financeiro):** *"Pois é. Os dados do setor mostram que mais de 65% das pessoas que não são atendidas no primeiro minuto simplesmente ligam para a próxima clínica que aparece no Google. Se a sua consulta média é de R$ 350,00 e você perde apenas 3 pacientes por semana por falta de atendimento rápido, a sua clínica está deixando na mesa mais de **R$ 4.200,00 todo mês**. Faz sentido esse cálculo?"*
* **O Cliente:** *"Com certeza."*

---

### MINUTO 06 A 12: A DEMONSTRAÇÃO MÁGICA AO VIVO (O EFEITO "UAU")
Este é o momento onde a venda acontece. Você não fala sobre IA; você faz a IA ligar para ele.

* **Você:** *"Doutor, em vez de te mostrar slides teóricos, vou fazer uma demonstração agora. Qual o número do seu celular?"*
* **Passo a Passo na Tela:**
  1. Você abre o seu site (`vocalisai-phi.vercel.app`);
  2. Digita o DDD e o número dele no campo de teste do Hero;
  3. Clica em **"Receber ligação da Roberta"**;
  4. O celular dele toca na mesa na frente dele em 3 segundos;
  5. A Roberta fala com voz humana amigável em Português do Brasil:
     > *"Olá! Aqui é a assistente virtual. Estou ligando para demonstrar como a sua clínica pode atender todos os pacientes no primeiro toque, sem fila e a qualquer hora do dia ou da noite..."*
  6. Durante a chamada, ele recebe a mensagem no WhatsApp com o resumo da conversa e o Pix de demonstração.

* **O Choque do Cliente:** O empresário percebe na hora: *"Se ela atendeu o meu telefone com essa voz natural e me mandou WhatsApp agora, ela pode atender os meus pacientes hoje mesmo."*

---

### MINUTO 13 A 17: APRESENTAÇÃO DO PAINEL DA EMPRESA DELE
Agora você abre o painel da **Vocalis AI** na visão executiva (White-Label):

* **Você mostra:**
  1. **Aba Início (Gráficos):** Mostre o número de chamadas atendidas, taxa de resolução (94%) e histórico com gravação de voz e transcrição em texto de cada ligação.
  2. **Aba WhatsApp:** Mostre como as mensagens e notas de áudio são respondidas automaticamente com a voz do próprio médico ou da assistente.
  3. **Segurança Anti-Alucinação (Score 9.9):** Mostre que a IA não inventa preços nem dá conselhos médicos fora do protocolo autorizado.

---

### MINUTO 18 A 20: A PROPOSTA COMERCIAL & FECHAMENTO

Você apresenta **duas opções** para o cliente escolher, nunca dando a opção de "não fechar":

* **Você:** *"Doutor, nós temos dois caminhos para implantar na sua clínica:"*
  * **Opção 1 (Implantação Completa Turnkey / Chave na Mão - Recomendada):**
    * *O que inclui:* Nós configuramos toda a inteligência da sua clínica, gravamos as regras, integramos com a sua agenda, clonamos a voz caso queira e damos suporte contínuo.
    * *Valor:* **Setup único de R$ 2.500,00** (em até 3x) + **Mensalidade de R$ 1.290,00/mês**.
  * **Opção 2 (Plano Essencial):**
    * *Valor:* **Setup de R$ 1.500,00** + **Mensalidade de R$ 890,00/mês**.
* **Pergunta de Fechamento:** *"Qual desses dois formatos faz mais sentido para a gente iniciar a calibração da secretária da sua clínica ainda nesta semana?"*

---

## 3. COMPARATIVO VISUAL: O QUE VOCÊ FAZ vs O QUE O CLIENTE FAZ

```
┌────────────────────────────────────────────────────────────────────────┐
│                        O QUE O CLIENTE VÊ E FAZ                        │
├────────────────────────────────────────────────────────────────────────┤
│ • Acessa o painel bonito da Vocalis AI com a marca dele                │
│ • Ouve as gravações das ligações dos clientes dele                     │
│ • Vê as consultas caindo no Google Calendar dele                       │
│ • Recebe o faturamento no bolso sem precisar contratar mais secretárias│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Tudo 100% amigável, sem código)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  O QUE VOCÊ (ARQUITETO DE IA) GERENCIA                 │
├────────────────────────────────────────────────────────────────────────┤
│ • Conecta a Vocalis com a Vapi / Telefonia homologada                  │
│ • Configura o prompt e as regras de negócio do nicho                   │
│ • Liga o Webhook no OpenBot para lógicas avançadas de sistema          │
│ • Cobra o Setup de R$ 2.500 + a Mensalidade de R$ 1.290/mês todo mês   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. MATERIAL DE APOIO PARA A REUNIÃO (CHECKLIST PARA IMPRIMIR OU LEVAR NO IPAD)

Antes de ir para a reunião com o cliente, certifique-se de ter:

1. **Aba do Site Aberta:** `https://vocalisai-phi.vercel.app` (carrega em 1 segundo no 4G).
2. **Número de Teste Salvo:** O seu próprio número cadastrado para discagem imediata caso o cliente queira testar ligando ele mesmo para o assistente.
3. **Contrato de Prestação de Serviços Simples:**
   * Objeto: Implantação e Licenciamento de Agente de Atendimento Inteligente Omnichannel;
   * Garantia: 30 dias incondicionais de satisfação;
   * SLA: 99.5% de disponibilidade com suporte prioritário;
   * Conformidade integral com a LGPD (Lei Geral de Proteção de Dados).
4. **Calculadora de ROI:**
   * Mostre que economizar o salário e encargos de 1 recepcionista presencial (R$ 2.800/mês com impostos) mais a recuperação de 5 pacientes perdidos por mês paga a plataforma 4 vezes no mesmo mês.
