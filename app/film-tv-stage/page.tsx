"use client";

import { useLanguage, type Language } from "../context/LanguageContext";

type FilmCredit = {
  year: string;
  title: string;
  role: string;
};

type TvCredit = {
  year: string;
  title: string;
  detail: string;
};

const translations = {
  EN: {
    heroEyebrow: "Film · Television · Stage",
    heroTitle: "Beyond the music",
    heroText:
      "Ne-Yo's career has also moved across acting, television, competition shows and live theatre, revealing another side of the performer beyond the recording studio.",
    heroMeta: ["Acting", "Television", "Competition", "Stage"],

    actingEyebrow: "Acting",
    actingTitle: "From film roles to a major television character",
    actingText:
      "Ne-Yo has appeared in film and television throughout his career. Step Up: High Water became his most sustained acting role, with Sage Odom at the centre of the series across all three seasons.",

    stepLabel: "Featured Role",
    stepTitle: "Step Up: High Water",
    stepRole: "Sage Odom",
    stepMeta: "2018–2022 · 3 seasons · 30 episodes",
    stepText:
      "Sage Odom is the legendary founder of Atlanta's High Water Performing Arts School. Ne-Yo played the character across the full three-season run, making it one of the most substantial acting commitments of his career.",

    filmographyTitle: "Selected acting credits",
    filmographyText:
      "A selection of film and television acting roles from different stages of his career.",

    televisionEyebrow: "Television",
    televisionTitle: "Judge, contestant and television personality",
    televisionText:
      "Television has become another recurring part of Ne-Yo's public career, from four seasons at the judges' table on World of Dance to competition formats and entertainment appearances.",

    wodTitle: "World of Dance",
    wodMeta: "2017–2020 · Judge · 4 seasons",
    wodText:
      "Ne-Yo served as a main judge alongside Jennifer Lopez and Derek Hough throughout the four-season run of NBC's dance competition.",

    danceTitle: "Dance Monsters",
    danceMeta: "2022 · Judge · Netflix",
    danceText:
      "Ne-Yo joined Lele Pons and Ashley Banjo on the judging panel of Netflix's dance competition, hosted by Ashley Roberts.",

    maskedEyebrow: "The Masked Singer",
    maskedTitle: "From runner-up to winner",
    maskedIntro:
      "Ne-Yo competed in two different versions of The Masked Singer, producing two very different finishes.",
    badgerTitle: "Badger",
    badgerMeta: "UK · Series 2 · 2021",
    badgerText:
      "Ne-Yo was revealed as Badger in the British series and finished as runner-up behind Joss Stone as Sausage.",
    cowTitle: "Cow",
    cowMeta: "US · Season 10 · 2023",
    cowText:
      "Two years later, Ne-Yo returned to the format in the United States as Cow and won the tenth season.",

    appearancesEyebrow: "TV Appearances",
    appearancesTitle: "Entertainment and game shows",
    appearancesText:
      "Alongside judging and competition roles, Ne-Yo has appeared as himself in entertainment and game-show formats.",

    stageEyebrow: "Stage & Theatre",
    stageTitle: "From live television to Broadway",
    stageText:
      "Live performance has also taken Ne-Yo into musical theatre, first through a major live television production and later to Broadway.",

    wizTitle: "The Wiz Live!",
    wizMeta: "2015 · Tin Man · NBC",
    wizText:
      "Ne-Yo played the Tin Man in NBC's live television musical, combining acting, singing and performance in a major live production.",

    hellTitle: "Hell's Kitchen",
    hellMeta: "2025–2026 · Davis · Broadway debut",
    hellText:
      "Ne-Yo made his Broadway debut as Davis in Hell's Kitchen, the Alicia Keys musical at the Shubert Theatre, beginning in December 2025 and returning in January 2026.",

    exploreEyebrow: "Continue Exploring",
    exploreTitle: "More of Ne-Yo's career",
    neyo: "Ne-Yo",
    neyoText: "Return to the main artist profile.",
    music: "Music",
    musicText: "Explore albums, songs and musical evolution.",
    awards: "Awards & Milestones",
    awardsText: "Awards, nominations and major career achievements.",

    stepVideoLabel: "Official Step Up: High Water trailer · YouTube",
    officialChannelLabel: "NE-YO Official Artist Channel · YouTube ↗",
    runnerUp: "Runner-up",
    winner: "Winner",
    maskedUkLabel: "The Masked Singer UK · YouTube ↗",
    maskedUsLabel: "The Masked Singer · YouTube ↗",
    broadwayAnnouncement: "Official Broadway announcement · Shubert Organization ↗",
    footerCountries: "Countries",
    footerMessages: "Messages",
    footerAbout: "About",
  },

  PT: {
    heroEyebrow: "Cinema · Televisão · Palco",
    heroTitle: "Para além da música",
    heroText:
      "A carreira de Ne-Yo também passou pela representação, televisão, programas de competição e teatro, mostrando outra faceta do artista para além do estúdio.",
    heroMeta: ["Representação", "Televisão", "Competições", "Palco"],

    actingEyebrow: "Representação",
    actingTitle: "Dos filmes a uma personagem central na televisão",
    actingText:
      "Ne-Yo participou em cinema e televisão ao longo da carreira. Step Up: High Water tornou-se o seu trabalho de representação mais prolongado, com Sage Odom no centro da série durante as três temporadas.",

    stepLabel: "Papel em Destaque",
    stepTitle: "Step Up: High Water",
    stepRole: "Sage Odom",
    stepMeta: "2018–2022 · 3 temporadas · 30 episódios",
    stepText:
      "Sage Odom é o lendário fundador da High Water Performing Arts School, em Atlanta. Ne-Yo interpretou a personagem ao longo das três temporadas, tornando este num dos trabalhos de representação de maior dimensão da sua carreira.",

    filmographyTitle: "Papéis selecionados",
    filmographyText:
      "Uma seleção de papéis em cinema e televisão de diferentes fases da carreira.",

    televisionEyebrow: "Televisão",
    televisionTitle: "Jurado, concorrente e personalidade televisiva",
    televisionText:
      "A televisão tornou-se outra presença recorrente na carreira pública de Ne-Yo, desde quatro temporadas como jurado de World of Dance a concursos e programas de entretenimento.",

    wodTitle: "World of Dance",
    wodMeta: "2017–2020 · Jurado · 4 temporadas",
    wodText:
      "Ne-Yo foi jurado principal ao lado de Jennifer Lopez e Derek Hough durante as quatro temporadas do concurso de dança da NBC.",

    danceTitle: "Dance Monsters",
    danceMeta: "2022 · Jurado · Netflix",
    danceText:
      "Ne-Yo integrou o painel de jurados com Lele Pons e Ashley Banjo no concurso de dança da Netflix, apresentado por Ashley Roberts.",

    maskedEyebrow: "The Masked Singer",
    maskedTitle: "De segundo lugar a vencedor",
    maskedIntro:
      "Ne-Yo participou em duas versões diferentes de The Masked Singer, com dois resultados muito diferentes.",
    badgerTitle: "Badger",
    badgerMeta: "Reino Unido · Série 2 · 2021",
    badgerText:
      "Ne-Yo foi revelado como Badger na versão britânica e terminou em segundo lugar, atrás de Joss Stone como Sausage.",
    cowTitle: "Cow",
    cowMeta: "Estados Unidos · Temporada 10 · 2023",
    cowText:
      "Dois anos depois, regressou ao formato nos Estados Unidos como Cow e venceu a décima temporada.",

    appearancesEyebrow: "Participações na TV",
    appearancesTitle: "Entretenimento e concursos televisivos",
    appearancesText:
      "Para além de jurado e concorrente, Ne-Yo também participou como ele próprio em programas de entretenimento e jogos televisivos.",

    stageEyebrow: "Palco e Teatro",
    stageTitle: "Da televisão em direto à Broadway",
    stageText:
      "As atuações ao vivo também levaram Ne-Yo ao teatro musical, primeiro numa grande produção televisiva em direto e mais tarde a um palco da Broadway.",

    wizTitle: "The Wiz Live!",
    wizMeta: "2015 · Tin Man · NBC",
    wizText:
      "Ne-Yo interpretou Tin Man no musical televisivo em direto da NBC, juntando representação, canto e atuação numa grande produção ao vivo.",

    hellTitle: "Hell's Kitchen",
    hellMeta: "2025–2026 · Davis · estreia na Broadway",
    hellText:
      "Ne-Yo estreou-se na Broadway como Davis em Hell's Kitchen, o musical de Alicia Keys no Shubert Theatre, começando em dezembro de 2025 e regressando em janeiro de 2026.",

    exploreEyebrow: "Continuar a Explorar",
    exploreTitle: "Mais da carreira de Ne-Yo",
    neyo: "Ne-Yo",
    neyoText: "Voltar ao perfil principal do artista.",
    music: "Música",
    musicText: "Explorar álbuns, músicas e evolução musical.",
    awards: "Prémios e Marcos",
    awardsText: "Prémios, nomeações e grandes conquistas da carreira.",

    stepVideoLabel: "Trailer oficial de Step Up: High Water · YouTube",
    officialChannelLabel: "Canal Oficial de Artista de NE-YO · YouTube ↗",
    runnerUp: "2.º lugar",
    winner: "Vencedor",
    maskedUkLabel: "The Masked Singer Reino Unido · YouTube ↗",
    maskedUsLabel: "The Masked Singer · YouTube ↗",
    broadwayAnnouncement: "Anúncio oficial da Broadway · Shubert Organization ↗",
    footerCountries: "Países",
    footerMessages: "Mensagens",
    footerAbout: "Sobre",
  },

  ES: {
    heroEyebrow: "Cine · Televisión · Escenario",
    heroTitle: "Más allá de la música",
    heroText:
      "La carrera de Ne-Yo también se ha extendido a la actuación, la televisión, los concursos y el teatro, mostrando otra faceta del artista fuera del estudio.",
    heroMeta: ["Actuación", "Televisión", "Concursos", "Escenario"],

    actingEyebrow: "Actuación",
    actingTitle: "Del cine a un personaje central en televisión",
    actingText:
      "Ne-Yo ha participado en cine y televisión durante su carrera. Step Up: High Water se convirtió en su trabajo interpretativo más prolongado, con Sage Odom en el centro de la serie durante tres temporadas.",

    stepLabel: "Papel Destacado",
    stepTitle: "Step Up: High Water",
    stepRole: "Sage Odom",
    stepMeta: "2018–2022 · 3 temporadas · 30 episodios",
    stepText:
      "Sage Odom es el legendario fundador de High Water Performing Arts School en Atlanta. Ne-Yo interpretó al personaje durante toda la serie, uno de sus compromisos interpretativos más importantes.",

    filmographyTitle: "Papeles seleccionados",
    filmographyText: "Una selección de trabajos de cine y televisión de distintas etapas de su carrera.",

    televisionEyebrow: "Televisión",
    televisionTitle: "Jurado, concursante y personalidad televisiva",
    televisionText:
      "La televisión es otra parte recurrente de la carrera pública de Ne-Yo, desde cuatro temporadas como jurado de World of Dance hasta concursos y programas de entretenimiento.",

    wodTitle: "World of Dance",
    wodMeta: "2017–2020 · Jurado · 4 temporadas",
    wodText:
      "Ne-Yo fue jurado principal junto a Jennifer Lopez y Derek Hough durante las cuatro temporadas del concurso de danza de NBC.",

    danceTitle: "Dance Monsters",
    danceMeta: "2022 · Jurado · Netflix",
    danceText:
      "Ne-Yo formó parte del jurado junto a Lele Pons y Ashley Banjo en el concurso de danza de Netflix, presentado por Ashley Roberts.",

    maskedEyebrow: "The Masked Singer",
    maskedTitle: "De subcampeón a ganador",
    maskedIntro:
      "Ne-Yo participó en dos versiones distintas de The Masked Singer y obtuvo dos resultados diferentes.",
    badgerTitle: "Badger",
    badgerMeta: "Reino Unido · Serie 2 · 2021",
    badgerText:
      "Ne-Yo fue revelado como Badger en la versión británica y terminó segundo, detrás de Joss Stone como Sausage.",
    cowTitle: "Cow",
    cowMeta: "Estados Unidos · Temporada 10 · 2023",
    cowText:
      "Dos años después regresó al formato en Estados Unidos como Cow y ganó la décima temporada.",

    appearancesEyebrow: "Apariciones en TV",
    appearancesTitle: "Entretenimiento y concursos",
    appearancesText:
      "Además de ser jurado y concursante, Ne-Yo también ha participado como él mismo en programas de entretenimiento y juegos.",

    stageEyebrow: "Escenario y Teatro",
    stageTitle: "De la televisión en directo a Broadway",
    stageText:
      "Las actuaciones en directo también llevaron a Ne-Yo al teatro musical, primero en una gran producción televisiva y después a Broadway.",

    wizTitle: "The Wiz Live!",
    wizMeta: "2015 · Tin Man · NBC",
    wizText:
      "Ne-Yo interpretó al Tin Man en el musical televisivo en directo de NBC, combinando actuación, canto e interpretación.",
    hellTitle: "Hell's Kitchen",
    hellMeta: "2025–2026 · Davis · debut en Broadway",
    hellText:
      "Ne-Yo debutó en Broadway como Davis en Hell's Kitchen, el musical de Alicia Keys en el Shubert Theatre, desde diciembre de 2025 y de nuevo en enero de 2026.",

    exploreEyebrow: "Seguir Explorando",
    exploreTitle: "Más de la carrera de Ne-Yo",
    neyo: "Ne-Yo", neyoText: "Volver al perfil principal del artista.",
    music: "Música", musicText: "Explorar álbumes, canciones y evolución musical.",
    awards: "Premios e Hitos", awardsText: "Premios, nominaciones y grandes logros.",

    stepVideoLabel: "Tráiler oficial de Step Up: High Water · YouTube",
    officialChannelLabel: "Canal Oficial de Artista de NE-YO · YouTube ↗",
    runnerUp: "Subcampeón",
    winner: "Ganador",
    maskedUkLabel: "The Masked Singer Reino Unido · YouTube ↗",
    maskedUsLabel: "The Masked Singer · YouTube ↗",
    broadwayAnnouncement: "Anuncio oficial de Broadway · Shubert Organization ↗",
    footerCountries: "Países", footerMessages: "Mensajes", footerAbout: "Acerca de",
  },

  FR: {
    heroEyebrow: "Cinéma · Télévision · Scène",
    heroTitle: "Au-delà de la musique",
    heroText:
      "La carrière de Ne-Yo s'étend aussi au cinéma, à la télévision, aux compétitions et au théâtre, révélant une autre facette de l’artiste au-delà du studio.",
    heroMeta: ["Cinéma", "Télévision", "Compétitions", "Scène"],

    actingEyebrow: "Jeu d’acteur",
    actingTitle: "Du cinéma à un personnage majeur de télévision",
    actingText:
      "Ne-Yo apparaît au cinéma et à la télévision depuis différentes étapes de sa carrière. Step Up: High Water est devenu son rôle le plus durable, avec Sage Odom au cœur de la série pendant trois saisons.",

    stepLabel: "Rôle en Vedette", stepTitle: "Step Up: High Water", stepRole: "Sage Odom",
    stepMeta: "2018–2022 · 3 saisons · 30 épisodes",
    stepText:
      "Sage Odom est le fondateur légendaire de High Water Performing Arts School à Atlanta. Ne-Yo incarne ce personnage pendant toute la série, l’un de ses engagements d’acteur les plus importants.",
    filmographyTitle: "Rôles sélectionnés",
    filmographyText: "Une sélection de rôles au cinéma et à la télévision à différents moments de sa carrière.",

    televisionEyebrow: "Télévision",
    televisionTitle: "Juge, candidat et personnalité télévisée",
    televisionText:
      "La télévision est devenue une présence régulière dans la carrière publique de Ne-Yo, de quatre saisons comme juge de World of Dance aux concours et émissions de divertissement.",
    wodTitle: "World of Dance", wodMeta: "2017–2020 · Juge · 4 saisons",
    wodText: "Ne-Yo a été juge principal aux côtés de Jennifer Lopez et Derek Hough pendant les quatre saisons du concours de danse de NBC.",
    danceTitle: "Dance Monsters", danceMeta: "2022 · Juge · Netflix",
    danceText: "Ne-Yo a rejoint Lele Pons et Ashley Banjo au jury du concours de danse Netflix présenté par Ashley Roberts.",

    maskedEyebrow: "The Masked Singer", maskedTitle: "De finaliste à vainqueur",
    maskedIntro: "Ne-Yo a participé à deux versions de The Masked Singer avec deux résultats très différents.",
    badgerTitle: "Badger", badgerMeta: "Royaume-Uni · Série 2 · 2021",
    badgerText: "Révélé sous le costume de Badger, Ne-Yo termine deuxième derrière Joss Stone, Sausage.",
    cowTitle: "Cow", cowMeta: "États-Unis · Saison 10 · 2023",
    cowText: "Deux ans plus tard, il revient au format américain en Cow et remporte la dixième saison.",

    appearancesEyebrow: "Apparitions TV", appearancesTitle: "Divertissement et jeux télévisés",
    appearancesText: "En plus de ses rôles de juge et candidat, Ne-Yo apparaît aussi comme lui-même dans des émissions de divertissement et des jeux télévisés.",

    stageEyebrow: "Scène et Théâtre", stageTitle: "De la télévision en direct à Broadway",
    stageText: "La scène a également conduit Ne-Yo vers le théâtre musical, d’abord à la télévision puis sur une scène de Broadway.",
    wizTitle: "The Wiz Live!", wizMeta: "2015 · Tin Man · NBC",
    wizText: "Ne-Yo interprète Tin Man dans la comédie musicale télévisée en direct de NBC, réunissant jeu, chant et performance.",
    hellTitle: "Hell's Kitchen", hellMeta: "2025–2026 · Davis · débuts à Broadway",
    hellText: "Ne-Yo fait ses débuts à Broadway dans le rôle de Davis dans Hell's Kitchen, la comédie musicale d’Alicia Keys au Shubert Theatre, en décembre 2025 puis en janvier 2026.",

    exploreEyebrow: "Continuer l’Exploration", exploreTitle: "Plus de la carrière de Ne-Yo",
    neyo: "Ne-Yo", neyoText: "Retourner au profil principal de l’artiste.",
    music: "Musique", musicText: "Explorer les albums, chansons et l’évolution musicale.",
    awards: "Prix et Jalons", awardsText: "Récompenses, nominations et grands accomplissements.",

    stepVideoLabel: "Bande-annonce officielle de Step Up: High Water · YouTube",
    officialChannelLabel: "Chaîne officielle de l’artiste NE-YO · YouTube ↗",
    runnerUp: "Deuxième place",
    winner: "Vainqueur",
    maskedUkLabel: "The Masked Singer Royaume-Uni · YouTube ↗",
    maskedUsLabel: "The Masked Singer · YouTube ↗",
    broadwayAnnouncement: "Annonce officielle de Broadway · Shubert Organization ↗",
    footerCountries: "Pays", footerMessages: "Messages", footerAbout: "À propos",
  },

  DE: {
    heroEyebrow: "Film · Fernsehen · Bühne",
    heroTitle: "Jenseits der Musik",
    heroText:
      "Ne-Yos Karriere umfasst auch Schauspiel, Fernsehen, Wettbewerbsformate und Theater und zeigt eine weitere Seite des Künstlers außerhalb des Studios.",
    heroMeta: ["Schauspiel", "Fernsehen", "Wettbewerb", "Bühne"],

    actingEyebrow: "Schauspiel",
    actingTitle: "Von Filmrollen zu einer zentralen TV-Figur",
    actingText:
      "Ne-Yo trat im Lauf seiner Karriere in Film und Fernsehen auf. Step Up: High Water wurde seine dauerhafteste Schauspielrolle, mit Sage Odom im Zentrum aller drei Staffeln.",
    stepLabel: "Hervorgehobene Rolle", stepTitle: "Step Up: High Water", stepRole: "Sage Odom",
    stepMeta: "2018–2022 · 3 Staffeln · 30 Episoden",
    stepText:
      "Sage Odom ist der legendäre Gründer der High Water Performing Arts School in Atlanta. Ne-Yo spielte die Figur über die gesamte Serie hinweg und übernahm damit eine seiner umfangreichsten Schauspielrollen.",
    filmographyTitle: "Ausgewählte Schauspielrollen",
    filmographyText: "Eine Auswahl von Film- und Fernsehrollen aus verschiedenen Phasen seiner Karriere.",

    televisionEyebrow: "Fernsehen", televisionTitle: "Juror, Kandidat und TV-Persönlichkeit",
    televisionText:
      "Fernsehen ist ein wiederkehrender Teil von Ne-Yos öffentlicher Karriere, von vier Staffeln als Juror bei World of Dance bis zu Wettbewerbs- und Unterhaltungsshows.",
    wodTitle: "World of Dance", wodMeta: "2017–2020 · Juror · 4 Staffeln",
    wodText: "Ne-Yo war gemeinsam mit Jennifer Lopez und Derek Hough in allen vier Staffeln Juror des NBC-Tanzwettbewerbs.",
    danceTitle: "Dance Monsters", danceMeta: "2022 · Juror · Netflix",
    danceText: "Ne-Yo gehörte mit Lele Pons und Ashley Banjo zur Jury des Netflix-Tanzwettbewerbs, moderiert von Ashley Roberts.",

    maskedEyebrow: "The Masked Singer", maskedTitle: "Vom Zweitplatzierten zum Gewinner",
    maskedIntro: "Ne-Yo nahm an zwei verschiedenen Versionen von The Masked Singer teil und erzielte zwei unterschiedliche Ergebnisse.",
    badgerTitle: "Badger", badgerMeta: "UK · Staffel 2 · 2021",
    badgerText: "Als Badger wurde Ne-Yo Zweiter hinter Joss Stone als Sausage.",
    cowTitle: "Cow", cowMeta: "USA · Staffel 10 · 2023",
    cowText: "Zwei Jahre später kehrte er in der US-Version als Cow zurück und gewann die zehnte Staffel.",

    appearancesEyebrow: "TV-Auftritte", appearancesTitle: "Unterhaltung und Gameshows",
    appearancesText: "Neben Jury- und Wettbewerbsrollen trat Ne-Yo auch als er selbst in Unterhaltungs- und Gameshow-Formaten auf.",

    stageEyebrow: "Bühne und Theater", stageTitle: "Vom Live-Fernsehen zum Broadway",
    stageText: "Live-Performance führte Ne-Yo auch ins Musiktheater, zunächst in einer großen TV-Liveproduktion und später auf eine Broadway-Bühne.",
    wizTitle: "The Wiz Live!", wizMeta: "2015 · Tin Man · NBC",
    wizText: "Ne-Yo spielte Tin Man im NBC-Live-Musical und verband Schauspiel, Gesang und Performance.",
    hellTitle: "Hell's Kitchen", hellMeta: "2025–2026 · Davis · Broadway-Debüt",
    hellText: "Ne-Yo gab als Davis in Hell's Kitchen, dem Alicia-Keys-Musical im Shubert Theatre, im Dezember 2025 sein Broadway-Debüt und kehrte im Januar 2026 zurück.",

    exploreEyebrow: "Weiter Entdecken", exploreTitle: "Mehr von Ne-Yos Karriere",
    neyo: "Ne-Yo", neyoText: "Zurück zum Hauptprofil des Künstlers.",
    music: "Musik", musicText: "Alben, Songs und musikalische Entwicklung entdecken.",
    awards: "Auszeichnungen und Meilensteine", awardsText: "Auszeichnungen, Nominierungen und wichtige Erfolge.",

    stepVideoLabel: "Offizieller Trailer zu Step Up: High Water · YouTube",
    officialChannelLabel: "Offizieller Künstlerkanal von NE-YO · YouTube ↗",
    runnerUp: "Zweiter Platz",
    winner: "Gewinner",
    maskedUkLabel: "The Masked Singer Vereinigtes Königreich · YouTube ↗",
    maskedUsLabel: "The Masked Singer · YouTube ↗",
    broadwayAnnouncement: "Offizielle Broadway-Ankündigung · Shubert Organization ↗",
    footerCountries: "Länder", footerMessages: "Nachrichten", footerAbout: "Über",
  },

  IT: {
    heroEyebrow: "Cinema · Televisione · Palco",
    heroTitle: "Oltre la musica",
    heroText:
      "La carriera di Ne-Yo comprende anche recitazione, televisione, competizioni e teatro, mostrando un’altra dimensione dell’artista oltre lo studio di registrazione.",
    heroMeta: ["Recitazione", "Televisione", "Competizioni", "Palco"],

    actingEyebrow: "Recitazione", actingTitle: "Dai film a un personaggio centrale in TV",
    actingText:
      "Ne-Yo è apparso in cinema e televisione in varie fasi della carriera. Step Up: High Water è diventato il suo ruolo più continuativo, con Sage Odom al centro della serie per tre stagioni.",
    stepLabel: "Ruolo in Evidenza", stepTitle: "Step Up: High Water", stepRole: "Sage Odom",
    stepMeta: "2018–2022 · 3 stagioni · 30 episodi",
    stepText:
      "Sage Odom è il leggendario fondatore della High Water Performing Arts School di Atlanta. Ne-Yo ha interpretato il personaggio per tutta la serie, uno dei suoi impegni di recitazione più importanti.",
    filmographyTitle: "Ruoli selezionati", filmographyText: "Una selezione di ruoli cinematografici e televisivi di diverse fasi della carriera.",

    televisionEyebrow: "Televisione", televisionTitle: "Giudice, concorrente e volto televisivo",
    televisionText:
      "La televisione è diventata una presenza ricorrente nella carriera pubblica di Ne-Yo, dalle quattro stagioni come giudice di World of Dance ai programmi di competizione e intrattenimento.",
    wodTitle: "World of Dance", wodMeta: "2017–2020 · Giudice · 4 stagioni",
    wodText: "Ne-Yo è stato giudice principale insieme a Jennifer Lopez e Derek Hough per tutte e quattro le stagioni del concorso NBC.",
    danceTitle: "Dance Monsters", danceMeta: "2022 · Giudice · Netflix",
    danceText: "Ne-Yo ha fatto parte della giuria con Lele Pons e Ashley Banjo nel concorso di danza Netflix condotto da Ashley Roberts.",

    maskedEyebrow: "The Masked Singer", maskedTitle: "Da secondo classificato a vincitore",
    maskedIntro: "Ne-Yo ha partecipato a due versioni diverse di The Masked Singer con risultati differenti.",
    badgerTitle: "Badger", badgerMeta: "Regno Unito · Serie 2 · 2021",
    badgerText: "Ne-Yo è stato rivelato come Badger e ha concluso al secondo posto dietro Joss Stone, Sausage.",
    cowTitle: "Cow", cowMeta: "Stati Uniti · Stagione 10 · 2023",
    cowText: "Due anni dopo è tornato nel formato americano come Cow e ha vinto la decima stagione.",

    appearancesEyebrow: "Apparizioni TV", appearancesTitle: "Intrattenimento e game show",
    appearancesText: "Oltre a essere giudice e concorrente, Ne-Yo è apparso come se stesso in programmi di intrattenimento e game show.",

    stageEyebrow: "Palco e Teatro", stageTitle: "Dalla TV in diretta a Broadway",
    stageText: "La performance dal vivo ha portato Ne-Yo anche nel teatro musicale, prima in una grande produzione TV e poi a Broadway.",
    wizTitle: "The Wiz Live!", wizMeta: "2015 · Tin Man · NBC",
    wizText: "Ne-Yo ha interpretato Tin Man nel musical televisivo dal vivo della NBC, unendo recitazione, canto e performance.",
    hellTitle: "Hell's Kitchen", hellMeta: "2025–2026 · Davis · debutto a Broadway",
    hellText: "Ne-Yo ha debuttato a Broadway come Davis in Hell's Kitchen, il musical di Alicia Keys allo Shubert Theatre, nel dicembre 2025 e di nuovo nel gennaio 2026.",

    exploreEyebrow: "Continua a Esplorare", exploreTitle: "Altro della carriera di Ne-Yo",
    neyo: "Ne-Yo", neyoText: "Torna al profilo principale dell’artista.",
    music: "Musica", musicText: "Esplora album, canzoni ed evoluzione musicale.",
    awards: "Premi e Traguardi", awardsText: "Premi, nomination e grandi traguardi.",

    stepVideoLabel: "Trailer ufficiale di Step Up: High Water · YouTube",
    officialChannelLabel: "Canale ufficiale dell’artista NE-YO · YouTube ↗",
    runnerUp: "Secondo posto",
    winner: "Vincitore",
    maskedUkLabel: "The Masked Singer Regno Unito · YouTube ↗",
    maskedUsLabel: "The Masked Singer · YouTube ↗",
    broadwayAnnouncement: "Annuncio ufficiale di Broadway · Shubert Organization ↗",
    footerCountries: "Paesi", footerMessages: "Messaggi", footerAbout: "Informazioni",
  },

  JA: {
    heroEyebrow: "映画 · テレビ · 舞台",
    heroTitle: "音楽のその先へ",
    heroText:
      "Ne-Yoのキャリアは演技、テレビ、コンペティション番組、舞台にも広がり、レコーディングスタジオとは別のパフォーマーとしての一面を見せています。",
    heroMeta: ["演技", "テレビ", "コンペティション", "舞台"],

    actingEyebrow: "演技", actingTitle: "映画出演からテレビの中心人物へ",
    actingText:
      "Ne-Yoはキャリアを通じて映画やテレビに出演してきました。Step Up: High WaterではSage Odomとして全3シーズンに出演し、最も長期的な演技の仕事の一つとなりました。",
    stepLabel: "注目の役", stepTitle: "Step Up: High Water", stepRole: "Sage Odom",
    stepMeta: "2018–2022 · 3シーズン · 30エピソード",
    stepText:
      "Sage OdomはアトランタのHigh Water Performing Arts Schoolの伝説的な創設者です。Ne-Yoはシリーズ全期間でこの役を演じ、キャリアの中でも特に大きな演技の仕事となりました。",
    filmographyTitle: "主な出演作", filmographyText: "キャリアのさまざまな時期から選んだ映画・テレビでの演技作品。",

    televisionEyebrow: "テレビ", televisionTitle: "審査員、出場者、テレビパーソナリティ",
    televisionText:
      "テレビもNe-Yoの公的なキャリアの継続的な一部です。World of Danceでの4シーズンの審査員から、さまざまな競技・エンターテインメント番組まで活動しています。",
    wodTitle: "World of Dance", wodMeta: "2017–2020 · 審査員 · 4シーズン",
    wodText: "Ne-YoはJennifer Lopez、Derek HoughとともにNBCのダンスコンペティション全4シーズンでメイン審査員を務めました。",
    danceTitle: "Dance Monsters", danceMeta: "2022 · 審査員 · Netflix",
    danceText: "Ne-YoはLele Pons、Ashley BanjoとともにNetflixのダンスコンペティションの審査員を務め、Ashley Robertsが司会を担当しました。",

    maskedEyebrow: "The Masked Singer", maskedTitle: "準優勝から優勝へ",
    maskedIntro: "Ne-YoはThe Masked Singerの異なる2つのバージョンに参加し、異なる結果を残しました。",
    badgerTitle: "Badger", badgerMeta: "UK · シリーズ2 · 2021",
    badgerText: "英国版ではBadgerとして登場し、Sausageとして出演したJoss Stoneに次ぐ準優勝となりました。",
    cowTitle: "Cow", cowMeta: "US · シーズン10 · 2023",
    cowText: "2年後、米国版にCowとして参加し、シーズン10で優勝しました。",

    appearancesEyebrow: "テレビ出演", appearancesTitle: "エンターテインメントとゲーム番組",
    appearancesText: "審査員や出場者としてだけでなく、Ne-Yoは本人役でエンターテインメントやゲーム番組にも出演しています。",

    stageEyebrow: "舞台・ミュージカル", stageTitle: "ライブテレビからブロードウェイへ",
    stageText: "ライブパフォーマンスはNe-Yoをミュージカルシアターにも導き、大規模なテレビ生放送からブロードウェイへと活動を広げました。",
    wizTitle: "The Wiz Live!", wizMeta: "2015 · Tin Man · NBC",
    wizText: "Ne-YoはNBCのライブTVミュージカルでTin Manを演じ、演技、歌、パフォーマンスを融合させました。",
    hellTitle: "Hell's Kitchen", hellMeta: "2025–2026 · Davis · ブロードウェイデビュー",
    hellText: "Ne-YoはAlicia KeysのミュージカルHell's KitchenでDavis役を務め、2025年12月にブロードウェイデビューし、2026年1月にも出演しました。",

    exploreEyebrow: "さらに見る", exploreTitle: "Ne-Yoのキャリアをもっと見る",
    neyo: "Ne-Yo", neyoText: "アーティストのメインプロフィールへ戻る。",
    music: "音楽", musicText: "アルバム、楽曲、音楽的進化を見る。",
    awards: "受賞歴とマイルストーン", awardsText: "受賞、ノミネート、重要な達成を見る。",

    stepVideoLabel: "Step Up: High Water 公式予告編 · YouTube",
    officialChannelLabel: "NE-YO 公式アーティストチャンネル · YouTube ↗",
    runnerUp: "準優勝",
    winner: "優勝",
    maskedUkLabel: "The Masked Singer 英国版 · YouTube ↗",
    maskedUsLabel: "The Masked Singer · YouTube ↗",
    broadwayAnnouncement: "ブロードウェイ公式発表 · Shubert Organization ↗",
    footerCountries: "国々", footerMessages: "メッセージ", footerAbout: "このプロジェクトについて",
  },
} satisfies Record<Language, any>;

