import {useState} from "react";
import { initializeOperation } from '@/cryptoUtils';
import { ErrorNotification } from '../notifications/error';

interface BoxProps {
    isEncryption: boolean;
    algorithm: string;
    type: string;
    cryptoKey: string;
    keyLength: string;
    placeholder?: string;
}

interface OperationResult {
    success: boolean;
    message: string;
}

export function Box({ isEncryption, cryptoKey, algorithm, type, keyLength }: BoxProps) {
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const placeholder = isEncryption ? "Wprowadź tekst do zaszyfrowania..." : "Wprowadź tekst do odszyfrowania...";
    const buttonTextFinal = isEncryption ? "Zaszyfruj" : "Deszyfruj";
    const buttonColorFinal = isEncryption ? "bg-[#36522e]" : "bg-[#362e36]";
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const showError = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    };

    const handleAction = async () => {
        if (type === 'file' && file) {
            const result = await initializeOperation(isEncryption, algorithm, type, keyLength, cryptoKey, file) as  OperationResult;
            if (!result.success) {
                showError(result.message);
            }
        } else {
            const result  = await initializeOperation(isEncryption, algorithm, type, keyLength, cryptoKey, text) as OperationResult;
            if (result.success) {
                setText(result.message);
            } else {
                showError(result.message);
            }
        }
    };



    return (
        <div className="flex h-128 w-full flex-col justify-center rounded-2xl border-2 border-gray-100 bg-white pr-6 pl-6 shadow-sm">
            {type === 'text' ? (
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={placeholder}
                    className="h-80 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none"
                ></textarea>
            ) : (
                <div className="flex h-80 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 transition-all">
                    <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" id="file-upload" />
                    <label htmlFor="file-upload" className="flex cursor-pointer flex-col items-center gap-3 text-gray-500 hover:text-gray-700">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">
                            {file ? file.name : isEncryption ? 'Wybierz plik do zaszyfrowania' : 'Wybierz plik do odszyfrowania'}
                        </span>
                        {file && <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</span>}
                    </label>
                </div>
            )}

            {errorMessage && <ErrorNotification message={errorMessage} />}
            <div className="mt-12 flex flex-row justify-center gap-3">
                <button
                    onClick={handleAction}
                    className={`flex items-center justify-center gap-3 px-8 py-2.5 text-base font-bold text-white ${buttonColorFinal} rounded-xl transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]`}
                >
                    <span>{buttonTextFinal}</span>
                </button>
                <button
                    onClick={() => {
                        setText('');
                        setFile(null);
                    }}
                    className="flex items-center justify-center gap-3 rounded-xl bg-gray-100 px-8 py-2.5 text-base font-bold text-gray-700 transition-all hover:bg-gray-200 active:scale-[0.98]"
                >
                    <span>Wyczysc</span>
                </button>
            </div>
        </div>
    );
}
