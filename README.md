# Manual Template

Este é o projeto front-end de um template de um manual, desenvolvido utilizando **Next.js** (App Router) e **React**. O projeto renderiza o conteúdo do manual a partir de arquivos Markdown (MDX) com suporte a temas (claro/escuro) e internacionalização (Português/Inglês/Espanhol).

## 🛠 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)**: Framework React (App Router).
- **React Markdown / MDX**: Para renderização do conteúdo das páginas, enriquecido com **Remark/Rehype** (para syntax highlight e GitHub Flavored Markdown).
- **Bootstrap 5**: Estilização e layout responsivo.
- **Sass**: Processador CSS para estilização avançada e customização de variáveis.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Biblioteca utilizada para os ícones da interface (incluindo FontAwesome e Material Icons).
- **Mark.js**: Utilizado para o destaque (highlight) visual de termos pesquisados no texto.
- **Gray-Matter**: Para extração e leitura de metadados (frontmatter) contidos nos arquivos Markdown.
- **PostCSS & PurgeCSS**: Otimização da folha de estilos e remoção de CSS não utilizado (purificação) durante o build de produção.
- **ESLint**: Para padronização e linting de código.
- **[Nodemon](https://nodemon.io/)**: Para monitoramento e atualização automática do servidor em tempo de desenvolvimento ao alterar arquivos MDX.
- **[Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)**: Framework e utilitários para execução de testes automatizados unitários e de renderização da UI.

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas na sua máquina:
- [Node.js](https://nodejs.org/en/) (versão 18+ recomendada)
- [Git](https://git-scm.com/) (para clonar o repositório)

*(Opcional)* Caso queira rodar o projeto isolado em um contêiner, será necessário ter o **Docker** e o **Docker Compose**.

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/GabrielMartinsMeira/Manual_Template.git
```

2. Acesse a pasta do projeto:
```bash
cd Manual_Template
```

3. Instale as dependências executando o comando:
```bash
npm install
```

## 💻 Testando o Projeto (Modo de Desenvolvimento)

Para rodar o projeto localmente e testar alterações em tempo real (com hot-reload), utilize o modo de desenvolvimento:

```bash
npm run dev
```

Caso queira que o servidor reinicie automaticamente ao atualizar arquivos MDX (garantindo que as alterações no conteúdo do manual sejam carregadas imediatamente), utilize:

```bash
npm run dev:watch
```

Após rodar o comando, abra o seu navegador e acesse: [http://localhost:3000](http://localhost:3000)

## 📦 Gerando a Build (Modo de Produção)

Para preparar o projeto para publicação (produção), você precisa primeiro gerar a build otimizada e depois iniciar o servidor de produção:

1. **Gere a build otimizada:**
```bash
npm run build
```

2. **Inicie o servidor de produção:**
```bash
npm start
```
*O projeto estará disponível em `http://localhost:3000` rodando com as otimizações de performance aplicadas.*

## 🐳 Rodando com Docker

Você pode executar a aplicação em um ambiente isolado via Docker. A imagem será construída instalando as dependências e gerando a versão de produção (otimizada):

#### Construir e subir o container

```bash
docker-compose up --build
```

#### Subir em background

```bash
docker-compose up --build -d
```

#### Parar o container

```bash
docker-compose down
```

#### Parar e remover volumes (apaga dados do banco)

```bash
docker-compose down -v
```
*O projeto estará disponível em `http://localhost:3000` executando a build final de produção.*

## 🧹 Verificação de Código (Lint)

Para rodar a verificação de padronização de código do projeto:

```bash
npm run lint
```

## 🧪 Executando os Testes

Para executar a suíte de testes automatizados (unitários e de renderização) utilizando o [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/):

```bash
npm run test
```

### Rodando em modo de observação (Watch Mode)
Para rodar os testes continuamente enquanto desenvolve, re-executando-os a cada alteração salva:

```bash
npm run test -- --watch
```

### Relatório de Cobertura de Código (Coverage)
Para gerar um relatório detalhado indicando a porcentagem de código que está sendo testada:

```bash
npm run test -- --coverage
```