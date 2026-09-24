"use client";

import SiteHeader from "../components/SiteHeader";
import { useLanguage, type Language } from "../context/LanguageContext";

type CareerCard = {
  title: string;
  text: string;
  href: string;
};

const translations = {
  EN: {
    artistLabel: "The Artist",
    career:
      "Singer, songwriter, producer, performer and actor. A career shaped by music, storytelling and a connection with audiences around the world.",
    heroFocus: "Music · Writing · Performance · Film & TV",
    roles: ["Singer", "Songwriter", "Producer", "Performer", "Actor"],

    aboutEyebrow: "About Ne-Yo",
    aboutTitle: "More than a voice",
    aboutParagraphs: [
      "Ne-Yo is an artist whose career reaches far beyond his own recordings. Music may be at the centre of his story, but songwriting, production, performance and acting have all helped shape the artist he became.",
      "His ability to combine melody, emotion and storytelling became one of the defining qualities of his work, both in songs performed by Ne-Yo himself and in music written for other artists.",
      "Across different stages of his career, he has continued to evolve without losing the songwriting and musical identity that first connected his work with audiences around the world.",
    ],

    songwriterEyebrow: "The Songwriter",
    songwriterTitle: "The pen behind the artist",
    songwriterText:
      "Songwriting is one of the most important parts of Ne-Yo's story. Alongside building his own catalogue, he wrote songs recorded by other major artists, helping establish his reputation as a songwriter before and throughout his success as a performer.",
    songwriterExamples: "Selected examples",
    writtenFor: "Written for",

    evolutionEyebrow: "Artistic Evolution",
    evolutionTitle: "Still exploring new directions",
    evolutionLead: "Highway 79",
    evolutionParagraphs: [
      "With Highway 79, Ne-Yo shows another side of himself as an artist, exploring a country-inspired direction after a career most closely associated with R&B and pop.",
      "The project reflects a willingness to experiment with a different musical language while keeping songwriting, melody and soul at the centre of the music.",
      "It is another chapter in a career that has never been limited to a single role, sound or part of the entertainment world.",
    ],
    exploreMusic: "Explore Music",
    independentEyebrow: "Independent Chapter",
    independentTitle: "Greater creative control",
    independentText:
      "Since 2024, Ne-Yo has entered a new chapter as an independent artist, releasing music through Compound Entertainment and taking greater creative control over his work.",

    beyondEyebrow: "Beyond Music",
    beyondTitle: "A career across entertainment",
    beyondText:
      "Whether in the recording studio, on stage, in front of the camera or behind the scenes as a songwriter, Ne-Yo has built a career defined by versatility. Roles such as Sage Odom in Step Up: High Water and work across television and theatre show another side of the artist beyond music.",
    exploreFilmTv: "Explore Film, TV & Stage",

    exploreEyebrow: "Explore His Career",
    exploreTitle: "Discover the different sides of the story",
    exploreText:
      "Music, performances, awards and career moments each have their own place across Ne-Yo World.",
    cards: [
      {
        title: "Music",
        text: "Albums, songs, releases and the evolution of his sound.",
        href: "/music",
      },
      {
        title: "Film, TV & Stage",
        text: "Acting, television appearances, judging roles and theatre.",
        href: "/film-tv-stage",
      },
      {
        title: "Awards & Milestones",
        text: "Awards, nominations and major career achievements.",
        href: "/awards",
      },
    ] as CareerCard[],

    officialEyebrow: "Official Channels",
    officialTitle: "Connect with Ne-Yo",
    officialText:
      "Follow Ne-Yo through his official channels and platforms.",
    official: "Official",

    final: "The artist · The music · The world",
    back: "Back to Ne-Yo World",
    footerCountries: "Countries",
    footerMessages: "Messages",
    footerAbout: "About",
  },

  PT: {
    artistLabel: "O Artista",
    career:
      "Cantor, compositor, produtor, artista e ator. Uma carreira construída através da música, das histórias e de uma ligação com públicos de todo o mundo.",
    heroFocus: "Música · Composição · Performance · Cinema & TV",
    roles: ["Cantor", "Compositor", "Produtor", "Artista", "Ator"],

    aboutEyebrow: "Sobre Ne-Yo",
    aboutTitle: "Mais do que uma voz",
    aboutParagraphs: [
      "Ne-Yo é um artista cuja carreira vai muito além das suas próprias gravações. A música está no centro da sua história, mas a composição, produção, atuação e representação também ajudaram a construir o artista em que se tornou.",
      "A capacidade de juntar melodia, emoção e narrativa tornou-se uma das características marcantes do seu trabalho, tanto nas músicas interpretadas por Ne-Yo como nas que escreveu para outros artistas.",
      "Ao longo das diferentes fases da carreira, continuou a evoluir sem perder a identidade musical e a força da composição que ligaram o seu trabalho a públicos de todo o mundo.",
    ],

    songwriterEyebrow: "O Compositor",
    songwriterTitle: "A escrita por detrás do artista",
    songwriterText:
      "A composição é uma das partes mais importantes da história de Ne-Yo. Ao mesmo tempo que construía o seu próprio catálogo, escreveu músicas gravadas por outros grandes artistas, afirmando-se como compositor antes e durante o seu sucesso como artista.",
    songwriterExamples: "Exemplos selecionados",
    writtenFor: "Escrita para",

    evolutionEyebrow: "Evolução Artística",
    evolutionTitle: "Sempre a explorar novas direções",
    evolutionLead: "Highway 79",
    evolutionParagraphs: [
      "Com Highway 79, Ne-Yo mostra outro lado de si como artista, explorando uma direção inspirada no country depois de uma carreira mais associada ao R&B e à pop.",
      "O projeto reflete a vontade de experimentar uma linguagem musical diferente, mantendo a composição, a melodia e a soul no centro da música.",
      "É mais um capítulo de uma carreira que nunca ficou limitada a uma única função, sonoridade ou área do entretenimento.",
    ],
    exploreMusic: "Explorar Música",
    independentEyebrow: "Capítulo Independente",
    independentTitle: "Maior controlo criativo",
    independentText:
      "Desde 2024, Ne-Yo entrou numa nova fase como artista independente, lançando música através da Compound Entertainment e assumindo maior controlo criativo sobre o seu trabalho.",

    beyondEyebrow: "Para Além da Música",
    beyondTitle: "Uma carreira em várias áreas do entretenimento",
    beyondText:
      "Seja no estúdio, em palco, diante das câmaras ou nos bastidores como compositor, Ne-Yo construiu uma carreira marcada pela versatilidade. Papéis como Sage Odom em Step Up: High Water e trabalhos em televisão e teatro mostram outro lado do artista para além da música.",
    exploreFilmTv: "Explorar Cinema, TV & Palco",

    exploreEyebrow: "Explorar a Carreira",
    exploreTitle: "Descobrir os diferentes lados da história",
    exploreText:
      "A música, as performances, os prémios e os grandes momentos da carreira têm o seu próprio espaço no Ne-Yo World.",
    cards: [
      {
        title: "Música",
        text: "Álbuns, músicas, lançamentos e a evolução do seu som.",
        href: "/music",
      },
      {
        title: "Cinema, TV & Palco",
        text: "Representação, televisão, funções de jurado e teatro.",
        href: "/film-tv-stage",
      },
      {
        title: "Prémios & Marcos",
        text: "Prémios, nomeações e grandes conquistas da carreira.",
        href: "/awards",
      },
    ] as CareerCard[],

    officialEyebrow: "Canais Oficiais",
    officialTitle: "Segue Ne-Yo",
    officialText:
      "Acompanha Ne-Yo através dos seus canais e plataformas oficiais.",
    official: "Oficial",

    final: "O artista · A música · O mundo",
    back: "Voltar ao Ne-Yo World",
    footerCountries: "Países",
    footerMessages: "Mensagens",
    footerAbout: "Sobre",
  },

  ES: {
    artistLabel: "El Artista",
    career:
      "Cantante, compositor, productor, intérprete y actor. Una carrera construida a través de la música, las historias y la conexión con públicos de todo el mundo.",
    heroFocus: "Música · Composición · Actuación · Cine & TV",
    roles: ["Cantante", "Compositor", "Productor", "Intérprete", "Actor"],

    aboutEyebrow: "Sobre Ne-Yo",
    aboutTitle: "Más que una voz",
    aboutParagraphs: [
      "La carrera de Ne-Yo va mucho más allá de sus propias grabaciones. La música está en el centro de su historia, pero la composición, la producción, la performance y la actuación también han definido al artista.",
      "Su capacidad para unir melodía, emoción y narrativa se convirtió en una de las características de su trabajo, tanto en sus propias canciones como en las escritas para otros artistas.",
      "A lo largo de distintas etapas de su carrera ha seguido evolucionando sin perder la identidad musical y la fuerza compositiva que conectaron su trabajo con públicos de todo el mundo.",
    ],

    songwriterEyebrow: "El Compositor",
    songwriterTitle: "La pluma detrás del artista",
    songwriterText:
      "La composición es una parte esencial de la historia de Ne-Yo. Mientras construía su propio catálogo, escribió canciones grabadas por otros grandes artistas y consolidó su reputación como compositor.",
    songwriterExamples: "Ejemplos seleccionados",
    writtenFor: "Escrita para",

    evolutionEyebrow: "Evolución Artística",
    evolutionTitle: "Siempre explorando nuevas direcciones",
    evolutionLead: "Highway 79",
    evolutionParagraphs: [
      "Con Highway 79, Ne-Yo muestra otra faceta artística al explorar una dirección inspirada en el country después de una carrera más asociada al R&B y al pop.",
      "El proyecto refleja su voluntad de experimentar con un lenguaje musical diferente manteniendo la composición, la melodía y el soul en el centro.",
      "Es otro capítulo de una carrera que nunca ha estado limitada a una sola función, sonido o área del entretenimiento.",
    ],
    exploreMusic: "Explorar Música",
    independentEyebrow: "Etapa Independiente",
    independentTitle: "Mayor control creativo",
    independentText:
      "Desde 2024, Ne-Yo ha iniciado una nueva etapa como artista independiente, publicando música a través de Compound Entertainment y asumiendo un mayor control creativo sobre su trabajo.",

    beyondEyebrow: "Más Allá de la Música",
    beyondTitle: "Una carrera en distintas áreas del entretenimiento",
    beyondText:
      "Ya sea en el estudio, sobre el escenario, ante las cámaras o detrás de ellas como compositor, Ne-Yo ha construido una carrera marcada por la versatilidad. Papeles como Sage Odom en Step Up: High Water y trabajos en televisión y teatro muestran otra faceta del artista más allá de la música.",
    exploreFilmTv: "Explorar Cine, TV & Escenario",

    exploreEyebrow: "Explorar Su Carrera",
    exploreTitle: "Descubre las distintas facetas de la historia",
    exploreText:
      "La música, las actuaciones, los premios y los grandes momentos de la carrera tienen su propio espacio en Ne-Yo World.",
    cards: [
      { title: "Música", text: "Álbumes, canciones, lanzamientos y evolución musical.", href: "/music" },
      { title: "Cine, TV & Escenario", text: "Actuación, televisión, jurado y teatro.", href: "/film-tv-stage" },
      { title: "Premios & Hitos", text: "Premios, nominaciones y grandes logros.", href: "/awards" },
    ] as CareerCard[],

    officialEyebrow: "Canales Oficiales",
    officialTitle: "Conecta con Ne-Yo",
    officialText: "Sigue a Ne-Yo a través de sus canales y plataformas oficiales.",
    official: "Oficial",

    final: "El artista · La música · El mundo",
    back: "Volver a Ne-Yo World",
    footerCountries: "Países",
    footerMessages: "Mensajes",
    footerAbout: "Acerca de",
  },

  FR: {
    heroFocus: "Musique · Écriture · Performance · Cinéma & TV",
    artistLabel: "L’Artiste",
    career:
      "Chanteur, auteur-compositeur, producteur, interprète et acteur. Une carrière construite par la musique, les histoires et une connexion avec le public du monde entier.",
    roles: ["Chanteur", "Auteur-compositeur", "Producteur", "Interprète", "Acteur"],

    aboutEyebrow: "À propos de Ne-Yo",
    aboutTitle: "Plus qu’une voix",
    aboutParagraphs: [
      "La carrière de Ne-Yo va bien au-delà de ses propres enregistrements. La musique reste au centre, mais l’écriture, la production, la performance et le jeu d’acteur ont également façonné l’artiste.",
      "Sa capacité à réunir mélodie, émotion et narration est devenue l’une des signatures de son travail, dans ses propres chansons comme dans celles écrites pour d’autres artistes.",
      "Au fil des différentes étapes de sa carrière, il a continué d’évoluer sans perdre l’identité musicale et la force d’écriture qui ont connecté son travail au public du monde entier.",
    ],

    songwriterEyebrow: "L’Auteur-compositeur",
    songwriterTitle: "La plume derrière l’artiste",
    songwriterText:
      "L’écriture est une partie essentielle de l’histoire de Ne-Yo. Parallèlement à son propre catalogue, il a écrit des chansons enregistrées par de grands artistes et construit une solide réputation d’auteur-compositeur.",
    songwriterExamples: "Exemples sélectionnés",
    writtenFor: "Écrite pour",

    evolutionEyebrow: "Évolution Artistique",
    evolutionTitle: "Toujours prêt à explorer de nouvelles directions",
    evolutionLead: "Highway 79",
    evolutionParagraphs: [
      "Avec Highway 79, Ne-Yo montre une autre facette de son identité artistique en explorant une direction inspirée par la country après une carrière surtout associée au R&B et à la pop.",
      "Le projet traduit une volonté d’expérimenter un langage musical différent tout en gardant l’écriture, la mélodie et la soul au centre.",
      "C’est un nouveau chapitre d’une carrière qui n’a jamais été limitée à un seul rôle, un seul son ou un seul domaine du divertissement.",
    ],
    exploreMusic: "Explorer la musique",
    independentEyebrow: "Chapitre Indépendant",
    independentTitle: "Une plus grande liberté créative",
    independentText:
      "Depuis 2024, Ne-Yo a ouvert un nouveau chapitre en tant qu’artiste indépendant, publiant sa musique via Compound Entertainment et exerçant un plus grand contrôle créatif sur son travail.",

    beyondEyebrow: "Au-delà de la Musique",
    beyondTitle: "Une carrière à travers le divertissement",
    beyondText:
      "En studio, sur scène, devant la caméra ou en coulisses comme auteur-compositeur, Ne-Yo a construit une carrière marquée par la polyvalence. Des rôles comme Sage Odom dans Step Up: High Water ainsi que son travail à la télévision et au théâtre révèlent une autre facette de l’artiste au-delà de la musique.",
    exploreFilmTv: "Explorer Cinéma, TV & Scène",

    exploreEyebrow: "Explorer Sa Carrière",
    exploreTitle: "Découvrir les différentes facettes de son histoire",
    exploreText:
      "La musique, les performances, les récompenses et les grands moments de carrière disposent chacun de leur propre espace dans Ne-Yo World.",
    cards: [
      { title: "Musique", text: "Albums, chansons, sorties et évolution musicale.", href: "/music" },
      { title: "Cinéma, TV & Scène", text: "Cinéma, télévision, jurys et théâtre.", href: "/film-tv-stage" },
      { title: "Prix & Étapes", text: "Récompenses, nominations et grandes étapes.", href: "/awards" },
    ] as CareerCard[],

    officialEyebrow: "Canaux Officiels",
    officialTitle: "Suivre Ne-Yo",
    officialText: "Suivez Ne-Yo à travers ses canaux et plateformes officiels.",
    official: "Officiel",

    final: "L’artiste · La musique · Le monde",
    back: "Retour à Ne-Yo World",
    footerCountries: "Pays",
    footerMessages: "Messages",
    footerAbout: "À propos",
  },

  DE: {
    heroFocus: "Musik · Komposition · Performance · Film & TV",
    artistLabel: "Der Künstler",
    career:
      "Sänger, Songwriter, Produzent, Interpret und Schauspieler. Eine Karriere geprägt von Musik, Geschichten und der Verbindung mit Menschen weltweit.",
    roles: ["Sänger", "Songwriter", "Produzent", "Interpret", "Schauspieler"],

    aboutEyebrow: "Über Ne-Yo",
    aboutTitle: "Mehr als eine Stimme",
    aboutParagraphs: [
      "Ne-Yos Karriere reicht weit über seine eigenen Aufnahmen hinaus. Musik steht im Zentrum, doch Songwriting, Produktion, Performance und Schauspiel haben den Künstler ebenso geprägt.",
      "Seine Fähigkeit, Melodie, Emotion und Storytelling zu verbinden, wurde zu einem Markenzeichen seiner Arbeit, sowohl in eigenen Songs als auch in Musik für andere Künstler.",
      "In verschiedenen Phasen seiner Karriere hat er sich weiterentwickelt, ohne die musikalische Identität und die Stärke seines Songwritings zu verlieren.",
    ],

    songwriterEyebrow: "Der Songwriter",
    songwriterTitle: "Die Feder hinter dem Künstler",
    songwriterText:
      "Songwriting ist ein wesentlicher Teil von Ne-Yos Geschichte. Parallel zu seinem eigenen Katalog schrieb er Songs für andere große Künstler und etablierte sich als Songwriter.",
    songwriterExamples: "Ausgewählte Beispiele",
    writtenFor: "Geschrieben für",

    evolutionEyebrow: "Künstlerische Entwicklung",
    evolutionTitle: "Immer offen für neue Richtungen",
    evolutionLead: "Highway 79",
    evolutionParagraphs: [
      "Mit Highway 79 zeigt Ne-Yo eine andere Seite seiner Kunst und erkundet nach einer vor allem mit R&B und Pop verbundenen Karriere eine Country-inspirierte Richtung.",
      "Das Projekt zeigt seine Bereitschaft, eine andere musikalische Sprache auszuprobieren und dabei Songwriting, Melodie und Soul im Mittelpunkt zu behalten.",
      "Es ist ein weiteres Kapitel einer Karriere, die nie auf eine einzige Rolle, einen Sound oder einen Bereich der Unterhaltung begrenzt war.",
    ],
    exploreMusic: "Musik entdecken",
    independentEyebrow: "Unabhängiges Kapitel",
    independentTitle: "Mehr kreative Kontrolle",
    independentText:
      "Seit 2024 befindet sich Ne-Yo in einem neuen Kapitel als unabhängiger Künstler, veröffentlicht Musik über Compound Entertainment und übernimmt mehr kreative Kontrolle über seine Arbeit.",

    beyondEyebrow: "Jenseits der Musik",
    beyondTitle: "Eine Karriere in verschiedenen Bereichen",
    beyondText:
      "Ob im Studio, auf der Bühne, vor der Kamera oder hinter den Kulissen als Songwriter: Ne-Yo hat eine vielseitige Karriere aufgebaut. Rollen wie Sage Odom in Step Up: High Water sowie Arbeiten in Fernsehen und Theater zeigen eine weitere Seite des Künstlers jenseits der Musik.",
    exploreFilmTv: "Film, TV & Bühne entdecken",

    exploreEyebrow: "Seine Karriere Entdecken",
    exploreTitle: "Die verschiedenen Seiten der Geschichte",
    exploreText:
      "Musik, Performances, Auszeichnungen und wichtige Karrieremomente haben in Ne-Yo World jeweils ihren eigenen Platz.",
    cards: [
      { title: "Musik", text: "Alben, Songs, Veröffentlichungen und musikalische Entwicklung.", href: "/music" },
      { title: "Film, TV & Bühne", text: "Schauspiel, Fernsehen, Juryrollen und Theater.", href: "/film-tv-stage" },
      { title: "Auszeichnungen & Meilensteine", text: "Auszeichnungen, Nominierungen und wichtige Erfolge.", href: "/awards" },
    ] as CareerCard[],

    officialEyebrow: "Offizielle Kanäle",
    officialTitle: "Mit Ne-Yo verbinden",
    officialText: "Folge Ne-Yo über seine offiziellen Kanäle und Plattformen.",
    official: "Offiziell",

    final: "Der Künstler · Die Musik · Die Welt",
    back: "Zurück zu Ne-Yo World",
    footerCountries: "Länder",
    footerMessages: "Nachrichten",
    footerAbout: "Über",
  },

  IT: {
    heroFocus: "Musica · Scrittura · Performance · Cinema & TV",
    artistLabel: "L’Artista",
    career:
      "Cantante, autore, produttore, interprete e attore. Una carriera costruita attraverso musica, storie e un legame con il pubblico di tutto il mondo.",
    roles: ["Cantante", "Autore", "Produttore", "Interprete", "Attore"],

    aboutEyebrow: "Su Ne-Yo",
    aboutTitle: "Più di una voce",
    aboutParagraphs: [
      "La carriera di Ne-Yo va ben oltre le sue registrazioni. La musica resta al centro, ma scrittura, produzione, performance e recitazione hanno contribuito a definire l’artista.",
      "La capacità di unire melodia, emozione e storytelling è diventata una caratteristica del suo lavoro, nelle proprie canzoni e in quelle scritte per altri artisti.",
      "Nelle diverse fasi della carriera ha continuato a evolversi senza perdere l’identità musicale e la forza della scrittura che hanno connesso il suo lavoro al pubblico di tutto il mondo.",
    ],

    songwriterEyebrow: "L’Autore",
    songwriterTitle: "La penna dietro l’artista",
    songwriterText:
      "La scrittura è una parte essenziale della storia di Ne-Yo. Parallelamente al proprio catalogo, ha scritto canzoni registrate da altri grandi artisti e costruito una forte reputazione come autore.",
    songwriterExamples: "Esempi selezionati",
    writtenFor: "Scritta per",

    evolutionEyebrow: "Evoluzione Artistica",
    evolutionTitle: "Sempre pronto a esplorare nuove direzioni",
    evolutionLead: "Highway 79",
    evolutionParagraphs: [
      "Con Highway 79, Ne-Yo mostra un’altra faccia della propria identità artistica esplorando una direzione ispirata al country dopo una carriera soprattutto associata all’R&B e al pop.",
      "Il progetto riflette la volontà di sperimentare un linguaggio musicale diverso mantenendo scrittura, melodia e soul al centro.",
      "È un altro capitolo di una carriera che non è mai stata limitata a un solo ruolo, un solo sound o una sola area dell’intrattenimento.",
    ],
    exploreMusic: "Esplora la musica",
    independentEyebrow: "Capitolo Indipendente",
    independentTitle: "Maggiore controllo creativo",
    independentText:
      "Dal 2024, Ne-Yo ha iniziato un nuovo capitolo come artista indipendente, pubblicando musica attraverso Compound Entertainment e assumendo un maggiore controllo creativo sul proprio lavoro.",

    beyondEyebrow: "Oltre la Musica",
    beyondTitle: "Una carriera attraverso l’intrattenimento",
    beyondText:
      "In studio, sul palco, davanti alla telecamera o dietro le quinte come autore, Ne-Yo ha costruito una carriera definita dalla versatilità. Ruoli come Sage Odom in Step Up: High Water e lavori in televisione e teatro mostrano un’altra faccia dell’artista oltre la musica.",
    exploreFilmTv: "Esplora Cinema, TV & Palco",

    exploreEyebrow: "Esplora La Carriera",
    exploreTitle: "Scopri i diversi lati della storia",
    exploreText:
      "Musica, performance, premi e grandi momenti della carriera hanno ciascuno il proprio spazio in Ne-Yo World.",
    cards: [
      { title: "Musica", text: "Album, canzoni, uscite ed evoluzione musicale.", href: "/music" },
      { title: "Cinema, TV & Palco", text: "Recitazione, televisione, giuria e teatro.", href: "/film-tv-stage" },
      { title: "Premi & Traguardi", text: "Premi, nomination e grandi traguardi.", href: "/awards" },
    ] as CareerCard[],

    officialEyebrow: "Canali Ufficiali",
    officialTitle: "Segui Ne-Yo",
    officialText: "Segui Ne-Yo attraverso i suoi canali e piattaforme ufficiali.",
    official: "Ufficiale",

    final: "L’artista · La musica · Il mondo",
    back: "Torna a Ne-Yo World",
    footerCountries: "Paesi",
    footerMessages: "Messaggi",
    footerAbout: "Informazioni",
  },

  JA: {
    heroFocus: "音楽 · 作詞作曲 · パフォーマンス · 映画 & TV",
    artistLabel: "アーティスト",
    career:
      "シンガー、ソングライター、プロデューサー、パフォーマー、俳優。音楽、物語、そして世界中の観客とのつながりによって築かれたキャリア。",
    roles: ["シンガー", "ソングライター", "プロデューサー", "パフォーマー", "俳優"],

    aboutEyebrow: "Ne-Yoについて",
    aboutTitle: "声だけではない",
    aboutParagraphs: [
      "Ne-Yoのキャリアは自身のレコーディングだけにとどまりません。音楽を中心に、ソングライティング、プロデュース、パフォーマンス、演技がアーティストとしての姿を形づくってきました。",
      "メロディー、感情、物語を結びつける力は、自身の楽曲でも他のアーティストのために書いた楽曲でも、Ne-Yoの仕事を特徴づけています。",
      "キャリアのさまざまな段階で進化を続けながら、世界中の観客とつながった音楽的アイデンティティとソングライティングの強さを保ってきました。",
    ],

    songwriterEyebrow: "ソングライター",
    songwriterTitle: "アーティストを支えるペン",
    songwriterText:
      "ソングライティングはNe-Yoの物語の重要な部分です。自身の作品を築く一方で、他の著名アーティストが歌う楽曲も手がけ、ソングライターとしての評価を確立しました。",
    songwriterExamples: "主な例",
    writtenFor: "提供アーティスト",

    evolutionEyebrow: "アーティストとしての進化",
    evolutionTitle: "新しい方向を探り続ける",
    evolutionLead: "Highway 79",
    evolutionParagraphs: [
      "Highway 79では、R&Bやポップと強く結びついてきたキャリアの中で、カントリーに影響を受けた新しい方向を探るNe-Yoの別の一面が見られます。",
      "この作品は、ソングライティング、メロディー、ソウルを中心に保ちながら、新しい音楽言語を試す姿勢を示しています。",
      "一つの役割、一つのサウンド、一つのエンターテインメント分野だけに収まらないキャリアの新たな章です。",
    ],
    exploreMusic: "音楽を見る",
    independentEyebrow: "インディペンデントの新章",
    independentTitle: "より大きなクリエイティブコントロール",
    independentText:
      "2024年からNe-Yoはインディペンデントアーティストとして新たな章に入り、Compound Entertainmentを通じて音楽を発表しながら、作品に対するクリエイティブコントロールをより強く持つようになりました。",

    beyondEyebrow: "音楽のその先へ",
    beyondTitle: "エンターテインメントに広がるキャリア",
    beyondText:
      "スタジオ、ステージ、カメラの前、そしてソングライターとして舞台裏でも、Ne-Yoは多面的なキャリアを築いてきました。Step Up: High WaterのSage Odom役やテレビ、舞台での仕事は、音楽以外のアーティストとしての一面を示しています。",
    exploreFilmTv: "映画・TV・舞台を見る",

    exploreEyebrow: "キャリアを探る",
    exploreTitle: "物語のさまざまな側面へ",
    exploreText:
      "音楽、パフォーマンス、受賞歴、重要なキャリアの瞬間には、それぞれNe-Yo World内の専用エリアがあります。",
    cards: [
      { title: "音楽", text: "アルバム、楽曲、リリース、音楽的進化。", href: "/music" },
      { title: "映画・TV・舞台", text: "演技、テレビ、審査員、舞台。", href: "/film-tv-stage" },
      { title: "受賞歴 & マイルストーン", text: "受賞、ノミネート、重要なキャリアの達成。", href: "/awards" },
    ] as CareerCard[],

    officialEyebrow: "公式チャンネル",
    officialTitle: "Ne-Yoをフォロー",
    officialText: "Ne-Yoの公式チャンネルやプラットフォームをフォローできます。",
    official: "公式",

    final: "アーティスト · 音楽 · 世界",
    back: "Ne-Yo Worldに戻る",
    footerCountries: "国々",
    footerMessages: "メッセージ",
    footerAbout: "このプロジェクトについて",
  },
} satisfies Record<Language, any>;

