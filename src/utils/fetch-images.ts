import axios from 'axios';

export async function fetchImageAsFile(
    url: string,
    fileName = 'image.png',
    mimeType = 'image/png',
): Promise<File | null> {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const blob = new Blob([response.data], { type: mimeType });
        return new File([blob], fileName, { type: mimeType });
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        return null;
    }
}
