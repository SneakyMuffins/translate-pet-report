import React, { useEffect, useState, createContext, useContext } from "react";
import "./App.css";
import ReportHeader from "./components/ReportHeader";
import ReportPage from "./components/ReportPage";
import ReportSection from "./components/ReportSection";
import ReportBasicInfoSection from "./components/ReportBasicInfoSection";
import ReportAdditionalInformationSection from "./components/ReportAdditionalInformationSection";
import { additionalInformation } from "./utils/constants";
import { translateText } from "./utils/translateText";

interface LanguageContextType {
    originalTexts: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType>({
    originalTexts: {},
});

const styles = {
    wrapper: {
        backgroundColor: "#052e39",
        backdropFilter: "blur(2rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column" as "column",
        gapY: "2rem",
        height: "95%",
    },
    languageSwitcher: {
        marginBottom: "20px",
    },
};

const ReportContent = React.memo(() => {
    return (
        <>
            <ReportHeader />
            <ReportPage>
                <ReportBasicInfoSection />
            </ReportPage>
            <ReportPage>
                <ReportSection title={additionalInformation.title}>
                    <ReportAdditionalInformationSection />
                </ReportSection>
            </ReportPage>
        </>
    );
})

const App: React.FC = () => {
    const [selectedLang, setSelectedLang] = useState<string>("en");
    const [originalTexts, setOriginalTexts] = useState<Record<string, string>>({});

    useEffect(() => {
        const elements = document.querySelectorAll('[translate="yes"]');
        const texts: Record<string, string> = {};

        elements.forEach((element, index) => {
            if (element.textContent) {
                texts[`text_${index}`] = element.textContent;
            }
        });

        setOriginalTexts(texts);
    }, []);

    useEffect(() => {
        translateText(originalTexts, selectedLang);
    }, [selectedLang, originalTexts]);

    return (
        <LanguageContext.Provider value={{ originalTexts }}>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.languageSwitcher}>
                        <select
                            value={selectedLang}
                            onChange={(e) => setSelectedLang(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="pt">Portuguese</option>
                        </select>
                    </div>

                    {/* Use the memoized ReportContent component */}
                    <ReportContent />
                </div>
            </div>
        </LanguageContext.Provider>
    );
};

export default App;
