/* =====================================================================
   CONFIGURAÇÃO – é aqui que você personaliza a página para cada cliente.
   Informação vazia ("" ou []) = o bloco correspondente fica oculto.
   ===================================================================== */
const CONFIG = {
  // true  = mostra avisos "página de demonstração" em toda a página.
  // false = versão final do cliente (sem avisos).
  modoDemonstracao: true,

  nome: "Studio Aurora",
  slogan: "Salão de beleza",
  titulo: "Realce o seu brilho natural",
  // Use até ~155 caracteres: este texto também vai para a descrição do Google.
  descricao:
    "Corte, coloração, tratamentos e manicure em um ambiente acolhedor. Página de demonstração do Studio Aurora, um salão fictício.",

  whatsapp: {
    // Somente números, com DDD (ex.: "11999999999" ou "5511999999999").
    // O valor abaixo é um NÚMERO DE TESTE (DDD 00 não existe): o botão não abre nenhum chat.
    numero: "5500000000000",
    textoBotao: "Agendar pelo WhatsApp",
    // Mensagem que aparece já digitada no WhatsApp. Nada é enviado sozinho.
    mensagem: "Olá! Vi a página do Studio Aurora e gostaria de agendar um horário.",
  },

  // Somente o nome de usuário, sem @ e sem link (ex.: "meusalao"). Vazio = oculto.
  instagram: "",

  endereco: {
    linhas: ["Rua Exemplo, 000 – Centro", "Cidade Exemplo – UF, 00000-000"],
    // Link opcional do Google Maps (https://...). Vazio = oculto.
    mapaUrl: "",
  },

  horarios: [
    { dia: "Segunda a sexta", horas: "09h às 19h" },
    { dia: "Sábado", horas: "09h às 16h" },
    { dia: "Domingo e feriados", horas: "Fechado" },
  ],

  // Texto abaixo do título "Preços". Opcional.
  precosNota: "Valores sujeitos a alteração. Confirme no momento do agendamento.",

  // preco: número em reais (ou null para "Sob consulta"). duracao: minutos (ou texto).
  servicos: [
    { nome: "Corte e finalização", descricao: "Corte pensado para o seu estilo e para a sua rotina, com lavagem e finalização.", duracao: 60, preco: 90 },
    { nome: "Escova", descricao: "Lavagem e escova para o dia a dia ou para uma ocasião especial.", duracao: 45, preco: 60 },
    { nome: "Coloração", descricao: "Cor, retoque de raiz ou mudança de tom, definidos em conversa antes de começar.", duracao: 150, preco: 160, aPartirDe: true },
    { nome: "Tratamento capilar", descricao: "Hidratação e cuidados para cabelos ressecados ou sensibilizados.", duracao: 60, preco: 85 },
    { nome: "Manicure e pedicure", descricao: "Cuidado completo para mãos e pés, com esmaltação à sua escolha.", duracao: 90, preco: 70 },
    { nome: "Maquiagem para eventos", descricao: "Maquiagem planejada conforme o evento, o look e o seu estilo.", duracao: 75, preco: 130 },
  ],

  sobre: [
    "O Studio Aurora nasceu da ideia de oferecer um espaço tranquilo, onde cada atendimento é feito com calma e atenção aos detalhes.",
    "Antes de qualquer procedimento, conversamos para entender o que você procura. Assim, o resultado combina com o seu estilo e com a sua rotina.",
  ],

  destaques: [
    { titulo: "Atendimento com hora marcada", texto: "Menos espera e mais tempo dedicado a você." },
    { titulo: "Ambiente acolhedor", texto: "Um espaço calmo para você relaxar enquanto é atendida(o)." },
    { titulo: "Conversa antes de começar", texto: "Combinamos o que será feito antes de qualquer procedimento." },
  ],
};

