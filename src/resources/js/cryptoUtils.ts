import { gcm } from '@noble/ciphers/aes.js';
import { bytesToHex, type Cipher, hexToBytes, randomBytes } from '@noble/ciphers/utils.js';
import { pbkdf2 } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';

export async function initializeOperation(isEncryption: boolean, algorithm: string, type: string, keyLength: string, cryptoKey: string, text: string) : Promise<string> {
    if (!cryptoKey) {
        return "Klucz jest wymagany!";
    } else if (cryptoKey.length < 5) {
        return `Klucz musi mieć co najmniej 5 znaków!`;
    } else if (!text) {
        return "Tekst jest wymagany!";
    }

    if (algorithm === "AES") {
        try {
            const keyHex = bytesToHex(new TextEncoder().encode(cryptoKey).slice(0, parseInt(keyLength) / 8));
            const nonceHex = bytesToHex(randomBytes(12));
            const salt = bytesToHex(randomBytes(32));
            if (isEncryption) {
                const encrypted =  await encryptAesGcm(text, keyHex, nonceHex, salt);
                return `${salt}:${nonceHex}:${encrypted}`;
            } else {
                const [salt, nonceHex, cipherTextHex] = text.split(":");
                return await decryptAesGcm(cipherTextHex, keyHex, nonceHex, salt);
            }
        } catch (e) {
            console.error(e);
            return "Błąd podczas operacji AES-GCM";
        }

    }
    return "Nieobsługiwany algorytm!";
}

export function generateRandomKey(length: number): string {
    return bytesToHex(randomBytes(length));
}

export async function encryptAesGcm(plainText: string, keyHex: string, nonceHex: string, salt: string): Promise<string> {
    const key: Uint8Array = pbkdf2(sha256, keyHex, hexToBytes(salt), { c: 524288, dkLen: 32 });
    const nonce: Uint8Array = hexToBytes(nonceHex);
    const data: Uint8Array = new TextEncoder().encode(plainText);
    const aes: Cipher = gcm(key, nonce);
    const cipher: Uint8Array = aes.encrypt(data);
    return bytesToHex(new Uint8Array(cipher));
}

export async function decryptAesGcm(cipherTextHex: string, keyHex: string, nonceHex: string, salt: string): Promise<string> {
    const key: Uint8Array = pbkdf2(sha256, keyHex, hexToBytes(salt), { c: 524288, dkLen: 32 });
    const nonce: Uint8Array = hexToBytes(nonceHex);
    const cipherText: Uint8Array = hexToBytes(cipherTextHex);
    const aes: Cipher = gcm(key, nonce);
    const plainTextBytes: Uint8Array = aes.decrypt(cipherText);
    return new TextDecoder().decode(plainTextBytes);
}
