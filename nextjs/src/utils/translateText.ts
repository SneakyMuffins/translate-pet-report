export const translateText = async (targetLang: string) => {
    const elements = document.querySelectorAll('[translate="yes"]');

    // Collect texts that need translation
    const textsToTranslate = Array.from(elements).map((element: Element) => element.textContent || "");

    // Send the texts in a single API request
    if (textsToTranslate.length > 0) {
        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texts: textsToTranslate, targetLang }),
            });

            if (response.ok) {
                const data = await response.json();

                // Iterate over the response and update each element's text
                elements.forEach((element: Element, index: number) => {
                    if (element.textContent !== undefined && data.translatedTexts[index]) {
                        element.textContent = data.translatedTexts[index];
                    }
                });
            } else {
                console.error("Error fetching translation");
            }
        } catch (error) {
            console.error("Error fetching translation", error);
        }
    }
};
