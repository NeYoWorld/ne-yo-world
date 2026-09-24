"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useLanguage,
  type Language,
} from "../context/LanguageContext";

import { supabase } from "../lib/supabase";

type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected";

type FanPageJourneyMoment = {
  year?: string | number | null;
  title?: string | null;
  description?: string | null;
};

type FanPageApplication = {
  id: string;
  fan_page_name: string;
  username: string;
  country: string;
  platform: string;
  fan_page_link: string;
  created_year: string | null;
  description: string | null;
  applicant_name: string;
  applicant_email: string;
  applicant_role: string;
  reason: string;
  authorized: boolean;
  status: ApplicationStatus;
  created_at: string;
  submission_language: string | null;
  public_creator_name: string | null;
  fan_since: number | null;
  profile_intro: string | null;
  story: string | null;
  why_neyo: string | null;
  message_to_neyo: string | null;
  favorite_song: string | null;
  journey: FanPageJourneyMoment[] | null;
};

type OfficialFanPage = {
  id: string;
  application_id: string | null;
  fan_page_name: string;
  username: string;
  country: string;
  platform: string;
  fan_page_link: string;
  created_year: string | null;
  description: string | null;
  is_active: boolean;
  joined_at: string;
  updated_at: string;
  slug: string | null;
  source_language: string | null;
  profile_is_published: boolean;
};

type FanPageProfileEditorData = {
  fan_page_id: string;
  fan_page_name: string;
  username: string;
  country: string;
  slug: string | null;
  source_language: string | null;
  profile_is_published: boolean;
  source: {
    profile_intro: string | null;
    story: string | null;
    why_neyo: string | null;
    message_to_neyo: string | null;
  };
  profile_translations: Record<string, {
    profile_intro?: string | null;
    story?: string | null;
    why_neyo?: string | null;
    message_to_neyo?: string | null;
  }>;
  journey: Array<{
    id: string;
    year: number | null;
    event_date: string | null;
    title: string;
    description: string | null;
    display_order: number;
    is_active: boolean;
    translations: Record<string, {
      title?: string | null;
      description?: string | null;
    }>;
  }>;
};

type FanPageProfileTranslationDraft = {
  profile_intro: string;
  story: string;
  why_neyo: string;
  message_to_neyo: string;
};


