# TODO - Protótipo REVO

## Visão do Protótipo

REVO é um aplicativo hipotético mobile-first para monitoramento de saúde geral, rotina física e treino ao vivo. O diferencial do protótipo deve ser a experiência durante a atividade física: o usuário inicia um treino, acompanha sinais vitais simulados em tempo real e recebe recomendações conforme seu perfil, objetivo, recuperação e intensidade do momento.

Referência analisada: `https://revo.framer.wiki` em 21/06/2026. A referência já aponta uma estrutura mobile, modo escuro, cadastro/onboarding, home, treino ao vivo, pós-treino e progresso.

## Diretrizes de Design

- [ ] Usar interface prioritariamente responsiva para tela de celular.
- [ ] Manter modo escuro em todo o protótipo.
- [ ] Usar `#101010` como fundo principal.
- [ ] Usar `#202020` como fundo secundário para seções, cards e áreas agrupadas.
- [ ] Usar `#514166` no botão principal de iniciar treino.
- [ ] Usar tipografia limpa, similar à referência Framer, preferencialmente Inter.
- [x] Usar acentuação gráfica correta em todos os textos visíveis em português.
- [ ] Manter layout denso, direto e com aparência de aplicativo, não de landing page.
- [ ] Usar cantos levemente arredondados em cards e botões, sem exagerar.
- [ ] Usar ícones simples para navegação, treino, saúde, progresso, nutrição e conta.
- [ ] Definir tokens de texto: principal claro, secundário acinzentado e texto desabilitado.
- [ ] Definir tons exatos para status:
  - [ ] Vermelho para estado ruim ou alerta.
  - [ ] Amarelo para estado mediano ou atenção.
  - [ ] Verde para estado muito bom ou seguro.
- [ ] Garantir contraste suficiente entre texto, fundo e botões.
- [ ] Criar estados visuais para botões: normal, pressionado, desabilitado e carregando.
- [ ] Criar estados visuais para cards de status: ruim, mediano, bom e neutro.
- [ ] Evitar conteúdo desktop complexo; em telas grandes, mostrar uma moldura mobile ou aviso de conteúdo mobile.

## Arquitetura de Páginas

### 1. Tela Inicial - `/`

- [x] Exibir o nome REVO como primeiro elemento visual forte.
- [x] Incluir botão "Criar Conta".
- [x] Incluir link "Já possuo uma conta".
- [x] Levar "Criar Conta" para `/signup`.
- [x] Levar "Já possuo uma conta" para `/login`.
- [x] Em desktop, exibir aviso semelhante à referência: conteúdo disponível apenas em resolução mobile.
- [x] Manter a tela simples, sem excesso de texto explicativo.
- [x] Revisar textos da página inicial para conter acentuação gráfica correta.

### 2. Login - `/login`

- [x] Criar tela "Entrar na conta".
- [x] Incluir campo de e-mail.
- [x] Incluir campo de senha.
- [x] Incluir opção "Mostrar senha".
- [x] Incluir botão "Entrar".
- [x] Validar campos obrigatórios.
- [x] Exibir mensagens de erro simuladas para e-mail inválido ou senha vazia.
- [x] Após login válido, redirecionar para `/inicio`.
- [x] Incluir link discreto para criar conta caso o usuário não tenha cadastro.

### 3. Cadastro e Onboarding - `/signup`

- [x] Criar uma única página de cadastro em `/signup`.
- [x] Controlar a etapa atual com variável de estado, exemplo: `currentStep`.
- [x] Guardar todos os valores do formulário em variáveis de estado ou em um objeto de estado único, exemplo: `signupData`.
- [x] Trocar os inputs exibidos conforme a etapa atual, sem trocar de rota.
- [x] Permitir avançar e voltar entre as etapas.
- [x] Preservar valores já preenchidos ao voltar para uma etapa anterior.
- [x] Exibir progresso da etapa atual, exemplo: "Passo 1 de 6".
- [x] Usar validação específica antes de avançar em cada etapa.
- [x] Exibir mensagens de erro simuladas perto dos campos.
- [x] Manter os botões "Voltar" e "Avançar" fixos ou previsíveis na parte inferior da tela.
- [x] Na primeira etapa, coletar dados de conta:
  - [x] E-mail.
  - [x] Senha.
  - [x] Confirmar senha.
  - [x] Opção "Mostrar senha".
