import { bytesToHex, hexToBytes } from '@noble/ciphers/utils.js';
import { pbkdf2 } from '@noble/hashes/pbkdf2.js';
import { sha256 } from '@noble/hashes/sha2.js';
import {decryptAesGcm, decryptSecrets, getUserSecrets } from '@/cryptoUtils';


interface Data {
    dataObj: object,
    success: boolean,
}
export async function decryptHistory(data : any, baseKey: string) : Promise<any> {
    const decryptedData : string[] = []
    const deviceID = localStorage.getItem('DeviceID') as string;
    const combinedKey = sessionStorage.fingerprint + deviceID + baseKey;
    const secrets: string[] = await getUserSecrets();
    const textNonce = data[0].textNonce;
    const keyNonce = data[0].keyNonce;
    const operationSalt = data[0].operation_salt;
    const secret: string = bytesToHex(pbkdf2(sha256, combinedKey, hexToBytes(secrets[1]), { c: 524288, dkLen: 32 }));
    const secretKey : string =  await decryptSecrets(secrets[0], secret, secrets[2]);
    const decryptedText : string = await decryptAesGcm(data[0].encrypted_text,secretKey,textNonce,operationSalt);
    const decryptedKey : string = await decryptAesGcm(data[0].encrypted_key,secretKey,keyNonce,operationSalt);
    decryptedData.push(decryptedText);
    decryptedData.push(decryptedKey);
    decryptedData.push(data[0].algorithm);
    decryptedData.push(data[0].key_size);
    return decryptedData;
}

export async function initializeDecryption(details: object, baseKey: string) : Promise<Data> {
    let isSuccess;
    let data;
    try {
        data = await decryptHistory(details, baseKey);
        isSuccess = true;
    }  catch {
        console.log('failed to decrypt');
        isSuccess = false;
    }

    return {dataObj: data, success: isSuccess}
}
