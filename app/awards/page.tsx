"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import SiteHeader from "../components/SiteHeader";

const copy = {
  EN: {
    grammyMomentEyebrow: "Featured Moment · 2009",
    grammyMomentTitle: "A Defining GRAMMY Night",
    grammyMomentBody: "At the 51st GRAMMY Awards, Miss Independent earned two wins and Ne-Yo made his GRAMMY stage debut in a tribute to the Four Tops.",
    grammyMomentAction: "Watch on GRAMMY.com",
    vegasMomentEyebrow: "Featured Moment · 2024",
    vegasMomentTitle: "The Key to Las Vegas",
    vegasMomentCaption: "Encore Theater · Las Vegas · August 7, 2024",
    eyebrow: "Recognition · Honors · Milestones",
    title: "Awards & Milestones",
    intro: "A selected record of the awards, songwriting honors and official recognitions that mark Ne-Yo's career.",
    stats: [["3", "GRAMMY wins"], ["16", "GRAMMY nominations"], ["2012", "Songwriters Hall of Fame honor"], ["2024", "NE-YO Day · Las Vegas"]],
    grammyEyebrow: "The Recording Academy", grammyTitle: "GRAMMY Awards",
    grammyIntro: "Ne-Yo has 3 GRAMMY wins and 16 nominations. His wins recognize both his work as a recording artist and as a songwriter.",
    wins: "GRAMMY Wins",
    grammyWins: [
      ["2008", "Because of You", "Best Contemporary R&B Album"],
      ["2009", "Miss Independent", "Best Male R&B Vocal Performance"],
      ["2009", "Miss Independent", "Best R&B Song · songwriter"],
    ],
    nominationsTitle: "Beyond the Wins",
    nominationsText: "His GRAMMY history also includes Album of the Year recognition for Year of the Gentleman, Record of the Year for Beyoncé's Irreplaceable, Best R&B Song for Jennifer Hudson's Spotlight, and nominations connected with Rihanna, Calvin Harris, Keri Hilson and Mary J. Blige.",
    songwritingEyebrow: "Songwriting Recognition", songwritingTitle: "Recognized for the Pen",
    songwritingIntro: "Some of Ne-Yo's most important honors recognize the writing behind the records, not only the voice performing them.",
    songwriting: [
      ["2007", "BMI Urban Awards", "Songwriter of the Year", "Ne-Yo shared BMI's Songwriter of the Year title, recognizing his impact as a writer across major R&B and pop records."],
      ["2008", "BMI Urban Awards", "Song of the Year · Irreplaceable", "Beyoncé's Irreplaceable, co-written by Ne-Yo, received BMI Urban Song of the Year."],
      ["2012", "Songwriters Hall of Fame", "Hal David Starlight Award", "The Songwriters Hall of Fame honored Ne-Yo for making a significant impact on the music industry through his original songs."],
    ],
    musicEyebrow: "Major Music Recognition", musicTitle: "Across the Industry",
    musicIntro: "Alongside the GRAMMYs and songwriting honors, Ne-Yo has also been recognized by major music institutions during key stages of his career.",
    betTitle: "Best Male R&B Artist", betBody: "Ne-Yo won Best Male R&B Artist at the 2007 BET Awards.",
    diamondTitle: "First RIAA Diamond Certification", diamondBody: "In 2024, Give Me Everything by Pitbull featuring Ne-Yo, Afrojack and Nayer reached RIAA Diamond status, representing more than 10 million certified units in the United States and giving Ne-Yo his first Diamond certification.",
    honorsEyebrow: "Official Honors", honorsTitle: "A City Honors Ne-Yo",
    honorsBody: "On August 7, 2024, during the opening night of his Human Love Rebellion residency at Encore Theater at Wynn Las Vegas, Ne-Yo received the Key to the City of Las Vegas. Mayor Carolyn Goodman also issued a proclamation designating August 7 as NE-YO Day in the city, recognizing his musical achievements and community contributions.",
    key: "Key to the City", day: "August 7 · NE-YO Day", city: "Las Vegas · 2024",
    explore: "Continue Exploring", careerMore: "More of Ne-Yo\'s career", music: "Music", neyo: "Ne-Yo", film: "Film, TV & Stage", neyoDesc: "Return to the main artist profile.", musicDesc: "Explore albums, songwriting and musical evolution.", filmDesc: "Explore acting, television and stage work.",
  },
  PT: {
    grammyMomentEyebrow: "Momento em Destaque · 2009",
    grammyMomentTitle: "Uma Noite Marcante nos GRAMMY",
    grammyMomentBody: "Nos 51.º Prémios GRAMMY, Miss Independent conquistou duas vitórias e Ne-Yo fez a sua estreia no palco dos GRAMMY num tributo aos Four Tops.",
    grammyMomentAction: "Ver no GRAMMY.com",
    vegasMomentEyebrow: "Momento em Destaque · 2024",
    vegasMomentTitle: "A Chave de Las Vegas",
    vegasMomentCaption: "Encore Theater · Las Vegas · 7 de agosto de 2024",
    eyebrow: "Reconhecimento · Honras · Marcos", title: "Prémios & Marcos",
    intro: "Um registo selecionado dos prémios, distinções pela composição e reconhecimentos oficiais que marcam a carreira de Ne-Yo.",
    stats: [["3", "vitórias nos GRAMMY"], ["16", "nomeações nos GRAMMY"], ["2012", "distinção Songwriters Hall of Fame"], ["2024", "NE-YO Day · Las Vegas"]],
    grammyEyebrow: "The Recording Academy", grammyTitle: "Prémios GRAMMY",
    grammyIntro: "Ne-Yo soma 3 vitórias nos GRAMMY e 16 nomeações. As vitórias reconhecem tanto o seu trabalho como intérprete como o seu trabalho de compositor.",
    wins: "Vitórias nos GRAMMY",
    grammyWins: [["2008", "Because of You", "Melhor Álbum de R&B Contemporâneo"], ["2009", "Miss Independent", "Melhor Performance Vocal Masculina de R&B"], ["2009", "Miss Independent", "Melhor Canção de R&B · compositor"]],
    nominationsTitle: "Para Além das Vitórias",
    nominationsText: "O seu percurso nos GRAMMY inclui ainda reconhecimento de Álbum do Ano por Year of the Gentleman, Gravação do Ano por Irreplaceable de Beyoncé, Melhor Canção de R&B por Spotlight de Jennifer Hudson e nomeações ligadas a Rihanna, Calvin Harris, Keri Hilson e Mary J. Blige.",
    songwritingEyebrow: "Reconhecimento pela Composição", songwritingTitle: "Reconhecido pela Escrita",
    songwritingIntro: "Algumas das distinções mais importantes de Ne-Yo reconhecem a escrita por detrás dos discos, e não apenas a voz que os interpreta.",
    songwriting: [
      ["2007", "BMI Urban Awards", "Compositor do Ano", "Ne-Yo partilhou o título de Compositor do Ano da BMI, reconhecendo o seu impacto como compositor em grandes discos de R&B e pop."],
      ["2008", "BMI Urban Awards", "Canção do Ano · Irreplaceable", "Irreplaceable, de Beyoncé e coescrita por Ne-Yo, recebeu o prémio Canção Urbana do Ano da BMI."],
      ["2012", "Songwriters Hall of Fame", "Hal David Starlight Award", "O Songwriters Hall of Fame distinguiu Ne-Yo pelo impacto significativo das suas canções originais na indústria musical."],
    ],
    musicEyebrow: "Reconhecimento Musical", musicTitle: "Ao Longo da Indústria",
    musicIntro: "Para além dos GRAMMY e das distinções pela composição, Ne-Yo também foi reconhecido por grandes instituições musicais em momentos importantes da sua carreira.",
    betTitle: "Melhor Artista Masculino de R&B", betBody: "Ne-Yo venceu a categoria Melhor Artista Masculino de R&B nos BET Awards de 2007.",
    diamondTitle: "Primeira Certificação RIAA Diamond", diamondBody: "Em 2024, Give Me Everything, de Pitbull com Ne-Yo, Afrojack e Nayer, atingiu a certificação Diamond da RIAA, correspondente a mais de 10 milhões de unidades certificadas nos Estados Unidos e à primeira certificação Diamond de Ne-Yo.",
    honorsEyebrow: "Honras Oficiais", honorsTitle: "Uma Cidade Homenageia Ne-Yo",
    honorsBody: "A 7 de agosto de 2024, na noite de abertura da residência Human Love Rebellion no Encore Theater at Wynn Las Vegas, Ne-Yo recebeu a Key to the City of Las Vegas. A presidente da câmara Carolyn Goodman emitiu também uma proclamação que designou 7 de agosto como NE-YO Day na cidade, reconhecendo as suas conquistas musicais e contribuições para a comunidade.",
    key: "Chave da Cidade", day: "7 de agosto · Dia NE-YO", city: "Las Vegas · 2024",
    explore: "Continuar a Explorar", careerMore: "Mais da carreira de Ne-Yo", music: "Música", neyo: "Ne-Yo", film: "Cinema, TV & Palco", neyoDesc: "Voltar ao perfil principal do artista.", musicDesc: "Explorar álbuns, composição e evolução musical.", filmDesc: "Explorar cinema, televisão e palco.",
  },
  ES: {
    grammyMomentEyebrow: "Momento Destacado · 2009",
    grammyMomentTitle: "Una Noche Decisiva en los GRAMMY",
    grammyMomentBody: "En los 51st GRAMMY Awards, Miss Independent logró dos victorias y Ne-Yo debutó en el escenario de los GRAMMY en un tributo a los Four Tops.",
    grammyMomentAction: "Ver en GRAMMY.com",
    vegasMomentEyebrow: "Momento Destacado · 2024",
    vegasMomentTitle: "La Llave de Las Vegas",
    vegasMomentCaption: "Encore Theater · Las Vegas · 7 de agosto de 2024",
    eyebrow:"Reconocimiento · Honores · Hitos",title:"Premios & Hitos",intro:"Una selección de premios, honores de composición y reconocimientos oficiales que marcan la carrera de Ne-Yo.",
    stats:[["3","victorias GRAMMY"],["16","nominaciones GRAMMY"],["2012","honor Songwriters Hall of Fame"],["2024","Día NE-YO · Las Vegas"]],
    grammyEyebrow:"The Recording Academy",grammyTitle:"Premios GRAMMY",grammyIntro:"Ne-Yo tiene 3 victorias y 16 nominaciones a los GRAMMY, por su trabajo como artista y compositor.",wins:"Victorias GRAMMY",
    grammyWins:[["2008","Because of You","Mejor Álbum de R&B Contemporáneo"],["2009","Miss Independent","Mejor Interpretación Vocal Masculina de R&B"],["2009","Miss Independent","Mejor Canción de R&B · compositor"]],
    nominationsTitle:"Más Allá de las Victorias",nominationsText:"Su historia en los GRAMMY incluye reconocimiento a Álbum del Año por Year of the Gentleman, Grabación del Año por Irreplaceable de Beyoncé, Mejor Canción de R&B por Spotlight de Jennifer Hudson y nominaciones vinculadas a Rihanna, Calvin Harris, Keri Hilson y Mary J. Blige.",
    songwritingEyebrow:"Reconocimiento a la Composición",songwritingTitle:"Reconocido por la Escritura",songwritingIntro:"Algunos de sus honores más importantes reconocen la escritura detrás de los discos, no solo la voz.",
    songwriting:[["2007","BMI Urban Awards","Compositor del Año","Ne-Yo compartió el título de Compositor del Año de BMI."],["2008","BMI Urban Awards","Canción del Año · Irreplaceable","Irreplaceable, coescrita por Ne-Yo, recibió el reconocimiento de Canción Urbana del Año de BMI."],["2012","Songwriters Hall of Fame","Hal David Starlight Award","El Songwriters Hall of Fame reconoció el impacto de sus canciones originales."]],
    musicEyebrow:"Reconocimiento Musical",musicTitle:"A Través de la Industria",musicIntro:"Además de los GRAMMY y los honores como compositor, otras instituciones musicales han reconocido su carrera.",
    betTitle:"Mejor Artista Masculino de R&B",betBody:"Ne-Yo ganó la categoría Mejor Artista Masculino de R&B en los BET Awards de 2007.",diamondTitle:"Primera Certificación RIAA Diamond",diamondBody:"En 2024, Give Me Everything de Pitbull con Ne-Yo, Afrojack y Nayer alcanzó RIAA Diamond por más de 10 millones de unidades certificadas en Estados Unidos, la primera certificación Diamond de Ne-Yo.",
    honorsEyebrow:"Honores Oficiales",honorsTitle:"Una Ciudad Honra a Ne-Yo",honorsBody:"El 7 de agosto de 2024, durante la apertura de Human Love Rebellion en Encore Theater at Wynn Las Vegas, Ne-Yo recibió la Llave de la Ciudad de Las Vegas. La alcaldesa Carolyn Goodman también proclamó el 7 de agosto como Día NE-YO.",
    key:"Llave de la Ciudad",day:"7 de agosto · Día NE-YO",city:"Las Vegas · 2024",explore:"Continuar Explorando",careerMore:"Más de la carrera de Ne-Yo",music:"Música",neyo:"Ne-Yo",film:"Cine, TV & Escenario",neyoDesc:"Volver al perfil principal del artista.",musicDesc:"Explora álbumes, composición y evolución musical.",filmDesc:"Explora cine, televisión y escenario.",
  },
  FR: {
    grammyMomentEyebrow: "Moment Fort · 2009",
    grammyMomentTitle: "Une Soirée Marquante aux GRAMMY",
    grammyMomentBody: "Lors des 51st GRAMMY Awards, Miss Independent a remporté deux prix et Ne-Yo a fait ses débuts sur la scène des GRAMMY lors d’un hommage aux Four Tops.",
    grammyMomentAction: "Voir sur GRAMMY.com",
    vegasMomentEyebrow: "Moment Fort · 2024",
    vegasMomentTitle: "La Clé de Las Vegas",
    vegasMomentCaption: "Encore Theater · Las Vegas · 7 août 2024",
    eyebrow:"Reconnaissance · Honneurs · Jalons",title:"Prix & Jalons",intro:"Une sélection de prix, distinctions d'écriture et reconnaissances officielles qui jalonnent la carrière de Ne-Yo.",
    stats:[["3","victoires aux GRAMMY"],["16","nominations aux GRAMMY"],["2012","honneur Songwriters Hall of Fame"],["2024","NE-YO Day · Las Vegas"]],
    grammyEyebrow:"The Recording Academy",grammyTitle:"Prix GRAMMY",grammyIntro:"Ne-Yo compte 3 victoires et 16 nominations aux GRAMMY, pour son travail d'artiste et d'auteur.",wins:"Victoires aux GRAMMY",
    grammyWins:[["2008","Because of You","Meilleur Album R&B Contemporain"],["2009","Miss Independent","Meilleure Performance Vocale R&B Masculine"],["2009","Miss Independent","Meilleure Chanson R&B · auteur"]],
    nominationsTitle:"Au-delà des Victoires",nominationsText:"Son parcours aux GRAMMY comprend aussi une reconnaissance pour l’Album de l’Année avec Year of the Gentleman, l’Enregistrement de l’Année avec Irreplaceable de Beyoncé, la Meilleure Chanson R&B avec Spotlight de Jennifer Hudson, ainsi que des nominations liées à Rihanna, Calvin Harris, Keri Hilson et Mary J. Blige.",
    songwritingEyebrow:"Reconnaissance de l'Écriture",songwritingTitle:"Reconnu pour sa Plume",songwritingIntro:"Certaines distinctions majeures récompensent l'écriture derrière les disques, pas seulement la voix.",
    songwriting:[["2007","BMI Urban Awards","Auteur-compositeur de l’Année","Ne-Yo a partagé le titre BMI d’Auteur-compositeur de l’Année."],["2008","BMI Urban Awards","Chanson de l’Année · Irreplaceable","Irreplaceable, coécrite par Ne-Yo, a reçu le prix BMI de Chanson Urbaine de l’Année."],["2012","Songwriters Hall of Fame","Hal David Starlight Award","Le Songwriters Hall of Fame a honoré l'impact de ses chansons originales."]],
    musicEyebrow:"Reconnaissance Musicale",musicTitle:"À Travers l'Industrie",musicIntro:"Au-delà des GRAMMY et des honneurs d'écriture, de grandes institutions ont également reconnu sa carrière.",
    betTitle:"Meilleur Artiste Masculin R&B",betBody:"Ne-Yo a remporté la catégorie Meilleur Artiste Masculin R&B aux BET Awards 2007.",diamondTitle:"Première Certification RIAA Diamond",diamondBody:"En 2024, Give Me Everything de Pitbull avec Ne-Yo, Afrojack et Nayer a atteint le statut RIAA Diamond pour plus de 10 millions d'unités certifiées aux États-Unis, une première pour Ne-Yo.",
    honorsEyebrow:"Honneurs Officiels",honorsTitle:"Une Ville Honore Ne-Yo",honorsBody:"Le 7 août 2024, à l'ouverture de Human Love Rebellion à l'Encore Theater at Wynn Las Vegas, Ne-Yo a reçu la Clé de la Ville de Las Vegas. La maire Carolyn Goodman a aussi proclamé le 7 août Journée NE-YO.",
    key:"Clé de la Ville",day:"7 août · Journée NE-YO",city:"Las Vegas · 2024",explore:"Continuer à Explorer",careerMore:"Plus de la carrière de Ne-Yo",music:"Musique",neyo:"Ne-Yo",film:"Cinéma, TV & Scène",neyoDesc:"Retour au profil principal de l’artiste.",musicDesc:"Explorez les albums, l’écriture et l’évolution musicale.",filmDesc:"Explorez le cinéma, la télévision et la scène.",
  },
  DE: {
    grammyMomentEyebrow: "Besonderer Moment · 2009",
    grammyMomentTitle: "Ein Prägender GRAMMY-Abend",
    grammyMomentBody: "Bei den 51st GRAMMY Awards gewann Miss Independent zwei Preise und Ne-Yo gab bei einer Four-Tops-Hommage sein Debüt auf der GRAMMY-Bühne.",
    grammyMomentAction: "Auf GRAMMY.com ansehen",
    vegasMomentEyebrow: "Besonderer Moment · 2024",
    vegasMomentTitle: "Der Schlüssel zu Las Vegas",
    vegasMomentCaption: "Encore Theater · Las Vegas · 7. August 2024",
    eyebrow:"Auszeichnungen · Ehrungen · Meilensteine",title:"Auszeichnungen & Meilensteine",intro:"Eine Auswahl an Preisen, Songwriting-Ehrungen und offiziellen Anerkennungen aus Ne-Yos Karriere.",
    stats:[["3","GRAMMY-Siege"],["16","GRAMMY-Nominierungen"],["2012","Songwriters Hall of Fame Ehrung"],["2024","NE-YO Day · Las Vegas"]],
    grammyEyebrow:"The Recording Academy",grammyTitle:"GRAMMY-Auszeichnungen",grammyIntro:"Ne-Yo hat 3 GRAMMY-Siege und 16 Nominierungen als Künstler und Songwriter.",wins:"GRAMMY-Siege",
    grammyWins:[["2008","Because of You","Bestes zeitgenössisches R&B-Album"],["2009","Miss Independent","Beste männliche R&B-Gesangsdarbietung"],["2009","Miss Independent","Bester R&B-Song · Songwriter"]],
    nominationsTitle:"Über die Siege hinaus",nominationsText:"Seine GRAMMY-Geschichte umfasst auch Anerkennung als Album des Jahres für Year of the Gentleman, Aufnahme des Jahres für Beyoncés Irreplaceable, Bester R&B-Song für Jennifer Hudsons Spotlight sowie Nominierungen im Zusammenhang mit Rihanna, Calvin Harris, Keri Hilson und Mary J. Blige.",
    songwritingEyebrow:"Songwriting-Anerkennung",songwritingTitle:"Für das Schreiben Geehrt",songwritingIntro:"Einige seiner wichtigsten Ehrungen würdigen das Songwriting hinter den Aufnahmen.",
    songwriting:[["2007","BMI Urban Awards","Songwriter des Jahres","Ne-Yo teilte sich den BMI-Titel Songwriter of the Year."],["2008","BMI Urban Awards","Song des Jahres · Irreplaceable","Das von Ne-Yo mitgeschriebene Irreplaceable erhielt BMI Urban Song of the Year."],["2012","Songwriters Hall of Fame","Hal David Starlight Award","Die Songwriters Hall of Fame würdigte den Einfluss seiner Originalsongs."]],
    musicEyebrow:"Musikalische Anerkennung",musicTitle:"In der Musikindustrie",musicIntro:"Neben GRAMMYs und Songwriting-Ehrungen wurde seine Karriere auch von weiteren großen Institutionen anerkannt.",
    betTitle:"Bester männlicher R&B-Künstler",betBody:"Ne-Yo gewann bei den BET Awards 2007 die Kategorie Bester männlicher R&B-Künstler.",diamondTitle:"Erste RIAA-Diamond-Zertifizierung",diamondBody:"2024 erreichte Give Me Everything von Pitbull mit Ne-Yo, Afrojack und Nayer RIAA-Diamond-Status für mehr als 10 Millionen zertifizierte Einheiten in den USA und wurde damit Ne-Yos erste Diamond-Zertifizierung.",
    honorsEyebrow:"Offizielle Ehrungen",honorsTitle:"Eine Stadt ehrt Ne-Yo",honorsBody:"Am 7. August 2024 erhielt Ne-Yo zur Eröffnung seiner Human Love Rebellion Residency im Encore Theater at Wynn Las Vegas den Key to the City of Las Vegas. Bürgermeisterin Carolyn Goodman erklärte den 7. August außerdem zum NE-YO Day.",
    key:"Schlüssel zur Stadt",day:"7. August · NE-YO-Tag",city:"Las Vegas · 2024",explore:"Weiter entdecken",careerMore:"Mehr aus Ne-Yos Karriere",music:"Musik",neyo:"Ne-Yo",film:"Film, TV & Bühne",neyoDesc:"Zurück zum Hauptprofil des Künstlers.",musicDesc:"Alben, Songwriting und musikalische Entwicklung entdecken.",filmDesc:"Film, Fernsehen und Bühnenarbeit entdecken.",
  },
  IT: {
    grammyMomentEyebrow: "Momento in Evidenza · 2009",
    grammyMomentTitle: "Una Serata Memorabile ai GRAMMY",
    grammyMomentBody: "Ai 51st GRAMMY Awards, Miss Independent ottenne due vittorie e Ne-Yo debuttò sul palco dei GRAMMY in un tributo ai Four Tops.",
    grammyMomentAction: "Guarda su GRAMMY.com",
    vegasMomentEyebrow: "Momento in Evidenza · 2024",
    vegasMomentTitle: "La Chiave di Las Vegas",
    vegasMomentCaption: "Encore Theater · Las Vegas · 7 agosto 2024",
    eyebrow:"Riconoscimenti · Onori · Traguardi",title:"Premi & Traguardi",intro:"Una selezione di premi, riconoscimenti per la scrittura e onorificenze ufficiali che segnano la carriera di Ne-Yo.",
    stats:[["3","vittorie GRAMMY"],["16","nomination GRAMMY"],["2012","onore Songwriters Hall of Fame"],["2024","NE-YO Day · Las Vegas"]],
    grammyEyebrow:"The Recording Academy",grammyTitle:"Premi GRAMMY",grammyIntro:"Ne-Yo conta 3 vittorie e 16 nomination ai GRAMMY per il suo lavoro come artista e autore.",wins:"Vittorie GRAMMY",
    grammyWins:[["2008","Because of You","Miglior Album R&B Contemporaneo"],["2009","Miss Independent","Miglior Performance Vocale R&B Maschile"],["2009","Miss Independent","Miglior Canzone R&B · autore"]],
    nominationsTitle:"Oltre le Vittorie",nominationsText:"La sua storia ai GRAMMY comprende anche il riconoscimento per Album dell’Anno con Year of the Gentleman, Registrazione dell’Anno con Irreplaceable di Beyoncé, Miglior Canzone R&B con Spotlight di Jennifer Hudson e nomination legate a Rihanna, Calvin Harris, Keri Hilson e Mary J. Blige.",
    songwritingEyebrow:"Riconoscimenti alla Scrittura",songwritingTitle:"Riconosciuto per la Scrittura",songwritingIntro:"Alcuni dei suoi riconoscimenti più importanti celebrano la scrittura dietro i dischi.",
    songwriting:[["2007","BMI Urban Awards","Autore dell’Anno","Ne-Yo ha condiviso il titolo BMI Songwriter of the Year."],["2008","BMI Urban Awards","Canzone dell’Anno · Irreplaceable","Irreplaceable, co-scritta da Ne-Yo, ha ricevuto BMI Urban Song of the Year."],["2012","Songwriters Hall of Fame","Hal David Starlight Award","La Songwriters Hall of Fame ha riconosciuto l'impatto delle sue canzoni originali."]],
    musicEyebrow:"Riconoscimento Musicale",musicTitle:"Nell'Industria",musicIntro:"Oltre ai GRAMMY e ai riconoscimenti per la scrittura, altre importanti istituzioni hanno premiato la sua carriera.",
    betTitle:"Miglior Artista R&B Maschile",betBody:"Ne-Yo ha vinto la categoria Miglior Artista R&B Maschile ai BET Awards 2007.",diamondTitle:"Prima Certificazione RIAA Diamond",diamondBody:"Nel 2024, Give Me Everything di Pitbull con Ne-Yo, Afrojack e Nayer ha raggiunto RIAA Diamond per oltre 10 milioni di unità certificate negli Stati Uniti, la prima certificazione Diamond di Ne-Yo.",
    honorsEyebrow:"Onori Ufficiali",honorsTitle:"Una Città Onora Ne-Yo",honorsBody:"Il 7 agosto 2024, all'apertura della residency Human Love Rebellion all'Encore Theater at Wynn Las Vegas, Ne-Yo ha ricevuto la Key to the City di Las Vegas. La sindaca Carolyn Goodman ha inoltre proclamato il 7 agosto NE-YO Day.",
    key:"Chiave della Città",day:"7 agosto · Giorno NE-YO",city:"Las Vegas · 2024",explore:"Continua a Esplorare",careerMore:"Altro dalla carriera di Ne-Yo",music:"Musica",neyo:"Ne-Yo",film:"Cinema, TV & Palco",neyoDesc:"Torna al profilo principale dell’artista.",musicDesc:"Esplora album, scrittura ed evoluzione musicale.",filmDesc:"Esplora cinema, televisione e palco.",
  },
  JA: {
    grammyMomentEyebrow: "注目の瞬間 · 2009",
    grammyMomentTitle: "記憶に残るGRAMMYの夜",
    grammyMomentBody: "51st GRAMMY AwardsでMiss Independentが2部門を受賞し、Ne-YoはFour TopsへのトリビュートでGRAMMYのステージに初登場しました。",
    grammyMomentAction: "GRAMMY.comで見る",
    vegasMomentEyebrow: "注目の瞬間 · 2024",
    vegasMomentTitle: "ラスベガス市の鍵",
    vegasMomentCaption: "Encore Theater · Las Vegas · 2024年8月7日",
    eyebrow:"受賞 · 栄誉 · マイルストーン",title:"受賞歴 & マイルストーン",intro:"Ne-Yoのキャリアを形作ってきた受賞、ソングライティングの栄誉、公式な顕彰を厳選して紹介します。",
    stats:[["3","GRAMMY受賞"],["16","GRAMMYノミネート"],["2012","Songwriters Hall of Fame表彰"],["2024","NE-YO Day · Las Vegas"]],
    grammyEyebrow:"The Recording Academy",grammyTitle:"グラミー賞",grammyIntro:"Ne-YoはGRAMMYで3回受賞、16回ノミネートされています。アーティストとしてだけでなくソングライターとしての仕事も評価されています。",wins:"GRAMMY受賞",
    grammyWins:[["2008","Because of You","最優秀コンテンポラリーR&Bアルバム"],["2009","Miss Independent","最優秀男性R&Bボーカル・パフォーマンス"],["2009","Miss Independent","最優秀R&Bソング · ソングライター"]],
    nominationsTitle:"受賞以外の評価",nominationsText:"Year of the Gentlemanの年間最優秀アルバム、BeyoncéのIrreplaceableの年間最優秀レコード、Jennifer HudsonのSpotlightの最優秀R&Bソングのほか、Rihanna、Calvin Harris、Keri Hilson、Mary J. Bligeに関連するノミネートもあります。",
    songwritingEyebrow:"ソングライティングの評価",songwritingTitle:"「書く力」への栄誉",songwritingIntro:"重要な栄誉の中には、歌声だけでなく作品の背後にあるソングライティングを評価したものがあります。",
    songwriting:[["2007","BMI Urban Awards","年間最優秀ソングライター","Ne-YoはBMI Songwriter of the Yearを共同受賞しました。"],["2008","BMI Urban Awards","年間最優秀楽曲 · Irreplaceable","Ne-Yoが共作したIrreplaceableがBMI Urban Song of the Yearを受賞しました。"],["2012","Songwriters Hall of Fame","Hal David Starlight Award","オリジナル楽曲による音楽業界への大きな影響が評価されました。"]],
    musicEyebrow:"音楽界での評価",musicTitle:"業界を通した評価",musicIntro:"GRAMMYやソングライティングの栄誉に加え、キャリアの重要な時期に他の主要音楽機関からも評価されています。",
    betTitle:"最優秀男性R&Bアーティスト",betBody:"Ne-Yoは2007年のBET Awardsで最優秀男性R&Bアーティストを受賞しました。",diamondTitle:"初のRIAA Diamond認定",diamondBody:"2024年、Pitbull feat. Ne-Yo, Afrojack & NayerのGive Me Everythingが米国で1,000万認定ユニットを超えるRIAA Diamondに到達し、Ne-Yoにとって初のDiamond認定となりました。",
    honorsEyebrow:"公式な栄誉",honorsTitle:"ラスベガスからの顕彰",honorsBody:"2024年8月7日、Encore Theater at Wynn Las VegasでのHuman Love Rebellion初日に、Ne-YoはKey to the City of Las Vegasを授与されました。Carolyn Goodman市長は同日をNE-YO Dayとする宣言も行いました。",
    key:"市の鍵",day:"8月7日 · NE-YOの日",city:"Las Vegas · 2024",explore:"さらに見る",careerMore:"Ne-Yoのキャリアをもっと見る",music:"音楽",neyo:"Ne-Yo",film:"映画・TV・舞台",neyoDesc:"メインのアーティストプロフィールへ戻る。",musicDesc:"アルバム、ソングライティング、音楽的進化を見る。",filmDesc:"映画、テレビ、舞台での活動を見る。",
  },
} as const;

