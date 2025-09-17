export const sidebarTranslations = {
  es: {
    themeToggle: {
      light: 'Tema Claro',
      dark: 'Tema Oscuro',
      switch: 'Cambiar tema'
    },
    language: {
      selector: 'Idioma',
      spanish: 'Español',
      english: 'English'
    },
    navigation: {
      overview: 'Vista General',
      components: 'Componentes',
      expand: 'Expandir',
      collapse: 'Contraer'
    }
  },
  en: {
    themeToggle: {
      light: 'Light Theme',
      dark: 'Dark Theme',
      switch: 'Toggle theme'
    },
    language: {
      selector: 'Language',
      spanish: 'Español',
      english: 'English'
    },
    navigation: {
      overview: 'Overview',
      components: 'Components',
      expand: 'Expand',
      collapse: 'Collapse'
    }
  }
};

export const getSidebarTranslations = (language: string) => {
  return sidebarTranslations[language as keyof typeof sidebarTranslations] || sidebarTranslations.es;
};