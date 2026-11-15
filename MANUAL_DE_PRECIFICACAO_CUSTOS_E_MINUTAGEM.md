# MANUAL MESTRE DE PRECIFICAÇÃO, CUSTOS REAIS E MINUTAGEM · VOCALIS AI
**Versão:** 1.0 Oficial • **Data:** Novembro/2026 • **Autor:** Francisco & Antigravity AI

---

## 1. VISÃO GERAL: TRANSPARÊNCIA, RESPEITO AO CLIENTE E ALTA MARGEM

Uma das principais causas de cancelamento (churn) e desconfiança em serviços de telefonia e inteligência artificial são as "taxas ocultas" e "pegadinhas na fatura".
A **Vocalis AI** adota a política de **Transparência Absoluta**. O cliente sabe exatamente o que está pagando no milissegundo zero, sem surpresas no fim do mês.

---

## 2. DECOMPOSIÇÃO DE CUSTOS REAIS DA VOCALIS AI (O Custo para Você Operar)

Para precificar com segurança e lucrar acima de 85% líquido, esta é a tabela de custos da nossa infraestrutura:

### 2.1 Custo Unitário de 1 Minuto de Chamada Telefônica
| Componente | Função | Provedor / Tecnologia | Custo em Dólar | Custo em Real (R$) |
| :--- | :--- | :--- | :--- | :--- |
| **Transcrição (STT)** | Ouvir a voz do cliente e converter em texto | Deepgram Nova-2 | $0.0043 / min | **R$ 0,025** |
| **Inteligência (LLM)** | Entender o contexto e gerar a resposta comercial | Google Gemini 2.5 Flash | $0.0008 / min | **R$ 0,005** |
| **Voz Neural (TTS)** | Sintetizar a voz humana de Roberta em tempo real | Google Gemini Audio | $0.0040 / min | **R$ 0,024** |
| **Linha Telefônica** | Tráfego SIP/PSTN para celular ou fixo Brasil | Vapi / Telecom Parceira | $0.0170 / min | **R$ 0,100** |
| **TOTAL POR MINUTO** | **Custo total de 1 minuto de ligação ativa ou receptiva** | — | **$0.0261 / min** | **≈ R$ 0,154 / min** |

### 2.2 Custos Fixos Mensais da Agência
* **WhatsApp (UazAPI / Evolution API em VPS própria):** R$ 40,00 a R$ 60,00/mês para rodar dezenas de clientes em simultâneo. **Custo por mensagem trocada: R$ 0,00** (Zero taxas da Meta Cloud API).
* **Banco de Dados & Auth (Supabase):** Plano gratuito até 500 MB (milhares de leads); depois US$ 25/mês no Pro.
* **Hospedagem & APIs Serverless (Vercel):** Plano gratuito / US$ 20/mês no Pro.
* **Motor de Agendamentos (Cal.com open-source):** R$ 0,00 (auto-hospedado).
* **Transbordo Humano (Chatwoot open-source):** R$ 0,00 (auto-hospedado).

---

## 3. TABELA OFICIAL DE PRECIFICAÇÃO PARA O CLIENTE FINAL

Apresente sempre em 3 camadas simples: **Setup Único**, **Mensalidade da Plataforma** e **Minutagem Transparente**.

