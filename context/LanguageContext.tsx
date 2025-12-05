"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar" | "hi" | "fr";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    en: {
        home: "Home",
        about: "About Us",
        products: "Products",
        contact: "Contact",
        trade: "Trade Enquiry",
        selectLanguage: "Select Language",
    },
    ar: {
        home: "الرئيسية",
        about: "من نحن",
        products: "منتجاتنا",
        contact: "اتصل بنا",
        trade: "استفسار تجاري",
        selectLanguage: "اختر اللغة",
    },
    hi: {
        home: "होम",
        about: "हमारे बारे में",
        products: "उत्पाद",
        contact: "संपर्क करें",
        trade: "व्यापार पूछताछ",
        selectLanguage: "भाषा चुनें",
    },
    fr: {
        home: "Accueil",
        about: "À propos",
        products: "Produits",
        contact: "Contact",
        trade: "Demande commerciale",
        selectLanguage: "Choisir la langue",
    },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    // Persist language preference
    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && ["en", "ar", "hi", "fr"].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        // Update document direction for Arabic
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage: handleSetLanguage,
                t,
                dir: language === "ar" ? "rtl" : "ltr",
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
