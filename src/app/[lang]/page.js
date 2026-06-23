"use client";

import React, { useEffect } from "react";
import { FaDesktop, FaBook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import ManualTypeCard from "../../components/ManualTypeCard";
import { useTheme } from "../../components/ThemeProvider";

export default function LangLandingPage({ params }) {
  const resolvedParams = React.use(params);
  const language = resolvedParams.lang;

  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    localStorage.setItem("language", language);
  }, [language]);

  const handleManualSelect = (type) => {
    router.push(`/${language}/${type}`);
  };

  return (
    <div
      className="container-fluid d-flex flex-column h-100 min-vh-100"
      id="main-container"
    >
      <Header
        menu={false}
        search={false}
        language={language}
        manualType={null}
      />

      <div className="d-flex flex-wrap p-3 flex-grow-1 align-items-center" id="content">
        <div className="d-flex w-100 justify-content-center align-items-center flex-column py-3 py-sm-5 my-2 my-sm-5">
          <h2 className="mb-3 mb-sm-5 fw-bold text-center manual-type-heading">
            {language === "en"
              ? "Select Manual Type"
              : language === "es"
                ? "Seleccione el Tipo de Manual"
                : "Selecione o Tipo de Manual"}
          </h2>
          <div className="d-flex gap-3 gap-sm-5 flex-wrap justify-content-center">
            <ManualTypeCard
              title={
                language === "en"
                  ? "Main Manual Section"
                  : language === "es"
                    ? "Sección Principal del Manual"
                    : "Seção Principal do Manual"
              }
              description={
                language === "en"
                  ? "General Manual Information."
                  : language === "es"
                    ? "Información General del Manual."
                    : "Informações gerais do manual."
              }
              icon={FaDesktop}
              theme={theme}
              onClick={() => handleManualSelect("manual-main")}
            />
            <ManualTypeCard
              title={
                language === "en"
                  ? "Other Section"
                  : language === "es"
                    ? "Otra Sección"
                    : "Outra Seção"
              }
              description={
                language === "en"
                  ? "Access information about other topics in this manual."
                  : language === "es"
                    ? "Acceda a información sobre otros temas en este manual."
                    : "Acesse informações sobre outros tópicos neste manual."
              }
              icon={FaBook}
              theme={theme}
              onClick={() => handleManualSelect("manual-other")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
