import {useState} from 'react';

interface BoxParametersProps {
    isEncryption?: boolean;
}

export function BoxParameters({ isEncryption = true }: BoxParametersProps) {
    const title = isEncryption ? "Opcje Szyfrowania" : "Opcje Deszyfrowania";
    const [type, setType] = useState("text");
    return (
        <div className="flex w-full max-w-xs flex-col gap-4 rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-sm">
            <h1 className="mb-2 text-center text-xl font-bold text-[#36382e]">{title}</h1>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Algorytm</label>
                <select className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none">
                    <option>AES</option>
                    <option>ChaCha20</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Długość klucza</label>
                <select className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none">
                    <option>128 bit</option>
                    <option>192 bit</option>
                    <option>256 bit</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Typ</label>
                <div className="flex rounded-lg bg-gray-100 p-1">
                    <button
                        onClick={() => setType('text')}
                        className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all  ${type === 'text' ? 'bg-white text-[#36382e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        Tekst
                    </button>

                    <button
                        onClick={() => setType('file')}
                        className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-all ${type === 'file' ? 'bg-white text-[#36382e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        Plik
                    </button>

                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-600">Klucz</label>
                    {isEncryption && <button className="text-[10px] font-medium text-blue-600 hover:underline">Generuj losowy</button>}
                </div>

                {isEncryption && (
                    <input
                        type="text"
                        placeholder="Własny klucz..."
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    />
                )}

                {!isEncryption && (
                    <input
                        type="text"
                        placeholder="Wprowadź klucz użyty do szyfrowania..."
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2 text-sm focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    />
                )}
            </div>
        </div>
    );
}
