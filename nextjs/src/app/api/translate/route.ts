import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";
import { SUPPORTED_LANGUAGES } from "./config";

const cache = new NodeCache({ stdTTL: 86400 }); // One-day translation cache
const LIBRETRANSLATE_URL = process.env.LIBRETRANSLATE_URL;


export async function POST(req: NextRequest) {
    try {
        const { text, targetLang } = await req.json();

        if (!LIBRETRANSLATE_URL) {
            throw new Error("LIBRETRANSLATE_URL is not defined in the environment variables");
        }

        if (!text || !targetLang || !SUPPORTED_LANGUAGES.includes(targetLang)) {
            return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
        }

        const cacheKey = `${text}-${targetLang}`;
        const cachedTranslation = cache.get(cacheKey);
        if (cachedTranslation) {
            return NextResponse.json({ translatedText: cachedTranslation });
        }

        const response = await fetch(LIBRETRANSLATE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: text, source: "en", target: targetLang }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch translation");
        }

        const data = await response.json();
        const translatedText = data.translatedText;
        cache.set(cacheKey, translatedText);

        return NextResponse.json({ translatedText });
    } catch (error) {
        return NextResponse.json({ error: "Translation service unavailable" }, { status: 500 });
    }
}
