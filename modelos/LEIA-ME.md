# Modelos de página: barbearia e salão de beleza

Segunda demonstração comercial do PaginaPronta. É uma página única, em HTML, CSS e JavaScript puros, com um seletor para alternar entre dois modelos. Não depende da página principal (Studio Aurora) e não usa servidor, banco de dados, bibliotecas nem fontes externas.

**Todos os dados são fictícios**: nomes, endereços, horários, preços, telefones e redes sociais. Não há depoimentos, avaliações nem contatos reais.

## Como abrir

Dê dois cliques em `modelos/index.html`. Para abrir direto um modelo: `index.html?modelo=salao` ou `index.html?modelo=barbearia`.

## Arquivos

| Arquivo | Função |
|---|---|
| `config.js` | **Único arquivo de edição**: os dois modelos (segmento, nome, cores, serviços, preços, horários, endereço, WhatsApp, redes e galeria) |
| `index.html`, `styles.css`, `script.js` | Estrutura, visual e montagem da página a partir de `config.js` |
| `galeria/*.svg` | 12 ilustrações próprias (desenhos simples feitos para este projeto, 1 KB cada) |

## Como personalizar para um cliente

1. Em `config.js`, edite o modelo mais próximo (`barbearia` ou `salao`) ou copie um bloco para criar outro.
2. Troque `modoDemonstracao` para `false` (remove os avisos de dados fictícios) e `mostrarSeletor` para `false` (esconde a barra de escolha do modelo).
3. Cores: campo `tema` (valores hexadecimais, como `#c8843c`). O arquivo de configuração explica cada cor.
4. `whatsapp.numero`: o padrão é um número de teste (DDD 00). Enquanto não houver número válido, o botão só mostra um aviso e **não abre nenhuma conversa**. Com um número real (ex.: `"11999999999"`), vira um link para o WhatsApp; nenhuma mensagem é enviada automaticamente.
5. `redes`: informe só o usuário (sem `@`). Redes vazias aparecem como "exemplo" na demonstração e ficam ocultas na versão final. Remova a chave para não exibir a rede.
6. Qualquer campo vazio (`""` ou `[]`) oculta o bloco correspondente.
7. Atualize também `<title>` e `<meta name="description">` em `index.html`, que são o que buscadores simples leem.

Ao sair do modo demonstração, o endereço de exemplo é ocultado automaticamente e o console do navegador (F12) avisa quais textos ainda parecem de demonstração.

## Galeria e licenças

As imagens são ilustrações próprias em SVG, sem fotos nem arquivos de terceiros. Para usar fotos reais do cliente, coloque os arquivos em `galeria/` e ajuste `src` e `alt` (descrição obrigatória) em `config.js`. Registre a origem e a licença de qualquer imagem de terceiros.

## Publicação

A pasta `modelos/` é independente e usa só caminhos relativos. Se a hospedagem publica a raiz do repositório como arquivos estáticos, ela fica disponível em `/modelos/`. Confirme isso depois da publicação.
