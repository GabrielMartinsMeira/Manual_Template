"use client";

import React, { useState, useEffect } from 'react';
import Nav from "../../../components/Nav";
import Header from "../../../components/Header";
import ManualViewer from "../../../components/ManualViewer";
import ContactUs from "../../../components/ContactUs";
import { FaArrowUp } from "react-icons/fa";

export default function ManualPageClient({ lang, type, sections }) {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    localStorage.setItem("language", lang);

    const contentDiv = document.getElementById("content");
    if (!contentDiv) return;

    const handleScroll = () => {
      setIsScrolled(contentDiv.scrollTop > 50);
    };

    contentDiv.addEventListener("scroll", handleScroll);
    return () => contentDiv.removeEventListener("scroll", handleScroll);
  }, [lang]);

  const toggleSidebar = () => {
    setIsSidebarActive(prev => !prev);
  };

  return (
    <>
      <Nav 
        language={lang} 
        type={type} 
        initialSections={sections} 
        isSidebarActive={isSidebarActive} 
        toggleSidebar={toggleSidebar} 
      />
      <div
        className="container-fluid d-flex flex-column"
        id="main-container"
      >
        <Header
          language={lang}
          manualType={type}
          isSidebarActive={isSidebarActive}
          toggleSidebar={toggleSidebar}
        />

        <div className="d-flex flex-wrap p-3" id="content">
          <ManualViewer language={lang} type={type} sections={sections} />
          <ContactUs language={lang} />
        </div>
      </div>
      <div className="position-absolute bottom-0 container-fluid p-2 d-flex align-items-center">
        <button
          type="button"
          className="d-flex justify-content-center align-items-center btn ms-auto me-2 me-sm-4"
          id="scroll-top-btn"
          onClick={() => document.getElementById("content")?.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp aria-hidden="true" className={isScrolled ? "shake-animation" : ""} />
        </button>
      </div>
    </>
  );
}
