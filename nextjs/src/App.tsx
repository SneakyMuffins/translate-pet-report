import React, { useEffect, useState } from "react";
import "./App.css";
import ReportHeader from "./components/ReportHeader";
import ReportPage from "./components/ReportPage";
import ReportSection from "./components/ReportSection";
import ReportBasicInfoSection from "./components/ReportBasicInfoSection";
import ReportAdditionalInformationSection from "./components/ReportAdditionalInformationSection";
import { additionalInformation } from "./utils/constants";
import { translateText } from "./utils/translateText";

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
    }
};

function App() {
    const [selectedLang, setSelectedLang] = useState("es");

    useEffect(() => {
        translateText(selectedLang);
    }, [selectedLang]);

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <div style={styles.languageSwitcher}>
                    <select
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                    >
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="pt">Portuguese</option>
                    </select>
                </div>

                <ReportHeader />
                <ReportPage>
                    <ReportBasicInfoSection />
                </ReportPage>
                <ReportPage>
                    <ReportSection title={additionalInformation.title}>
                        <ReportAdditionalInformationSection />
                    </ReportSection>
                </ReportPage>
            </div>
        </div>
    );
}

export default App;