- [x] Na segunda etapa, perguntar "Primeiro, como devo te chamar?".
- [x] Coletar nome de usuário.
- [x] Na terceira etapa, perguntar "Qual o seu objetivo atual?".
- [x] Exibir opções:
  - [x] Perder peso.
  - [x] Hipertrofia.
  - [x] Ganhar força.
  - [x] Aumentar resistência.
- [x] Na quarta etapa, perguntar "Qual o seu nível atual de treino?".
- [x] Exibir opções:
  - [x] Iniciante.
  - [x] Intermediário.
  - [x] Avançado.
  - [x] Atleta profissional.
- [x] Na quinta etapa, coletar dados físicos:
  - [x] Massa em kg.
  - [x] Altura em cm.
- [x] Na sexta etapa, perguntar "Qual a frequência de treino?".
- [x] Exibir opções:
  - [x] 1-2x por semana.
  - [x] 3x por semana.
  - [x] 4x por semana.
  - [x] 5x por semana.
  - [x] Mais de 5x por semana.
- [x] Após a última etapa, exibir tela/estado de conclusão dentro da própria página `/signup`.
- [x] Exibir título "Conta configurada".
- [x] Exibir resumo personalizado do perfil.
- [x] Exemplo: usuário pronto para treino focado em força.
- [x] Incluir botão "Continuar".
- [x] Ao continuar, redirecionar para `/inicio`.
- [x] Salvar o perfil final em estado local/mock para uso nas próximas páginas.

### 4. Home/Dashboard - `/inicio`

- [x] Criar tela principal com título "Home".
- [x] Incluir navegação inferior fixa com:
  - [x] Home.
  - [x] Progresso.
  - [x] Nutrição.
  - [x] Perfil.
- [x] Exibir seção "Detalhes do dia":
  - [x] Exibir nível de atividade física com status textual e cor avaliadora.
  - [x] Exibir botão principal "Iniciar treino" em `#514166`.
  - [x] Exibir nível de recuperação em porcentagem, exemplo: `78%`.
  - [x] Exibir passos do dia, exemplo: `7.312`. Na mesma seção de passos, exibir um gráfico com histórico dessa semana.
  - [x] Exibir "Treino do dia", exemplo: treino leve de membros superiores.
  - [x] Exibir resumo nutricional diário. Cada dado é construído com um gráfico circular. O gráfico é preenchido com um tamanho qualquer.
    - [x] Calorias.
    - [x] Carboidratos.
    - [x] Gorduras.
    - [x] Proteínas.
- [x] Exibir seção "Histórico":
  - [x] Exibir qualidade do sono, exemplo: "Ótima". Na mesma seção de sono, exibir um gráfico com histórico de qualidade dessa semana.
- [x] Ao clicar em "Iniciar treino", abrir `/training`.

### 5. Treino ao Vivo - `/training`

- [x] Criar tela "Treino".
- [x] Exibir exercício atual, exemplo: "Supino com halteres".
- [x] Exibir detalhes do exercício:
  - [x] Peso ou carga, exemplo: halter de 20 kg.
  - [x] Repetições, exemplo: 8 repetições.
  - [x] Séries restantes.
- [x] Incluir botão "Iniciar Série".
- [x] Incluir botão "Finalizar Treino".
- [x] Exibir tempo de descanso restante em formato `00:00`.
- [x] Simular conexão com dispositivo, exemplo: "Conectado em: SmartWatch Exemplo".
- [x] Criar seção "Sinais vitais":
  - [x] Exibir frequência cardíaca em bpm.
  - [x] Exibir gasto calórico acumulado.
  - [x] Exibir pressão sanguínea, exemplo: `13 / 8`.
  - [x] Exibir oxigenação do sangue, exemplo: `99%`.
  - [x] Atualizar sinais vitais em intervalos simulados.
- [x] Criar recomendações ao vivo baseadas nos sinais:
  - [x] Reduzir intensidade se frequência cardíaca estiver alta.
  - [x] Aumentar descanso se recuperação estiver baixa.
  - [x] Sugerir hidratação em treino longo ou calorias altas.
  - [x] Sugerir manter ritmo quando sinais estiverem bons.
  - [x] Alertar se oxigenação ou pressão estiver fora do esperado.
