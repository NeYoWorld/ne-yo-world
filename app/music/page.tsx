"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteHeader from "../components/SiteHeader";
import { useLanguage } from "../context/LanguageContext";

type Album = {
  title: string;
  year: string;
  appleId: string;
  tag?: "holiday";
};

type ArtworkMap = Record<string, string>;

const albums: Album[] = [
  { title: "In My Own Words", year: "2006", appleId: "1440783129" },
  { title: "Because of You", year: "2007", appleId: "1440757452" },
  { title: "Year of the Gentleman", year: "2008", appleId: "1445833884" },
  { title: "Libra Scale", year: "2010", appleId: "1442904688" },
  { title: "R.E.D.", year: "2012", appleId: "1443302293" },
  { title: "Non-Fiction", year: "2015", appleId: "1443068317" },
  { title: "GOOD MAN", year: "2018", appleId: "1382939757" },
  { title: "Another Kind of Christmas", year: "2019", appleId: "1481630886", tag: "holiday" },
  { title: "Self Explanatory", year: "2022", appleId: "1634339676" },
  { title: "Highway 79", year: "2026", appleId: "6770614875" },
];





const extraAlbumCopy = {
  "Libra Scale": {
    "EN": {
      "about": "About the Album",
      "aboutText": "Libra Scale is one of Ne-Yo’s most conceptual projects, combining R&B and pop with a cinematic story built around love, temptation and the price of getting everything you want.",
      "specialTitle": "An Album Built Like a Story",
      "specialText": "The concept follows three men forced to choose between true love and a life of money, power and fame. Ne-Yo developed the project with a visual, story-driven approach and drew inspiration from Michael Jackson.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Featured Collaborations",
      "editionNote": "Track listings can vary by edition and region.",
      "close": "Close album",
      "open": "Explore album"
    },
    "PT": {
      "about": "Sobre o Álbum",
      "aboutText": "Libra Scale é um dos projetos mais conceptuais de Ne-Yo, combinando R&B e pop com uma história cinematográfica construída em torno do amor, da tentação e do preço de conseguir tudo o que se deseja.",
      "specialTitle": "Um Álbum Construído Como Uma História",
      "specialText": "O conceito acompanha três homens obrigados a escolher entre o amor verdadeiro e uma vida de dinheiro, poder e fama. Ne-Yo desenvolveu o projeto com uma abordagem visual e narrativa, inspirando-se também em Michael Jackson.",
      "tracks": "Faixas",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaborações em Destaque",
      "editionNote": "A lista de faixas pode variar consoante a edição e a região.",
      "close": "Fechar álbum",
      "open": "Explorar álbum"
    },
    "ES": {
      "about": "Sobre el Álbum",
      "aboutText": "Libra Scale es uno de los proyectos más conceptuales de Ne-Yo, combinando R&B y pop con una historia cinematográfica sobre el amor, la tentación y el precio de conseguir todo lo que deseas.",
      "specialTitle": "Un Álbum Construido Como Una Historia",
      "specialText": "El concepto sigue a tres hombres obligados a elegir entre el amor verdadero y una vida de dinero, poder y fama. Ne-Yo desarrolló el proyecto con un enfoque visual y narrativo inspirado también por Michael Jackson.",
      "tracks": "Canciones",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaboraciones Destacadas",
      "editionNote": "La lista de canciones puede variar según la edición y la región.",
      "close": "Cerrar álbum",
      "open": "Explorar álbum"
    },
    "FR": {
      "about": "À Propos de l’Album",
      "aboutText": "Libra Scale est l’un des projets les plus conceptuels de Ne-Yo, mêlant R&B et pop à une histoire cinématographique autour de l’amour, de la tentation et du prix à payer pour tout obtenir.",
      "specialTitle": "Un Album Construit Comme Une Histoire",
      "specialText": "Le concept suit trois hommes contraints de choisir entre le véritable amour et une vie d’argent, de pouvoir et de célébrité. Ne-Yo a développé le projet avec une approche visuelle et narrative, également inspirée par Michael Jackson.",
      "tracks": "Titres",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborations",
      "editionNote": "La liste des titres peut varier selon l’édition et la région.",
      "close": "Fermer l’album",
      "open": "Explorer l’album"
    },
    "DE": {
      "about": "Über das Album",
      "aboutText": "Libra Scale ist eines von Ne-Yos konzeptionellsten Projekten und verbindet R&B und Pop mit einer filmischen Geschichte über Liebe, Versuchung und den Preis dafür, alles zu bekommen.",
      "specialTitle": "Ein Album Wie Eine Geschichte",
      "specialText": "Das Konzept folgt drei Männern, die zwischen wahrer Liebe und einem Leben voller Geld, Macht und Ruhm wählen müssen. Ne-Yo entwickelte das Projekt visuell und erzählerisch und ließ sich auch von Michael Jackson inspirieren.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Ausgewählte Kollaborationen",
      "editionNote": "Die Tracklist kann je nach Edition und Region variieren.",
      "close": "Album schließen",
      "open": "Album entdecken"
    },
    "IT": {
      "about": "L’Album",
      "aboutText": "Libra Scale è uno dei progetti più concettuali di Ne-Yo, unendo R&B e pop a una storia cinematografica sull’amore, la tentazione e il prezzo da pagare per ottenere tutto.",
      "specialTitle": "Un Album Costruito Come Una Storia",
      "specialText": "Il concept segue tre uomini costretti a scegliere tra il vero amore e una vita di denaro, potere e fama. Ne-Yo ha sviluppato il progetto con un approccio visivo e narrativo, ispirandosi anche a Michael Jackson.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborazioni in Evidenza",
      "editionNote": "La tracklist può variare in base all’edizione e alla regione.",
      "close": "Chiudi album",
      "open": "Esplora album"
    },
    "JA": {
      "about": "アルバムについて",
      "aboutText": "『Libra Scale』はNe-Yoの中でも特にコンセプト色の強い作品で、R&Bとポップを、愛、誘惑、そしてすべてを手に入れる代償を描く映画的な物語と結びつけています。",
      "specialTitle": "物語として作られたアルバム",
      "specialText": "物語は、真実の愛と、金・権力・名声に満ちた人生のどちらかを選ばなければならない3人の男を描きます。Ne-Yoは映像と物語を意識して制作し、Michael Jacksonからも影響を受けました。",
      "tracks": "トラックリスト",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "主なコラボレーション",
      "editionNote": "収録曲はエディションや地域によって異なる場合があります。",
      "close": "アルバムを閉じる",
      "open": "アルバムを見る"
    }
  },
  "R.E.D.": {
    "EN": {
      "about": "About the Album",
      "aboutText": "R.E.D. marked a new chapter for Ne-Yo, balancing his R&B foundation with the pop and dance sounds that had become an important part of his global career.",
      "specialTitle": "Realizing Every Dream",
      "specialText": "R.E.D. stands for “Realizing Every Dream.” The title reflected a point in Ne-Yo’s life when many of the goals he had imagined since childhood were becoming reality. It was also his first full-length album on Motown.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Featured Collaborations",
      "editionNote": "The Deluxe edition expands the 13-track standard album.",
      "close": "Close album",
      "open": "Explore album"
    },
    "PT": {
      "about": "Sobre o Álbum",
      "aboutText": "R.E.D. marcou um novo capítulo para Ne-Yo, equilibrando a sua base R&B com os sons pop e dance que se tinham tornado uma parte importante da sua carreira global.",
      "specialTitle": "Realizing Every Dream",
      "specialText": "R.E.D. significa “Realizing Every Dream”. O título refletia uma fase da vida de Ne-Yo em que muitos dos objetivos que imaginava desde criança estavam a tornar-se realidade. Foi também o seu primeiro álbum completo pela Motown.",
      "tracks": "Faixas",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaborações em Destaque",
      "editionNote": "A edição Deluxe expande o álbum standard de 13 faixas.",
      "close": "Fechar álbum",
      "open": "Explorar álbum"
    },
    "ES": {
      "about": "Sobre el Álbum",
      "aboutText": "R.E.D. marcó un nuevo capítulo para Ne-Yo, equilibrando su base R&B con los sonidos pop y dance que se habían convertido en una parte importante de su carrera global.",
      "specialTitle": "Realizing Every Dream",
      "specialText": "R.E.D. significa “Realizing Every Dream”. El título reflejaba una etapa en la que muchos de los objetivos que Ne-Yo imaginaba desde niño se estaban haciendo realidad. También fue su primer álbum completo con Motown.",
      "tracks": "Canciones",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaboraciones Destacadas",
      "editionNote": "La edición Deluxe amplía el álbum estándar de 13 canciones.",
      "close": "Cerrar álbum",
      "open": "Explorar álbum"
    },
    "FR": {
      "about": "À Propos de l’Album",
      "aboutText": "R.E.D. marque un nouveau chapitre pour Ne-Yo, entre ses racines R&B et les sonorités pop et dance devenues importantes dans sa carrière internationale.",
      "specialTitle": "Realizing Every Dream",
      "specialText": "R.E.D. signifie “Realizing Every Dream”. Le titre correspond à une période où de nombreux rêves imaginés par Ne-Yo depuis l’enfance devenaient réalité. C’est aussi son premier album complet chez Motown.",
      "tracks": "Titres",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborations",
      "editionNote": "L’édition Deluxe complète l’album standard de 13 titres.",
      "close": "Fermer l’album",
      "open": "Explorer l’album"
    },
    "DE": {
      "about": "Über das Album",
      "aboutText": "R.E.D. markierte ein neues Kapitel für Ne-Yo und verband seine R&B-Wurzeln mit den Pop- und Dance-Sounds, die zu einem wichtigen Teil seiner internationalen Karriere geworden waren.",
      "specialTitle": "Realizing Every Dream",
      "specialText": "R.E.D. steht für “Realizing Every Dream”. Der Titel spiegelte eine Lebensphase wider, in der viele Ziele, die Ne-Yo seit seiner Kindheit hatte, Wirklichkeit wurden. Es war außerdem sein erstes vollständiges Album bei Motown.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Ausgewählte Kollaborationen",
      "editionNote": "Die Deluxe-Edition erweitert das Standardalbum mit 13 Tracks.",
      "close": "Album schließen",
      "open": "Album entdecken"
    },
    "IT": {
      "about": "L’Album",
      "aboutText": "R.E.D. ha segnato un nuovo capitolo per Ne-Yo, bilanciando le sue radici R&B con i suoni pop e dance diventati una parte importante della sua carriera globale.",
      "specialTitle": "Realizing Every Dream",
      "specialText": "R.E.D. significa “Realizing Every Dream”. Il titolo rifletteva un momento in cui molti degli obiettivi immaginati da Ne-Yo fin dall’infanzia stavano diventando realtà. È stato anche il suo primo album completo per Motown.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborazioni in Evidenza",
      "editionNote": "L’edizione Deluxe amplia l’album standard di 13 tracce.",
      "close": "Chiudi album",
      "open": "Esplora album"
    },
    "JA": {
      "about": "アルバムについて",
      "aboutText": "『R.E.D.』はNe-Yoにとって新しい章となり、R&Bの土台と、世界的なキャリアで重要になったポップ／ダンスのサウンドを両立させた作品です。",
      "specialTitle": "Realizing Every Dream",
      "specialText": "R.E.D.は“Realizing Every Dream”の略。幼い頃から思い描いていた多くの目標が現実になっていく時期を表すタイトルで、Motownからの初のフルアルバムでもあります。",
      "tracks": "トラックリスト",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "主なコラボレーション",
      "editionNote": "Deluxe版は13曲のStandard版を拡張しています。",
      "close": "アルバムを閉じる",
      "open": "アルバムを見る"
    }
  },
  "GOOD MAN": {
    "EN": {
      "about": "About the Album",
      "aboutText": "GOOD MAN brought Ne-Yo’s reflections on relationships, responsibility and personal growth into the center of the album, while still moving across contemporary R&B, pop and global influences.",
      "specialTitle": "What It Means to Be a Good Man",
      "specialText": "Ne-Yo described the title as a reflection of his own journey and changing priorities. It was not a claim of perfection, but the idea that becoming a good man is something a person has to keep working toward.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Featured Collaborations",
      "editionNote": "The Deluxe edition contains 20 tracks, adding three songs to the 17-track standard album.",
      "close": "Close album",
      "open": "Explore album"
    },
    "PT": {
      "about": "Sobre o Álbum",
      "aboutText": "GOOD MAN colocou as reflexões de Ne-Yo sobre relações, responsabilidade e crescimento pessoal no centro do álbum, continuando ao mesmo tempo a explorar R&B contemporâneo, pop e influências globais.",
      "specialTitle": "O Que Significa Ser Um Good Man",
      "specialText": "Ne-Yo descreveu o título como um reflexo da sua própria jornada e da mudança de prioridades, não como uma afirmação de perfeição, mas como a ideia de que tornar-se um bom homem é algo em que se continua a trabalhar.",
      "tracks": "Faixas",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaborações em Destaque",
      "editionNote": "A edição Deluxe contém 20 faixas, acrescentando três ao álbum standard de 17 faixas.",
      "close": "Fechar álbum",
      "open": "Explorar álbum"
    },
    "ES": {
      "about": "Sobre el Álbum",
      "aboutText": "GOOD MAN situó las reflexiones de Ne-Yo sobre las relaciones, la responsabilidad y el crecimiento personal en el centro del álbum, sin dejar de explorar R&B contemporáneo, pop e influencias globales.",
      "specialTitle": "Qué Significa Ser Un Good Man",
      "specialText": "Ne-Yo describió el título como un reflejo de su propio recorrido y del cambio de prioridades: no como una afirmación de perfección, sino como la idea de que convertirse en un buen hombre es un proceso continuo.",
      "tracks": "Canciones",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaboraciones Destacadas",
      "editionNote": "La edición Deluxe contiene 20 canciones, tres más que el álbum estándar de 17.",
      "close": "Cerrar álbum",
      "open": "Explorar álbum"
    },
    "FR": {
      "about": "À Propos de l’Album",
      "aboutText": "GOOD MAN place les réflexions de Ne-Yo sur les relations, la responsabilité et l’évolution personnelle au centre de l’album, tout en explorant le R&B contemporain, la pop et des influences internationales.",
      "specialTitle": "Ce Que Signifie Être Un Good Man",
      "specialText": "Ne-Yo a présenté le titre comme le reflet de son propre parcours et de l’évolution de ses priorités. Non comme une déclaration de perfection, mais comme l’idée qu’être un homme bien demande un effort constant.",
      "tracks": "Titres",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborations",
      "editionNote": "L’édition Deluxe compte 20 titres, soit trois de plus que l’album standard de 17 titres.",
      "close": "Fermer l’album",
      "open": "Explorer l’album"
    },
    "DE": {
      "about": "Über das Album",
      "aboutText": "GOOD MAN stellt Ne-Yos Gedanken über Beziehungen, Verantwortung und persönliche Entwicklung in den Mittelpunkt und verbindet sie mit zeitgenössischem R&B, Pop und internationalen Einflüssen.",
      "specialTitle": "Was Es Bedeutet, Ein Good Man Zu Sein",
      "specialText": "Ne-Yo beschrieb den Titel als Spiegel seiner eigenen Entwicklung und veränderten Prioritäten. Nicht als Anspruch auf Perfektion, sondern als Idee, dass man ständig daran arbeiten muss, ein guter Mann zu sein.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Ausgewählte Kollaborationen",
      "editionNote": "Die Deluxe-Edition enthält 20 Tracks und ergänzt das 17-Track-Standardalbum um drei Songs.",
      "close": "Album schließen",
      "open": "Album entdecken"
    },
    "IT": {
      "about": "L’Album",
      "aboutText": "GOOD MAN mette al centro le riflessioni di Ne-Yo su relazioni, responsabilità e crescita personale, continuando a esplorare R&B contemporaneo, pop e influenze globali.",
      "specialTitle": "Cosa Significa Essere Un Good Man",
      "specialText": "Ne-Yo ha descritto il titolo come un riflesso del proprio percorso e del cambiamento delle sue priorità: non una dichiarazione di perfezione, ma l’idea che diventare un uomo migliore richieda un impegno continuo.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborazioni in Evidenza",
      "editionNote": "L’edizione Deluxe contiene 20 tracce, tre in più rispetto alle 17 dell’album standard.",
      "close": "Chiudi album",
      "open": "Esplora album"
    },
    "JA": {
      "about": "アルバムについて",
      "aboutText": "『GOOD MAN』は、関係性、責任、そして人としての成長についてのNe-Yoの考えを中心に据えながら、現代的なR&B、ポップ、世界各地の影響も取り入れた作品です。",
      "specialTitle": "Good Manであること",
      "specialText": "Ne-Yoはこのタイトルを、自身の歩みと優先順位の変化を映すものとして説明しています。完璧だと主張するのではなく、より良い人間になるために努力し続けるという考えです。",
      "tracks": "トラックリスト",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "主なコラボレーション",
      "editionNote": "Deluxe版は20曲で、17曲のStandard版に3曲を追加しています。",
      "close": "アルバムを閉じる",
      "open": "アルバムを見る"
    }
  },
  "Another Kind of Christmas": {
    "EN": {
      "about": "About the Album",
      "aboutText": "Another Kind of Christmas is Ne-Yo’s first holiday album, mixing familiar seasonal standards with original songs written specifically for the project.",
      "specialTitle": "A Different Kind of Holiday Album",
      "specialText": "The album includes five newly written songs alongside reimagined Christmas classics. It was recorded in Montego Bay, Jamaica, giving the project a warmer and more personal holiday character.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Featured Collaborations",
      "editionNote": "A 2022 digital Deluxe edition adds “Everyday Is A Holiday” to the original 11-track album.",
      "close": "Close album",
      "open": "Explore album"
    },
    "PT": {
      "about": "Sobre o Álbum",
      "aboutText": "Another Kind of Christmas é o primeiro álbum de Natal de Ne-Yo, misturando clássicos da época com músicas originais escritas especificamente para o projeto.",
      "specialTitle": "Um Álbum de Natal Diferente",
      "specialText": "O álbum inclui cinco músicas novas escritas para o projeto, juntamente com clássicos de Natal reinterpretados. Foi gravado em Montego Bay, Jamaica, dando ao projeto um ambiente festivo mais quente e pessoal.",
      "tracks": "Faixas",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaborações em Destaque",
      "editionNote": "Uma edição Deluxe digital de 2022 acrescenta “Everyday Is A Holiday” ao álbum original de 11 faixas.",
      "close": "Fechar álbum",
      "open": "Explorar álbum"
    },
    "ES": {
      "about": "Sobre el Álbum",
      "aboutText": "Another Kind of Christmas es el primer álbum navideño de Ne-Yo, mezclando clásicos de temporada con canciones originales escritas específicamente para el proyecto.",
      "specialTitle": "Un Álbum Navideño Diferente",
      "specialText": "El álbum incluye cinco canciones nuevas junto a clásicos navideños reinterpretados. Fue grabado en Montego Bay, Jamaica, dando al proyecto un carácter festivo más cálido y personal.",
      "tracks": "Canciones",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaboraciones Destacadas",
      "editionNote": "Una edición Deluxe digital de 2022 añade “Everyday Is A Holiday” al álbum original de 11 canciones.",
      "close": "Cerrar álbum",
      "open": "Explorar álbum"
    },
    "FR": {
      "about": "À Propos de l’Album",
      "aboutText": "Another Kind of Christmas est le premier album de Noël de Ne-Yo, mêlant des standards de saison à des chansons originales écrites spécialement pour le projet.",
      "specialTitle": "Un Album de Noël Différent",
      "specialText": "L’album réunit cinq nouvelles chansons et des classiques de Noël réinterprétés. Enregistré à Montego Bay, en Jamaïque, il possède une atmosphère de fête plus chaleureuse et personnelle.",
      "tracks": "Titres",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborations",
      "editionNote": "Une édition Deluxe numérique de 2022 ajoute “Everyday Is A Holiday” aux 11 titres originaux.",
      "close": "Fermer l’album",
      "open": "Explorer l’album"
    },
    "DE": {
      "about": "Über das Album",
      "aboutText": "Another Kind of Christmas ist Ne-Yos erstes Weihnachtsalbum und verbindet bekannte Weihnachtsklassiker mit eigens für das Projekt geschriebenen neuen Songs.",
      "specialTitle": "Ein Anderes Weihnachtsalbum",
      "specialText": "Das Album enthält fünf neu geschriebene Songs neben neu interpretierten Weihnachtsklassikern. Es wurde in Montego Bay, Jamaika, aufgenommen und erhält dadurch eine wärmere, persönlichere Feiertagsstimmung.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Ausgewählte Kollaborationen",
      "editionNote": "Eine digitale Deluxe-Edition von 2022 ergänzt das ursprüngliche 11-Track-Album um “Everyday Is A Holiday”.",
      "close": "Album schließen",
      "open": "Album entdecken"
    },
    "IT": {
      "about": "L’Album",
      "aboutText": "Another Kind of Christmas è il primo album natalizio di Ne-Yo e unisce classici delle feste a brani originali scritti appositamente per il progetto.",
      "specialTitle": "Un Album Natalizio Diverso",
      "specialText": "L’album comprende cinque nuove canzoni insieme a classici natalizi reinterpretati. È stato registrato a Montego Bay, in Giamaica, dando al progetto un’atmosfera festiva più calda e personale.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborazioni in Evidenza",
      "editionNote": "Una Deluxe digitale del 2022 aggiunge “Everyday Is A Holiday” alle 11 tracce originali.",
      "close": "Chiudi album",
      "open": "Esplora album"
    },
    "JA": {
      "about": "アルバムについて",
      "aboutText": "『Another Kind of Christmas』はNe-Yo初のホリデーアルバムで、季節の定番曲と、このプロジェクトのために書かれたオリジナル曲を組み合わせています。",
      "specialTitle": "ひと味違うホリデーアルバム",
      "specialText": "5曲の新曲と再解釈されたクリスマスのスタンダードを収録。ジャマイカのMontego Bayで録音され、温かく個性的なホリデー作品に仕上がっています。",
      "tracks": "トラックリスト",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "主なコラボレーション",
      "editionNote": "2022年のデジタルDeluxe版では、オリジナル11曲に「Everyday Is A Holiday」が追加されています。",
      "close": "アルバムを閉じる",
      "open": "アルバムを見る"
    }
  },
  "Self Explanatory": {
    "EN": {
      "about": "About the Album",
      "aboutText": "Self Explanatory returned Ne-Yo to a full studio album after several years, bringing together the relationship-driven storytelling, R&B and crossover instincts that listeners already associated with his music.",
      "specialTitle": "The Music Speaks for Itself",
      "specialText": "Ne-Yo explained the title simply: after nearly two decades in music, he felt a Ne-Yo album no longer needed much explanation. The songs were designed to communicate their mood and story immediately.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Featured Collaborations",
      "editionNote": "",
      "close": "Close album",
      "open": "Explore album"
    },
    "PT": {
      "about": "Sobre o Álbum",
      "aboutText": "Self Explanatory marcou o regresso de Ne-Yo a um álbum de estúdio completo depois de vários anos, reunindo a narrativa sobre relações, o R&B e a capacidade de cruzar estilos que o público já associava à sua música.",
      "specialTitle": "A Música Fala Por Si",
      "specialText": "Ne-Yo explicou o título de forma simples: depois de quase duas décadas na música, sentia que um álbum de Ne-Yo já não precisava de grande explicação. As músicas foram pensadas para transmitir imediatamente o seu ambiente e a sua história.",
      "tracks": "Faixas",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaborações em Destaque",
      "editionNote": "",
      "close": "Fechar álbum",
      "open": "Explorar álbum"
    },
    "ES": {
      "about": "Sobre el Álbum",
      "aboutText": "Self Explanatory supuso el regreso de Ne-Yo a un álbum de estudio completo tras varios años, reuniendo la narrativa sobre relaciones, el R&B y la capacidad de cruzar estilos que el público ya asociaba con su música.",
      "specialTitle": "La Música Habla Por Sí Sola",
      "specialText": "Ne-Yo explicó el título de forma sencilla: después de casi dos décadas en la música, sentía que un álbum suyo ya no necesitaba demasiadas explicaciones. Las canciones debían comunicar inmediatamente su ambiente y su historia.",
      "tracks": "Canciones",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaboraciones Destacadas",
      "editionNote": "",
      "close": "Cerrar álbum",
      "open": "Explorar álbum"
    },
    "FR": {
      "about": "À Propos de l’Album",
      "aboutText": "Self Explanatory marque le retour de Ne-Yo à un album studio complet après plusieurs années, réunissant son écriture autour des relations, le R&B et son instinct pour les croisements de styles.",
      "specialTitle": "La Musique Parle d’Elle-Même",
      "specialText": "Ne-Yo a expliqué le titre simplement : après près de deux décennies dans la musique, un album de Ne-Yo n’avait plus besoin de beaucoup d’explications. Les chansons devaient transmettre immédiatement leur ambiance et leur histoire.",
      "tracks": "Titres",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborations",
      "editionNote": "",
      "close": "Fermer l’album",
      "open": "Explorer l’album"
    },
    "DE": {
      "about": "Über das Album",
      "aboutText": "Self Explanatory brachte Ne-Yo nach mehreren Jahren mit einem vollständigen Studioalbum zurück und verbindet seine Geschichten über Beziehungen, R&B und den stilübergreifenden Ansatz, den Hörer mit seiner Musik verbinden.",
      "specialTitle": "Die Musik Spricht Für Sich",
      "specialText": "Ne-Yo erklärte den Titel einfach: Nach fast zwei Jahrzehnten in der Musik brauche ein Ne-Yo-Album kaum noch Erklärung. Die Songs sollten Stimmung und Geschichte unmittelbar vermitteln.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Ausgewählte Kollaborationen",
      "editionNote": "",
      "close": "Album schließen",
      "open": "Album entdecken"
    },
    "IT": {
      "about": "L’Album",
      "aboutText": "Self Explanatory ha segnato il ritorno di Ne-Yo a un album in studio completo dopo diversi anni, riunendo storie di relazioni, R&B e la capacità di attraversare generi che il pubblico già associava alla sua musica.",
      "specialTitle": "La Musica Parla Da Sé",
      "specialText": "Ne-Yo ha spiegato il titolo in modo semplice: dopo quasi due decenni nella musica, sentiva che un album di Ne-Yo non avesse più bisogno di molte spiegazioni. Le canzoni dovevano comunicare subito atmosfera e storia.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborazioni in Evidenza",
      "editionNote": "",
      "close": "Chiudi album",
      "open": "Esplora album"
    },
    "JA": {
      "about": "アルバムについて",
      "aboutText": "『Self Explanatory』は数年ぶりのフルスタジオアルバムとして、恋愛を描くストーリーテリング、R&B、そしてNe-Yoらしいジャンルを越える感覚を一つにまとめた作品です。",
      "specialTitle": "音楽がすべてを語る",
      "specialText": "Ne-Yoはタイトルについて、音楽活動が20年近くになった今、Ne-Yoのアルバムには多くの説明は必要ないと語っています。曲を聴けば、そのムードや物語がすぐ伝わることを意識した作品です。",
      "tracks": "トラックリスト",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "主なコラボレーション",
      "editionNote": "",
      "close": "アルバムを閉じる",
      "open": "アルバムを見る"
    }
  },
  "Highway 79": {
    "EN": {
      "about": "About the Album",
      "aboutText": "Highway 79 opens a new artistic chapter for Ne-Yo, exploring a country-inspired direction without leaving behind the R&B and soul at the center of his identity.",
      "specialTitle": "A Nashville Chapter",
      "specialText": "Recorded in Nashville, the album leans into acoustic textures and country storytelling. Its title connects the project back to Ne-Yo’s Arkansas roots through Highway 79, while the music brings that influence into his own sound.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Featured Collaborations",
      "editionNote": "",
      "close": "Close album",
      "open": "Explore album"
    },
    "PT": {
      "about": "Sobre o Álbum",
      "aboutText": "Highway 79 abre um novo capítulo artístico para Ne-Yo, explorando uma direção inspirada no country sem abandonar o R&B e a soul que estão no centro da sua identidade.",
      "specialTitle": "Um Capítulo em Nashville",
      "specialText": "Gravado em Nashville, o álbum aproxima-se de texturas acústicas e da narrativa do country. O título liga o projeto às raízes de Ne-Yo no Arkansas através da Highway 79, trazendo essa influência para o seu próprio som.",
      "tracks": "Faixas",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaborações em Destaque",
      "editionNote": "",
      "close": "Fechar álbum",
      "open": "Explorar álbum"
    },
    "ES": {
      "about": "Sobre el Álbum",
      "aboutText": "Highway 79 abre un nuevo capítulo artístico para Ne-Yo, explorando una dirección inspirada en el country sin dejar atrás el R&B y el soul que forman parte central de su identidad.",
      "specialTitle": "Un Capítulo en Nashville",
      "specialText": "Grabado en Nashville, el álbum se acerca a texturas acústicas y a la narrativa del country. El título conecta el proyecto con las raíces de Ne-Yo en Arkansas a través de Highway 79, llevando esa influencia a su propio sonido.",
      "tracks": "Canciones",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Colaboraciones Destacadas",
      "editionNote": "",
      "close": "Cerrar álbum",
      "open": "Explorar álbum"
    },
    "FR": {
      "about": "À Propos de l’Album",
      "aboutText": "Highway 79 ouvre un nouveau chapitre artistique pour Ne-Yo, explorant une direction inspirée de la country sans abandonner le R&B et la soul au cœur de son identité.",
      "specialTitle": "Un Chapitre à Nashville",
      "specialText": "Enregistré à Nashville, l’album adopte des textures acoustiques et la tradition narrative de la country. Son titre renvoie aux racines de Ne-Yo dans l’Arkansas à travers Highway 79, en intégrant cette influence à son propre univers.",
      "tracks": "Titres",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborations",
      "editionNote": "",
      "close": "Fermer l’album",
      "open": "Explorer l’album"
    },
    "DE": {
      "about": "Über das Album",
      "aboutText": "Highway 79 eröffnet für Ne-Yo ein neues künstlerisches Kapitel und erkundet eine Country-inspirierte Richtung, ohne R&B und Soul als Kern seiner Identität zurückzulassen.",
      "specialTitle": "Ein Kapitel in Nashville",
      "specialText": "Das in Nashville aufgenommene Album setzt auf akustische Elemente und Country-Storytelling. Der Titel verbindet das Projekt über Highway 79 mit Ne-Yos Wurzeln in Arkansas und integriert diesen Einfluss in seinen eigenen Sound.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Ausgewählte Kollaborationen",
      "editionNote": "",
      "close": "Album schließen",
      "open": "Album entdecken"
    },
    "IT": {
      "about": "L’Album",
      "aboutText": "Highway 79 apre un nuovo capitolo artistico per Ne-Yo, esplorando una direzione ispirata al country senza lasciare alle spalle l’R&B e il soul al centro della sua identità.",
      "specialTitle": "Un Capitolo a Nashville",
      "specialText": "Registrato a Nashville, l’album introduce sonorità acustiche e la tradizione narrativa del country. Il titolo collega il progetto alle radici di Ne-Yo in Arkansas attraverso Highway 79, portando quell’influenza nel suo suono.",
      "tracks": "Tracklist",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "Collaborazioni in Evidenza",
      "editionNote": "",
      "close": "Chiudi album",
      "open": "Esplora album"
    },
    "JA": {
      "about": "アルバムについて",
      "aboutText": "『Highway 79』はNe-Yoの新たな芸術的章であり、彼のアイデンティティの中心にあるR&Bとソウルを保ちながら、カントリーに影響を受けた方向性を探っています。",
      "specialTitle": "Nashvilleでの新章",
      "specialText": "Nashvilleで録音されたこの作品は、アコースティックな質感とカントリーの物語性を取り入れています。タイトルはHighway 79を通じてNe-YoのArkansasのルーツにつながり、その影響を自身のサウンドに融合しています。",
      "tracks": "トラックリスト",
      "standard": "Standard",
      "deluxe": "Deluxe",
      "collaborations": "主なコラボレーション",
      "editionNote": "",
      "close": "アルバムを閉じる",
      "open": "アルバムを見る"
    }
  }
} as const;

