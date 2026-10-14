/* =====================================================================
   CONFIGURAÇÃO DOS MODELOS – único arquivo que você edita.

   • Cada item de "modelos" é uma página completa (ex.: barbearia, salao).
   • Para um cliente real: edite um modelo, troque modoDemonstracao para
     false e mostrarSeletor para false.
   • Campo vazio ("" ou []) = o bloco correspondente fica oculto.
   • TODOS os dados abaixo são FICTÍCIOS (nomes, endereços, preços e contatos).
   ===================================================================== */
const MODELOS_CONFIG = {
  // Modelo exibido ao abrir a página (também dá para abrir com ?modelo=salao).
  modeloInicial: "barbearia",

  // true  = mostra avisos "dados fictícios" em toda a página.
  // false = versão final do cliente (sem avisos).
  modoDemonstracao: true,

  // true  = mostra a barra para alternar entre os modelos (use só na demonstração).
  mostrarSeletor: true,

  modelos: {
    /* ---------------------------------------------------------------
       MODELO 1 – BARBEARIA (fictícia)
       --------------------------------------------------------------- */
    barbearia: {
      rotuloSeletor: "Barbearia",
      segmento: "Barbearia",
      nome: "Barbearia Ferro & Fio",
      slogan: "Barbearia clássica",
      titulo: "Corte alinhado, barba no ponto",
      // Até ~155 caracteres: também vai para a descrição do Google.
      descricao:
        "Cortes, barba e cuidados em um ambiente descontraído. Modelo de demonstração de página para barbearias, com dados fictícios.",

      // Cores em hexadecimal. "primaria" é a cor dos botões; "destaque" colore textos de ênfase.
      tema: {
        fundo: "#1b1714",
        superficie: "#262019",
        texto: "#f4ece2",
        textoSuave: "#cfc1b1",
        primaria: "#c8843c",
        textoSobrePrimaria: "#1b1714",
        destaque: "#e0a45a",
        borda: "#3d342b",
        foco: "#ffd479",
        fonteTitulo: "sans",       // "sans" (moderna) ou "serif" (clássica)
        titulosMaiusculas: true,
      },

      imagemHero: { src: "galeria/barbearia-1.svg", alt: "" }, // alt vazio = imagem decorativa

      whatsapp: {
        // Somente números, com DDD (ex.: "11999999999"). O valor abaixo é um NÚMERO DE TESTE
        // (DDD 00 não existe): o botão não abre nenhuma conversa e mostra um aviso.
        numero: "5500000000000",
        textoBotao: "Agendar pelo WhatsApp",
        // Mensagem já digitada no WhatsApp. Nada é enviado sozinho.
        mensagem: "Olá! Vi a página da Barbearia Ferro & Fio e gostaria de agendar um horário.",
      },

      // Somente o nome de usuário, sem @ e sem link. Vazio = sem link.
      // Em modo demonstração, redes vazias aparecem como "exemplo" (sem link);
      // fora dele, ficam ocultas. Remova a chave para não exibir a rede.
      redes: { instagram: "", tiktok: "", facebook: "" },

      sobre: [
        "Uma barbearia de bairro, com clima descontraído e atendimento sem pressa. Cada cliente é atendido com hora marcada.",
        "Antes de começar, conversamos sobre o estilo e o formato que combinam com você.",
      ],
      destaques: [
        { titulo: "Hora marcada", texto: "Menos espera e mais tempo para o seu atendimento." },
        { titulo: "Ambiente descontraído", texto: "Um espaço para relaxar enquanto o trabalho é feito." },
        { titulo: "Conversa antes do corte", texto: "Combinamos o resultado antes de ligar a máquina." },
      ],

      introServicos: "Cortes, barba e acabamentos.",
      // preco: número em reais (ou null = "Sob consulta"). duracao: minutos (ou texto).
      servicos: [
        { nome: "Corte masculino", descricao: "Máquina e tesoura, com lavagem e finalização.", duracao: 40, preco: 50 },
        { nome: "Barba completa", descricao: "Modelagem da barba com toalha quente e navalha.", duracao: 30, preco: 40 },
        { nome: "Corte + barba", descricao: "O combo completo, em um só horário.", duracao: 70, preco: 80 },
        { nome: "Corte infantil", descricao: "Atendimento com calma para os pequenos.", duracao: 30, preco: 40 },
        { nome: "Sobrancelha e acabamento", descricao: "Contorno de pescoço, orelhas e sobrancelha.", duracao: 15, preco: 20 },
        { nome: "Hidratação capilar", descricao: "Cuidado para couro cabeludo e fios.", duracao: 30, preco: 35 },
      ],

      introGaleria: "Ilustrações próprias, só para demonstrar o layout. Troque por fotos reais do negócio.",
      galeria: [
        { src: "galeria/barbearia-1.svg", alt: "Ilustração: poste de barbeiro", legenda: "Poste de barbeiro" },
        { src: "galeria/barbearia-2.svg", alt: "Ilustração: tesoura e pente", legenda: "Tesoura e pente" },
        { src: "galeria/barbearia-3.svg", alt: "Ilustração: navalha", legenda: "Navalha" },
        { src: "galeria/barbearia-4.svg", alt: "Ilustração: cadeira de barbeiro", legenda: "Cadeira de barbeiro" },
        { src: "galeria/barbearia-5.svg", alt: "Ilustração: espelho oval e prateleira com frascos", legenda: "Espelho e frascos" },
        { src: "galeria/barbearia-6.svg", alt: "Ilustração: pincel de barbear com espuma", legenda: "Pincel de barbear" },
      ],

      horarios: [
        { dia: "Terça a sexta", horas: "09h às 20h" },
        { dia: "Sábado", horas: "08h às 18h" },
        { dia: "Domingo e segunda", horas: "Fechado" },
      ],

      endereco: {
        linhas: ["Rua Exemplo da Barbearia, 000 – Centro", "Cidade Exemplo – UF, 00000-000"],
        // Link opcional do Google Maps (https://...). Vazio = oculto.
        mapaUrl: "",
      },
    },

    /* ---------------------------------------------------------------
       MODELO 2 – SALÃO DE BELEZA (fictício)
       --------------------------------------------------------------- */
    salao: {
      rotuloSeletor: "Salão de beleza",
      segmento: "Salão de beleza",
      nome: "Studio Lume",
      slogan: "Salão de beleza",
      titulo: "Beleza com tempo e cuidado para você",
      descricao:
        "Cabelo, unhas e maquiagem em um espaço acolhedor. Modelo de demonstração de página para salões de beleza, com dados fictícios.",

      tema: {
        fundo: "#fdf7f4",
        superficie: "#ffffff",
        texto: "#2d1f26",
        textoSuave: "#5b4650",
        primaria: "#9b3d5c",
        textoSobrePrimaria: "#ffffff",
        destaque: "#8a3354",
        borda: "#ecd9d2",
        foco: "#0b57d0",
        fonteTitulo: "serif",
        titulosMaiusculas: false,
      },

      imagemHero: { src: "galeria/salao-1.svg", alt: "" },

      whatsapp: {
        numero: "5500000000000",
        textoBotao: "Agendar pelo WhatsApp",
        mensagem: "Olá! Vi a página do Studio Lume e gostaria de agendar um horário.",
      },

      redes: { instagram: "", facebook: "", youtube: "" },

      sobre: [
        "Um salão pensado para você relaxar enquanto cuida de si. O atendimento é feito com hora marcada e sem correria.",
        "Conversamos antes de qualquer procedimento para que o resultado combine com o seu estilo e com a sua rotina.",
      ],
      destaques: [
        { titulo: "Atendimento com hora marcada", texto: "Tempo reservado só para você." },
        { titulo: "Espaço acolhedor", texto: "Um ambiente calmo, do café ao espelho." },
        { titulo: "Conversa antes de começar", texto: "Combinamos o que será feito antes de qualquer procedimento." },
      ],

      introServicos: "Cabelo, unhas e maquiagem.",
      servicos: [
        { nome: "Corte feminino", descricao: "Corte pensado para o seu estilo, com lavagem e finalização.", duracao: 60, preco: 90 },
        { nome: "Escova", descricao: "Lavagem e escova para o dia a dia ou para uma ocasião especial.", duracao: 45, preco: 60 },
        { nome: "Coloração", descricao: "Cor, retoque de raiz ou mudança de tom, definidos em conversa.", duracao: 150, preco: 160, aPartirDe: true },
        { nome: "Tratamento capilar", descricao: "Hidratação e cuidados para fios ressecados ou sensibilizados.", duracao: 60, preco: 85 },
        { nome: "Manicure e pedicure", descricao: "Cuidado completo para mãos e pés, com esmaltação à sua escolha.", duracao: 90, preco: 70 },
        { nome: "Maquiagem para eventos", descricao: "Maquiagem planejada conforme o evento e o look.", duracao: 75, preco: 130 },
      ],

      introGaleria: "Ilustrações próprias, só para demonstrar o layout. Troque por fotos reais do negócio.",
      galeria: [
        { src: "galeria/salao-1.svg", alt: "Ilustração: secador de cabelo", legenda: "Secador" },
        { src: "galeria/salao-2.svg", alt: "Ilustração: tesoura e pente", legenda: "Tesoura e pente" },
        { src: "galeria/salao-3.svg", alt: "Ilustração: esmalte", legenda: "Esmalte" },
        { src: "galeria/salao-4.svg", alt: "Ilustração: espelho de mão", legenda: "Espelho de mão" },
        { src: "galeria/salao-5.svg", alt: "Ilustração: escova de cabelo", legenda: "Escova de cabelo" },
        { src: "galeria/salao-6.svg", alt: "Ilustração: batom", legenda: "Batom" },
      ],

      horarios: [
        { dia: "Segunda a sexta", horas: "09h às 19h" },
        { dia: "Sábado", horas: "09h às 17h" },
        { dia: "Domingo e feriados", horas: "Fechado" },
      ],

      endereco: {
        linhas: ["Avenida Exemplo do Salão, 000 – Jardim", "Cidade Exemplo – UF, 00000-000"],
        mapaUrl: "",
      },
    },
  },
};