- [x] Usar cores vermelho/amarelo/verde para classificar risco dos sinais.
- [x] Exibir próximo exercício planejado.
- [x] Exibir progresso do treino atual.
- [x] Ao finalizar, redirecionar para `/pos-training`.

### 6. Pós-Treino - `/pos-training`

- [x] Exibir estado "Treino finalizado".
- [x] Exibir rendimento geral em porcentagem, exemplo: `108%`.
- [x] Explicar o rendimento com mensagem curta, exemplo: treino com mais intensidade que o recomendado.
- [x] Exibir recomendação pós-treino, exemplo: descansar bem antes do próximo treino.
- [x] Criar seção "Sinais vitais".
- [x] Exibir resumo de:
  - [x] Frequência cardíaca.
  - [x] Gasto de calorias.
  - [x] Pressão sanguínea.
  - [x] Oxigenação do sangue.
- [x] Classificar cada indicador com cor de status.
- [x] Exibir botão para voltar para Home.
- [x] Exibir opção para ver progresso.
- [x] Salvar o treino no histórico mockado.

### 7. Progresso - `/progress`

- [x] Criar tela "Progresso".
- [x] Incluir seção "Metas pessoais".
- [x] Exibir meta de peso, exemplo: meta 75 kg, atual 72 kg.
- [x] Exibir barra ou gráfico simples de evolução.
- [x] Exibir histórico de treinos recentes.
- [x] Exibir indicadores de progresso:
  - [x] Peso.
  - [x] Frequência semanal.
  - [x] Calorias gastas.
  - [x] Carga total levantada.
  - [x] Tempo médio de treino.
  - [x] Recuperação média.
- [x] Exibir conquistas ou marcos recentes.
- [x] Permitir editar metas pessoais de forma simulada.

### 8. Nutrição - `/nutrition`

- [ ] Criar tela "Nutrição", já prevista na navegação inferior.
- [ ] Exibir consumo calórico do dia.
- [ ] Exibir macros do dia:
  - [ ] Carboidratos.
  - [ ] Gorduras.
  - [ ] Proteínas.
- [ ] Exibir meta diária baseada no objetivo do usuário.
- [ ] Exibir status de aderência nutricional com cores.
- [ ] Exibir sugestão de refeição pré-treino.
- [ ] Exibir sugestão de refeição pós-treino.
- [ ] Exibir hidratação estimada.
- [ ] Conectar recomendações nutricionais ao treino do dia.

### 9. Conta/Perfil - `/account`

- [ ] Criar tela "Conta".
- [ ] Exibir nome do usuário.
- [ ] Exibir objetivo atual.
- [ ] Exibir nível de treino.
- [ ] Exibir dados físicos cadastrados.
- [ ] Exibir frequência de treino.
- [ ] Permitir editar perfil de forma simulada.
- [ ] Criar seção de dispositivos conectados.
- [ ] Permitir simular conectar/desconectar smartwatch.
- [ ] Criar seção de permissões:
  - [ ] Saúde.
  - [ ] Notificações.
  - [ ] Atividade física.
- [ ] Incluir aviso de protótipo: dados e recomendações são simulados.
- [ ] Incluir opção de sair da conta.

## Componentes Reutilizáveis

- [ ] Botão primário.
- [ ] Botão secundário.
- [ ] Link textual.
- [ ] Campo de texto.
- [ ] Campo de senha com mostrar/ocultar.
- [ ] Card de seleção.
- [ ] Card de métrica.
- [ ] Card de sinal vital.
- [ ] Badge de status.
- [ ] Barra de progresso.
- [ ] Timer de descanso.
- [x] Navegação inferior.
- [ ] Header mobile.
- [ ] Tela de aviso para desktop.
- [ ] Modal ou toast de recomendação ao vivo.
- [ ] Lista de histórico.

## Dados Mockados

- [ ] Criar perfil mock inicial:
  - [ ] Nome: Paulo.
  - [ ] Objetivo: ganhar força.
  - [ ] Nível: intermediário.
  - [ ] Massa: valor editável.
  - [ ] Altura: valor editável.
  - [ ] Frequência: 3x por semana.
