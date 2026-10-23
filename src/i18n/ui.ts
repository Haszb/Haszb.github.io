// Interface strings. Page content lives in src/content/, not here.
export const languages = { en: 'English', fr: 'Français' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'nav.projects': 'Projects',
    'nav.writing': 'Writing',
    'nav.home': 'Home',
    'nav.resume': 'Resume',
    'tabs.label': 'Sections',
    'resume.title': 'Resume',
    'resume.download': 'Download PDF',
    'resume.experience': 'Experience',
    'resume.education': 'Education',
    'resume.skills': 'Skills',
    'resume.link': 'link',
    'resume.langNote': '',
    'lang.switch': 'Français',
    'lang.switchLabel': 'Lire en français',
    'home.featured': 'Selected work',
    'home.academic': 'Training projects',
    'home.academicNote': 'Team projects completed during my data science training.',
    'home.writing': 'Writing',
    'home.writingNote': 'Articles documenting the projects as they progress, published on Medium.',
    'card.readCase': 'Read the case study',
    'card.repo': 'Repository',
    'card.team': 'Team',
    'article.external': 'Medium',
    'article.minutes': 'min read',
    'article.langNote': '',
    'case.back': 'All projects',
    'case.period': 'Period',
    'case.context': 'Context',
    'case.stack': 'Stack',
    'case.links': 'Links',
    'case.related': 'Related articles',
    'chart.loading': 'Loading interactive chart…',
    'chart.fallback': 'Static version of the chart',
    'footer.built': 'Built with Astro. Hosted on GitHub Pages.',
    'contact.email': 'Email',
    'notFound.title': 'Page not found',
    'notFound.body': 'This page does not exist, or has moved.',
  },
  fr: {
    'nav.projects': 'Projets',
    'nav.writing': 'Articles',
    'nav.home': 'Accueil',
    'nav.resume': 'CV',
    'tabs.label': 'Rubriques',
    'resume.title': 'CV',
    'resume.download': 'Télécharger le PDF (en anglais)',
    'resume.experience': 'Expérience',
    'resume.education': 'Formation',
    'resume.skills': 'Compétences',
    'resume.link': 'lien',
    'resume.langNote': 'en anglais',
    'lang.switch': 'English',
    'lang.switchLabel': 'Read in English',
    'home.featured': 'Projets principaux',
    'home.academic': 'Projets de formation',
    'home.academicNote': 'Projets d’équipe réalisés pendant ma formation en data science.',
    'home.writing': 'Articles',
    'home.writingNote': 'Articles qui documentent l’avancée des projets, publiés sur Medium.',
    'card.readCase': 'Lire l’étude de cas',
    'card.repo': 'Dépôt',
    'card.team': 'Équipe',
    'article.external': 'Medium',
    'article.minutes': 'min de lecture',
    'article.langNote': 'en anglais',
    'case.back': 'Tous les projets',
    'case.period': 'Période',
    'case.context': 'Contexte',
    'case.stack': 'Outils',
    'case.links': 'Liens',
    'case.related': 'Articles liés',
    'chart.loading': 'Chargement du graphique interactif…',
    'chart.fallback': 'Version statique du graphique',
    'footer.built': 'Construit avec Astro. Hébergé sur GitHub Pages.',
    'contact.email': 'E-mail',
    'notFound.title': 'Page introuvable',
    'notFound.body': 'Cette page n’existe pas, ou a été déplacée.',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

/** Prefix a site path with the language segment (English lives at the root). */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '/' : clean}`;
}

/** The same page in the other language, given the current pathname. */
export function alternatePath(pathname: string, target: Lang): string {
  const bare = pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
  return localePath(target, bare);
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