/* =====================================================================
   CÓDIGO DA PÁGINA – normalmente não precisa ser alterado.
   ===================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.replace("no-js", "js");

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function texto(v) { return typeof v === "string" ? v.trim() : ""; }
  function lista(v) { return Array.isArray(v) ? v : []; }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  var demo = CONFIG.modoDemonstracao === true;
  var nome = texto(CONFIG.nome) || "Meu negócio";

  /* ---------- Validações ---------- */
  function digitos(v) { return texto(String(v == null ? "" : v)).replace(/\D/g, ""); }

  // Devolve o número pronto para o wa.me (DDI 55 + DDD + número) ou "" se não for um número real.
  // Aceita com ou sem o 55. Rejeita DDD inexistente (ex.: 00) e números de um dígito repetido.
  function numeroWhatsapp(numero) {
    var d = digitos(numero);
    if (/^\d{10,11}$/.test(d)) d = "55" + d;
    if (!/^55\d{10,11}$/.test(d)) return "";
    if (/^(\d)\1+$/.test(d.slice(4))) return "";
    return Number(d.slice(2, 4)) >= 11 ? d : "";
  }

  function instagramValido(user) { return /^[A-Za-z0-9._]{1,30}$/.test(user); }
  function urlHttps(u) { return /^https:\/\/[^\s]+$/i.test(u); }

  function formatarTelefone(d) {
    var m = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(d);
    return m ? "+55 (" + m[1] + ") " + m[2] + "-" + m[3] : "+" + d;
  }

  var moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  function celulaPreco(s) {
    var td = el("td", "num");
    if (typeof s.preco !== "number" || !isFinite(s.preco)) {
      td.textContent = "Sob consulta";
      return td;
    }
    if (s.aPartirDe) td.appendChild(el("span", "prefixo", "a partir de "));
    td.appendChild(document.createTextNode(moeda.format(s.preco)));
    return td;
  }
  function formatarDuracao(d) {
    if (typeof d === "number" && d > 0) return d + " min";
    return texto(d) || "—";
  }

  /* ---------- Seções visíveis ---------- */
  function mostrarSecao(id, visivel) {
    var secao = document.getElementById(id);
    var item = $('[data-nav="' + id + '"]');
    if (secao) secao.hidden = !visivel;
    if (item) item.hidden = !visivel;
  }

  /* ---------- Textos simples e avisos de demonstração ---------- */
  $$("[data-bind]").forEach(function (node) {
    var valor = texto(CONFIG[node.getAttribute("data-bind")]);
    if (valor) node.textContent = valor;
    else node.hidden = true;
  });
  $$("[data-demo]").forEach(function (node) { node.hidden = !demo; });
  if (!texto(CONFIG.titulo)) {          // a página sempre precisa de um h1
    var h1 = $("#titulo-hero");
    h1.textContent = nome;
    h1.hidden = false;
  }

  /* ---------- SEO dinâmico (o HTML já traz valores iniciais) ---------- */
  (function atualizarMeta() {
    var slogan = texto(CONFIG.slogan);
    var titulo = nome + (slogan ? " | " + slogan : "") + (demo ? " – página de demonstração" : "");
    var desc = texto(CONFIG.descricao);
    document.title = titulo;
    var metaDesc = $('meta[name="description"]');
    var ogTitulo = $('meta[property="og:title"]');
    var ogDesc = $('meta[property="og:description"]');
    if (metaDesc && desc) metaDesc.setAttribute("content", desc);
    if (ogTitulo) ogTitulo.setAttribute("content", titulo);
    if (ogDesc && desc) ogDesc.setAttribute("content", desc);
  })();

  /* ---------- WhatsApp ---------- */
  var wa = CONFIG.whatsapp || {};
  var waNumero = numeroWhatsapp(wa.numero);
  var waReal = waNumero !== "";
  var waTexto = texto(wa.textoBotao) || "Falar pelo WhatsApp";

  function iconeConversa() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z");
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);
    return svg;
  }

  $$('[data-slot="whatsapp"]').forEach(function (slot, i) {
    if (waReal) {
      var link = el("a", "btn btn-primary");
      link.href = "https://wa.me/" + waNumero +
        (texto(wa.mensagem) ? "?text=" + encodeURIComponent(texto(wa.mensagem)) : "");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.appendChild(iconeConversa());
      link.appendChild(document.createTextNode(waTexto));
      var aviso = el("span", "sr-only", " (abre em nova aba)");
      link.appendChild(aviso);
      slot.appendChild(link);
    } else if (demo) {
      // Número de teste: o botão não abre nenhum link, só explica a configuração.
      var idAviso = "wa-aviso-" + i;
      var botao = el("button", "btn btn-primary");
      botao.type = "button";
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-controls", idAviso);
      botao.appendChild(iconeConversa());
      botao.appendChild(document.createTextNode(waTexto));

      var nota = el("p", "wa-aviso",
        "Demonstração: o número de WhatsApp configurado é apenas um teste, por isso nenhuma conversa é aberta. " +
        "Para ativar o botão, informe o número real em CONFIG.whatsapp.numero no arquivo script.js.");
      nota.id = idAviso;
      nota.hidden = true;

      botao.addEventListener("click", function () {
        var abrir = nota.hidden;
        nota.hidden = !abrir;
        botao.setAttribute("aria-expanded", String(abrir));
      });
      slot.appendChild(botao);
      slot.appendChild(nota);
    }
    // Sem número válido e fora do modo demonstração: o botão fica oculto.
  });

  /* ---------- Serviços e preços ---------- */
  var servicos = lista(CONFIG.servicos).filter(function (s) { return s && texto(s.nome); });

  var listaServicos = $("#lista-servicos");
  servicos.forEach(function (s) {
    var li = el("li", "card");
    li.appendChild(el("h3", "", texto(s.nome)));
    if (texto(s.descricao)) li.appendChild(el("p", "", texto(s.descricao)));
    var d = formatarDuracao(s.duracao);
    if (d !== "—") li.appendChild(el("p", "meta", "Duração: " + d));
    listaServicos.appendChild(li);
  });
  mostrarSecao("servicos", servicos.length > 0);

  var comPreco = servicos.filter(function (s) { return typeof s.preco === "number"; });
  var corpoPrecos = $("#tabela-precos");
  servicos.forEach(function (s) {
    var tr = el("tr");
    var th = el("th", "", texto(s.nome));
    th.setAttribute("scope", "row");
    tr.appendChild(th);
    tr.appendChild(el("td", "dur", formatarDuracao(s.duracao)));
    tr.appendChild(celulaPreco(s));
    corpoPrecos.appendChild(tr);
  });
  var notaPrecos = $("#precos-nota");
  notaPrecos.textContent = demo
    ? "Todos os valores desta tabela são fictícios e servem apenas para demonstrar o layout."
    : texto(CONFIG.precosNota);
  if (demo && texto(CONFIG.precosNota)) notaPrecos.textContent += " " + texto(CONFIG.precosNota);
  mostrarSecao("precos", comPreco.length > 0);

  /* ---------- Sobre ---------- */
  var paragrafos = lista(CONFIG.sobre).map(texto).filter(Boolean);
  var destaques = lista(CONFIG.destaques).filter(function (x) { return x && texto(x.titulo); });
  paragrafos.forEach(function (p) { $("#sobre-texto").appendChild(el("p", "", p)); });
  destaques.forEach(function (x) {
    var li = el("li");
    li.appendChild(el("strong", "", texto(x.titulo)));
    if (texto(x.texto)) li.appendChild(el("span", "", texto(x.texto)));
    $("#destaques").appendChild(li);
  });
  mostrarSecao("sobre", paragrafos.length > 0 || destaques.length > 0);

  /* ---------- Horários, endereço e contato ---------- */
  var horarios = lista(CONFIG.horarios).filter(function (h) { return h && texto(h.dia) && texto(h.horas); });
  horarios.forEach(function (h) {
    var linha = el("div");
    linha.appendChild(el("dt", "", texto(h.dia)));
    linha.appendChild(el("dd", "", texto(h.horas)));
    $("#lista-horarios").appendChild(linha);
  });
  $("#card-horarios").hidden = horarios.length === 0;

  var end = CONFIG.endereco || {};
  var linhasEnd = lista(end.linhas).map(texto).filter(Boolean);
  var DADO_DE_EXEMPLO = /exemplo|00000-000|fictíci|demonstra/i;
  if (!demo && linhasEnd.some(function (l) { return DADO_DE_EXEMPLO.test(l); })) {
    console.warn("[CONFIG] O endereço ainda é de exemplo e foi ocultado. Informe o endereço real.");
    linhasEnd = [];
  }
  var enderecoEl = $("#endereco");
  linhasEnd.forEach(function (l, i) {
    if (i > 0) enderecoEl.appendChild(document.createElement("br"));
    enderecoEl.appendChild(document.createTextNode(l));
  });
  if (urlHttps(texto(end.mapaUrl)) && linhasEnd.length) {
    $("#mapa-link").href = texto(end.mapaUrl);
    $("#mapa-link").target = "_blank";
    $("#mapa-link").rel = "noopener noreferrer";
    $("#mapa-link-wrap").hidden = false;
  }
  $("#card-local").hidden = linhasEnd.length === 0;

  var insta = texto(CONFIG.instagram).replace(/^@/, "");
  var instaOk = instagramValido(insta);

  function linkInstagram() {
    var a = el("a", "", "@" + insta);
    a.href = "https://www.instagram.com/" + encodeURIComponent(insta) + "/";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.appendChild(el("span", "sr-only", " (abre em nova aba)"));
    return a;
  }

  var contatoTel = $("#contato-telefone");
  if (waReal) {
    contatoTel.textContent = "WhatsApp: " + formatarTelefone(waNumero);
    contatoTel.hidden = false;
  } else if (demo) {
    contatoTel.textContent = "WhatsApp: número de teste (não é um contato real).";
    contatoTel.hidden = false;
  }
  if (instaOk) {
    var pInsta = $("#contato-instagram");
    pInsta.appendChild(document.createTextNode("Instagram: "));
    pInsta.appendChild(linkInstagram());
    pInsta.hidden = false;
    var fInsta = $("#footer-instagram");
    fInsta.appendChild(document.createTextNode("Instagram: "));
    fInsta.appendChild(linkInstagram());
    fInsta.hidden = false;
  }
  $("#card-contato").hidden = !(waReal || demo || instaOk);

  mostrarSecao("contato", !$("#card-horarios").hidden || !$("#card-local").hidden || !$("#card-contato").hidden);

  // Links que apontam para uma seção só aparecem se a seção existir.
  $$("[data-requires]").forEach(function (node) {
    var alvo = document.getElementById(node.getAttribute("data-requires"));
    node.hidden = !alvo || alvo.hidden;
  });

  // Fora do modo demonstração, avisa (no console) sobre textos que ainda parecem de exemplo.
  if (!demo) {
    ["nome", "slogan", "titulo", "descricao", "precosNota"].forEach(function (campo) {
      if (DADO_DE_EXEMPLO.test(texto(CONFIG[campo]))) {
        console.warn("[CONFIG] O campo '" + campo + "' ainda tem texto de demonstração: " + CONFIG[campo]);
      }
    });
    paragrafos.forEach(function (p) {
      if (DADO_DE_EXEMPLO.test(p)) console.warn("[CONFIG] Um parágrafo de 'sobre' ainda tem texto de exemplo.");
    });
  }

  /* ---------- Rodapé ---------- */
  $("#footer-copy").textContent = "© " + new Date().getFullYear() + " " + nome +
    (demo ? " (nome fictício, usado apenas em demonstração)." : ". Todos os direitos reservados.");

  /* ---------- Menu no celular ---------- */
  var toggle = $(".nav-toggle");
  var menu = $("#menu-principal");

  function abrirMenu(abrir) {
    menu.classList.toggle("is-open", abrir);
    toggle.setAttribute("aria-expanded", String(abrir));
  }
  toggle.addEventListener("click", function () {
    abrirMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  $$("a", menu).forEach(function (a) {
    a.addEventListener("click", function () { abrirMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      abrirMenu(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) abrirMenu(false);
  });

  /* ---------- Destaque do link da seção atual ---------- */
  if ("IntersectionObserver" in window) {
    var links = {};
    $$("a[href^='#']", menu).forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting || !links[e.target.id]) return;
        Object.keys(links).forEach(function (id) { links[id].removeAttribute("aria-current"); });
        links[e.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(links).forEach(function (id) {
      var secao = document.getElementById(id);
      if (secao && !secao.hidden) observador.observe(secao);
    });
  }
})();
