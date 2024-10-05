# CarClean - Painel de Controle Interno

## Sobre o projeto

O **Painel de Controle Interno** é a interface frontend do CarClean, uma plataforma completa de gestão para lava-rápidos. Desenvolvido com **Angular**, este painel oferece ferramentas essenciais para a administração eficiente do sistema, permitindo o controle dos usuários ativos, gerenciamento dos pagamentos de planos, e oferecendo uma visão geral do desempenho do sistema. O objetivo principal é fornecer uma solução simples e eficaz para otimizar a operação e o gerenciamento do CarClean.

## Funcionalidades

- **Gestão de Usuários**:
  - Visualização de usuários ativos no sistema.
  - Gerenciamento de permissões e acessos.
  - Ativação e desativação de contas de usuários.
- **Gestão de Pagamentos**:

  - Controle e monitoramento dos pagamentos dos planos do sistema.
  - Atualizações de status de pagamento (ativos, vencidos, pendentes).
  - Histórico de transações realizadas pelos clientes.

- **Visão Geral do Sistema**:
  - Dashboard com uma visão completa do sistema.
  - Resumo financeiro, incluindo informações de planos assinados.
  - Indicadores de desempenho dos usuários e dos serviços prestados pelo CarClean.

## Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Angular](https://angular.dev/) - Framework para desenvolvimento de aplicações web modernas e escaláveis.
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação com tipagem estática.
- [RxJS](https://rxjs.dev/) - Biblioteca para programação reativa.
- [Angular Material](https://material.angular.io/) - Biblioteca de componentes UI para Angular, seguindo as diretrizes do Material Design.
- [SCSS](https://sass-lang.com/) - Linguagem de estilos utilizada para customização do layout.

## Pré-requisitos

Para executar este projeto localmente, é necessário ter as seguintes ferramentas instaladas:

- **Node.js**: Versão 18 ou superior.
- **Angular CLI**: Versão 18 ou superior.
- **Git**: Para controle de versão e clonagem do repositório.

## Instalação

Siga as etapas abaixo para configurar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/voleep/carclean-web.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd carclean-web
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

5. Abra o navegador e acesse:

   ```
   http://localhost:4200
   ```

## Estrutura do Projeto

A estrutura de pastas segue as melhores práticas recomendadas pelo Angular, organizada da seguinte forma:

```bash
src/
 ├── app/                        # Módulos principais da aplicação
 │   ├── dashboard/              # Módulo do dashboard com visão geral do sistema
 │   ├── users/                  # Módulo de gerenciamento de usuários
 │   ├── payments/               # Módulo de gestão de pagamentos
 │   └── shared/                 # Componentes e serviços compartilhados
 ├── assets/                     # Arquivos estáticos (imagens, ícones, etc.)
 ├── environments/               # Arquivos de configuração de ambiente (produção, desenvolvimento)
 ├── styles.scss                 # Arquivo de estilos globais
 └── index.html                  # Arquivo HTML principal
```

## Testes

Este projeto utiliza o **Jest** e **Web Test Runner** para testes unitários.

- Para executar os testes, utilize o comando:

  ```bash
  npm test
  ```

- Para gerar um relatório de cobertura de testes:

  ```bash
  npm test --code-coverage
  ```

  O relatório será gerado na pasta `coverage/` e pode ser visualizado abrindo o arquivo `index.html` dentro dessa pasta.

## Deploy

Para realizar o deploy em produção:

1. Gere o build de produção com o comando:

   ```bash
   npm build --prod
   ```

2. Os arquivos otimizados para produção estarão disponíveis na pasta `dist/browser`.

3. Realize o upload da pasta `dist/browser` para o servidor de hospedagem ou ambiente de produção.

## Contribuindo

Se você deseja contribuir para o desenvolvimento deste projeto, siga os seguintes passos:

1. Faça um fork do repositório.
2. Crie uma nova branch com suas alterações:

   ```bash
   git checkout -b minha-feature
   ```

3. Commit suas alterações:

   ```bash
   git commit -m 'Adicionando nova feature'
   ```

4. Envie para sua branch no GitHub:

   ```bash
   git push origin minha-feature
   ```

5. Abra um Pull Request descrevendo suas alterações.

## Roadmap

As próximas implementações e melhorias planejadas incluem:

- Integração com APIs para controle avançado de serviços e agendamentos.
- Melhorias na interface de visualização do histórico financeiro.
- Notificações de pagamento e alertas via email e SMS.

## Contato

Se tiver alguma dúvida ou sugestão, entre em contato:

- **Nome**: Noah Correa
- **Projeto**: CarClean Web
- **E-mail**: contato@voleep.com
