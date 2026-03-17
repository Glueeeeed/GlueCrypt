import {generateRandomKey} from '@/cryptoUtils';


interface BoxParametersProps {
    isEncryption: boolean;
    setIsEncryption: (isEncryption: boolean) => void;
    algorithm: string;
    setAlgorithm: (algorithm: string) => void;
    keyLength: string;
    cryptoKey: string;
    setKeyLength: (keyLength: string) => void;
    setKey: (key: string) => void;
    setType: (type: string) => void;
    type: string;
}

export function BoxParameters({
    cryptoKey,
    isEncryption,
    setIsEncryption,
    keyLength,
    algorithm,
    setKey,
    setKeyLength,
    setAlgorithm,
    type,
    setType,
}: BoxParametersProps) {
    const title = isEncryption ? 'Opcje Szyfrowania' : 'Opcje Deszyfrowania';
    return (
        <div className="flex w-full max-w-xs max-md:max-w-3xl flex-col gap-4 rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-sm">
            <h1 className="mb-2 text-center text-xl font-bold text-[#36382e]">{title}</h1>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Operacja</label>
                <div className="flex rounded-lg bg-gray-100 p-1">
                    <button
                        onClick={() => setIsEncryption(true)}
                        className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${isEncryption ? 'bg-[#36522e] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Szyfrowanie
                    </button>

                    <button
                        onClick={() => setIsEncryption(false)}
                        className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${!isEncryption ? 'bg-[#36522e] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Odszyfrowanie
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Algorytm</label>
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none"
                >
                    <option>AES</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Długość klucza</label>
                <select
                    value={keyLength}
                    onChange={(e) => setKeyLength(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none"
                >
                    <option value={'256'}>256 bit</option>
                    <option value={'192'}>192 bit</option>
                    <option value={'128'}>128 bit</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Typ</label>
                <div className="flex rounded-lg bg-gray-100 p-1">
                    <button
                        onClick={() => setType('text')}
                        className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${type === 'text' ? 'bg-white text-[#36382e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Tekst
                    </button>

                    <button
                        onClick={() => setType('file')}
                        className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${type === 'file' ? 'bg-white text-[#36382e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Plik
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-600">Klucz</label>
                    {isEncryption && <button onClick={() => setKey(generateRandomKey(12))} className="text-[10px] font-medium text-blue-600 hover:underline">Generuj losowy</button>}
                </div>

                {isEncryption && (
                    <input
                        type="text"
                        value={cryptoKey}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Własny klucz..."
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    />
                )}

                {!isEncryption && (
                    <input
                        type="text"
                        value={cryptoKey}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Klucz użyty do szyfrowania..."
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    />
                )}
            </div>
        </div>
    );
}