const extraAlbumExperiences = {
  "Libra Scale": {
    "year": "2010",
    "label": "Def Jam",
    "subtitle": "Fourth Studio Album",
    "appleId": "1442904688",
    "standard": [
      "Champagne Life",
      "Makin’ A Movie",
      "Know Your Name",
      "Telekinesis",
      "Crazy Love (feat. Fabolous)",
      "One In A Million",
      "Genuine Only",
      "Cause I Said So",
      "Beautiful Monster",
      "What Have I Done?"
    ],
    "deluxe": null,
    "collabs": [
      "Fabolous"
    ]
  },
  "R.E.D.": {
    "year": "2012",
    "label": "Motown",
    "subtitle": "Fifth Studio Album",
    "appleId": "1443302293",
    "standard": [
      "Cracks In Mr. Perfect",
      "Lazy Love",
      "Let Me Love You (Until You Learn to Love Yourself)",
      "Miss Right",
      "Jealous",
      "Don’t Make Em Like You (feat. Wiz Khalifa)",
      "Be The One",
      "Stress Reliever",
      "She Is (feat. Tim McGraw)",
      "Carry On (Her Letter To Him)",
      "Forever Now",
      "Shut Me Down",
      "Unconditional"
    ],
    "deluxe": [
      "Cracks In Mr. Perfect",
      "Lazy Love",
      "Let Me Love You (Until You Learn to Love Yourself)",
      "Miss Right",
      "Jealous",
      "Don’t Make Em Like You (feat. Wiz Khalifa)",
      "Be The One",
      "Stress Reliever",
      "She Is (feat. Tim McGraw)",
      "Carry On (Her Letter To Him)",
      "Forever Now",
      "Shut Me Down",
      "Unconditional",
      "Should Be You (feat. Fabolous & Diddy)",
      "My Other Gun",
      "Alone With You (Maddie’s Song)",
      "Let’s Go. Calvin Harris feat. Ne-Yo"
    ],
    "collabs": [
      "Wiz Khalifa",
      "Tim McGraw",
      "Fabolous",
      "Diddy",
      "Calvin Harris"
    ]
  },
  "GOOD MAN": {
    "year": "2018",
    "label": "Motown",
    "subtitle": "Seventh Studio Album",
    "appleId": "1382939757",
    "standard": [
      "“Caterpillars 1st” (Intro)",
      "1 More Shot",
      "LA Nights",
      "Nights Like These (feat. Romeo Santos)",
      "U Deserve",
      "Summertime",
      "Push Back (feat. Bebe Rexha & Stefflon Don)",
      "Breathe",
      "On Ur Mind (feat. PARTYNEXTDOOR)",
      "Back Chapters",
      "Hotbox (feat. Eric Bellinger)",
      "Over U",
      "Without U",
      "Apology",
      "Ocean Sure (feat. Candice Boyd & Sam Hook)",
      "“The Struggle…” (Interlude)",
      "GOOD MAN"
    ],
    "deluxe": [
      "“Caterpillars 1st” (Intro)",
      "1 More Shot",
      "LA Nights",
      "Nights Like These (feat. Romeo Santos)",
      "U Deserve",
      "Summertime",
      "Push Back (feat. Bebe Rexha & Stefflon Don)",
      "Breathe",
      "On Ur Mind (feat. PARTYNEXTDOOR)",
      "Back Chapters",
      "Hotbox (feat. Eric Bellinger)",
      "Over U",
      "Without U",
      "Apology",
      "Ocean Sure (feat. Candice Boyd & Sam Hook)",
      "“The Struggle…” (Interlude)",
      "GOOD MAN",
      "Pour Me Up",
      "Won’t Be Often",
      "Reset the Night"
    ],
    "collabs": [
      "Romeo Santos",
      "Bebe Rexha",
      "Stefflon Don",
      "PARTYNEXTDOOR",
      "Eric Bellinger",
      "Candice Boyd",
      "Sam Hook"
    ]
  },
  "Another Kind of Christmas": {
    "year": "2019",
    "label": "Motown",
    "subtitle": "Holiday Studio Album",
    "appleId": "1481630886",
    "standard": [
      "This Christmas",
      "Talk About It",
      "Carol Of The Bells (feat. Candice Boyd)",
      "Open Mine Tonight",
      "Just Ain’t Christmas",
      "Christmas Vibez (feat. Satori & Dre Island)",
      "Merry Christmas Baby",
      "I Want To Come Home For Christmas",
      "The Christmas Song",
      "Someday At Christmas (feat. RaVaughn)",
      "It’s For Everybody"
    ],
    "deluxe": [
      "This Christmas",
      "Talk About It",
      "Carol Of The Bells (feat. Candice Boyd)",
      "Open Mine Tonight",
      "Just Ain’t Christmas",
      "Christmas Vibez (feat. Satori & Dre Island)",
      "Merry Christmas Baby",
      "I Want To Come Home For Christmas",
      "The Christmas Song",
      "Someday At Christmas (feat. RaVaughn)",
      "It’s For Everybody",
      "Everyday Is A Holiday"
    ],
    "collabs": [
      "Candice Boyd",
      "Satori",
      "Dre Island",
      "RaVaughn"
    ]
  },
  "Self Explanatory": {
    "year": "2022",
    "label": "Motown",
    "subtitle": "Eighth Studio Album",
    "appleId": "1634339676",
    "standard": [
      "Layin’ Low. Ne-Yo & Zae France",
      "You Got The Body",
      "After Party",
      "Handle Me Gently",
      "Don’t Love Me",
      "U 2 Luv (feat. Jeremih)",
      "Push Up (feat. Trippie Redd)",
      "Proud of You",
      "Call Me Up",
      "What If",
      "Want It All or Nothing",
      "No Loot",
      "Stay Down (feat. Yung Bleu)"
    ],
    "deluxe": null,
    "collabs": [
      "Zae France",
      "Jeremih",
      "Trippie Redd",
      "Yung Bleu"
    ]
  },
  "Highway 79": {
    "year": "2026",
    "label": "Compound Ent/HSG",
    "subtitle": "Tenth Studio Album",
    "appleId": "6770614875",
    "standard": [
      "Up Out & Gone",
      "Hate Me Now",
      "Wish I Didn’t Know You",
      "Thinking What I’m Thinking",
      "Dance Right Now",
      "Ms. Tundra",
      "Next Round On Me",
      "Simple Things",
      "Only Ever Been You",
      "Crooked Halo",
      "If I Roped The Moon"
    ],
    "deluxe": null,
    "collabs": []
  }
} as const;


