"use client";

import { useEffect } from "react";
import { FaSun, FaMoon, FaAlignJustify, FaGlobe, FaSearch, FaArrowDown, FaArrowUp, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useTranslations from "../../hooks/useTranslations";
import { useTheme } from "../ThemeProvider";
import useSearch from "../../hooks/useSearch";

const Header = ({ menu = true, search = true, language, manualType, isSidebarActive, toggleSidebar }) => {
  const t = useTranslations(language);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const {
    searchTerm,
    setSearchTerm,
    isLiteralSearch,
    setIsLiteralSearch,
    isCaseSensitive,
    setIsCaseSensitive,
    handleNext,
    handlePrev,
    handleClear,
    currentIndex,
    totalResults
  } = useSearch('#content');

  useEffect(() => {
    const closeSearch = () => {
      const searchCollapse = document.getElementById('search-collapse');
      if (searchCollapse && searchCollapse.classList.contains('show')) {
        if (typeof window !== 'undefined') {
          import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
            const bsCollapse = bootstrap.Collapse.getInstance(searchCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            } else {
              searchCollapse.classList.remove('show');
            }
          }).catch(() => {
            searchCollapse.classList.remove('show');
          });
        }
      }
    };

    const handleClickOutside = (event) => {
      const searchCollapse = document.getElementById('search-collapse');
      const isClickInsideSearch = searchCollapse && searchCollapse.contains(event.target);
      const isClickOnToggleButton = event.target.closest('[data-bs-target="#search-collapse"]');
      
      if (!isClickInsideSearch && !isClickOnToggleButton) {
        closeSearch();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLanguageChange = (newLanguage) => {
    if (manualType) {
      router.push(`/${newLanguage}/${manualType}`);
    } else {
      router.push(`/${newLanguage}`);
    }
  };

  const handleGoBack = () => {
    router.push(`/${language}`);
  };

  return (
    <div
      className="d-flex flex-row ps-0 pe-xss-0 align-items-center position-relative"
      id="header-row"
    >
      {manualType && (
        <div className="p-3 pe-1 d-sm-block">
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            type="button"
            onClick={handleGoBack}
          >
            <span>&larr;</span>
            <span className="d-none d-md-inline">
              {language === "en" ? "Go Back" : language === "es" ? "Volver" : "Voltar"}
            </span>
          </button>
        </div>
      )}
      {menu && manualType && (
        <div className="p-3 d-sm-block ps-1">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="sidebarCollapse"
            onClick={toggleSidebar}
          >
            <FaAlignJustify id="menu-icon" />
          </button>
        </div>
      )}

      <div className="p-3 ms-xss-auto ms-md-0" id="header-img-div">
      </div>
      <div
        className="p-3 me-md-auto ms-md-0 ms-sm-auto d-sm-block d-md-block d-xss-none"
        id="product-name-div"
      >
        <p className="h5 header-h4 mb-0">Manual Template</p>
      </div>

      <div className="p-3 d-flex align-items-center gap-2 ms-auto">
        <div className="dropdown me-2">
          <button
            className="btn btn-outline-secondary btn-sm dropdown-toggle d-flex align-items-center justify-content-between gap-2"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="d-flex align-items-center gap-1">
              <FaGlobe />
              <span className="d-none d-sm-inline">
                {language === "pt" ? "PT-BR" : language === "en" ? "EN" : "ES"}
              </span>
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-center" aria-labelledby="languageDropdown">
            <li>
              <button
                className={`dropdown-item ${language === "pt" ? "active" : ""}`}
                type="button"
                onClick={() => handleLanguageChange("pt")}
              >
                {t.portuguese}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${language === "en" ? "active" : ""}`}
                type="button"
                onClick={() => handleLanguageChange("en")}
              >
                {t.english}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${language === "es" ? "active" : ""}`}
                type="button"
                onClick={() => handleLanguageChange("es")}
              >
                {t.spanish}
              </button>
            </li>
          </ul>
        </div>

        <FaSun className="theme-switch-icon sun-icon" />
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
        </div>
        <FaMoon className="theme-switch-icon moon-icon" />

        {search && (
          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#search-collapse"
            aria-controls="search-collapse"
            id="search-btn"
          >
            <span className="d-none d-xl-inline text-white small">
              {t.search}
            </span>
            <FaSearch className="text-white small" />
          </button>
        )}
      </div>

      <div
        className="collapse position-absolute end-0 me-3 mt-2 rounded-3"
        id="search-collapse"
      >
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="h6 mb-0 text-body fw-bold">
              {t.search}
            </p>
            <button
              type="button"
              className="btn btn-link text-body p-0 border-0 shadow-none d-flex align-items-center justify-content-center"
              data-bs-toggle="collapse"
              data-bs-target="#search-collapse"
              aria-label="Close"
            >
              <FaTimes size={18} />
            </button>
          </div>
          <div className="pb-1">
            <div id="search-bar">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex w-100 gap-1">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="searchBar"
                      id="searchBar"
                      placeholder={t.placeholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleNext();
                      }}
                    />
                  </div>
                  <div className="btn-group" role="group">
                    <button
                      onClick={handleNext}
                      className="btn btn-outline-secondary"
                    >
                      <FaArrowDown aria-hidden="true" />
                    </button>
                    <button
                      onClick={handlePrev}
                      className="btn btn-outline-secondary"
                    >
                      <FaArrowUp aria-hidden="true" />
                    </button>
                    <button
                      onClick={handleClear}
                      className="btn btn-outline-secondary"
                    >
                      <FaTimes aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              {totalResults > 0 && (
                <div className="text-center mt-2 small text-muted">
                  {currentIndex + 1} / {totalResults}
                </div>
              )}
              <div className="form-check mt-3 d-flex justify-content-center align-items-center gap-2">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  id="literalSearchCheck"
                  checked={isLiteralSearch}
                  onChange={(e) => setIsLiteralSearch(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="literalSearchCheck">
                  {t.literalSearch}
                </label>
              </div>
              <div className="form-check mt-2 d-flex justify-content-center align-items-center gap-2">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  id="caseSensitiveCheck"
                  checked={isCaseSensitive}
                  onChange={(e) => setIsCaseSensitive(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="caseSensitiveCheck">
                  {t.caseSensitive}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
