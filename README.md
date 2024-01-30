# Servidor de Gerenciamento de Estoque

## Descrição

Este projeto é um servidor de gerenciamento de estoque construído com Javascript, Typescript, Fastify e PrismaIO.

## Funcionalidades

- Autenticação de usuários
- Operações CRUD para mercadorias
- Tabela de vendas para geração de relatórios futuros

## Tecnologias Principais

- Javascript + Typescript: Linguagem de programação principal usada para desenvolver o servidor.
- Fastify: Framework web usado para lidar com solicitações HTTP.
- PrismaIO: ORM usado para interagir com o banco de dados.

## Esquema do Banco de Dados

O esquema do banco de dados é gerenciado pelo Prisma. Aqui estão os principais modelos:

- `User`: Representa um usuário com campos para id, email, senha, nome, função e data de criação.
- `Product`: Representa um produto com campos para id, nome, descrição, quantidade, preço, vendas e fornecedores.
- `Supplier`: Representa um fornecedor com campos para id, nome, contato e produtos.
- `ProductSupplier`: Representa a relação entre produtos e fornecedores.
- `Sale`: Representa uma venda com campos para id, productId, quantidade, preço de venda e data de venda.

## Como Rodar o Projeto

// Instruções para instalação, configuração e execução do projeto.

## Contribuição

// Diretrizes para contribuição.

## Licença

// Informações de licença.
