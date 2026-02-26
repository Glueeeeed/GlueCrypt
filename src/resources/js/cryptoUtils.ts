
export function initializeOperation(isEncryption: boolean, algorithm: string, type: string, keyLength: string, cryptoKey: string, text: string) : string {
    if (!cryptoKey) {
        return "Klucz jest wymagany!";
    } else if (cryptoKey.length < 5) {
        return `Klucz musi mieć co najmniej 5 znaków!`;
    } else if (!text) {
        return "Tekst jest wymagany!";
    }


    console.log(`Initializing...`, { algorithm, cryptoKey });
    return "Operacja została zainicjowana! (To jest tylko symulacja, rzeczywista implementacja będzie wymagała dodatkowej logiki)";
}

export function generateRandomKey(length: number): string {
    crypto.getRandomValues(new Uint8Array(length)).reduce((key, byte) => key + byte.toString(16).padStart(2, '0'), '');
    return crypto.getRandomValues(new Uint8Array(length)).reduce((key, byte) => key + byte.toString(16).padStart(2, '0'), '');
}