const yearGentlemanCopy = {
  EN: {
    about: "About the Album",
    aboutText:
      "Year of the Gentleman expanded Ne-Yo’s R&B sound toward a broader pop direction while keeping songwriting and melody at the center of the album.",
    storyTitle: "The Gentleman",
    storyText:
      "The title reflected Ne-Yo’s idea of bringing back the charm, courtesy and effortless style he associated with classic entertainers such as the Rat Pack and Nat King Cole.",
    tracks: "Tracklist",
    standard: "Standard",
    bonus: "Bonus Track",
    milestoneTitle: "A Defining Era",
    milestoneText:
      "“Miss Independent” earned Ne-Yo two GRAMMY wins: Best Male R&B Vocal Performance and Best R&B Song.",
    collaborations: "Featured Collaborations",
    editionNote: "Bonus tracks and configurations varied by edition and region.",
    close: "Close album",
    open: "Explore album",
  },
  PT: {
    about: "Sobre o Álbum",
    aboutText:
      "Year of the Gentleman expandiu o R&B de Ne-Yo para uma direção pop mais ampla, mantendo a composição e a melodia no centro do álbum.",
    storyTitle: "O Gentleman",
    storyText:
      "O título refletia a ideia de Ne-Yo de recuperar o charme, a cortesia e o estilo natural que associava a artistas clássicos como o Rat Pack e Nat King Cole.",
    tracks: "Faixas",
    standard: "Standard",
    bonus: "Bonus Track",
    milestoneTitle: "Uma Era Marcante",
    milestoneText:
      "“Miss Independent” deu a Ne-Yo dois GRAMMYs: Best Male R&B Vocal Performance e Best R&B Song.",
    collaborations: "Colaborações em Destaque",
    editionNote: "As faixas bónus e as configurações variaram consoante a edição e a região.",
    close: "Fechar álbum",
    open: "Explorar álbum",
  },
  ES: {
    about: "Sobre el Álbum",
    aboutText:
      "Year of the Gentleman amplió el R&B de Ne-Yo hacia una dirección pop más amplia, manteniendo la composición y la melodía en el centro del álbum.",
    storyTitle: "El Gentleman",
    storyText:
      "El título reflejaba la idea de Ne-Yo de recuperar el encanto, la cortesía y el estilo natural que asociaba con artistas clásicos como el Rat Pack y Nat King Cole.",
    tracks: "Canciones",
    standard: "Standard",
    bonus: "Bonus Track",
    milestoneTitle: "Una Era Decisiva",
    milestoneText:
      "“Miss Independent” le dio a Ne-Yo dos GRAMMYs: Best Male R&B Vocal Performance y Best R&B Song.",
    collaborations: "Colaboraciones Destacadas",
    editionNote: "Las canciones extra y las configuraciones variaron según la edición y la región.",
    close: "Cerrar álbum",
    open: "Explorar álbum",
  },
  FR: {
    about: "À Propos de l’Album",
    aboutText:
      "Year of the Gentleman élargit le R&B de Ne-Yo vers une direction pop plus ouverte, tout en gardant l’écriture et la mélodie au cœur de l’album.",
    storyTitle: "Le Gentleman",
    storyText:
      "Le titre reflète la volonté de Ne-Yo de retrouver le charme, la courtoisie et l’élégance naturelle qu’il associait à des artistes classiques comme le Rat Pack et Nat King Cole.",
    tracks: "Titres",
    standard: "Standard",
    bonus: "Bonus Track",
    milestoneTitle: "Une Ère Marquante",
    milestoneText:
      "“Miss Independent” a valu à Ne-Yo deux GRAMMYs : Best Male R&B Vocal Performance et Best R&B Song.",
    collaborations: "Collaborations",
    editionNote: "Les titres bonus et les configurations variaient selon l’édition et la région.",
    close: "Fermer l’album",
    open: "Explorer l’album",
  },
  DE: {
    about: "Über das Album",
    aboutText:
      "Year of the Gentleman erweiterte Ne-Yos R&B-Sound in eine breitere Pop-Richtung, während Songwriting und Melodie im Mittelpunkt blieben.",
    storyTitle: "Der Gentleman",
    storyText:
      "Der Titel spiegelte Ne-Yos Idee wider, Charme, Höflichkeit und mühelose Eleganz zurückzubringen, die er mit klassischen Entertainern wie dem Rat Pack und Nat King Cole verband.",
    tracks: "Tracklist",
    standard: "Standard",
    bonus: "Bonus Track",
    milestoneTitle: "Eine Prägende Ära",
    milestoneText:
      "“Miss Independent” brachte Ne-Yo zwei GRAMMYs ein: Best Male R&B Vocal Performance und Best R&B Song.",
    collaborations: "Ausgewählte Kollaborationen",
    editionNote: "Bonustracks und Zusammenstellungen unterschieden sich je nach Edition und Region.",
    close: "Album schließen",
    open: "Album entdecken",
  },
  IT: {
    about: "L’Album",
    aboutText:
      "Year of the Gentleman ha ampliato l’R&B di Ne-Yo verso una direzione pop più ampia, mantenendo scrittura e melodia al centro dell’album.",
    storyTitle: "Il Gentleman",
    storyText:
      "Il titolo rifletteva l’idea di Ne-Yo di riportare il fascino, la cortesia e l’eleganza naturale che associava ad artisti classici come il Rat Pack e Nat King Cole.",
    tracks: "Tracklist",
    standard: "Standard",
    bonus: "Bonus Track",
    milestoneTitle: "Un’Era Fondamentale",
    milestoneText:
      "“Miss Independent” ha portato a Ne-Yo due GRAMMYs: Best Male R&B Vocal Performance e Best R&B Song.",
    collaborations: "Collaborazioni in Evidenza",
    editionNote: "Le bonus track e le configurazioni variavano in base all’edizione e alla regione.",
    close: "Chiudi album",
    open: "Esplora album",
  },
  JA: {
    about: "アルバムについて",
    aboutText:
      "『Year of the Gentleman』は、ソングライティングとメロディを中心に据えながら、Ne-YoのR&Bサウンドをより幅広いポップの方向へ広げた作品です。",
    storyTitle: "ジェントルマンというテーマ",
    storyText:
      "タイトルには、Rat PackやNat King ColeのようなクラシックなエンターテイナーにNe-Yoが感じていた、魅力、礼儀、自然なスタイルを取り戻したいという考えが込められています。",
    tracks: "トラックリスト",
    standard: "Standard",
    bonus: "Bonus Track",
    milestoneTitle: "キャリアを象徴する時代",
    milestoneText:
      "「Miss Independent」はNe-YoにBest Male R&B Vocal PerformanceとBest R&B Songの2つのGRAMMYをもたらしました。",
    collaborations: "主なコラボレーション",
    editionNote: "ボーナストラックや収録内容はエディションや地域によって異なります。",
    close: "アルバムを閉じる",
    open: "アルバムを見る",
  },
};

const yearGentlemanStandard = [
  "Closer",
  "Nobody",
  "Single",
  "Mad",
  "Miss Independent",
  "Why Does She Stay",
  "Fade Into the Background",
  "So You Can Cry",
  "Part of the List",
  "Back to What You Know",
  "Lie to Me",
  "Stop This World",
];

const yearGentlemanBonus = [
  ...yearGentlemanStandard,
  "She Got Her Own (feat. Jamie Foxx & Fabolous)",
];

const yearGentlemanCollaborations = ["Jamie Foxx", "Fabolous"];

