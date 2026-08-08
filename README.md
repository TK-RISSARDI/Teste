# Pousada Constelação — Site

Site institucional e de reservas da Pousada Constelação, com formulário de reserva integrado ao Supabase e painel administrativo para o dono acompanhar as reservas recebidas.

## Estrutura

- index.html — site principal (página que os visitantes veem)
- admin-reservas.html — painel de administração das reservas (login necessário)
- configuracao-banco-reservas.sql — script para configurar o banco de dados no Supabase

## Publicar no GitHub Pages

1. Suba estes arquivos para um repositório no GitHub.
2. Nas configurações do repositório, vá em Settings > Pages.
3. Em "Source", selecione a branch principal (main) e a pasta raiz (/).
4. Salve. Em alguns minutos o site estará disponível em um endereço no formato seu-usuario.github.io/nome-do-repositorio.

## Importante sobre segurança

A chave pública do Supabase (publishable key) usada nos arquivos é segura para ficar visível publicamente.
A chave secreta do Supabase NUNCA deve ser adicionada a nenhum arquivo deste repositório.

## Configuração do banco de dados

Antes de usar o site em produção, execute o script configuracao-banco-reservas.sql no Editor SQL do Supabase, e crie o usuário administrador em Authentication > Users > Add user (marcando "Auto Confirm User").
