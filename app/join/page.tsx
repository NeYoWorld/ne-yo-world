"use client";

import { FormEvent, useState } from "react";

import { useLanguage } from "../context/LanguageContext";
import SiteHeader from "../components/SiteHeader";

import { supabase } from "../lib/supabase";


/* =========================================================
   COUNTRIES
========================================================= */

const countries = [
  "Albania",
  "Algeria",
  "Angola",
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "Colombia",
  "Croatia",
  "Denmark",
  "Dominican Republic",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Kenya",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Romania",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
  "Other",
];


const platforms = [
  "Instagram",
  "TikTok",
  "Facebook",
  "X / Twitter",
  "YouTube",
  "Other",
];


const roles = [
  {
    value: "Owner",
    EN: "Owner",
    PT: "Proprietário",
    ES: "Propietario",
    FR: "Propriétaire",
    DE: "Inhaber",
    IT: "Proprietario",
    JA: "オーナー",
  },
  {
    value: "Admin",
    EN: "Admin",
    PT: "Administrador",
    ES: "Administrador",
    FR: "Administrateur",
    DE: "Administrator",
    IT: "Amministratore",
    JA: "管理者",
  },
  {
    value: "Team Member",
    EN: "Team Member",
    PT: "Membro da Equipa",
    ES: "Miembro del Equipo",
    FR: "Membre de l’Équipe",
    DE: "Teammitglied",
    IT: "Membro del Team",
    JA: "チームメンバー",
  },
  {
    value: "Other",
    EN: "Other",
    PT: "Outro",
    ES: "Otro",
    FR: "Autre",
    DE: "Andere",
    IT: "Altro",
    JA: "その他",
  },
];


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  EN: {
    backToWorld: "Back to the World",

    applicationReceived:
      "Application Received",

    thankYou:
      "Thank You",

    successText:
      "Your fan page application has been received and is now pending review. Every application is reviewed before any fan page becomes part of Ne-Yo World.",

    fanPage:
      "Fan Page",

    username:
      "Username",

    country:
      "Country",

    status:
      "Status",

    pendingReview:
      "Pending Review",

    backHome:
      "Back Home",

    submitAnother:
      "Submit Another",

    becomePart:
      "Become Part of Ne-Yo World",

    joinThe:
      "Join The",

    project:
      "Project",

    heroText:
      "Run or help manage a Ne-Yo fan page? Submit your community to become part of Ne-Yo World.",

    reviewText:
      "Every application is reviewed before being added to the project. A country can have more than one approved fan page.",

    submit:
      "Submit",

    review:
      "Review",

    joinNeyoWorld:
      "Join Ne-Yo World",

    fanPageInformation:
      "Fan Page Information",

    tellCommunity:
      "Tell us about your community",

    fanPageName:
      "Fan Page Name *",

    fanPageNamePlaceholder:
      "Example: Best of Ne-Yo",

    usernameLabel:
      "@Username *",

    usernamePlaceholder:
      "@yourfanpage",

    countryLabel:
      "Country *",

    selectCountry:
      "Select country",

    platform:
      "Platform *",

    selectPlatform:
      "Select platform",

    fanPageLink:
      "Fan Page Link *",

    pageCreated:
      "Page Created",

    optional:
      "Optional",

    yearPlaceholder:
      "Example: 2020",

    tellFanPage:
      "Tell us about your fan page",

    descriptionPlaceholder:
      "Tell us about the page, the community and what you share...",

    aboutYou:
      "About You",

    whoSubmitting:
      "Who is submitting this page?",

    contactPrivate:
      "Your contact information will not be displayed publicly.",

    yourName:
      "Your Name *",

    yourNamePlaceholder:
      "Your name",

    email:
      "Email *",

    yourRole:
      "Your Role *",

    selectRole:
      "Select role",

    whyJoin:
      "Why would you like to join?",

    whyFanPage:
      "Why would you like your fan page to be part of Ne-Yo World? *",

    reasonPlaceholder:
      "Tell us why you would like your fan page to become part of the project...",

    authorization:
      "I confirm that I am authorized to represent this fan page and submit it for consideration as part of Ne-Yo World.",

    requiredError:
      "Please complete all required fields.",

    authorizationError:
      "Please confirm that you are authorized to represent this fan page.",

    submitApplication:
      "Submit Application",

    databaseError:
      "We could not send your application. Please try again.",

    submitting:
      "Sending...",

    footer:
      "Join The Project",

    profileSection: "Fan Page Profile",
    profileSectionTitle: "Tell your story",
    profileSectionText:
      "If your page is approved, these answers can be used to build its public profile on Ne-Yo World. We review the content before anything is published.",
    publicCreatorName: "Public Creator / Founder Name *",
    publicCreatorNamePlaceholder: "Name to show publicly on the profile",
    fanSince: "Ne-Yo Fan Since *",
    fanSincePlaceholder: "Example: 2006",
    profileIntro: "Profile Introduction",
    profileIntroPlaceholder:
      "A short introduction to your fan page and the person or team behind it...",
    ourStory: "Our Story *",
    ourStoryPlaceholder:
      "How did your connection with Ne-Yo begin? How did the fan page start? Tell us the story you would like other fans to read...",
    whyNeyoProfile: "Why Ne-Yo? *",
    whyNeyoProfilePlaceholder:
      "What does Ne-Yo, his music or his career mean to you and your community?",
    messageToNeyo: "Message to Ne-Yo *",
    messageToNeyoPlaceholder:
      "Write the personal message you would like Ne-Yo to read...",
    favoriteSong: "Favorite Ne-Yo Song",
    favoriteSongPlaceholder: "Optional",
    journeyTitle: "Your Journey",
    journeyText:
      "Add the key moments you would like to appear in your fan page journey. You can add more than one.",
    journeyYear: "Year",
    journeyYearPlaceholder: "Example: 2024",
    journeyMomentTitle: "Moment Title",
    journeyMomentTitlePlaceholder: "Example: First Ne-Yo concert",
    journeyDescription: "What happened?",
    journeyDescriptionPlaceholder:
      "Tell us why this moment was important...",
    addJourneyMoment: "Add Another Moment",
    removeJourneyMoment: "Remove",
    profileRequiredError:
      "Please complete the required fan page profile fields.",
    journeyIncompleteError:
      "Complete the year, title and description for every journey moment you add.",


    other:
      "Other",
  },


  PT: {
    backToWorld:
      "Voltar ao Mundo",

    applicationReceived:
      "Candidatura Recebida",

    thankYou:
      "Obrigado",

    successText:
      "A candidatura da tua página de fãs foi recebida e está agora a aguardar análise. Todas as candidaturas são analisadas antes de qualquer página de fãs passar a fazer parte do Ne-Yo World.",

    fanPage:
      "Página de Fãs",

    username:
      "Nome de Utilizador",

    country:
      "País",

    status:
      "Estado",

    pendingReview:
      "A Aguardar Análise",

    backHome:
      "Voltar ao Início",

    submitAnother:
      "Enviar Outra",

    becomePart:
      "Faz Parte do Ne-Yo World",

    joinThe:
      "Junta-te ao",

    project:
      "Projeto",

    heroText:
      "Tens ou ajudas a gerir uma página de fãs de Ne-Yo? Envia a tua comunidade para fazer parte do Ne-Yo World.",

    reviewText:
      "Todas as candidaturas são analisadas antes de serem adicionadas ao projeto. Um país pode ter mais do que uma página de fãs aprovada.",

    submit:
      "Enviar",

    review:
      "Análise",

    joinNeyoWorld:
      "Entrar no Ne-Yo World",

    fanPageInformation:
      "Informações da Página de Fãs",

    tellCommunity:
      "Fala-nos sobre a tua comunidade",

    fanPageName:
      "Nome da Página de Fãs *",

    fanPageNamePlaceholder:
      "Exemplo: Best of Ne-Yo",

    usernameLabel:
      "@Nome de Utilizador *",

    usernamePlaceholder:
      "@atuapaginadefas",

    countryLabel:
      "País *",

    selectCountry:
      "Seleciona o país",

    platform:
      "Plataforma *",

    selectPlatform:
      "Seleciona a plataforma",

    fanPageLink:
      "Link da Página de Fãs *",

    pageCreated:
      "Página Criada em",

    optional:
      "Opcional",

    yearPlaceholder:
      "Exemplo: 2020",

    tellFanPage:
      "Fala-nos sobre a tua página de fãs",

    descriptionPlaceholder:
      "Fala-nos sobre a página, a comunidade e o conteúdo que partilhas...",

    aboutYou:
      "Sobre Ti",

    whoSubmitting:
      "Quem está a enviar esta página?",

    contactPrivate:
      "Os teus dados de contacto não serão apresentados publicamente.",

    yourName:
      "O Teu Nome *",

    yourNamePlaceholder:
      "O teu nome",

    email:
      "Email *",

    yourRole:
      "A Tua Função *",

    selectRole:
      "Seleciona a tua função",

    whyJoin:
      "Porque gostarias de participar?",

    whyFanPage:
      "Porque gostarias que a tua página de fãs fizesse parte do Ne-Yo World? *",

    reasonPlaceholder:
      "Conta-nos porque gostarias que a tua página de fãs fizesse parte do projeto...",

    authorization:
      "Confirmo que estou autorizado a representar esta página de fãs e a submetê-la para consideração como parte do Ne-Yo World.",

    requiredError:
      "Preenche todos os campos obrigatórios.",

    authorizationError:
      "Confirma que estás autorizado a representar esta página de fãs.",

    submitApplication:
      "Enviar candidatura",

    databaseError:
      "Não foi possível enviar a candidatura. Tenta novamente.",

    submitting:
      "A enviar...",

    footer:
      "Juntar-se ao Projeto",

    profileSection: "Perfil da Página de Fãs",
    profileSectionTitle: "Conta a tua história",
    profileSectionText:
      "Se a tua página for aprovada, estas respostas poderão ser usadas para criar o seu perfil público no Ne-Yo World. O conteúdo é revisto antes de qualquer publicação.",
    publicCreatorName: "Nome Público do Criador / Fundador *",
    publicCreatorNamePlaceholder: "Nome que queres mostrar publicamente no perfil",
    fanSince: "Fã de Ne-Yo Desde *",
    fanSincePlaceholder: "Exemplo: 2006",
    profileIntro: "Introdução do Perfil",
    profileIntroPlaceholder:
      "Uma breve apresentação da tua página de fãs e da pessoa ou equipa por detrás dela...",
    ourStory: "A Nossa História *",
    ourStoryPlaceholder:
      "Como começou a tua ligação a Ne-Yo? Como nasceu a página de fãs? Conta-nos a história que gostarias que outros fãs lessem...",
    whyNeyoProfile: "Porquê Ne-Yo? *",
    whyNeyoProfilePlaceholder:
      "O que significam Ne-Yo, a sua música ou a sua carreira para ti e para a tua comunidade?",
    messageToNeyo: "Mensagem para Ne-Yo *",
    messageToNeyoPlaceholder:
      "Escreve a mensagem pessoal que gostarias que Ne-Yo lesse...",
    favoriteSong: "Música Favorita de Ne-Yo",
    favoriteSongPlaceholder: "Opcional",
    journeyTitle: "A Tua Jornada",
    journeyText:
      "Adiciona os momentos principais que gostarias de ver na jornada da tua página de fãs. Podes adicionar mais do que um.",
    journeyYear: "Ano",
    journeyYearPlaceholder: "Exemplo: 2024",
    journeyMomentTitle: "Título do Momento",
    journeyMomentTitlePlaceholder: "Exemplo: Primeiro concerto de Ne-Yo",
    journeyDescription: "O que aconteceu?",
    journeyDescriptionPlaceholder:
      "Conta-nos porque este momento foi importante...",
    addJourneyMoment: "Adicionar Outro Momento",
    removeJourneyMoment: "Remover",
    profileRequiredError:
      "Preenche os campos obrigatórios do perfil da página de fãs.",
    journeyIncompleteError:
      "Preenche o ano, o título e a descrição de cada momento que adicionares à jornada.",


    other:
      "Outro",
  },

  ES: {
    backToWorld: "Volver al Mundo",
    applicationReceived: "Solicitud Recibida",
    thankYou: "Gracias",
    successText:
      "La solicitud de tu página de fans ha sido recibida y está pendiente de revisión. Todas las solicitudes se revisan antes de que una página pase a formar parte de Ne-Yo World.",
    fanPage: "Página de Fans",
    username: "Nombre de Usuario",
    country: "País",
    status: "Estado",
    pendingReview: "Pendiente de Revisión",
    backHome: "Volver al Inicio",
    submitAnother: "Enviar Otra",
    becomePart: "Forma Parte de Ne-Yo World",
    joinThe: "Únete al",
    project: "Proyecto",
    heroText:
      "¿Tienes o ayudas a gestionar una página de fans de Ne-Yo? Envía tu comunidad para formar parte de Ne-Yo World.",
    reviewText:
      "Cada solicitud se revisa antes de añadirse al proyecto. Un país puede tener más de una página de fans aprobada.",
    submit: "Enviar",
    review: "Revisión",
    joinNeyoWorld: "Únete a Ne-Yo World",
    fanPageInformation: "Información de la Página de Fans",
    tellCommunity: "Cuéntanos sobre tu comunidad",
    fanPageName: "Nombre de la Página de Fans *",
    fanPageNamePlaceholder: "Ejemplo: Best of Ne-Yo",
    usernameLabel: "@Nombre de Usuario *",
    usernamePlaceholder: "@tupaginadefans",
    countryLabel: "País *",
    selectCountry: "Selecciona el país",
    platform: "Plataforma *",
    selectPlatform: "Selecciona la plataforma",
    fanPageLink: "Enlace de la Página de Fans *",
    pageCreated: "Página Creada",
    optional: "Opcional",
    yearPlaceholder: "Ejemplo: 2020",
    tellFanPage: "Cuéntanos sobre tu página de fans",
    descriptionPlaceholder:
      "Cuéntanos sobre la página, la comunidad y lo que compartes...",
    aboutYou: "Sobre Ti",
    whoSubmitting: "¿Quién está enviando esta página?",
    contactPrivate:
      "Tu información de contacto no se mostrará públicamente.",
    yourName: "Tu Nombre *",
    yourNamePlaceholder: "Tu nombre",
    email: "Email *",
    yourRole: "Tu Función *",
    selectRole: "Selecciona tu función",
    whyJoin: "¿Por qué te gustaría participar?",
    whyFanPage:
      "¿Por qué te gustaría que tu página de fans formara parte de Ne-Yo World? *",
    reasonPlaceholder:
      "Cuéntanos por qué te gustaría que tu página de fans formara parte del proyecto...",
    authorization:
      "Confirmo que estoy autorizado para representar esta página de fans y enviarla para su consideración como parte de Ne-Yo World.",
    requiredError: "Completa todos los campos obligatorios.",
    authorizationError:
      "Confirma que estás autorizado para representar esta página de fans.",
    submitApplication: "Enviar solicitud",
    databaseError: "No fue posible enviar la solicitud. Inténtalo de nuevo.",
    submitting: "Enviando...",
    footer: "Únete al Proyecto",

    profileSection: "Perfil de la Página de Fans",
    profileSectionTitle: "Cuenta tu historia",
    profileSectionText:
      "Si tu página es aprobada, estas respuestas podrán utilizarse para crear su perfil público en Ne-Yo World. El contenido se revisa antes de publicarse.",
    publicCreatorName: "Nombre Público del Creador / Fundador *",
    publicCreatorNamePlaceholder: "Nombre que quieres mostrar públicamente en el perfil",
    fanSince: "Fan de Ne-Yo Desde *",
    fanSincePlaceholder: "Ejemplo: 2006",
    profileIntro: "Introducción del Perfil",
    profileIntroPlaceholder:
      "Una breve presentación de tu página de fans y de la persona o equipo que hay detrás...",
    ourStory: "Nuestra Historia *",
    ourStoryPlaceholder:
      "¿Cómo comenzó tu conexión con Ne-Yo? ¿Cómo nació la página de fans? Cuéntanos la historia que te gustaría que leyeran otros fans...",
    whyNeyoProfile: "¿Por Qué Ne-Yo? *",
    whyNeyoProfilePlaceholder:
      "¿Qué significan Ne-Yo, su música o su carrera para ti y tu comunidad?",
    messageToNeyo: "Mensaje para Ne-Yo *",
    messageToNeyoPlaceholder:
      "Escribe el mensaje personal que te gustaría que Ne-Yo leyera...",
    favoriteSong: "Canción Favorita de Ne-Yo",
    favoriteSongPlaceholder: "Opcional",
    journeyTitle: "Tu Trayectoria",
    journeyText:
      "Añade los momentos principales que te gustaría que aparecieran en la trayectoria de tu página de fans. Puedes añadir más de uno.",
    journeyYear: "Año",
    journeyYearPlaceholder: "Ejemplo: 2024",
    journeyMomentTitle: "Título del Momento",
    journeyMomentTitlePlaceholder: "Ejemplo: Primer concierto de Ne-Yo",
    journeyDescription: "¿Qué ocurrió?",
    journeyDescriptionPlaceholder:
      "Cuéntanos por qué este momento fue importante...",
    addJourneyMoment: "Añadir Otro Momento",
    removeJourneyMoment: "Eliminar",
    profileRequiredError:
      "Completa los campos obligatorios del perfil de la página de fans.",
    journeyIncompleteError:
      "Completa el año, el título y la descripción de cada momento que añadas a la trayectoria.",

    other: "Otro",
  },

  FR: {
    backToWorld: "Retour au Monde",
    applicationReceived: "Candidature Reçue",
    thankYou: "Merci",
    successText:
      "La candidature de votre page de fans a bien été reçue et est maintenant en attente d’examen. Chaque candidature est examinée avant qu’une page ne rejoigne Ne-Yo World.",
    fanPage: "Page de Fans",
    username: "Nom d’Utilisateur",
    country: "Pays",
    status: "Statut",
    pendingReview: "En Attente d’Examen",
    backHome: "Retour à l’Accueil",
    submitAnother: "Envoyer une Autre",
    becomePart: "Faites Partie de Ne-Yo World",
    joinThe: "Rejoignez le",
    project: "Projet",
    heroText:
      "Vous gérez ou aidez à gérer une page de fans de Ne-Yo ? Soumettez votre communauté pour rejoindre Ne-Yo World.",
    reviewText:
      "Chaque candidature est examinée avant d’être ajoutée au projet. Un pays peut avoir plusieurs pages de fans approuvées.",
    submit: "Envoyer",
    review: "Examen",
    joinNeyoWorld: "Rejoindre Ne-Yo World",
    fanPageInformation: "Informations sur la Page de Fans",
    tellCommunity: "Parlez-nous de votre communauté",
    fanPageName: "Nom de la Page de Fans *",
    fanPageNamePlaceholder: "Exemple : Best of Ne-Yo",
    usernameLabel: "@Nom d’Utilisateur *",
    usernamePlaceholder: "@votrepagefans",
    countryLabel: "Pays *",
    selectCountry: "Sélectionnez le pays",
    platform: "Plateforme *",
    selectPlatform: "Sélectionnez la plateforme",
    fanPageLink: "Lien de la Page de Fans *",
    pageCreated: "Page Créée",
    optional: "Facultatif",
    yearPlaceholder: "Exemple : 2020",
    tellFanPage: "Parlez-nous de votre page de fans",
    descriptionPlaceholder:
      "Parlez-nous de la page, de la communauté et de ce que vous partagez...",
    aboutYou: "À Propos de Vous",
    whoSubmitting: "Qui soumet cette page ?",
    contactPrivate:
      "Vos coordonnées ne seront pas affichées publiquement.",
    yourName: "Votre Nom *",
    yourNamePlaceholder: "Votre nom",
    email: "Email *",
    yourRole: "Votre Rôle *",
    selectRole: "Sélectionnez votre rôle",
    whyJoin: "Pourquoi souhaitez-vous participer ?",
    whyFanPage:
      "Pourquoi souhaitez-vous que votre page de fans fasse partie de Ne-Yo World ? *",
    reasonPlaceholder:
      "Expliquez-nous pourquoi vous souhaitez que votre page de fans rejoigne le projet...",
    authorization:
      "Je confirme être autorisé à représenter cette page de fans et à la soumettre pour examen afin qu’elle puisse rejoindre Ne-Yo World.",
    requiredError: "Veuillez remplir tous les champs obligatoires.",
    authorizationError:
      "Veuillez confirmer que vous êtes autorisé à représenter cette page de fans.",
    submitApplication: "Envoyer la candidature",
    databaseError: "Impossible d’envoyer la candidature. Veuillez réessayer.",
    submitting: "Envoi...",
    footer: "Rejoindre le Projet",

    profileSection: "Profil de la Page de Fans",
    profileSectionTitle: "Racontez votre histoire",
    profileSectionText:
      "Si votre page est approuvée, ces réponses pourront servir à créer son profil public sur Ne-Yo World. Le contenu est examiné avant toute publication.",
    publicCreatorName: "Nom Public du Créateur / Fondateur *",
    publicCreatorNamePlaceholder: "Nom à afficher publiquement sur le profil",
    fanSince: "Fan de Ne-Yo Depuis *",
    fanSincePlaceholder: "Exemple : 2006",
    profileIntro: "Introduction du Profil",
    profileIntroPlaceholder:
      "Une courte présentation de votre page de fans et de la personne ou de l’équipe qui l’anime...",
    ourStory: "Notre Histoire *",
    ourStoryPlaceholder:
      "Comment votre lien avec Ne-Yo a-t-il commencé ? Comment la page de fans est-elle née ? Racontez l’histoire que vous aimeriez partager avec les autres fans...",
    whyNeyoProfile: "Pourquoi Ne-Yo ? *",
    whyNeyoProfilePlaceholder:
      "Que représentent Ne-Yo, sa musique ou sa carrière pour vous et votre communauté ?",
    messageToNeyo: "Message à Ne-Yo *",
    messageToNeyoPlaceholder:
      "Écrivez le message personnel que vous aimeriez que Ne-Yo lise...",
    favoriteSong: "Chanson Préférée de Ne-Yo",
    favoriteSongPlaceholder: "Facultatif",
    journeyTitle: "Votre Parcours",
    journeyText:
      "Ajoutez les moments importants que vous aimeriez voir apparaître dans le parcours de votre page de fans. Vous pouvez en ajouter plusieurs.",
    journeyYear: "Année",
    journeyYearPlaceholder: "Exemple : 2024",
    journeyMomentTitle: "Titre du Moment",
    journeyMomentTitlePlaceholder: "Exemple : Premier concert de Ne-Yo",
    journeyDescription: "Que s’est-il passé ?",
    journeyDescriptionPlaceholder:
      "Expliquez-nous pourquoi ce moment a été important...",
    addJourneyMoment: "Ajouter un Autre Moment",
    removeJourneyMoment: "Supprimer",
    profileRequiredError:
      "Veuillez remplir les champs obligatoires du profil de la page de fans.",
    journeyIncompleteError:
      "Renseignez l’année, le titre et la description de chaque moment ajouté au parcours.",

    other: "Autre",
  },

  DE: {
    backToWorld: "Zurück zur Welt",
    applicationReceived: "Bewerbung Eingegangen",
    thankYou: "Vielen Dank",
    successText:
      "Die Bewerbung deiner Fanseite wurde empfangen und wartet nun auf Prüfung. Jede Bewerbung wird geprüft, bevor eine Fanseite Teil von Ne-Yo World wird.",
    fanPage: "Fanseite",
    username: "Benutzername",
    country: "Land",
    status: "Status",
    pendingReview: "Prüfung Ausstehend",
    backHome: "Zurück zur Startseite",
    submitAnother: "Weitere Einreichen",
    becomePart: "Werde Teil von Ne-Yo World",
    joinThe: "Werde Teil des",
    project: "Projekts",
    heroText:
      "Betreibst du eine Ne-Yo-Fanseite oder hilfst bei ihrer Verwaltung? Reiche deine Gemeinschaft ein, um Teil von Ne-Yo World zu werden.",
    reviewText:
      "Jede Bewerbung wird geprüft, bevor sie dem Projekt hinzugefügt wird. Ein Land kann mehr als eine genehmigte Fanseite haben.",
    submit: "Einreichen",
    review: "Prüfung",
    joinNeyoWorld: "Ne-Yo World beitreten",
    fanPageInformation: "Informationen zur Fanseite",
    tellCommunity: "Erzähl uns von deiner Gemeinschaft",
    fanPageName: "Name der Fanseite *",
    fanPageNamePlaceholder: "Beispiel: Best of Ne-Yo",
    usernameLabel: "@Benutzername *",
    usernamePlaceholder: "@deinefanseite",
    countryLabel: "Land *",
    selectCountry: "Land auswählen",
    platform: "Plattform *",
    selectPlatform: "Plattform auswählen",
    fanPageLink: "Link zur Fanseite *",
    pageCreated: "Seite Erstellt",
    optional: "Optional",
    yearPlaceholder: "Beispiel: 2020",
    tellFanPage: "Erzähl uns von deiner Fanseite",
    descriptionPlaceholder:
      "Erzähl uns von der Seite, der Gemeinschaft und den Inhalten, die du teilst...",
    aboutYou: "Über Dich",
    whoSubmitting: "Wer reicht diese Seite ein?",
    contactPrivate:
      "Deine Kontaktdaten werden nicht öffentlich angezeigt.",
    yourName: "Dein Name *",
    yourNamePlaceholder: "Dein Name",
    email: "E-Mail *",
    yourRole: "Deine Rolle *",
    selectRole: "Rolle auswählen",
    whyJoin: "Warum möchtest du teilnehmen?",
    whyFanPage:
      "Warum möchtest du, dass deine Fanseite Teil von Ne-Yo World wird? *",
    reasonPlaceholder:
      "Erzähl uns, warum deine Fanseite Teil des Projekts werden soll...",
    authorization:
      "Ich bestätige, dass ich berechtigt bin, diese Fanseite zu vertreten und sie zur Aufnahme in Ne-Yo World einzureichen.",
    requiredError: "Bitte fülle alle Pflichtfelder aus.",
    authorizationError:
      "Bitte bestätige, dass du berechtigt bist, diese Fanseite zu vertreten.",
    submitApplication: "Bewerbung Einreichen",
    databaseError: "Die Bewerbung konnte nicht gesendet werden. Bitte versuche es erneut.",
    submitting: "Wird gesendet...",
    footer: "Dem Projekt Beitreten",

    profileSection: "Profil der Fanseite",
    profileSectionTitle: "Erzähl deine Geschichte",
    profileSectionText:
      "Wenn deine Seite genehmigt wird, können diese Antworten für ihr öffentliches Profil auf Ne-Yo World verwendet werden. Die Inhalte werden vor der Veröffentlichung geprüft.",
    publicCreatorName: "Öffentlicher Name des Gründers / Erstellers *",
    publicCreatorNamePlaceholder: "Name, der öffentlich im Profil erscheinen soll",
    fanSince: "Ne-Yo-Fan Seit *",
    fanSincePlaceholder: "Beispiel: 2006",
    profileIntro: "Profil-Einleitung",
    profileIntroPlaceholder:
      "Eine kurze Vorstellung deiner Fanseite und der Person oder des Teams dahinter...",
    ourStory: "Unsere Geschichte *",
    ourStoryPlaceholder:
      "Wie begann deine Verbindung zu Ne-Yo? Wie entstand die Fanseite? Erzähl uns die Geschichte, die andere Fans lesen sollen...",
    whyNeyoProfile: "Warum Ne-Yo? *",
    whyNeyoProfilePlaceholder:
      "Was bedeuten Ne-Yo, seine Musik oder seine Karriere für dich und deine Community?",
    messageToNeyo: "Nachricht an Ne-Yo *",
    messageToNeyoPlaceholder:
      "Schreib die persönliche Nachricht, die Ne-Yo lesen soll...",
    favoriteSong: "Lieblingssong von Ne-Yo",
    favoriteSongPlaceholder: "Optional",
    journeyTitle: "Dein Weg",
    journeyText:
      "Füge die wichtigsten Momente hinzu, die im Verlauf deiner Fanseite erscheinen sollen. Du kannst mehrere hinzufügen.",
    journeyYear: "Jahr",
    journeyYearPlaceholder: "Beispiel: 2024",
    journeyMomentTitle: "Titel des Moments",
    journeyMomentTitlePlaceholder: "Beispiel: Erstes Ne-Yo-Konzert",
    journeyDescription: "Was ist passiert?",
    journeyDescriptionPlaceholder:
      "Erzähl uns, warum dieser Moment wichtig war...",
    addJourneyMoment: "Weiteren Moment Hinzufügen",
    removeJourneyMoment: "Entfernen",
    profileRequiredError:
      "Bitte fülle die Pflichtfelder für das Fanseitenprofil aus.",
    journeyIncompleteError:
      "Fülle für jeden hinzugefügten Moment Jahr, Titel und Beschreibung vollständig aus.",

    other: "Andere",
  },

  IT: {
    backToWorld: "Torna al Mondo",
    applicationReceived: "Candidatura Ricevuta",
    thankYou: "Grazie",
    successText:
      "La candidatura della tua pagina fan è stata ricevuta ed è ora in attesa di revisione. Ogni candidatura viene esaminata prima che una pagina entri a far parte di Ne-Yo World.",
    fanPage: "Pagina Fan",
    username: "Nome Utente",
    country: "Paese",
    status: "Stato",
    pendingReview: "In Attesa di Revisione",
    backHome: "Torna alla Home",
    submitAnother: "Invia un’Altra",
    becomePart: "Entra a Far Parte di Ne-Yo World",
    joinThe: "Unisciti al",
    project: "Progetto",
    heroText:
      "Gestisci o aiuti a gestire una pagina fan di Ne-Yo? Invia la tua comunità per entrare a far parte di Ne-Yo World.",
    reviewText:
      "Ogni candidatura viene esaminata prima di essere aggiunta al progetto. Un paese può avere più di una pagina fan approvata.",
    submit: "Invia",
    review: "Revisione",
    joinNeyoWorld: "Unisciti a Ne-Yo World",
    fanPageInformation: "Informazioni sulla Pagina Fan",
    tellCommunity: "Parlaci della tua comunità",
    fanPageName: "Nome della Pagina Fan *",
    fanPageNamePlaceholder: "Esempio: Best of Ne-Yo",
    usernameLabel: "@Nome Utente *",
    usernamePlaceholder: "@latuapaginafan",
    countryLabel: "Paese *",
    selectCountry: "Seleziona il paese",
    platform: "Piattaforma *",
    selectPlatform: "Seleziona la piattaforma",
    fanPageLink: "Link della Pagina Fan *",
    pageCreated: "Pagina Creata",
    optional: "Facoltativo",
    yearPlaceholder: "Esempio: 2020",
    tellFanPage: "Parlaci della tua pagina fan",
    descriptionPlaceholder:
      "Parlaci della pagina, della comunità e di ciò che condividi...",
    aboutYou: "Su di Te",
    whoSubmitting: "Chi sta inviando questa pagina?",
    contactPrivate:
      "I tuoi dati di contatto non saranno mostrati pubblicamente.",
    yourName: "Il Tuo Nome *",
    yourNamePlaceholder: "Il tuo nome",
    email: "Email *",
    yourRole: "Il Tuo Ruolo *",
    selectRole: "Seleziona il tuo ruolo",
    whyJoin: "Perché vorresti partecipare?",
    whyFanPage:
      "Perché vorresti che la tua pagina fan facesse parte di Ne-Yo World? *",
    reasonPlaceholder:
      "Raccontaci perché vorresti che la tua pagina fan entrasse a far parte del progetto...",
    authorization:
      "Confermo di essere autorizzato a rappresentare questa pagina fan e a sottoporla alla valutazione per entrare a far parte di Ne-Yo World.",
    requiredError: "Compila tutti i campi obbligatori.",
    authorizationError:
      "Conferma di essere autorizzato a rappresentare questa pagina fan.",
    submitApplication: "Invia Candidatura",
    databaseError: "Non è stato possibile inviare la candidatura. Riprova.",
    submitting: "Invio...",
    footer: "Unisciti al Progetto",

    profileSection: "Profilo della Pagina Fan",
    profileSectionTitle: "Racconta la tua storia",
    profileSectionText:
      "Se la tua pagina viene approvata, queste risposte potranno essere utilizzate per creare il suo profilo pubblico su Ne-Yo World. Il contenuto viene revisionato prima della pubblicazione.",
    publicCreatorName: "Nome Pubblico del Creatore / Fondatore *",
    publicCreatorNamePlaceholder: "Nome da mostrare pubblicamente nel profilo",
    fanSince: "Fan di Ne-Yo Dal *",
    fanSincePlaceholder: "Esempio: 2006",
    profileIntro: "Introduzione del Profilo",
    profileIntroPlaceholder:
      "Una breve presentazione della tua pagina fan e della persona o del team che c’è dietro...",
    ourStory: "La Nostra Storia *",
    ourStoryPlaceholder:
      "Come è iniziato il tuo legame con Ne-Yo? Come è nata la pagina fan? Raccontaci la storia che vorresti far leggere agli altri fan...",
    whyNeyoProfile: "Perché Ne-Yo? *",
    whyNeyoProfilePlaceholder:
      "Cosa significano Ne-Yo, la sua musica o la sua carriera per te e per la tua comunità?",
    messageToNeyo: "Messaggio per Ne-Yo *",
    messageToNeyoPlaceholder:
      "Scrivi il messaggio personale che vorresti far leggere a Ne-Yo...",
    favoriteSong: "Canzone Preferita di Ne-Yo",
    favoriteSongPlaceholder: "Facoltativo",
    journeyTitle: "Il Tuo Percorso",
    journeyText:
      "Aggiungi i momenti principali che vorresti vedere nel percorso della tua pagina fan. Puoi aggiungerne più di uno.",
    journeyYear: "Anno",
    journeyYearPlaceholder: "Esempio: 2024",
    journeyMomentTitle: "Titolo del Momento",
    journeyMomentTitlePlaceholder: "Esempio: Primo concerto di Ne-Yo",
    journeyDescription: "Cosa è successo?",
    journeyDescriptionPlaceholder:
      "Raccontaci perché questo momento è stato importante...",
    addJourneyMoment: "Aggiungi un Altro Momento",
    removeJourneyMoment: "Rimuovi",
    profileRequiredError:
      "Compila i campi obbligatori del profilo della pagina fan.",
    journeyIncompleteError:
      "Completa anno, titolo e descrizione per ogni momento che aggiungi al percorso.",

    other: "Altro",
  },

  JA: {
    backToWorld: "ワールドに戻る",
    applicationReceived: "申請を受け付けました",
    thankYou: "ありがとうございます",
    successText:
      "ファンページの申請を受け付けました。現在、審査待ちです。すべての申請は、ファンページがNe-Yo Worldに加わる前に確認されます。",
    fanPage: "ファンページ",
    username: "ユーザー名",
    country: "国",
    status: "ステータス",
    pendingReview: "審査待ち",
    backHome: "ホームに戻る",
    submitAnother: "別のページを申請",
    becomePart: "Ne-Yo Worldの一員になる",
    joinThe: "プロジェクトに",
    project: "参加する",
    heroText:
      "Ne-Yoのファンページを運営、または運営を手伝っていますか？あなたのコミュニティを申請してNe-Yo Worldに参加しましょう。",
    reviewText:
      "すべての申請はプロジェクトに追加される前に確認されます。ひとつの国から複数のファンページが承認されることもあります。",
    submit: "申請",
    review: "審査",
    joinNeyoWorld: "Ne-Yo Worldに参加",
    fanPageInformation: "ファンページ情報",
    tellCommunity: "あなたのコミュニティについて教えてください",
    fanPageName: "ファンページ名 *",
    fanPageNamePlaceholder: "例：Best of Ne-Yo",
    usernameLabel: "@ユーザー名 *",
    usernamePlaceholder: "@yourfanpage",
    countryLabel: "国 *",
    selectCountry: "国を選択",
    platform: "プラットフォーム *",
    selectPlatform: "プラットフォームを選択",
    fanPageLink: "ファンページのリンク *",
    pageCreated: "ページ開設年",
    optional: "任意",
    yearPlaceholder: "例：2020",
    tellFanPage: "ファンページについて教えてください",
    descriptionPlaceholder:
      "ページ、コミュニティ、投稿している内容について教えてください...",
    aboutYou: "あなたについて",
    whoSubmitting: "このページを申請する方について",
    contactPrivate: "連絡先情報が公開されることはありません。",
    yourName: "お名前 *",
    yourNamePlaceholder: "お名前",
    email: "メールアドレス *",
    yourRole: "あなたの役割 *",
    selectRole: "役割を選択",
    whyJoin: "参加したい理由",
    whyFanPage:
      "あなたのファンページをNe-Yo Worldに参加させたい理由を教えてください。*",
    reasonPlaceholder:
      "あなたのファンページをこのプロジェクトに参加させたい理由を教えてください...",
    authorization:
      "私はこのファンページを代表し、Ne-Yo Worldへの参加申請を行う権限があることを確認します。",
    requiredError: "必須項目をすべて入力してください。",
    authorizationError:
      "このファンページを代表する権限があることを確認してください。",
    submitApplication: "申請を送信",
    databaseError: "申請を送信できませんでした。もう一度お試しください。",
    submitting: "送信中...",
    footer: "プロジェクトに参加",

    profileSection: "ファンページプロフィール",
    profileSectionTitle: "あなたのストーリーを教えてください",
    profileSectionText:
      "ページが承認された場合、これらの回答はNe-Yo Worldの公開プロフィール作成に使用されることがあります。公開前に内容を確認します。",
    publicCreatorName: "公開する作成者 / 創設者名 *",
    publicCreatorNamePlaceholder: "プロフィールに公開する名前",
    fanSince: "Ne-Yoのファンになった年 *",
    fanSincePlaceholder: "例：2006",
    profileIntro: "プロフィール紹介",
    profileIntroPlaceholder:
      "ファンページと、その運営者またはチームについて短く紹介してください...",
    ourStory: "私たちのストーリー *",
    ourStoryPlaceholder:
      "Ne-Yoとのつながりはどのように始まりましたか？ファンページはどのように生まれましたか？ほかのファンに読んでほしい物語を教えてください...",
    whyNeyoProfile: "なぜNe-Yo？ *",
    whyNeyoProfilePlaceholder:
      "Ne-Yoや彼の音楽、キャリアは、あなたやコミュニティにとってどのような存在ですか？",
    messageToNeyo: "Ne-Yoへのメッセージ *",
    messageToNeyoPlaceholder:
      "Ne-Yoに読んでほしい個人的なメッセージを書いてください...",
    favoriteSong: "好きなNe-Yoの曲",
    favoriteSongPlaceholder: "任意",
    journeyTitle: "あなたの歩み",
    journeyText:
      "ファンページの歩みに載せたい大切な出来事を追加してください。複数追加できます。",
    journeyYear: "年",
    journeyYearPlaceholder: "例：2024",
    journeyMomentTitle: "出来事のタイトル",
    journeyMomentTitlePlaceholder: "例：初めてのNe-Yoコンサート",
    journeyDescription: "何がありましたか？",
    journeyDescriptionPlaceholder:
      "なぜこの出来事が大切だったのか教えてください...",
    addJourneyMoment: "別の出来事を追加",
    removeJourneyMoment: "削除",
    profileRequiredError:
      "ファンページプロフィールの必須項目をすべて入力してください。",
    journeyIncompleteError:
      "追加する各出来事について、年、タイトル、説明をすべて入力してください。",

    other: "その他",
  }
};