const songwriterExamples = [
  ["Let Me Love You", "Mario"],
  ["Irreplaceable", "Beyoncé"],
  ["Take a Bow", "Rihanna"],
  ["Unfaithful", "Rihanna"],
];

const officialChannels = [
  ["Instagram", "https://www.instagram.com/neyo/"],
  ["TikTok", "https://www.tiktok.com/@neyo"],
  ["YouTube", "https://www.youtube.com/@neyo"],
  ["Facebook", "https://www.facebook.com/NeYo/"],
  ["X", "https://x.com/NeYoCompound"],
  ["Twitch", "https://www.twitch.tv/neyo"],
  ["Kick", "https://kick.com/thegentlemanneyo"],
  ["Official Website", "https://neyothegentleman.com/"],
];

function Eyebrow({
  children,
  gold = false,
}: {
  children: React.ReactNode;
  gold?: boolean;
}) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${
        gold ? "text-[#D4AF37]" : "text-[#D51C24]"
      }`}
    >
      {children}
    </p>
  );
}

export default function NeYoPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[5%] h-[650px] w-[650px] rounded-full bg-[#D51C24]/5 blur-[210px]" />
        <div className="absolute right-[-10%] top-[12%] h-[700px] w-[700px] rounded-full bg-[#D4AF37]/5 blur-[230px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.88)_100%)]" />
      </div>

      <SiteHeader />

      {/* HERO */}
      <section className="relative z-10 px-6 pb-20 pt-16 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <Eyebrow gold>{t.artistLabel}</Eyebrow>

              <h1 className="mt-5 text-5xl font-black uppercase tracking-[-0.05em] md:text-6xl">
                Ne-Yo
              </h1>

              <p className="mt-7 max-w-[720px] text-[16px] leading-8 text-white/60 md:text-[18px]">
                {t.career}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                {t.roles.map((role: string, index: number) => (
                  <div key={role} className="flex items-center gap-4">
                    {index > 0 && (
                      <span className="text-[#D4AF37]/40">•</span>
                    )}
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[24px] bg-[#D4AF37]/5 blur-[70px]" />

              <div className="relative overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#090A0B]/95 p-8">
                <div className="absolute right-[-70px] top-[-70px] h-[200px] w-[200px] rounded-full border border-[#D51C24]/15" />

                <p className="text-[10px] uppercase tracking-[0.28em] text-[#D51C24]">
                  Ne-Yo World
                </p>

                <h2 className="mt-4 text-2xl font-semibold">
                  {t.heroFocus}
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/45">
                  {t.aboutParagraphs[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE FEATURE */}
      <section className="relative z-10 px-6 pb-12 pt-2 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <a
            href="https://www.youtube.com/watch?v=vR6_ZVKEhJ4"
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto block w-full max-w-[680px] overflow-hidden rounded-[22px] border border-[#D4AF37]/18 bg-[#090A0B] transition hover:border-[#D4AF37]/45"
            aria-label="Ne-Yo: Tiny Desk Concert · NPR Music"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              <img
                src="https://i.ytimg.com/vi/vR6_ZVKEhJ4/maxresdefault.jpg"
                alt="Ne-Yo performing at NPR Music Tiny Desk"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/65 text-lg text-white backdrop-blur-sm transition group-hover:scale-105">
                  ▶
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 pt-16">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Ne-Yo · Live Performance
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/65">
                  Tiny Desk Concert · NPR Music · 2024 ↗
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Eyebrow>{t.aboutEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {t.aboutTitle}
            </h2>
          </div>

          <div className="space-y-6 text-sm leading-8 text-white/50 md:text-[15px]">
            {t.aboutParagraphs.map((paragraph: string) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* SONGWRITER */}
      <section className="relative z-10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1250px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{t.songwriterEyebrow}</Eyebrow>

              <h2 className="mt-4 max-w-[460px] text-3xl font-bold md:text-4xl">
                {t.songwriterTitle}
              </h2>

              <p className="mt-6 max-w-[480px] text-sm leading-8 text-white/45">
                {t.songwriterText}
              </p>
            </div>

            <div>
              <p className="mb-4 text-[9px] uppercase tracking-[0.22em] text-[#D4AF37]">
                {t.songwriterExamples}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {songwriterExamples.map(([song, artist]) => (
                  <div
                    key={`${song}-${artist}`}
                    className="rounded-xl border border-[#D4AF37]/12 bg-[#090A0B] px-5 py-4"
                  >
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#D51C24]">
                      {t.writtenFor}
                    </p>

                    <div className="mt-3 flex items-end justify-between gap-4">
                      <h3 className="text-base font-semibold">{song}</h3>
                      <span className="text-[9px] uppercase tracking-[0.14em] text-[#D4AF37]">
                        {artist}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTISTIC EVOLUTION / HIGHWAY 79 */}
      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#050607] p-8">
            <div className="pointer-events-none absolute right-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />

            <div className="relative z-10 grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <Eyebrow gold>{t.evolutionEyebrow}</Eyebrow>

                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  {t.evolutionTitle}
                </h2>

                <p className="mt-6 text-2xl font-black uppercase tracking-[-0.03em] text-[#D51C24]">
                  {t.evolutionLead}
                </p>
              </div>

              <div>
                <div className="space-y-5 text-sm leading-8 text-white/50 md:text-[15px]">
                  {t.evolutionParagraphs.map((paragraph: string) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <a
                  href="/music"
                  className="mt-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37] transition hover:text-white"
                >
                  {t.exploreMusic} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDEPENDENT CHAPTER */}
      <section className="relative z-10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid items-center gap-10 rounded-[24px] border border-[#D4AF37]/15 bg-[#090A0B] p-6 md:p-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <Eyebrow>{t.independentEyebrow}</Eyebrow>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                {t.independentTitle}
              </h2>
            </div>

            <p className="text-sm leading-8 text-white/50 md:text-[15px]">
              {t.independentText}
            </p>
          </div>
        </div>
      </section>

      {/* BEYOND MUSIC */}
      <section className="relative z-10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>{t.beyondEyebrow}</Eyebrow>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                {t.beyondTitle}
              </h2>
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6 md:p-8">
              <p className="text-sm leading-8 text-white/50">
                {t.beyondText}
              </p>

              <a
                href="/film-tv-stage"
                className="mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37] transition hover:text-white"
              >
                {t.exploreFilmTv} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE CAREER */}
      <section className="relative z-10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <Eyebrow gold>{t.officialEyebrow}</Eyebrow>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {t.officialTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-[600px] text-sm leading-7 text-white/45">
              {t.officialText}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {officialChannels.map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-[#D4AF37]/12 bg-[#090A0B] px-5 py-4 transition hover:border-[#D4AF37]/45"
              >
                <div>
                  <h3 className="text-sm font-semibold">{name}</h3>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-[#D4AF37]/55">
                    {t.official}
                  </p>
                </div>

                <span className="text-[#D51C24] transition group-hover:text-[#D4AF37]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICIAL CHANNELS */}
      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <Eyebrow gold>{t.exploreEyebrow}</Eyebrow>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {t.exploreTitle}
            </h2>

            <p className="mx-auto mt-5 max-w-[700px] text-sm leading-7 text-white/45">
              {t.exploreText}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[940px] gap-4 md:grid-cols-3">
            {t.cards.map((card: CareerCard) => (
              <a
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-[#D4AF37]/15 bg-[#050607] p-6 transition hover:-translate-y-1 hover:border-[#D4AF37]/45"
              >
                <h3 className="text-lg font-semibold">{card.title}</h3>

                <p className="mt-4 min-h-[72px] text-sm leading-6 text-white/40">
                  {card.text}
                </p>

                <span className="mt-5 inline-block text-[#D4AF37] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="relative z-10 border-t border-[#D4AF37]/10 px-6 py-20 text-center lg:px-10">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]">
            Ne-Yo World
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:whitespace-nowrap md:text-4xl">
            {t.final}
          </h2>

          <a
            href="/"
            className="mt-9 inline-flex items-center gap-4 rounded-xl border border-[#D4AF37]/45 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#D51C24]"
          >
            {t.back}
            <span className="text-[#D4AF37]">→</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#D4AF37]/10 bg-black px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 sm:flex-row">
          <a href="/">
            <img
              src="/ne-yo-world-logo.png.png"
              alt="Ne-Yo World"
              className="h-[60px] w-auto object-contain"
            />
          </a>

          <div className="flex items-center gap-6 text-[9px] uppercase tracking-[0.18em] text-white/30">
            <a href="/countries" className="hover:text-[#D4AF37]">
              {t.footerCountries}
            </a>

            <a href="/messages" className="hover:text-[#D4AF37]">
              {t.footerMessages}
            </a>

            <a href="/about" className="hover:text-[#D4AF37]">
              {t.footerAbout}
            </a>
          </div>

          <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
            Ne-Yo
          </p>
        </div>
      </footer>
    </main>
  );
}