type CountryRecord = {
  id: string;
  name: string;
  slug: string;
  code: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type CountryMoment = {
  id: string;
  country_id: string;
  year: string;
  event_date: string | null;
  venue: string | null;
  date_translations: Record<string, string>;
  location_translations: Record<string, string>;
  title_translations: Record<string, string>;
  text_translations: Record<string, string>;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type CountryContent = {
  id: string;
  country_id: string;
  translations: Record<string, Record<string, string>>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type WorldMessage = {
  id: string;
  name: string;
  country: string;
  original_language: string;
  original_text: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
};

type WorldMessageTranslation = {
  id: string;
  message_id: string;
  language_code: string;
  translated_text: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

type WorldNewsStatus = "pending" | "approved" | "rejected";
type WorldNewsCategory = "music" | "live" | "interview" | "announcement";

type WorldNewsTranslation = {
  id: string;
  news_id: string;
  language: Language;
  title: string;
  summary: string;
  created_at?: string;
  updated_at?: string;
};

type WorldNewsItem = {
  id: string;
  category: WorldNewsCategory;
  source_name: string;
  source_url: string;
  published_at: string;
  event_date: string | null;
  status: WorldNewsStatus;
  created_at: string;
  updated_at: string;
  world_news_translations?: WorldNewsTranslation[] | null;
};

type FanMemoryMedia = {
  id: string;
  memory_id: string;
  media_type: "image" | "video";
  storage_bucket: "fan-memory-images" | "fan-memory-videos";
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  duration_seconds: number | null;
  display_order: number;
  created_at: string;
  signed_url?: string | null;
};

type FanMemory = {
  id: string;
  display_name: string;
  country_code: string;
  original_language: string;
  story: string;
  memory_date: string | null;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
  fan_memory_media?: FanMemoryMedia[] | null;
};

const WORLD_NEWS_LANGUAGES: Language[] = ["EN", "PT", "ES", "FR", "DE", "IT", "JA"];

const WORLD_MESSAGE_LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
  { code: "ja", label: "JA" },
] as const;

const FAN_PAGE_PROFILE_ADMIN_LABELS: Record<Language, {
  submissionLanguage: string;
  publicCreator: string;
  fanSince: string;
  profileIntro: string;
  story: string;
  whyNeyo: string;
  messageToNeyo: string;
  favoriteSong: string;
  journey: string;
  journeyEmpty: string;
  approvalNotice: string;
}> = {
  EN: {
    submissionLanguage: "Submission Language",
    publicCreator: "Public Creator Name",
    fanSince: "Fan Since",
    profileIntro: "Profile Introduction",
    story: "Our Story",
    whyNeyo: "Why Ne-Yo?",
    messageToNeyo: "Message to Ne-Yo",
    favoriteSong: "Favorite Song",
    journey: "Journey",
    journeyEmpty: "No journey moments were submitted.",
    approvalNotice: "Approval creates the complete profile as a private draft. It will not appear publicly until translations and review are complete.",
  },
  PT: {
    submissionLanguage: "Idioma da Candidatura",
    publicCreator: "Nome Público do Criador",
    fanSince: "Fã Desde",
    profileIntro: "Introdução do Perfil",
    story: "A Nossa História",
    whyNeyo: "Porquê Ne-Yo?",
    messageToNeyo: "Mensagem para Ne-Yo",
    favoriteSong: "Música Favorita",
    journey: "Percurso",
    journeyEmpty: "Não foram enviados momentos do percurso.",
    approvalNotice: "A aprovação cria o perfil completo como rascunho privado. Só ficará público depois das traduções e da revisão.",
  },
  ES: {
    submissionLanguage: "Idioma de la Solicitud",
    publicCreator: "Nombre Público del Creador",
    fanSince: "Fan Desde",
    profileIntro: "Introducción del Perfil",
    story: "Nuestra Historia",
    whyNeyo: "¿Por Qué Ne-Yo?",
    messageToNeyo: "Mensaje para Ne-Yo",
    favoriteSong: "Canción Favorita",
    journey: "Trayectoria",
    journeyEmpty: "No se enviaron momentos de la trayectoria.",
    approvalNotice: "La aprobación crea el perfil completo como borrador privado. No será público hasta completar las traducciones y la revisión.",
  },
  FR: {
    submissionLanguage: "Langue de la Candidature",
    publicCreator: "Nom Public du Créateur",
    fanSince: "Fan Depuis",
    profileIntro: "Introduction du Profil",
    story: "Notre Histoire",
    whyNeyo: "Pourquoi Ne-Yo ?",
    messageToNeyo: "Message à Ne-Yo",
    favoriteSong: "Chanson Préférée",
    journey: "Parcours",
    journeyEmpty: "Aucun moment du parcours n’a été envoyé.",
    approvalNotice: "L’approbation crée le profil complet sous forme de brouillon privé. Il ne sera publié qu’après les traductions et la révision.",
  },
  DE: {
    submissionLanguage: "Sprache der Bewerbung",
    publicCreator: "Öffentlicher Name des Erstellers",
    fanSince: "Fan Seit",
    profileIntro: "Profileinführung",
    story: "Unsere Geschichte",
    whyNeyo: "Warum Ne-Yo?",
    messageToNeyo: "Nachricht an Ne-Yo",
    favoriteSong: "Lieblingssong",
    journey: "Werdegang",
    journeyEmpty: "Es wurden keine Stationen des Werdegangs eingereicht.",
    approvalNotice: "Mit der Genehmigung wird das vollständige Profil als privater Entwurf erstellt. Es wird erst nach Übersetzungen und Prüfung veröffentlicht.",
  },
  IT: {
    submissionLanguage: "Lingua della Candidatura",
    publicCreator: "Nome Pubblico del Creatore",
    fanSince: "Fan Dal",
    profileIntro: "Introduzione del Profilo",
    story: "La Nostra Storia",
    whyNeyo: "Perché Ne-Yo?",
    messageToNeyo: "Messaggio per Ne-Yo",
    favoriteSong: "Canzone Preferita",
    journey: "Percorso",
    journeyEmpty: "Non sono stati inviati momenti del percorso.",
    approvalNotice: "L’approvazione crea il profilo completo come bozza privata. Non sarà pubblico finché traduzioni e revisione non saranno completate.",
  },
  JA: {
    submissionLanguage: "申請言語",
    publicCreator: "公開する作成者名",
    fanSince: "ファン歴",
    profileIntro: "プロフィール紹介",
    story: "私たちのストーリー",
    whyNeyo: "なぜNe-Yo？",
    messageToNeyo: "Ne-Yoへのメッセージ",
    favoriteSong: "お気に入りの曲",
    journey: "歩み",
    journeyEmpty: "歩みに関する項目は送信されていません。",
    approvalNotice: "承認すると完全なプロフィールが非公開の下書きとして作成されます。翻訳と確認が完了するまで公開されません。",
  },
};

const FAN_PAGE_TRANSLATION_EDITOR_LABELS: Record<Language, {
  editProfile: string;
  editorTitle: string;
  sourceText: string;
  translation: string;
  saveDraft: string;
  publish: string;
  published: string;
  privateDraft: string;
  loading: string;
  loadError: string;
  saveError: string;
  saved: string;
  publishError: string;
  publishSuccess: string;
  incompleteNotice: string;
  journey: string;
  noJourney: string;
  prepareTranslations: string;
  translationPackage: string;
  copyPackage: string;
  downloadPackage: string;
  packageCopied: string;
  packageCopyError: string;
  importTranslations: string;
  importPlaceholder: string;
  importButton: string;
  importFile: string;
  importSuccess: string;
  importError: string;
  close: string;
}> = {
  EN: { editProfile:"Profile & Translations", editorTitle:"Fan Page Profile", sourceText:"Original", translation:"Translation", saveDraft:"Save Translations", publish:"Publish Profile", published:"Published", privateDraft:"Private Draft", loading:"Loading profile...", loadError:"Could not load the profile editor.", saveError:"Could not save the translations.", saved:"Translations saved. The profile remains private.", publishError:"The profile cannot be published yet. Complete all required translations.", publishSuccess:"Profile published successfully.", incompleteNotice:"Complete and review all 7 languages before publishing. Saving translations never publishes the profile.", journey:"Journey", noJourney:"No journey moments.", prepareTranslations:"Prepare Translations", translationPackage:"Translation Package", copyPackage:"Copy Package", downloadPackage:"Download JSON", packageCopied:"Translation package copied. Paste it into ChatGPT and ask it to return the completed JSON only.", packageCopyError:"Could not copy the package automatically. Select the text in the package box and copy it manually.", importTranslations:"Import Completed Translations", importPlaceholder:"Paste the completed JSON returned by ChatGPT here...", importButton:"Import JSON", importFile:"Import JSON File", importSuccess:"Translations imported into the editor. Review them, then click Save Translations.", importError:"Could not import this JSON. Check that it is the translation package for this fan page and try again.", close:"Close" },
  PT: { editProfile:"Perfil e Traduções", editorTitle:"Perfil da Fan Page", sourceText:"Original", translation:"Tradução", saveDraft:"Guardar Traduções", publish:"Publicar Perfil", published:"Publicado", privateDraft:"Rascunho Privado", loading:"A carregar perfil...", loadError:"Não foi possível carregar o editor do perfil.", saveError:"Não foi possível guardar as traduções.", saved:"Traduções guardadas. O perfil continua privado.", publishError:"O perfil ainda não pode ser publicado. Completa todas as traduções obrigatórias.", publishSuccess:"Perfil publicado com sucesso.", incompleteNotice:"Completa e revê os 7 idiomas antes de publicar. Guardar traduções nunca publica o perfil.", journey:"Percurso", noJourney:"Não existem momentos no percurso.", prepareTranslations:"Preparar Traduções", translationPackage:"Pacote de Tradução", copyPackage:"Copiar Pacote", downloadPackage:"Descarregar JSON", packageCopied:"Pacote de tradução copiado. Cola-o no ChatGPT e pede para devolver apenas o JSON completo.", packageCopyError:"Não foi possível copiar o pacote automaticamente. Seleciona o texto na caixa do pacote e copia-o manualmente.", importTranslations:"Importar Traduções Concluídas", importPlaceholder:"Cola aqui o JSON completo devolvido pelo ChatGPT...", importButton:"Importar JSON", importFile:"Importar Ficheiro JSON", importSuccess:"Traduções importadas para o editor. Revê tudo e depois clica em Guardar Traduções.", importError:"Não foi possível importar este JSON. Confirma que é o pacote de tradução desta fan page e tenta novamente.", close:"Fechar" },
  ES: { editProfile:"Perfil y Traducciones", editorTitle:"Perfil de la Página de Fans", sourceText:"Original", translation:"Traducción", saveDraft:"Guardar Traducciones", publish:"Publicar Perfil", published:"Publicado", privateDraft:"Borrador Privado", loading:"Cargando perfil...", loadError:"No se pudo cargar el editor del perfil.", saveError:"No se pudieron guardar las traducciones.", saved:"Traducciones guardadas. El perfil sigue siendo privado.", publishError:"El perfil todavía no puede publicarse. Completa todas las traducciones obligatorias.", publishSuccess:"Perfil publicado correctamente.", incompleteNotice:"Completa y revisa los 7 idiomas antes de publicar. Guardar traducciones nunca publica el perfil.", journey:"Trayectoria", noJourney:"No hay momentos en la trayectoria.", prepareTranslations:"Preparar Traducciones", translationPackage:"Paquete de Traducción", copyPackage:"Copiar Paquete", downloadPackage:"Descargar JSON", packageCopied:"Paquete de traducción copiado. Pégalo en ChatGPT y pide que devuelva únicamente el JSON completo.", packageCopyError:"No se pudo copiar el paquete automáticamente. Selecciona el texto de la caja del paquete y cópialo manualmente.", importTranslations:"Importar Traducciones Completadas", importPlaceholder:"Pega aquí el JSON completo devuelto por ChatGPT...", importButton:"Importar JSON", importFile:"Importar Archivo JSON", importSuccess:"Traducciones importadas al editor. Revísalas y después pulsa Guardar Traducciones.", importError:"No se pudo importar este JSON. Comprueba que es el paquete de traducción de esta página de fans e inténtalo de nuevo.", close:"Cerrar" },
  FR: { editProfile:"Profil et Traductions", editorTitle:"Profil de la Page de Fans", sourceText:"Original", translation:"Traduction", saveDraft:"Enregistrer les Traductions", publish:"Publier le Profil", published:"Publié", privateDraft:"Brouillon Privé", loading:"Chargement du profil...", loadError:"Impossible de charger l’éditeur du profil.", saveError:"Impossible d’enregistrer les traductions.", saved:"Traductions enregistrées. Le profil reste privé.", publishError:"Le profil ne peut pas encore être publié. Complétez toutes les traductions requises.", publishSuccess:"Profil publié avec succès.", incompleteNotice:"Complétez et vérifiez les 7 langues avant publication. Enregistrer les traductions ne publie jamais le profil.", journey:"Parcours", noJourney:"Aucun moment dans le parcours.", prepareTranslations:"Préparer les Traductions", translationPackage:"Pack de Traduction", copyPackage:"Copier le Pack", downloadPackage:"Télécharger le JSON", packageCopied:"Pack de traduction copié. Collez-le dans ChatGPT et demandez-lui de renvoyer uniquement le JSON complet.", packageCopyError:"Impossible de copier automatiquement le pack. Sélectionnez le texte dans la zone du pack et copiez-le manuellement.", importTranslations:"Importer les Traductions Terminées", importPlaceholder:"Collez ici le JSON complet renvoyé par ChatGPT...", importButton:"Importer le JSON", importFile:"Importer un Fichier JSON", importSuccess:"Traductions importées dans l’éditeur. Vérifiez-les, puis cliquez sur Enregistrer les Traductions.", importError:"Impossible d’importer ce JSON. Vérifiez qu’il s’agit bien du pack de traduction de cette page de fans, puis réessayez.", close:"Fermer" },
  DE: { editProfile:"Profil und Übersetzungen", editorTitle:"Fanseitenprofil", sourceText:"Original", translation:"Übersetzung", saveDraft:"Übersetzungen Speichern", publish:"Profil Veröffentlichen", published:"Veröffentlicht", privateDraft:"Privater Entwurf", loading:"Profil wird geladen...", loadError:"Der Profileditor konnte nicht geladen werden.", saveError:"Die Übersetzungen konnten nicht gespeichert werden.", saved:"Übersetzungen gespeichert. Das Profil bleibt privat.", publishError:"Das Profil kann noch nicht veröffentlicht werden. Vervollständige alle erforderlichen Übersetzungen.", publishSuccess:"Profil erfolgreich veröffentlicht.", incompleteNotice:"Vervollständige und prüfe alle 7 Sprachen vor der Veröffentlichung. Das Speichern von Übersetzungen veröffentlicht das Profil nicht.", journey:"Werdegang", noJourney:"Keine Stationen im Werdegang.", prepareTranslations:"Übersetzungen Vorbereiten", translationPackage:"Übersetzungspaket", copyPackage:"Paket Kopieren", downloadPackage:"JSON Herunterladen", packageCopied:"Übersetzungspaket kopiert. Füge es in ChatGPT ein und bitte um ausschließlich das vollständig ausgefüllte JSON.", packageCopyError:"Das Paket konnte nicht automatisch kopiert werden. Markiere den Text im Paketfeld und kopiere ihn manuell.", importTranslations:"Fertige Übersetzungen Importieren", importPlaceholder:"Füge hier das von ChatGPT zurückgegebene vollständige JSON ein...", importButton:"JSON Importieren", importFile:"JSON-Datei Importieren", importSuccess:"Übersetzungen wurden in den Editor importiert. Prüfe sie und klicke anschließend auf Übersetzungen Speichern.", importError:"Dieses JSON konnte nicht importiert werden. Prüfe, ob es das Übersetzungspaket dieser Fanseite ist, und versuche es erneut.", close:"Schließen" },
  IT: { editProfile:"Profilo e Traduzioni", editorTitle:"Profilo della Pagina Fan", sourceText:"Originale", translation:"Traduzione", saveDraft:"Salva Traduzioni", publish:"Pubblica Profilo", published:"Pubblicato", privateDraft:"Bozza Privata", loading:"Caricamento profilo...", loadError:"Impossibile caricare l’editor del profilo.", saveError:"Impossibile salvare le traduzioni.", saved:"Traduzioni salvate. Il profilo rimane privato.", publishError:"Il profilo non può ancora essere pubblicato. Completa tutte le traduzioni obbligatorie.", publishSuccess:"Profilo pubblicato correttamente.", incompleteNotice:"Completa e controlla tutte e 7 le lingue prima della pubblicazione. Salvare le traduzioni non pubblica mai il profilo.", journey:"Percorso", noJourney:"Nessun momento nel percorso.", prepareTranslations:"Prepara Traduzioni", translationPackage:"Pacchetto di Traduzione", copyPackage:"Copia Pacchetto", downloadPackage:"Scarica JSON", packageCopied:"Pacchetto di traduzione copiato. Incollalo in ChatGPT e chiedi di restituire soltanto il JSON completo.", packageCopyError:"Non è stato possibile copiare automaticamente il pacchetto. Seleziona il testo nel riquadro e copialo manualmente.", importTranslations:"Importa Traduzioni Completate", importPlaceholder:"Incolla qui il JSON completo restituito da ChatGPT...", importButton:"Importa JSON", importFile:"Importa File JSON", importSuccess:"Traduzioni importate nell’editor. Controllale e poi fai clic su Salva Traduzioni.", importError:"Impossibile importare questo JSON. Verifica che sia il pacchetto di traduzione di questa pagina fan e riprova.", close:"Chiudi" },
  JA: { editProfile:"プロフィールと翻訳", editorTitle:"ファンページプロフィール", sourceText:"原文", translation:"翻訳", saveDraft:"翻訳を保存", publish:"プロフィールを公開", published:"公開済み", privateDraft:"非公開の下書き", loading:"プロフィールを読み込み中...", loadError:"プロフィールエディターを読み込めませんでした。", saveError:"翻訳を保存できませんでした。", saved:"翻訳を保存しました。プロフィールは非公開のままです。", publishError:"まだ公開できません。必要な翻訳をすべて完成させてください。", publishSuccess:"プロフィールを公開しました。", incompleteNotice:"公開前に7言語すべてを完成させ、確認してください。翻訳を保存してもプロフィールは公開されません。", journey:"歩み", noJourney:"歩みの項目はありません。", prepareTranslations:"翻訳を準備", translationPackage:"翻訳パッケージ", copyPackage:"パッケージをコピー", downloadPackage:"JSONをダウンロード", packageCopied:"翻訳パッケージをコピーしました。ChatGPTに貼り付け、完成したJSONのみを返すよう依頼してください。", packageCopyError:"パッケージを自動でコピーできませんでした。パッケージ欄のテキストを選択して手動でコピーしてください。", importTranslations:"完成した翻訳をインポート", importPlaceholder:"ChatGPTから返された完成済みJSONをここに貼り付けてください...", importButton:"JSONをインポート", importFile:"JSONファイルをインポート", importSuccess:"翻訳をエディターに取り込みました。内容を確認してから「翻訳を保存」をクリックしてください。", importError:"このJSONをインポートできませんでした。このファンページ用の翻訳パッケージであることを確認して、もう一度お試しください。", close:"閉じる" },
};

const translations = {
  EN: {
    admin: "Administration",
    title: "Ne-Yo World Admin",
    subtitle:
      "Review fan page applications and decide which communities can join the project.",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signingIn: "Signing in...",
    signOut: "Sign Out",
    checking: "Checking access...",
    noAccess: "This account is not authorized as an administrator.",
    loginError: "Could not sign in. Check your email and password.",
    loadError: "Could not load applications.",
    updateError: "Could not update this application.",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    all: "All",
    applications: "Applications",
    noApplications: "No applications found.",
    fanPage: "Fan Page",
    country: "Country",
    platform: "Platform",
    submitted: "Submitted",
    view: "View",
    approve: "Approve",
    reject: "Reject",
    revert: "Revert Decision",
    processing: "Processing...",
    applicant: "Applicant",
    role: "Role",
    pageCreated: "Page Created",
    description: "Description",
    reason: "Why join Ne-Yo World?",
    link: "Fan Page Link",
    authorization: "Authorization confirmed",
    status: "Status",
    officialFanPages: "Official Fan Pages",
    officialFanPagesSubtitle: "Manage communities that have already been approved for Ne-Yo World.",
    active: "Active",
    inactive: "Inactive",
    deactivate: "Deactivate from Site",
    activate: "Activate on Site",
    officialPagesError: "Could not load official fan pages.",
    noOfficialFanPages: "No official fan pages found.",
    edit: "Edit",
    save: "Save Changes",
    cancel: "Cancel",
    editOfficialPage: "Edit Official Fan Page",
    saving: "Saving...",
    saved: "Changes saved successfully.",
    fanPageName: "Fan Page Name",
    usernameLabel: "Username",
    year: "Year",
    searchOfficialPages: "Search by name or username",
    filterCountry: "Country",
    filterStatus: "Status",
    allCountries: "All Countries",
    allStatuses: "All Statuses",
    visibleOnSite: "Active on Site",
    hiddenFromSite: "Inactive on Site",
    overview: "Project Overview",
    pendingApplications: "Pending",
    approvedApplications: "Approved",
    activePages: "Active on Site",
    inactivePages: "Inactive on Site",
    representedCountries: "Countries Represented",
    countriesManagement: "Countries",
    countriesManagementSubtitle: "Manage the countries available across Ne-Yo World.",
    addCountry: "Add Country",
    editCountry: "Edit Country",
    countryName: "Country Name",
    countryCode: "Country Code",
    countrySlug: "Slug",
    countryActive: "Active on Site",
    countryInactive: "Inactive on Site",
    activateCountry: "Activate Country",
    deactivateCountry: "Deactivate Country",
    noCountries: "No countries found.",
    countriesError: "Could not load countries.",
    countrySaved: "Country saved successfully.",
    countryMoments: "Country Moments",
    countryMomentsSubtitle: "Manage the historical moments shown on each country page.",
    addMoment: "Add Moment",
    editMoment: "Edit Moment",
    momentDate: "Event Date",
    venue: "Venue",
    location: "Location",
    titleLabel: "Title",
    textLabel: "Text",
    displayOrder: "Display Order",
    noMoments: "No moments found.",
    momentsError: "Could not load country moments.",
    momentSaved: "Moment saved successfully.",
    activateMoment: "Activate Moment",
    deactivateMoment: "Deactivate Moment",
    countryContent: "Country Content",
    countryContentSubtitle: "Edit the translated text used across each country page.",
    editContent: "Edit Content",
    contentLanguage: "Content Language",
    contentSaved: "Country content saved successfully.",
    contentError: "Could not load country content.",
    noCountryContent: "No country content found.",
    worldMessagesAdmin: "World Messages",
    worldMessagesAdminSubtitle: "Review messages sent by fans before they appear publicly.",
    worldMessagesLoadError: "Could not load World Messages.",
    worldMessagesUpdateError: "Could not update this message.",
    messageTranslations: "Translations",
    messageTranslationsSubtitle: "Add or edit translations without changing the fan's original message.",
    editTranslations: "Edit Translations",
    hideTranslations: "Hide Translations",
    saveTranslations: "Save Translations",
    translationsSaved: "Translations saved successfully.",
    translationsSaveError: "Could not save the translations.",
    translationFor: "Translation",
    originalMessageNotice: "The original message is preserved exactly as submitted.",
    noWorldMessages: "No messages found in this category.",
    messageFrom: "Message from",
    originalLanguage: "Original Language",
    approveMessage: "Approve",
    rejectMessage: "Reject",
    revertMessage: "Return to Pending",
    approvedAt: "Approved",
    messageText: "Message",
    creating: "Creating...",
    deleteMessage: 'Delete',
    deleteMessageConfirm: 'Delete this World Message permanently? Its translations will also be deleted.',
    worldMessageDeleteError: 'Could not delete this message.',
    searchCountries: 'Search countries...',
    searchCountryContent: 'Search country content...',
  },
  PT: {
    admin: "Administração",
    title: "Admin Ne-Yo World",
    subtitle:
      "Analisa as candidaturas das páginas de fãs e decide quais comunidades podem entrar no projeto.",
    email: "Email",
    password: "Palavra-passe",
    signIn: "Entrar",
    signingIn: "A entrar...",
    signOut: "Sair",
    checking: "A verificar acesso...",
    noAccess: "Esta conta não está autorizada como administradora.",
    loginError: "Não foi possível entrar. Confirma o email e a palavra-passe.",
    loadError: "Não foi possível carregar as candidaturas.",
    updateError: "Não foi possível atualizar esta candidatura.",
    pending: "A Aguardar",
    approved: "Aprovadas",
    rejected: "Rejeitadas",
    all: "Todas",
    applications: "Candidaturas",
    noApplications: "Não existem candidaturas nesta categoria.",
    fanPage: "Página de Fãs",
    country: "País",
    platform: "Plataforma",
    submitted: "Enviada",
    view: "Ver",
    approve: "Aprovar",
    reject: "Rejeitar",
    revert: "Reverter Decisão",
    processing: "A processar...",
    applicant: "Responsável",
    role: "Função",
    pageCreated: "Página Criada",
    description: "Descrição",
    reason: "Porque quer entrar no Ne-Yo World?",
    link: "Link da Página",
    authorization: "Autorização confirmada",
    status: "Estado",
    officialFanPages: "Fan Pages Oficiais",
    officialFanPagesSubtitle: "Gere as comunidades que já foram aprovadas para o Ne-Yo World.",
    active: "Ativa",
    inactive: "Inativa",
    deactivate: "Desativar do Site",
    activate: "Ativar no Site",
    officialPagesError: "Não foi possível carregar as fan pages oficiais.",
    noOfficialFanPages: "Ainda não existem fan pages oficiais.",
    edit: "Editar",
    save: "Guardar Alterações",
    cancel: "Cancelar",
    editOfficialPage: "Editar Fan Page Oficial",
    saving: "A guardar...",
    saved: "Alterações guardadas com sucesso.",
    fanPageName: "Nome da Fan Page",
    usernameLabel: "Username",
    year: "Ano",
    searchOfficialPages: "Pesquisar por nome ou username",
    filterCountry: "País",
    filterStatus: "Estado",
    allCountries: "Todos os Países",
    allStatuses: "Todos os Estados",
    visibleOnSite: "Ativa no Site",
    hiddenFromSite: "Inativa no Site",
    overview: "Visão Geral do Projeto",
    pendingApplications: "Pendentes",
    approvedApplications: "Aprovadas",
    activePages: "Ativas no Site",
    inactivePages: "Inativas no Site",
    representedCountries: "Países Representados",
    countriesManagement: "Países",
    countriesManagementSubtitle: "Gere os países disponíveis no Ne-Yo World.",
    addCountry: "Adicionar País",
    editCountry: "Editar País",
    countryName: "Nome do País",
    countryCode: "Código do País",
    countrySlug: "Slug",
    countryActive: "Ativo no Site",
    countryInactive: "Inativo no Site",
    activateCountry: "Ativar País",
    deactivateCountry: "Desativar País",
    noCountries: "Não existem países.",
    countriesError: "Não foi possível carregar os países.",
    countrySaved: "País guardado com sucesso.",
    countryMoments: "Momentos dos Países",
    countryMomentsSubtitle: "Gere os momentos históricos apresentados na página de cada país.",
    addMoment: "Adicionar Momento",
    editMoment: "Editar Momento",
    momentDate: "Data do Evento",
    venue: "Venue",
    location: "Local",
    titleLabel: "Título",
    textLabel: "Texto",
    displayOrder: "Ordem",
    noMoments: "Não existem momentos.",
    momentsError: "Não foi possível carregar os momentos.",
    momentSaved: "Momento guardado com sucesso.",
    activateMoment: "Ativar Momento",
    deactivateMoment: "Desativar Momento",
    countryContent: "Conteúdo dos Países",
    countryContentSubtitle: "Edita os textos traduzidos apresentados em cada página de país.",
    editContent: "Editar Conteúdo",
    contentLanguage: "Idioma do Conteúdo",
    contentSaved: "Conteúdo do país guardado com sucesso.",
    contentError: "Não foi possível carregar o conteúdo dos países.",
    noCountryContent: "Não existe conteúdo para este país.",
    worldMessagesAdmin: "World Messages",
    worldMessagesAdminSubtitle: "Revê as mensagens enviadas pelos fãs antes de aparecerem publicamente.",
    worldMessagesLoadError: "Não foi possível carregar as World Messages.",
    worldMessagesUpdateError: "Não foi possível atualizar esta mensagem.",
    messageTranslations: "Traduções",
    messageTranslationsSubtitle: "Adiciona ou edita traduções sem alterar a mensagem original do fã.",
    editTranslations: "Editar Traduções",
    hideTranslations: "Ocultar Traduções",
    saveTranslations: "Guardar Traduções",
    translationsSaved: "Traduções guardadas com sucesso.",
    translationsSaveError: "Não foi possível guardar as traduções.",
    translationFor: "Tradução",
    originalMessageNotice: "A mensagem original é preservada exatamente como foi enviada.",
    noWorldMessages: "Não existem mensagens nesta categoria.",
    messageFrom: "Mensagem de",
    originalLanguage: "Idioma Original",
    approveMessage: "Aprovar",
    rejectMessage: "Rejeitar",
    revertMessage: "Voltar a Pendente",
    approvedAt: "Aprovada",
    messageText: "Mensagem",
    creating: "A criar...",
    deleteMessage: 'Apagar',
    deleteMessageConfirm: 'Apagar esta World Message permanentemente? As traduções também serão apagadas.',
    worldMessageDeleteError: 'Não foi possível apagar esta mensagem.',
    searchCountries: 'Pesquisar países...',
    searchCountryContent: 'Pesquisar conteúdo por país...',
  },
  ES: {
    admin: "Administración",
    title: "Admin Ne-Yo World",
    subtitle: "Revisa las solicitudes de páginas de fans y decide qué comunidades pueden unirse al proyecto.",
    email: "Email",
    password: "Contraseña",
    signIn: "Entrar",
    signingIn: "Entrando...",
    signOut: "Salir",
    checking: "Comprobando acceso...",
    noAccess: "Esta cuenta no está autorizada como administradora.",
    loginError: "No fue posible iniciar sesión. Comprueba el email y la contraseña.",
    loadError: "No fue posible cargar las solicitudes.",
    updateError: "No fue posible actualizar esta solicitud.",
    pending: "Pendientes",
    approved: "Aprobadas",
    rejected: "Rechazadas",
    all: "Todas",
    applications: "Solicitudes",
    noApplications: "No hay solicitudes en esta categoría.",
    fanPage: "Página de Fans",
    country: "País",
    platform: "Plataforma",
    submitted: "Enviada",
    view: "Ver",
    approve: "Aprobar",
    reject: "Rechazar",
    revert: "Revertir Decisión",
    processing: "Procesando...",
    applicant: "Solicitante",
    role: "Función",
    pageCreated: "Página Creada",
    description: "Descripción",
    reason: "¿Por qué quiere unirse a Ne-Yo World?",
    link: "Enlace de la Página",
    authorization: "Autorización confirmada",
    status: "Estado",
    officialFanPages: "Fan Pages Oficiales",
    officialFanPagesSubtitle: "Gestiona las comunidades ya aprobadas para Ne-Yo World.",
    active: "Activa",
    inactive: "Inactiva",
    deactivate: "Desactivar del Sitio",
    activate: "Activar en el Sitio",
    officialPagesError: "No fue posible cargar las fan pages oficiales.",
    noOfficialFanPages: "Todavía no hay fan pages oficiales.",
    edit: "Editar",
    save: "Guardar Cambios",
    cancel: "Cancelar",
    editOfficialPage: "Editar Fan Page Oficial",
    saving: "Guardando...",
    saved: "Cambios guardados correctamente.",
    fanPageName: "Nombre de la Fan Page",
    usernameLabel: "Usuario",
    year: "Año",
    searchOfficialPages: "Buscar por nombre o usuario",
    filterCountry: "País",
    filterStatus: "Estado",
    allCountries: "Todos los Países",
    allStatuses: "Todos los Estados",
    visibleOnSite: "Activa en el Sitio",
    hiddenFromSite: "Inactiva en el Sitio",
    overview: "Resumen del Proyecto",
    pendingApplications: "Pendientes",
    approvedApplications: "Aprobadas",
    activePages: "Activas en el Sitio",
    inactivePages: "Inactivas en el Sitio",
    representedCountries: "Países Representados",
    countriesManagement: "Países",
    countriesManagementSubtitle: "Gestiona los países disponibles en Ne-Yo World.",
    addCountry: "Añadir País",
    editCountry: "Editar País",
    countryName: "Nombre del País",
    countryCode: "Código del País",
    countrySlug: "Slug",
    countryActive: "Activo en el Sitio",
    countryInactive: "Inactivo en el Sitio",
    activateCountry: "Activar País",
    deactivateCountry: "Desactivar País",
    noCountries: "No hay países.",
    countriesError: "No fue posible cargar los países.",
    countrySaved: "País guardado correctamente.",
    countryMoments: "Momentos de los Países",
    countryMomentsSubtitle: "Gestiona los momentos históricos de cada país.",
    addMoment: "Añadir Momento",
    editMoment: "Editar Momento",
    momentDate: "Fecha del Evento",
    venue: "Venue",
    location: "Lugar",
    titleLabel: "Título",
    textLabel: "Texto",
    displayOrder: "Orden",
    noMoments: "No hay momentos.",
    momentsError: "No fue posible cargar los momentos.",
    momentSaved: "Momento guardado.",
    activateMoment: "Activar Momento",
    deactivateMoment: "Desactivar Momento",
    countryContent: "Contenido de los Países",
    countryContentSubtitle: "Edita los textos traducidos de cada página de país.",
    editContent: "Editar Contenido",
    contentLanguage: "Idioma del Contenido",
    contentSaved: "Contenido guardado correctamente.",
    contentError: "No fue posible cargar el contenido.",
    noCountryContent: "No hay contenido para este país.",
    worldMessagesAdmin: "World Messages",
    worldMessagesAdminSubtitle: "Revisa los mensajes enviados por los fans antes de que aparezcan públicamente.",
    worldMessagesLoadError: "No se pudieron cargar los World Messages.",
    worldMessagesUpdateError: "No se pudo actualizar este mensaje.",
    messageTranslations: "Traducciones",
    messageTranslationsSubtitle: "Añade o edita traducciones sin cambiar el mensaje original del fan.",
    editTranslations: "Editar Traducciones",
    hideTranslations: "Ocultar Traducciones",
    saveTranslations: "Guardar Traducciones",
    translationsSaved: "Traducciones guardadas correctamente.",
    translationsSaveError: "No se pudieron guardar las traducciones.",
    translationFor: "Traducción",
    originalMessageNotice: "El mensaje original se conserva exactamente como fue enviado.",
    noWorldMessages: "No hay mensajes en esta categoría.",
    messageFrom: "Mensaje de",
    originalLanguage: "Idioma Original",
    approveMessage: "Aprobar",
    rejectMessage: "Rechazar",
    revertMessage: "Volver a Pendiente",
    approvedAt: "Aprobado",
    messageText: "Mensaje",
    creating: "Creando...",
    deleteMessage: 'Eliminar',
    deleteMessageConfirm: '¿Eliminar este World Message permanentemente? Sus traducciones también se eliminarán.',
    worldMessageDeleteError: 'No se pudo eliminar este mensaje.',
    searchCountries: 'Buscar países...',
    searchCountryContent: 'Buscar contenido por país...',
  },
  FR: {
    admin: "Administration",
    title: "Admin Ne-Yo World",
    subtitle: "Examinez les candidatures des pages de fans et décidez quelles communautés peuvent rejoindre le projet.",
    email: "Email",
    password: "Mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion...",
    signOut: "Se déconnecter",
    checking: "Vérification de l’accès...",
    noAccess: "Ce compte n’est pas autorisé en tant qu’administrateur.",
    loginError: "Connexion impossible. Vérifiez l’email et le mot de passe.",
    loadError: "Impossible de charger les candidatures.",
    updateError: "Impossible de mettre à jour cette candidature.",
    pending: "En attente",
    approved: "Approuvées",
    rejected: "Rejetées",
    all: "Toutes",
    applications: "Candidatures",
    noApplications: "Aucune candidature dans cette catégorie.",
    fanPage: "Page de Fans",
    country: "Pays",
    platform: "Plateforme",
    submitted: "Envoyée",
    view: "Voir",
    approve: "Approuver",
    reject: "Rejeter",
    revert: "Annuler la Décision",
    processing: "Traitement...",
    applicant: "Candidat",
    role: "Rôle",
    pageCreated: "Page Créée",
    description: "Description",
    reason: "Pourquoi rejoindre Ne-Yo World ?",
    link: "Lien de la Page",
    authorization: "Autorisation confirmée",
    status: "Statut",
    officialFanPages: "Pages de Fans Officielles",
    officialFanPagesSubtitle: "Gérez les communautés déjà approuvées pour Ne-Yo World.",
    active: "Active",
    inactive: "Inactive",
    deactivate: "Désactiver du Site",
    activate: "Activer sur le Site",
    officialPagesError: "Impossible de charger les pages de fans officielles.",
    noOfficialFanPages: "Aucune page de fans officielle.",
    edit: "Modifier",
    save: "Enregistrer",
    cancel: "Annuler",
    editOfficialPage: "Modifier la Page de Fans Officielle",
    saving: "Enregistrement...",
    saved: "Modifications enregistrées.",
    fanPageName: "Nom de la Page",
    usernameLabel: "Nom d’utilisateur",
    year: "Année",
    searchOfficialPages: "Rechercher par nom ou utilisateur",
    filterCountry: "Pays",
    filterStatus: "Statut",
    allCountries: "Tous les Pays",
    allStatuses: "Tous les Statuts",
    visibleOnSite: "Active sur le Site",
    hiddenFromSite: "Inactive sur le Site",
    overview: "Vue d’ensemble du Projet",
    pendingApplications: "En Attente",
    approvedApplications: "Approuvées",
    activePages: "Actives sur le Site",
    inactivePages: "Inactives sur le Site",
    representedCountries: "Pays Représentés",
    countriesManagement: "Pays",
    countriesManagementSubtitle: "Gérez les pays disponibles dans Ne-Yo World.",
    addCountry: "Ajouter un Pays",
    editCountry: "Modifier le Pays",
    countryName: "Nom du Pays",
    countryCode: "Code du Pays",
    countrySlug: "Slug",
    countryActive: "Actif sur le Site",
    countryInactive: "Inactif sur le Site",
    activateCountry: "Activer le Pays",
    deactivateCountry: "Désactiver le Pays",
    noCountries: "Aucun pays.",
    countriesError: "Impossible de charger les pays.",
    countrySaved: "Pays enregistré.",
    countryMoments: "Moments des Pays",
    countryMomentsSubtitle: "Gérez les moments historiques de chaque pays.",
    addMoment: "Ajouter un Moment",
    editMoment: "Modifier le Moment",
    momentDate: "Date de l’Événement",
    venue: "Venue",
    location: "Lieu",
    titleLabel: "Titre",
    textLabel: "Texte",
    displayOrder: "Ordre",
    noMoments: "Aucun moment.",
    momentsError: "Impossible de charger les moments.",
    momentSaved: "Moment enregistré.",
    activateMoment: "Activer le Moment",
    deactivateMoment: "Désactiver le Moment",
    countryContent: "Contenu des Pays",
    countryContentSubtitle: "Modifiez les textes traduits de chaque page pays.",
    editContent: "Modifier le Contenu",
    contentLanguage: "Langue du Contenu",
    contentSaved: "Contenu enregistré.",
    contentError: "Impossible de charger le contenu.",
    noCountryContent: "Aucun contenu pour ce pays.",
    worldMessagesAdmin: "World Messages",
    worldMessagesAdminSubtitle: "Examinez les messages envoyés par les fans avant leur publication.",
    worldMessagesLoadError: "Impossible de charger les World Messages.",
    worldMessagesUpdateError: "Impossible de mettre à jour ce message.",
    messageTranslations: "Traductions",
    messageTranslationsSubtitle: "Ajoutez ou modifiez les traductions sans changer le message original du fan.",
    editTranslations: "Modifier les Traductions",
    hideTranslations: "Masquer les Traductions",
    saveTranslations: "Enregistrer les Traductions",
    translationsSaved: "Traductions enregistrées.",
    translationsSaveError: "Impossible d’enregistrer les traductions.",
    translationFor: "Traduction",
    originalMessageNotice: "Le message original est conservé exactement tel qu’il a été envoyé.",
    noWorldMessages: "Aucun message dans cette catégorie.",
    messageFrom: "Message de",
    originalLanguage: "Langue Originale",
    approveMessage: "Approuver",
    rejectMessage: "Rejeter",
    revertMessage: "Remettre en Attente",
    approvedAt: "Approuvé",
    messageText: "Message",
    creating: "Création...",
    deleteMessage: 'Supprimer',
    deleteMessageConfirm: 'Supprimer définitivement ce World Message ? Ses traductions seront également supprimées.',
    worldMessageDeleteError: 'Impossible de supprimer ce message.',
    searchCountries: 'Rechercher des pays...',
    searchCountryContent: 'Rechercher le contenu par pays...',
  },
  DE: {
    admin: "Verwaltung",
    title: "Ne-Yo World Admin",
    subtitle: "Prüfe Bewerbungen von Fanseiten und entscheide, welche Communities dem Projekt beitreten können.",
    email: "E-Mail",
    password: "Passwort",
    signIn: "Anmelden",
    signingIn: "Anmeldung...",
    signOut: "Abmelden",
    checking: "Zugriff wird geprüft...",
    noAccess: "Dieses Konto ist nicht als Administrator autorisiert.",
    loginError: "Anmeldung fehlgeschlagen. Prüfe E-Mail und Passwort.",
    loadError: "Bewerbungen konnten nicht geladen werden.",
    updateError: "Diese Bewerbung konnte nicht aktualisiert werden.",
    pending: "Ausstehend",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    all: "Alle",
    applications: "Bewerbungen",
    noApplications: "Keine Bewerbungen in dieser Kategorie.",
    fanPage: "Fanseite",
    country: "Land",
    platform: "Plattform",
    submitted: "Eingereicht",
    view: "Ansehen",
    approve: "Genehmigen",
    reject: "Ablehnen",
    revert: "Entscheidung Rückgängig",
    processing: "Wird verarbeitet...",
    applicant: "Bewerber",
    role: "Rolle",
    pageCreated: "Seite Erstellt",
    description: "Beschreibung",
    reason: "Warum Ne-Yo World beitreten?",
    link: "Link zur Fanseite",
    authorization: "Autorisierung bestätigt",
    status: "Status",
    officialFanPages: "Offizielle Fanseiten",
    officialFanPagesSubtitle: "Verwalte bereits für Ne-Yo World genehmigte Communities.",
    active: "Aktiv",
    inactive: "Inaktiv",
    deactivate: "Auf Website Deaktivieren",
    activate: "Auf Website Aktivieren",
    officialPagesError: "Offizielle Fanseiten konnten nicht geladen werden.",
    noOfficialFanPages: "Keine offiziellen Fanseiten vorhanden.",
    edit: "Bearbeiten",
    save: "Änderungen Speichern",
    cancel: "Abbrechen",
    editOfficialPage: "Offizielle Fanseite Bearbeiten",
    saving: "Speichern...",
    saved: "Änderungen gespeichert.",
    fanPageName: "Name der Fanseite",
    usernameLabel: "Benutzername",
    year: "Jahr",
    searchOfficialPages: "Nach Name oder Benutzername suchen",
    filterCountry: "Land",
    filterStatus: "Status",
    allCountries: "Alle Länder",
    allStatuses: "Alle Status",
    visibleOnSite: "Aktiv auf der Website",
    hiddenFromSite: "Inaktiv auf der Website",
    overview: "Projektübersicht",
    pendingApplications: "Ausstehend",
    approvedApplications: "Genehmigt",
    activePages: "Aktiv auf der Website",
    inactivePages: "Inaktiv auf der Website",
    representedCountries: "Vertretene Länder",
    countriesManagement: "Länder",
    countriesManagementSubtitle: "Verwalte die in Ne-Yo World verfügbaren Länder.",
    addCountry: "Land Hinzufügen",
    editCountry: "Land Bearbeiten",
    countryName: "Ländername",
    countryCode: "Ländercode",
    countrySlug: "Slug",
    countryActive: "Aktiv auf der Website",
    countryInactive: "Inaktiv auf der Website",
    activateCountry: "Land Aktivieren",
    deactivateCountry: "Land Deaktivieren",
    noCountries: "Keine Länder vorhanden.",
    countriesError: "Länder konnten nicht geladen werden.",
    countrySaved: "Land gespeichert.",
    countryMoments: "Ländermomente",
    countryMomentsSubtitle: "Verwalte die historischen Momente jedes Landes.",
    addMoment: "Moment Hinzufügen",
    editMoment: "Moment Bearbeiten",
    momentDate: "Veranstaltungsdatum",
    venue: "Venue",
    location: "Ort",
    titleLabel: "Titel",
    textLabel: "Text",
    displayOrder: "Reihenfolge",
    noMoments: "Keine Momente vorhanden.",
    momentsError: "Momente konnten nicht geladen werden.",
    momentSaved: "Moment gespeichert.",
    activateMoment: "Moment Aktivieren",
    deactivateMoment: "Moment Deaktivieren",
    countryContent: "Länderinhalte",
    countryContentSubtitle: "Bearbeite die übersetzten Texte jeder Länderseite.",
    editContent: "Inhalt Bearbeiten",
    contentLanguage: "Inhaltssprache",
    contentSaved: "Länderinhalt gespeichert.",
    contentError: "Länderinhalt konnte nicht geladen werden.",
    noCountryContent: "Kein Inhalt für dieses Land.",
    worldMessagesAdmin: "World Messages",
    worldMessagesAdminSubtitle: "Prüfe Fan-Nachrichten, bevor sie öffentlich angezeigt werden.",
    worldMessagesLoadError: "World Messages konnten nicht geladen werden.",
    worldMessagesUpdateError: "Diese Nachricht konnte nicht aktualisiert werden.",
    messageTranslations: "Übersetzungen",
    messageTranslationsSubtitle: "Übersetzungen hinzufügen oder bearbeiten, ohne die Originalnachricht des Fans zu ändern.",
    editTranslations: "Übersetzungen Bearbeiten",
    hideTranslations: "Übersetzungen Ausblenden",
    saveTranslations: "Übersetzungen Speichern",
    translationsSaved: "Übersetzungen erfolgreich gespeichert.",
    translationsSaveError: "Übersetzungen konnten nicht gespeichert werden.",
    translationFor: "Übersetzung",
    originalMessageNotice: "Die Originalnachricht bleibt genau so erhalten, wie sie gesendet wurde.",
    noWorldMessages: "Keine Nachrichten in dieser Kategorie.",
    messageFrom: "Nachricht von",
    originalLanguage: "Originalsprache",
    approveMessage: "Genehmigen",
    rejectMessage: "Ablehnen",
    revertMessage: "Zurück auf Ausstehend",
    approvedAt: "Genehmigt",
    messageText: "Nachricht",
    creating: "Erstellen...",
    deleteMessage: 'Löschen',
    deleteMessageConfirm: 'Diese World Message dauerhaft löschen? Die Übersetzungen werden ebenfalls gelöscht.',
    worldMessageDeleteError: 'Diese Nachricht konnte nicht gelöscht werden.',
    searchCountries: 'Länder suchen...',
    searchCountryContent: 'Länderinhalte suchen...',
  },
  IT: {
    admin: "Amministrazione",
    title: "Admin Ne-Yo World",
    subtitle: "Esamina le candidature delle pagine fan e decidi quali community possono entrare nel progetto.",
    email: "Email",
    password: "Password",
    signIn: "Accedi",
    signingIn: "Accesso...",
    signOut: "Esci",
    checking: "Verifica accesso...",
    noAccess: "Questo account non è autorizzato come amministratore.",
    loginError: "Accesso non riuscito. Controlla email e password.",
    loadError: "Impossibile caricare le candidature.",
    updateError: "Impossibile aggiornare questa candidatura.",
    pending: "In attesa",
    approved: "Approvate",
    rejected: "Rifiutate",
    all: "Tutte",
    applications: "Candidature",
    noApplications: "Nessuna candidatura in questa categoria.",
    fanPage: "Pagina Fan",
    country: "Paese",
    platform: "Piattaforma",
    submitted: "Inviata",
    view: "Vedi",
    approve: "Approva",
    reject: "Rifiuta",
    revert: "Annulla Decisione",
    processing: "Elaborazione...",
    applicant: "Candidato",
    role: "Ruolo",
    pageCreated: "Pagina Creata",
    description: "Descrizione",
    reason: "Perché entrare in Ne-Yo World?",
    link: "Link della Pagina",
    authorization: "Autorizzazione confermata",
    status: "Stato",
    officialFanPages: "Pagine Fan Ufficiali",
    officialFanPagesSubtitle: "Gestisci le community già approvate per Ne-Yo World.",
    active: "Attiva",
    inactive: "Inattiva",
    deactivate: "Disattiva dal Sito",
    activate: "Attiva sul Sito",
    officialPagesError: "Impossibile caricare le pagine fan ufficiali.",
    noOfficialFanPages: "Nessuna pagina fan ufficiale.",
    edit: "Modifica",
    save: "Salva Modifiche",
    cancel: "Annulla",
    editOfficialPage: "Modifica Pagina Fan Ufficiale",
    saving: "Salvataggio...",
    saved: "Modifiche salvate.",
    fanPageName: "Nome Pagina Fan",
    usernameLabel: "Username",
    year: "Anno",
    searchOfficialPages: "Cerca per nome o username",
    filterCountry: "Paese",
    filterStatus: "Stato",
    allCountries: "Tutti i Paesi",
    allStatuses: "Tutti gli Stati",
    visibleOnSite: "Attiva sul Sito",
    hiddenFromSite: "Inattiva sul Sito",
    overview: "Panoramica del Progetto",
    pendingApplications: "In Attesa",
    approvedApplications: "Approvate",
    activePages: "Attive sul Sito",
    inactivePages: "Inattive sul Sito",
    representedCountries: "Paesi Rappresentati",
    countriesManagement: "Paesi",
    countriesManagementSubtitle: "Gestisci i paesi disponibili in Ne-Yo World.",
    addCountry: "Aggiungi Paese",
    editCountry: "Modifica Paese",
    countryName: "Nome del Paese",
    countryCode: "Codice Paese",
    countrySlug: "Slug",
    countryActive: "Attivo sul Sito",
    countryInactive: "Inattivo sul Sito",
    activateCountry: "Attiva Paese",
    deactivateCountry: "Disattiva Paese",
    noCountries: "Nessun paese.",
    countriesError: "Impossibile caricare i paesi.",
    countrySaved: "Paese salvato.",
    countryMoments: "Momenti dei Paesi",
    countryMomentsSubtitle: "Gestisci i momenti storici di ogni paese.",
    addMoment: "Aggiungi Momento",
    editMoment: "Modifica Momento",
    momentDate: "Data Evento",
    venue: "Venue",
    location: "Luogo",
    titleLabel: "Titolo",
    textLabel: "Testo",
    displayOrder: "Ordine",
    noMoments: "Nessun momento.",
    momentsError: "Impossibile caricare i momenti.",
    momentSaved: "Momento salvato.",
    activateMoment: "Attiva Momento",
    deactivateMoment: "Disattiva Momento",
    countryContent: "Contenuti dei Paesi",
    countryContentSubtitle: "Modifica i testi tradotti di ogni pagina paese.",
    editContent: "Modifica Contenuto",
    contentLanguage: "Lingua del Contenuto",
    contentSaved: "Contenuto salvato.",
    contentError: "Impossibile caricare il contenuto.",
    noCountryContent: "Nessun contenuto per questo paese.",
    worldMessagesAdmin: "World Messages",
    worldMessagesAdminSubtitle: "Esamina i messaggi inviati dai fan prima che vengano pubblicati.",
    worldMessagesLoadError: "Impossibile caricare i World Messages.",
    worldMessagesUpdateError: "Impossibile aggiornare questo messaggio.",
    messageTranslations: "Traduzioni",
    messageTranslationsSubtitle: "Aggiungi o modifica le traduzioni senza cambiare il messaggio originale del fan.",
    editTranslations: "Modifica Traduzioni",
    hideTranslations: "Nascondi Traduzioni",
    saveTranslations: "Salva Traduzioni",
    translationsSaved: "Traduzioni salvate correttamente.",
    translationsSaveError: "Impossibile salvare le traduzioni.",
    translationFor: "Traduzione",
    originalMessageNotice: "Il messaggio originale viene conservato esattamente come è stato inviato.",
    noWorldMessages: "Nessun messaggio in questa categoria.",
    messageFrom: "Messaggio di",
    originalLanguage: "Lingua Originale",
    approveMessage: "Approva",
    rejectMessage: "Rifiuta",
    revertMessage: "Riporta in Attesa",
    approvedAt: "Approvato",
    messageText: "Messaggio",
    creating: "Creazione...",
    deleteMessage: 'Elimina',
    deleteMessageConfirm: 'Eliminare definitivamente questo World Message? Verranno eliminate anche le traduzioni.',
    worldMessageDeleteError: 'Impossibile eliminare questo messaggio.',
    searchCountries: 'Cerca paesi...',
    searchCountryContent: 'Cerca contenuti per paese...',
  },
  JA: {
    admin: "管理",
    title: "Ne-Yo World 管理",
    subtitle: "ファンページの申請を確認し、プロジェクトに参加できるコミュニティを決定します。",
    email: "メールアドレス",
    password: "パスワード",
    signIn: "ログイン",
    signingIn: "ログイン中...",
    signOut: "ログアウト",
    checking: "アクセスを確認中...",
    noAccess: "このアカウントには管理者権限がありません。",
    loginError: "ログインできませんでした。メールアドレスとパスワードを確認してください。",
    loadError: "申請を読み込めませんでした。",
    updateError: "申請を更新できませんでした。",
    pending: "審査待ち",
    approved: "承認済み",
    rejected: "却下済み",
    all: "すべて",
    applications: "申請",
    noApplications: "このカテゴリーには申請がありません。",
    fanPage: "ファンページ",
    country: "国",
    platform: "プラットフォーム",
    submitted: "送信日",
    view: "見る",
    approve: "承認",
    reject: "却下",
    revert: "決定を取り消す",
    processing: "処理中...",
    applicant: "申請者",
    role: "役割",
    pageCreated: "ページ開設年",
    description: "説明",
    reason: "Ne-Yo Worldに参加したい理由",
    link: "ファンページのリンク",
    authorization: "権限確認済み",
    status: "ステータス",
    officialFanPages: "公式ファンページ",
    officialFanPagesSubtitle: "Ne-Yo Worldで承認済みのコミュニティを管理します。",
    active: "有効",
    inactive: "無効",
    deactivate: "サイトで無効にする",
    activate: "サイトで有効にする",
    officialPagesError: "公式ファンページを読み込めませんでした。",
    noOfficialFanPages: "公式ファンページはまだありません。",
    edit: "編集",
    save: "変更を保存",
    cancel: "キャンセル",
    editOfficialPage: "公式ファンページを編集",
    saving: "保存中...",
    saved: "変更を保存しました。",
    fanPageName: "ファンページ名",
    usernameLabel: "ユーザー名",
    year: "年",
    searchOfficialPages: "名前またはユーザー名で検索",
    filterCountry: "国",
    filterStatus: "ステータス",
    allCountries: "すべての国",
    allStatuses: "すべてのステータス",
    visibleOnSite: "サイトで有効",
    hiddenFromSite: "サイトで無効",
    overview: "プロジェクト概要",
    pendingApplications: "保留中",
    approvedApplications: "承認済み",
    activePages: "サイトで有効",
    inactivePages: "サイトで無効",
    representedCountries: "参加国",
    countriesManagement: "国",
    countriesManagementSubtitle: "Ne-Yo Worldで利用できる国を管理します。",
    addCountry: "国を追加",
    editCountry: "国を編集",
    countryName: "国名",
    countryCode: "国コード",
    countrySlug: "Slug",
    countryActive: "サイトで有効",
    countryInactive: "サイトで無効",
    activateCountry: "国を有効化",
    deactivateCountry: "国を無効化",
    noCountries: "国がありません。",
    countriesError: "国を読み込めませんでした。",
    countrySaved: "国を保存しました。",
    countryMoments: "国のモーメント",
    countryMomentsSubtitle: "各国ページの歴史的なモーメントを管理します。",
    addMoment: "モーメントを追加",
    editMoment: "モーメントを編集",
    momentDate: "イベント日",
    venue: "会場",
    location: "場所",
    titleLabel: "タイトル",
    textLabel: "テキスト",
    displayOrder: "表示順",
    noMoments: "モーメントがありません。",
    momentsError: "モーメントを読み込めませんでした。",
    momentSaved: "モーメントを保存しました。",
    activateMoment: "モーメントを有効化",
    deactivateMoment: "モーメントを無効化",
    countryContent: "国のコンテンツ",
    countryContentSubtitle: "各国ページの翻訳テキストを編集します。",
    editContent: "コンテンツを編集",
    contentLanguage: "コンテンツ言語",
    contentSaved: "国のコンテンツを保存しました。",
    contentError: "国のコンテンツを読み込めませんでした。",
    noCountryContent: "この国のコンテンツはありません。",
    worldMessagesAdmin: "World Messages",
    worldMessagesAdminSubtitle: "ファンから送信されたメッセージを公開前に確認します。",
    worldMessagesLoadError: "World Messagesを読み込めませんでした。",
    worldMessagesUpdateError: "このメッセージを更新できませんでした。",
    messageTranslations: "翻訳",
    messageTranslationsSubtitle: "ファンの元のメッセージを変更せずに翻訳を追加・編集します。",
    editTranslations: "翻訳を編集",
    hideTranslations: "翻訳を隠す",
    saveTranslations: "翻訳を保存",
    translationsSaved: "翻訳を保存しました。",
    translationsSaveError: "翻訳を保存できませんでした。",
    translationFor: "翻訳",
    originalMessageNotice: "元のメッセージは送信された内容のまま保存されます。",
    noWorldMessages: "このカテゴリーにはメッセージがありません。",
    messageFrom: "メッセージ送信者",
    originalLanguage: "元の言語",
    approveMessage: "承認",
    rejectMessage: "却下",
    revertMessage: "審査待ちに戻す",
    approvedAt: "承認日時",
    messageText: "メッセージ",
    creating: "作成中...",
    deleteMessage: '削除',
    deleteMessageConfirm: 'このWorld Messageを完全に削除しますか？翻訳も削除されます。',
    worldMessageDeleteError: 'このメッセージを削除できませんでした。',
    searchCountries: '国を検索...',
    searchCountryContent: '国別コンテンツを検索...',
  },
};

function formatDate(value: string, language: Language) {
  const localeMap: Record<Language, string> = {
    EN: "en-US",
    PT: "pt-PT",
    ES: "es-ES",
    FR: "fr-FR",
    DE: "de-DE",
    IT: "it-IT",
    JA: "ja-JP",
  };

  return new Intl.DateTimeFormat(localeMap[language], {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toDateTimeLocal(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function AdminPage() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const profileAdmin = FAN_PAGE_PROFILE_ADMIN_LABELS[language];
  const profileEditorT = FAN_PAGE_TRANSLATION_EDITOR_LABELS[language];

  const [languageOpen, setLanguageOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [applications, setApplications] = useState<FanPageApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("pending");
  const [selectedApplication, setSelectedApplication] = useState<FanPageApplication | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [officialFanPages, setOfficialFanPages] = useState<OfficialFanPage[]>([]);
  const [loadingOfficialFanPages, setLoadingOfficialFanPages] = useState(false);
  const [officialFanPagesError, setOfficialFanPagesError] = useState("");
  const [officialProcessingId, setOfficialProcessingId] = useState<string | null>(null);
  const [editingOfficialPage, setEditingOfficialPage] = useState<OfficialFanPage | null>(null);
  const [officialEditForm, setOfficialEditForm] = useState({
    fan_page_name: "",
    username: "",
    country: "",
    platform: "",
    fan_page_link: "",
    created_year: "",
    description: "",
  });
  const [savingOfficialPage, setSavingOfficialPage] = useState(false);
  const [officialEditError, setOfficialEditError] = useState("");
  const [officialEditSuccess, setOfficialEditSuccess] = useState("");
  const [officialSearch, setOfficialSearch] = useState("");
  const [officialCountryFilter, setOfficialCountryFilter] = useState("all");
  const [officialStatusFilter, setOfficialStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [profileEditorLoading, setProfileEditorLoading] = useState(false);
  const [profileEditorSaving, setProfileEditorSaving] = useState(false);
  const [profileEditorPublishing, setProfileEditorPublishing] = useState(false);
  const [profileEditorError, setProfileEditorError] = useState("");
  const [profileEditorSuccess, setProfileEditorSuccess] = useState("");
  const [profileEditorData, setProfileEditorData] = useState<FanPageProfileEditorData | null>(null);
  const [profileEditorLanguage, setProfileEditorLanguage] = useState<Language>("EN");
  const [profileTranslationDrafts, setProfileTranslationDrafts] = useState<Record<Language, FanPageProfileTranslationDraft>>({
    EN: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
    PT: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
    ES: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
    FR: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
    DE: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
    IT: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
    JA: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
  });
  const [journeyTranslationDrafts, setJourneyTranslationDrafts] = useState<Record<string, Record<Language, { title:string; description:string }>>>({});
  const [translationPackageText, setTranslationPackageText] = useState("");
  const [translationImportText, setTranslationImportText] = useState("");
  const [translationWorkflowOpen, setTranslationWorkflowOpen] = useState(false);
  const [countries, setCountries] = useState<CountryRecord[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [countriesError, setCountriesError] = useState("");
  const [countryProcessingId, setCountryProcessingId] = useState<string | null>(null);
  const [editingCountry, setEditingCountry] = useState<CountryRecord | null>(null);
  const [countryFormOpen, setCountryFormOpen] = useState(false);
  const [savingCountry, setSavingCountry] = useState(false);
  const [countryFormError, setCountryFormError] = useState("");
  const [countryFormSuccess, setCountryFormSuccess] = useState("");
  const [countryForm, setCountryForm] = useState({
    name: "",
    slug: "",
    code: "",
  });
  const [countryMoments, setCountryMoments] = useState<CountryMoment[]>([]);
  const [loadingCountryMoments, setLoadingCountryMoments] = useState(false);
  const [countryMomentsError, setCountryMomentsError] = useState("");
  const [momentCountryFilter, setMomentCountryFilter] = useState("all");
  const [momentProcessingId, setMomentProcessingId] = useState<string | null>(null);
  const [momentFormOpen, setMomentFormOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState<CountryMoment | null>(null);
  const [savingMoment, setSavingMoment] = useState(false);
  const [momentFormError, setMomentFormError] = useState("");
  const [momentFormSuccess, setMomentFormSuccess] = useState("");
  const [momentForm, setMomentForm] = useState({
    country_id: "",
    year: "",
    event_date: "",
    venue: "",
    display_order: "0",
    date: "",
    location: "",
    title: "",
    text: "",
  });
  const [countryContents, setCountryContents] = useState<CountryContent[]>([]);
  const [loadingCountryContents, setLoadingCountryContents] = useState(false);
  const [countryContentsError, setCountryContentsError] = useState("");
  const [contentCountryId, setContentCountryId] = useState("");
  const [contentEditorOpen, setContentEditorOpen] = useState(false);
  const [contentDraft, setContentDraft] = useState<Record<string, string>>({});
  const [savingCountryContent, setSavingCountryContent] = useState(false);
  const [countryContentFormError, setCountryContentFormError] = useState("");
  const [countryContentFormSuccess, setCountryContentFormSuccess] = useState("");
  const [copyContentTargetLanguage, setCopyContentTargetLanguage] = useState<Language>("EN");
  const [worldMessages, setWorldMessages] = useState<WorldMessage[]>([]);
  const [loadingWorldMessages, setLoadingWorldMessages] = useState(false);
  const [worldMessagesError, setWorldMessagesError] = useState("");
  const [worldMessageFilter, setWorldMessageFilter] = useState<"all" | ApplicationStatus>("pending");
  const [worldMessageProcessingId, setWorldMessageProcessingId] = useState<string | null>(null);
  const [worldMessageTranslations, setWorldMessageTranslations] = useState<WorldMessageTranslation[]>([]);
  const [openWorldMessageTranslations, setOpenWorldMessageTranslations] = useState<Record<string, boolean>>({});
  const [worldMessageTranslationDrafts, setWorldMessageTranslationDrafts] = useState<Record<string, Record<string, string>>>({});
  const [worldMessageTranslationSavingId, setWorldMessageTranslationSavingId] = useState<string | null>(null);
  const [worldMessageTranslationSuccessId, setWorldMessageTranslationSuccessId] = useState<string | null>(null);

  const [fanMemories, setFanMemories] = useState<FanMemory[]>([]);
  const [loadingFanMemories, setLoadingFanMemories] = useState(false);
  const [fanMemoriesError, setFanMemoriesError] = useState("");
  const [fanMemoryFilter, setFanMemoryFilter] = useState<"all" | ApplicationStatus>("pending");
  const [fanMemoryProcessingId, setFanMemoryProcessingId] = useState<string | null>(null);

  const [worldNews, setWorldNews] = useState<WorldNewsItem[]>([]);
  const [loadingWorldNews, setLoadingWorldNews] = useState(false);
  const [worldNewsError, setWorldNewsError] = useState("");
  const [worldNewsFilter, setWorldNewsFilter] = useState<"all" | WorldNewsStatus>("pending");
  const [worldNewsProcessingId, setWorldNewsProcessingId] = useState<string | null>(null);
  const [worldNewsFormOpen, setWorldNewsFormOpen] = useState(false);
  const [editingWorldNews, setEditingWorldNews] = useState<WorldNewsItem | null>(null);
  const [savingWorldNews, setSavingWorldNews] = useState(false);
  const [importingWorldNews, setImportingWorldNews] = useState(false);
  const [worldNewsImportUrl, setWorldNewsImportUrl] = useState("");
  const [worldNewsFormError, setWorldNewsFormError] = useState("");
  const [worldNewsFormSuccess, setWorldNewsFormSuccess] = useState("");
  const [worldNewsForm, setWorldNewsForm] = useState({
    category: "music" as WorldNewsCategory,
    source_name: "",
    source_url: "",
    published_at: "",
    event_date: "",
    status: "pending" as WorldNewsStatus,
  });
  const [worldNewsTranslationDrafts, setWorldNewsTranslationDrafts] = useState<Record<Language, { title: string; summary: string }>>({
    EN: { title: "", summary: "" },
    PT: { title: "", summary: "" },
    ES: { title: "", summary: "" },
    FR: { title: "", summary: "" },
    DE: { title: "", summary: "" },
    IT: { title: "", summary: "" },
    JA: { title: "", summary: "" },
  });

  const [openAdminSections, setOpenAdminSections] = useState<Record<string, boolean>>({
    countries: false,
    countryContent: false,
    countryMoments: false,
    worldNews: false,
    worldMessages: false,
    fanMemories: false,
    applications: false,
    officialFanPages: false,
  });
  const [countrySearch, setCountrySearch] = useState("");
  const [countryContentSearch, setCountryContentSearch] = useState("");

  function chooseLanguage(selected: Language) {
    setLanguage(selected);
    setLanguageOpen(false);
  }

  async function checkAdminAccess() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setSessionChecked(true);
      return;
    }

    setIsAuthenticated(true);

    const { data, error } = await supabase.rpc("is_admin");

    if (error || data !== true) {
      setIsAdmin(false);
      setSessionChecked(true);
      return;
    }

    setIsAdmin(true);
    setSessionChecked(true);
  }

  async function loadApplications() {
    setLoadingApplications(true);
    setApplicationsError("");

    const { data, error } = await supabase
      .from("fan_page_applications")
      .select("*")
      .order("created_at", { ascending: false });

    setLoadingApplications(false);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error(
        "Admin load error:",
        diagnostic
      );

      setApplicationsError(t.loadError);

      return;
    }

    setApplications((data ?? []) as FanPageApplication[]);
  }

  async function loadOfficialFanPages() {
    setLoadingOfficialFanPages(true);
    setOfficialFanPagesError("");

    const { data, error } = await supabase
      .from("fan_pages")
      .select("*")
      .order("joined_at", { ascending: false });

    setLoadingOfficialFanPages(false);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("Official fan pages load error:", diagnostic);
      setOfficialFanPagesError(`${t.officialPagesError}\n\n${diagnostic}`);
      return;
    }

    setOfficialFanPages((data ?? []) as OfficialFanPage[]);
  }

  async function loadCountries() {
    setLoadingCountries(true);
    setCountriesError("");

    const { data, error } = await supabase
      .from("countries")
      .select("*")
      .order("name", { ascending: true });

    setLoadingCountries(false);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("Countries load error:", diagnostic);
      setCountriesError(`${t.countriesError}\n\n${diagnostic}`);
      return;
    }

    setCountries((data ?? []) as CountryRecord[]);
  }

  async function loadCountryMoments() {
    setLoadingCountryMoments(true);
    setCountryMomentsError("");

    const { data, error } = await supabase
      .from("country_moments")
      .select("*")
      .order("event_date", { ascending: true })
      .order("display_order", { ascending: true });

    setLoadingCountryMoments(false);

    if (error) {
      console.error("Country moments load error:", error);
      setCountryMomentsError(`${t.momentsError}\n\nmessage: ${error.message}\ncode: ${error.code ?? "—"}`);
      return;
    }

    setCountryMoments((data ?? []) as CountryMoment[]);
  }

  async function loadCountryContents() {
    setLoadingCountryContents(true);
    setCountryContentsError("");
    const { data, error } = await supabase
      .from("country_content")
      .select("*")
      .order("updated_at", { ascending: false });
    setLoadingCountryContents(false);
    if (error) {
      console.error("Country content load error:", error);
      setCountryContentsError(`${t.contentError}\n\nmessage: ${error.message}\ncode: ${error.code ?? "—"}`);
      return;
    }
    setCountryContents((data ?? []) as CountryContent[]);
  }

  async function loadWorldMessages() {
    setLoadingWorldMessages(true);
    setWorldMessagesError("");

    const { data, error } = await supabase
      .from("world_messages")
      .select("*")
      .order("created_at", { ascending: false });

    setLoadingWorldMessages(false);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("World Messages load error:", diagnostic);
      setWorldMessagesError(`${t.worldMessagesLoadError}\n\n${diagnostic}`);
      return;
    }

    setWorldMessages((data ?? []) as WorldMessage[]);
  }

  async function loadWorldMessageTranslations() {
    const { data, error } = await supabase
      .from("world_message_translations")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("World Message translations load error:", error);
      return;
    }

    setWorldMessageTranslations((data ?? []) as WorldMessageTranslation[]);
  }

  async function loadFanMemories() {
    setLoadingFanMemories(true);
    setFanMemoriesError("");

    const { data, error } = await supabase
      .from("fan_memories")
      .select(`
        id,
        display_name,
        country_code,
        original_language,
        story,
        memory_date,
        status,
        created_at,
        updated_at,
        fan_memory_media (
          id,
          memory_id,
          media_type,
          storage_bucket,
          storage_path,
          mime_type,
          file_size_bytes,
          duration_seconds,
          display_order,
          created_at
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      setLoadingFanMemories(false);
      const diagnostic = [
        `message: ${error.message ?? "-"}`,
        `code: ${error.code ?? "-"}`,
        `details: ${error.details ?? "-"}`,
        `hint: ${error.hint ?? "-"}`,
      ].join("\n");
      console.error("Fan Memories load error:", diagnostic);
      setFanMemoriesError(`Could not load Fan Memories.\n\n${diagnostic}`);
      return;
    }

    const rows = (data ?? []) as FanMemory[];
    const withUrls = await Promise.all(rows.map(async (memory) => {
      const media = [...(memory.fan_memory_media ?? [])].sort((a, b) => a.display_order - b.display_order);
      const signedMedia = await Promise.all(media.map(async (item) => {
        const { data: signed, error: signedError } = await supabase.storage
          .from(item.storage_bucket)
          .createSignedUrl(item.storage_path, 60 * 60);
        if (signedError) {
          console.warn("Fan Memory signed URL error:", signedError);
          return { ...item, signed_url: null };
        }
        return { ...item, signed_url: signed?.signedUrl ?? null };
      }));
      return { ...memory, fan_memory_media: signedMedia };
    }));

    setFanMemories(withUrls);
    setLoadingFanMemories(false);
  }

  async function loadWorldNews() {
    setLoadingWorldNews(true);
    setWorldNewsError("");

    const { data, error } = await supabase
      .from("world_news")
      .select(`
        id,
        category,
        source_name,
        source_url,
        published_at,
        event_date,
        status,
        created_at,
        updated_at,
        world_news_translations (
          id,
          news_id,
          language,
          title,
          summary,
          created_at,
          updated_at
        )
      `)
      .order("published_at", { ascending: false });

    setLoadingWorldNews(false);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "-"}`,
        `code: ${error.code ?? "-"}`,
        `details: ${error.details ?? "-"}`,
        `hint: ${error.hint ?? "-"}`,
      ].join("\n");

      console.error("World News load error:", diagnostic);
      setWorldNewsError(`Could not load World News.\n\n${diagnostic}`);
      return;
    }

    setWorldNews((data ?? []) as WorldNewsItem[]);
  }

  useEffect(() => {
    checkAdminAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminAccess();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (sessionChecked && isAuthenticated && isAdmin) {
      loadApplications();
      loadOfficialFanPages();
      loadCountries();
      loadCountryMoments();
      loadCountryContents();
      loadWorldNews();
      loadWorldMessages();
      loadFanMemories();
      loadWorldMessageTranslations();
    }
  }, [sessionChecked, isAuthenticated, isAdmin]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loginLoading) return;

    setLoginError("");
    setLoginLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoginLoading(false);

    if (error) {
      console.error("Admin login error:", error);
      setLoginError(t.loginError);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setApplications([]);
    setOfficialFanPages([]);
    setCountries([]);
    setCountryMoments([]);
    setCountryContents([]);
    setWorldNews([]);
    setWorldMessages([]);
    setFanMemories([]);
    setWorldMessageTranslations([]);
    setOpenWorldMessageTranslations({});
    setWorldMessageTranslationDrafts({});
    setSelectedApplication(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  }

  async function updateStatus(
    application: FanPageApplication,
    status: ApplicationStatus
  ) {
    if (processingId) return;

    setApplicationsError("");
    setProcessingId(application.id);

    try {
      if (status === "approved") {
        const { error: approvalError } = await supabase.rpc(
          "admin_approve_fan_page_application",
          { p_application_id: application.id }
        );

        if (approvalError) {
          console.error("Fan page approval error:", {
            message: approvalError.message,
            code: approvalError.code,
            details: approvalError.details,
            hint: approvalError.hint,
          });
          setApplicationsError(t.updateError);
          return;
        }
      } else {
        // Rejected or reverted applications must stay hidden and unpublished.
        const { error: deactivateError } = await supabase
          .from("fan_pages")
          .update({
            is_active: false,
            profile_is_published: false,
            updated_at: new Date().toISOString(),
            profile_updated_at: new Date().toISOString(),
          })
          .eq("application_id", application.id);

        if (deactivateError) {
          console.error("Fan page deactivation error:", {
            message: deactivateError.message,
            code: deactivateError.code,
            details: deactivateError.details,
            hint: deactivateError.hint,
          });
          setApplicationsError(t.updateError);
          return;
        }

        const { error: applicationError } = await supabase
          .from("fan_page_applications")
          .update({ status })
          .eq("id", application.id);

        if (applicationError) {
          console.error("Admin update error:", {
            message: applicationError.message,
            code: applicationError.code,
            details: applicationError.details,
            hint: applicationError.hint,
          });
          setApplicationsError(t.updateError);
          return;
        }
      }

      setApplications((current) =>
        current.map((item) =>
          item.id === application.id ? { ...item, status } : item
        )
      );

      setSelectedApplication((current) =>
        current?.id === application.id ? { ...current, status } : current
      );

      await Promise.all([
        loadApplications(),
        loadOfficialFanPages(),
      ]);
    } finally {
      setProcessingId(null);
    }
  }

  function emptyWorldNewsTranslations() {
    return {
      EN: { title: "", summary: "" },
      PT: { title: "", summary: "" },
      ES: { title: "", summary: "" },
      FR: { title: "", summary: "" },
      DE: { title: "", summary: "" },
      IT: { title: "", summary: "" },
      JA: { title: "", summary: "" },
    } as Record<Language, { title: string; summary: string }>;
  }

  function openNewWorldNews() {
    setEditingWorldNews(null);
    setWorldNewsForm({
      category: "music",
      source_name: "",
      source_url: "",
      published_at: toDateTimeLocal(new Date().toISOString()),
      event_date: "",
      status: "pending",
    });
    setWorldNewsTranslationDrafts(emptyWorldNewsTranslations());
    setWorldNewsImportUrl("");
    setWorldNewsFormError("");
    setWorldNewsFormSuccess("");
    setWorldNewsFormOpen(true);
  }

  function openWorldNewsEditor(item: WorldNewsItem) {
    const drafts = emptyWorldNewsTranslations();

    (item.world_news_translations ?? []).forEach((translation) => {
      if (WORLD_NEWS_LANGUAGES.includes(translation.language)) {
        drafts[translation.language] = {
          title: translation.title ?? "",
          summary: translation.summary ?? "",
        };
      }
    });

    setEditingWorldNews(item);
    setWorldNewsForm({
      category: item.category,
      source_name: item.source_name,
      source_url: item.source_url,
      published_at: toDateTimeLocal(item.published_at),
      event_date: item.event_date ?? "",
      status: item.status,
    });
    setWorldNewsTranslationDrafts(drafts);
    setWorldNewsImportUrl(item.source_url);
    setWorldNewsFormError("");
    setWorldNewsFormSuccess("");
    setWorldNewsFormOpen(true);
  }

  function closeWorldNewsForm() {
    if (savingWorldNews) return;
    setWorldNewsFormOpen(false);
    setEditingWorldNews(null);
    setWorldNewsFormError("");
    setWorldNewsFormSuccess("");
  }

  async function importWorldNewsFromUrl() {
    const url = worldNewsImportUrl.trim();

    if (!url) {
      setWorldNewsFormError("Paste a news URL first.");
      return;
    }

    setImportingWorldNews(true);
    setWorldNewsFormError("");
    setWorldNewsFormSuccess("");

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Your Admin session has expired. Sign in again.");
      }

      const response = await fetch("/api/world-news/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Could not import this news URL.");
      }

      setWorldNewsForm((current) => ({
        ...current,
        category: payload.story.category as WorldNewsCategory,
        source_name: payload.story.source_name,
        source_url: payload.story.source_url,
        published_at: toDateTimeLocal(payload.story.published_at),
        event_date: "",
        status: editingWorldNews?.status ?? "pending",
      }));

      const nextDrafts = emptyWorldNewsTranslations();
      WORLD_NEWS_LANGUAGES.forEach((code) => {
        const translation = payload.story.translations?.[code];
        if (translation) {
          nextDrafts[code] = {
            title: translation.title ?? "",
            summary: translation.summary ?? "",
          };
        }
      });

      setWorldNewsTranslationDrafts(nextDrafts);
      setWorldNewsFormSuccess(
        payload.story.published_at
          ? "Imported successfully. Review the preview, then save it as Pending."
          : "Imported successfully, but the original publication date could not be verified. Add the publication date before saving."
      );
    } catch (error) {
      setWorldNewsFormError(
        error instanceof Error ? error.message : "Could not import this news URL."
      );
    } finally {
      setImportingWorldNews(false);
    }
  }

  function updateWorldNewsTranslation(
    languageCode: Language,
    field: "title" | "summary",
    value: string
  ) {
    setWorldNewsTranslationDrafts((current) => ({
      ...current,
      [languageCode]: {
        ...current[languageCode],
        [field]: value,
      },
    }));
    setWorldNewsFormSuccess("");
  }

  async function saveWorldNews(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingWorldNews) return;

    setWorldNewsFormError("");
    setWorldNewsFormSuccess("");

    const sourceName = worldNewsForm.source_name.trim();
    const sourceUrl = worldNewsForm.source_url.trim();

    if (!sourceName || !sourceUrl || !worldNewsForm.published_at) {
      setWorldNewsFormError("Source, source URL and publication date are required.");
      return;
    }

    const incompleteLanguage = WORLD_NEWS_LANGUAGES.find((code) => {
      const draft = worldNewsTranslationDrafts[code];
      return !draft.title.trim() || !draft.summary.trim();
    });

    if (incompleteLanguage) {
      setWorldNewsFormError(
        `Title and summary are required in all 7 languages. Missing: ${incompleteLanguage}.`
      );
      return;
    }

    setSavingWorldNews(true);

    const payload = {
      category: worldNewsForm.category,
      source_name: sourceName,
      source_url: sourceUrl,
      published_at: new Date(worldNewsForm.published_at).toISOString(),
      event_date: worldNewsForm.event_date || null,
      status: worldNewsForm.status,
    };

    let newsId = editingWorldNews?.id ?? "";
    let createdNew = false;

    if (editingWorldNews) {
      const { error } = await supabase
        .from("world_news")
        .update(payload)
        .eq("id", editingWorldNews.id);

      if (error) {
        setSavingWorldNews(false);
        setWorldNewsFormError(`Could not update World News. ${error.message}`);
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("world_news")
        .insert(payload)
        .select("id")
        .single();

      if (error || !data) {
        setSavingWorldNews(false);
        setWorldNewsFormError(`Could not create World News. ${error?.message ?? "Unknown error"}`);
        return;
      }

      newsId = data.id;
      createdNew = true;
    }

    const translationRows = WORLD_NEWS_LANGUAGES.map((code) => ({
      news_id: newsId,
      language: code,
      title: worldNewsTranslationDrafts[code].title.trim(),
      summary: worldNewsTranslationDrafts[code].summary.trim(),
    }));

    const { error: translationError } = await supabase
      .from("world_news_translations")
      .upsert(translationRows, { onConflict: "news_id,language" });

    if (translationError) {
      if (createdNew) {
        await supabase.from("world_news").delete().eq("id", newsId);
      }

      setSavingWorldNews(false);
      setWorldNewsFormError(
        `Could not save World News translations. ${translationError.message}`
      );
      return;
    }

    setSavingWorldNews(false);
    setWorldNewsFormSuccess("World News saved successfully.");
    await loadWorldNews();

    setTimeout(() => {
      setWorldNewsFormOpen(false);
      setEditingWorldNews(null);
      setWorldNewsFormSuccess("");
    }, 350);
  }

  async function updateWorldNewsStatus(item: WorldNewsItem, status: WorldNewsStatus) {
    if (worldNewsProcessingId) return;

    if (status === "approved") {
      const translations = item.world_news_translations ?? [];
      const incompleteLanguage = WORLD_NEWS_LANGUAGES.find((code) => {
        const translation = translations.find((entry) => entry.language === code);
        return !translation?.title?.trim() || !translation?.summary?.trim();
      });

      if (incompleteLanguage) {
        setWorldNewsError(
          `Cannot approve this story yet. Missing title or summary in ${incompleteLanguage}.`
        );
        return;
      }
    }

    setWorldNewsError("");
    setWorldNewsProcessingId(item.id);

    const { error } = await supabase
      .from("world_news")
      .update({ status })
      .eq("id", item.id);

    setWorldNewsProcessingId(null);

    if (error) {
      setWorldNewsError(`Could not update World News. ${error.message}`);
      return;
    }

    setWorldNews((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, status } : entry
      )
    );
  }

  async function deleteWorldNews(item: WorldNewsItem) {
    if (worldNewsProcessingId) return;

    const title =
      item.world_news_translations?.find((entry) => entry.language === "EN")?.title ??
      item.world_news_translations?.[0]?.title ??
      "this story";

    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setWorldNewsError("");
    setWorldNewsProcessingId(item.id);

    const { error } = await supabase
      .from("world_news")
      .delete()
      .eq("id", item.id);

    setWorldNewsProcessingId(null);

    if (error) {
      setWorldNewsError(`Could not delete World News. ${error.message}`);
      return;
    }

    setWorldNews((current) => current.filter((entry) => entry.id !== item.id));
  }

  function worldNewsTitle(item: WorldNewsItem) {
    return (
      item.world_news_translations?.find((entry) => entry.language === language)?.title ??
      item.world_news_translations?.find((entry) => entry.language === "EN")?.title ??
      item.world_news_translations?.[0]?.title ??
      "Untitled"
    );
  }

  async function updateFanMemoryStatus(memory: FanMemory, status: ApplicationStatus) {
    if (fanMemoryProcessingId) return;
    setFanMemoriesError("");
    setFanMemoryProcessingId(memory.id);

    const { error } = await supabase
      .from("fan_memories")
      .update({ status })
      .eq("id", memory.id);

    setFanMemoryProcessingId(null);

    if (error) {
      setFanMemoriesError(`Could not update Fan Memory. ${error.message}`);
      return;
    }

    setFanMemories((current) =>
      current.map((item) => item.id === memory.id ? { ...item, status } : item)
    );
  }

  async function deleteFanMemory(memory: FanMemory) {
    if (fanMemoryProcessingId) return;
    if (!window.confirm(`Delete the Fan Memory from ${memory.display_name}? This cannot be undone.`)) return;

    setFanMemoriesError("");
    setFanMemoryProcessingId(memory.id);

    for (const media of memory.fan_memory_media ?? []) {
      const { error: storageError } = await supabase.storage
        .from(media.storage_bucket)
        .remove([media.storage_path]);
      if (storageError) {
        setFanMemoryProcessingId(null);
        setFanMemoriesError(`Could not delete Fan Memory media. ${storageError.message}`);
        return;
      }
    }

    const { error } = await supabase
      .from("fan_memories")
      .delete()
      .eq("id", memory.id);

    setFanMemoryProcessingId(null);

    if (error) {
      setFanMemoriesError(`Could not delete Fan Memory. ${error.message}`);
      return;
    }

    setFanMemories((current) => current.filter((item) => item.id !== memory.id));
  }

  function formatBytes(bytes: number) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
    return `${(bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 1 : 2)} MB`;
  }

  function toggleAdminSection(section: string) {
    setOpenAdminSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  }

  async function deleteWorldMessage(message: WorldMessage) {
    if (worldMessageProcessingId) return;
    if (!window.confirm(t.deleteMessageConfirm)) return;

    setWorldMessagesError("");
    setWorldMessageProcessingId(message.id);

    const { error } = await supabase
      .from("world_messages")
      .delete()
      .eq("id", message.id);

    setWorldMessageProcessingId(null);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("World Message delete error:", diagnostic);
      setWorldMessagesError(`${t.worldMessageDeleteError}\n\n${diagnostic}`);
      return;
    }

    setWorldMessages((current) => current.filter((item) => item.id !== message.id));
    setWorldMessageTranslations((current) => current.filter((item) => item.message_id !== message.id));
    setOpenWorldMessageTranslations((current) => {
      const next = { ...current };
      delete next[message.id];
      return next;
    });
    setWorldMessageTranslationDrafts((current) => {
      const next = { ...current };
      delete next[message.id];
      return next;
    });
  }

  async function updateWorldMessageStatus(
    message: WorldMessage,
    status: ApplicationStatus
  ) {
    if (worldMessageProcessingId) return;

    setWorldMessagesError("");
    setWorldMessageProcessingId(message.id);

    const payload = {
      status,
      approved_at: status === "approved" ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from("world_messages")
      .update(payload)
      .eq("id", message.id)
      .select()
      .single();

    setWorldMessageProcessingId(null);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("World Message update error:", diagnostic);
      setWorldMessagesError(`${t.worldMessagesUpdateError}\n\n${diagnostic}`);
      return;
    }

    const saved = data as WorldMessage;
    setWorldMessages((current) =>
      current.map((item) => (item.id === saved.id ? saved : item))
    );
  }

  function translationForMessage(messageId: string, languageCode: string) {
    return worldMessageTranslations.find(
      (item) =>
        item.message_id === messageId &&
        item.language_code === languageCode
    );
  }

  function toggleWorldMessageTranslations(message: WorldMessage) {
    const isOpening = !openWorldMessageTranslations[message.id];

    setOpenWorldMessageTranslations((current) => ({
      ...current,
      [message.id]: isOpening,
    }));

    if (isOpening && !worldMessageTranslationDrafts[message.id]) {
      const draft: Record<string, string> = {};

      WORLD_MESSAGE_LANGUAGES.forEach(({ code }) => {
        const existing = translationForMessage(message.id, code);
        draft[code] = existing?.translated_text ?? "";
      });

      setWorldMessageTranslationDrafts((current) => ({
        ...current,
        [message.id]: draft,
      }));
    }

    setWorldMessageTranslationSuccessId(null);
  }

  function updateWorldMessageTranslationDraft(
    messageId: string,
    languageCode: string,
    value: string
  ) {
    setWorldMessageTranslationDrafts((current) => ({
      ...current,
      [messageId]: {
        ...(current[messageId] ?? {}),
        [languageCode]: value,
      },
    }));
    setWorldMessageTranslationSuccessId(null);
  }

  async function saveWorldMessageTranslations(message: WorldMessage) {
    if (worldMessageTranslationSavingId) return;

    setWorldMessagesError("");
    setWorldMessageTranslationSuccessId(null);
    setWorldMessageTranslationSavingId(message.id);

    const draft = worldMessageTranslationDrafts[message.id] ?? {};
    const rows = WORLD_MESSAGE_LANGUAGES
      .filter(({ code }) => code !== message.original_language)
      .map(({ code }) => ({
        message_id: message.id,
        language_code: code,
        translated_text: (draft[code] ?? "").trim(),
        is_published: true,
      }))
      .filter((row) => row.translated_text.length > 0);

    if (rows.length === 0) {
      setWorldMessageTranslationSavingId(null);
      setWorldMessageTranslationSuccessId(message.id);
      return;
    }

    const { error } = await supabase
      .from("world_message_translations")
      .upsert(rows, {
        onConflict: "message_id,language_code",
      });

    setWorldMessageTranslationSavingId(null);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("World Message translations save error:", diagnostic);
      setWorldMessagesError(`${t.translationsSaveError}\n\n${diagnostic}`);
      return;
    }

    await loadWorldMessageTranslations();
    setWorldMessageTranslationSuccessId(message.id);
  }

  function makeCountrySlug(value: string) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function openNewCountry() {
    setEditingCountry(null);
    setCountryForm({
      name: "",
      slug: "",
      code: "",
    });
    setCountryFormError("");
    setCountryFormSuccess("");
    setCountryFormOpen(true);
  }

  function openCountryEditor(country: CountryRecord) {
    setEditingCountry(country);
    setCountryForm({
      name: country.name,
      slug: country.slug,
      code: country.code,
    });
    setCountryFormError("");
    setCountryFormSuccess("");
    setCountryFormOpen(true);
  }

  function closeCountryForm() {
    if (savingCountry) return;
    setCountryFormOpen(false);
    setEditingCountry(null);
    setCountryFormError("");
    setCountryFormSuccess("");
  }

  async function saveCountry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingCountry) return;

    const payload = {
      name: countryForm.name.trim(),
      slug: makeCountrySlug(countryForm.slug || countryForm.name),
      code: countryForm.code.trim().toUpperCase(),
      updated_at: new Date().toISOString(),
    };

    setSavingCountry(true);
    setCountryFormError("");
    setCountryFormSuccess("");

    const query = editingCountry
      ? supabase
          .from("countries")
          .update(payload)
          .eq("id", editingCountry.id)
          .select()
          .single()
      : supabase
          .from("countries")
          .insert({
            ...payload,
            is_active: true,
          })
          .select()
          .single();

    const { data, error } = await query;

    setSavingCountry(false);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("Country save error:", diagnostic);
      setCountryFormError(`${t.updateError}\n\n${diagnostic}`);
      return;
    }

    const savedCountry = data as CountryRecord;

    setCountries((current) => {
      const exists = current.some((country) => country.id === savedCountry.id);

      if (exists) {
        return current
          .map((country) =>
            country.id === savedCountry.id ? savedCountry : country
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      }

      return [...current, savedCountry].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });

    setEditingCountry(savedCountry);
    setCountryForm({
      name: savedCountry.name,
      slug: savedCountry.slug,
      code: savedCountry.code,
    });
    setCountryFormSuccess(t.countrySaved);
  }

  async function toggleCountry(country: CountryRecord) {
    if (countryProcessingId) return;

    setCountriesError("");
    setCountryProcessingId(country.id);

    const nextActive = !country.is_active;

    const { error } = await supabase
      .from("countries")
      .update({
        is_active: nextActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", country.id);

    setCountryProcessingId(null);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("Country status error:", diagnostic);
      setCountriesError(`${t.updateError}\n\n${diagnostic}`);
      return;
    }

    setCountries((current) =>
      current.map((item) =>
        item.id === country.id ? { ...item, is_active: nextActive } : item
      )
    );
  }

  function openCountryContentEditor(countryId: string) {
    const record = countryContents.find((item) => item.country_id === countryId);
    const selectedLanguage = (record?.translations?.[language] ?? {}) as Record<string, string>;
    const fallback = (record?.translations?.EN ?? {}) as Record<string, string>;

    // For a brand-new country there is no country_content record yet.
    // Start with the standard fields used by CountryPage.
    const standardKeys = [
      "backToCountries",
      "worldLabel",
      "welcomeTo",
      "heroText",
      "motto",
      "countryLabel",
      "countryIntroTitle",
      "countryIntro",
      "historyLabel",
      "historyTitle",
      "historyIntro",
      "fanPagesLabel",
      "fanPagesTitle",
      "fanPagesText",
      "pageSince",
      "fanSince",
      "behindPage",
      "visitInstagram",
      "morePages",
      "morePagesText",
      "joinProject",
      "memoriesLabel",
      "gallery",
      "galleryText",
      "memory",
      "galleryComing",
      "messagesLabel",
      "messagesTitle",
      "messagesText",
      "worldMessages",
      "finalLabel",
      "finalLine1",
      "finalLine2",
      "finalLine3",
      "finalText",
      "exploreWorld",
      "home",
      "countries",
      "messages",
      "neyo",
      "about",
    ];

    const keys = Array.from(
      new Set([
        ...standardKeys,
        ...Object.keys(fallback),
        ...Object.keys(selectedLanguage),
      ])
    );

    const draft: Record<string, string> = {};
    keys.forEach((key) => {
      draft[key] = selectedLanguage[key] ?? "";
    });
    setContentCountryId(countryId);
    setContentDraft(draft);
    setCountryContentFormError("");
    setCountryContentFormSuccess("");
    setContentEditorOpen(true);
  }

  function closeCountryContentEditor() {
    if (savingCountryContent) return;
    setContentEditorOpen(false);
    setCountryContentFormError("");
    setCountryContentFormSuccess("");
  }

  async function copyCountryContentToLanguage() {
    if (!contentCountryId || savingCountryContent) return;

    if (copyContentTargetLanguage === language) {
      setCountryContentFormError("Choose a different language to copy the content to.");
      return;
    }

    const hasSourceContent = Object.values(contentDraft).some(
      (value) => value.trim().length > 0
    );

    if (!hasSourceContent) {
      setCountryContentFormError(
        `Cannot copy ${language} → ${copyContentTargetLanguage} because the source language is empty.`
      );
      return;
    }

    const existing = countryContents.find((item) => item.country_id === contentCountryId);
    const targetContent = existing?.translations?.[copyContentTargetLanguage] ?? {};
    const targetHasContent = Object.values(targetContent).some(
      (value) => String(value ?? "").trim().length > 0
    );

    if (targetHasContent) {
      const confirmed = window.confirm(
        `${copyContentTargetLanguage} already has content. Copying ${language} → ${copyContentTargetLanguage} will replace it. Continue?`
      );

      if (!confirmed) return;
    }

    const translations = {
      ...(existing?.translations ?? {}),
      [copyContentTargetLanguage]: { ...contentDraft },
    };

    setSavingCountryContent(true);
    setCountryContentFormError("");
    setCountryContentFormSuccess("");

    const payload = {
      country_id: contentCountryId,
      translations,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    const query = existing
      ? supabase.from("country_content").update(payload).eq("id", existing.id).select().single()
      : supabase.from("country_content").insert(payload).select().single();

    const { data, error } = await query;
    setSavingCountryContent(false);

    if (error) {
      console.error("Country content copy error:", error);
      setCountryContentFormError(
        `${t.updateError}\n\nmessage: ${error.message}\ncode: ${error.code ?? "—"}`
      );
      return;
    }

    const saved = data as CountryContent;
    setCountryContents((current) =>
      current.some((item) => item.id === saved.id)
        ? current.map((item) => (item.id === saved.id ? saved : item))
        : [...current, saved]
    );

    setCountryContentFormSuccess(
      `Copied ${language} → ${copyContentTargetLanguage} successfully.`
    );
  }

  async function saveCountryContent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!contentCountryId || savingCountryContent) return;
    const existing = countryContents.find((item) => item.country_id === contentCountryId);
    const translations = { ...(existing?.translations ?? {}), [language]: contentDraft };
    setSavingCountryContent(true);
    setCountryContentFormError("");
    setCountryContentFormSuccess("");
    const payload = { country_id: contentCountryId, translations, is_active: true, updated_at: new Date().toISOString() };
    const query = existing
      ? supabase.from("country_content").update(payload).eq("id", existing.id).select().single()
      : supabase.from("country_content").insert(payload).select().single();
    const { data, error } = await query;
    setSavingCountryContent(false);
    if (error) {
      console.error("Country content save error:", error);
      setCountryContentFormError(`${t.updateError}\n\nmessage: ${error.message}\ncode: ${error.code ?? "—"}`);
      return;
    }
    const saved = data as CountryContent;
    setCountryContents((current) => current.some((item) => item.id === saved.id)
      ? current.map((item) => item.id === saved.id ? saved : item)
      : [...current, saved]);
    setCountryContentFormSuccess(t.contentSaved);
  }

  function openNewMoment() {
    setEditingMoment(null);
    setMomentForm({
      country_id: momentCountryFilter !== "all" ? momentCountryFilter : (countries[0]?.id ?? ""),
      year: "",
      event_date: "",
      venue: "",
      display_order: "0",
      date: "",
      location: "",
      title: "",
      text: "",
    });
    setMomentFormError("");
    setMomentFormSuccess("");
    setMomentFormOpen(true);
  }

  function openMomentEditor(moment: CountryMoment) {
    setEditingMoment(moment);
    setMomentForm({
      country_id: moment.country_id,
      year: moment.year ?? "",
      event_date: moment.event_date ?? "",
      venue: moment.venue ?? "",
      display_order: String(moment.display_order ?? 0),
      date: moment.date_translations?.[language] ?? moment.date_translations?.EN ?? "",
      location: moment.location_translations?.[language] ?? moment.location_translations?.EN ?? "",
      title: moment.title_translations?.[language] ?? moment.title_translations?.EN ?? "",
      text: moment.text_translations?.[language] ?? moment.text_translations?.EN ?? "",
    });
    setMomentFormError("");
    setMomentFormSuccess("");
    setMomentFormOpen(true);
  }

  function closeMomentForm() {
    if (savingMoment) return;
    setMomentFormOpen(false);
    setEditingMoment(null);
    setMomentFormError("");
    setMomentFormSuccess("");
  }

  async function saveMoment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingMoment) return;

    const mergeTranslation = (existing: Record<string, string> | undefined, value: string) => ({
      ...(existing ?? {}),
      [language]: value.trim(),
    });

    const payload = {
      country_id: momentForm.country_id,
      year: momentForm.year.trim(),
      event_date: momentForm.event_date || null,
      venue: momentForm.venue.trim() || null,
      display_order: Number(momentForm.display_order) || 0,
      date_translations: mergeTranslation(editingMoment?.date_translations, momentForm.date),
      location_translations: mergeTranslation(editingMoment?.location_translations, momentForm.location),
      title_translations: mergeTranslation(editingMoment?.title_translations, momentForm.title),
      text_translations: mergeTranslation(editingMoment?.text_translations, momentForm.text),
      updated_at: new Date().toISOString(),
    };

    setSavingMoment(true);
    setMomentFormError("");
    setMomentFormSuccess("");

    const query = editingMoment
      ? supabase.from("country_moments").update(payload).eq("id", editingMoment.id).select().single()
      : supabase.from("country_moments").insert({ ...payload, is_active: true }).select().single();

    const { data, error } = await query;
    setSavingMoment(false);

    if (error) {
      console.error("Country moment save error:", error);
      setMomentFormError(`${t.updateError}\n\nmessage: ${error.message}\ncode: ${error.code ?? "—"}`);
      return;
    }

    const saved = data as CountryMoment;
    setCountryMoments((current) => {
      const next = current.some((item) => item.id === saved.id)
        ? current.map((item) => item.id === saved.id ? saved : item)
        : [...current, saved];
      return next.sort((a, b) => (a.event_date ?? a.year).localeCompare(b.event_date ?? b.year));
    });
    setEditingMoment(saved);
    setMomentFormSuccess(t.momentSaved);
  }

  async function toggleMoment(moment: CountryMoment) {
    if (momentProcessingId) return;
    setMomentProcessingId(moment.id);
    setCountryMomentsError("");
    const nextActive = !moment.is_active;

    const { error } = await supabase
      .from("country_moments")
      .update({ is_active: nextActive, updated_at: new Date().toISOString() })
      .eq("id", moment.id);

    setMomentProcessingId(null);

    if (error) {
      console.error("Country moment status error:", error);
      setCountryMomentsError(`${t.updateError}\n\nmessage: ${error.message}\ncode: ${error.code ?? "—"}`);
      return;
    }

    setCountryMoments((current) =>
      current.map((item) => item.id === moment.id ? { ...item, is_active: nextActive } : item)
    );
  }

  const filteredCountryMoments = countryMoments.filter(
    (moment) => momentCountryFilter === "all" || moment.country_id === momentCountryFilter
  );

  function countryNameForId(countryId: string) {
    return countries.find((country) => country.id === countryId)?.name ?? "—";
  }

  function openOfficialPageEditor(page: OfficialFanPage) {
    setEditingOfficialPage(page);
    setOfficialEditForm({
      fan_page_name: page.fan_page_name ?? "",
      username: page.username ?? "",
      country: page.country ?? "",
      platform: page.platform ?? "",
      fan_page_link: page.fan_page_link ?? "",
      created_year: page.created_year ?? "",
      description: page.description ?? "",
    });
    setOfficialEditError("");
    setOfficialEditSuccess("");
  }

  function closeOfficialPageEditor() {
    if (savingOfficialPage) return;
    setEditingOfficialPage(null);
    setOfficialEditError("");
    setOfficialEditSuccess("");
  }

  async function saveOfficialPage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingOfficialPage || savingOfficialPage) return;

    setOfficialEditError("");
    setOfficialEditSuccess("");
    setSavingOfficialPage(true);

    const payload = {
      fan_page_name: officialEditForm.fan_page_name.trim(),
      username: officialEditForm.username.trim(),
      country: officialEditForm.country.trim(),
      platform: officialEditForm.platform.trim(),
      fan_page_link: officialEditForm.fan_page_link.trim(),
      created_year: officialEditForm.created_year.trim() || null,
      description: officialEditForm.description.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("fan_pages")
      .update(payload)
      .eq("id", editingOfficialPage.id)
      .select()
      .single();

    setSavingOfficialPage(false);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("Official fan page edit error:", diagnostic);
      setOfficialEditError(`${t.updateError}\n\n${diagnostic}`);
      return;
    }

    const updatedPage = data as OfficialFanPage;

    setOfficialFanPages((current) =>
      current.map((page) =>
        page.id === updatedPage.id ? updatedPage : page
      )
    );

    setEditingOfficialPage(updatedPage);
    setOfficialEditSuccess(t.saved);
  }

  function emptyProfileTranslationDrafts() {
    return {
      EN: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
      PT: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
      ES: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
      FR: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
      DE: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
      IT: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
      JA: { profile_intro:"", story:"", why_neyo:"", message_to_neyo:"" },
    } as Record<Language, FanPageProfileTranslationDraft>;
  }

  async function openFanPageProfileEditor(page: OfficialFanPage) {
    setProfileEditorOpen(true);
    setProfileEditorLoading(true);
    setProfileEditorError("");
    setProfileEditorSuccess("");
    setProfileEditorData(null);
    setTranslationPackageText("");
    setTranslationImportText("");
    setTranslationWorkflowOpen(false);

    const { data, error } = await supabase.rpc("admin_get_fan_page_profile_editor", {
      p_fan_page_id: page.id,
    });

    setProfileEditorLoading(false);

    if (error || !data) {
      console.error("Fan page profile editor load error:", error);
      setProfileEditorError(profileEditorT.loadError);
      return;
    }

    const editor = data as FanPageProfileEditorData;
    const nextProfileDrafts = emptyProfileTranslationDrafts();

    (["EN","PT","ES","FR","DE","IT","JA"] as Language[]).forEach((code) => {
      const saved = editor.profile_translations?.[code];
      nextProfileDrafts[code] = {
        profile_intro: saved?.profile_intro ?? "",
        story: saved?.story ?? "",
        why_neyo: saved?.why_neyo ?? "",
        message_to_neyo: saved?.message_to_neyo ?? "",
      };
    });

    const nextJourneyDrafts: Record<string, Record<Language, { title:string; description:string }>> = {};
    (editor.journey ?? []).forEach((moment) => {
      nextJourneyDrafts[moment.id] = {} as Record<Language, { title:string; description:string }>;
      (["EN","PT","ES","FR","DE","IT","JA"] as Language[]).forEach((code) => {
        const saved = moment.translations?.[code];
        nextJourneyDrafts[moment.id][code] = {
          title: saved?.title ?? "",
          description: saved?.description ?? "",
        };
      });
    });

    setProfileEditorData(editor);
    setProfileTranslationDrafts(nextProfileDrafts);
    setJourneyTranslationDrafts(nextJourneyDrafts);
    setProfileEditorLanguage(
      (["EN","PT","ES","FR","DE","IT","JA"] as Language[]).includes(editor.source_language as Language)
        ? editor.source_language as Language
        : "EN"
    );
  }

  function closeFanPageProfileEditor() {
    if (profileEditorSaving || profileEditorPublishing) return;
    setProfileEditorOpen(false);
    setProfileEditorData(null);
    setProfileEditorError("");
    setProfileEditorSuccess("");
    setTranslationPackageText("");
    setTranslationImportText("");
    setTranslationWorkflowOpen(false);
  }

  function updateProfileTranslationDraft(field: keyof FanPageProfileTranslationDraft, value: string) {
    setProfileTranslationDrafts((current) => ({
      ...current,
      [profileEditorLanguage]: {
        ...current[profileEditorLanguage],
        [field]: value,
      },
    }));
    setProfileEditorSuccess("");
  }

  function updateJourneyTranslationDraft(journeyId: string, field: "title" | "description", value: string) {
    setJourneyTranslationDrafts((current) => ({
      ...current,
      [journeyId]: {
        ...current[journeyId],
        [profileEditorLanguage]: {
          ...current[journeyId]?.[profileEditorLanguage],
          [field]: value,
        },
      },
    }));
    setProfileEditorSuccess("");
  }

  function createFanPageTranslationPackage() {
    if (!profileEditorData) return "";

    const languages = ["EN","PT","ES","FR","DE","IT","JA"] as Language[];

    const translationsPayload = Object.fromEntries(
      languages.map((code) => [
        code,
        {
          profile_intro: profileTranslationDrafts[code].profile_intro,
          story: profileTranslationDrafts[code].story,
          why_neyo: profileTranslationDrafts[code].why_neyo,
          message_to_neyo: profileTranslationDrafts[code].message_to_neyo,
          journey: (profileEditorData.journey ?? []).map((moment) => ({
            journey_id: moment.id,
            title: journeyTranslationDrafts[moment.id]?.[code]?.title ?? "",
            description: journeyTranslationDrafts[moment.id]?.[code]?.description ?? "",
          })),
        },
      ])
    );

    return JSON.stringify(
      {
        format: "ne-yo-world-fan-page-translations-v1",
        instructions: [
          "Translate the fan page profile into EN, PT, ES, FR, DE, IT and JA.",
          "Preserve the meaning, voice and first-person perspective of the fan. Do not invent facts, dates, venues, meetings or claims.",
          "Keep Ne-Yo, proper names, @handles, official work titles, song titles and official organization names unchanged when appropriate.",
          "Translate descriptive interface-style wording naturally rather than literally.",
          "Do not alter journey_id values or language codes.",
          "For the source language, preserve the original wording unless a translation is already supplied in this package.",
          "Return valid JSON only, using this exact structure and filling the translations object. Do not add commentary outside the JSON."
        ],
        fan_page_id: profileEditorData.fan_page_id,
        fan_page_name: profileEditorData.fan_page_name,
        username: profileEditorData.username,
        country: profileEditorData.country,
        source_language: profileEditorData.source_language,
        source: {
          profile_intro: profileEditorData.source.profile_intro ?? "",
          story: profileEditorData.source.story ?? "",
          why_neyo: profileEditorData.source.why_neyo ?? "",
          message_to_neyo: profileEditorData.source.message_to_neyo ?? "",
          journey: (profileEditorData.journey ?? []).map((moment) => ({
            journey_id: moment.id,
            year: moment.year,
            event_date: moment.event_date,
            title: moment.title,
            description: moment.description ?? "",
          })),
        },
        translations: translationsPayload,
      },
      null,
      2
    );
  }

  async function copyTextToClipboard(text: string) {
    if (!text) {
      return false;
    }

    /*
      Try the synchronous copy first while the browser still considers this
      function part of the user's click. Some browsers lose clipboard
      permission after awaiting navigator.clipboard.writeText().
    */
    if (typeof document !== "undefined") {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "0";
      textarea.style.top = "0";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      try {
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        if (document.execCommand("copy")) {
          return true;
        }
      } catch (error) {
        console.warn("Synchronous clipboard copy failed:", error);
      } finally {
        document.body.removeChild(textarea);
      }
    }

    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof window !== "undefined" &&
      window.isSecureContext
    ) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        console.warn("Clipboard API copy failed:", error);
      }
    }

    return false;
  }

  async function prepareFanPageTranslations() {
    if (!profileEditorData || profileEditorSaving || profileEditorPublishing) return;

    const packageText = createFanPageTranslationPackage();
    setTranslationPackageText(packageText);
    setTranslationImportText("");
    setTranslationWorkflowOpen(true);
    setProfileEditorError("");

    const copied = await copyTextToClipboard(packageText);

    if (copied) {
      setProfileEditorSuccess(profileEditorT.packageCopied);
    } else {
      setProfileEditorSuccess("");
      setProfileEditorError(profileEditorT.packageCopyError);
    }
  }

  function downloadFanPageTranslationPackage() {
    if (!translationPackageText || typeof document === "undefined") return;

    const rawName =
      profileEditorData?.fan_page_name ||
      profileEditorData?.username ||
      "fan-page";

    const safeName =
      String(rawName)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "fan-page";

    const blob = new Blob([translationPackageText], {
      type: "application/json;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ne-yo-world-${safeName}-translations.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    setProfileEditorError("");
  }

  async function copyFanPageTranslationPackage() {
    if (!translationPackageText) return;

    const copied = await copyTextToClipboard(translationPackageText);

    if (copied) {
      setProfileEditorError("");
      setProfileEditorSuccess(profileEditorT.packageCopied);
    } else {
      setProfileEditorSuccess("");
      setProfileEditorError(profileEditorT.packageCopyError);
    }
  }

  function applyFanPageTranslationPackage(rawJson: string) {
    if (!profileEditorData || !rawJson.trim()) return false;

    setProfileEditorError("");
    setProfileEditorSuccess("");

    try {
      const parsed = JSON.parse(rawJson);
      const languages = ["EN","PT","ES","FR","DE","IT","JA"] as Language[];

      if (
        parsed?.format !== "ne-yo-world-fan-page-translations-v1" ||
        parsed?.fan_page_id !== profileEditorData.fan_page_id ||
        !parsed?.translations ||
        typeof parsed.translations !== "object"
      ) {
        throw new Error("Invalid fan page translation package");
      }

      const nextProfileDrafts = { ...profileTranslationDrafts };
      const nextJourneyDrafts = { ...journeyTranslationDrafts };
      const validJourneyIds = new Set((profileEditorData.journey ?? []).map((moment) => moment.id));

      languages.forEach((code) => {
        const incoming = parsed.translations?.[code];
        if (!incoming || typeof incoming !== "object") return;

        nextProfileDrafts[code] = {
          profile_intro: typeof incoming.profile_intro === "string" ? incoming.profile_intro : nextProfileDrafts[code].profile_intro,
          story: typeof incoming.story === "string" ? incoming.story : nextProfileDrafts[code].story,
          why_neyo: typeof incoming.why_neyo === "string" ? incoming.why_neyo : nextProfileDrafts[code].why_neyo,
          message_to_neyo: typeof incoming.message_to_neyo === "string" ? incoming.message_to_neyo : nextProfileDrafts[code].message_to_neyo,
        };

        if (Array.isArray(incoming.journey)) {
          incoming.journey.forEach((moment: { journey_id?: unknown; title?: unknown; description?: unknown }) => {
            if (typeof moment?.journey_id !== "string" || !validJourneyIds.has(moment.journey_id)) return;

            nextJourneyDrafts[moment.journey_id] = {
              ...(nextJourneyDrafts[moment.journey_id] ?? {}),
              [code]: {
                title: typeof moment.title === "string" ? moment.title : nextJourneyDrafts[moment.journey_id]?.[code]?.title ?? "",
                description: typeof moment.description === "string" ? moment.description : nextJourneyDrafts[moment.journey_id]?.[code]?.description ?? "",
              },
            } as Record<Language, { title:string; description:string }>;
          });
        }
      });

      setProfileTranslationDrafts(nextProfileDrafts);
      setJourneyTranslationDrafts(nextJourneyDrafts);
      setProfileEditorSuccess(profileEditorT.importSuccess);
      return true;
    } catch (error) {
      console.error("Fan page translation JSON import error:", error);
      setProfileEditorError(profileEditorT.importError);
      return false;
    }
  }

  function importFanPageTranslationPackage() {
    applyFanPageTranslationPackage(translationImportText);
  }

  async function importFanPageTranslationFile(file: File | null) {
    if (!file) return;

    setProfileEditorError("");
    setProfileEditorSuccess("");

    try {
      const rawJson = await file.text();
      const imported = applyFanPageTranslationPackage(rawJson);

      if (imported) {
        setTranslationImportText(rawJson);
      }
    } catch (error) {
      console.error("Fan page translation file import error:", error);
      setProfileEditorError(profileEditorT.importError);
    }
  }

  async function saveFanPageProfileTranslations() {
    if (!profileEditorData || profileEditorSaving || profileEditorPublishing) return;

    setProfileEditorSaving(true);
    setProfileEditorError("");
    setProfileEditorSuccess("");

    const profilePayload = Object.fromEntries(
      (["EN","PT","ES","FR","DE","IT","JA"] as Language[])
        .filter((code) => {
          const draft = profileTranslationDrafts[code];
          const alreadyExists = Boolean(profileEditorData.profile_translations?.[code]);
          const hasContent = Boolean(
            draft.profile_intro.trim() ||
            draft.story.trim() ||
            draft.why_neyo.trim() ||
            draft.message_to_neyo.trim()
          );
          return alreadyExists || hasContent;
        })
        .map((code) => [
          code,
          {
            profile_intro: profileTranslationDrafts[code].profile_intro.trim() || null,
            story: profileTranslationDrafts[code].story.trim() || null,
            why_neyo: profileTranslationDrafts[code].why_neyo.trim() || null,
            message_to_neyo: profileTranslationDrafts[code].message_to_neyo.trim() || null,
          },
        ])
    );

    const journeyPayload = (profileEditorData.journey ?? []).flatMap((moment) =>
      (["EN","PT","ES","FR","DE","IT","JA"] as Language[])
        .filter((code) => {
          const draft = journeyTranslationDrafts[moment.id]?.[code];
          const alreadyExists = Boolean(moment.translations?.[code]);
          const hasContent = Boolean(draft?.title?.trim() || draft?.description?.trim());
          return alreadyExists || hasContent;
        })
        .map((code) => ({
          journey_id: moment.id,
          language: code,
          title: journeyTranslationDrafts[moment.id]?.[code]?.title?.trim() || null,
          description: journeyTranslationDrafts[moment.id]?.[code]?.description?.trim() || null,
        }))
    );

    const { error } = await supabase.rpc("admin_save_fan_page_profile_translations", {
      p_fan_page_id: profileEditorData.fan_page_id,
      p_profile_translations: profilePayload,
      p_journey_translations: journeyPayload,
    });

    setProfileEditorSaving(false);

    if (error) {
      console.error("Fan page translation save error:", error);
      setProfileEditorError(profileEditorT.saveError);
      return;
    }

    setProfileEditorSuccess(profileEditorT.saved);
  }

  async function publishFanPageProfile() {
    if (!profileEditorData || profileEditorSaving || profileEditorPublishing) return;

    setProfileEditorPublishing(true);
    setProfileEditorError("");
    setProfileEditorSuccess("");

    const { error } = await supabase.rpc("admin_publish_fan_page_profile", {
      p_fan_page_id: profileEditorData.fan_page_id,
    });

    setProfileEditorPublishing(false);

    if (error) {
      console.error("Fan page publication gate:", error);
      setProfileEditorError(profileEditorT.publishError);
      return;
    }

    setProfileEditorData((current) => current ? { ...current, profile_is_published: true } : current);
    setProfileEditorSuccess(profileEditorT.publishSuccess);
    await loadOfficialFanPages();
  }

  async function toggleOfficialFanPage(page: OfficialFanPage) {
    if (!page.is_active && page.application_id && !page.profile_is_published) {
      await openFanPageProfileEditor(page);
      return;
    }

    if (officialProcessingId) return;

    setOfficialFanPagesError("");
    setOfficialProcessingId(page.id);

    const nextActive = !page.is_active;

    const { error } = await supabase
      .from("fan_pages")
      .update({
        is_active: nextActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", page.id);

    setOfficialProcessingId(null);

    if (error) {
      const diagnostic = [
        `message: ${error.message ?? "—"}`,
        `code: ${error.code ?? "—"}`,
        `details: ${error.details ?? "—"}`,
        `hint: ${error.hint ?? "—"}`,
      ].join("\n");

      console.error("Official fan page update error:", diagnostic);
      setOfficialFanPagesError(t.updateError);
      return;
    }

    setOfficialFanPages((current) =>
      current.map((item) =>
        item.id === page.id ? { ...item, is_active: nextActive } : item
      )
    );
  }

  const officialCountries = useMemo(
    () =>
      Array.from(
        new Set(
          officialFanPages
            .map((page) => page.country)
            .filter(Boolean)
        )
      ).sort((a, b) => a.localeCompare(b)),
    [officialFanPages]
  );

  const filteredOfficialFanPages = useMemo(() => {
    const search = officialSearch.trim().toLowerCase();

    return officialFanPages.filter((page) => {
      const matchesSearch =
        !search ||
        page.fan_page_name.toLowerCase().includes(search) ||
        page.username.toLowerCase().includes(search);

      const matchesCountry =
        officialCountryFilter === "all" ||
        page.country === officialCountryFilter;

      const matchesStatus =
        officialStatusFilter === "all" ||
        (officialStatusFilter === "active" && page.is_active) ||
        (officialStatusFilter === "inactive" && !page.is_active);

      return matchesSearch && matchesCountry && matchesStatus;
    });
  }, [
    officialFanPages,
    officialSearch,
    officialCountryFilter,
    officialStatusFilter,
  ]);

  const adminStats = useMemo(() => {
    const pending = applications.filter((item) => item.status === "pending").length;
    const approved = applications.filter((item) => item.status === "approved").length;
    const active = officialFanPages.filter((page) => page.is_active).length;
    const inactive = officialFanPages.filter((page) => !page.is_active).length;
    const countries = new Set(
      officialFanPages
        .filter((page) => page.is_active)
        .map((page) => page.country.trim())
        .filter(Boolean)
    ).size;

    return { pending, approved, active, inactive, countries };
  }, [applications, officialFanPages]);

  const filteredApplications = useMemo(() => {
    if (filter === "all") return applications;
    return applications.filter((application) => application.status === filter);
  }, [applications, filter]);

  const counts = useMemo(() => ({
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  }), [applications]);

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter((country) =>
      [country.name, country.slug, country.code]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [countries, countrySearch]);

  const filteredCountryContentCountries = useMemo(() => {
    const query = countryContentSearch.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter((country) =>
      [country.name, country.slug, country.code]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [countries, countryContentSearch]);

  const filteredWorldNews = useMemo(() => {
    if (worldNewsFilter === "all") return worldNews;
    return worldNews.filter((item) => item.status === worldNewsFilter);
  }, [worldNews, worldNewsFilter]);

  const worldNewsCounts = useMemo(() => ({
    all: worldNews.length,
    pending: worldNews.filter((item) => item.status === "pending").length,
    approved: worldNews.filter((item) => item.status === "approved").length,
    rejected: worldNews.filter((item) => item.status === "rejected").length,
  }), [worldNews]);

  const filteredWorldMessages = useMemo(() => {
    if (worldMessageFilter === "all") return worldMessages;
    return worldMessages.filter((message) => message.status === worldMessageFilter);
  }, [worldMessages, worldMessageFilter]);

  const fanMemoryCounts = useMemo(() => ({
    all: fanMemories.length,
    pending: fanMemories.filter((memory) => memory.status === "pending").length,
    approved: fanMemories.filter((memory) => memory.status === "approved").length,
    rejected: fanMemories.filter((memory) => memory.status === "rejected").length,
  }), [fanMemories]);

  const filteredFanMemories = useMemo(() => {
    if (fanMemoryFilter === "all") return fanMemories;
    return fanMemories.filter((memory) => memory.status === fanMemoryFilter);
  }, [fanMemories, fanMemoryFilter]);

  const worldMessageCounts = useMemo(() => ({
    all: worldMessages.length,
    pending: worldMessages.filter((message) => message.status === "pending").length,
    approved: worldMessages.filter((message) => message.status === "approved").length,
    rejected: worldMessages.filter((message) => message.status === "rejected").length,
  }), [worldMessages]);

  if (!sessionChecked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050607] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-white/40">{t.checking}</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050607] px-6 py-20 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#D51C24]/5 blur-[180px]" />
          <div className="absolute right-[-15%] top-[5%] h-[600px] w-[600px] rounded-full bg-[#D4AF37]/5 blur-[200px]" />
        </div>

        <div className="relative z-10 w-full max-w-[480px]">
          <a href="/" className="mx-auto mb-8 flex w-fit items-center">
            <img src="/ne-yo-world-logo.png.png" alt="Ne-Yo World" className="h-[85px] w-auto object-contain" />
          </a>

          <div className="rounded-[28px] border border-[#D4AF37]/20 bg-[#090A0B]/95 p-8 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D51C24]">{t.admin}</p>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em]">{t.title}</h1>
            <p className="mt-5 text-sm leading-7 text-white/40">{t.subtitle}</p>

            <form onSubmit={handleLogin} className="mt-8">
              <label className="text-[10px] uppercase tracking-[0.18em] text-white/35">{t.email}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />

              <label className="mt-6 block text-[10px] uppercase tracking-[0.18em] text-white/35">{t.password}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />

              {loginError && (
                <div className="mt-5 rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-4 py-3 text-xs text-[#FF5960]">{loginError}</div>
              )}

              <button type="submit" disabled={loginLoading} className="mt-7 flex w-full items-center justify-center rounded-xl border border-[#D51C24]/60 bg-[#D51C24]/5 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:border-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-50">
                {loginLoading ? t.signingIn : t.signIn}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050607] px-6 text-white">
        <div className="w-full max-w-[600px] rounded-[28px] border border-[#D51C24]/25 bg-[#090A0B] p-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D51C24]">{t.admin}</p>
          <h1 className="mt-5 text-3xl font-bold">{t.noAccess}</h1>
          <button type="button" onClick={handleLogout} className="mt-8 rounded-xl border border-white/15 px-6 py-3 text-[10px] uppercase tracking-[0.16em] text-white/60 transition hover:text-white">{t.signOut}</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050607] text-white">
      <header className="sticky top-0 z-50 border-b border-[#D4AF37]/10 bg-[#050607]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <a href="/"><img src="/ne-yo-world-logo.png.png" alt="Ne-Yo World" className="h-[70px] w-auto object-contain" /></a>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button type="button" onClick={() => setLanguageOpen((c) => !c)} className="rounded-full border border-[#D4AF37]/25 bg-black/50 px-4 py-2 text-[10px] text-white/70">◎ {language}</button>
              {languageOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-[160px] rounded-xl border border-[#D4AF37]/20 bg-[#090A0B]/98 p-1 shadow-2xl">
                  {[{code:"EN",label:"English"},{code:"PT",label:"Português"},{code:"ES",label:"Español"},{code:"FR",label:"Français"},{code:"DE",label:"Deutsch"},{code:"IT",label:"Italiano"},{code:"JA",label:"日本語"}].map((option) => (
                    <button key={option.code} type="button" onClick={() => chooseLanguage(option.code as Language)} className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-[10px] text-white/60 transition hover:bg-white/5 hover:text-white">
                      <span>{option.label}</span><span className="text-[#D4AF37]">{option.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" onClick={handleLogout} className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-white/50 transition hover:border-[#D51C24]/50 hover:text-white">{t.signOut}</button>
          </div>
        </div>
      </header>

      <section className="px-6 pb-10 pt-14 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#D51C24]">{t.admin}</p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">{t.title}</h1>
          <p className="mt-5 max-w-[700px] text-sm leading-7 text-white/40">{t.subtitle}</p>
        </div>
      </section>

      <section className="px-6 pb-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { key: "pending", label: t.pending, value: counts.pending },
            { key: "approved", label: t.approved, value: counts.approved },
            { key: "rejected", label: t.rejected, value: counts.rejected },
            { key: "all", label: t.all, value: counts.all },
          ].map((item) => (
            <button key={item.key} type="button" onClick={() => setFilter(item.key as "all" | ApplicationStatus)} className={`rounded-2xl border p-5 text-left transition ${filter === item.key ? "border-[#D4AF37]/50 bg-[#D4AF37]/5" : "border-[#D4AF37]/10 bg-[#090A0B] hover:border-[#D4AF37]/30"}`}>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{item.label}</p>
              <p className="mt-2 text-3xl font-black text-[#D4AF37]">{item.value}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 border-b border-[#D4AF37]/10 pb-4">
            <p className="text-[9px] uppercase tracking-[0.24em] text-[#D51C24]">{t.overview}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { label: t.pendingApplications, value: adminStats.pending },
              { label: t.approvedApplications, value: adminStats.approved },
              { label: t.activePages, value: adminStats.active },
              { label: t.inactivePages, value: adminStats.inactive },
              { label: t.representedCountries, value: adminStats.countries },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] px-5 py-6">
                <p className="text-[8px] uppercase tracking-[0.18em] text-white/30">{stat.label}</p>
                <p className="mt-4 text-4xl font-black tracking-tight text-[#D4AF37]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("countries")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["countries"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.countriesManagement}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {countries.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["countries"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["countries"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex items-end justify-between gap-5 border-b border-[#D4AF37]/10 pb-4">
            <div>
              <h2 className="text-xl font-semibold">{t.countriesManagement}</h2>
              <p className="mt-2 text-xs leading-6 text-white/35">{t.countriesManagementSubtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={loadCountries} className="text-[9px] uppercase tracking-[0.16em] text-white/35 transition hover:text-[#D4AF37]">↻</button>
              <button
                type="button"
                onClick={openNewCountry}
                className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:border-[#D4AF37]"
              >
                + {t.addCountry}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              placeholder={t.searchCountries}
              className="w-full rounded-xl border border-[#D4AF37]/15 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/50"
            />
          </div>

          {countriesError && (
            <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
              {countriesError}
            </div>
          )}

          {loadingCountries ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
            </div>
          ) : countries.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#090A0B] px-6 py-14 text-center text-sm text-white/30">
              {t.noCountries}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredCountries.map((country) => (
                <div key={country.id} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-11 min-w-11 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-black/30 px-3 text-sm font-black text-[#D4AF37]">
                          {country.code}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{country.name}</h3>
                          <p className="mt-1 text-xs text-white/30">/{country.slug}</p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${
                          country.is_active
                            ? "border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]"
                            : "border-white/10 bg-white/[0.02] text-white/35"
                        }`}>
                          {country.is_active ? t.countryActive : t.countryInactive}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => openCountryEditor(country)}
                        className="rounded-xl border border-[#D4AF37]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        {t.edit}
                      </button>
                      <button
                        type="button"
                        disabled={countryProcessingId === country.id}
                        onClick={() => toggleCountry(country)}
                        className="rounded-xl border border-white/15 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55 transition hover:border-[#D51C24]/50 hover:text-white disabled:opacity-40"
                      >
                        {countryProcessingId === country.id
                          ? t.processing
                          : country.is_active
                            ? t.deactivateCountry
                            : t.activateCountry}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("countryContent")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["countryContent"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.countryContent}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {countries.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["countryContent"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["countryContent"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex items-end justify-between gap-5 border-b border-[#D4AF37]/10 pb-4">
            <div>
              <h2 className="text-xl font-semibold">{t.countryContent}</h2>
              <p className="mt-2 text-xs leading-6 text-white/35">{t.countryContentSubtitle}</p>
            </div>
            <button type="button" onClick={loadCountryContents} className="text-[9px] uppercase tracking-[0.16em] text-white/35 hover:text-[#D4AF37]">↻</button>
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={countryContentSearch}
              onChange={(e) => setCountryContentSearch(e.target.value)}
              placeholder={t.searchCountryContent}
              className="w-full rounded-xl border border-[#D4AF37]/15 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/50"
            />
          </div>
          {countryContentsError && <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs text-[#FF5960]">{countryContentsError}</div>}
          {loadingCountryContents ? (
            <div className="py-16 text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" /></div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredCountryContentCountries.map((country) => {
                const content = countryContents.find((item) => item.country_id === country.id);
                const languageCount = content ? Object.keys(content.translations ?? {}).length : 0;
                return (
                  <div key={country.id} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
                    <div className="flex items-center justify-between gap-5">
                      <div>
                        <h3 className="text-xl font-semibold">{country.name}</h3>
                        <p className="mt-2 text-xs text-white/35">{content ? `${languageCount}/7 languages` : t.noCountryContent}</p>
                      </div>
                      <button type="button" onClick={() => openCountryContentEditor(country.id)} className="rounded-xl border border-[#D4AF37]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">{t.editContent}</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      )}

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("countryMoments")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["countryMoments"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.countryMoments}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {countryMoments.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["countryMoments"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["countryMoments"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex flex-col gap-4 border-b border-[#D4AF37]/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{t.countryMoments}</h2>
              <p className="mt-2 text-xs leading-6 text-white/35">{t.countryMomentsSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select value={momentCountryFilter} onChange={(e) => setMomentCountryFilter(e.target.value)} className="rounded-xl border border-[#D4AF37]/15 bg-[#090A0B] px-4 py-3 text-xs text-white/65 outline-none">
                <option value="all">{t.allCountries}</option>
                {countries.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}
              </select>
              <button type="button" onClick={openNewMoment} className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
                + {t.addMoment}
              </button>
            </div>
          </div>

          {countryMomentsError && <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs text-[#FF5960]">{countryMomentsError}</div>}

          {loadingCountryMoments ? (
            <div className="py-16 text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" /></div>
          ) : filteredCountryMoments.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#090A0B] px-6 py-14 text-center text-sm text-white/30">{t.noMoments}</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredCountryMoments.map((moment) => (
                <div key={moment.id} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-black text-[#D4AF37]">{moment.year}</span>
                        <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${moment.is_active ? "border-[#D4AF37]/30 text-[#D4AF37]" : "border-white/10 text-white/30"}`}>
                          {moment.is_active ? t.active : t.inactive}
                        </span>
                      </div>
                      <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-[#D51C24]">{countryNameForId(moment.country_id)}</p>
                      <h3 className="mt-2 text-lg font-semibold">{moment.title_translations?.[language] ?? moment.title_translations?.EN ?? moment.venue ?? "—"}</h3>
                      <p className="mt-2 text-xs text-white/35">{moment.date_translations?.[language] ?? moment.date_translations?.EN ?? moment.event_date ?? "—"} · {moment.location_translations?.[language] ?? moment.location_translations?.EN ?? moment.venue ?? "—"}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button type="button" onClick={() => openMomentEditor(moment)} className="rounded-xl border border-[#D4AF37]/25 px-4 py-3 text-[9px] uppercase tracking-[0.14em] text-white/60 hover:text-[#D4AF37]">{t.edit}</button>
                      <button type="button" disabled={momentProcessingId === moment.id} onClick={() => toggleMoment(moment)} className="rounded-xl border border-white/15 px-4 py-3 text-[9px] uppercase tracking-[0.14em] text-white/55 disabled:opacity-40">
                        {momentProcessingId === moment.id ? t.processing : moment.is_active ? t.deactivateMoment : t.activateMoment}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("worldNews")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["worldNews"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                World News
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {worldNews.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["worldNews"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["worldNews"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex flex-col gap-5 border-b border-[#D4AF37]/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D51C24]">
                World News
              </p>
              <h2 className="mt-2 text-xl font-semibold">News Management</h2>
              <p className="mt-2 max-w-[760px] text-xs leading-6 text-white/35">
                Paste a source URL, import the story automatically, review it and approve when ready.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={loadWorldNews}
                className="text-[9px] uppercase tracking-[0.16em] text-white/35 transition hover:text-[#D4AF37]"
              >
                ↻
              </button>
              <button
                type="button"
                onClick={openNewWorldNews}
                className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
              >
                + Import Story
              </button>
            </div>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: "pending", label: t.pending, value: worldNewsCounts.pending },
              { key: "approved", label: t.approved, value: worldNewsCounts.approved },
              { key: "rejected", label: t.rejected, value: worldNewsCounts.rejected },
              { key: "all", label: t.all, value: worldNewsCounts.all },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setWorldNewsFilter(item.key as "all" | WorldNewsStatus)}
                className={`rounded-2xl border p-5 text-left transition ${
                  worldNewsFilter === item.key
                    ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                    : "border-[#D4AF37]/10 bg-[#090A0B] hover:border-[#D4AF37]/25"
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-black text-[#D4AF37]">
                  {item.value}
                </p>
              </button>
            ))}
          </div>

          {worldNewsError && (
            <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
              {worldNewsError}
            </div>
          )}

          {loadingWorldNews ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
            </div>
          ) : filteredWorldNews.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#090A0B] px-6 py-16 text-center text-sm text-white/30">
              No World News stories found in this category.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredWorldNews.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[#D51C24]/25 bg-[#D51C24]/5 px-3 py-1 text-[8px] uppercase tracking-[0.15em] text-[#FF5960]">
                          {item.category}
                        </span>
                        <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${
                          item.status === "approved"
                            ? "border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]"
                            : item.status === "rejected"
                              ? "border-[#D51C24]/30 bg-[#D51C24]/5 text-[#FF5960]"
                              : "border-white/15 bg-white/[0.02] text-white/45"
                        }`}>
                          {item.status === "pending" ? t.pending : item.status === "approved" ? t.approved : t.rejected}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold">
                        {worldNewsTitle(item)}
                      </h3>

                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                            Source
                          </p>
                          <p className="mt-2 text-xs text-white/60">{item.source_name}</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                            Published
                          </p>
                          <p className="mt-2 text-xs text-white/60">
                            {formatDate(item.published_at, language)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                            Event Date
                          </p>
                          <p className="mt-2 text-xs text-white/60">
                            {item.event_date || "Not set"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/10 px-4 py-2.5 text-[9px] uppercase tracking-[0.14em] text-white/45 transition hover:border-[#D4AF37]/35 hover:text-[#D4AF37]"
                        >
                          Open Source ↗
                        </a>
                        <span className="text-[9px] text-white/20">
                          {(item.world_news_translations ?? []).length}/7 translations
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2 lg:w-[190px] lg:flex-col">
                      <button
                        type="button"
                        onClick={() => openWorldNewsEditor(item)}
                        className="rounded-xl border border-[#D4AF37]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]"
                      >
                        {t.edit}
                      </button>

                      {item.status !== "approved" && (
                        <button
                          type="button"
                          disabled={worldNewsProcessingId === item.id}
                          onClick={() => updateWorldNewsStatus(item, "approved")}
                          className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] disabled:opacity-40"
                        >
                          {worldNewsProcessingId === item.id ? t.processing : t.approve}
                        </button>
                      )}

                      {item.status !== "rejected" && (
                        <button
                          type="button"
                          disabled={worldNewsProcessingId === item.id}
                          onClick={() => updateWorldNewsStatus(item, "rejected")}
                          className="rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF5960] disabled:opacity-40"
                        >
                          {worldNewsProcessingId === item.id ? t.processing : t.reject}
                        </button>
                      )}

                      {item.status !== "pending" && (
                        <button
                          type="button"
                          disabled={worldNewsProcessingId === item.id}
                          onClick={() => updateWorldNewsStatus(item, "pending")}
                          className="rounded-xl border border-white/15 px-4 py-3 text-[9px] uppercase tracking-[0.14em] text-white/45 disabled:opacity-40"
                        >
                          {worldNewsProcessingId === item.id ? t.processing : "Return Pending"}
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={worldNewsProcessingId === item.id}
                        onClick={() => deleteWorldNews(item)}
                        className="rounded-xl border border-[#D51C24]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF5960]/75 transition hover:border-[#D51C24]/60 hover:text-[#FF5960] disabled:opacity-40"
                      >
                        {worldNewsProcessingId === item.id ? t.processing : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("fanMemories")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["fanMemories"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Fan Memories
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {fanMemories.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["fanMemories"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["fanMemories"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex items-end justify-between gap-5 border-b border-[#D4AF37]/10 pb-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D51C24]">Fan Memories</p>
              <h2 className="mt-2 text-xl font-semibold">Fan Memories</h2>
              <p className="mt-2 text-xs leading-6 text-white/35">Review fan stories, photos and videos before they appear publicly.</p>
            </div>
            <button type="button" onClick={loadFanMemories} className="text-[9px] uppercase tracking-[0.16em] text-white/35 transition hover:text-[#D4AF37]">↻</button>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: "pending", label: t.pending, value: fanMemoryCounts.pending },
              { key: "approved", label: t.approved, value: fanMemoryCounts.approved },
              { key: "rejected", label: t.rejected, value: fanMemoryCounts.rejected },
              { key: "all", label: t.all, value: fanMemoryCounts.all },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setFanMemoryFilter(item.key as "all" | ApplicationStatus)}
                className={`rounded-2xl border p-5 text-left transition ${
                  fanMemoryFilter === item.key
                    ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                    : "border-[#D4AF37]/10 bg-[#090A0B] hover:border-[#D4AF37]/25"
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-[#D4AF37]">{item.value}</p>
              </button>
            ))}
          </div>

          {fanMemoriesError && (
            <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
              {fanMemoriesError}
            </div>
          )}

          {loadingFanMemories ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
            </div>
          ) : filteredFanMemories.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#090A0B] px-6 py-16 text-center text-sm text-white/30">
              No Fan Memories found in this category.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredFanMemories.map((memory) => (
                <article key={memory.id} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold">{memory.display_name}</h3>
                        <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${
                          memory.status === "approved"
                            ? "border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]"
                            : memory.status === "rejected"
                              ? "border-[#D51C24]/30 bg-[#D51C24]/5 text-[#FF5960]"
                              : "border-white/15 bg-white/[0.02] text-white/45"
                        }`}>
                          {memory.status === "pending" ? t.pending : memory.status === "approved" ? t.approved : t.rejected}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">Country</p>
                          <p className="mt-2 text-xs text-white/60">{memory.country_code}</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">Language</p>
                          <p className="mt-2 text-xs uppercase text-white/60">{memory.original_language}</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">Memory Date</p>
                          <p className="mt-2 text-xs text-white/60">{memory.memory_date || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">Submitted</p>
                          <p className="mt-2 text-xs text-white/60">{formatDate(memory.created_at, language)}</p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-white/8 bg-black/25 p-4">
                        <p className="whitespace-pre-wrap text-sm leading-7 text-white/70">{memory.story}</p>
                      </div>

                      {(memory.fan_memory_media ?? []).length > 0 && (
                        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {(memory.fan_memory_media ?? []).map((media) => (
                            <div key={media.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                              {media.signed_url ? (
                                media.media_type === "image" ? (
                                  <img src={media.signed_url} alt="Fan Memory" className="aspect-[4/3] w-full object-cover" />
                                ) : (
                                  <video src={media.signed_url} controls preload="metadata" className="aspect-video w-full bg-black object-contain" />
                                )
                              ) : (
                                <div className="flex aspect-video items-center justify-center px-4 text-center text-xs text-white/30">Preview unavailable</div>
                              )}
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/8 px-4 py-3 text-[9px] uppercase tracking-[0.12em] text-white/35">
                                <span>{media.media_type}</span>
                                <span>{formatBytes(media.file_size_bytes)}</span>
                                {media.duration_seconds != null && <span>{Number(media.duration_seconds).toFixed(1)}s</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2 lg:w-[190px] lg:flex-col">
                      {memory.status !== "approved" && (
                        <button
                          type="button"
                          disabled={fanMemoryProcessingId === memory.id}
                          onClick={() => updateFanMemoryStatus(memory, "approved")}
                          className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] disabled:opacity-40"
                        >
                          {fanMemoryProcessingId === memory.id ? t.processing : t.approve}
                        </button>
                      )}

                      {memory.status !== "rejected" && (
                        <button
                          type="button"
                          disabled={fanMemoryProcessingId === memory.id}
                          onClick={() => updateFanMemoryStatus(memory, "rejected")}
                          className="rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF5960] disabled:opacity-40"
                        >
                          {fanMemoryProcessingId === memory.id ? t.processing : t.reject}
                        </button>
                      )}

                      {memory.status !== "pending" && (
                        <button
                          type="button"
                          disabled={fanMemoryProcessingId === memory.id}
                          onClick={() => updateFanMemoryStatus(memory, "pending")}
                          className="rounded-xl border border-white/15 px-4 py-3 text-[9px] uppercase tracking-[0.14em] text-white/45 disabled:opacity-40"
                        >
                          {fanMemoryProcessingId === memory.id ? t.processing : "Return Pending"}
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={fanMemoryProcessingId === memory.id}
                        onClick={() => deleteFanMemory(memory)}
                        className="rounded-xl border border-[#D51C24]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF5960]/75 transition hover:border-[#D51C24]/60 hover:text-[#FF5960] disabled:opacity-40"
                      >
                        {fanMemoryProcessingId === memory.id ? t.processing : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("worldMessages")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["worldMessages"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.worldMessagesAdmin}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {worldMessages.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["worldMessages"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["worldMessages"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex items-end justify-between gap-5 border-b border-[#D4AF37]/10 pb-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D51C24]">World Messages</p>
              <h2 className="mt-2 text-xl font-semibold">{t.worldMessagesAdmin}</h2>
              <p className="mt-2 text-xs leading-6 text-white/35">{t.worldMessagesAdminSubtitle}</p>
            </div>
            <button type="button" onClick={loadWorldMessages} className="text-[9px] uppercase tracking-[0.16em] text-white/35 transition hover:text-[#D4AF37]">↻</button>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: "pending", label: t.pending, value: worldMessageCounts.pending },
              { key: "approved", label: t.approved, value: worldMessageCounts.approved },
              { key: "rejected", label: t.rejected, value: worldMessageCounts.rejected },
              { key: "all", label: t.all, value: worldMessageCounts.all },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setWorldMessageFilter(item.key as "all" | ApplicationStatus)}
                className={`rounded-2xl border p-5 text-left transition ${
                  worldMessageFilter === item.key
                    ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                    : "border-[#D4AF37]/10 bg-[#090A0B] hover:border-[#D4AF37]/25"
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-[#D4AF37]">{item.value}</p>
              </button>
            ))}
          </div>

          {worldMessagesError && (
            <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
              {worldMessagesError}
            </div>
          )}

          {loadingWorldMessages ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
            </div>
          ) : filteredWorldMessages.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#090A0B] px-6 py-16 text-center text-sm text-white/30">
              {t.noWorldMessages}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredWorldMessages.map((message) => (
                <article key={message.id} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold">{message.name}</h3>
                        <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${
                          message.status === "approved"
                            ? "border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]"
                            : message.status === "rejected"
                              ? "border-[#D51C24]/30 bg-[#D51C24]/5 text-[#FF5960]"
                              : "border-white/15 bg-white/[0.02] text-white/45"
                        }`}>
                          {message.status === "pending" ? t.pending : message.status === "approved" ? t.approved : t.rejected}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.country}</p>
                          <p className="mt-2 text-xs text-white/60">{message.country}</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.originalLanguage}</p>
                          <p className="mt-2 text-xs uppercase text-white/60">{message.original_language}</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.submitted}</p>
                          <p className="mt-2 text-xs text-white/60">{formatDate(message.created_at, language)}</p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-xl border border-white/5 bg-black/25 p-5">
                        <p className="text-[8px] uppercase tracking-[0.18em] text-[#D4AF37]/55">{t.messageText}</p>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/65">“{message.original_text}”</p>
                      </div>

                      {message.approved_at && (
                        <p className="mt-3 text-[9px] text-white/25">
                          {t.approvedAt}: {formatDate(message.approved_at, language)}
                        </p>
                      )}

                      {message.status === "approved" && (
                        <div className="mt-6 border-t border-[#D4AF37]/10 pt-5">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                                {t.messageTranslations}
                              </p>
                              <p className="mt-2 max-w-[760px] text-xs leading-6 text-white/35">
                                {t.messageTranslationsSubtitle}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleWorldMessageTranslations(message)}
                              className="rounded-xl border border-[#D4AF37]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:border-[#D4AF37]/55"
                            >
                              {openWorldMessageTranslations[message.id]
                                ? t.hideTranslations
                                : t.editTranslations}
                            </button>
                          </div>

                          {openWorldMessageTranslations[message.id] && (
                            <div className="mt-5 rounded-2xl border border-[#D4AF37]/10 bg-black/20 p-5">
                              <p className="mb-5 text-[10px] leading-5 text-white/30">
                                {t.originalMessageNotice}
                              </p>

                              <div className="grid gap-4 lg:grid-cols-2">
                                {WORLD_MESSAGE_LANGUAGES
                                  .filter(({ code }) => code !== message.original_language)
                                  .map(({ code, label }) => (
                                    <div key={code}>
                                      <label className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">
                                        {t.translationFor} · {label}
                                      </label>
                                      <textarea
                                        rows={4}
                                        maxLength={1000}
                                        value={
                                          worldMessageTranslationDrafts[message.id]?.[code] ??
                                          translationForMessage(message.id, code)?.translated_text ??
                                          ""
                                        }
                                        onChange={(event) =>
                                          updateWorldMessageTranslationDraft(
                                            message.id,
                                            code,
                                            event.target.value
                                          )
                                        }
                                        placeholder={`${t.translationFor} ${label}`}
                                        className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#050607] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/15 focus:border-[#D4AF37]/45"
                                      />
                                    </div>
                                  ))}
                              </div>

                              <div className="mt-5 flex flex-wrap items-center gap-4">
                                <button
                                  type="button"
                                  disabled={worldMessageTranslationSavingId === message.id}
                                  onClick={() => saveWorldMessageTranslations(message)}
                                  className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  {worldMessageTranslationSavingId === message.id
                                    ? t.saving
                                    : t.saveTranslations}
                                </button>

                                {worldMessageTranslationSuccessId === message.id && (
                                  <p className="text-xs text-[#D4AF37]">
                                    {t.translationsSaved}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2 lg:w-[190px] lg:flex-col">
                      {message.status !== "approved" && (
                        <button
                          type="button"
                          disabled={worldMessageProcessingId === message.id}
                          onClick={() => updateWorldMessageStatus(message, "approved")}
                          className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] disabled:opacity-40"
                        >
                          {worldMessageProcessingId === message.id ? t.processing : t.approveMessage}
                        </button>
                      )}

                      {message.status !== "rejected" && (
                        <button
                          type="button"
                          disabled={worldMessageProcessingId === message.id}
                          onClick={() => updateWorldMessageStatus(message, "rejected")}
                          className="rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF5960] disabled:opacity-40"
                        >
                          {worldMessageProcessingId === message.id ? t.processing : t.rejectMessage}
                        </button>
                      )}

                      {message.status !== "pending" && (
                        <button
                          type="button"
                          disabled={worldMessageProcessingId === message.id}
                          onClick={() => updateWorldMessageStatus(message, "pending")}
                          className="rounded-xl border border-white/15 px-4 py-3 text-[9px] uppercase tracking-[0.14em] text-white/45 disabled:opacity-40"
                        >
                          {worldMessageProcessingId === message.id ? t.processing : t.revertMessage}
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={worldMessageProcessingId === message.id}
                        onClick={() => deleteWorldMessage(message)}
                        className="rounded-xl border border-[#D51C24]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF5960]/75 transition hover:border-[#D51C24]/60 hover:text-[#FF5960] disabled:opacity-40"
                      >
                        {worldMessageProcessingId === message.id ? t.processing : t.deleteMessage}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("applications")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["applications"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.applications}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {applications.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["applications"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["applications"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">
            <h2 className="text-xl font-semibold">{t.applications}</h2>
            <button type="button" onClick={loadApplications} className="text-[9px] uppercase tracking-[0.16em] text-white/35 transition hover:text-[#D4AF37]">↻</button>
          </div>

          {applicationsError && (
            <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
              {applicationsError}
            </div>
          )}

          {loadingApplications ? (
            <div className="py-20 text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" /></div>
          ) : filteredApplications.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#090A0B] px-6 py-16 text-center text-sm text-white/30">{t.noApplications}</div>
          ) : (
            <div className="grid gap-4">
              {filteredApplications.map((application) => (
                <div key={application.id} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
                  <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold">{application.fan_page_name}</h3>
                        <span className="rounded-full border border-[#D51C24]/25 bg-[#D51C24]/5 px-3 py-1 text-[8px] uppercase tracking-[0.15em] text-[#D51C24]">{application.status}</span>
                        {application.status === "approved" && (() => {
                          const officialPage = officialFanPages.find(
                            (page) => page.application_id === application.id
                          );
                          if (!officialPage) return null;
                          return (
                            <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${
                              officialPage.is_active
                                ? "border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]"
                                : "border-white/10 bg-white/[0.02] text-white/35"
                            }`}>
                              {officialPage.is_active ? t.visibleOnSite : t.hiddenFromSite}
                            </span>
                          );
                        })()}
                      </div>
                      <p className="mt-2 text-sm text-[#D4AF37]">{application.username}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div><p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.country}</p><p className="mt-2 text-white/60">{application.country}</p></div>
                      <div><p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.platform}</p><p className="mt-2 text-white/60">{application.platform}</p></div>
                    </div>
                    <button type="button" onClick={() => setSelectedApplication(application)} className="rounded-xl border border-[#D4AF37]/30 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] transition hover:border-[#D51C24]/60">{t.view}</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <section className="px-6 pb-4 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={() => toggleAdminSection("officialFanPages")}
            className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
              openAdminSections["officialFanPages"]
                ? "border-[#D4AF37]/45 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/12 bg-[#090A0B] hover:border-[#D4AF37]/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {t.officialFanPages}
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-white/30">
                {officialFanPages.length}
              </span>
            </div>
            <span className="text-xl leading-none text-[#D4AF37]">
              {openAdminSections["officialFanPages"] ? "−" : "+"}
            </span>
          </button>
        </div>
      </section>

      {openAdminSections["officialFanPages"] && (
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-5 flex items-end justify-between gap-5 border-b border-[#D4AF37]/10 pb-4">
            <div>
              <h2 className="text-xl font-semibold">{t.officialFanPages}</h2>
              <p className="mt-2 text-xs leading-6 text-white/35">{t.officialFanPagesSubtitle}</p>
            </div>
            <button type="button" onClick={loadOfficialFanPages} className="text-[9px] uppercase tracking-[0.16em] text-white/35 transition hover:text-[#D4AF37]">↻</button>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-[1fr_220px_220px]">
            <input
              type="text"
              value={officialSearch}
              onChange={(e) => setOfficialSearch(e.target.value)}
              placeholder={t.searchOfficialPages}
              className="rounded-xl border border-[#D4AF37]/15 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-[#D4AF37]/50"
            />

            <select
              value={officialCountryFilter}
              onChange={(e) => setOfficialCountryFilter(e.target.value)}
              className="rounded-xl border border-[#D4AF37]/15 bg-[#050607] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/50"
            >
              <option value="all">{t.allCountries}</option>
              {officialCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={officialStatusFilter}
              onChange={(e) =>
                setOfficialStatusFilter(
                  e.target.value as "all" | "active" | "inactive"
                )
              }
              className="rounded-xl border border-[#D4AF37]/15 bg-[#050607] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D4AF37]/50"
            >
              <option value="all">{t.allStatuses}</option>
              <option value="active">{t.active}</option>
              <option value="inactive">{t.inactive}</option>
            </select>
          </div>

          {officialFanPagesError && (
            <div className="mb-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
              {officialFanPagesError}
            </div>
          )}

          {loadingOfficialFanPages ? (
            <div className="py-16 text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" /></div>
          ) : filteredOfficialFanPages.length === 0 ? (
            <div className="rounded-2xl border border-[#D4AF37]/10 bg-[#090A0B] px-6 py-14 text-center text-sm text-white/30">{t.noOfficialFanPages}</div>
          ) : (
            <div className="grid gap-4">
              {filteredOfficialFanPages.map((page) => (
                <div key={page.id} className="rounded-2xl border border-[#D4AF37]/15 bg-[#090A0B] p-6">
                  <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold">{page.fan_page_name}</h3>
                        <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${page.is_active ? "border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]" : "border-white/10 bg-white/[0.02] text-white/30"}`}>
                          {page.is_active ? t.visibleOnSite : t.hiddenFromSite}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#D4AF37]">{page.username}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div><p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.country}</p><p className="mt-2 text-white/60">{page.country}</p></div>
                      <div><p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.platform}</p><p className="mt-2 text-white/60">{page.platform}</p></div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {page.application_id && (
                        <button
                          type="button"
                          onClick={() => openFanPageProfileEditor(page)}
                          className="rounded-xl border border-[#D51C24]/30 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#FF5960] transition hover:border-[#D51C24] hover:text-white"
                        >
                          {profileEditorT.editProfile}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => openOfficialPageEditor(page)}
                        className="rounded-xl border border-[#D4AF37]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
                      >
                        {t.edit}
                      </button>
                      <a href={page.fan_page_link} target="_blank" rel="noreferrer" className="rounded-xl border border-[#D4AF37]/25 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:border-[#D4AF37]">
                        {t.view} ↗
                      </a>
                      <button
                        type="button"
                        disabled={officialProcessingId === page.id}
                        onClick={() => toggleOfficialFanPage(page)}
                        className="rounded-xl border border-white/15 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55 transition hover:border-[#D51C24]/50 hover:text-white disabled:opacity-40"
                      >
                        {officialProcessingId === page.id
                          ? t.processing
                          : page.is_active
                            ? t.deactivate
                            : t.activate}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      {contentEditorOpen && (
        <div className="fixed inset-0 z-[1350] overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[1000px] rounded-[28px] border border-[#D4AF37]/25 bg-[#090A0B] p-7 md:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D51C24]">{t.countryContent}</p>
                <h2 className="mt-3 text-3xl font-black">{countryNameForId(contentCountryId)}</h2>
                <p className="mt-2 text-xs text-[#D4AF37]">{t.contentLanguage}: {language}</p>
              </div>
              <button type="button" onClick={closeCountryContentEditor} disabled={savingCountryContent} className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40">✕</button>
            </div>
            <div className="mt-7 rounded-2xl border border-[#D4AF37]/15 bg-black/25 p-5">
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                Copy content
              </p>
              <p className="mt-2 text-sm font-semibold text-[#D4AF37]">
                {language} → {copyContentTargetLanguage}
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <select
                  value={copyContentTargetLanguage}
                  onChange={(e) => setCopyContentTargetLanguage(e.target.value as Language)}
                  disabled={savingCountryContent}
                  className="flex-1 rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]/55"
                >
                  {(["EN", "PT", "ES", "FR", "DE", "IT", "JA"] as Language[]).map((item) => (
                    <option key={item} value={item} disabled={item === language}>
                      {item}{item === language ? " (current)" : ""}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={copyCountryContentToLanguage}
                  disabled={savingCountryContent || copyContentTargetLanguage === language}
                  className="rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/5 px-6 py-3 text-[10px] uppercase tracking-[0.12em] text-[#D4AF37] disabled:opacity-40"
                >
                  Copy Content
                </button>
              </div>
              <p className="mt-3 text-[10px] leading-5 text-white/30">
                Empty source languages are blocked. If the destination already has content, you will be asked to confirm before anything is replaced.
              </p>
            </div>

            <form onSubmit={saveCountryContent} className="mt-8">
              {Object.keys(contentDraft).length === 0 ? (
                <div className="rounded-xl border border-[#D4AF37]/15 bg-black/25 px-5 py-6 text-sm text-white/40">{t.noCountryContent}</div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {Object.entries(contentDraft).map(([key, value]) => (
                    <label key={key} className={value.length > 100 ? "block md:col-span-2" : "block"}>
                      <span className="text-[9px] uppercase tracking-[0.14em] text-white/30">{key}</span>
                      {value.length > 100 ? (
                        <textarea rows={5} value={value} onChange={(e) => setContentDraft((current) => ({ ...current, [key]: e.target.value }))} className="mt-3 w-full resize-y rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-6 outline-none focus:border-[#D4AF37]/55" />
                      ) : (
                        <input value={value} onChange={(e) => setContentDraft((current) => ({ ...current, [key]: e.target.value }))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none focus:border-[#D4AF37]/55" />
                      )}
                    </label>
                  ))}
                </div>
              )}
              {countryContentFormError && <div className="mt-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs text-[#FF5960]">{countryContentFormError}</div>}
              {countryContentFormSuccess && <div className="mt-5 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-5 py-4 text-xs text-[#D4AF37]">{countryContentFormSuccess}</div>}
              <div className="mt-8 flex gap-3 border-t border-[#D4AF37]/10 pt-7">
                <button type="button" onClick={closeCountryContentEditor} disabled={savingCountryContent} className="flex-1 rounded-xl border border-white/15 px-6 py-4 text-[10px] uppercase text-white/50">{t.cancel}</button>
                <button type="submit" disabled={savingCountryContent || Object.keys(contentDraft).length === 0} className="flex-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/5 px-6 py-4 text-[10px] uppercase text-[#D4AF37] disabled:opacity-40">{savingCountryContent ? t.saving : t.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {momentFormOpen && (
        <div className="fixed inset-0 z-[1300] overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[900px] rounded-[28px] border border-[#D4AF37]/25 bg-[#090A0B] p-7 md:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D51C24]">{t.countryMoments}</p>
                <h2 className="mt-3 text-3xl font-black">{editingMoment ? t.editMoment : t.addMoment}</h2>
                <p className="mt-2 text-xs text-white/35">{language} — {editingMoment ? "editing this language" : "content language"}</p>
              </div>
              <button type="button" onClick={closeMomentForm} disabled={savingMoment} className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40">✕</button>
            </div>

            <form onSubmit={saveMoment} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.country}</span>
                  <select required value={momentForm.country_id} onChange={(e) => setMomentForm((c) => ({...c, country_id:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none">
                    <option value="">—</option>
                    {countries.map((country) => <option key={country.id} value={country.id}>{country.name}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.year}</span>
                  <input required value={momentForm.year} onChange={(e) => setMomentForm((c) => ({...c, year:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none" />
                </label>
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.momentDate}</span>
                  <input type="date" value={momentForm.event_date} onChange={(e) => setMomentForm((c) => ({...c, event_date:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none" />
                </label>
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.displayOrder}</span>
                  <input type="number" value={momentForm.display_order} onChange={(e) => setMomentForm((c) => ({...c, display_order:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.venue}</span>
                  <input value={momentForm.venue} onChange={(e) => setMomentForm((c) => ({...c, venue:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none" />
                </label>
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.momentDate} ({language})</span>
                  <input required value={momentForm.date} onChange={(e) => setMomentForm((c) => ({...c, date:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none" />
                </label>
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.location} ({language})</span>
                  <input required value={momentForm.location} onChange={(e) => setMomentForm((c) => ({...c, location:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.titleLabel} ({language})</span>
                  <input required value={momentForm.title} onChange={(e) => setMomentForm((c) => ({...c, title:e.target.value}))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.textLabel} ({language})</span>
                  <textarea required rows={7} value={momentForm.text} onChange={(e) => setMomentForm((c) => ({...c, text:e.target.value}))} className="mt-3 w-full resize-none rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-6 outline-none" />
                </label>
              </div>
              {momentFormError && <div className="mt-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs text-[#FF5960]">{momentFormError}</div>}
              {momentFormSuccess && <div className="mt-5 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-5 py-4 text-xs text-[#D4AF37]">{momentFormSuccess}</div>}
              <div className="mt-8 flex gap-3 border-t border-[#D4AF37]/10 pt-7">
                <button type="button" onClick={closeMomentForm} disabled={savingMoment} className="flex-1 rounded-xl border border-white/15 px-6 py-4 text-[10px] uppercase text-white/50">{t.cancel}</button>
                <button type="submit" disabled={savingMoment} className="flex-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/5 px-6 py-4 text-[10px] uppercase text-[#D4AF37]">{savingMoment ? t.saving : t.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {countryFormOpen && (
        <div className="fixed inset-0 z-[1200] overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[720px] rounded-[28px] border border-[#D4AF37]/25 bg-[#090A0B] p-7 md:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D51C24]">{t.countriesManagement}</p>
                <h2 className="mt-3 text-3xl font-black">
                  {editingCountry ? t.editCountry : t.addCountry}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCountryForm}
                disabled={savingCountry}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40 hover:text-white disabled:opacity-40"
              >
                ✕
              </button>
            </div>

            <form onSubmit={saveCountry} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.countryName}</span>
                  <input
                    required
                    value={countryForm.name}
                    onChange={(e) =>
                      setCountryForm((current) => ({
                        ...current,
                        name: e.target.value,
                        slug: editingCountry
                          ? current.slug
                          : makeCountrySlug(e.target.value),
                      }))
                    }
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                  />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.countryCode}</span>
                  <input
                    required
                    maxLength={3}
                    value={countryForm.code}
                    onChange={(e) =>
                      setCountryForm((current) => ({
                        ...current,
                        code: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="PT"
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm uppercase outline-none transition focus:border-[#D4AF37]/55"
                  />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.countrySlug}</span>
                  <input
                    required
                    value={countryForm.slug}
                    onChange={(e) =>
                      setCountryForm((current) => ({
                        ...current,
                        slug: makeCountrySlug(e.target.value),
                      }))
                    }
                    placeholder="portugal"
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                  />
                </label>
              </div>

              {countryFormError && (
                <div className="mt-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
                  {countryFormError}
                </div>
              )}

              {countryFormSuccess && (
                <div className="mt-5 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-5 py-4 text-xs text-[#D4AF37]">
                  {countryFormSuccess}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-[#D4AF37]/10 pt-7 sm:flex-row">
                <button
                  type="button"
                  onClick={closeCountryForm}
                  disabled={savingCountry}
                  className="flex-1 rounded-xl border border-white/15 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50 transition hover:text-white disabled:opacity-40"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={savingCountry}
                  className="flex-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10 disabled:opacity-40"
                >
                  {savingCountry
                    ? editingCountry
                      ? t.saving
                      : t.creating
                    : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {worldNewsFormOpen && (
        <div className="fixed inset-0 z-[1100] overflow-y-auto bg-black/90 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[1100px] rounded-[28px] border border-[#D4AF37]/25 bg-[#090A0B] p-7 md:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#D51C24]">
                  World News
                </p>
                <h2 className="mt-3 text-3xl font-black">
                  {editingWorldNews ? "Edit Story" : "New Story"}
                </h2>
                <p className="mt-3 max-w-[720px] text-xs leading-6 text-white/35">
                  Paste the original source URL. The importer fills the source details and creates the 7 language versions for review.
                </p>
              </div>
              <button
                type="button"
                onClick={closeWorldNewsForm}
                disabled={savingWorldNews}
                className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40 hover:text-white disabled:opacity-40"
              >
                ✕
              </button>
            </div>

            <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.04] p-5 md:p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Import from URL
              </p>
              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                <input
                  type="url"
                  value={worldNewsImportUrl}
                  onChange={(event) => setWorldNewsImportUrl(event.target.value)}
                  placeholder="https://..."
                  className="min-w-0 flex-1 rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                />
                <button
                  type="button"
                  onClick={importWorldNewsFromUrl}
                  disabled={importingWorldNews || savingWorldNews}
                  className="rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:bg-[#D4AF37]/15 disabled:opacity-40"
                >
                  {importingWorldNews ? "Importing..." : "Import"}
                </button>
              </div>
              <p className="mt-3 text-[10px] leading-5 text-white/30">
                Nothing is published automatically. Imported stories are saved as Pending until you approve them.
              </p>
            </div>

            <form onSubmit={saveWorldNews} className="mt-8">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Category
                  </span>
                  <select
                    value={worldNewsForm.category}
                    onChange={(event) =>
                      setWorldNewsForm((current) => ({
                        ...current,
                        category: event.target.value as WorldNewsCategory,
                      }))
                    }
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                  >
                    <option value="music">Music</option>
                    <option value="live">Live</option>
                    <option value="interview">Interview</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Source Name
                  </span>
                  <input
                    required
                    value={worldNewsForm.source_name}
                    onChange={(event) =>
                      setWorldNewsForm((current) => ({
                        ...current,
                        source_name: event.target.value,
                      }))
                    }
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                  />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Source URL
                  </span>
                  <input
                    required
                    type="url"
                    value={worldNewsForm.source_url}
                    onChange={(event) =>
                      setWorldNewsForm((current) => ({
                        ...current,
                        source_url: event.target.value,
                      }))
                    }
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                  />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Publication Date
                  </span>
                  <input
                    required
                    type="datetime-local"
                    value={worldNewsForm.published_at}
                    onChange={(event) =>
                      setWorldNewsForm((current) => ({
                        ...current,
                        published_at: event.target.value,
                      }))
                    }
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                  />
                  {!worldNewsForm.published_at && (
                    <p className="mt-2 text-[10px] leading-5 text-[#FF5960]">
                      Original publication date not detected. Verify it before saving.
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Event Date · Optional
                  </span>
                  <input
                    type="date"
                    value={worldNewsForm.event_date}
                    onChange={(event) =>
                      setWorldNewsForm((current) => ({
                        ...current,
                        event_date: event.target.value,
                      }))
                    }
                    className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55"
                  />
                </label>
              </div>

              <div className="mt-8 border-t border-[#D4AF37]/10 pt-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Preview / Edit · 7 Languages
                </p>

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  {WORLD_NEWS_LANGUAGES.map((code) => (
                    <div
                      key={code}
                      className="rounded-2xl border border-white/[0.07] bg-black/20 p-5"
                    >
                      <p className="text-[10px] font-black tracking-[0.18em] text-[#D51C24]">
                        {code}
                      </p>

                      <label className="mt-4 block">
                        <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">
                          Title
                        </span>
                        <input
                          required
                          maxLength={300}
                          value={worldNewsTranslationDrafts[code].title}
                          onChange={(event) =>
                            updateWorldNewsTranslation(code, "title", event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-white/10 bg-[#050607] px-4 py-3 text-sm outline-none transition focus:border-[#D4AF37]/45"
                        />
                      </label>

                      <label className="mt-4 block">
                        <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">
                          Summary
                        </span>
                        <textarea
                          required
                          rows={5}
                          maxLength={2000}
                          value={worldNewsTranslationDrafts[code].summary}
                          onChange={(event) =>
                            updateWorldNewsTranslation(code, "summary", event.target.value)
                          }
                          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#050607] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#D4AF37]/45"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {worldNewsFormError && (
                <div className="mt-6 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">
                  {worldNewsFormError}
                </div>
              )}

              {worldNewsFormSuccess && (
                <div className="mt-6 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-5 py-4 text-xs text-[#D4AF37]">
                  {worldNewsFormSuccess}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-[#D4AF37]/10 pt-7 sm:flex-row">
                <button
                  type="button"
                  onClick={closeWorldNewsForm}
                  disabled={savingWorldNews}
                  className="flex-1 rounded-xl border border-white/15 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50 transition hover:text-white disabled:opacity-40"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={savingWorldNews}
                  className="flex-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10 disabled:opacity-40"
                >
                  {savingWorldNews ? t.saving : editingWorldNews ? t.save : "Save Pending"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {profileEditorOpen && (
        <div className="fixed inset-0 z-[1500] overflow-y-auto bg-black/90 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[1180px] rounded-[28px] border border-[#D4AF37]/25 bg-[#090A0B] p-6 md:p-9">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D51C24]">{profileEditorT.editorTitle}</p>
                <h2 className="mt-3 text-2xl font-black md:text-3xl">{profileEditorData?.fan_page_name ?? "—"}</h2>
                {profileEditorData && (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="text-sm text-[#D4AF37]">{profileEditorData.username}</span>
                    <span className={`rounded-full border px-3 py-1 text-[8px] uppercase tracking-[0.15em] ${profileEditorData.profile_is_published ? "border-[#D4AF37]/30 text-[#D4AF37]" : "border-white/10 text-white/35"}`}>
                      {profileEditorData.profile_is_published ? profileEditorT.published : profileEditorT.privateDraft}
                    </span>
                  </div>
                )}
              </div>
              <button type="button" onClick={closeFanPageProfileEditor} disabled={profileEditorSaving || profileEditorPublishing} className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40">✕</button>
            </div>

            {profileEditorLoading ? (
              <div className="py-20 text-center text-sm text-white/40">{profileEditorT.loading}</div>
            ) : profileEditorData ? (
              <>
                <div className="mt-7 rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/[0.025] p-5 text-xs leading-6 text-white/50">
                  {profileEditorT.incompleteNotice}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={prepareFanPageTranslations}
                    disabled={profileEditorSaving || profileEditorPublishing}
                    className="rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D4AF37] disabled:opacity-40"
                  >
                    {profileEditorT.prepareTranslations}
                  </button>
                </div>

                {translationWorkflowOpen && (
                  <div className="mt-5 rounded-2xl border border-[#D4AF37]/15 bg-black/25 p-5">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{profileEditorT.translationPackage}</p>
                        <textarea
                          readOnly
                          value={translationPackageText}
                          rows={14}
                          className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] leading-5 text-white/55 outline-none"
                        />
                        <div className="mt-3 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={copyFanPageTranslationPackage}
                            className="rounded-xl border border-white/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55"
                          >
                            {profileEditorT.copyPackage}
                          </button>

                          <button
                            type="button"
                            onClick={downloadFanPageTranslationPackage}
                            className="rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]"
                          >
                            {profileEditorT.downloadPackage}
                          </button>
                        </div>
                      </div>

                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{profileEditorT.importTranslations}</p>
                        <textarea
                          value={translationImportText}
                          onChange={(event) => {
                            setTranslationImportText(event.target.value);
                            setProfileEditorError("");
                            setProfileEditorSuccess("");
                          }}
                          placeholder={profileEditorT.importPlaceholder}
                          rows={14}
                          className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] leading-5 text-white/65 outline-none focus:border-[#D4AF37]/50"
                        />
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={importFanPageTranslationPackage}
                            disabled={!translationImportText.trim()}
                            className="rounded-xl border border-[#D4AF37]/30 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] disabled:opacity-35"
                          >
                            {profileEditorT.importButton}
                          </button>

                          <label className="cursor-pointer rounded-xl border border-white/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]">
                            {profileEditorT.importFile}
                            <input
                              type="file"
                              accept=".json,application/json"
                              className="hidden"
                              onChange={async (event) => {
                                const input = event.currentTarget;
                                const file = input.files?.[0] ?? null;
                                input.value = "";
                                await importFanPageTranslationFile(file);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {(["EN","PT","ES","FR","DE","IT","JA"] as Language[]).map((code) => (
                    <button key={code} type="button" onClick={() => setProfileEditorLanguage(code)}
                      className={`rounded-xl border px-4 py-2 text-xs font-bold ${profileEditorLanguage === code ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]" : "border-white/10 text-white/35"}`}>
                      {code}
                    </button>
                  ))}
                </div>

                <div className="mt-7 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{profileEditorT.sourceText} · {profileEditorData.source_language ?? "—"}</p>
                    {[
                      [profileAdmin.profileIntro, profileEditorData.source.profile_intro],
                      [profileAdmin.story, profileEditorData.source.story],
                      [profileAdmin.whyNeyo, profileEditorData.source.why_neyo],
                      [profileAdmin.messageToNeyo, profileEditorData.source.message_to_neyo],
                    ].map(([label, value]) => (
                      <div key={String(label)} className="mt-5">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">{label}</p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-white/55">{value || "—"}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-[#D4AF37]/15 bg-black/25 p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]">{profileEditorT.translation} · {profileEditorLanguage}</p>
                    {([
                      ["profile_intro", profileAdmin.profileIntro],
                      ["story", profileAdmin.story],
                      ["why_neyo", profileAdmin.whyNeyo],
                      ["message_to_neyo", profileAdmin.messageToNeyo],
                    ] as Array<[keyof FanPageProfileTranslationDraft, string]>).map(([field, label]) => (
                      <label key={field} className="mt-5 block">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">{label}</span>
                        <textarea
                          value={profileTranslationDrafts[profileEditorLanguage][field]}
                          onChange={(e) => updateProfileTranslationDraft(field, e.target.value)}
                          rows={field === "profile_intro" ? 3 : 7}
                          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm leading-6 text-white/70 outline-none focus:border-[#D4AF37]/50"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">{profileEditorT.journey}</p>
                  {profileEditorData.journey.length === 0 ? (
                    <p className="mt-3 text-sm text-white/35">{profileEditorT.noJourney}</p>
                  ) : (
                    <div className="mt-4 space-y-4">
                      {profileEditorData.journey.map((moment) => (
                        <div key={moment.id} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                          <div className="grid gap-5 lg:grid-cols-2">
                            <div>
                              <p className="text-xs font-bold text-[#D4AF37]">{moment.year ?? "—"} · {profileEditorT.sourceText}</p>
                              <p className="mt-3 text-sm font-semibold text-white/70">{moment.title}</p>
                              {moment.description && <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/45">{moment.description}</p>}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#D4AF37]">{profileEditorT.translation} · {profileEditorLanguage}</p>
                              <input
                                value={journeyTranslationDrafts[moment.id]?.[profileEditorLanguage]?.title ?? ""}
                                onChange={(e) => updateJourneyTranslationDraft(moment.id, "title", e.target.value)}
                                placeholder={profileAdmin.journey}
                                className="mt-3 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white/70 outline-none focus:border-[#D4AF37]/50"
                              />
                              <textarea
                                value={journeyTranslationDrafts[moment.id]?.[profileEditorLanguage]?.description ?? ""}
                                onChange={(e) => updateJourneyTranslationDraft(moment.id, "description", e.target.value)}
                                rows={4}
                                className="mt-3 w-full resize-y rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-sm leading-6 text-white/70 outline-none focus:border-[#D4AF37]/50"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {profileEditorError && <div className="mt-6 rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">{profileEditorError}</div>}
                {profileEditorSuccess && <div className="mt-6 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-5 py-4 text-xs leading-6 text-[#D4AF37]">{profileEditorSuccess}</div>}

                <div className="mt-7 flex flex-wrap justify-end gap-3">
                  <button type="button" onClick={closeFanPageProfileEditor} disabled={profileEditorSaving || profileEditorPublishing} className="rounded-xl border border-white/10 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/45">
                    {profileEditorT.close}
                  </button>
                  <button type="button" onClick={saveFanPageProfileTranslations} disabled={profileEditorSaving || profileEditorPublishing} className="rounded-xl border border-[#D4AF37]/30 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37] disabled:opacity-40">
                    {profileEditorSaving ? t.saving : profileEditorT.saveDraft}
                  </button>
                  {!profileEditorData.profile_is_published && (
                    <button type="button" onClick={publishFanPageProfile} disabled={profileEditorSaving || profileEditorPublishing} className="rounded-xl bg-[#D51C24] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.15em] text-white disabled:opacity-40">
                      {profileEditorPublishing ? t.processing : profileEditorT.publish}
                    </button>
                  )}
                </div>
              </>
            ) : (
              profileEditorError && <div className="mt-7 rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs text-[#FF5960]">{profileEditorError}</div>
            )}
          </div>
        </div>
      )}

      {editingOfficialPage && (
        <div className="fixed inset-0 z-[1100] overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[820px] rounded-[28px] border border-[#D4AF37]/25 bg-[#090A0B] p-7 md:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D51C24]">{t.officialFanPages}</p>
                <h2 className="mt-3 text-3xl font-black">{t.editOfficialPage}</h2>
              </div>
              <button type="button" onClick={closeOfficialPageEditor} disabled={savingOfficialPage} className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40 hover:text-white disabled:opacity-40">✕</button>
            </div>

            <form onSubmit={saveOfficialPage} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.fanPageName}</span>
                  <input required value={officialEditForm.fan_page_name} onChange={(e) => setOfficialEditForm((current) => ({ ...current, fan_page_name: e.target.value }))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.usernameLabel}</span>
                  <input required value={officialEditForm.username} onChange={(e) => setOfficialEditForm((current) => ({ ...current, username: e.target.value }))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.country}</span>
                  <input required value={officialEditForm.country} onChange={(e) => setOfficialEditForm((current) => ({ ...current, country: e.target.value }))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.platform}</span>
                  <input required value={officialEditForm.platform} onChange={(e) => setOfficialEditForm((current) => ({ ...current, platform: e.target.value }))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.link}</span>
                  <input required type="url" value={officialEditForm.fan_page_link} onChange={(e) => setOfficialEditForm((current) => ({ ...current, fan_page_link: e.target.value }))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />
                </label>

                <label className="block">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.year}</span>
                  <input inputMode="numeric" value={officialEditForm.created_year} onChange={(e) => setOfficialEditForm((current) => ({ ...current, created_year: e.target.value }))} className="mt-3 w-full rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm outline-none transition focus:border-[#D4AF37]/55" />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">{t.description}</span>
                <textarea rows={5} value={officialEditForm.description} onChange={(e) => setOfficialEditForm((current) => ({ ...current, description: e.target.value }))} className="mt-3 w-full resize-none rounded-xl border border-[#D4AF37]/15 bg-black/35 px-4 py-4 text-sm leading-6 outline-none transition focus:border-[#D4AF37]/55" />
              </label>

              {officialEditError && (
                <div className="mt-5 whitespace-pre-wrap rounded-xl border border-[#D51C24]/30 bg-[#D51C24]/5 px-5 py-4 text-xs leading-6 text-[#FF5960]">{officialEditError}</div>
              )}

              {officialEditSuccess && (
                <div className="mt-5 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-5 py-4 text-xs text-[#D4AF37]">{officialEditSuccess}</div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-[#D4AF37]/10 pt-7 sm:flex-row">
                <button type="button" onClick={closeOfficialPageEditor} disabled={savingOfficialPage} className="flex-1 rounded-xl border border-white/15 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50 transition hover:text-white disabled:opacity-40">{t.cancel}</button>
                <button type="submit" disabled={savingOfficialPage} className="flex-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10 disabled:opacity-40">
                  {savingOfficialPage ? t.saving : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedApplication && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto w-full max-w-[900px] rounded-[28px] border border-[#D4AF37]/25 bg-[#090A0B] p-7 md:p-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#D51C24]">{t.fanPage}</p>
                <h2 className="mt-3 text-3xl font-black">{selectedApplication.fan_page_name}</h2>
                <p className="mt-2 text-[#D4AF37]">{selectedApplication.username}</p>
              </div>
              <button type="button" onClick={() => setSelectedApplication(null)} className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/40 hover:text-white">✕</button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: t.country, value: selectedApplication.country },
                { label: t.platform, value: selectedApplication.platform },
                { label: t.status, value: selectedApplication.status },
                { label: t.pageCreated, value: selectedApplication.created_year || "—" },
                { label: t.applicant, value: selectedApplication.applicant_name },
                { label: t.role, value: selectedApplication.applicant_role },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-[#D4AF37]/10 bg-black/25 p-4">
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{item.label}</p>
                  <p className="mt-2 text-sm text-white/70">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#D4AF37]/10 bg-black/25 p-5">
              <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{t.email}</p>
              <p className="mt-2 break-all text-sm text-white/70">{selectedApplication.applicant_email}</p>
            </div>

            {selectedApplication.description && (
              <div className="mt-6"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{t.description}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/50">{selectedApplication.description}</p></div>
            )}

            <div className="mt-6"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D51C24]">{t.reason}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/55">{selectedApplication.reason}</p></div>

            <div className="mt-8 rounded-2xl border border-[#D4AF37]/15 bg-[#D4AF37]/[0.025] p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: profileAdmin.submissionLanguage, value: selectedApplication.submission_language || "—" },
                  { label: profileAdmin.publicCreator, value: selectedApplication.public_creator_name || "—" },
                  { label: profileAdmin.fanSince, value: selectedApplication.fan_since ? String(selectedApplication.fan_since) : "—" },
                  { label: profileAdmin.favoriteSong, value: selectedApplication.favorite_song || "—" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/8 bg-black/25 p-4">
                    <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">{item.label}</p>
                    <p className="mt-2 text-sm text-white/70">{item.value}</p>
                  </div>
                ))}
              </div>

              {selectedApplication.profile_intro && (
                <div className="mt-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{profileAdmin.profileIntro}</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60">{selectedApplication.profile_intro}</p>
                </div>
              )}

              {selectedApplication.story && (
                <div className="mt-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{profileAdmin.story}</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60">{selectedApplication.story}</p>
                </div>
              )}

              {selectedApplication.why_neyo && (
                <div className="mt-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{profileAdmin.whyNeyo}</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/60">{selectedApplication.why_neyo}</p>
                </div>
              )}

              {selectedApplication.message_to_neyo && (
                <div className="mt-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D51C24]">{profileAdmin.messageToNeyo}</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/65">{selectedApplication.message_to_neyo}</p>
                </div>
              )}

              <div className="mt-6">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{profileAdmin.journey}</p>
                {Array.isArray(selectedApplication.journey) && selectedApplication.journey.length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {selectedApplication.journey.map((moment, index) => (
                      <div key={`${moment.year ?? ""}-${moment.title ?? ""}-${index}`} className="rounded-xl border border-white/8 bg-black/25 p-4">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          {moment.year !== null && moment.year !== undefined && String(moment.year).trim() && (
                            <span className="text-xs font-bold text-[#D4AF37]">{String(moment.year)}</span>
                          )}
                          {moment.title?.trim() && (
                            <span className="text-sm font-semibold text-white/75">{moment.title}</span>
                          )}
                        </div>
                        {moment.description?.trim() && (
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/50">{moment.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-white/35">{profileAdmin.journeyEmpty}</p>
                )}
              </div>
            </div>

            {selectedApplication.status === "pending" && (
              <div className="mt-6 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.04] px-5 py-4 text-xs leading-6 text-white/55">
                {profileAdmin.approvalNotice}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={selectedApplication.fan_page_link} target="_blank" rel="noreferrer" className="rounded-xl border border-[#D4AF37]/25 px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:border-[#D4AF37]">{t.link} ↗</a>
              <span className="rounded-xl border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.14em] text-white/35">✓ {t.authorization}</span>
            </div>

            <p className="mt-6 text-[9px] text-white/20">{t.submitted}: {formatDate(selectedApplication.created_at, language)}</p>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#D4AF37]/10 pt-7 sm:flex-row">
              {selectedApplication.status === "pending" ? (
                <>
                  <button type="button" disabled={processingId === selectedApplication.id} onClick={() => updateStatus(selectedApplication, "approved")} className="flex-1 rounded-xl border border-[#D4AF37]/45 bg-[#D4AF37]/5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37] transition hover:bg-[#D4AF37]/10 disabled:opacity-40">
                    {processingId === selectedApplication.id ? t.processing : t.approve}
                  </button>
                  <button type="button" disabled={processingId === selectedApplication.id} onClick={() => updateStatus(selectedApplication, "rejected")} className="flex-1 rounded-xl border border-[#D51C24]/45 bg-[#D51C24]/5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D51C24] transition hover:bg-[#D51C24]/10 disabled:opacity-40">
                    {processingId === selectedApplication.id ? t.processing : t.reject}
                  </button>
                </>
              ) : (
                <button type="button" disabled={processingId === selectedApplication.id} onClick={() => updateStatus(selectedApplication, "pending")} className="flex-1 rounded-xl border border-white/20 bg-white/[0.03] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65 transition hover:border-[#D4AF37]/45 hover:text-[#D4AF37] disabled:opacity-40">
                  {processingId === selectedApplication.id ? t.processing : t.revert}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}