import { gcm } from '@noble/ciphers/aes.js';
import { bytesToHex, type Cipher, hexToBytes, randomBytes } from '@noble/ciphers/utils.js';
import { pbkdf2 } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { openDB } from 'idb';
import {type ThumbmarkResponse} from "@thumbmarkjs/thumbmarkjs";
import * as ThumbmarkJS from "@thumbmarkjs/thumbmarkjs";



export async function getFingerprint() : Promise<ThumbmarkResponse> {
    const tm = new ThumbmarkJS.Thumbmark();
    return await tm.get();
}
export async function initializeOperation(isEncryption: boolean, algorithm: string, type: string, keyLength: string, cryptoKey: string, data: string | File, baseKey?: object) : Promise<object> {
    if (!cryptoKey) {
        return { success: false, message: 'Klucz jest wymagany!' };
    } else if (cryptoKey.length < 5) {
        return { success: false,  message: 'Klucz jest zbyt krótki! Minimum 5 znaków.' };
    } else if (!data) {
        return type === 'file' ? { success: false, message: 'Plik jest wymagany' } : { success: false,  message: 'Tekst jest wymagany!' };
    }

    if (algorithm === "AES") {
        try {
            const keyHex = bytesToHex(new TextEncoder().encode(cryptoKey).slice(0, parseInt(keyLength) / 8));

            if (type === 'file' && data instanceof File) {
                const fileData = new Uint8Array(await data.arrayBuffer());
                const nonce : Uint8Array<ArrayBufferLike> = randomBytes(12);
                const salt : Uint8Array<ArrayBufferLike> = randomBytes(32);

                if (isEncryption) {
                    const encrypted : Uint8Array<ArrayBufferLike> = await encryptAesGcmRaw(fileData, keyHex, nonce, salt);
                    const result = new Uint8Array(salt.length + nonce.length + encrypted.length);
                    result.set(salt);
                    result.set(nonce, salt.length);
                    result.set(encrypted, salt.length + nonce.length);
                    downloadFile(result, `${data.name}.gluecrypted`, "application/octet-stream");
                    return { success: true };
                } else {
                    const salt : Uint8Array<ArrayBuffer> = fileData.slice(0, 32);
                    const nonce : Uint8Array<ArrayBuffer> = fileData.slice(32, 44);
                    const cipherText : Uint8Array<ArrayBuffer> = fileData.slice(44);
                    const decrypted : Uint8Array<ArrayBufferLike> = await decryptAesGcmRaw(cipherText, keyHex, nonce, salt);
                    downloadFile(decrypted, data.name.replace(".gluecrypted", ""), "application/octet-stream");
                    return { success: true};
                }
            } else if (typeof data === 'string') {
                const nonce = bytesToBase64(randomBytes(12));
                const salt = bytesToBase64(randomBytes(32));
                if (isEncryption) {
                    const encrypted =  await encryptAesGcm(data, keyHex, nonce, salt);
                    console.log(data, keyHex, nonce, salt, encrypted);
                    const baseKeyObj = baseKey as any;
                    await saveToHistory(encrypted, keyHex, algorithm, keyLength, baseKeyObj.baseKey );
                    return { success: true, message: `${salt}:${nonce}:${encrypted}` };
                } else {
                    const [salt, nonce, cipherText] = data.split(":");
                    const decrypted = await decryptAesGcm(cipherText, keyHex, nonce, salt);
                    return { success: true, message: decrypted };
                }
            }
        } catch (e) {
            console.error(e);
            return { success: false, message: 'Błąd podczas operacji kryptograficznej!' };

        }
    }
    return { success: false, message: 'Nieobsługiwany algorytm!' };
}

function downloadFile(data: Uint8Array | BlobPart, filename: string, mimeType: string) {
    const blob = new Blob([data as Uint8Array<ArrayBuffer>], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

export async function encryptAesGcmRaw(data: Uint8Array, keyHex: string, nonce: Uint8Array, salt: Uint8Array): Promise<Uint8Array> {
    const key: Uint8Array = pbkdf2(sha256, keyHex, salt, { c: 524288, dkLen: 32 });
    const aes: Cipher = gcm(key, nonce);
    return aes.encrypt(data);
}

export async function decryptAesGcmRaw(cipherText: Uint8Array, keyHex: string, nonce: Uint8Array, salt: Uint8Array): Promise<Uint8Array> {
    const key: Uint8Array = pbkdf2(sha256, keyHex, salt, { c: 524288, dkLen: 32 });
    const aes: Cipher = gcm(key, nonce);
    return aes.decrypt(cipherText);
}

export function generateRandomKey(length: number): string {
    return bytesToHex(randomBytes(length));
}

export async function encryptAesGcm(plainText: string, keyHex: string, nonceBase64: string, saltBase64: string): Promise<string> {
    const key: Uint8Array = pbkdf2(sha256, keyHex, base64ToBytes(saltBase64), { c: 524288, dkLen: 32 });
    const nonce: Uint8Array = base64ToBytes(nonceBase64);
    const data: Uint8Array = new TextEncoder().encode(plainText);
    const aes: Cipher = gcm(key, nonce);
    const cipher: Uint8Array = aes.encrypt(data);
    return bytesToBase64(cipher);
}

export async function decryptAesGcm(cipherTextBase64: string, keyHex: string, nonceBase64: string, saltBase64: string): Promise<string> {
    const key: Uint8Array = pbkdf2(sha256, keyHex, base64ToBytes(saltBase64), { c: 524288, dkLen: 32 });
    const nonce: Uint8Array = base64ToBytes(nonceBase64);
    const cipherText: Uint8Array = base64ToBytes(cipherTextBase64);
    const aes: Cipher = gcm(key, nonce);
    const plainTextBytes: Uint8Array = aes.decrypt(cipherText);
    return new TextDecoder().decode(plainTextBytes);
}

async function getUserSecrets(): Promise<string[]> {
    const secrets: string[] = [];
    const db = await openDB('gluecrypt', 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('secrets')) {
                db.createObjectStore('secrets');
            }
        },
    });
    const secretKey : string = await db.get('secrets', 'privateKey');
    const salt : string = await db.get('secrets', 'salt');
    const privateKeyNonce : string = await db.get('secrets', 'privateKeyNonce');
    secrets.push(secretKey, salt, privateKeyNonce);
    console.log(secrets);
    return secrets;
}


async function saveToHistory(text: string, key: string, algorithm: string,keyLength: string, baseKey : string): Promise<void> {
    const fingerprint = await getFingerprint();
    const deviceID = localStorage.getItem('DeviceID') as string;
    const combinedKey = fingerprint.thumbmark + deviceID + baseKey;
    console.log(fingerprint.thumbmark,deviceID,baseKey,combinedKey);
    const secrets : string[] = await getUserSecrets();
    const secretKey : string =  await decryptAesGcm(secrets[0], combinedKey, secrets[2], secrets[1]);
    const keyNonce : string = bytesToBase64(randomBytes(12));
    const textNonce : string = bytesToBase64(randomBytes(12));
    const operationSalt : string = bytesToBase64(randomBytes(16));
    const keyCipher : string = await encryptAesGcm(key, secretKey, keyNonce, operationSalt);
    const textCipher : string = await encryptAesGcm(text, secretKey, textNonce, operationSalt);
    console.log(keyCipher, textCipher, algorithm, keyLength);

}

function bytesToBase64(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes));
}

function base64ToBytes(base64: string): Uint8Array {
    return new Uint8Array(atob(base64).split('').map((c) => c.charCodeAt(0)),
    );
}
