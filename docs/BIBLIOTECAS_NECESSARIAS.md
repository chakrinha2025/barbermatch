# Bibliotecas Necessárias para o Backend do BarberMatch

## Core e Infraestrutura
- **@nestjs/common**: Módulo core do NestJS
- **@nestjs/core**: Funcionalidades essenciais do NestJS
- **@nestjs/config**: Gerenciamento de configurações e variáveis de ambiente
- **@nestjs/platform-express**: Integração com Express.js

## Autenticação e Segurança
- **@nestjs/jwt**: Implementação de JSON Web Tokens
- **@nestjs/passport**: Integração com estratégias de autenticação
- **passport**: Framework de autenticação para Node.js
- **passport-jwt**: Estratégia JWT para Passport
- **bcrypt**: Hash de senhas

## Validação e Serialização
- **class-validator**: Validação de DTOs
- **class-transformer**: Transformação de objetos

## Documentação API
- **@nestjs/swagger**: Geração de documentação Swagger/OpenAPI

## Banco de Dados
- **@supabase/supabase-js**: Cliente para interação com Supabase

## Utilitários
- **rxjs**: Programação reativa
- **reflect-metadata**: Suporte a decorators e metadata
- **rimraf**: Remoção de arquivos (usado em scripts)

## DevDependencies (Desenvolvimento)
- **@nestjs/cli**: CLI do NestJS
- **@nestjs/schematics**: Geração de código
- **@nestjs/testing**: Ferramentas de teste
- **typescript**: Compilador TypeScript
- **eslint**: Linting
- **prettier**: Formatação de código
- **jest**: Framework de testes

## Types (Definições de tipos)
- **@types/bcrypt**
- **@types/express**
- **@types/passport-jwt**
- **@types/node**

## Observações importantes:
1. Todas as dependências já estão configuradas no package.json
2. O tsconfig.json foi ajustado para corrigir erros de tipagem
3. O arquivo .eslintrc.js foi configurado para ignorar a regra no-explicit-any 