const becauseOfYouCopy = {
  EN: {
    about: "About the Album",
    aboutText:
      "Because of You followed Ne-Yo’s breakthrough debut with a polished second chapter, strengthening the songwriting-led R&B identity he had established while widening its reach.",
    milestoneTitle: "A First GRAMMY",
    milestoneText:
      "The album earned Ne-Yo his first GRAMMY, winning Best Contemporary R&B Album at the 50th Annual GRAMMY Awards.",
    tracks: "Tracklist",
    collaborations: "Featured Collaborations",
    close: "Close album",
    open: "Explore album",
  },
  PT: {
    about: "Sobre o Álbum",
    aboutText:
      "Because of You deu continuidade ao impacto do álbum de estreia de Ne-Yo com um segundo capítulo mais refinado, reforçando a identidade R&B assente na composição que já tinha estabelecido e ampliando o seu alcance.",
    milestoneTitle: "O Primeiro GRAMMY",
    milestoneText:
      "O álbum deu a Ne-Yo o seu primeiro GRAMMY, vencendo Best Contemporary R&B Album na 50.ª edição dos GRAMMY Awards.",
    tracks: "Faixas",
    collaborations: "Colaborações em Destaque",
    close: "Fechar álbum",
    open: "Explorar álbum",
  },
  ES: {
    about: "Sobre el Álbum",
    aboutText:
      "Because of You continuó el impacto del debut de Ne-Yo con un segundo capítulo más pulido, reforzando la identidad R&B basada en la composición que ya había establecido y ampliando su alcance.",
    milestoneTitle: "Su Primer GRAMMY",
    milestoneText:
      "El álbum le dio a Ne-Yo su primer GRAMMY al ganar Best Contemporary R&B Album en la 50.ª edición de los GRAMMY Awards.",
    tracks: "Canciones",
    collaborations: "Colaboraciones Destacadas",
    close: "Cerrar álbum",
    open: "Explorar álbum",
  },
  FR: {
    about: "À Propos de l’Album",
    aboutText:
      "Because of You prolonge le succès du premier album de Ne-Yo avec un deuxième chapitre plus abouti, renforçant son identité R&B fondée sur l’écriture tout en élargissant sa portée.",
    milestoneTitle: "Un Premier GRAMMY",
    milestoneText:
      "L’album offre à Ne-Yo son premier GRAMMY en remportant le prix du Best Contemporary R&B Album lors de la 50e cérémonie des GRAMMY Awards.",
    tracks: "Titres",
    collaborations: "Collaborations",
    close: "Fermer l’album",
    open: "Explorer l’album",
  },
  DE: {
    about: "Über das Album",
    aboutText:
      "Because of You setzte Ne-Yos erfolgreiches Debüt mit einem ausgefeilteren zweiten Kapitel fort, stärkte seine vom Songwriting geprägte R&B-Identität und vergrößerte zugleich seine Reichweite.",
    milestoneTitle: "Der Erste GRAMMY",
    milestoneText:
      "Das Album brachte Ne-Yo seinen ersten GRAMMY ein und gewann bei den 50. GRAMMY Awards die Kategorie Best Contemporary R&B Album.",
    tracks: "Tracklist",
    collaborations: "Ausgewählte Kollaborationen",
    close: "Album schließen",
    open: "Album entdecken",
  },
  IT: {
    about: "L’Album",
    aboutText:
      "Because of You ha seguito il successo del debutto di Ne-Yo con un secondo capitolo più raffinato, rafforzando la sua identità R&B fondata sulla scrittura e ampliandone la portata.",
    milestoneTitle: "Il Primo GRAMMY",
    milestoneText:
      "L’album ha portato a Ne-Yo il suo primo GRAMMY, vincendo Best Contemporary R&B Album alla 50ª edizione dei GRAMMY Awards.",
    tracks: "Tracklist",
    collaborations: "Collaborazioni in Evidenza",
    close: "Chiudi album",
    open: "Esplora album",
  },
  JA: {
    about: "アルバムについて",
    aboutText:
      "『Because of You』は、Ne-Yoの成功したデビュー作に続く洗練された第2章で、ソングライティングを軸としたR&Bの個性をさらに強めながら、その音楽的な広がりを示した作品です。",
    milestoneTitle: "初のGRAMMY",
    milestoneText:
      "このアルバムは第50回GRAMMY AwardsでBest Contemporary R&B Albumを受賞し、Ne-Yoにとって初のGRAMMY受賞作となりました。",
    tracks: "トラックリスト",
    collaborations: "主なコラボレーション",
    close: "アルバムを閉じる",
    open: "アルバムを見る",
  },
};

const becauseOfYouTracks = [
  "Because of You",
  "Crazy (feat. Jay-Z)",
  "Can We Chill",
  "Do You",
  "Addicted",
  "Leaving Tonight (feat. Jennifer Hudson)",
  "Ain’t Thinking About You",
  "Sex With My Ex",
  "Angel",
  "Make It Work",
  "Say It",
  "Go On Girl",
];

const becauseOfYouCollaborations = ["Jay-Z", "Jennifer Hudson"];

const inMyOwnWordsCopy = {
  EN: {
    about: "About the Album",
    aboutText:
      "In My Own Words introduced Ne-Yo as a solo artist after his breakthrough as a songwriter, establishing the smooth, emotionally direct R&B style that would define the beginning of his career.",
    beginningTitle: "From Songwriter to Solo Artist",
    beginningText:
      "After the success of “Let Me Love You,” written for Mario, Ne-Yo signed with Def Jam and stepped forward with his own voice. “So Sick” became the defining breakthrough of his debut era.",
    tracks: "Tracklist",
    standard: "Standard",
    anniversary: "15th Anniversary",
    collaborations: "Featured Collaborations",
    editionNote: "The 15th Anniversary edition expands the original album with bonus tracks, remixes, acoustic versions and instrumentals.",
    close: "Close album",
    open: "Explore album",
  },
  PT: {
    about: "Sobre o Álbum",
    aboutText:
      "In My Own Words apresentou Ne-Yo como artista a solo depois do seu destaque como compositor, estabelecendo o R&B suave e emocionalmente direto que marcou o início da sua carreira.",
    beginningTitle: "De Compositor a Artista a Solo",
    beginningText:
      "Depois do sucesso de “Let Me Love You”, escrita para Mario, Ne-Yo assinou com a Def Jam e avançou com a sua própria voz. “So Sick” tornou-se o grande momento de afirmação da sua era de estreia.",
    tracks: "Faixas",
    standard: "Standard",
    anniversary: "15.º Aniversário",
    collaborations: "Colaborações em Destaque",
    editionNote: "A edição de 15.º aniversário expande o álbum original com faixas bónus, remixes, versões acústicas e instrumentais.",
    close: "Fechar álbum",
    open: "Explorar álbum",
  },
  ES: {
    about: "Sobre el Álbum",
    aboutText:
      "In My Own Words presentó a Ne-Yo como artista solista tras destacar como compositor, estableciendo el R&B suave y emocionalmente directo que definiría el inicio de su carrera.",
    beginningTitle: "De Compositor a Artista Solista",
    beginningText:
      "Después del éxito de “Let Me Love You”, escrita para Mario, Ne-Yo firmó con Def Jam y dio el paso con su propia voz. “So Sick” se convirtió en el gran punto de inflexión de su debut.",
    tracks: "Canciones",
    standard: "Standard",
    anniversary: "15.º Aniversario",
    collaborations: "Colaboraciones Destacadas",
    editionNote: "La edición del 15.º aniversario amplía el álbum original con canciones extra, remixes, versiones acústicas e instrumentales.",
    close: "Cerrar álbum",
    open: "Explorar álbum",
  },
  FR: {
    about: "À Propos de l’Album",
    aboutText:
      "In My Own Words présente Ne-Yo comme artiste solo après son succès en tant qu’auteur-compositeur, en installant le R&B fluide et émotionnel qui marque le début de sa carrière.",
    beginningTitle: "D’Auteur-Compositeur à Artiste Solo",
    beginningText:
      "Après le succès de “Let Me Love You”, écrit pour Mario, Ne-Yo signe chez Def Jam et met sa propre voix au premier plan. “So Sick” devient le titre décisif de cette première ère.",
    tracks: "Titres",
    standard: "Standard",
    anniversary: "15e Anniversaire",
    collaborations: "Collaborations",
    editionNote: "L’édition du 15e anniversaire enrichit l’album original avec des bonus, remixes, versions acoustiques et instrumentales.",
    close: "Fermer l’album",
    open: "Explorer l’album",
  },
  DE: {
    about: "Über das Album",
    aboutText:
      "In My Own Words stellte Ne-Yo nach seinem Durchbruch als Songwriter als Solokünstler vor und prägte den geschmeidigen, emotional direkten R&B-Stil seiner frühen Karriere.",
    beginningTitle: "Vom Songwriter zum Solokünstler",
    beginningText:
      "Nach dem Erfolg von “Let Me Love You” für Mario unterschrieb Ne-Yo bei Def Jam und trat mit seiner eigenen Stimme in den Vordergrund. “So Sick” wurde zum entscheidenden Durchbruch seines Debüts.",
    tracks: "Tracklist",
    standard: "Standard",
    anniversary: "15. Jubiläum",
    collaborations: "Ausgewählte Kollaborationen",
    editionNote: "Die 15th-Anniversary-Edition erweitert das Originalalbum um Bonustracks, Remixe, Akustikversionen und Instrumentals.",
    close: "Album schließen",
    open: "Album entdecken",
  },
  IT: {
    about: "L’Album",
    aboutText:
      "In My Own Words ha presentato Ne-Yo come artista solista dopo il successo come autore, definendo l’R&B elegante e diretto che avrebbe caratterizzato l’inizio della sua carriera.",
    beginningTitle: "Da Autore ad Artista Solista",
    beginningText:
      "Dopo il successo di “Let Me Love You”, scritta per Mario, Ne-Yo firmò con Def Jam e portò in primo piano la propria voce. “So Sick” divenne il momento decisivo del suo debutto.",
    tracks: "Tracklist",
    standard: "Standard",
    anniversary: "15º Anniversario",
    collaborations: "Collaborazioni in Evidenza",
    editionNote: "L’edizione del 15º anniversario amplia l’album originale con bonus track, remix, versioni acustiche e strumentali.",
    close: "Chiudi album",
    open: "Esplora album",
  },
  JA: {
    about: "アルバムについて",
    aboutText:
      "『In My Own Words』は、ソングライターとして注目を集めたNe-Yoがソロアーティストとして本格的に登場した作品で、初期キャリアを象徴する滑らかで感情豊かなR&Bスタイルを確立しました。",
    beginningTitle: "ソングライターからソロアーティストへ",
    beginningText:
      "Marioのために書いた「Let Me Love You」の成功後、Ne-YoはDef Jamと契約し、自身の声を前面に出します。「So Sick」はデビュー期を象徴する大きなブレイクとなりました。",
    tracks: "トラックリスト",
    standard: "Standard",
    anniversary: "15周年",
    collaborations: "主なコラボレーション",
    editionNote: "15周年記念盤には、オリジナルアルバムにボーナストラック、リミックス、アコースティック版、インストゥルメンタル版が追加されています。",
    close: "アルバムを閉じる",
    open: "アルバムを見る",
  },
};

const inMyOwnWordsStandard = [
  "Stay (feat. Peedi Peedi)",
  "Let Me Get This Right",
  "So Sick",
  "When You’re Mad",
  "It Just Ain’t Right",
  "Mirror",
  "Sign Me Up",
  "I Ain’t Gotta Tell You",
  "Get Down Like That",
  "Sexy Love",
  "Let Go",
  "Time",
  "Get Down Like That (Remix) (feat. Ghostface Killah)",
];

const inMyOwnWordsAnniversary = [
  ...inMyOwnWordsStandard,
  "Girlfriend",
  "Stay (Remix) (with Rick Ross)",
  "So Sick (Acoustic)",
  "Sexy Love (Acoustic)",
  "So Sick (Instrumental)",
  "When You’re Mad (Instrumental)",
];

const inMyOwnWordsCollaborations = ["Peedi Peedi", "Ghostface Killah", "Rick Ross"];

const nonFictionCopy = {
  EN: {
    about: "About the Album",
    aboutText:
      "Non-Fiction was built around real-life stories and experiences, giving the album a more personal and narrative-driven concept.",
    fanTitle: "Stories From the Fans",
    fanText:
      "Ne-Yo invited fans to share their own experiences, using some of those stories as inspiration while creating the album.",
    tracks: "Tracklist",
    standard: "Standard",
    deluxe: "Deluxe",
    collaborations: "Featured Collaborations",
    editionNote: "Track listings can vary by edition and region.",
    close: "Close album",
    open: "Explore album",
  },
  PT: {
    about: "Sobre o Álbum",
    aboutText:
      "Non-Fiction foi construído em torno de histórias e experiências reais, dando ao álbum um conceito mais pessoal e narrativo.",
    fanTitle: "Histórias dos Fãs",
    fanText:
      "Ne-Yo convidou fãs a partilharem as suas próprias experiências, usando algumas dessas histórias como inspiração durante a criação do álbum.",
    tracks: "Faixas",
    standard: "Standard",
    deluxe: "Deluxe",
    collaborations: "Colaborações em Destaque",
    editionNote: "A lista de faixas pode variar consoante a edição e a região.",
    close: "Fechar álbum",
    open: "Explorar álbum",
  },
  ES: {
    about: "Sobre el Álbum",
    aboutText:
      "Non-Fiction se construyó alrededor de historias y experiencias reales, dando al álbum un concepto más personal y narrativo.",
    fanTitle: "Historias de los Fans",
    fanText:
      "Ne-Yo invitó a sus fans a compartir sus propias experiencias, utilizando algunas de esas historias como inspiración durante la creación del álbum.",
    tracks: "Canciones",
    standard: "Standard",
    deluxe: "Deluxe",
    collaborations: "Colaboraciones Destacadas",
    editionNote: "La lista de canciones puede variar según la edición y la región.",
    close: "Cerrar álbum",
    open: "Explorar álbum",
  },
  FR: {
    about: "À Propos de l’Album",
    aboutText:
      "Non-Fiction s’appuie sur des histoires et des expériences réelles, donnant à l’album un concept plus personnel et narratif.",
    fanTitle: "Histoires des Fans",
    fanText:
      "Ne-Yo a invité des fans à partager leurs propres expériences, utilisant certaines de ces histoires comme inspiration pendant la création de l’album.",
    tracks: "Titres",
    standard: "Standard",
    deluxe: "Deluxe",
    collaborations: "Collaborations",
    editionNote: "La liste des titres peut varier selon l’édition et la région.",
    close: "Fermer l’album",
    open: "Explorer l’album",
  },
  DE: {
    about: "Über das Album",
    aboutText:
      "Non-Fiction basiert auf realen Geschichten und Erfahrungen und erhält dadurch ein persönlicheres, erzählerisches Konzept.",
    fanTitle: "Geschichten der Fans",
    fanText:
      "Ne-Yo lud Fans dazu ein, eigene Erfahrungen zu teilen, und nutzte einige dieser Geschichten als Inspiration bei der Entstehung des Albums.",
    tracks: "Tracklist",
    standard: "Standard",
    deluxe: "Deluxe",
    collaborations: "Ausgewählte Kollaborationen",
    editionNote: "Die Tracklist kann je nach Edition und Region variieren.",
    close: "Album schließen",
    open: "Album entdecken",
  },
  IT: {
    about: "L’Album",
    aboutText:
      "Non-Fiction è costruito attorno a storie ed esperienze reali, dando all’album un concept più personale e narrativo.",
    fanTitle: "Storie dei Fan",
    fanText:
      "Ne-Yo ha invitato i fan a condividere le proprie esperienze, usando alcune di quelle storie come ispirazione durante la creazione dell’album.",
    tracks: "Tracklist",
    standard: "Standard",
    deluxe: "Deluxe",
    collaborations: "Collaborazioni in Evidenza",
    editionNote: "La tracklist può variare in base all’edizione e alla regione.",
    close: "Chiudi album",
    open: "Esplora album",
  },
  JA: {
    about: "アルバムについて",
    aboutText:
      "『Non-Fiction』は実際の物語や体験を軸に作られ、よりパーソナルで物語性のあるコンセプトを持つ作品です。",
    fanTitle: "ファンから生まれた物語",
    fanText:
      "Ne-Yoはファンに自身の体験を共有してもらい、その一部をアルバム制作のインスピレーションとして取り入れました。",
    tracks: "トラックリスト",
    standard: "Standard",
    deluxe: "Deluxe",
    collaborations: "主なコラボレーション",
    editionNote: "収録曲はエディションや地域によって異なる場合があります。",
    close: "アルバムを閉じる",
    open: "アルバムを見る",
  },
};

const nonFictionStandard = [
  "Run (feat. Schoolboy Q)",
  "Integrity (feat. Charisse Mils)",
  "One More (feat. T.I.)",
  "Who's Taking You Home",
  "Time Of Our Lives (feat. Pitbull)",
  "Coming With You",
  "Good Morning",
  "Money Can't Buy (feat. Jeezy)",
  "Religious",
  "She Knows (feat. Juicy J)",
  "Story Time",
  "Ballerina",
];

