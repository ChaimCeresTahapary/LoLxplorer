import localChampions from '../data/Champs.json';

export async function getData() {
    const url = process.env.EXPO_PUBLIC_BASE_URL;

    console.log(`API URL: ${url}`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log(`API ERROR: HTTP ${response.status}`);
            return localChampions; // fallback
        }

        const text = await response.text();
        const result = JSON.parse(text);

        return Array.isArray(result) ? result : localChampions;

    } catch (error) {
        console.log(`API ERROR: ${error.message}`);
        return localChampions; // fallback
    }
}
