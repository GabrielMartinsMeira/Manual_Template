import useTranslations from "../../hooks/useTranslations";

const ContactUs = ({ language }) => {
  const t = useTranslations(language);

  return (
    <section id="fale-conosco" className="content-section manual-section">
      <div className="card mb-3">
        {/* Card title */}
        <div className="card-body text-center">
          <h5 className="card-title">{t.contactTitle}</h5>
        </div>

        <div className="card-body mx-auto text-center">
          <a href="./res/pdf/terms_of_use.pdf" target="_blank" rel="noopener noreferrer" className="d-block text-decoration-underline mb-2">
            {t.terms}
          </a>
          <a href="./res/pdf/privacy_policy.pdf" target="_blank" rel="noopener noreferrer" className="d-block text-decoration-underline mb-3">
            {t.privacy}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
