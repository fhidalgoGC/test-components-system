export const navbarTranslations = {
  es: {
    loading: 'Cargando...',
    title: 'Título',
    description: 'Descripción'
  },
  en: {
    loading: 'Loading...',
    title: 'Title',
    description: 'Description'
  }
};

export const getNavbarTranslations = (language: string) => {
  return navbarTranslations[language as keyof typeof navbarTranslations] || navbarTranslations.es;
};