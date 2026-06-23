const translations = {
  pt: {
    // Nav
    loading: "Carregando...",
    header: "Conteúdo do manual",
    search: "Pesquisar",
    export: "Exportar para PDF",

    // Header
    placeholder: "Buscar",
    literalSearch: "Busca literal",
    caseSensitive: "Diferenciar maiúsculas de minúsculas",
    portuguese: "Português",
    english: "Inglês",
    spanish: "Espanhol",

    // ContactUs
    contactTitle: "Fale Conosco",
    terms: "Termos de Uso",
    privacy: "Política de privacidade",
    support: "Suporte a clientes: ",
    forum: "Fórum: ",
    chatEmail: "Suporte via chat e e-mail: ",
    sac: "SAC: ",
    buy: "Onde comprar? Quem instala?: ",
    producedBy: "Produzido por: ",
    location: "Rodovia SC 281, km 4,5 – Sertão do Maruim – São José/SC – 88122-001",
    origin: "Indústria Brasileira"
  },
  en: {
    // Nav
    loading: "Loading...",
    header: "Manual content",
    search: "Search",
    export: "Export to PDF",

    // Header
    placeholder: "Search",
    literalSearch: "Literal search",
    caseSensitive: "Case sensitive",
    portuguese: "Portuguese",
    english: "English",
    spanish: "Spanish",

    // ContactUs
    contactTitle: "Contact Us",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    support: "Customer Support: ",
    forum: "Forum: ",
    chatEmail: "Chat and Email Support: ",
    sac: "SAC: ",
    buy: "Where to buy? Who installs?: ",
    producedBy: "Produced by: ",
    location: "Highway SC 281, km 4.5 – Sertão do Maruim – São José/SC – 88122-001",
    origin: "Brazilian Industry"
  },
  es: {
    // Nav
    loading: "Cargando...",
    header: "Contenido del manual",
    search: "Buscar",
    export: "Exportar a PDF",

    // Header
    placeholder: "Buscar",
    literalSearch: "Búsqueda literal",
    caseSensitive: "Distinguir mayúsculas y minúsculas",
    portuguese: "Portugués",
    english: "Inglés",
    spanish: "Español",

    // ContactUs
    contactTitle: "Contáctenos",
    terms: "Términos de Uso",
    privacy: "Política de privacidad",
    support: "Soporte al cliente: ",
    forum: "Foro: ",
    chatEmail: "Soporte por chat y correo electrónico: ",
    sac: "SAC: ",
    buy: "¿Dónde comprar? ¿Quién instala?: ",
    producedBy: "Producido por: ",
    location: "Rodovia SC 281, km 4,5 – Sertão do Maruim – São José/SC – 88122-001",
    origin: "Industria Brasileña"
  }
};

const useTranslations = (language) => {
  return translations[language] || translations.pt;
};

export default useTranslations;