const nonFictionDeluxe = [
  "Non-Fiction (Intro)",
  "Everybody Loves/The Def of You (Interlude)",
  "Run / An Island (feat. Schoolboy Q)",
  "Integrety (feat. Charisse Mills)",
  "One More (feat T.I.)",
  "Time Of Our Lives (feat. Pitbull)",
  "Who's Taking You Home",
  "Coming With You",
  "Let You What... (Interdule)",
  "Take You There",
  "Good Morning / Gon' Ride (Interdule)",
  "Make It Easy",
  "Money Can't Buy (feat. Jeezy)",
  "Religious / Rachet Wit Yo Friends (Interdule)",
  "She Knows (feat Juicy J)",
  "She Said I'm Hood Tho (feat. Candice)",
  "Story Time",
  "Why",
  "Congratulations",
  "Come Over",
  "Ballerina",
];

const nonFictionCollaborations = [
  "ScHoolboy Q",
  "Charisse Mills",
  "T.I.",
  "Pitbull",
  "Jeezy",
  "Juicy J",
  "Candice",
];


const songwriterSongs = [
  ["Celine Dion", "I Got Nothin' Left"],
  ["Jennifer Hudson", "Spotlight"],
  ["Mary J. Blige", "What Love Is"],
  ["Janet Jackson", "Can't B Good"],
];

const copy = {
  EN: {
    eyebrow: "The Music · Ne-Yo World",
    title: "Music",
    intro:
      "From contemporary R&B to pop, dance and new country-inspired territory, Ne-Yo's music has continued to evolve while keeping songwriting at its center.",
    discographyEyebrow: "Studio Albums",
    discographyTitle: "The Discography",
    discographyText:
      "A chronological view of Ne-Yo's studio albums, from his 2006 debut to his latest musical chapter.",
    holiday: "Holiday Album",
    artworkLoading: "Loading artwork",
    definingEyebrow: "Key Chapters",
    definingTitle: "Defining Albums",
    definingIntro:
      "Three records that help trace the rise and evolution of Ne-Yo as a recording artist.",
    defining: [
      {
        year: "2006",
        title: "In My Own Words",
        text:
          "Ne-Yo's debut established him as a solo artist and introduced the voice behind songs including So Sick and Sexy Love.",
      },
      {
        year: "2007",
        title: "Because of You",
        text:
          "His second album continued the momentum of his debut and strengthened his place in contemporary R&B.",
      },
      {
        year: "2008",
        title: "Year of the Gentleman",
        text:
          "A defining crossover chapter, bringing R&B together with a broader pop approach through songs including Closer, Miss Independent and Mad.",
      },
    ],
    songwriterEyebrow: "Behind the Songs",
    songwriterTitle: "The Songwriter",
    songwriterText:
      "Songwriting is a parallel catalog of its own. Spotify's songwriter profile for Ne-Yo, managed by Universal Music Publishing, currently credits him on more than 330 songs. Beyond the examples introduced elsewhere on Ne-Yo World, that catalog includes work connected with artists such as Celine Dion, Jennifer Hudson, Mary J. Blige and Janet Jackson.",
    selectedEyebrow: "Across the Years",
    selectedTitle: "Selected Songs",
    selectedText:
      "A selection from different periods of Ne-Yo's own recording career. This is not a ranking or a complete singles list.",
    highwayEyebrow: "Latest Chapter · 2026",
    highwayTitle: "Highway 79",
    highwayText:
      "With Highway 79, Ne-Yo shows another side of himself as an artist, exploring a country-inspired direction after a career most closely associated with R&B and pop.",
    highwayDetail:
      "Released on July 10, 2026, the 11-song album was recorded in Nashville and keeps Ne-Yo's R&B identity at the center while introducing country-inspired textures and storytelling.",
    exploreEyebrow: "Continue Exploring",
    exploreTitle: "More of Ne-Yo World",
    cards: [
      ["Ne-Yo", "The artist behind the music.", "/ne-yo"],
      ["Awards & Milestones", "Career recognition and major moments.", "/awards"],
      ["Film, TV & Stage", "Explore Ne-Yo beyond recorded music.", "/film-tv-stage"],
    ],
  },
  PT: {
    eyebrow: "A Música · Ne-Yo World",
    title: "Música",
    intro:
      "Do R&B contemporâneo ao pop, dance e a um novo território inspirado pelo country, a música de Ne-Yo tem continuado a evoluir, mantendo a composição no centro do seu trabalho.",
    discographyEyebrow: "Álbuns de Estúdio",
    discographyTitle: "A Discografia",
    discographyText:
      "Uma visão cronológica dos álbuns de estúdio de Ne-Yo, desde a estreia em 2006 até ao capítulo musical mais recente.",
    holiday: "Álbum de Natal",
    artworkLoading: "A carregar capa",
    definingEyebrow: "Capítulos Essenciais",
    definingTitle: "Álbuns Marcantes",
    definingIntro:
      "Três discos que ajudam a acompanhar a ascensão e evolução de Ne-Yo enquanto artista.",
    defining: [
      {
        year: "2006",
        title: "In My Own Words",
        text:
          "A estreia de Ne-Yo afirmou-o como artista a solo e apresentou a voz por detrás de temas como So Sick e Sexy Love.",
      },
      {
        year: "2007",
        title: "Because of You",
        text:
          "O segundo álbum deu continuidade ao impacto da estreia e reforçou o seu lugar no R&B contemporâneo.",
      },
      {
        year: "2008",
        title: "Year of the Gentleman",
        text:
          "Um capítulo decisivo de crossover, aproximando o R&B de uma abordagem pop mais ampla através de temas como Closer, Miss Independent e Mad.",
      },
    ],
    songwriterEyebrow: "Por Detrás das Canções",
    songwriterTitle: "O Compositor",
    songwriterText:
      "A composição forma um catálogo paralelo por direito próprio. O perfil de compositor de Ne-Yo no Spotify, gerido pela Universal Music Publishing, atribui-lhe atualmente créditos em mais de 330 canções. Para além dos exemplos apresentados noutras áreas de Ne-Yo World, esse catálogo inclui trabalhos ligados a artistas como Celine Dion, Jennifer Hudson, Mary J. Blige e Janet Jackson.",
    selectedEyebrow: "Ao Longo dos Anos",
    selectedTitle: "Canções Selecionadas",
    selectedText:
      "Uma seleção de diferentes períodos da carreira discográfica de Ne-Yo. Não é um ranking nem uma lista completa de singles.",
    highwayEyebrow: "Capítulo Mais Recente · 2026",
    highwayTitle: "Highway 79",
    highwayText:
      "Com Highway 79, Ne-Yo mostra outro lado de si enquanto artista, explorando uma direção inspirada pelo country depois de uma carreira mais associada ao R&B e à pop.",
    highwayDetail:
      "Lançado a 10 de julho de 2026, o álbum de 11 faixas foi gravado em Nashville e mantém a identidade R&B de Ne-Yo no centro, introduzindo texturas e narrativas inspiradas pelo country.",
    exploreEyebrow: "Continuar a Explorar",
    exploreTitle: "Mais de Ne-Yo World",
    cards: [
      ["Ne-Yo", "O artista por detrás da música.", "/ne-yo"],
      ["Prémios & Marcos", "Reconhecimento e grandes momentos da carreira.", "/awards"],
      ["Cinema, TV & Palco", "Explora Ne-Yo para além da música gravada.", "/film-tv-stage"],
    ],
  },
  ES: {
    eyebrow: "La Música · Ne-Yo World",
    title: "Música",
    intro:
      "Del R&B contemporáneo al pop, dance y un nuevo territorio inspirado en el country, la música de Ne-Yo ha seguido evolucionando con la composición en el centro.",
    discographyEyebrow: "Álbumes de Estudio",
    discographyTitle: "La Discografía",
    discographyText:
      "Una visión cronológica de los álbumes de estudio de Ne-Yo, desde su debut en 2006 hasta su capítulo musical más reciente.",
    holiday: "Álbum Navideño",
    artworkLoading: "Cargando portada",
    definingEyebrow: "Capítulos Clave",
    definingTitle: "Álbumes Decisivos",
    definingIntro:
      "Tres discos que ayudan a seguir el ascenso y la evolución de Ne-Yo como artista.",
    defining: [
      { year: "2006", title: "In My Own Words", text: "El debut de Ne-Yo lo estableció como artista solista y presentó la voz detrás de canciones como So Sick y Sexy Love." },
      { year: "2007", title: "Because of You", text: "Su segundo álbum continuó el impulso del debut y reforzó su lugar en el R&B contemporáneo." },
      { year: "2008", title: "Year of the Gentleman", text: "Un capítulo decisivo de crossover, uniendo R&B con un enfoque pop más amplio en canciones como Closer, Miss Independent y Mad." },
    ],
    songwriterEyebrow: "Detrás de las Canciones",
    songwriterTitle: "El Compositor",
    songwriterText:
      "La composición forma un catálogo paralelo por derecho propio. El perfil de compositor de Ne-Yo en Spotify, gestionado por Universal Music Publishing, le atribuye actualmente créditos en más de 330 canciones. Más allá de los ejemplos presentados en otras áreas de Ne-Yo World, ese catálogo incluye trabajos relacionados con artistas como Celine Dion, Jennifer Hudson, Mary J. Blige y Janet Jackson.",
    selectedEyebrow: "A Través de los Años",
    selectedTitle: "Canciones Seleccionadas",
    selectedText: "Una selección de distintas etapas de la carrera de Ne-Yo. No es un ranking ni una lista completa de singles.",
    highwayEyebrow: "Capítulo Más Reciente · 2026",
    highwayTitle: "Highway 79",
    highwayText:
      "Con Highway 79, Ne-Yo muestra otra faceta como artista, explorando una dirección inspirada en el country tras una carrera asociada principalmente con el R&B y el pop.",
    highwayDetail:
      "Publicado el 10 de julio de 2026, el álbum de 11 canciones fue grabado en Nashville y mantiene la identidad R&B de Ne-Yo mientras incorpora texturas y narrativas inspiradas en el country.",
    exploreEyebrow: "Seguir Explorando",
    exploreTitle: "Más de Ne-Yo World",
    cards: [
      ["Ne-Yo", "El artista detrás de la música.", "/ne-yo"],
      ["Premios & Hitos", "Reconocimientos y grandes momentos.", "/awards"],
      ["Cine, TV & Escenario", "Explora a Ne-Yo más allá de la música grabada.", "/film-tv-stage"],
    ],
  },
  FR: {
    eyebrow: "La Musique · Ne-Yo World",
    title: "Musique",
    intro:
      "Du R&B contemporain à la pop, la dance et à un nouveau territoire inspiré par la country, la musique de Ne-Yo continue d'évoluer avec l'écriture au cœur de son travail.",
    discographyEyebrow: "Albums Studio",
    discographyTitle: "La Discographie",
    discographyText: "Un parcours chronologique des albums studio de Ne-Yo, de ses débuts en 2006 à son chapitre musical le plus récent.",
    holiday: "Album de Noël",
    artworkLoading: "Chargement de la pochette",
    definingEyebrow: "Chapitres Clés",
    definingTitle: "Albums Marquants",
    definingIntro: "Trois disques qui permettent de suivre l'ascension et l'évolution de Ne-Yo en tant qu'artiste.",
    defining: [
      { year: "2006", title: "In My Own Words", text: "Le premier album de Ne-Yo l'impose comme artiste solo et présente la voix derrière des titres comme So Sick et Sexy Love." },
      { year: "2007", title: "Because of You", text: "Son deuxième album poursuit l'élan de ses débuts et renforce sa place dans le R&B contemporain." },
      { year: "2008", title: "Year of the Gentleman", text: "Un chapitre crossover majeur, rapprochant R&B et pop avec des titres comme Closer, Miss Independent et Mad." },
    ],
    songwriterEyebrow: "Derrière les Chansons",
    songwriterTitle: "L'Auteur-Compositeur",
    songwriterText: "Avant et parallèlement à sa propre carrière, Ne-Yo s'est forgé une importante réputation d'auteur-compositeur. Son écriture a contribué à des titres majeurs d'autres artistes, révélant la portée de son style mélodique et lyrique.",
    selectedEyebrow: "Au Fil des Années",
    selectedTitle: "Chansons Sélectionnées",
    selectedText: "Une sélection issue de différentes périodes de la carrière de Ne-Yo. Il ne s'agit ni d'un classement ni d'une liste complète des singles.",
    highwayEyebrow: "Dernier Chapitre · 2026",
    highwayTitle: "Highway 79",
    highwayText: "Avec Highway 79, Ne-Yo montre une autre facette de son identité artistique, explorant une direction inspirée par la country après une carrière surtout associée au R&B et à la pop.",
    highwayDetail: "Sorti le 10 juillet 2026, l'album de 11 titres a été enregistré à Nashville et conserve l'identité R&B de Ne-Yo tout en introduisant des textures et récits inspirés par la country.",
    exploreEyebrow: "Continuer à Explorer",
    exploreTitle: "Plus de Ne-Yo World",
    cards: [
      ["Ne-Yo", "L'artiste derrière la musique.", "/ne-yo"],
      ["Prix & Moments Clés", "Reconnaissance et grands moments de carrière.", "/awards"],
      ["Cinéma, TV & Scène", "Découvrez Ne-Yo au-delà de la musique enregistrée.", "/film-tv-stage"],
    ],
  },
  DE: {
    eyebrow: "Die Musik · Ne-Yo World",
    title: "Musik",
    intro: "Von Contemporary R&B über Pop und Dance bis zu neuem, Country-inspiriertem Terrain entwickelt sich Ne-Yos Musik weiter, während Songwriting im Mittelpunkt bleibt.",
    discographyEyebrow: "Studioalben",
    discographyTitle: "Die Diskografie",
    discographyText: "Ein chronologischer Blick auf Ne-Yos Studioalben, von seinem Debüt 2006 bis zu seinem neuesten musikalischen Kapitel.",
    holiday: "Weihnachtsalbum",
    artworkLoading: "Cover wird geladen",
    definingEyebrow: "Wichtige Kapitel",
    definingTitle: "Prägende Alben",
    definingIntro: "Drei Alben, die Ne-Yos Aufstieg und Entwicklung als Künstler nachzeichnen.",
    defining: [
      { year: "2006", title: "In My Own Words", text: "Ne-Yos Debüt etablierte ihn als Solokünstler und präsentierte die Stimme hinter Songs wie So Sick und Sexy Love." },
      { year: "2007", title: "Because of You", text: "Das zweite Album setzte den Schwung des Debüts fort und festigte seinen Platz im Contemporary R&B." },
      { year: "2008", title: "Year of the Gentleman", text: "Ein prägendes Crossover-Kapitel, das R&B mit einem breiteren Pop-Ansatz in Songs wie Closer, Miss Independent und Mad verband." },
    ],
    songwriterEyebrow: "Hinter den Songs",
    songwriterTitle: "Der Songwriter",
    songwriterText: "Vor und parallel zu seiner eigenen Karriere erarbeitete sich Ne-Yo einen bedeutenden Ruf als Songwriter. Seine Arbeit wurde Teil wichtiger Veröffentlichungen anderer Künstler und zeigte die Reichweite seines melodischen und lyrischen Stils.",
    selectedEyebrow: "Durch die Jahre",
    selectedTitle: "Ausgewählte Songs",
    selectedText: "Eine Auswahl aus verschiedenen Phasen von Ne-Yos eigener Karriere. Dies ist weder ein Ranking noch eine vollständige Single-Liste.",
    highwayEyebrow: "Neuestes Kapitel · 2026",
    highwayTitle: "Highway 79",
    highwayText: "Mit Highway 79 zeigt Ne-Yo eine weitere Seite als Künstler und erkundet nach einer vor allem mit R&B und Pop verbundenen Karriere eine Country-inspirierte Richtung.",
    highwayDetail: "Das am 10. Juli 2026 veröffentlichte Album mit 11 Songs wurde in Nashville aufgenommen und behält Ne-Yos R&B-Identität bei, während es Country-inspirierte Texturen und Erzählweisen einführt.",
    exploreEyebrow: "Weiter Entdecken",
    exploreTitle: "Mehr von Ne-Yo World",
    cards: [
      ["Ne-Yo", "Der Künstler hinter der Musik.", "/ne-yo"],
      ["Auszeichnungen & Meilensteine", "Anerkennung und wichtige Karrieremomente.", "/awards"],
      ["Film, TV & Bühne", "Entdecke Ne-Yo jenseits aufgenommener Musik.", "/film-tv-stage"],
    ],
  },
  IT: {
    eyebrow: "La Musica · Ne-Yo World",
    title: "Musica",
    intro: "Dall'R&B contemporaneo al pop, dance e a un nuovo territorio ispirato al country, la musica di Ne-Yo continua a evolversi mantenendo la scrittura al centro.",
    discographyEyebrow: "Album in Studio",
    discographyTitle: "La Discografia",
    discographyText: "Una panoramica cronologica degli album in studio di Ne-Yo, dal debutto del 2006 al capitolo musicale più recente.",
    holiday: "Album Natalizio",
    artworkLoading: "Caricamento copertina",
    definingEyebrow: "Capitoli Chiave",
    definingTitle: "Album Fondamentali",
    definingIntro: "Tre dischi che aiutano a seguire l'ascesa e l'evoluzione di Ne-Yo come artista.",
    defining: [
      { year: "2006", title: "In My Own Words", text: "Il debutto di Ne-Yo lo afferma come artista solista e presenta la voce dietro brani come So Sick e Sexy Love." },
      { year: "2007", title: "Because of You", text: "Il secondo album continua lo slancio del debutto e rafforza il suo posto nell'R&B contemporaneo." },
      { year: "2008", title: "Year of the Gentleman", text: "Un capitolo crossover decisivo, che avvicina R&B e pop con brani come Closer, Miss Independent e Mad." },
    ],
    songwriterEyebrow: "Dietro le Canzoni",
    songwriterTitle: "L'Autore",
    songwriterText: "Prima e parallelamente alla propria carriera discografica, Ne-Yo ha costruito una grande reputazione come autore. La sua scrittura è entrata in importanti dischi di altri artisti, mostrando la portata del suo stile melodico e lirico oltre la propria voce.",
    selectedEyebrow: "Attraverso gli Anni",
    selectedTitle: "Canzoni Selezionate",
    selectedText: "Una selezione da diversi periodi della carriera di Ne-Yo. Non è una classifica né un elenco completo dei singoli.",
    highwayEyebrow: "Capitolo Più Recente · 2026",
    highwayTitle: "Highway 79",
    highwayText: "Con Highway 79, Ne-Yo mostra un altro lato di sé come artista, esplorando una direzione ispirata al country dopo una carriera associata soprattutto a R&B e pop.",
    highwayDetail: "Pubblicato il 10 luglio 2026, l'album di 11 brani è stato registrato a Nashville e mantiene al centro l'identità R&B di Ne-Yo introducendo texture e narrazioni ispirate al country.",
    exploreEyebrow: "Continua a Esplorare",
    exploreTitle: "Altro da Ne-Yo World",
    cards: [
      ["Ne-Yo", "L'artista dietro la musica.", "/ne-yo"],
      ["Premi & Traguardi", "Riconoscimenti e grandi momenti della carriera.", "/awards"],
      ["Cinema, TV & Palco", "Esplora Ne-Yo oltre la musica registrata.", "/film-tv-stage"],
    ],
  },
  JA: {
    eyebrow: "音楽 · Ne-Yo World",
    title: "音楽",
    intro: "コンテンポラリーR&Bからポップ、ダンス、そしてカントリーに着想を得た新たな領域まで、Ne-Yoの音楽はソングライティングを中心に進化を続けています。",
    discographyEyebrow: "スタジオアルバム",
    discographyTitle: "ディスコグラフィー",
    discographyText: "2006年のデビューから最新の音楽的チャプターまで、Ne-Yoのスタジオアルバムを年代順に紹介します。",
    holiday: "ホリデーアルバム",
    artworkLoading: "カバーを読み込み中",
    definingEyebrow: "重要なチャプター",
    definingTitle: "代表的なアルバム",
    definingIntro: "レコーディングアーティストとしてのNe-Yoの飛躍と進化をたどる3作品。",
    defining: [
      { year: "2006", title: "In My Own Words", text: "Ne-Yoのデビュー作。So SickやSexy Loveなどを通して、ソロアーティストとしての存在を確立しました。" },
      { year: "2007", title: "Because of You", text: "デビュー作の勢いを受け継ぎ、コンテンポラリーR&Bにおける存在感をさらに強めたセカンドアルバムです。" },
      { year: "2008", title: "Year of the Gentleman", text: "Closer、Miss Independent、Madなどを通して、R&Bとより広いポップアプローチを結びつけた重要なクロスオーバー作品です。" },
    ],
    songwriterEyebrow: "楽曲の向こう側",
    songwriterTitle: "ソングライター",
    songwriterText: "自身のレコーディング活動以前から、そしてその活動と並行して、Ne-Yoはソングライターとして高い評価を築きました。他のアーティストの重要な楽曲にも関わり、そのメロディーと歌詞のスタイルは自身の歌声を超えて広がっています。",
    selectedEyebrow: "年代を越えて",
    selectedTitle: "セレクトソング",
    selectedText: "Ne-Yo自身のキャリアの異なる時期から選んだ楽曲です。ランキングや全シングルの一覧ではありません。",
    highwayEyebrow: "最新チャプター · 2026",
    highwayTitle: "Highway 79",
    highwayText: "Highway 79でNe-Yoは、主にR&Bとポップで知られてきたキャリアから、カントリーに着想を得た方向へと踏み出し、アーティストとして新たな一面を見せています。",
    highwayDetail: "2026年7月10日にリリースされた全11曲のアルバムはナッシュビルで録音され、Ne-YoのR&Bとしての個性を軸に、カントリーに着想を得た音色とストーリーテリングを取り入れています。",
    exploreEyebrow: "さらに見る",
    exploreTitle: "Ne-Yo Worldをもっと見る",
    cards: [
      ["Ne-Yo", "音楽の向こうにいるアーティスト。", "/ne-yo"],
      ["受賞 & マイルストーン", "キャリアの評価と重要な瞬間。", "/awards"],
      ["映画・TV・舞台", "レコーディング音楽を越えたNe-Yoを探索。", "/film-tv-stage"],
    ],
  },
} as const;

