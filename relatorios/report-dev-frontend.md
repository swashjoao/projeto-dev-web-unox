# Resumo do Desenvolvimento Frontend

## Estrutura e Autenticação

O projeto foi desenvolvido em **React**, usando a **Context API** para gerenciar o estado global da aplicação.  
Isso facilita o compartilhamento de dados entre os componentes sem precisar ficar passando props para todo lado.

A autenticação utiliza **JWT (JSON Web Token)**, com o token salvo no **localStorage**, garantindo que o usuário continue logado mesmo após atualizar a página.  
Também foram implementadas **rotas protegidas**, que exigem login para acesso, e há tratamento básico de erros de autenticação e login.

## Possíveis Problemas com Categorias

### 1. Erros na Criação de Categorias

O problema provavelmente está na configuração dos endpoints da API.  
O arquivo `api.js` não possui as rotas para criar, editar ou listar categorias, o que acaba gerando erros **404** quando o frontend tenta acessar essas rotas.

**Problemas identificados:**
- Erros 404 ao tentar acessar rotas de categoria
- Falha na exibição de categorias cadastradas

## Problemas de Integração

### a) Configuração da API

A **URL base** está configurada como `http://localhost:3000/api`.  
Isso pode causar erros caso o backend esteja rodando em outra porta.  
Além disso, não há diferenciação entre ambiente de desenvolvimento e produção, o que pode gerar confusão quando o sistema for publicado.

### b) Tratamento de Erros

O interceptor redireciona o usuário para a tela de login em caso de erro **401**, mas não limpa completamente o estado da aplicação.  
As mensagens de erro são muito genéricas, o que dificulta entender a causa do problema.

### c) Gerenciamento de Estado

Se o token **JWT** expira, o sistema não o renova automaticamente.  
Isso pode deixar o usuário com um token inválido, mesmo parecendo estar logado na interface.
