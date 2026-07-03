const url = process.env.EXPO_PUBLIC_BASE_URL;

export async function getData() {
    try {
        const response = await fetch(url);
        const result = await response.json();

        // JOUW JSON is een array → dus direct returnen
        return result;

    } catch (error) {
        console.log("API ERROR:", error.message);
        return []; // voorkomt crashes
    }
}