const musicExtra = {
  EN: {
    beginning: ["Before the Debut", "The Beginning", "Ne-Yo first reached the mainstream as a songwriter. Co-writing Mario's Let Me Love You became a major breakthrough before his own debut album and helped open the way for his solo recording career."],
    breakthrough: ["2006 · 2008", "The Breakthrough Years", "In My Own Words, Because of You and Year of the Gentleman established Ne-Yo as a recording artist, moving from contemporary R&B toward an increasingly broad pop crossover while keeping songwriting at the foundation."],
    evolution: ["Across the Discography", "Evolution of the Sound", "The albums that followed did not stay in one lane. Libra Scale expanded the cinematic and conceptual side of his work, R.E.D. moved further between R&B and pop, and later projects continued to shift between contemporary R&B, dance and soul. Highway 79 extends that evolution into country-inspired territory."],
    collaborations: ["Shared Records", "Collaborations", "Collaborations carried Ne-Yo's voice beyond his solo albums. Work with artists including Pitbull, Rihanna, David Guetta and Calvin Harris placed his vocals and songwriting across R&B, pop and dance audiences worldwide."],
    numbers: ["Global Reach", "Music in Numbers", "Streaming offers another view of how far the music continues to travel. Ne-Yo World records major thresholds rather than live counters that quickly become outdated."],
    catalog: "streams reported across his music catalog", songwriter: "songs credited on his Spotify songwriter profile", two: "2B+ Spotify streams", one: "1B+ Spotify streams", note: "Thresholds only · streaming totals continue to change",
  },
  PT: {
    beginning: ["Antes da Estreia", "O Início", "Ne-Yo chegou primeiro ao grande público como compositor. A coautoria de Let Me Love You, de Mario, tornou-se um ponto de viragem antes do seu próprio álbum de estreia e ajudou a abrir caminho para a carreira discográfica a solo."],
    breakthrough: ["2006 · 2008", "Os Anos de Afirmação", "In My Own Words, Because of You e Year of the Gentleman afirmaram Ne-Yo como artista, partindo do R&B contemporâneo para um crossover pop cada vez mais amplo, sempre com a composição como base."],
    evolution: ["Ao Longo da Discografia", "Evolução do Som", "Os álbuns seguintes não ficaram presos a uma única direção. Libra Scale ampliou o lado cinematográfico e conceptual, R.E.D. avançou entre R&B e pop e os projetos posteriores continuaram a explorar diferentes equilíbrios entre R&B contemporâneo, dance e soul. Highway 79 leva essa evolução a um território inspirado pelo country."],
    collaborations: ["Discos Partilhados", "Colaborações", "As colaborações levaram a voz de Ne-Yo para além dos seus álbuns a solo. Trabalhos com artistas como Pitbull, Rihanna, David Guetta e Calvin Harris chegaram a públicos de R&B, pop e dance em todo o mundo."],
    numbers: ["Alcance Global", "A Música em Números", "O streaming é outra forma de perceber até onde a música continua a chegar. Ne-Yo World regista grandes patamares, em vez de contadores exatos que ficam rapidamente desatualizados."],
    catalog: "streams reportados em todo o seu catálogo musical", songwriter: "canções creditadas no seu perfil de compositor no Spotify", two: "2B+ streams no Spotify", one: "1B+ streams no Spotify", note: "Apenas patamares · os totais de streaming continuam a mudar",
  },
  ES: {
    beginning: ["Antes del Debut", "El Comienzo", "Ne-Yo llegó primero al gran público como compositor. Coescribir Let Me Love You de Mario fue un punto de inflexión antes de su propio álbum debut y ayudó a abrir el camino para su carrera como solista."],
    breakthrough: ["2006 · 2008", "Los Años de Consolidación", "In My Own Words, Because of You y Year of the Gentleman consolidaron a Ne-Yo como artista, desde el R&B contemporáneo hacia un crossover pop más amplio con la composición como base."],
    evolution: ["A Través de la Discografía", "Evolución del Sonido", "Los álbumes siguientes no siguieron una sola dirección. Libra Scale amplió el lado cinematográfico y conceptual, R.E.D. avanzó entre R&B y pop y los proyectos posteriores siguieron explorando R&B, dance y soul. Highway 79 lleva esa evolución hacia un territorio inspirado en el country."],
    collaborations: ["Discos Compartidos", "Colaboraciones", "Las colaboraciones llevaron la voz de Ne-Yo más allá de sus álbumes solistas. Trabajos con Pitbull, Rihanna, David Guetta y Calvin Harris llegaron a públicos de R&B, pop y dance de todo el mundo."],
    numbers: ["Alcance Global", "La Música en Números", "El streaming muestra de otra forma hasta dónde sigue llegando la música. Ne-Yo World registra grandes umbrales en lugar de contadores exactos que cambian constantemente."],
    catalog: "streams reportados en todo su catálogo musical", songwriter: "canciones acreditadas en su perfil de compositor en Spotify", two: "2B+ streams en Spotify", one: "1B+ streams en Spotify", note: "Solo umbrales · los totales de streaming siguen cambiando",
  },
  FR: {
    beginning: ["Avant les Débuts", "Le Commencement", "Ne-Yo s'est d'abord fait connaître comme auteur-compositeur. La coécriture de Let Me Love You de Mario a constitué un tournant avant son propre premier album et a ouvert la voie à sa carrière solo."],
    breakthrough: ["2006 · 2008", "Les Années de Révélation", "In My Own Words, Because of You et Year of the Gentleman ont imposé Ne-Yo comme artiste, du R&B contemporain vers un crossover pop plus large, avec l'écriture comme fondation."],
    evolution: ["À Travers la Discographie", "Évolution du Son", "Les albums suivants ne restent pas dans une seule direction. Libra Scale développe le côté cinématographique et conceptuel, R.E.D. avance entre R&B et pop, puis les projets suivants explorent différents équilibres entre R&B, dance et soul. Highway 79 prolonge cette évolution vers un territoire inspiré par la country."],
    collaborations: ["Disques Partagés", "Collaborations", "Les collaborations ont porté la voix de Ne-Yo au-delà de ses albums solo. Des titres avec Pitbull, Rihanna, David Guetta et Calvin Harris ont touché les publics R&B, pop et dance dans le monde entier."],
    numbers: ["Portée Mondiale", "La Musique en Chiffres", "Le streaming offre une autre manière de mesurer la portée de la musique. Ne-Yo World retient les grands seuils plutôt que des compteurs exacts qui deviennent vite obsolètes."],
    catalog: "streams annoncés pour son catalogue musical", songwriter: "chansons créditées sur son profil Spotify d'auteur-compositeur", two: "2B+ streams Spotify", one: "1B+ streams Spotify", note: "Seuils uniquement · les totaux continuent d'évoluer",
  },
  DE: {
    beginning: ["Vor dem Debüt", "Der Anfang", "Ne-Yo erreichte das breite Publikum zunächst als Songwriter. Die Mitarbeit an Marios Let Me Love You wurde vor seinem eigenen Debütalbum zum entscheidenden Durchbruch und öffnete den Weg für seine Solokarriere."],
    breakthrough: ["2006 · 2008", "Die Durchbruchsjahre", "In My Own Words, Because of You und Year of the Gentleman etablierten Ne-Yo als Künstler und führten vom Contemporary R&B zu einem breiteren Pop-Crossover, während Songwriting die Grundlage blieb."],
    evolution: ["Durch die Diskografie", "Entwicklung des Sounds", "Die folgenden Alben blieben nicht in einer Richtung. Libra Scale erweiterte die filmische und konzeptionelle Seite, R.E.D. bewegte sich weiter zwischen R&B und Pop und spätere Projekte erkundeten R&B, Dance und Soul. Highway 79 führt diese Entwicklung in Country-inspiriertes Terrain."],
    collaborations: ["Gemeinsame Aufnahmen", "Kollaborationen", "Kollaborationen brachten Ne-Yos Stimme über seine Soloalben hinaus. Arbeiten mit Pitbull, Rihanna, David Guetta und Calvin Harris erreichten weltweit R&B-, Pop- und Dance-Publikum."],
    numbers: ["Globale Reichweite", "Musik in Zahlen", "Streaming zeigt auf eine weitere Weise die Reichweite der Musik. Ne-Yo World dokumentiert große Schwellenwerte statt exakter Zähler, die schnell veralten."],
    catalog: "gemeldete Streams über seinen Musikkatalog", songwriter: "Songs mit Credits auf seinem Spotify-Songwriterprofil", two: "2B+ Spotify-Streams", one: "1B+ Spotify-Streams", note: "Nur Schwellenwerte · Streamingzahlen verändern sich weiter",
  },
  IT: {
    beginning: ["Prima del Debutto", "L'Inizio", "Ne-Yo è arrivato al grande pubblico prima come autore. La co-scrittura di Let Me Love You di Mario è diventata una svolta prima del suo album di debutto e ha contribuito ad aprire la strada alla carriera solista."],
    breakthrough: ["2006 · 2008", "Gli Anni della Svolta", "In My Own Words, Because of You e Year of the Gentleman hanno affermato Ne-Yo come artista, dall'R&B contemporaneo verso un crossover pop più ampio, mantenendo la scrittura come fondamento."],
    evolution: ["Attraverso la Discografia", "Evoluzione del Suono", "Gli album successivi non sono rimasti in una sola direzione. Libra Scale ha ampliato il lato cinematografico e concettuale, R.E.D. si è mosso tra R&B e pop e i progetti successivi hanno esplorato R&B, dance e soul. Highway 79 porta questa evoluzione verso un territorio ispirato al country."],
    collaborations: ["Dischi Condivisi", "Collaborazioni", "Le collaborazioni hanno portato la voce di Ne-Yo oltre i suoi album solisti. Lavori con Pitbull, Rihanna, David Guetta e Calvin Harris hanno raggiunto pubblici R&B, pop e dance in tutto il mondo."],
    numbers: ["Portata Globale", "La Musica in Numeri", "Lo streaming mostra in un altro modo la portata della musica. Ne-Yo World registra grandi soglie invece di contatori esatti che diventano rapidamente obsoleti."],
    catalog: "stream riportati nell'intero catalogo musicale", songwriter: "brani accreditati nel suo profilo Spotify come autore", two: "2B+ stream su Spotify", one: "1B+ stream su Spotify", note: "Solo soglie · i totali streaming continuano a cambiare",
  },
  JA: {
    beginning: ["デビュー以前", "始まり", "Ne-Yoはまずソングライターとして広く知られるようになりました。MarioのLet Me Love Youの共作は、自身のデビューアルバム以前の大きな転機となり、ソロ活動への道を開きました。"],
    breakthrough: ["2006 · 2008", "飛躍の時代", "In My Own Words、Because of You、Year of the Gentlemanの3作はNe-Yoをアーティストとして確立し、ソングライティングを基盤にR&Bからより広いポップ・クロスオーバーへ進みました。"],
    evolution: ["ディスコグラフィーを通して", "サウンドの進化", "その後の作品は一つの方向に留まりません。Libra Scaleは映画的・コンセプチュアルな側面を広げ、R.E.D.はR&Bとポップの間を進み、後の作品もR&B、ダンス、ソウルを探求しました。Highway 79はその進化をカントリーに着想を得た領域へ広げています。"],
    collaborations: ["共演レコード", "コラボレーション", "コラボレーションはNe-Yoの声をソロアルバムの外へ広げました。Pitbull、Rihanna、David Guetta、Calvin Harrisなどとの作品が世界のR&B、ポップ、ダンスのリスナーへ届いています。"],
    numbers: ["世界への広がり", "数字で見る音楽", "ストリーミングは音楽の広がりを示すもう一つの方法です。Ne-Yo Worldでは、すぐに古くなる正確なカウンターではなく、既に超えた大きな節目を記録します。"],
    catalog: "音楽カタログ全体で報告されたストリーム", songwriter: "Spotifyのソングライタープロフィールにクレジットされた楽曲", two: "Spotify 20億+ ストリーム", one: "Spotify 10億+ ストリーム", note: "節目のみ · ストリーミング総数は今後も変化します",
  },
} as const;