const filmCredits: FilmCredit[] = [
  { year: "2006", title: "Save the Last Dance 2", role: "Mixx" },
  { year: "2007", title: "Stomp the Yard", role: "Rich Brown" },
  { year: "2011", title: "CSI: NY", role: "The Handsome Man · Season 7, Episode 14" },
  { year: "2011", title: "Battle: Los Angeles", role: "Cpl. Kevin Harris" },
  { year: "2012", title: "Red Tails", role: "Andrew “Smokey” Salem" },
  { year: "2015", title: "Sharknado 3: Oh Hell No!", role: "Secret Service Agent Deveroux" },
  { year: "2016", title: "The Mindy Project", role: "Marcus · 2 episodes" },
  { year: "2017", title: "Girls Trip", role: "Himself" },
  { year: "2021", title: "Hip Hop Family Christmas", role: "Jayson Shannon" },
  { year: "2022", title: "Hip Hop Family Christmas Wedding", role: "Jayson Shannon" },
  { year: "2022", title: "The Sound of Christmas", role: "Quentin" },
  { year: "2024", title: "BMF", role: "Greeny · 3 episodes" },
  { year: "2024", title: "Held Hostage in My House", role: "Professor Mead" },
];

const tvAppearances: TvCredit[] = [
  { year: "2023", title: "Celebrity Game Face", detail: "Music Hitmakers Edition · Kevin Hart" },
  { year: "2024", title: "Celebrity Family Feud", detail: "Ne-Yo vs. Megan Thee Stallion · Steve Harvey" },
];