| Recurso / Entrega | PLANO ESSENCIAL (Pequenos Negócios) | PLANO PROFISSIONAL (Recomendado) | PLANO ESCALA / VIP (Imobiliárias & Grandes Clínicas) |
| :--- | :--- | :--- | :--- |
| **Público Alvo** | Consultórios individuais, autônomos e pequenos comércios | Clínicas médicas/odonto, escritórios de advocacia, imobiliárias | Concessionárias, redes de clínicas e empresas com alto volume |
| **Taxa de Setup Única** | **R$ 990,00** | **R$ 1.500,00** | **R$ 2.500,00 a R$ 3.500,00** |
| **Mensalidade** | **R$ 397,00 / mês** | **R$ 497,00 / mês** | **R$ 897,00 / mês** |
| **Franquia de Voz Inclusa** | **100 minutos / mês** | **250 minutos / mês** | **600 minutos / mês** |
| **Custo do Minuto Adicional** | R$ 0,79 / minuto | R$ 0,69 / minuto | R$ 0,59 / minuto |
| **WhatsApp Oficial 24/7** | Incluso (Zero taxas Meta) | Incluso (Zero taxas Meta) | Incluso (Zero taxas Meta) |
| **Motor de Agendamentos** | Google Agenda (1 profissional) | Cal.com / Google (até 5 profissionais) | Equipe e calendários ilimitados |
| **Transbordo Chatwoot** | Opcional (+ R$ 99/mês) | **Incluso sem custo adicional** | **Incluso sem custo adicional** |
| **Clonagem de Voz (Voice Studio)**| Opcional (R$ 1.500 taxa única) | Opcional (R$ 1.500 taxa única) | **1 Voz Clonada Inclusa no Setup** |
| **Custo Real para Você** | ≈ R$ 16,00 / mês | ≈ R$ 41,00 / mês | ≈ R$ 95,00 / mês |
| **Seu Lucro Líquido Mensal** | **R$ 381,00 (96% de margem)** | **R$ 456,00 (91% de margem)** | **R$ 802,00 (89% de margem)** |

---

## 4. COMO FUNCIONA A MINUTAGEM TRANSPARENTE (Sem Medo do Cliente)

1. **Franquia Inteligente:**
   * O cliente sabe que os primeiros **250 minutos do mês já estão 100% pagos** na mensalidade dele.
   * Se a chamada média dura 1 minuto e meio, 250 minutos equivalem a cerca de **160 atendimentos telefônicos completos**.
2. **Minuto Adicional Pré-Pago (Modelo Celular):**
   * O cliente nunca recebe uma fatura surpresa no final do mês.
   * Ele recarrega créditos adicionais no painel (ex: recarga de R$ 50,00 ou R$ 100,00).
   * Se o saldo acabar, o sistema avisa a ele por WhatsApp e e-mail com antecedência.
   * **Os créditos não expiram** no fim do mês, acumulando para o próximo ciclo.
3. **Métrica de Rentabilidade da Minutagem:**
   * Você compra o minuto por **≈ R$ 0,16** e vende no plano por **R$ 0,69**.
   * Você tem mais de **330% de margem de lucro bruto** em cada minuto falado.

---

## 5. ROTEIRO DE FECHAMENTO COM O CLIENTE (Contraste com Custo CLT)

Use este roteiro verbal nas reuniões e propostas:

> *"Seu Carlos / Doutora Mariana, para ter uma recepcionista atendendo o telefone da sua clínica durante o horário comercial, o custo médio é de:*
> * *Salário base: R$ 1.800,00*
> * *Encargos, FGTS, férias, 13º e vale-transporte: ≈ R$ 1.100,00*
> * *Custo real CLT: **mais de R$ 2.900,00 por mês**.*
> * *E ela só atende 8 horas por dia, tem pausas para almoço e não trabalha nos fins de semana e feriados.*
> 
> *A Vocalis AI fica ativa **24 horas por dia, 7 dias por semana, 365 dias por ano**:*
> * *Atende no primeiro toque em menos de 3 segundos;*
> * *Não perde nenhuma venda ou consulta à noite e no almoço;*
> * *Agenda pacientes direto na sua agenda;*
> * *Conversa no telefone e no WhatsApp com nota de voz humana;*
> * *E o investimento completo é de apenas **R$ 497,00 por mês**, com 250 minutos já inclusos.*
> 
> *Se a sua clínica crescer e passar de 250 minutos, cada minuto adicional custa centavos (R$ 0,69), de forma pré-paga e transparente, sem nenhum centavo de surpresa na sua fatura."*

---

## 6. POLÍTICA DE RESPEITO E GARANTIA DE RISCO ZERO

Para gerar confiança imediata e acelerar a assinatura do contrato:
1. **Garantia Incondicional de 14 Dias:** Se o cliente não ficar satisfeito com a naturalidade do atendimento nos primeiros 14 dias, você devolve 100% da mensalidade.
2. **Sem Fidelidade Obrigatória:** O cliente pode cancelar a mensalidade a qualquer momento sem multas rescisórias abusivas.
3. **Propriedade dos Dados (LGPD):** O histórico de leads, gravações e agendamentos pertence 100% à empresa do cliente.

---

*Manual homologado para consulta operacional da equipe comercial e técnica da Vocalis AI.*
