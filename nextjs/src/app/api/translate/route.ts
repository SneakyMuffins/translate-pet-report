import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";
import { SUPPORTED_LANGUAGES } from "./config";
import { fetchTranslations } from "./utils";

const cache = new NodeCache({ stdTTL: 86400 }); // One-day translation cache

export async function POST(req: NextRequest) {
    try {
        const { texts, targetLang } = await req.json();

        if (!texts || !Array.isArray(texts) || texts.length === 0 || !targetLang || !SUPPORTED_LANGUAGES.includes(targetLang)) {
            return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
        }

        // Prepare cache keys based on texts and target language
        const cacheKeys = texts.map((text: string) => `${text}-${targetLang}`);
        const cachedTranslations = texts.map((text: string, index: number) => cache.get(cacheKeys[index]));

        // Check if any translations are cached
        const translations = cachedTranslations.every((cachedTranslation) => cachedTranslation !== undefined)
            ? cachedTranslations
            : await fetchTranslations(texts, targetLang, cacheKeys, cache);

        return NextResponse.json({ translatedTexts: translations });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Translation service unavailable" }, { status: 500 });
    }
}
