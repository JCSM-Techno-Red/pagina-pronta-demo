/* Modelos de página (barbearia / salão)
   Este arquivo só monta a página a partir de config.js. Normalmente não precisa ser editado. */
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

  /* ---------- Leitura da configuração ---------- */
  var CFG = typeof MODELOS_CONFIG === "object" && MODELOS_CONFIG ? MODELOS_CONFIG : null;
  var modelos = CFG && CFG.modelos && typeof CFG.modelos === "object" ? CFG.modelos : {};
  var ids = Object.keys(modelos).filter(function (id) { return modelos[id] && typeof modelos[id] === "object"; });

  if (!ids.length) {
    console.error("[modelos] MODELOS_CONFIG não encontrado ou sem modelos. Confira o arquivo config.js.");
    $("#config-erro").hidden = false;
    $$("main > section").forEach(function (s) { s.hidden = true; });
    $("#barra-modelos").hidden = true;
    return;
  }

  var demo = CFG.modoDemonstracao === true;
  var DADO_DE_EXEMPLO = /exemplo|00000-000|fictíci|demonstra/i;

  /* ---------- Validações e formatação ---------- */
  function digitos(v) { return texto(String(v == null ? "" : v)).replace(/\D/g, ""); }

  // Devolve o número pronto para o wa.me (55 + DDD + número) ou "" se não for um número real.
  function numeroWhatsapp(numero) {
    var d = digitos(numero);
    if (/^\d{10,11}$/.test(d)) d = "55" + d;
    if (!/^55\d{10,11}$/.test(d)) return "";
    if (/^(\d)\1+$/.test(d.slice(4))) return "";
    return Number(d.slice(2, 4)) >= 11 ? d : "";
  }
  function formatarTelefone(d) {
    var m = /^55(\d{2})(\d{4,5})(\d{4})$/.exec(d);
    return m ? "+55 (" + m[1] + ") " + m[2] + "-" + m[3] : "+" + d;
  }
  function urlHttps(u) { return /^https:\/\/[^\s]+$/i.test(u); }
  function corValida(c) { return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(texto(c)); }

  var moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  function formatarDuracao(d) {
    if (typeof d === "number" && d > 0) return d + " min";
    return texto(d);
  }
  function celulaPreco(s) {
    var box = el("span", "service-price");
    if (typeof s.preco !== "number" || !isFinite(s.preco)) {
      box.textContent = "Sob consulta";
      return box;
    }
    if (s.aPartirDe) box.appendChild(el("span", "prefixo", "a partir de"));
    box.appendChild(document.createTextNode(moeda.format(s.preco)));
    return box;
  }

  // Redes sociais: nome exibido e endereço do perfil a partir do usuário.
  var REDES = {
    instagram: { nome: "Instagram", url: function (u) { return "https://www.instagram.com/" + encodeURIComponent(u) + "/"; } },
    facebook: { nome: "Facebook", url: function (u) { return "https://www.facebook.com/" + encodeURIComponent(u); } },
    tiktok: { nome: "TikTok", url: function (u) { return "https://www.tiktok.com/@" + encodeURIComponent(u); } },
    youtube: { nome: "YouTube", url: function (u) { return "https://www.youtube.com/@" + encodeURIComponent(u); } },
  };

  /* ---------- Tema ---------- */
  var VARIAVEIS = {
    fundo: "--bg", superficie: "--surface", texto: "--text", textoSuave: "--muted",
    primaria: "--primary", textoSobrePrimaria: "--on-primary", destaque: "--accent",
    borda: "--border", foco: "--focus",
  };
  function aplicarTema(tema) {
    tema = tema && typeof tema === "object" ? tema : {};
    var root = document.documentElement;
    Object.keys(VARIAVEIS).forEach(function (chave) {
      if (corValida(tema[chave])) root.style.setProperty(VARIAVEIS[chave], texto(tema[chave]));
      else root.style.removeProperty(VARIAVEIS[chave]);   // volta ao padrão do CSS
    });
    root.setAttribute("data-fonte", tema.fonteTitulo === "serif" ? "serif" : "sans");
    root.classList.toggle("caps", tema.titulosMaiusculas === true);
    var metaCor = $('meta[name="theme-color"]');
    if (metaCor && corValida(tema.fundo)) metaCor.setAttribute("content", texto(tema.fundo));
  }

  /* ---------- Seções visíveis ---------- */
  function mostrarSecao(id, visivel) {
    var secao = document.getElementById(id);
    var item = $('[data-nav="' + id + '"]');
    if (secao) secao.hidden = !visivel;
    if (item) item.hidden = !visivel;
  }

  /* ---------- WhatsApp ---------- */
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

  function montarWhatsapp(m, waNumero) {
    var wa = m.whatsapp && typeof m.whatsapp === "object" ? m.whatsapp : {};
    var rotulo = texto(wa.textoBotao) || "Falar pelo WhatsApp";
    $$('[data-slot="whatsapp"]').forEach(function (slot, i) {
      slot.replaceChildren();
      if (waNumero) {
        var link = el("a", "btn btn-primary");
        link.href = "https://wa.me/" + waNumero + (texto(wa.mensagem) ? "?text=" + encodeURIComponent(texto(wa.mensagem)) : "");
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.appendChild(iconeConversa());
        link.appendChild(document.createTextNode(rotulo));
        link.appendChild(el("span", "sr-only", " (abre em nova aba)"));
        slot.appendChild(link);
      } else if (demo) {
        // Número de teste: o botão não abre nenhum link, só explica como configurar.
        var idAviso = "wa-aviso-" + i;
        var botao = el("button", "btn btn-primary");
        botao.type = "button";
        botao.setAttribute("aria-expanded", "false");
        botao.setAttribute("aria-controls", idAviso);
        botao.appendChild(iconeConversa());
        botao.appendChild(document.createTextNode(rotulo));

        var nota = el("p", "wa-aviso");
        nota.id = idAviso;
        nota.hidden = true;
        nota.appendChild(document.createTextNode(
          "Demonstração: o número de WhatsApp configurado é apenas um teste, por isso nenhuma conversa é aberta. " +
          "Para ativar o botão, informe o número real em "));
        nota.appendChild(el("code", "", "whatsapp.numero"));
        nota.appendChild(document.createTextNode(" no arquivo "));
        nota.appendChild(el("code", "", "modelos/config.js"));
        nota.appendChild(document.createTextNode("."));

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
  }

  /* ---------- Renderização de um modelo ---------- */
  function limpar(node) { node.replaceChildren(); return node; }

  function renderizar(id) {
    var m = modelos[id];
    var nome = texto(m.nome) || "Meu negócio";

    aplicarTema(m.tema);
    document.documentElement.setAttribute("data-modelo", id);

    // Textos simples. Campo vazio oculta o elemento.
    $$("[data-bind]").forEach(function (node) {
      var chave = node.getAttribute("data-bind");
      var valor = texto(m[chave]);
      if (valor) { node.textContent = valor; node.hidden = false; } else { node.hidden = true; }
    });
    if (!texto(m.titulo)) { var h1 = $("#titulo-hero"); h1.textContent = nome; h1.hidden = false; } // a página sempre tem um h1
    $$("[data-demo]").forEach(function (node) { node.hidden = !demo; });

    // SEO dinâmico
    var slogan = texto(m.slogan) || texto(m.segmento);
    var titulo = nome + (slogan ? " | " + slogan : "") + (demo ? " – página de demonstração" : "");
    var desc = texto(m.descricao);
    document.title = titulo;
    var metaDesc = $('meta[name="description"]'), ogT = $('meta[property="og:title"]'), ogD = $('meta[property="og:description"]');
    if (metaDesc && desc) metaDesc.setAttribute("content", desc);
    if (ogT) ogT.setAttribute("content", titulo);
    if (ogD && desc) ogD.setAttribute("content", desc);

    // Imagem do hero (decorativa)
    var hero = m.imagemHero && typeof m.imagemHero === "object" ? m.imagemHero : {};
    var heroMedia = $("#hero-media"), heroImg = $("#hero-img");
    if (texto(hero.src)) {
      heroImg.src = texto(hero.src);
      heroImg.alt = texto(hero.alt);
      heroMedia.hidden = false;
    } else {
      heroImg.removeAttribute("src");
      heroMedia.hidden = true;
    }

    // WhatsApp
    var wa = m.whatsapp && typeof m.whatsapp === "object" ? m.whatsapp : {};
    var waNumero = numeroWhatsapp(wa.numero);
    montarWhatsapp(m, waNumero);

    // Sobre
    var paragrafos = lista(m.sobre).map(texto).filter(Boolean);
    var destaques = lista(m.destaques).filter(function (x) { return x && texto(x.titulo); });
    var sobreTexto = limpar($("#sobre-texto"));
    paragrafos.forEach(function (p) { sobreTexto.appendChild(el("p", "", p)); });
    var listaDestaques = limpar($("#destaques"));
    destaques.forEach(function (x) {
      var li = el("li");
      li.appendChild(el("strong", "", texto(x.titulo)));
      if (texto(x.texto)) li.appendChild(el("span", "", texto(x.texto)));
      listaDestaques.appendChild(li);
    });
    mostrarSecao("sobre", paragrafos.length > 0 || destaques.length > 0);

    // Serviços e preços
    var servicos = lista(m.servicos).filter(function (s) { return s && texto(s.nome); });
    var listaServ = limpar($("#lista-servicos"));
    servicos.forEach(function (s) {
      var li = el("li", "service");
      var head = el("div", "service-head");
      head.appendChild(el("h3", "", texto(s.nome)));
      head.appendChild(celulaPreco(s));
      li.appendChild(head);
      if (texto(s.descricao)) li.appendChild(el("p", "", texto(s.descricao)));
      var dur = formatarDuracao(s.duracao);
      if (dur) li.appendChild(el("p", "meta", "Duração: " + dur));
      listaServ.appendChild(li);
    });
    $("#servicos-intro").textContent = texto(m.introServicos);
    mostrarSecao("servicos", servicos.length > 0);

    // Galeria (cada item precisa de src e alt)
    var galeria = lista(m.galeria).filter(function (g) { return g && texto(g.src) && texto(g.alt); });
    var listaGal = limpar($("#lista-galeria"));
    galeria.forEach(function (g) {
      var li = el("li");
      var fig = el("figure");
      var img = el("img");
      img.src = texto(g.src);
      img.alt = texto(g.alt);
      img.width = 400;
      img.height = 300;
      img.loading = "lazy";
      img.decoding = "async";
      fig.appendChild(img);
      if (texto(g.legenda)) fig.appendChild(el("figcaption", "", texto(g.legenda)));
      li.appendChild(fig);
      listaGal.appendChild(li);
    });
    $("#galeria-intro").textContent = texto(m.introGaleria);
    mostrarSecao("galeria", galeria.length > 0);

    // Horários
    var horarios = lista(m.horarios).filter(function (h) { return h && texto(h.dia) && texto(h.horas); });
    var listaHor = limpar($("#lista-horarios"));
    horarios.forEach(function (h) {
      var linha = el("div");
      linha.appendChild(el("dt", "", texto(h.dia)));
      linha.appendChild(el("dd", "", texto(h.horas)));
      listaHor.appendChild(linha);
    });
    $("#card-horarios").hidden = horarios.length === 0;

    // Endereço (endereço de exemplo nunca aparece como real fora do modo demonstração)
    var end = m.endereco && typeof m.endereco === "object" ? m.endereco : {};
    var linhasEnd = lista(end.linhas).map(texto).filter(Boolean);
    if (!demo && linhasEnd.some(function (l) { return DADO_DE_EXEMPLO.test(l); })) {
      console.warn("[CONFIG] (" + id + ") O endereço ainda é de exemplo e foi ocultado. Informe o endereço real.");
      linhasEnd = [];
    }
    var enderecoEl = limpar($("#endereco"));
    linhasEnd.forEach(function (l, i) {
      if (i > 0) enderecoEl.appendChild(document.createElement("br"));
      enderecoEl.appendChild(document.createTextNode(l));
    });
    var mapa = $("#mapa-link"), mapaWrap = $("#mapa-link-wrap");
    if (urlHttps(texto(end.mapaUrl)) && linhasEnd.length) {
      mapa.href = texto(end.mapaUrl);
      mapa.target = "_blank";
      mapa.rel = "noopener noreferrer";
      mapaWrap.hidden = false;
    } else {
      mapa.removeAttribute("href");
      mapaWrap.hidden = true;
    }
    $("#card-local").hidden = linhasEnd.length === 0;

    // Telefone e redes sociais
    var tel = $("#contato-telefone");
    if (waNumero) { tel.textContent = "WhatsApp: " + formatarTelefone(waNumero); tel.hidden = false; }
    else if (demo) { tel.textContent = "WhatsApp: número de teste (não é um contato real)."; tel.hidden = false; }
    else { tel.hidden = true; }

    var redes = m.redes && typeof m.redes === "object" ? m.redes : {};
    var listaRedes = limpar($("#lista-redes"));
    Object.keys(redes).forEach(function (chave) {
      var rede = REDES[chave];
      if (!rede) return;
      var usuario = texto(redes[chave]).replace(/^@/, "");
      var li = el("li");
      if (/^[A-Za-z0-9._-]{1,50}$/.test(usuario)) {
        var a = el("a", "", rede.nome);
        a.href = rede.url(usuario);
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.appendChild(el("span", "sr-only", " (abre em nova aba)"));
        li.appendChild(a);
      } else if (demo) {
        var ex = el("span", "rede-exemplo", rede.nome);
        ex.appendChild(el("small", "", "(exemplo, sem link)"));
        li.appendChild(ex);
      } else {
        return;
      }
      listaRedes.appendChild(li);
    });
    listaRedes.hidden = listaRedes.children.length === 0;

    $("#card-contato").hidden = !(waNumero || demo || !listaRedes.hidden);
    mostrarSecao("contato", !$("#card-horarios").hidden || !$("#card-local").hidden || !$("#card-contato").hidden);

    // Links que apontam para uma seção só aparecem se ela existir
    $$("[data-requires]").forEach(function (node) {
      var alvo = document.getElementById(node.getAttribute("data-requires"));
      node.hidden = !alvo || alvo.hidden;
    });

    // Avisos de configuração fora do modo demonstração
    if (!demo) {
      ["nome", "slogan", "titulo", "descricao"].forEach(function (campo) {
        if (DADO_DE_EXEMPLO.test(texto(m[campo]))) {
          console.warn("[CONFIG] (" + id + ") O campo '" + campo + "' ainda tem texto de demonstração: " + m[campo]);
        }
      });
    }

    $("#footer-copy").textContent = "© " + new Date().getFullYear() + " " + nome +
      (demo ? " (nome fictício, usado apenas em demonstração)." : ". Todos os direitos reservados.");

    observarSecoes();
  }

  /* ---------- Seletor de modelo ---------- */
  var modeloAtual = null;
  var seletor = $("#seletor");

  function idInicial() {
    var pedido = "";
    try { pedido = new URLSearchParams(window.location.search).get("modelo") || ""; } catch (e) { pedido = ""; }
    if (ids.indexOf(pedido) !== -1) return pedido;
    return ids.indexOf(CFG.modeloInicial) !== -1 ? CFG.modeloInicial : ids[0];
  }

  function rotuloModelo(id) {
    var m = modelos[id];
    return texto(m.rotuloSeletor) || texto(m.segmento) || id;
  }

  function selecionar(id, anunciar) {
    if (ids.indexOf(id) === -1) return;
    modeloAtual = id;
    renderizar(id);
    $$("button", seletor).forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-modelo") === id));
    });
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("modelo", id);
      window.history.replaceState(null, "", url.toString());
    } catch (e) { /* ex.: restrições de file:// em alguns navegadores – a troca continua funcionando */ }
    if (anunciar) $("#anuncio").textContent = "Modelo alterado para " + rotuloModelo(id) + ".";
  }

  ids.forEach(function (id) {
    var b = el("button", "", rotuloModelo(id));
    b.type = "button";
    b.setAttribute("data-modelo", id);
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", function () {
      if (id !== modeloAtual) selecionar(id, true);
    });
    seletor.appendChild(b);
  });
  $("#barra-modelos").hidden = !(CFG.mostrarSeletor !== false && ids.length > 1);

  /* ---------- Menu no celular ---------- */
  var toggle = $(".nav-toggle");
  var menu = $("#menu-principal");

  function abrirMenu(abrir) {
    menu.classList.toggle("is-open", abrir);
    toggle.setAttribute("aria-expanded", String(abrir));
  }
  toggle.addEventListener("click", function () { abrirMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { abrirMenu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      abrirMenu(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", function () { if (window.innerWidth >= 768) abrirMenu(false); });

  /* ---------- Destaque do link da seção atual ---------- */
  var observador = null;
  var linksMenu = {};
  $$("a[href^='#']", menu).forEach(function (a) { linksMenu[a.getAttribute("href").slice(1)] = a; });

  function observarSecoes() {
    if (!("IntersectionObserver" in window)) return;
    if (observador) observador.disconnect();
    Object.keys(linksMenu).forEach(function (k) { linksMenu[k].removeAttribute("aria-current"); });
    observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting || !linksMenu[e.target.id]) return;
        Object.keys(linksMenu).forEach(function (k) { linksMenu[k].removeAttribute("aria-current"); });
        linksMenu[e.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(linksMenu).forEach(function (k) {
      var secao = document.getElementById(k);
      if (secao && !secao.hidden) observador.observe(secao);
    });
  }

  selecionar(idInicial(), false);
})();
