# PaginaPronta-Demo – Studio Aurora

Landing page de demonstração para um salão **fictício** (Studio Aurora), em HTML, CSS e JavaScript puros. Sem dependências, build, servidor ou banco de dados.

## Como abrir

Dê dois cliques em `index.html`. Funciona direto no navegador, sem internet e sem instalar nada.

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura da página e metadados de SEO |
| `styles.css` | Visual e responsividade |
| `script.js` | **Configuração no topo (`CONFIG`)** e comportamento da página |
| `LICENSES.md` | Origem e licença dos recursos (não há terceiros) |

## Como personalizar para um cliente

Edite apenas o bloco `CONFIG` no início de `script.js`:

- `modoDemonstracao`: `true` mostra os avisos de demonstração; `false` é a versão final.
- `nome`, `slogan`, `titulo`, `descricao`.
- `whatsapp.numero`: o valor padrão é um número de teste e o botão **não abre nenhuma conversa**. Informe o número real (ex.: `"11999999999"`) para ele virar um link `wa.me`. Nenhuma mensagem é enviada automaticamente: o visitante só abre a conversa.
- `instagram`: só o usuário, sem `@`. Vazio = oculto.
- `endereco.linhas` e `endereco.mapaUrl`, `horarios`, `servicos` (nome, descrição, duração, preço) e `sobre`.

Qualquer informação vazia faz o bloco correspondente desaparecer (inclusive o link no menu).

Ao trocar `modoDemonstracao` para `false`, o endereço de exemplo é ocultado automaticamente e o console do navegador (F12) avisa quais textos ainda parecem de demonstração. Revise o título, a descrição e o texto "sobre" antes de publicar.

Depois de personalizar, atualize também `<title>` e `<meta name="description">` em `index.html`. O JavaScript os atualiza no navegador, mas buscadores simples só leem o HTML.

## Limitações conhecidas

- O conteúdo é montado por JavaScript. Sem JavaScript aparece apenas um aviso.
- Não há formulário, coleta de dados, cookies ou analytics.
- Não há fotos: a identidade visual usa só CSS e SVG próprios. Se o cliente fornecer fotos, use `alt` descritivo.

## Publicar uma demonstração (gratuito)

Opções que aceitam site estático, sem servidor próprio:

1. **GitHub Pages**: crie um repositório, envie os 4 arquivos e ative *Settings → Pages → Deploy from a branch*.
2. **Netlify Drop** (`app.netlify.com/drop`): arraste a pasta e receba um link.
3. **Cloudflare Pages**: envie a pasta como projeto estático, sem comando de build.

Antes de enviar um link ao cliente, abra-o no celular e confirme os textos.

## Testes

Veja a lista de testes executados e pendentes no relatório final da entrega.