export default function AwardsPage() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#030405] text-white">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[#D4AF37]/10 px-6 py-20 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_42%)]" />
        <div className="relative mx-auto max-w-[1200px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D4AF37]">{t.eyebrow}</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-white/55 md:text-[16px]">{t.intro}</p>
          <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map(([n,l]) => <div key={l} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"><div className="text-2xl font-black text-[#D4AF37]">{n}</div><div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/35">{l}</div></div>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10"><div className="mx-auto max-w-[1200px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D51C24]">{t.grammyEyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.grammyTitle}</h2>
        <p className="mt-4 max-w-[760px] text-[15px] leading-7 text-white/50">{t.grammyIntro}</p>
        <h3 className="mt-10 text-xl font-bold">{t.wins}</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{t.grammyWins.map(([year,title,award]) => <article key={award} className="rounded-[20px] border border-[#D4AF37]/15 bg-[#08090A] p-6"><p className="text-[10px] font-bold tracking-[0.2em] text-[#D51C24]">{year}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-2 text-[13px] leading-6 text-white/45">{award}</p></article>)}</div>
        <div className="mt-8 rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-6 md:p-8"><h3 className="text-2xl font-bold">{t.nominationsTitle}</h3><p className="mt-4 max-w-[900px] text-[14px] leading-7 text-white/45">{t.nominationsText}</p></div>
        <article className="mt-8 overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#08090A]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <a
              href="https://www.grammy.com/video/51st-awards-ne-yo-on-the-red-carpet/"
              target="_blank"
              rel="noreferrer"
              className="group relative min-h-[320px] overflow-hidden border-b border-[#D4AF37]/10 bg-[#050607] lg:border-b-0 lg:border-r"
              aria-label={t.grammyMomentAction}
            >
              <img
                src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Neyo.jpg"
                alt="Ne-Yo"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.025]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/45 bg-black/55 text-2xl text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">▶</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/75">Ne-Yo · GRAMMY archive</div>
                <div className="mt-1 text-[9px] text-white/45">Photo: Jasen Hudson · CC BY-SA 3.0 · Wikimedia Commons</div>
              </div>
            </a>
            <div className="flex flex-col justify-center p-7 md:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">{t.grammyMomentEyebrow}</p>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">{t.grammyMomentTitle}</h3>
              <p className="mt-4 max-w-[650px] text-[14px] leading-7 text-white/50">{t.grammyMomentBody}</p>
              <a href="https://www.grammy.com/awards/51st-annual-grammy-awards/" target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/25 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4AF37] transition hover:border-[#D4AF37]/55 hover:bg-[#D4AF37]/5">
                {t.grammyMomentAction} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      </div></section>

      <section className="border-y border-[#D4AF37]/10 bg-[#08090A]/65 px-6 py-20 lg:px-10"><div className="mx-auto max-w-[1200px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">{t.songwritingEyebrow}</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.songwritingTitle}</h2><p className="mt-4 max-w-[760px] text-[15px] leading-7 text-white/50">{t.songwritingIntro}</p>
        <div className="mt-9 grid gap-4 lg:grid-cols-3">{t.songwriting.map(([year,org,title,body]) => <article key={title} className="rounded-[20px] border border-white/[0.07] bg-[#050607] p-6"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-bold tracking-[0.2em] text-[#D51C24]">{year}</span><span className="text-[9px] uppercase tracking-[0.14em] text-white/25">{org}</span></div><h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-3 text-[13px] leading-6 text-white/45">{body}</p></article>)}</div>
      </div></section>

      <section className="px-6 py-20 lg:px-10"><div className="mx-auto max-w-[1200px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D51C24]">{t.musicEyebrow}</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.musicTitle}</h2><p className="mt-4 max-w-[760px] text-[15px] leading-7 text-white/50">{t.musicIntro}</p>
        <div className="mt-9 grid gap-5 md:grid-cols-2"><article className="rounded-[24px] border border-[#D4AF37]/15 bg-[#08090A] p-6 md:p-8"><p className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37]">BET AWARDS · 2007</p><h3 className="mt-4 text-2xl font-bold">{t.betTitle}</h3><p className="mt-4 text-[14px] leading-7 text-white/45">{t.betBody}</p></article><article className="rounded-[24px] border border-[#D4AF37]/15 bg-[#08090A] p-6 md:p-8"><p className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37]">RIAA · 2024</p><h3 className="mt-4 text-2xl font-bold">{t.diamondTitle}</h3><p className="mt-4 text-[14px] leading-7 text-white/45">{t.diamondBody}</p></article></div>
      </div></section>

      <section className="border-y border-[#D4AF37]/10 bg-[#08090A]/65 px-6 py-20 lg:px-10"><div className="mx-auto max-w-[1200px] grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">{t.honorsEyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.honorsTitle}</h2>
          <p className="mt-5 text-[15px] leading-7 text-white/50">{t.honorsBody}</p>
          <div className="mt-7 rounded-[22px] border border-white/[0.07] bg-[#050607] p-6">
            <div className="text-2xl font-black text-[#D4AF37]">{t.key}</div>
            <div className="mt-5 border-t border-white/[0.07] pt-5 text-xl font-bold">{t.day}</div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/30">{t.city}</div>
          </div>
        </div>
        <article className="overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#050607]">
          <a
            href="https://www.youtube.com/watch?v=koTuKNWPFbE"
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-video w-full overflow-hidden bg-black"
            aria-label={t.vegasMomentTitle}
          >
            <img
              src="https://i.ytimg.com/vi/koTuKNWPFbE/maxresdefault.jpg"
              alt={t.vegasMomentTitle}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/65 text-2xl text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">▶</span>
            </div>
          </a>
          <div className="border-t border-white/[0.07] p-5 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">{t.vegasMomentEyebrow}</p>
            <h3 className="mt-2 text-xl font-bold md:text-2xl">{t.vegasMomentTitle}</h3>
            <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-white/35">{t.vegasMomentCaption}</p>
            <p className="mt-3 text-[10px] text-white/25">Video: TMZ · YouTube</p>
          </div>
        </article>
      </div></section>

      <section className="relative border-t border-[#D4AF37]/10 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.035),transparent_45%)] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1140px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D51C24]">{t.explore}</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.careerMore}</h2>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {[
              [t.neyo, t.neyoDesc, "/ne-yo"],
              [t.music, t.musicDesc, "/music"],
              [t.film, t.filmDesc, "/film-tv-stage"],
            ].map(([label, desc, href]) => (
              <Link key={href} href={href} className="group flex min-h-[218px] flex-col rounded-[18px] border border-[#D4AF37]/15 bg-[#08090A] p-6 transition hover:border-[#D4AF37]/40">
                <h3 className="text-[18px] font-bold">{label}</h3>
                <p className="mt-5 text-[13px] leading-6 text-white/40">{desc}</p>
                <span className="mt-auto pt-7 text-[#D4AF37] transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