const musicFinal = {
  EN: {
    highwayNew:
      "For this album, Ne-Yo spent four months writing in Nashville. The sessions brought him together with writers and artists including Luke Laird, BRELAND, Chuck Harmony, Claude Kelly, Dave Cohen and Charles Kelley. The title points back to Highway 79 in his home state of Arkansas, giving the project a personal connection as well as a new musical direction.",
    listenEyebrow: "Official Music Profiles",
    listenTitle: "Listen to Ne-Yo",
    listenText: "Continue through Ne-Yo's official music profiles across the major streaming platforms.",
  },
  PT: {
    highwayNew:
      "Para este álbum, Ne-Yo passou quatro meses a escrever em Nashville. As sessões juntaram-no a compositores e artistas como Luke Laird, BRELAND, Chuck Harmony, Claude Kelly, Dave Cohen e Charles Kelley. O título remete para a Highway 79 no Arkansas, o seu estado natal, dando ao projeto uma ligação pessoal para além da nova direção musical.",
    listenEyebrow: "Perfis Musicais Oficiais",
    listenTitle: "Ouve Ne-Yo",
    listenText: "Continua a explorar a música de Ne-Yo através dos seus perfis musicais oficiais nas principais plataformas de streaming.",
  },
  ES: {
    highwayNew: "Para este álbum, Ne-Yo pasó cuatro meses escribiendo en Nashville. Las sesiones lo reunieron con autores y artistas como Luke Laird, BRELAND, Chuck Harmony, Claude Kelly, Dave Cohen y Charles Kelley. El título remite a la Highway 79 de Arkansas, su estado natal, dando al proyecto una conexión personal además de una nueva dirección musical.",
    listenEyebrow: "Perfiles Musicales Oficiales", listenTitle: "Escucha a Ne-Yo", listenText: "Continúa explorando la música de Ne-Yo a través de sus perfiles musicales oficiales en las principales plataformas de streaming.",
  },
  FR: {
    highwayNew: "Pour cet album, Ne-Yo a passé quatre mois à écrire à Nashville. Les sessions l'ont réuni avec des auteurs et artistes comme Luke Laird, BRELAND, Chuck Harmony, Claude Kelly, Dave Cohen et Charles Kelley. Le titre renvoie à la Highway 79 dans l'Arkansas, son État natal, donnant au projet un lien personnel en plus de sa nouvelle direction musicale.",
    listenEyebrow: "Profils Musicaux Officiels", listenTitle: "Écouter Ne-Yo", listenText: "Poursuivez l'exploration de la musique de Ne-Yo via ses profils musicaux officiels sur les principales plateformes de streaming.",
  },
  DE: {
    highwayNew: "Für dieses Album verbrachte Ne-Yo vier Monate mit Songwriting in Nashville. Die Sessions brachten ihn mit Autoren und Künstlern wie Luke Laird, BRELAND, Chuck Harmony, Claude Kelly, Dave Cohen und Charles Kelley zusammen. Der Titel verweist auf Highway 79 in seinem Heimatstaat Arkansas und gibt dem Projekt neben der neuen musikalischen Richtung eine persönliche Verbindung.",
    listenEyebrow: "Offizielle Musikprofile", listenTitle: "Ne-Yo Anhören", listenText: "Entdecke Ne-Yos Musik über seine offiziellen Profile auf den wichtigsten Streaming-Plattformen.",
  },
  IT: {
    highwayNew: "Per questo album, Ne-Yo ha trascorso quattro mesi a scrivere a Nashville. Le sessioni lo hanno riunito con autori e artisti come Luke Laird, BRELAND, Chuck Harmony, Claude Kelly, Dave Cohen e Charles Kelley. Il titolo rimanda alla Highway 79 in Arkansas, il suo stato natale, dando al progetto un legame personale oltre alla nuova direzione musicale.",
    listenEyebrow: "Profili Musicali Ufficiali", listenTitle: "Ascolta Ne-Yo", listenText: "Continua a esplorare la musica di Ne-Yo attraverso i suoi profili musicali ufficiali sulle principali piattaforme di streaming.",
  },
  JA: {
    highwayNew: "このアルバムのためにNe-Yoはナッシュビルで4か月間ソングライティングに取り組みました。Luke Laird、BRELAND、Chuck Harmony、Claude Kelly、Dave Cohen、Charles Kelleyらとセッションを行っています。タイトルは故郷アーカンソー州のHighway 79に由来し、新しい音楽的方向性に個人的なつながりも加えています。",
    listenEyebrow: "公式音楽プロフィール", listenTitle: "Ne-Yoを聴く", listenText: "主要ストリーミングサービスにあるNe-Yoの公式音楽プロフィールから、さらに音楽を楽しめます。",
  },
} as const;

const musicPlatforms = [
  ["Spotify", "https://open.spotify.com/artist/21E3waRsmPlU7jZsS13rcj"],
  ["Apple Music", "https://music.apple.com/us/artist/ne-yo/78257321"],
  ["Amazon Music", "https://music.amazon.com/artists/B000VZB8LY/ne-yo"],
  ["TIDAL", "https://tidal.com/artist/16852"],
  ["Deezer", "https://www.deezer.com/en/artist/104"],
  ["SoundCloud", "https://soundcloud.com/ne-yo"],
  ["YouTube Music", "https://music.youtube.com/channel/UCvtkFm0XlCLqyvtP7UpqAoA"],
  ["Audiomack", "https://audiomack.com/neyo"],
] as const;

const careerEnding = {
  EN: { eyebrow: "Continue Exploring", title: "More of Ne-Yo's career", neyo: "Ne-Yo", neyoD: "Return to the main artist profile.", film: "Film, TV & Stage", filmD: "Explore acting, television and stage work.", awards: "Awards & Milestones", awardsD: "Awards, nominations and major career achievements." },
  PT: { eyebrow: "Continuar a Explorar", title: "Mais da carreira de Ne-Yo", neyo: "Ne-Yo", neyoD: "Voltar ao perfil principal do artista.", film: "Cinema, TV & Palco", filmD: "Explorar cinema, televisão e palco.", awards: "Prémios & Marcos", awardsD: "Prémios, nomeações e grandes conquistas da carreira." },
  ES: { eyebrow: "Continuar Explorando", title: "Más de la carrera de Ne-Yo", neyo: "Ne-Yo", neyoD: "Volver al perfil principal del artista.", film: "Cine, TV & Escenario", filmD: "Explora cine, televisión y escenario.", awards: "Premios & Hitos", awardsD: "Premios, nominaciones y grandes logros de su carrera." },
  FR: { eyebrow: "Continuer à Explorer", title: "Plus de la carrière de Ne-Yo", neyo: "Ne-Yo", neyoD: "Retour au profil principal de l’artiste.", film: "Cinéma, TV & Scène", filmD: "Explorez le cinéma, la télévision et la scène.", awards: "Prix & Jalons", awardsD: "Prix, nominations et grandes réalisations de sa carrière." },
  DE: { eyebrow: "Weiter Entdecken", title: "Mehr aus Ne-Yos Karriere", neyo: "Ne-Yo", neyoD: "Zurück zum Hauptprofil des Künstlers.", film: "Film, TV & Bühne", filmD: "Film, Fernsehen und Bühnenarbeit entdecken.", awards: "Auszeichnungen & Meilensteine", awardsD: "Preise, Nominierungen und wichtige Karriereerfolge." },
  IT: { eyebrow: "Continua a Esplorare", title: "Altro dalla carriera di Ne-Yo", neyo: "Ne-Yo", neyoD: "Torna al profilo principale dell’artista.", film: "Cinema, TV & Palco", filmD: "Esplora cinema, televisione e palco.", awards: "Premi & Traguardi", awardsD: "Premi, nomination e grandi traguardi della carriera." },
  JA: { eyebrow: "さらに見る", title: "Ne-Yoのキャリアをもっと見る", neyo: "Ne-Yo", neyoD: "メインのアーティストプロフィールへ戻る。", film: "映画・TV・舞台", filmD: "映画、テレビ、舞台での活動を見る。", awards: "受賞歴 & マイルストーン", awardsD: "受賞、ノミネート、キャリアの主要な実績を見る。" },
} as const;

