# 🛒 Product Manager – Sistema de Gestão de Produtos e Cupons – Desafio Técnico Fullstack

Este projeto fullstack foi desenvolvido como parte do desafio técnico para a vaga de **Desenvolvedor Fullstack Júnior** no Instituto Senai de Inovação.  
A aplicação simula um ambiente corporativo de **vendas e gestão de produtos**, com funcionalidades inspiradas em **sistemas de e-commerce e ERPs modernos**.

---

## 🚀 Visão Geral da Aplicação

A solução desenvolvida permite:

- Cadastro, edição, remoção e listagem de **produtos**
- Aplicação e remoção de **descontos percentuais** e **cupons promocionais**
- Listagem com **filtros avançados**, **paginação** e **indicadores visuais**
- **Dashboard analítico** com métricas e gráficos sobre os produtos
- Tela de **Relatórios Inteligentes** com insights estratégicos baseados nas regras de negócio
- Interface intuitiva, responsiva e com **feedback visual claro**

---

## 🧱 Estrutura do Projeto

```bash
📦 projeto/
├── 📁 backend/           # API RESTful em Node.js
│   └── README.md         # Instruções específicas do backend
├── 📁 frontend/          # Aplicação React
│   └── README.md         # Instruções específicas do frontend
└── 📄 README.md          # Este README global
```

---

## 📦 Tecnologias Utilizadas

### 🔙 Backend

- [Node.js (Express)](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Zod](https://zod.dev/) - validações
- [Swagger](https://swagger.io/docs/open-source-tools/swagger-ui/development/setting-up/) - doumentação da API
- [Jest](https://jestjs.io/) – testes unitários e de integração

### 🔜 Frontend

- [React (TypeScript)](https://react.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) – controle de estado
- [React Router DOM](https://reactrouter.com/) - roteamento de páginas
- [React Bootstrap](https://react-bootstrap.netlify.app/) – ui responsiva e acessível
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) - Feedback para ações do usuário
- [Recharts](https://recharts.org/) – gráficos do dashboard
- [Axios](https://axios-http.com/) - requisições http

---

## 🧭 Como Executar o Projeto

### 🔁 Pré-requisitos

- Git
- Node.js e npm (ou yarn)
- PostgreSQL

### 🧪 Rodar manualmente (modo desenvolvimento)

#### 1. Clonar o repositório

```bash
git clone git@github.com:Neto-Pereira25/product_manager.git
cd product_manager
```

#### 2. Configurar variáveis de ambiente

Copie o `.env.example` para `.env` no frontend e backend.

#### 3. Backend

1. Rode os comandos

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

2. Em outro terminal rode o comando

```bash
npm run test
```

#### 4. Frontend

1. Rode os comandos

```bash
cd frontend
npm install
```

2. Configure as variáveis de ambiente no arquivo **.env**
   2.1. Mude a porta para ser a mesma que você configurou no backend

```bash
VITE_API_BASE_URL=http://localhost:3333/api/v1
```

3. Rode o comando

```bash
npm run dev
```

---

## 🧠 Decisões Técnicas

### Backend

- Escolhi o **Node.js** por ser leve, rápido e já ter experiência com ele.
- Escolhi o **TypeScript** por ter tipagem estática, ajudando com auto-complete, refatoração e a escrever o código.
- Escolhi o **PostgreSQL** por ser um banco relacional poderoso e confiável.
- Escolhi o **Prisma ORM** por possuir migrações versionadas simples de aplicar;
- Escolhi o **Zod** por usar os próprios tipos do TypeScript, garantindo uma validação de dados fortemente tipada.
- Escolhi o **Swagger** por apresentar uma documentação interativa da API.
- Escolhi o **Jest** por ser simples de utilizar e por dar suporte a testes unitários e de integração.

### Frontend

- Escolhi **React** por ser uma biblioteca moderna com componentização eficiente.
- Escolhi o **TypeScript** por ter tipagem estática, ajudando com auto-complete, refatoração e a escrever o código, ajudando a evitar erros.
- Escolhi o **Zustand** por seu gerenciamento de estado simples e minimalista.
- Escolhi o **React Router Dom** por ter uma navegação declarativa e flexível.
- Escolhi o **React Bootstrap** por ser fornecer uma UI responsiva com base em componentes prontos.
- Escolhi o **React Toastify** por ser fácil de configurar e por apresentar um feedback visual simples e eficaz.
- Escolhi o **Recharts** por ser uma biblioteca de gráficos baseada no próprio **React**.
- Escolhi o **Axios** por ser leve, popular e já ter usado antes.

---

## 📚 Documentação Complementar

- 📄 [README do Backend](./backend/README.md)
- 📄 [README do Frontend](./frontend/README.md)

---

## 👨‍💻 Sobre o Desenvolvedor

Essa aplicação foi desenvolvida com atenção aos detalhes, foco em boas práticas, e buscando refletir um ambiente de desenvolvimento realista.  
Veja outros projetos em [José Neto](https://github.com/Neto-Pereira25).

---

## 📬 Contato

Se tiver qualquer dúvida ou feedback sobre o projeto:

- 📧 Email: devneto203@gmail.com
- [💼 LinkedIn](https://www.linkedin.com/in/jose-neto-programador/)

---

## ✅ Critérios do Desafio Atendidos

- ✔️ Organização e estrutura clara
- ✔️ Código limpo e boas práticas (Clean Code)
- ✔️ Separação de responsabilidades (MVC)
- ✔️ Validações completas e consistentes
- ✔️ Documentação técnica clara
- ✔️ Controle de versão organizado (Git)
- ✔️ Experiência de usuário fluida
- ✔️ Funcionalidades extra: dashboard, relatórios, páginas institucionais

---

Feito com 💙 para o Desafio Técnico do Instituto Senai de Inovação.