- [ ] Criar treino do dia mockado.
- [ ] Criar lista de exercícios mockados.
- [ ] Criar sinais vitais mockados.
- [ ] Criar histórico de treinos mockado.
- [ ] Criar metas pessoais mockadas.
- [ ] Criar dados nutricionais mockados.
- [ ] Persistir estado em memória ou `localStorage` para o protótipo parecer contínuo.

## Lógica Simulada

- [ ] Calcular nível de recuperação com base em sono, treino anterior e frequência.
- [ ] Calcular nível de atividade física com base em passos e treino do dia.
- [ ] Calcular rendimento pós-treino comparando intensidade realizada com intensidade recomendada.
- [ ] Criar faixas simuladas de frequência cardíaca:
  - [ ] Verde: intensidade segura.
  - [ ] Amarelo: atenção.
  - [ ] Vermelho: reduzir intensidade.
- [ ] Criar faixas simuladas de oxigenação.
- [ ] Criar faixas simuladas de pressão sanguínea.
- [ ] Gerar recomendações de descanso entre séries.
- [ ] Gerar recomendações de hidratação.
- [ ] Gerar recomendação pós-treino de descanso ou recuperação.

## Fluxos Principais

- [ ] Fluxo de novo usuário: inicial -> signup em etapas na mesma página -> conta configurada -> home.
- [ ] Fluxo de usuário existente: inicial -> login -> home.
- [ ] Fluxo de treino: home -> iniciar treino -> treino ao vivo -> pós-treino -> home/progresso.
- [ ] Fluxo de progresso: home -> progresso -> detalhes de metas.
- [ ] Fluxo de nutrição: home -> nutrição -> recomendações do dia.
- [ ] Fluxo de perfil: home -> conta -> editar dados/dispositivos.

## Critérios de Aceite do Protótipo

- [ ] O protótipo deve funcionar bem em largura mobile, especialmente entre 360 px e 430 px.
- [ ] Todas as páginas principais devem ser navegáveis.
- [ ] O visual deve permanecer consistente com a referência Framer.
- [ ] O botão "Iniciar treino" deve se destacar claramente.
- [ ] A navegação inferior deve estar presente nas telas autenticadas.
- [ ] O treino ao vivo deve parecer dinâmico, mesmo com dados simulados.
- [ ] As recomendações devem mudar conforme os sinais vitais simulados.
- [ ] Os status vermelho/amarelo/verde devem ser fáceis de entender.
- [ ] O protótipo deve deixar claro o diferencial: acompanhamento ao vivo durante o treino.
- [ ] O site deve estar pronto para ser apresentado como app hipotético em celular.

## Prioridade de Implementação

### MVP para Apresentação

- [ ] Criar design system básico.
- [ ] Implementar tela inicial.
- [ ] Implementar login simples.
- [x] Implementar cadastro/onboarding em uma única página `/signup` com etapas controladas por estado.
- [x] Implementar home.
- [x] Implementar treino ao vivo com sinais vitais simulados.
- [x] Implementar pós-treino.
- [x] Implementar progresso básico.
- [x] Implementar navegação inferior.

### Versão Mais Completa

- [ ] Implementar nutrição.
- [ ] Implementar conta/perfil.
- [ ] Implementar histórico de treinos.
- [ ] Implementar edição simulada de metas.
- [ ] Implementar persistência com `localStorage`.
- [ ] Implementar recomendações mais variadas durante o treino.
- [ ] Implementar microinterações e transições entre telas.

### Extras para Valor de Apresentação

- [ ] Criar modo de demonstração com dados mudando automaticamente.
- [ ] Criar roteiro visual de apresentação dentro do protótipo ou em documentação separada.
- [ ] Criar estados de alerta durante treino para demonstrar o diferencial.
- [ ] Criar comparação entre treino recomendado e treino realizado.
- [ ] Criar mini gráfico de batimentos durante o treino.
- [ ] Criar mini gráfico de evolução no progresso.
- [ ] Criar tela de permissão de smartwatch ou saúde do celular.

## Observações de Segurança e Ética

- [ ] Informar que o protótipo não substitui avaliação médica.
- [ ] Informar que os dados exibidos são simulados.
- [ ] Evitar recomendações médicas definitivas.
- [ ] Tratar alertas como sugestões de segurança, não diagnósticos.
- [ ] Deixar claro que integrações com smartwatch e sensores são hipotéticas no protótipo.