export default function MusicPage() {
  const { language } = useLanguage();
  const t = copy[language];
  const yotg = yearGentlemanCopy[(language as keyof typeof yearGentlemanCopy) || "EN"] || yearGentlemanCopy.EN;
  const boy = becauseOfYouCopy[(language as keyof typeof becauseOfYouCopy) || "EN"] || becauseOfYouCopy.EN;
  const imow = inMyOwnWordsCopy[(language as keyof typeof inMyOwnWordsCopy) || "EN"] || inMyOwnWordsCopy.EN;
  const nf = nonFictionCopy[(language as keyof typeof nonFictionCopy) || "EN"] || nonFictionCopy.EN;
  const x = musicExtra[language];
  const f = musicFinal[language];
  const c = careerEnding[language];
  const [artwork, setArtwork] = useState<ArtworkMap>({});
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);
  const [extraAlbumEdition, setExtraAlbumEdition] = useState<"standard" | "deluxe">("standard");

  const extraAlbum = openAlbum
    ? extraAlbumExperiences[openAlbum as keyof typeof extraAlbumExperiences]
    : undefined;
  const extraCopySet = openAlbum
    ? extraAlbumCopy[openAlbum as keyof typeof extraAlbumCopy]
    : undefined;
  const extraCopy = extraCopySet
    ? extraCopySet[(language as keyof typeof extraCopySet) || "EN"] || extraCopySet.EN
    : undefined;
  const [yearGentlemanEdition, setYearGentlemanEdition] = useState<"standard" | "bonus">("standard");
  const [inMyOwnWordsEdition, setInMyOwnWordsEdition] = useState<"standard" | "anniversary">("standard");
  const [nonFictionEdition, setNonFictionEdition] = useState<"standard" | "deluxe">("deluxe");

  const ids = useMemo(() => albums.map((album) => album.appleId).join(","), []);

  useEffect(() => {
    let active = true;

    async function loadArtwork() {
      try {
        const response = await fetch(
          `https://itunes.apple.com/lookup?id=${ids}&entity=album`
        );

        if (!response.ok) return;

        const data = await response.json();
        if (!active || !Array.isArray(data?.results)) return;

        const nextArtwork: ArtworkMap = {};

        for (const item of data.results) {
          if (item.wrapperType !== "collection" || !item.collectionId || !item.artworkUrl100) {
            continue;
          }

          nextArtwork[String(item.collectionId)] = item.artworkUrl100.replace(
            "100x100bb",
            "600x600bb"
          );
        }

        setArtwork(nextArtwork);
      } catch {
        // Artwork is optional; the page keeps its existing fallback presentation.
      }
    }

    loadArtwork();

    return () => {
      active = false;
    };
  }, [ids]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-12%] top-[8%] h-[560px] w-[560px] rounded-full bg-[#D51C24]/5 blur-[190px]" />
        <div className="absolute right-[-10%] top-[18%] h-[680px] w-[680px] rounded-full bg-[#D4AF37]/5 blur-[210px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.14)_55%,rgba(0,0,0,0.88)_100%)]" />
      </div>

      <SiteHeader />

      <section className="relative z-10 px-6 pb-16 pt-16 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[820px]">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#D51C24]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                {t.eyebrow}
              </p>
            </div>

            <h1 className="mt-7 text-5xl font-black uppercase tracking-[-0.045em] md:text-6xl">
              {t.title}
            </h1>

            <p className="mt-7 max-w-[760px] text-[15px] leading-7 text-white/60 md:text-[16px]">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D51C24]">
            {t.discographyEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.discographyTitle}</h2>
          <p className="mt-4 max-w-[700px] text-[15px] leading-7 text-white/50">
            {t.discographyText}
          </p>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {albums.map((album) => (
              <article
                key={album.appleId}
                onClick={() => {
                  setExtraAlbumEdition("standard");
                  setOpenAlbum(album.title);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setExtraAlbumEdition("standard");
                    setOpenAlbum(album.title);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${nf.open}: ${album.title}`}
                className="group cursor-pointer overflow-hidden rounded-[20px] border border-[#D4AF37]/15 bg-[#08090A] transition hover:border-[#D4AF37]/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
              >
                <div className="relative aspect-square overflow-hidden bg-white/[0.025]">
                  {artwork[album.appleId] ? (
                    <img
                      src={artwork[album.appleId]}
                      alt={`${album.title} album cover`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-5 text-center">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                        {t.artworkLoading}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex min-h-[18px] items-center justify-between gap-2">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/65">
                      {album.year}
                    </p>
                    {album.tag === "holiday" && (
                      <span className="text-[8px] uppercase tracking-[0.12em] text-[#D51C24]">
                        {t.holiday}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-[14px] font-semibold leading-5 text-white/90">
                    {album.title}
                  </h3>
                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]/70">
                    {nf.open} →
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D51C24]">
              {t.songwriterEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.songwriterTitle}</h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-white/55">
              {t.songwriterText}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {songwriterSongs.map(([artist, song]) => (
              <article
                key={`${artist}-${song}`}
                className="rounded-2xl border border-[#D4AF37]/15 bg-[#08090A] p-5"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]/60">
                  {artist}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{song}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D51C24]">
            {f.listenEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{f.listenTitle}</h2>
          <p className="mt-4 max-w-[700px] text-[15px] leading-7 text-white/50">
            {f.listenText}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {musicPlatforms.map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[72px] items-center justify-between rounded-2xl border border-[#D4AF37]/15 bg-[#08090A] px-5 py-4 transition hover:border-[#D4AF37]/45"
              >
                <span className="text-[13px] font-semibold text-white/80 transition group-hover:text-[#D4AF37]">
                  {name}
                </span>
                <span className="text-sm text-[#D51C24] transition-transform group-hover:translate-x-1">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-[#D4AF37]/10 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.035),transparent_45%)] px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1140px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D51C24]">{c.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">{c.title}</h2>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {[
              [c.neyo, c.neyoD, "/ne-yo"],
              [c.film, c.filmD, "/film-tv-stage"],
              [c.awards, c.awardsD, "/awards"],
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
    
      {extraAlbum && extraCopy && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenAlbum(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="extra-album-title"
            className="relative max-h-[90vh] w-full max-w-[1040px] overflow-y-auto rounded-[24px] border border-[#D4AF37]/20 bg-[#08090A] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpenAlbum(null)}
              aria-label={extraCopy.close}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl text-white/70 transition hover:border-[#D4AF37]/40 hover:text-white"
            >
              ×
            </button>

            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="border-b border-[#D4AF37]/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <div className="mx-auto max-w-[300px] overflow-hidden rounded-[18px] border border-[#D4AF37]/15 bg-white/[0.025]">
                  {artwork[extraAlbum.appleId] ? (
                    <img
                      src={artwork[extraAlbum.appleId]}
                      alt={`${openAlbum} album cover`}
                      className="aspect-square h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                  {extraAlbum.year} · {extraAlbum.label}
                </p>
                <h2 id="extra-album-title" className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
                  {openAlbum}
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-white/35">
                  {extraAlbum.subtitle}
                </p>
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                <section>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                    {extraCopy.about}
                  </p>
                  <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-white/65">
                    {extraCopy.aboutText}
                  </p>
                </section>

                <section className="mt-8 rounded-[18px] border border-[#D4AF37]/15 bg-[#D4AF37]/[0.035] p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {extraCopy.specialTitle}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-white/65">
                    {extraCopy.specialText}
                  </p>
                </section>

                {openAlbum === "Highway 79" && (
                  <section className="mt-8">
                    <a
                      href="https://www.youtube.com/watch?v=EkOa27tjMgY"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-full max-w-[620px] overflow-hidden rounded-[18px] border border-[#D4AF37]/15 bg-black/30 transition hover:border-[#D4AF37]/45"
                      aria-label="Ne-Yo · Highway 79 Album Trailer"
                    >
                      <div className="relative aspect-video overflow-hidden bg-black">
                        <img
                          src="https://i.ytimg.com/vi/EkOa27tjMgY/maxresdefault.jpg"
                          alt="Ne-Yo · Highway 79 Album Trailer"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/65 text-lg text-white backdrop-blur-sm transition group-hover:scale-105">
                            ▶
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 pt-14">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                            Highway 79 · Album Trailer
                          </p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/65">
                            Official NE-YO · YouTube ↗
                          </p>
                        </div>
                      </div>
                    </a>
                  </section>
                )}

                <section className="mt-9">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                        {extraCopy.tracks}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-white">
                        {(extraAlbumEdition === "deluxe" && extraAlbum.deluxe
                          ? extraAlbum.deluxe
                          : extraAlbum.standard).length} {extraCopy.tracks}
                      </h3>
                    </div>

                    {extraAlbum.deluxe && (
                      <div className="flex rounded-full border border-white/10 bg-black/40 p-1">
                        {(["standard", "deluxe"] as const).map((edition) => (
                          <button
                            key={edition}
                            type="button"
                            onClick={() => setExtraAlbumEdition(edition)}
                            className={`rounded-full px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                              extraAlbumEdition === edition
                                ? "bg-[#D4AF37] text-black"
                                : "text-white/45 hover:text-white"
                            }`}
                          >
                            {edition === "standard" ? extraCopy.standard : extraCopy.deluxe}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <ol className="mt-5 grid gap-x-8 gap-y-0 md:grid-cols-2">
                    {(extraAlbumEdition === "deluxe" && extraAlbum.deluxe
                      ? extraAlbum.deluxe
                      : extraAlbum.standard
                    ).map((track, index) => (
                      <li
                        key={`${track}-${index}`}
                        className="flex gap-3 border-b border-white/[0.06] py-3 text-[13px] leading-5 text-white/65"
                      >
                        <span className="w-5 shrink-0 text-right text-[10px] text-[#D4AF37]/55">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{track}</span>
                      </li>
                    ))}
                  </ol>

                  {extraCopy.editionNote && (
                    <p className="mt-4 text-[10px] leading-5 text-white/30">
                      {extraCopy.editionNote}
                    </p>
                  )}
                </section>

                {extraAlbum.collabs.length > 0 && (
                  <section className="mt-9 border-t border-[#D4AF37]/10 pt-7">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                      {extraCopy.collaborations}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {extraAlbum.collabs.map((artist) => (
                        <span
                          key={artist}
                          className="rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/55"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {openAlbum === "Year of the Gentleman" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenAlbum(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="year-gentleman-title"
            className="relative max-h-[90vh] w-full max-w-[1040px] overflow-y-auto rounded-[24px] border border-[#D4AF37]/20 bg-[#08090A] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpenAlbum(null)}
              aria-label={yotg.close}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl text-white/70 transition hover:border-[#D4AF37]/40 hover:text-white"
            >
              ×
            </button>

            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="border-b border-[#D4AF37]/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <div className="mx-auto max-w-[300px] overflow-hidden rounded-[18px] border border-[#D4AF37]/15 bg-white/[0.025]">
                  {artwork["1445833884"] ? (
                    <img
                      src={artwork["1445833884"]}
                      alt="Year of the Gentleman album cover"
                      className="aspect-square h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                  2008 · Def Jam
                </p>
                <h2 id="year-gentleman-title" className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
                  Year of the Gentleman
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-white/35">
                  Third Studio Album
                </p>
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                <section>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">{yotg.about}</p>
                  <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-white/65">{yotg.aboutText}</p>
                </section>

                <section className="mt-8 rounded-[18px] border border-[#D4AF37]/15 bg-[#D4AF37]/[0.035] p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">{yotg.storyTitle}</p>
                  <p className="mt-3 text-[14px] leading-7 text-white/65">{yotg.storyText}</p>
                </section>

                <section className="mt-8 rounded-[18px] border border-white/[0.07] bg-white/[0.02] p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">{yotg.milestoneTitle}</p>
                  <p className="mt-3 text-[14px] leading-7 text-white/65">{yotg.milestoneText}</p>
                </section>

                <section className="mt-9">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">{yotg.tracks}</p>
                      <h3 className="mt-2 text-xl font-bold text-white">
                        {yearGentlemanEdition === "standard" ? "12" : "13"} {yotg.tracks}
                      </h3>
                    </div>
                    <div className="flex rounded-full border border-white/10 bg-black/40 p-1">
                      {(["standard", "bonus"] as const).map((edition) => (
                        <button
                          key={edition}
                          type="button"
                          onClick={() => setYearGentlemanEdition(edition)}
                          className={`rounded-full px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                            yearGentlemanEdition === edition ? "bg-[#D4AF37] text-black" : "text-white/45 hover:text-white"
                          }`}
                        >
                          {edition === "standard" ? yotg.standard : yotg.bonus}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ol className="mt-5 grid gap-x-8 gap-y-0 md:grid-cols-2">
                    {(yearGentlemanEdition === "standard" ? yearGentlemanStandard : yearGentlemanBonus).map((track, index) => (
                      <li key={`${track}-${index}`} className="flex gap-3 border-b border-white/[0.06] py-3 text-[13px] leading-5 text-white/65">
                        <span className="w-5 shrink-0 text-right text-[10px] text-[#D4AF37]/55">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{track}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 text-[10px] leading-5 text-white/30">{yotg.editionNote}</p>
                </section>

                {yearGentlemanEdition === "bonus" && (
                  <section className="mt-9 border-t border-[#D4AF37]/10 pt-7">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">{yotg.collaborations}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {yearGentlemanCollaborations.map((artist) => (
                        <span key={artist} className="rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/55">
                          {artist}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {openAlbum === "Because of You" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenAlbum(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="because-of-you-title"
            className="relative max-h-[90vh] w-full max-w-[1040px] overflow-y-auto rounded-[24px] border border-[#D4AF37]/20 bg-[#08090A] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpenAlbum(null)}
              aria-label={boy.close}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl text-white/70 transition hover:border-[#D4AF37]/40 hover:text-white"
            >
              ×
            </button>

            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="border-b border-[#D4AF37]/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <div className="mx-auto max-w-[300px] overflow-hidden rounded-[18px] border border-[#D4AF37]/15 bg-white/[0.025]">
                  {artwork["1440757452"] ? (
                    <img
                      src={artwork["1440757452"]}
                      alt="Because of You album cover"
                      className="aspect-square h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                  2007 · Def Jam
                </p>
                <h2 id="because-of-you-title" className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
                  Because of You
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-white/35">
                  Second Studio Album
                </p>
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                <section>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                    {boy.about}
                  </p>
                  <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-white/65">
                    {boy.aboutText}
                  </p>
                </section>

                <section className="mt-8 rounded-[18px] border border-[#D4AF37]/15 bg-[#D4AF37]/[0.035] p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {boy.milestoneTitle}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-white/65">
                    {boy.milestoneText}
                  </p>
                </section>

                <section className="mt-9">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                      {boy.tracks}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">
                      12 {boy.tracks}
                    </h3>
                  </div>

                  <ol className="mt-5 grid gap-x-8 gap-y-0 md:grid-cols-2">
                    {becauseOfYouTracks.map((track, index) => (
                      <li
                        key={`${track}-${index}`}
                        className="flex gap-3 border-b border-white/[0.06] py-3 text-[13px] leading-5 text-white/65"
                      >
                        <span className="w-5 shrink-0 text-right text-[10px] text-[#D4AF37]/55">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{track}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="mt-9 border-t border-[#D4AF37]/10 pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {boy.collaborations}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {becauseOfYouCollaborations.map((artist) => (
                      <span
                        key={artist}
                        className="rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/55"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {openAlbum === "In My Own Words" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenAlbum(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="in-my-own-words-title"
            className="relative max-h-[90vh] w-full max-w-[1040px] overflow-y-auto rounded-[24px] border border-[#D4AF37]/20 bg-[#08090A] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpenAlbum(null)}
              aria-label={imow.close}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl text-white/70 transition hover:border-[#D4AF37]/40 hover:text-white"
            >
              ×
            </button>

            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="border-b border-[#D4AF37]/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <div className="mx-auto max-w-[300px] overflow-hidden rounded-[18px] border border-[#D4AF37]/15 bg-white/[0.025]">
                  {artwork["1440783129"] ? (
                    <img
                      src={artwork["1440783129"]}
                      alt="In My Own Words album cover"
                      className="aspect-square h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                  2006 · Def Jam
                </p>
                <h2 id="in-my-own-words-title" className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
                  In My Own Words
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-white/35">
                  Debut Studio Album
                </p>
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                <section>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                    {imow.about}
                  </p>
                  <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-white/65">
                    {imow.aboutText}
                  </p>
                </section>

                <section className="mt-8 rounded-[18px] border border-[#D4AF37]/15 bg-[#D4AF37]/[0.035] p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {imow.beginningTitle}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-white/65">
                    {imow.beginningText}
                  </p>
                </section>

                <section className="mt-9">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                        {imow.tracks}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-white">
                        {inMyOwnWordsEdition === "standard" ? "13" : "19"} {imow.tracks}
                      </h3>
                    </div>
                    <div className="flex rounded-full border border-white/10 bg-black/40 p-1">
                      {(["standard", "anniversary"] as const).map((edition) => (
                        <button
                          key={edition}
                          type="button"
                          onClick={() => setInMyOwnWordsEdition(edition)}
                          className={`rounded-full px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                            inMyOwnWordsEdition === edition
                              ? "bg-[#D4AF37] text-black"
                              : "text-white/45 hover:text-white"
                          }`}
                        >
                          {edition === "standard" ? imow.standard : imow.anniversary}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ol className="mt-5 grid gap-x-8 gap-y-0 md:grid-cols-2">
                    {(inMyOwnWordsEdition === "standard"
                      ? inMyOwnWordsStandard
                      : inMyOwnWordsAnniversary
                    ).map((track, index) => (
                      <li
                        key={`${track}-${index}`}
                        className="flex gap-3 border-b border-white/[0.06] py-3 text-[13px] leading-5 text-white/65"
                      >
                        <span className="w-5 shrink-0 text-right text-[10px] text-[#D4AF37]/55">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{track}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 text-[10px] leading-5 text-white/30">{imow.editionNote}</p>
                </section>

                <section className="mt-9 border-t border-[#D4AF37]/10 pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {imow.collaborations}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {inMyOwnWordsCollaborations.map((artist) => (
                      <span
                        key={artist}
                        className="rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/55"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {openAlbum === "Non-Fiction" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenAlbum(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="non-fiction-title"
            className="relative max-h-[90vh] w-full max-w-[1040px] overflow-y-auto rounded-[24px] border border-[#D4AF37]/20 bg-[#08090A] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpenAlbum(null)}
              aria-label={nf.close}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-xl text-white/70 transition hover:border-[#D4AF37]/40 hover:text-white"
            >
              ×
            </button>

            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="border-b border-[#D4AF37]/10 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <div className="mx-auto max-w-[300px] overflow-hidden rounded-[18px] border border-[#D4AF37]/15 bg-white/[0.025]">
                  {artwork["1443068317"] ? (
                    <img
                      src={artwork["1443068317"]}
                      alt="Non-Fiction album cover"
                      className="aspect-square h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                  2015 · Motown
                </p>
                <h2 id="non-fiction-title" className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
                  Non-Fiction
                </h2>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-white/35">
                  Sixth Studio Album
                </p>
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                <section>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                    {nf.about}
                  </p>
                  <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-white/65">
                    {nf.aboutText}
                  </p>
                </section>

                <section className="mt-8 rounded-[18px] border border-[#D4AF37]/15 bg-[#D4AF37]/[0.035] p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {nf.fanTitle}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-white/65">
                    {nf.fanText}
                  </p>
                </section>

                <section className="mt-9">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                        {nf.tracks}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-white">
                        {nonFictionEdition === "standard" ? "12" : "21"} {nf.tracks}
                      </h3>
                    </div>
                    <div className="flex rounded-full border border-white/10 bg-black/40 p-1">
                      {(["standard", "deluxe"] as const).map((edition) => (
                        <button
                          key={edition}
                          type="button"
                          onClick={() => setNonFictionEdition(edition)}
                          className={`rounded-full px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] transition ${
                            nonFictionEdition === edition
                              ? "bg-[#D4AF37] text-black"
                              : "text-white/45 hover:text-white"
                          }`}
                        >
                          {edition === "standard" ? nf.standard : nf.deluxe}
                        </button>
                      ))}
                    </div>
                  </div>

                  <ol className="mt-5 grid gap-x-8 gap-y-0 md:grid-cols-2">
                    {(nonFictionEdition === "standard" ? nonFictionStandard : nonFictionDeluxe).map(
                      (track, index) => (
                        <li
                          key={`${track}-${index}`}
                          className="flex gap-3 border-b border-white/[0.06] py-3 text-[13px] leading-5 text-white/65"
                        >
                          <span className="w-5 shrink-0 text-right text-[10px] text-[#D4AF37]/55">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{track}</span>
                        </li>
                      )
                    )}
                  </ol>
                  <p className="mt-4 text-[10px] leading-5 text-white/30">{nf.editionNote}</p>
                </section>

                <section className="mt-9 border-t border-[#D4AF37]/10 pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                    {nf.collaborations}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {nonFictionCollaborations.map((artist) => (
                      <span
                        key={artist}
                        className="rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/55"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
