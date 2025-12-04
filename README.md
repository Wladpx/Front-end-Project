# Projeto Clínica - Front-end

Aplicação React criada com Vite que simula o fluxo inicial de uma clínica: tela de login (apenas administrador), dashboard com atalhos e formulário de cadastro de pacientes. Tudo funciona somente em memória com `useState`, sem backend ou banco real.

## Stack

- React + Vite
- Componentes, estados e props para navegação e CRUD em memória
- Dados mockados diretamente no código
- Estilização com CSS puro

## Executando localmente

```bash
npm install
npm run dev
```

O servidor roda em `http://localhost:5173`.

## Telas implementadas

- **Login** com credenciais fixas (`admin@clinica.com / 123456`)
- **Dashboard** com navegação controlada por estado
- **Cadastrar paciente** com criação e listagem armazenada apenas em memória
- **Lista de paciente** com listagem e filtragem rápida armazenada apenas em memória
- **Editar paciente** com edição armazenada apenas em memória
- **Cadastrar consulta** com criação e listagem armazenada apenas em memória
- **Lista de consultas** com listagem armazenada apenas em memória
- **Editar Consultas** com edição armazenada apenas em memória

## Deploy

Como o projeto é estático, basta gerar o build:

```bash
npm run build
```

O conteúdo em `dist/` pode ser publicado em serviços como Netlify, GitHub Pages, Vercel ou Azure Static Apps. Para validar o build localmente:

```bash
npm run preview
```
## Autores

Wlademir Pontes Xavier - 01700113 /
Celso Vinicius Souza Silva - 01704603 /
João Gabriel da Silva Nemezio - 01705453
