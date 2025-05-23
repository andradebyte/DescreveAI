import { ip } from "./ip";

export async function fetchFromGemini(base64Image: string) {
    const response = await fetch(`http://${ip}/gemini/gerar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64_image: base64Image }),
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}