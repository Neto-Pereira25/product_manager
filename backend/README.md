# 🛒 Product Manager API

API RESTful desenvolvida em Node.js com TypeScript, focada no gerenciamento de produtos, aplicação de descontos e cupons promocionais, seguindo princípios SOLID, validações com Zod, documentação com Swagger e testes com Jest.

---

## 🚀 Tecnologias utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM** (com Postgres)
- **Zod** (validações)
- **Swagger** (documentação da API)
- **Jest + Supertest** (testes unitários e integração)
- **Docker** (em desenvolvimento futuro)

---

## 📁 Estrutura do Projeto

```bash
src/
├── config/ # Configuração do Prisma e Swagger
├── controllers/ # Controllers (lógica das rotas)
├── routes/ # Rotas da aplicação
├── services/ # Regras de negócio
├── repositories/ # Acesso ao banco de dados
├── models/ # Modelos e enums
├── schemas/ # Schemas Zod para validação
├── utils/ # Funções auxiliares (ex: normalizeString)
└── types/ # Tipagens personalizadas
tests
├── integration/ # Testes de integração
└── unit/ # Testes unitários
```

---

## 📦 Como rodar o projeto

### 🔧 Pré-requisitos

- Node.js LTS
- NPM ou Yarn
- Postgres
- Docker (opcional)

### ▶️ Passo a passo

```bash
# 1. Instale as dependências
npm install

# 2. Configure o ambiente
cp .env.example .env

# 3. Inicialize o Prisma
npx prisma migrate dev

# 4. Rode o projeto
npm run dev
```

### A API estará disponível em: http://localhost:3000

---

## 🧪 Rodando os testes

### ▶️ Passo a passo

#### Testes Unitários

```bash
# 1. Rode o comando
npm run test:unit
```

#### Testes de Integração

```bash
# 1. Rode o comando
npm run test:integration
```

---

## 📚 Documentação da API

- Acesse a interface Swagger em:

```bash
http://localhost:3000/api-docs
```

---

🎯 Funcionalidades

- ✅ CRUD de produtos

- ✅ Aplicação de desconto percentual direto

- ✅ Aplicação de cupom promocional

- ✅ Validação completa de cupons (oneShot, validade, tipo, valor mínimo)

- ✅ Remoção de desconto

- ✅ Restauração de produtos

- ✅ Listagem de produtos com desconto

- ✅ Validações com Zod

- ✅ Testes automatizados

- ✅ Documentação via Swagger

---

## 📌 Regras de negócio aplicadas

- Apenas um desconto ativo por produto

- Cupom deve ser válido, dentro da data e não expirado

- Cupom do tipo percent deve ter valor entre 1% e 80%

- Cupom do tipo fixed deve ser um valor monetário positivo

- Valor final nunca pode ser menor que R$ 0,01

- Código do cupom deve ser único e normalizado (sem acentos, espaços, maiúsculas)

- Aplicação de desconto ocorre de forma transacional

---

## 🛠 Melhorias futuras

- Docker com banco Postgres

- Versionamento de API (ex: /api/v2)

- Autenticação JWT (admin/cadastro de cupons)

- Paginação nos endpoints de listagem

- Dashboard com estatísticas de uso

---

## 👨‍💻 Autor

Desenvolvido por José Pereira da Silva Neto
- 📧 devneto203@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/jose-neto-programador/)