export default function JoinProjectPage() {
  const { language } = useLanguage();


  const [fanPageName, setFanPageName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [platform, setPlatform] =
    useState("");

  const [fanPageLink, setFanPageLink] =
    useState("");

  const [createdYear, setCreatedYear] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [publicCreatorName, setPublicCreatorName] =
    useState("");

  const [fanSince, setFanSince] =
    useState("");

  const [profileIntro, setProfileIntro] =
    useState("");

  const [story, setStory] =
    useState("");

  const [whyNeyo, setWhyNeyo] =
    useState("");

  const [messageToNeyo, setMessageToNeyo] =
    useState("");

  const [favoriteSong, setFavoriteSong] =
    useState("");

  const [journey, setJourney] =
    useState([
      { year: "", title: "", description: "" },
    ]);

  const [yourName, setYourName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [authorized, setAuthorized] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");


  const t =
    translations[language];


  async function submitApplication(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");

    if (
      !fanPageName.trim() ||
      !username.trim() ||
      !country ||
      !platform ||
      !fanPageLink.trim() ||
      !yourName.trim() ||
      !email.trim() ||
      !role ||
      !reason.trim()
    ) {
      setError(t.requiredError);
      return;
    }

    if (
      !publicCreatorName.trim() ||
      !fanSince.trim() ||
      !story.trim() ||
      !whyNeyo.trim() ||
      !messageToNeyo.trim()
    ) {
      setError(t.profileRequiredError);
      return;
    }

    const fanSinceNumber = Number(fanSince);
    if (
      !Number.isInteger(fanSinceNumber) ||
      fanSinceNumber < 1900 ||
      fanSinceNumber > new Date().getFullYear()
    ) {
      setError(t.profileRequiredError);
      return;
    }

    const hasIncompleteJourneyMoment = journey.some((moment) => {
      const year = moment.year.trim();
      const title = moment.title.trim();
      const description = moment.description.trim();

      const hasAnyValue = Boolean(year || title || description);
      const isComplete = Boolean(year && title && description);

      return hasAnyValue && !isComplete;
    });

    if (hasIncompleteJourneyMoment) {
      setError(t.journeyIncompleteError);
      return;
    }

    if (!authorized) {
      setError(
        t.authorizationError
      );
      return;
    }

    setSubmitting(true);

    const {
      error: submitError,
    } = await supabase
      .from(
        "fan_page_applications"
      )
      .insert({
        fan_page_name:
          fanPageName.trim(),
        username:
          username.trim(),
        country,
        platform,
        fan_page_link:
          fanPageLink.trim(),
        created_year:
          createdYear.trim() ||
          null,
        description:
          description.trim() ||
          null,
        submission_language:
          language,
        public_creator_name:
          publicCreatorName.trim(),
        fan_since:
          fanSinceNumber,
        profile_intro:
          profileIntro.trim() ||
          null,
        story:
          story.trim(),
        why_neyo:
          whyNeyo.trim(),
        message_to_neyo:
          messageToNeyo.trim(),
        favorite_song:
          favoriteSong.trim() ||
          null,
        journey:
          journey
            .map((moment) => ({
              year: moment.year.trim(),
              title: moment.title.trim(),
              description:
                moment.description.trim(),
            }))
            .filter(
              (moment) =>
                moment.year ||
                moment.title ||
                moment.description
            ),
        applicant_name:
          yourName.trim(),
        applicant_email:
          email.trim(),
        applicant_role:
          role,
        reason:
          reason.trim(),
        authorized: true,
        status: "pending",
      });

    setSubmitting(false);

    if (submitError) {
      setError(t.databaseError);

      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  function resetForm() {
    setFanPageName("");
    setUsername("");
    setCountry("");
    setPlatform("");
    setFanPageLink("");
    setCreatedYear("");
    setDescription("");
    setPublicCreatorName("");
    setFanSince("");
    setProfileIntro("");
    setStory("");
    setWhyNeyo("");
    setMessageToNeyo("");
    setFavoriteSong("");
    setJourney([
      { year: "", title: "", description: "" },
    ]);

    setYourName("");
    setEmail("");
    setRole("");

    setReason("");
    setAuthorized(false);

    setError("");
    setSubmitting(false);
    setSubmitted(false);
  }


  function updateJourneyMoment(
    index: number,
    field: "year" | "title" | "description",
    value: string
  ) {
    setJourney((current) =>
      current.map((moment, momentIndex) =>
        momentIndex === index
          ? { ...moment, [field]: value }
          : moment
      )
    );
  }

  function addJourneyMoment() {
    setJourney((current) => [
      ...current,
      { year: "", title: "", description: "" },
    ]);
  }

  function removeJourneyMoment(index: number) {
    setJourney((current) =>
      current.length === 1
        ? [{ year: "", title: "", description: "" }]
        : current.filter(
            (_, momentIndex) => momentIndex !== index
          )
    );
  }


  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050607] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute left-[-12%] top-[10%] h-[600px] w-[600px] rounded-full bg-[#D51C24]/5 blur-[200px]" />

        <div className="absolute right-[-12%] top-[5%] h-[700px] w-[700px] rounded-full bg-[#D4AF37]/5 blur-[220px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.88)_100%)]" />

      </div>


      {/* =====================================================
          GLOBAL HEADER
      ====================================================== */}

      <SiteHeader />


      {/* =====================================================
          CONTENT
      ====================================================== */}

      {submitted ? (

        /* ===================================================
            SUCCESS
        ==================================================== */

        <section className="relative z-10 flex min-h-[700px] items-center px-6 py-20 lg:px-10">

          <div className="mx-auto w-full max-w-[850px]">

            <div className="relative overflow-hidden rounded-[30px] border border-[#D4AF37]/25 bg-[#090A0B]/95 p-8 text-center md:p-14">

              <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#D4AF37]/5 blur-[100px]" />


              <div className="relative z-10">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5">

                  <span className="text-2xl text-[#D4AF37]">
                    ✓
                  </span>

                </div>


                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D51C24]">
                  {t.applicationReceived}
                </p>


                <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] md:text-5xl">
                  {t.thankYou}
                </h1>


                <p className="mx-auto mt-6 max-w-[600px] text-sm leading-7 text-white/55 md:text-[15px]">
                  {t.successText}
                </p>


                <div className="mx-auto mt-8 max-w-[520px] rounded-2xl border border-[#D4AF37]/15 bg-black/30 p-6 text-left">

                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                    {t.fanPage}
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {fanPageName}
                  </p>


                  <div className="mt-5 grid gap-5 sm:grid-cols-2">

                    <div>

                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                        {t.username}
                      </p>

                      <p className="mt-2 text-sm text-[#D4AF37]">
                        {username}
                      </p>

                    </div>


                    <div>

                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                        {t.country}
                      </p>

                      <p className="mt-2 text-sm text-white/70">
                        {country}
                      </p>

                    </div>

                  </div>


                  <div className="mt-5">

                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                      {t.status}
                    </p>


                    <div className="mt-2 flex items-center gap-2">

                      <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.55)]" />

                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                        {t.pendingReview}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

                  <a
                    href="/"
                    className="inline-flex items-center gap-4 rounded-xl border border-[#D4AF37]/45 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:border-[#D51C24]"
                  >

                    {t.backHome}

                    <span className="text-[#D4AF37]">
                      →
                    </span>

                  </a>


                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-4 rounded-xl border border-white/10 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 transition hover:border-white/30 hover:text-white"
                  >
                    {t.submitAnother}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

      ) : (

        <>

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative z-10 px-6 pb-12 pt-16 text-center lg:px-10 lg:pt-20">

            <div className="mx-auto max-w-[900px]">

              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#D4AF37]">
                {t.becomePart}
              </p>


              <h1 className="mt-5 text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">

                {t.joinThe}{" "}

                <span className="text-[#D51C24]">
                  {t.project}
                </span>

              </h1>


              <p className="mx-auto mt-7 max-w-[680px] text-[15px] leading-7 text-white/55 md:text-[17px]">
                {t.heroText}
              </p>


              <p className="mx-auto mt-3 max-w-[650px] text-sm leading-7 text-white/35">
                {t.reviewText}
              </p>

            </div>

          </section>


          {/* =================================================
              PROCESS
          ================================================= */}

          <section className="relative z-10 px-6 pb-12 lg:px-10">

            <div className="mx-auto grid max-w-[1050px] gap-3 sm:grid-cols-3">

              <div className="rounded-xl border border-[#D4AF37]/10 bg-[#090A0B]/80 p-5 text-center">

                <span className="text-[10px] font-semibold text-[#D51C24]">
                  01
                </span>

                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/50">
                  {t.submit}
                </p>

              </div>


              <div className="rounded-xl border border-[#D4AF37]/10 bg-[#090A0B]/80 p-5 text-center">

                <span className="text-[10px] font-semibold text-[#D4AF37]">
                  02
                </span>

                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/50">
                  {t.review}
                </p>

              </div>


              <div className="rounded-xl border border-[#D4AF37]/10 bg-[#090A0B]/80 p-5 text-center">

                <span className="text-[10px] font-semibold text-[#D51C24]">
                  03
                </span>

                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/50">
                  {t.joinNeyoWorld}
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              FORM
          ================================================= */}

          <section className="relative z-10 px-6 pb-24 lg:px-10">

            <div className="mx-auto max-w-[1000px]">

              <form
                onSubmit={submitApplication}
                className="overflow-hidden rounded-[28px] border border-[#D4AF37]/20 bg-[#090A0B]/95"
              >

                {/* =============================================
                    FAN PAGE INFORMATION
                ============================================== */}

                <div className="border-b border-[#D4AF37]/10 p-7 md:p-10">

                  <div className="flex items-start gap-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D51C24]/30 text-[11px] font-semibold text-[#D51C24]">
                      01
                    </div>


                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                        {t.fanPageInformation}
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold">
                        {t.tellCommunity}
                      </h2>

                    </div>

                  </div>


                  <div className="mt-9 grid gap-6 md:grid-cols-2">

                    {/* FAN PAGE NAME */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.fanPageName}
                      </label>

                      <input
                        value={fanPageName}
                        onChange={(event) =>
                          setFanPageName(
                            event.target.value
                          )
                        }
                        placeholder={
                          t.fanPageNamePlaceholder
                        }
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>


                    {/* USERNAME */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.usernameLabel}
                      </label>

                      <input
                        value={username}
                        onChange={(event) =>
                          setUsername(
                            event.target.value
                          )
                        }
                        placeholder={
                          t.usernamePlaceholder
                        }
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>


                    {/* COUNTRY */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.countryLabel}
                      </label>

                      <select
                        value={country}
                        onChange={(event) =>
                          setCountry(
                            event.target.value
                          )
                        }
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-[#050607] px-4 py-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/55"
                      >

                        <option value="">
                          {t.selectCountry}
                        </option>

                        {countries.map(
                          (item) => (

                            <option
                              key={item}
                              value={item}
                            >
                              {item === "Other"
                                ? t.other
                                : item}
                            </option>

                          )
                        )}

                      </select>

                    </div>


                    {/* PLATFORM */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.platform}
                      </label>

                      <select
                        value={platform}
                        onChange={(event) =>
                          setPlatform(
                            event.target.value
                          )
                        }
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-[#050607] px-4 py-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/55"
                      >

                        <option value="">
                          {t.selectPlatform}
                        </option>

                        {platforms.map(
                          (item) => (

                            <option
                              key={item}
                              value={item}
                            >
                              {item === "Other"
                                ? t.other
                                : item}
                            </option>

                          )
                        )}

                      </select>

                    </div>


                    {/* LINK */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.fanPageLink}
                      </label>

                      <input
                        value={fanPageLink}
                        onChange={(event) =>
                          setFanPageLink(
                            event.target.value
                          )
                        }
                        type="url"
                        placeholder="https://..."
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>


                    {/* YEAR */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">

                        {t.pageCreated}

                        <span className="ml-2 text-white/20">
                          {t.optional}
                        </span>

                      </label>

                      <input
                        value={createdYear}
                        onChange={(event) =>
                          setCreatedYear(
                            event.target.value
                          )
                        }
                        placeholder={
                          t.yearPlaceholder
                        }
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>

                  </div>


                  {/* DESCRIPTION */}

                  <div className="mt-6">

                    <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">

                      {t.tellFanPage}

                      <span className="ml-2 text-white/20">
                        {t.optional}
                      </span>

                    </label>


                    <textarea
                      value={description}
                      onChange={(event) =>
                        setDescription(
                          event.target.value
                        )
                      }
                      rows={5}
                      maxLength={600}
                      placeholder={
                        t.descriptionPlaceholder
                      }
                      className="mt-3 w-full resize-none rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                    />


                    <p className="mt-2 text-right text-[9px] text-white/20">
                      {description.length}/600
                    </p>

                  </div>

                </div>


                {/* =============================================
                    ABOUT YOU
                ============================================== */}

                <div className="border-b border-[#D4AF37]/10 p-7 md:p-10">

                  <div className="flex items-start gap-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[11px] font-semibold text-[#D4AF37]">
                      02
                    </div>


                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                        {t.aboutYou}
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold">
                        {t.whoSubmitting}
                      </h2>

                      <p className="mt-3 text-xs leading-6 text-white/30">
                        {t.contactPrivate}
                      </p>

                    </div>

                  </div>


                  <div className="mt-9 grid gap-6 md:grid-cols-2">

                    {/* NAME */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.yourName}
                      </label>

                      <input
                        value={yourName}
                        onChange={(event) =>
                          setYourName(
                            event.target.value
                          )
                        }
                        placeholder={
                          t.yourNamePlaceholder
                        }
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>


                    {/* EMAIL */}

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.email}
                      </label>

                      <input
                        value={email}
                        onChange={(event) =>
                          setEmail(
                            event.target.value
                          )
                        }
                        type="email"
                        placeholder="you@email.com"
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>


                    {/* ROLE */}

                    <div className="md:col-span-2">

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.yourRole}
                      </label>

                      <select
                        value={role}
                        onChange={(event) =>
                          setRole(
                            event.target.value
                          )
                        }
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-[#050607] px-4 py-4 text-sm text-white outline-none transition focus:border-[#D4AF37]/55"
                      >

                        <option value="">
                          {t.selectRole}
                        </option>

                        {roles.map(
                          (item) => (

                            <option
                              key={item.value}
                              value={item.value}
                            >
                              {item[language]}
                            </option>

                          )
                        )}

                      </select>

                    </div>

                  </div>

                </div>


                {/* =============================================
                    FAN PAGE PROFILE
                ============================================== */}

                <div className="border-b border-[#D4AF37]/10 p-7 md:p-10">

                  <div className="flex items-start gap-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D51C24]/30 text-[11px] font-semibold text-[#D51C24]">
                      03
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                        {t.profileSection}
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold">
                        {t.profileSectionTitle}
                      </h2>

                      <p className="mt-3 max-w-[700px] text-xs leading-6 text-white/30">
                        {t.profileSectionText}
                      </p>

                    </div>

                  </div>


                  <div className="mt-9 grid gap-6 md:grid-cols-2">

                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.publicCreatorName}
                      </label>

                      <input
                        value={publicCreatorName}
                        onChange={(event) =>
                          setPublicCreatorName(event.target.value)
                        }
                        placeholder={t.publicCreatorNamePlaceholder}
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>


                    <div>

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.fanSince}
                      </label>

                      <input
                        value={fanSince}
                        onChange={(event) =>
                          setFanSince(event.target.value)
                        }
                        inputMode="numeric"
                        maxLength={4}
                        placeholder={t.fanSincePlaceholder}
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>


                    <div className="md:col-span-2">

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">

                        {t.profileIntro}

                        <span className="ml-2 text-white/20">
                          {t.optional}
                        </span>

                      </label>

                      <textarea
                        value={profileIntro}
                        onChange={(event) =>
                          setProfileIntro(event.target.value)
                        }
                        rows={3}
                        maxLength={500}
                        placeholder={t.profileIntroPlaceholder}
                        className="mt-3 w-full resize-none rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                      <p className="mt-2 text-right text-[9px] text-white/20">
                        {profileIntro.length}/500
                      </p>

                    </div>


                    <div className="md:col-span-2">

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.ourStory}
                      </label>

                      <textarea
                        value={story}
                        onChange={(event) =>
                          setStory(event.target.value)
                        }
                        rows={7}
                        maxLength={2500}
                        placeholder={t.ourStoryPlaceholder}
                        className="mt-3 w-full resize-y rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                      <p className="mt-2 text-right text-[9px] text-white/20">
                        {story.length}/2500
                      </p>

                    </div>


                    <div className="md:col-span-2">

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.whyNeyoProfile}
                      </label>

                      <textarea
                        value={whyNeyo}
                        onChange={(event) =>
                          setWhyNeyo(event.target.value)
                        }
                        rows={6}
                        maxLength={1800}
                        placeholder={t.whyNeyoProfilePlaceholder}
                        className="mt-3 w-full resize-y rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                      <p className="mt-2 text-right text-[9px] text-white/20">
                        {whyNeyo.length}/1800
                      </p>

                    </div>


                    <div className="md:col-span-2">

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {t.messageToNeyo}
                      </label>

                      <textarea
                        value={messageToNeyo}
                        onChange={(event) =>
                          setMessageToNeyo(event.target.value)
                        }
                        rows={5}
                        maxLength={1200}
                        placeholder={t.messageToNeyoPlaceholder}
                        className="mt-3 w-full resize-y rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                      <p className="mt-2 text-right text-[9px] text-white/20">
                        {messageToNeyo.length}/1200
                      </p>

                    </div>


                    <div className="md:col-span-2">

                      <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">

                        {t.favoriteSong}

                        <span className="ml-2 text-white/20">
                          {t.optional}
                        </span>

                      </label>

                      <input
                        value={favoriteSong}
                        onChange={(event) =>
                          setFavoriteSong(event.target.value)
                        }
                        maxLength={150}
                        placeholder={t.favoriteSongPlaceholder}
                        className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                      />

                    </div>

                  </div>


                  <div className="mt-10 border-t border-[#D4AF37]/10 pt-8">

                    <h3 className="text-lg font-semibold">
                      {t.journeyTitle}
                    </h3>

                    <p className="mt-2 max-w-[700px] text-xs leading-6 text-white/30">
                      {t.journeyText}
                    </p>


                    <div className="mt-6 space-y-4">

                      {journey.map((moment, index) => (

                        <div
                          key={index}
                          className="rounded-2xl border border-[#D4AF37]/12 bg-black/20 p-5"
                        >

                          <div className="grid gap-5 md:grid-cols-[140px_1fr]">

                            <div>

                              <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                                {t.journeyYear}
                              </label>

                              <input
                                value={moment.year}
                                onChange={(event) =>
                                  updateJourneyMoment(
                                    index,
                                    "year",
                                    event.target.value
                                  )
                                }
                                inputMode="numeric"
                                maxLength={4}
                                placeholder={t.journeyYearPlaceholder}
                                className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                              />

                            </div>


                            <div>

                              <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                                {t.journeyMomentTitle}
                              </label>

                              <input
                                value={moment.title}
                                onChange={(event) =>
                                  updateJourneyMoment(
                                    index,
                                    "title",
                                    event.target.value
                                  )
                                }
                                maxLength={180}
                                placeholder={t.journeyMomentTitlePlaceholder}
                                className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                              />

                            </div>

                          </div>


                          <div className="mt-5">

                            <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                              {t.journeyDescription}
                            </label>

                            <textarea
                              value={moment.description}
                              onChange={(event) =>
                                updateJourneyMoment(
                                  index,
                                  "description",
                                  event.target.value
                                )
                              }
                              rows={3}
                              maxLength={800}
                              placeholder={t.journeyDescriptionPlaceholder}
                              className="mt-3 w-full resize-y rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                            />

                          </div>


                          <button
                            type="button"
                            onClick={() =>
                              removeJourneyMoment(index)
                            }
                            className="mt-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30 transition hover:text-[#D51C24]"
                          >
                            {t.removeJourneyMoment}
                          </button>

                        </div>

                      ))}

                    </div>


                    <button
                      type="button"
                      onClick={addJourneyMoment}
                      className="mt-5 inline-flex items-center gap-3 rounded-xl border border-[#D4AF37]/25 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:border-[#D4AF37]/55"
                    >
                      <span aria-hidden="true">+</span>
                      {t.addJourneyMoment}
                    </button>

                  </div>

                </div>


                {/* =============================================
                    JOIN PROJECT
                ============================================== */}

                <div className="p-7 md:p-10">

                  <div className="flex items-start gap-5">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D51C24]/30 text-[11px] font-semibold text-[#D51C24]">
                      04
                    </div>


                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D51C24]">
                        {t.joinNeyoWorld}
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold">
                        {t.whyJoin}
                      </h2>

                    </div>

                  </div>


                  <div className="mt-9">

                    <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                      {t.whyFanPage}
                    </label>


                    <textarea
                      value={reason}
                      onChange={(event) =>
                        setReason(
                          event.target.value
                        )
                      }
                      rows={6}
                      maxLength={800}
                      placeholder={
                        t.reasonPlaceholder
                      }
                      className="mt-3 w-full resize-none rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-7 outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/55"
                    />


                    <p className="mt-2 text-right text-[9px] text-white/20">
                      {reason.length}/800
                    </p>

                  </div>


                  {/* AUTHORIZATION */}

                  <label className="mt-7 flex cursor-pointer items-start gap-4 rounded-xl border border-[#D4AF37]/10 bg-black/25 p-5">

                    <input
                      type="checkbox"
                      checked={authorized}
                      onChange={(event) =>
                        setAuthorized(
                          event.target.checked
                        )
                      }
                      className="mt-[3px] h-4 w-4 accent-[#D51C24]"
                    />


                    <span className="text-xs leading-6 text-white/45">
                      {t.authorization}
                    </span>

                  </label>


                  {/* ERROR */}

                  {error && (

                    <div className="mt-6 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4">

                      <p className="text-xs leading-6 text-[#FF5960]">
                        {error}
                      </p>

                    </div>

                  )}


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-8 flex items-center gap-7 rounded-xl border border-[#D51C24]/65 bg-[#D51C24]/5 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {submitting
                      ? t.submitting
                      : t.submitApplication}

                    <span className="text-[#D51C24] transition-transform group-hover:translate-x-1 group-hover:text-[#D4AF37]">
                      →
                    </span>

                  </button>

                </div>

              </form>

            </div>

          </section>

        </>

      )}


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


          <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
            {t.footer}
          </p>

        </div>

      </footer>

    </main>
  );
}