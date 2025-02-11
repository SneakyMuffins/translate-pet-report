import NodeCache from "node-cache"

const LIBRETRANSLATE_URL = process.env.LIBRETRANSLATE_URL

export const fetchTranslations = async (texts: string[], targetLang: string, cacheKeys: string[], cache: NodeCache) => {
    try {
        if (!LIBRETRANSLATE_URL) {
            throw new Error("LIBRETRANSLATE_URL is not defined in the environment variables");
        }

        const response = await fetch(LIBRETRANSLATE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: texts, source: "en", target: targetLang }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch translation");
        }

        const data = await response.json();
        const translatedTexts = data.translatedText || [];

        // Cache translations for each text
        translatedTexts.forEach((translatedText: string, index: number) => {
            if (translatedText) {
                cache.set(cacheKeys[index], translatedText);
            }
        });

        return translatedTexts;
    } catch (error) {
        throw new Error("Failed to fetch translations from LibreTranslate");
    }
};