function localizedFilmRole(language: Language, credit: FilmCredit) {
  if (credit.title === "CSI: NY") {
    const episode = {
      EN: "Season 7, Episode 14",
      PT: "Temporada 7, Episódio 14",
      ES: "Temporada 7, Episodio 14",
      FR: "Saison 7, Épisode 14",
      DE: "Staffel 7, Folge 14",
      IT: "Stagione 7, Episodio 14",
      JA: "シーズン7・第14話",
    }[language];
    return `The Handsome Man · ${episode}`;
  }

  if (credit.title === "The Mindy Project") {
    return {
      EN: "Marcus · 2 episodes",
      PT: "Marcus · 2 episódios",
      ES: "Marcus · 2 episodios",
      FR: "Marcus · 2 épisodes",
      DE: "Marcus · 2 Folgen",
      IT: "Marcus · 2 episodi",
      JA: "Marcus · 2エピソード",
    }[language];
  }

  if (credit.title === "Girls Trip") {
    return {
      EN: "Himself",
      PT: "Ele próprio",
      ES: "Él mismo",
      FR: "Lui-même",
      DE: "Er selbst",
      IT: "Sé stesso",
      JA: "本人役",
    }[language];
  }

  if (credit.title === "BMF") {
    return {
      EN: "Greeny · 3 episodes",
      PT: "Greeny · 3 episódios",
      ES: "Greeny · 3 episodios",
      FR: "Greeny · 3 épisodes",
      DE: "Greeny · 3 Folgen",
      IT: "Greeny · 3 episodi",
      JA: "Greeny · 3エピソード",
    }[language];
  }

  return credit.role;
}

