# Pousada Constelação — Site

Site institucional e de reservas da Pousada Constelação, com formulário de reserva gravando direto numa planilha do Google Sheets, e um painel administrativo para o dono acompanhar as reservas recebidas.

## Estrutura

- `index.html` — site principal (página que os visitantes veem)
- `admin-reservas.html` — painel de administração das reservas (protegido por chave de acesso)
- `apps-script-reservas.gs` — código que roda dentro do Google Sheets e faz a ponte com o site

## Passo a passo: configurar a planilha

1. Crie uma planilha nova no Google Sheets (sheets.google.com), pode chamar de "Reservas — Pousada Constelação".
2. Renomeie a primeira aba (embaixo) para exatamente: `Reservas`.
3. Na linha 1, crie estas colunas, uma por célula, nesta ordem:
   `created_at | guest_name | guest_contact | check_in | check_out | guests`
4. No menu, vá em **Extensões > Apps Script**.
5. Apague o código de exemplo que aparece e cole todo o conteúdo do arquivo `apps-script-reservas.gs`.
6. Troque o valor de `ADMIN_KEY` no início do código por uma senha/chave secreta sua (é ela que vai proteger o painel de admin).
7. Clique em **Implantar > Nova implantação**. Escolha o tipo **App da Web**.
8. Em "Executar como", deixe **Eu (seu e-mail)**. Em "Quem pode acessar", escolha **Qualquer pessoa**.
9. Clique em **Implantar**, autorize as permissões pedidas pelo Google (é o script pedindo acesso à sua própria planilha) e copie a **URL do app da Web** gerada.

## Passo a passo: ligar o site à planilha

1. Abra `index.html` e `admin-reservas.html` num editor de texto.
2. Em cada um, procure a linha `const SHEETS_WEBAPP_URL = 'COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT';` e cole a URL copiada no passo anterior, no lugar do texto `COLE_AQUI_A_URL_DO_SEU_APPS_SCRIPT` (mantendo as aspas).
3. Salve os dois arquivos e suba novamente para o GitHub.

## Acessando o painel de reservas

Abra `admin-reservas.html` pelo navegador e digite a mesma chave (`ADMIN_KEY`) que você definiu no Apps Script. Essa chave fica salva no navegador para os próximos acessos, até você clicar em "Sair".

**Importante sobre segurança:** essa chave é uma proteção simples, não um login de verdade — qualquer pessoa que descobrir a chave (por exemplo, olhando o código-fonte da página) consegue ver as reservas. Não compartilhe a chave nem o link do painel publicamente.

## Publicar no GitHub Pages

1. Suba estes arquivos para um repositório no GitHub.
2. Nas configurações do repositório, vá em **Settings > Pages**.
3. Em "Source", selecione a branch principal (main) e a pasta raiz (/).
4. Salve. Em alguns minutos o site estará disponível em um endereço no formato `seu-usuario.github.io/nome-do-repositorio`.
