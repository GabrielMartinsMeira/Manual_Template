"use client";

import React from 'react';
import ManualSection from '../ManualSection';
import useTranslations from '../../hooks/useTranslations';

const ManualViewer = ({ language, type = "manual-main", sections }) => {
    const t = useTranslations(language);

    if (!sections || sections.length === 0) {
        return (
            <div className="d-flex justify-content-center p-5 w-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">
                        {t.loading || (language === "en" ? "Loading manual..." : "Carregando manual...")}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-100 manual-container">
            {sections.map(section => (
                <ManualSection key={`${section.slug}-${language}-${type}`} section={section} language={language} type={type} />
            ))}
        </div>
    );
};

export default ManualViewer;
