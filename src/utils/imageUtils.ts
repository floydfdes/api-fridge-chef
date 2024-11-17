import axios from 'axios';

export async function processImage(input: string | Express.Multer.File): Promise<string> {
    try {
        if (typeof input !== 'string') {
            return input.buffer.toString('base64');
        }

        if (input.startsWith('http')) {
            const response = await axios.get(input, { responseType: 'arraybuffer' });
            return Buffer.from(response.data, 'binary').toString('base64');
        }

        if (input.startsWith('data:image')) {
            return input.split(',')[1];
        }

        throw new Error('Invalid image input');
    } catch (error) {
        throw new Error('Error processing image: ' + error);
    }
}

export function validateImage(base64String: string): boolean {
    // Check if the base64 string is too large (e.g., > 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const actualSize = Buffer.from(base64String, 'base64').length;

    if (actualSize > maxSize) {
        throw new Error('Image size exceeds 5MB limit');
    }

    return true;
}