function localizedTvDetail(language: Language, item: TvCredit) {
  if (item.title === "Celebrity Game Face") {
    return {
      EN: "Music Hitmakers Edition · Kevin Hart",
      PT: "Edição Music Hitmakers · Kevin Hart",
      ES: "Edición Music Hitmakers · Kevin Hart",
      FR: "Édition Music Hitmakers · Kevin Hart",
      DE: "Music Hitmakers-Ausgabe · Kevin Hart",
      IT: "Edizione Music Hitmakers · Kevin Hart",
      JA: "Music Hitmakers Edition · Kevin Hart",
    }[language];
  }
  return item.detail;
}

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

export default function FilmTvStagePage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[8%] h-[650px] w-[650px] rounded-full bg-[#D51C24]/5 blur-[210px]" />
        <div className="absolute right-[-10%] top-[16%] h-[700px] w-[700px] rounded-full bg-[#D4AF37]/5 blur-[230px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.88)_100%)]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 px-6 pb-20 pt-16 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-[1300px]">
          <Eyebrow gold>{t.heroEyebrow}</Eyebrow>

          <h1 className="mt-5 max-w-[900px] text-5xl font-black uppercase tracking-[-0.05em] md:text-6xl">
            {t.heroTitle}
          </h1>

          <p className="mt-7 max-w-[780px] text-[16px] leading-8 text-white/55 md:text-[18px]">
            {t.heroText}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {t.heroMeta.map((item: string) => (
              <span
                key={item}
                className="rounded-full border border-[#D4AF37]/15 bg-[#090A0B] px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-white/40"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ACTING */}
      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1300px]">
          <div className="max-w-[760px]">
            <Eyebrow>{t.actingEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {t.actingTitle}
            </h2>
            <p className="mt-6 text-sm leading-8 text-white/45">
              {t.actingText}
            </p>
          </div>

          <a
            href="https://www.youtube.com/watch?v=LS5ZSkHUqBQ"
            target="_blank"
            rel="noreferrer"
            className="group mt-10 grid overflow-hidden rounded-[24px] border border-[#D4AF37]/22 bg-[#050607] lg:grid-cols-[1.05fr_0.95fr]"
            aria-label={t.stepTitle}
          >
            <div className="relative aspect-video overflow-hidden bg-black lg:aspect-auto lg:min-h-[340px]">
              <img
                src="https://i.ytimg.com/vi/LS5ZSkHUqBQ/maxresdefault.jpg"
                alt={t.stepTitle}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/60 text-2xl text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">▶</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-14">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  {t.stepVideoLabel}
                </p>
              </div>
            </div>

            <div className="relative flex flex-col justify-center p-7 md:p-8">
              <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-[260px] w-[260px] rounded-full bg-[#D51C24]/5 blur-[90px]" />
              <p className="relative text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D51C24]">{t.stepLabel}</p>
              <h3 className="relative mt-5 text-2xl font-bold">{t.stepTitle}</h3>
              <p className="relative mt-3 text-sm font-semibold text-[#D4AF37]">{t.stepRole}</p>
              <p className="relative mt-2 text-[10px] uppercase tracking-[0.16em] text-white/30">{t.stepMeta}</p>
              <p className="relative mt-7 text-sm leading-8 text-white/50">{t.stepText}</p>
            </div>
          </a>

          <div className="mt-14">
            <h3 className="text-2xl font-bold">{t.filmographyTitle}</h3>
            <p className="mt-3 max-w-[700px] text-sm leading-7 text-white/40">
              {t.filmographyText}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filmCredits.map((credit) => (
                <div
                  key={`${credit.year}-${credit.title}`}
                  className="rounded-xl border border-[#D4AF37]/12 bg-[#050607] px-5 py-4"
                >
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#D51C24]">
                    {credit.year}
                  </p>
                  <h4 className="mt-2 text-sm font-semibold">{credit.title}</h4>
                  <p className="mt-1 text-[11px] text-white/35">{localizedFilmRole(language, credit)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TELEVISION */}
      <section className="relative z-10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow gold>{t.televisionEyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            {t.televisionTitle}
          </h2>
          <p className="mt-5 max-w-[760px] text-sm leading-7 text-white/45">
            {t.televisionText}
          </p>

          <div className="mt-10 max-w-[760px] rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#D51C24]">{t.danceMeta}</p>
            <h3 className="mt-4 text-2xl font-semibold">{t.danceTitle}</h3>
            <p className="mt-5 text-sm leading-7 text-white/45">{t.danceText}</p>
          </div>

          <a
            href="https://www.youtube.com/watch?v=GmQXxU7qzq0"
            target="_blank"
            rel="noreferrer"
            className="group mt-6 grid overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#050607] lg:grid-cols-[1.08fr_0.92fr]"
            aria-label={t.wodTitle}
          >
            <div className="relative aspect-video overflow-hidden bg-black lg:aspect-auto lg:min-h-[300px]">
              <img
                src="https://i.ytimg.com/vi/GmQXxU7qzq0/maxresdefault.jpg"
                alt={t.wodTitle}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/60 text-2xl text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">
                  ▶
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#D51C24]">
                {t.wodMeta}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{t.wodTitle}</h3>
              <p className="mt-5 text-sm leading-7 text-white/45">
                {t.wodText}
              </p>
              <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                {t.officialChannelLabel}
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* MASKED SINGER */}
      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow>{t.maskedEyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            {t.maskedTitle}
          </h2>
          <p className="mt-5 max-w-[720px] text-sm leading-7 text-white/45">
            {t.maskedIntro}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <a
              href="https://www.youtube.com/watch?v=QnwZ_LKv0yk"
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-[24px] border border-[#D4AF37]/15 bg-[#050607]"
              aria-label={t.badgerTitle}
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src="https://i.ytimg.com/vi/QnwZ_LKv0yk/maxresdefault.jpg"
                  alt={t.badgerTitle}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/60 text-xl text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">▶</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">{t.badgerMeta}</p>
                <h3 className="mt-4 text-2xl font-black uppercase">{t.badgerTitle}</h3>
                <p className="mt-5 text-sm leading-7 text-white/45">{t.badgerText}</p>
                <div className="mt-7 flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-[#D4AF37]/18 px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-white/40">{t.runnerUp}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">{t.maskedUkLabel}</span>
                </div>
              </div>
            </a>

            <a
              href="https://www.youtube.com/watch?v=npBT8EBC7GU"
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-[24px] border border-[#D4AF37]/28 bg-[#050607]"
              aria-label={t.cowTitle}
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src="https://i.ytimg.com/vi/npBT8EBC7GU/maxresdefault.jpg"
                  alt={t.cowTitle}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/60 text-xl text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">▶</span>
                </div>
              </div>
              <div className="relative p-6">
                <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[220px] w-[220px] rounded-full bg-[#D4AF37]/5 blur-[80px]" />
                <p className="relative text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">{t.cowMeta}</p>
                <h3 className="relative mt-4 text-2xl font-black uppercase">{t.cowTitle}</h3>
                <p className="relative mt-5 text-sm leading-7 text-white/45">{t.cowText}</p>
                <div className="relative mt-7 flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-[#D51C24]/30 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D51C24]">{t.winner}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">{t.maskedUsLabel}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* TV APPEARANCES */}
      <section className="relative z-10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <Eyebrow>{t.appearancesEyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                {t.appearancesTitle}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/45">
                {t.appearancesText}
              </p>
            </div>

            <div className="space-y-3">
              {tvAppearances.map((item) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className="grid grid-cols-[65px_1fr] gap-5 rounded-xl border border-[#D4AF37]/12 bg-[#090A0B] px-5 py-4"
                >
                  <span className="text-[10px] font-semibold text-[#D51C24]">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-5 text-white/35">
                      {localizedTvDetail(language, item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STAGE */}
      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow gold>{t.stageEyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            {t.stageTitle}
          </h2>
          <p className="mt-5 max-w-[760px] text-sm leading-7 text-white/45">
            {t.stageText}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <a
              href="https://www.youtube.com/watch?v=KsnsFLosXqw"
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-[#D4AF37]/15 bg-[#050607]"
              aria-label={t.wizTitle}
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src="https://i.ytimg.com/vi/KsnsFLosXqw/maxresdefault.jpg"
                  alt={t.wizTitle}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/60 text-xl text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">▶</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#D51C24]">{t.wizMeta}</p>
                <h3 className="mt-4 text-2xl font-semibold">{t.wizTitle}</h3>
                <p className="mt-5 text-sm leading-7 text-white/45">{t.wizText}</p>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">TODAY · YouTube ↗</p>
              </div>
            </a>

            <a
              href="https://shubert.nyc/press/grammy-award-winner-ne-yo-to-make-broadway-debut-in-hell-s-kitchen/"
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#050607] transition hover:border-[#D4AF37]/45"
              aria-label={t.hellTitle}
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src="https://shubert.nyc/media/387975/ne-yo-hells-kitchen-251117.jpg?height=638&width=425"
                  alt={t.hellTitle}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>
              <div className="flex min-h-[230px] flex-col p-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#D51C24]">{t.hellMeta}</p>
                <h3 className="mt-4 text-2xl font-semibold">{t.hellTitle}</h3>
                <p className="mt-5 text-sm leading-7 text-white/45">{t.hellText}</p>
                <p className="mt-auto pt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  {t.broadwayAnnouncement}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="relative z-10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <Eyebrow>{t.exploreEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              {t.exploreTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t.neyo, text: t.neyoText, href: "/ne-yo" },
              { title: t.music, text: t.musicText, href: "/music" },
              { title: t.awards, text: t.awardsText, href: "/awards" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6 transition hover:-translate-y-1 hover:border-[#D4AF37]/45"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-4 min-h-[72px] text-sm leading-6 text-white/40">
                  {item.text}
                </p>
                <span className="mt-5 inline-block text-[#D4AF37] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
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
