# `apihello`

> Código fonte utilizado na Aula 16 da disciplina Programação Web 1

### Objetivo

- Utilizar o código fonte como exemplo de primeira implementação de API

### *End points*

| Método | Endpoint                          | Descrição                                                                  |
|--------|-----------------------------------|----------------------------------------------------------------------------|
| GET    | `/v1/hi`                          | Exibe saída JSON com `msg: "Hello, world!"`                                |
| GET    | `/v1/hi/user/{name}`              | Exibe saída JSON com uma saudação para o usuário                           |
| POST   | `/v1/hi`                          | Recebe `name` e exibe uma saudação personalizada                           |
| GET    | `/v2/hi?lang={idioma}`            | Exibe uma saudação no idioma selecionado (`pt-br`, `es` ou `en`)           |
| GET    | `/v2/hi/user/{name}?lang={idioma}` | Exibe uma saudação personalizada no idioma selecionado |
| POST   | `/v2/hi`                          | Recebe `name` e `lang` pelo formulário e retorna a saudação nesse idioma   |

Na v2, o idioma pode ser informado pela query string (`?lang=es`) ou, no POST, pelo campo `lang` do formulário. Se nenhum idioma for informado, será usado `pt-br`. Os códigos aceitos são `pt-br`, `es` e `en`.

### Instruções de uso

1. Clonar o projeto utilizando o comando `git clone https://github.com/pw1-repo/apihello.git`
2. Instalar as dependências com o comando `npm install`
3. Rodar a aplicação `node app`
4. Acessar cada *endpoint* e observar as respostas

As respostas da API também são registradas no terminal no formato `data/hora, endpoint, saída (JSON)`.