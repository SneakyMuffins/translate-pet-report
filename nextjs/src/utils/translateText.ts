export const translateText = async () => {
    const elements = document.querySelectorAll('[translate="yes"]');

    const translationPromises = Array.from(elements).map(async (element: Element) => {
        const text = element.textContent;
        const targetLang = "es";

        if (text) {
            try {
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, targetLang }),
                });

                if (response.ok) {
                    const data = await response.json();

                    element.textContent = data.translatedText;
                } else {
                    console.error("Error fetching translation");
                }
            } catch (error) {
                console.error("Error fetching translation", error);
            }
        }
    });

    await Promise.all(translationPromises)
};