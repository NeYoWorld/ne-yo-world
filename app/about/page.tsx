"use client";

import { useLanguage } from "../context/LanguageContext";
import SiteHeader from "../components/SiteHeader";


const translations = {
  EN: {
    backToWorld: "Back to the World",

    aboutLabel: "About Ne-Yo World",

    heroTitle1: "One World",
    heroTitle2: "One Music",
    heroTitle3: "One Love",

    heroText:
      "Ne-Yo World is a global fan project created to bring together fans, fan pages, countries, memories and messages in one shared space.",

    ideaLabel: "The Idea",
    ideaTitle: "A world built around connection",

    ideaText1:
      "Music can connect people who live thousands of miles apart. Ne-Yo World was created to celebrate that connection and give fans from different countries a place to be part of something together.",

    ideaText2:
      "The project brings together fan communities, memories, messages and pages dedicated to Ne-Yo from around the world.",

    mottoLabel: "The Meaning",
    mottoTitle: "One World - One Music - One Love",

    mottoText:
      "One world represents the global community. One music represents what brought fans together. One love represents the connection, memories and support shared across countries.",

    fansLabel: "Built Around the Fans",
    fansTitle: "More than a fan site",

    fansText1:
      "Ne-Yo World is not only about the artist and the music. It is also about the people who have supported that music, shared memories through it and built communities around it.",

    fansText2:
      "Every country, fan page and message adds another part to the world.",

    fanPagesLabel: "Fan Pages Around the World",
    fanPagesTitle: "Different pages, one shared project",

    fanPagesText1:
      "Each country can have more than one fan page represented on Ne-Yo World. Existing pages and new pages can apply to join the project.",

    fanPagesText2:
      "Fan pages are connected to their countries, helping the project grow as one organised global community.",

    joinButton: "Join The Project",
    countriesButton: "Explore Countries",

    independentLabel: "Independent Fan Project",
    independentTitle: "Created by fans",

    independentText:
      "Ne-Yo World is an independent fan-created project. It is not the official website of Ne-Yo and is not officially affiliated with, endorsed by or representative of Ne-Yo, his management or his official team.",

    communityLabel: "The Community",

    communityMusic: "Music",
    communityFans: "Fans",
    communityCountries: "Countries",
    communityMemories: "Memories",
    communityMessages: "Messages",
    communityPages: "Fan Pages",

    finalLabel: "The Journey Continues",
    finalTitle1: "More countries",
    finalTitle2: "More memories",
    finalTitle3: "One global community",

    finalText:
      "As Ne-Yo World grows, more countries, pages and fans can become part of the project.",

    home: "Home",
    countries: "Countries",
    messages: "Messages",
    neyo: "Ne-Yo",
    about: "About",

    motto: "One World - One Music - One Love",

    exploreLabel: "Explore Ne-Yo World",
    exploreTitle: "One project many ways to explore",
    exploreNeyoTitle: "Ne-Yo",
    exploreNeyoText: "Discover the artist, his story and the different sides of his career.",
    exploreMusicTitle: "Music",
    exploreMusicText: "Albums, songs and the music that has shaped Ne-Yo's journey.",
    exploreFilmTitle: "Film, TV & Stage",
    exploreFilmText: "Explore Ne-Yo's work across film, television and the stage.",
    exploreAwardsTitle: "Awards & Milestones",
    exploreAwardsText: "Awards, recognitions and defining moments from across his career.",
    exploreConcertMapTitle: "Concert Map",
    exploreConcertMapText: "A growing global archive of Ne-Yo performances around the world.",
    exploreCommunityTitle: "Global Community",
    exploreCommunityText: "Fan pages and communities connected through countries around the world.",
    exploreMessagesTitle: "World Messages",
    exploreMessagesText: "Messages, stories and words from fans in their own voices.",
    exploreMemoriesTitle: "Fan Memories",
    exploreMemoriesText: "Personal moments, photos and videos shared by fans.",

    behindLabel: "Behind Ne-Yo World",
    behindTitle: "Created by a fan for a global community",
    behindText:
      "Ne-Yo World was created by Mariana, creator of @bestofneyo_ and a Ne-Yo fan since 2006, with the idea of bringing fans, communities, memories and Ne-Yo's journey around the world together in one place.",
    behindText2:
      "What started with one fan is a project made to grow with many.",

    statsMapped: "Mapped performances",
    statsLanguages: "Languages",
    statsCommunity: "Community countries",
    statsJourney: "Stories still to come",

    finalQuote:
      "Ne-Yo World is a place where a global community can celebrate the music, the memories and the journey together.",
  },

  PT: {
    backToWorld: "Voltar ao Mundo",

    aboutLabel: "Sobre o Ne-Yo World",

    heroTitle1: "Um Mundo",
    heroTitle2: "Uma Música",
    heroTitle3: "Um Amor",

    heroText:
      "Ne-Yo World é um projeto global de fãs criado para juntar fãs, páginas de fãs, países, memórias e mensagens num único espaço.",

    ideaLabel: "A Ideia",
    ideaTitle: "Um mundo criado à volta da ligação entre fãs",

    ideaText1:
      "A música consegue ligar pessoas que vivem a milhares de quilómetros umas das outras. Ne-Yo World foi criado para celebrar essa ligação e dar aos fãs de diferentes países um espaço onde possam fazer parte de algo em conjunto.",

    ideaText2:
      "O projeto junta comunidades de fãs, memórias, mensagens e páginas dedicadas a Ne-Yo de todo o mundo.",

    mottoLabel: "O Significado",
    mottoTitle: "One World - One Music - One Love",

    mottoText:
      "One World representa a comunidade global. One Music representa aquilo que juntou os fãs. One Love representa a ligação, as memórias e o apoio partilhado entre países.",

    fansLabel: "Criado à Volta dos Fãs",
    fansTitle: "Mais do que um site de fãs",

    fansText1:
      "Ne-Yo World não é apenas sobre o artista e a música. É também sobre as pessoas que acompanharam essa música, criaram memórias através dela e construíram comunidades à sua volta.",

    fansText2:
      "Cada país, página de fãs e mensagem acrescenta uma nova parte a este mundo.",

    fanPagesLabel: "Páginas de Fãs pelo Mundo",
    fanPagesTitle: "Diferentes páginas. Um projeto.",

    fanPagesText1:
      "Cada país pode ter mais do que uma página de fãs representada no Ne-Yo World. Páginas já existentes e novas páginas podem candidatar-se para fazer parte do projeto.",

    fanPagesText2:
      "As páginas de fãs ficam ligadas aos respetivos países, ajudando o projeto a crescer como uma comunidade global organizada.",

    joinButton: "Juntar-se ao Projeto",
    countriesButton: "Explorar Países",

    independentLabel: "Projeto Independente de Fãs",
    independentTitle: "Criado por fãs",

    independentText:
      "Ne-Yo World é um projeto independente criado por fãs. Não é o site oficial de Ne-Yo e não tem afiliação oficial, apoio ou representação de Ne-Yo, da sua gestão ou da sua equipa oficial.",

    communityLabel: "A Comunidade",

    communityMusic: "Música",
    communityFans: "Fãs",
    communityCountries: "Países",
    communityMemories: "Memórias",
    communityMessages: "Mensagens",
    communityPages: "Páginas de Fãs",

    finalLabel: "A Viagem Continua",
    finalTitle1: "Mais países",
    finalTitle2: "Mais memórias",
    finalTitle3: "Uma comunidade global",

    finalText:
      "À medida que o Ne-Yo World cresce, mais países, páginas e fãs podem passar a fazer parte do projeto.",

    home: "Início",
    countries: "Países",
    messages: "Mensagens",
    neyo: "Ne-Yo",
    about: "Sobre",

    motto: "One World - One Music - One Love",

    exploreLabel: "Explorar Ne-Yo World",
    exploreTitle: "Um projeto, muitas formas de explorar",
    exploreNeyoTitle: "Ne-Yo",
    exploreNeyoText: "Descobre o artista, a sua história e os diferentes lados da sua carreira.",
    exploreMusicTitle: "Música",
    exploreMusicText: "Álbuns, canções e a música que tem marcado a jornada de Ne-Yo.",
    exploreFilmTitle: "Cinema, TV & Palco",
    exploreFilmText: "Explora o trabalho de Ne-Yo no cinema, na televisão e em palco.",
    exploreAwardsTitle: "Prémios & Marcos",
    exploreAwardsText: "Prémios, reconhecimentos e momentos marcantes ao longo da sua carreira.",
    exploreConcertMapTitle: "Mapa de Concertos",
    exploreConcertMapText: "Um arquivo global em crescimento das atuações de Ne-Yo pelo mundo.",
    exploreCommunityTitle: "Comunidade Global",
    exploreCommunityText: "Páginas e comunidades de fãs ligadas através de países de todo o mundo.",
    exploreMessagesTitle: "Mensagens do Mundo",
    exploreMessagesText: "Mensagens, histórias e palavras de fãs, preservadas nas suas próprias vozes.",
    exploreMemoriesTitle: "Memórias dos Fãs",
    exploreMemoriesText: "Momentos pessoais, fotografias e vídeos partilhados por fãs.",

    behindLabel: "Por Trás do Ne-Yo World",
    behindTitle: "Criado por uma fã para uma comunidade global",
    behindText:
      "Ne-Yo World foi criado por Mariana, criadora da @bestofneyo_ e fã de Ne-Yo desde 2006, com a ideia de juntar fãs, comunidades, memórias e a jornada de Ne-Yo pelo mundo num só lugar.",
    behindText2:
      "O que começou com uma fã é um projeto feito para crescer com muitos.",

    statsMapped: "Atuações mapeadas",
    statsLanguages: "Idiomas",
    statsCommunity: "Países da comunidade",
    statsJourney: "Histórias por vir",

    finalQuote:
      "Ne-Yo World é um lugar onde uma comunidade global pode celebrar em conjunto a música, as memórias e a jornada.",
  },

  ES: {
    backToWorld: "Volver al Mundo",
    aboutLabel: "Sobre Ne-Yo World",
    heroTitle1: "Un Mundo",
    heroTitle2: "Una Música",
    heroTitle3: "Un Amor",
    heroText:
      "Ne-Yo World es un proyecto global de fans creado para reunir fans, páginas de fans, países, recuerdos y mensajes en un mismo espacio.",
    ideaLabel: "La Idea",
    ideaTitle: "Un mundo construido alrededor de la conexión",
    ideaText1:
      "La música puede conectar a personas que viven a miles de kilómetros de distancia. Ne-Yo World nació para celebrar esa conexión y ofrecer a fans de distintos países un lugar donde formar parte de algo juntos.",
    ideaText2:
      "El proyecto reúne comunidades de fans, recuerdos, mensajes y páginas dedicadas a Ne-Yo de todo el mundo.",
    mottoLabel: "El Significado",
    mottoTitle: "One World - One Music - One Love",
    mottoText:
      "One World representa la comunidad global. One Music representa aquello que unió a los fans. One Love representa la conexión, los recuerdos y el apoyo compartidos entre países.",
    fansLabel: "Creado Alrededor de los Fans",
    fansTitle: "Más que un sitio de fans",
    fansText1:
      "Ne-Yo World no trata solo del artista y de la música. También trata de las personas que han apoyado esa música, han creado recuerdos a través de ella y han construido comunidades a su alrededor.",
    fansText2:
      "Cada país, página de fans y mensaje añade una nueva parte a este mundo.",
    fanPagesLabel: "Páginas de Fans por el Mundo",
    fanPagesTitle: "Diferentes páginas. Un proyecto.",
    fanPagesText1:
      "Cada país puede tener más de una página de fans representada en Ne-Yo World. Tanto las páginas existentes como las nuevas pueden solicitar unirse al proyecto.",
    fanPagesText2:
      "Las páginas de fans están vinculadas a sus respectivos países, ayudando al proyecto a crecer como una comunidad global organizada.",
    joinButton: "Únete al Proyecto",
    countriesButton: "Explorar Países",
    independentLabel: "Proyecto Independiente de Fans",
    independentTitle: "Creado por fans",
    independentText:
      "Ne-Yo World es un proyecto independiente creado por fans. No es el sitio web oficial de Ne-Yo y no está oficialmente afiliado, respaldado ni representa a Ne-Yo, su equipo de gestión o su equipo oficial.",
    communityLabel: "La Comunidad",
    communityMusic: "Música",
    communityFans: "Fans",
    communityCountries: "Países",
    communityMemories: "Recuerdos",
    communityMessages: "Mensajes",
    communityPages: "Páginas de Fans",
    finalLabel: "El Viaje Continúa",
    finalTitle1: "Más países",
    finalTitle2: "Más recuerdos",
    finalTitle3: "Una comunidad global",
    finalText:
      "A medida que Ne-Yo World crece, más países, páginas y fans pueden pasar a formar parte del proyecto.",
    home: "Inicio",
    countries: "Países",
    messages: "Mensajes",
    neyo: "Ne-Yo",
    about: "Acerca de",
    motto: "One World - One Music - One Love",

    exploreLabel: "Explora Ne-Yo World",
    exploreTitle: "Un proyecto muchas formas de explorar",
    exploreNeyoTitle: "Ne-Yo",
    exploreNeyoText: "Descubre al artista, su historia y las diferentes facetas de su carrera.",
    exploreMusicTitle: "Música",
    exploreMusicText: "Álbumes, canciones y la música que ha marcado el recorrido de Ne-Yo.",
    exploreFilmTitle: "Cine, TV & Escena",
    exploreFilmText: "Explora el trabajo de Ne-Yo en cine, televisión y sobre el escenario.",
    exploreAwardsTitle: "Premios & Hitos",
    exploreAwardsText: "Premios, reconocimientos y momentos clave a lo largo de su carrera.",
    exploreConcertMapTitle: "Mapa de Conciertos",
    exploreConcertMapText: "Un archivo global en crecimiento de las actuaciones de Ne-Yo por el mundo.",
    exploreCommunityTitle: "Comunidad Global",
    exploreCommunityText: "Páginas y comunidades de fans conectadas a través de países de todo el mundo.",
    exploreMessagesTitle: "Mensajes del Mundo",
    exploreMessagesText: "Mensajes, historias y palabras de fans en sus propias voces.",
    exploreMemoriesTitle: "Recuerdos de Fans",
    exploreMemoriesText: "Momentos personales, fotos y vídeos compartidos por fans.",

    behindLabel: "Detrás de Ne-Yo World",
    behindTitle: "Creado por una fan para una comunidad global",
    behindText:
      "Ne-Yo World fue creado por Mariana, creadora de @bestofneyo_ y fan de Ne-Yo desde 2006, con la idea de reunir fans, comunidades, recuerdos y el viaje de Ne-Yo por el mundo en un solo lugar.",
    behindText2:
      "Lo que comenzó con una fan es un proyecto hecho para crecer con muchos.",

    statsMapped: "Actuaciones mapeadas",
    statsLanguages: "Idiomas",
    statsCommunity: "Países de la comunidad",
    statsJourney: "Historias por llegar",

    finalQuote:
      "Ne-Yo World es un lugar donde una comunidad global puede celebrar junta la música, los recuerdos y el viaje.",
  },

  FR: {
    backToWorld: "Retour au Monde",
    aboutLabel: "À propos de Ne-Yo World",
    heroTitle1: "Un Monde",
    heroTitle2: "Une Musique",
    heroTitle3: "Un Amour",
    heroText:
      "Ne-Yo World est un projet mondial de fans créé pour réunir fans, pages de fans, pays, souvenirs et messages dans un même espace.",
    ideaLabel: "L’Idée",
    ideaTitle: "Un monde construit autour du lien",
    ideaText1:
      "La musique peut rapprocher des personnes vivant à des milliers de kilomètres les unes des autres. Ne-Yo World a été créé pour célébrer ce lien et offrir aux fans de différents pays un espace commun.",
    ideaText2:
      "Le projet rassemble des communautés de fans, des souvenirs, des messages et des pages consacrées à Ne-Yo dans le monde entier.",
    mottoLabel: "La Signification",
    mottoTitle: "One World - One Music - One Love",
    mottoText:
      "One World représente la communauté mondiale. One Music représente ce qui a réuni les fans. One Love représente le lien, les souvenirs et le soutien partagés entre les pays.",
    fansLabel: "Construit Autour des Fans",
    fansTitle: "Plus qu’un site de fans",
    fansText1:
      "Ne-Yo World ne parle pas seulement de l’artiste et de la musique. Il parle aussi des personnes qui ont soutenu cette musique, créé des souvenirs grâce à elle et construit des communautés autour d’elle.",
    fansText2:
      "Chaque pays, page de fans et message ajoute une nouvelle partie à ce monde.",
    fanPagesLabel: "Pages de Fans dans le Monde",
    fanPagesTitle: "Différentes pages. Un seul projet.",
    fanPagesText1:
      "Chaque pays peut avoir plusieurs pages de fans représentées sur Ne-Yo World. Les pages existantes comme les nouvelles peuvent demander à rejoindre le projet.",
    fanPagesText2:
      "Les pages de fans sont rattachées à leurs pays respectifs, ce qui permet au projet de grandir comme une communauté mondiale organisée.",
    joinButton: "Rejoindre le Projet",
    countriesButton: "Explorer les Pays",
    independentLabel: "Projet de Fans Indépendant",
    independentTitle: "Créé par des fans",
    independentText:
      "Ne-Yo World est un projet indépendant créé par des fans. Il ne s’agit pas du site officiel de Ne-Yo et il n’est ni officiellement affilié à Ne-Yo, ni approuvé par lui, sa direction ou son équipe officielle.",
    communityLabel: "La Communauté",
    communityMusic: "Musique",
    communityFans: "Fans",
    communityCountries: "Pays",
    communityMemories: "Souvenirs",
    communityMessages: "Messages",
    communityPages: "Pages de Fans",
    finalLabel: "Le Voyage Continue",
    finalTitle1: "Plus de pays",
    finalTitle2: "Plus de souvenirs",
    finalTitle3: "Une communauté mondiale",
    finalText:
      "À mesure que Ne-Yo World grandit, davantage de pays, de pages et de fans peuvent rejoindre le projet.",
    home: "Accueil",
    countries: "Pays",
    messages: "Messages",
    neyo: "Ne-Yo",
    about: "À propos",
    motto: "One World - One Music - One Love",

    exploreLabel: "Explorer Ne-Yo World",
    exploreTitle: "Un projet de nombreuses façons d'explorer",
    exploreNeyoTitle: "Ne-Yo",
    exploreNeyoText: "Découvrez l'artiste, son histoire et les différentes facettes de sa carrière.",
    exploreMusicTitle: "Musique",
    exploreMusicText: "Albums, chansons et musique qui ont marqué le parcours de Ne-Yo.",
    exploreFilmTitle: "Cinéma, TV & Scène",
    exploreFilmText: "Explorez le travail de Ne-Yo au cinéma, à la télévision et sur scène.",
    exploreAwardsTitle: "Prix & Étapes",
    exploreAwardsText: "Récompenses, distinctions et moments marquants de sa carrière.",
    exploreConcertMapTitle: "Carte des Concerts",
    exploreConcertMapText: "Une archive mondiale en constante évolution des performances de Ne-Yo.",
    exploreCommunityTitle: "Communauté Mondiale",
    exploreCommunityText: "Pages et communautés de fans reliées à travers des pays du monde entier.",
    exploreMessagesTitle: "Messages du Monde",
    exploreMessagesText: "Messages, histoires et mots de fans dans leurs propres voix.",
    exploreMemoriesTitle: "Souvenirs des Fans",
    exploreMemoriesText: "Moments personnels, photos et vidéos partagés par les fans.",

    behindLabel: "Derrière Ne-Yo World",
    behindTitle: "Créé par une fan pour une communauté mondiale",
    behindText:
      "Ne-Yo World a été créé par Mariana, créatrice de @bestofneyo_ et fan de Ne-Yo depuis 2006, avec l'idée de réunir les fans, les communautés, les souvenirs et le parcours de Ne-Yo à travers le monde en un seul lieu.",
    behindText2:
      "Ce qui a commencé avec une fan est un projet fait pour grandir avec beaucoup d'autres.",

    statsMapped: "Performances cartographiées",
    statsLanguages: "Langues",
    statsCommunity: "Pays de la communauté",
    statsJourney: "Histoires à venir",

    finalQuote:
      "Ne-Yo World est un lieu où une communauté mondiale peut célébrer ensemble la musique, les souvenirs et le parcours.",
  },

  DE: {
    backToWorld: "Zurück zur Welt",
    aboutLabel: "Über Ne-Yo World",
    heroTitle1: "Eine Welt",
    heroTitle2: "Eine Musik",
    heroTitle3: "Eine Liebe",
    heroText:
      "Ne-Yo World ist ein globales Fanprojekt, das Fans, Fanseiten, Länder, Erinnerungen und Nachrichten an einem gemeinsamen Ort zusammenbringt.",
    ideaLabel: "Die Idee",
    ideaTitle: "Eine Welt, die auf Verbindung aufbaut",
    ideaText1:
      "Musik kann Menschen verbinden, die Tausende Kilometer voneinander entfernt leben. Ne-Yo World wurde geschaffen, um diese Verbindung zu feiern und Fans aus verschiedenen Ländern einen gemeinsamen Ort zu geben.",
    ideaText2:
      "Das Projekt bringt Fan-Communities, Erinnerungen, Nachrichten und Ne-Yo gewidmete Seiten aus aller Welt zusammen.",
    mottoLabel: "Die Bedeutung",
    mottoTitle: "One World - One Music - One Love",
    mottoText:
      "One World steht für die globale Gemeinschaft. One Music steht für das, was die Fans zusammengebracht hat. One Love steht für die Verbindung, Erinnerungen und Unterstützung, die über Länder hinweg geteilt werden.",
    fansLabel: "Rund um die Fans",
    fansTitle: "Mehr als eine Fanseite",
    fansText1:
      "Bei Ne-Yo World geht es nicht nur um den Künstler und die Musik. Es geht auch um die Menschen, die diese Musik unterstützt, mit ihr Erinnerungen geschaffen und Communities um sie herum aufgebaut haben.",
    fansText2:
      "Jedes Land, jede Fanseite und jede Nachricht fügt dieser Welt einen weiteren Teil hinzu.",
    fanPagesLabel: "Fanseiten aus aller Welt",
    fanPagesTitle: "Verschiedene Seiten, ein gemeinsames Projekt",
    fanPagesText1:
      "Jedes Land kann mit mehr als einer Fanseite auf Ne-Yo World vertreten sein. Bestehende und neue Seiten können sich für das Projekt bewerben.",
    fanPagesText2:
      "Fanseiten sind ihren jeweiligen Ländern zugeordnet und helfen dem Projekt, als organisierte globale Community zu wachsen.",
    joinButton: "Projekt Beitreten",
    countriesButton: "Länder Entdecken",
    independentLabel: "Unabhängiges Fanprojekt",
    independentTitle: "Von Fans geschaffen",
    independentText:
      "Ne-Yo World ist ein unabhängiges, von Fans geschaffenes Projekt. Es ist nicht die offizielle Website von Ne-Yo und steht weder offiziell mit Ne-Yo, seinem Management oder seinem offiziellen Team in Verbindung noch wird es von ihnen unterstützt oder vertreten.",
    communityLabel: "Die Gemeinschaft",
    communityMusic: "Musik",
    communityFans: "Fans",
    communityCountries: "Länder",
    communityMemories: "Erinnerungen",
    communityMessages: "Nachrichten",
    communityPages: "Fanseiten",
    finalLabel: "Die Reise Geht Weiter",
    finalTitle1: "Mehr Länder",
    finalTitle2: "Mehr Erinnerungen",
    finalTitle3: "Eine globale Gemeinschaft",
    finalText:
      "Während Ne-Yo World wächst, können weitere Länder, Seiten und Fans Teil des Projekts werden.",
    home: "Startseite",
    countries: "Länder",
    messages: "Nachrichten",
    neyo: "Ne-Yo",
    about: "Über",
    motto: "One World - One Music - One Love",

    exploreLabel: "Ne-Yo World Entdecken",
    exploreTitle: "Ein Projekt viele Wege, es zu entdecken",
    exploreNeyoTitle: "Ne-Yo",
    exploreNeyoText: "Entdecke den Künstler, seine Geschichte und die verschiedenen Seiten seiner Karriere.",
    exploreMusicTitle: "Musik",
    exploreMusicText: "Alben, Songs und die Musik, die Ne-Yos Weg geprägt hat.",
    exploreFilmTitle: "Film, TV & Bühne",
    exploreFilmText: "Entdecke Ne-Yos Arbeit in Film, Fernsehen und auf der Bühne.",
    exploreAwardsTitle: "Auszeichnungen & Meilensteine",
    exploreAwardsText: "Auszeichnungen, Anerkennungen und prägende Momente seiner Karriere.",
    exploreConcertMapTitle: "Konzertkarte",
    exploreConcertMapText: "Ein wachsendes weltweites Archiv von Ne-Yos Auftritten.",
    exploreCommunityTitle: "Globale Gemeinschaft",
    exploreCommunityText: "Fanseiten und Gemeinschaften, verbunden über Länder auf der ganzen Welt.",
    exploreMessagesTitle: "Nachrichten aus der Welt",
    exploreMessagesText: "Nachrichten, Geschichten und Worte von Fans in ihren eigenen Stimmen.",
    exploreMemoriesTitle: "Fan-Erinnerungen",
    exploreMemoriesText: "Persönliche Momente, Fotos und Videos, die von Fans geteilt werden.",

    behindLabel: "Hinter Ne-Yo World",
    behindTitle: "Von einem Fan für eine globale Gemeinschaft geschaffen",
    behindText:
      "Ne-Yo World wurde von Mariana, der Gründerin von @bestofneyo_ und Ne-Yo-Fan seit 2006, mit der Idee geschaffen, Fans, Communities, Erinnerungen und Ne-Yos Reise um die Welt an einem Ort zusammenzubringen.",
    behindText2:
      "Was mit einem Fan begann, ist ein Projekt, das mit vielen wachsen soll.",

    statsMapped: "Kartierte Auftritte",
    statsLanguages: "Sprachen",
    statsCommunity: "Länder der Gemeinschaft",
    statsJourney: "Geschichten, die noch kommen",

    finalQuote:
      "Ne-Yo World ist ein Ort, an dem eine globale Gemeinschaft gemeinsam die Musik, die Erinnerungen und die Reise feiern kann.",
  },

  IT: {
    backToWorld: "Torna al Mondo",
    aboutLabel: "Su Ne-Yo World",
    heroTitle1: "Un Mondo",
    heroTitle2: "Una Musica",
    heroTitle3: "Un Amore",
    heroText:
      "Ne-Yo World è un progetto globale di fan creato per riunire fan, pagine fan, paesi, ricordi e messaggi in un unico spazio.",
    ideaLabel: "L’Idea",
    ideaTitle: "Un mondo costruito intorno alla connessione",
    ideaText1:
      "La musica può unire persone che vivono a migliaia di chilometri di distanza. Ne-Yo World è nato per celebrare questa connessione e offrire ai fan di paesi diversi uno spazio da condividere.",
    ideaText2:
      "Il progetto riunisce comunità di fan, ricordi, messaggi e pagine dedicate a Ne-Yo da tutto il mondo.",
    mottoLabel: "Il Significato",
    mottoTitle: "One World - One Music - One Love",
    mottoText:
      "One World rappresenta la comunità globale. One Music rappresenta ciò che ha unito i fan. One Love rappresenta la connessione, i ricordi e il sostegno condivisi tra i vari paesi.",
    fansLabel: "Costruito Intorno ai Fan",
    fansTitle: "Più di un sito di fan",
    fansText1:
      "Ne-Yo World non riguarda soltanto l’artista e la musica. Riguarda anche le persone che hanno sostenuto quella musica, creato ricordi attraverso di essa e costruito comunità intorno ad essa.",
    fansText2:
      "Ogni paese, pagina fan e messaggio aggiunge una nuova parte a questo mondo.",
    fanPagesLabel: "Pagine Fan nel Mondo",
    fanPagesTitle: "Pagine diverse. Un solo progetto.",
    fanPagesText1:
      "Ogni paese può avere più di una pagina fan rappresentata su Ne-Yo World. Le pagine esistenti e quelle nuove possono candidarsi per entrare nel progetto.",
    fanPagesText2:
      "Le pagine fan sono collegate ai rispettivi Paesi, aiutando il progetto a crescere come una comunità globale organizzata.",
    joinButton: "Unisciti al Progetto",
    countriesButton: "Esplora i Paesi",
    independentLabel: "Progetto Fan Indipendente",
    independentTitle: "Creato dai fan",
    independentText:
      "Ne-Yo World è un progetto indipendente creato dai fan. Non è il sito ufficiale di Ne-Yo e non è ufficialmente affiliato, approvato o rappresentativo di Ne-Yo, del suo management o del suo team ufficiale.",
    communityLabel: "La Comunità",
    communityMusic: "Musica",
    communityFans: "Fan",
    communityCountries: "Paesi",
    communityMemories: "Ricordi",
    communityMessages: "Messaggi",
    communityPages: "Pagine Fan",
    finalLabel: "Il Viaggio Continua",
    finalTitle1: "Più paesi",
    finalTitle2: "Più ricordi",
    finalTitle3: "Una comunità globale",
    finalText:
      "Con la crescita di Ne-Yo World, altri paesi, pagine e fan potranno entrare a far parte del progetto.",
    home: "Home",
    countries: "Paesi",
    messages: "Messaggi",
    neyo: "Ne-Yo",
    about: "Informazioni",
    motto: "One World - One Music - One Love",

    exploreLabel: "Esplora Ne-Yo World",
    exploreTitle: "Un progetto tanti modi per esplorarlo",
    exploreNeyoTitle: "Ne-Yo",
    exploreNeyoText: "Scopri l'artista, la sua storia e i diversi lati della sua carriera.",
    exploreMusicTitle: "Musica",
    exploreMusicText: "Album, canzoni e la musica che ha segnato il percorso di Ne-Yo.",
    exploreFilmTitle: "Cinema, TV & Palco",
    exploreFilmText: "Esplora il lavoro di Ne-Yo nel cinema, in televisione e sul palco.",
    exploreAwardsTitle: "Premi & Traguardi",
    exploreAwardsText: "Premi, riconoscimenti e momenti importanti della sua carriera.",
    exploreConcertMapTitle: "Mappa dei Concerti",
    exploreConcertMapText: "Un archivio globale in crescita delle performance di Ne-Yo nel mondo.",
    exploreCommunityTitle: "Comunità Globale",
    exploreCommunityText: "Pagine fan e comunità collegate attraverso paesi di tutto il mondo.",
    exploreMessagesTitle: "Messaggi dal Mondo",
    exploreMessagesText: "Messaggi, storie e parole dei fan nelle loro voci originali.",
    exploreMemoriesTitle: "Ricordi dei Fan",
    exploreMemoriesText: "Momenti personali, foto e video condivisi dai fan.",

    behindLabel: "Dietro Ne-Yo World",
    behindTitle: "Creato da una fan per una comunità globale",
    behindText:
      "Ne-Yo World è stato creato da Mariana, creatrice di @bestofneyo_ e fan di Ne-Yo dal 2006, con l'idea di riunire fan, comunità, ricordi e il viaggio di Ne-Yo nel mondo in un unico luogo.",
    behindText2:
      "Quello che è iniziato con una fan è un progetto pensato per crescere con molti.",

    statsMapped: "Performance mappate",
    statsLanguages: "Lingue",
    statsCommunity: "Paesi della comunità",
    statsJourney: "Storie ancora da vivere",

    finalQuote:
      "Ne-Yo World è un luogo dove una comunità globale può celebrare insieme la musica, i ricordi e il viaggio.",
  },

  JA: {
    backToWorld: "ワールドに戻る",
    aboutLabel: "Ne-Yo Worldについて",
    heroTitle1: "ひとつの世界",
    heroTitle2: "ひとつの音楽",
    heroTitle3: "ひとつの愛",
    heroText:
      "Ne-Yo Worldは、世界中のファン、ファンページ、国、思い出、メッセージをひとつの場所につなぐために作られたグローバルなファンプロジェクトです。",
    ideaLabel: "アイデア",
    ideaTitle: "つながりを中心にした世界",
    ideaText1:
      "音楽は、何千キロも離れて暮らす人々をつなぐことができます。Ne-Yo Worldはそのつながりを祝い、さまざまな国のファンが一緒に参加できる場所を作るために生まれました。",
    ideaText2:
      "このプロジェクトは、世界中のNe-Yoに捧げられたファンコミュニティ、思い出、メッセージ、ファンページをひとつにつなぎます。",
    mottoLabel: "その意味",
    mottoTitle: "One World - One Music - One Love",
    mottoText:
      "One Worldは世界中のコミュニティを、One Musicはファンを結びつけた音楽を、One Loveは国を越えて共有されるつながり、思い出、応援の気持ちを表しています。",
    fansLabel: "ファンを中心に",
    fansTitle: "ファンサイト以上の場所",
    fansText1:
      "Ne-Yo Worldはアーティストや音楽だけの場所ではありません。その音楽を応援し、そこから思い出を作り、コミュニティを築いてきた人々のための場所でもあります。",
    fansText2:
      "それぞれの国、ファンページ、メッセージが、この世界に新しい一部を加えていきます。",
    fanPagesLabel: "世界のファンページ",
    fanPagesTitle: "違うページ。ひとつのプロジェクト。",
    fanPagesText1:
      "各国から複数のファンページがNe-Yo Worldに参加できます。既存のページも新しいページも、プロジェクトへの参加を申請できます。",
    fanPagesText2:
      "ファンページはそれぞれの国と結び付けられ、プロジェクト全体がひとつの整理されたグローバルコミュニティとして広がっていきます。",
    joinButton: "プロジェクトに参加",
    countriesButton: "国々を探索する",
    independentLabel: "独立したファンプロジェクト",
    independentTitle: "ファンによって作られたプロジェクト",
    independentText:
      "Ne-Yo Worldはファンによって作られた独立したプロジェクトです。Ne-Yoの公式サイトではなく、Ne-Yo本人、マネジメント、公式チームとの公式な提携、承認、代表関係はありません。",
    communityLabel: "コミュニティ",
    communityMusic: "音楽",
    communityFans: "ファン",
    communityCountries: "国々",
    communityMemories: "思い出",
    communityMessages: "メッセージ",
    communityPages: "ファンページ",
    finalLabel: "旅は続く",
    finalTitle1: "もっと多くの国",
    finalTitle2: "もっと多くの思い出",
    finalTitle3: "ひとつのグローバルコミュニティ",
    finalText:
      "Ne-Yo Worldの成長とともに、より多くの国、ページ、ファンがこのプロジェクトに参加できるようになります。",
    home: "ホーム",
    countries: "国々",
    messages: "メッセージ",
    neyo: "Ne-Yo",
    about: "このプロジェクトについて",
    motto: "One World - One Music - One Love",

    exploreLabel: "Ne-Yo Worldを探索",
    exploreTitle: "ひとつのプロジェクト いくつもの楽しみ方",
    exploreNeyoTitle: "Ne-Yo",
    exploreNeyoText: "アーティストNe-Yo、その物語、そしてキャリアのさまざまな一面を紹介します。",
    exploreMusicTitle: "音楽",
    exploreMusicText: "Ne-Yoの歩みを彩ってきたアルバム、楽曲、そして音楽。",
    exploreFilmTitle: "映画・TV・舞台",
    exploreFilmText: "映画、テレビ、舞台でのNe-Yoの活動を紹介します。",
    exploreAwardsTitle: "受賞歴 & マイルストーン",
    exploreAwardsText: "キャリアを彩る受賞歴、評価、重要な節目を紹介します。",
    exploreConcertMapTitle: "コンサートマップ",
    exploreConcertMapText: "世界各地でのNe-Yoのパフォーマンスを記録する、成長し続けるグローバルアーカイブ。",
    exploreCommunityTitle: "グローバル・コミュニティ",
    exploreCommunityText: "世界中の国々を通じてつながるファンページとコミュニティ。",
    exploreMessagesTitle: "ワールド・メッセージ",
    exploreMessagesText: "ファン自身の言葉で届けられるメッセージ、ストーリー、想い。",
    exploreMemoriesTitle: "ファン・メモリーズ",
    exploreMemoriesText: "ファンが共有する個人的な瞬間、写真、動画。",

    behindLabel: "Ne-Yo Worldの舞台裏",
    behindTitle: "ひとりのファンが世界のコミュニティのために作ったプロジェクト",
    behindText:
      "Ne-Yo Worldは、@bestofneyo_のクリエイターであり、2006年からNe-YoのファンであるMarianaによって、ファン、コミュニティ、思い出、そしてNe-Yoの世界での歩みをひとつの場所につなぐという想いから作られました。",
    behindText2:
      "ひとりのファンから始まったこのプロジェクトは、多くの人とともに成長していくためのものです。",

    statsMapped: "マッピング済みパフォーマンス",
    statsLanguages: "言語",
    statsCommunity: "コミュニティ参加国",
    statsJourney: "これから生まれる物語",

    finalQuote:
      "Ne-Yo Worldは、世界中のコミュニティが音楽、思い出、そしてその歩みを一緒に祝うための場所です。",
  }
};


