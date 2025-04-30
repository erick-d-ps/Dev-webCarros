# 🚗 webCarros


![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=white)

O **webCarros** é uma aplicação web desenvolvida com **React + TypeScript** como parte dos meus estudos em desenvolvimento web. A plataforma simula um sistema de compra e venda de veículos, com funcionalidades completas de autenticação, gerenciamento e visualização de carros cadastrados.  
Totalmente responsiva.  
👉 Visite: [https://dev-web-carros.vercel.app/](https://dev-web-carros.vercel.app/)

---

## ✨ Funcionalidades

- 🏠 Página Home com apresentação da plataforma
- 🔐 Autenticação de usuários com Firebase (login e cadastro)
- 🧑‍💼 Dashboard com listagem de veículos cadastrados 
- ➕ Cadastro de novos veículos (com envio de imagem para o Firebase Storage)
- ❌ Remoção de veículos
- 📄 Página de detalhes dos veículos (com carrossel de imagens)
- 🔐 Rotas protegidas (Dashboard e cadastro de novo carro acessíveis apenas para usuários autenticados)

---

## 🛠️ Tecnologias Utilizadas

- [ReactJS](https://reactjs.org/) com [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) para build e desenvolvimento
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [SwiperJS](https://swiperjs.com/) para carrossel de imagens responsivo na página de detalhes do veículo
- [React Router DOM](https://reactrouter.com/) para navegação entre páginas
- [React Hook Form](https://react-hook-form.com) para controle de formulários performático
- [Zod](https://zod.dev) para validação de dados com tipagem TypeScript e mensagens de erro personalizadas, integrado ao React Hook Form via `zodResolver`
- [React Icons](https://react-icons.github.io/react-icons/) para ícones
- [Context API](https://reactjs.org/docs/context.html) para gerenciamento de estado global
- [Firebase](https://firebase.google.com/):
  - Autenticação
  - Firestore (banco de dados)
  - Storage (upload de imagens)

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# Clone o repositório
git clone https://github.com/erick-d-ps/webCarros.git

# Entre no diretório do projeto
cd webCarros

# Instale as dependências
npm install

# Execute o projeto
npm run dev