export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const exploreItems = [
    { title: t.exploreNeyoTitle, text: t.exploreNeyoText, href: "/ne-yo", symbol: "N" },
    { title: t.exploreMusicTitle, text: t.exploreMusicText, href: "/music", symbol: "♪" },
    { title: t.exploreFilmTitle, text: t.exploreFilmText, href: "/film-tv-stage", symbol: "▣" },
    { title: t.exploreAwardsTitle, text: t.exploreAwardsText, href: "/awards", symbol: "★" },
    { title: t.exploreConcertMapTitle, text: t.exploreConcertMapText, href: "/concert-map", symbol: "◎" },
    { title: t.exploreCommunityTitle, text: t.exploreCommunityText, href: "/countries", symbol: "♡" },
    { title: t.exploreMessagesTitle, text: t.exploreMessagesText, href: "/messages", symbol: "✦" },
    { title: t.exploreMemoriesTitle, text: t.exploreMemoriesText, href: "/fan-memories", symbol: "◌" },
  ];

  const stats = [
    { value: "670", label: t.statsMapped },
    { value: "7", label: t.statsLanguages },
    { value: "3", label: t.statsCommunity },
    { value: "∞", label: t.statsJourney },
  ];

  const behindTextParts = t.behindText.split("@bestofneyo_");


  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">

      {/* =====================================================
          FUNDO
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute left-[-12%] top-[5%] h-[650px] w-[650px] rounded-full bg-[#D51C24]/5 blur-[210px]" />

        <div className="absolute right-[-10%] top-[10%] h-[720px] w-[720px] rounded-full bg-[#D4AF37]/5 blur-[230px]" />

        <div className="absolute bottom-[-20%] left-[25%] h-[500px] w-[500px] rounded-full bg-[#D4AF37]/3 blur-[200px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.88)_100%)]" />

      </div>


      <SiteHeader />


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 px-6 pb-20 pt-16 text-center lg:px-10 lg:pt-24">

        <div className="mx-auto max-w-[1000px]">

          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]">
            {t.aboutLabel}
          </p>


          <div className="mt-6">

            <h1 className="text-5xl font-black uppercase leading-[0.98] tracking-[-0.045em] md:text-6xl">

              <span className="block">
                {t.heroTitle1}
              </span>

              <span className="mt-2 block">
                {t.heroTitle2}
              </span>

              <span className="mt-2 block text-[#D51C24]">
                {t.heroTitle3}
              </span>

            </h1>

          </div>


          <p className="mx-auto mt-7 max-w-[680px] text-[14px] leading-7 text-white/55 md:text-[16px]">
            {t.heroText}
          </p>


          <div className="mx-auto mt-8 flex max-w-max items-center gap-4">

            <span className="h-[5px] w-[5px] rounded-full bg-[#D51C24]" />

            <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              {t.motto}
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          INDEPENDENT PROJECT
      ====================================================== */}

      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-[1000px]">

          <div className="relative overflow-hidden rounded-[24px] border border-[#D51C24]/20 bg-[#050607] p-8 md:p-8">

            <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[#D51C24]/5 blur-[100px]" />


            <div className="relative z-10">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
                {t.independentLabel}
              </p>


              <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                {t.independentTitle}
              </h2>


              <p className="mt-6 max-w-[800px] text-sm leading-8 text-white/45 md:text-[15px]">
                {t.independentText}
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          THE IDEA
      ====================================================== */}

      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
                {t.ideaLabel}
              </p>


              <h2 className="mt-4 max-w-[430px] text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                {t.ideaTitle}
              </h2>

            </div>


            <div className="space-y-6 text-sm leading-8 text-white/50 md:text-[15px]">

              <p>
                {t.ideaText1}
              </p>

              <p>
                {t.ideaText2}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MOTTO
      ====================================================== */}

      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-[1100px]">

          <div className="relative overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#050607] p-8 text-center md:p-8">

            <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[#D51C24]/5 blur-[110px]" />

            <div className="pointer-events-none absolute bottom-[-120px] right-[-100px] h-[320px] w-[320px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />


            <div className="relative z-10">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
                {t.mottoLabel}
              </p>


              <h2 className="mt-5 text-3xl font-black uppercase tracking-[-0.035em] md:text-4xl">
                One World
                <span className="text-[#D4AF37]"> - </span>
                One Music
                <span className="text-[#D4AF37]"> - </span>
                <span className="text-[#D51C24]">
                  One Love
                </span>
              </h2>


              <p className="mx-auto mt-7 max-w-[760px] text-sm leading-8 text-white/45 md:text-[15px]">
                {t.mottoText}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BUILT AROUND FANS
      ====================================================== */}

      <section className="relative z-10 px-6 py-20 lg:px-10">

        <div className="mx-auto max-w-[1200px]">

          <div className="grid gap-12 lg:grid-cols-2">

            <div className="rounded-[24px] border border-[#D4AF37]/15 bg-[#090A0B] p-6 md:p-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
                {t.fansLabel}
              </p>


              <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em]">
                {t.fansTitle}
              </h2>


              <div className="mt-6 space-y-5 text-sm leading-8 text-white/45">

                <p>
                  {t.fansText1}
                </p>

                <p>
                  {t.fansText2}
                </p>

              </div>

            </div>


            <div className="rounded-[24px] border border-[#D4AF37]/15 bg-[#090A0B] p-6 md:p-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                {t.fanPagesLabel}
              </p>


              <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                {t.fanPagesTitle}
              </h2>


              <div className="mt-6 space-y-5 text-sm leading-8 text-white/45">

                <p>
                  {t.fanPagesText1}
                </p>

                <p>
                  {t.fanPagesText2}
                </p>

              </div>


              <div className="mt-8">

                <a
                  href="/join"
                  className="group inline-flex items-center gap-5 rounded-xl border border-[#D51C24]/55 bg-[#D51C24]/5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#D4AF37]"
                >

                  {t.joinButton}

                  <span className="text-[#D51C24] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]">
                    →
                  </span>

                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BEHIND NE-YO WORLD
      ====================================================== */}

      <section className="relative z-10 border-y border-[#D4AF37]/10 bg-[#08090A] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                {t.behindLabel}
              </p>

              <h2 className="mt-4 max-w-[520px] text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                {t.behindTitle}
              </h2>
            </div>

            <div className="rounded-[24px] border border-[#D51C24]/20 bg-[#050607] p-6 md:p-8">
              <p className="text-sm leading-8 text-white/50 md:text-[15px]">
                {behindTextParts[0]}
                <a
                  href="https://www.instagram.com/bestofneyo_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-inherit underline decoration-white/20 underline-offset-4 transition hover:decoration-white/50"
                >
                  @bestofneyo_
                </a>
                {behindTextParts[1]}
              </p>
              <p className="mt-5 text-sm leading-8 text-white/35 md:text-[15px]">
                {t.behindText2}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          EXPLORE
      ====================================================== */}

      <section className="relative z-10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              {t.exploreLabel}
            </p>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.035em] md:text-4xl">
              {t.exploreTitle}
            </h2>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {exploreItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-4 sm:p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D51C24]/25 text-sm text-[#D51C24]">
                  {item.symbol}
                </div>

                <h3 className="mt-4 text-[15px] font-bold leading-5 tracking-[-0.02em] sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-2 text-[12px] leading-5 text-white/45 sm:text-[13px] sm:leading-6">
                  {item.text}
                </p>

                <span className="mt-4 inline-flex text-sm text-[#D4AF37] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      



      {/* =====================================================
          PROJECT STATS
      ====================================================== */}

      <section className="relative z-10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-[#D4AF37]/12 bg-[#D4AF37]/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#08090A] px-6 py-8 text-center">
                <p className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =====================================================
          FINAL
      ====================================================== */}

      <section className="relative z-10 px-6 py-20 text-center lg:px-10">

        <div className="mx-auto max-w-[800px]">

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            {t.finalLabel}
          </p>


          <h2 className="mt-5 text-3xl font-black uppercase leading-[1.08] tracking-[-0.035em] md:text-4xl">

            {t.finalTitle1}

            <br />

            {t.finalTitle2}

            <br />

            <span className="text-[#D51C24]">
              {t.finalTitle3}
            </span>

          </h2>


          <p className="mx-auto mt-6 max-w-[620px] text-sm leading-7 text-white/45">
            {t.finalText}
          </p>

          <p className="mx-auto mt-5 max-w-[700px] text-[13px] italic leading-7 text-white/30">
            {t.finalQuote}
          </p>


          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <a
              href="/countries"
              className="group inline-flex items-center gap-5 rounded-xl border border-[#D4AF37]/45 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#D51C24]"
            >

              {t.countriesButton}

              <span className="text-[#D4AF37] transition-transform group-hover:translate-x-1">
                →
              </span>

            </a>


            <a
              href="/join"
              className="group inline-flex items-center gap-5 rounded-xl border border-[#D51C24]/55 bg-[#D51C24]/5 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#D4AF37]"
            >

              {t.joinButton}

              <span className="text-[#D51C24] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]">
                →
              </span>

            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-[#D4AF37]/10 bg-black px-6 py-8 lg:px-10">

        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 sm:flex-row">

          <a href="/">

            <img
              src="/ne-yo-world-logo.png.png"
              alt="Ne-Yo World"
              className="h-[60px] w-auto object-contain"
            />

          </a>


          <div className="flex flex-wrap items-center justify-center gap-6 text-[9px] uppercase tracking-[0.18em] text-white/30">

            <a
              href="/"
              className="transition hover:text-[#D4AF37]"
            >
              {t.home}
            </a>

            <a
              href="/countries"
              className="transition hover:text-[#D4AF37]"
            >
              {t.countries}
            </a>

            <a
              href="/messages"
              className="transition hover:text-[#D4AF37]"
            >
              {t.messages}
            </a>

            <a
              href="/ne-yo"
              className="transition hover:text-[#D4AF37]"
            >
              {t.neyo}
            </a>

          </div>


          <p className="text-[9px] uppercase tracking-[0.28em] text-white/20">
            {t.motto}
          </p>

        </div>

      </footer>

    </main>
  );
}