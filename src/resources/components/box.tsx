import {useState} from "react";
import {initializeOperation} from "@/cryptoUtils";

interface BoxProps {
    isEncryption: boolean;
    algorithm: string;
    type: string;
    cryptoKey: string;
    keyLength: string;
    placeholder?: string;
}

export  function Box({ isEncryption, cryptoKey, algorithm,type,keyLength }: BoxProps) {
    const [text, setText] = useState("");
    const placeholder = isEncryption ? "Wprowadź tekst do zaszyfrowania..." : "Wprowadź tekst do odszyfrowania...";
    const buttonTextFinal = isEncryption ? "Zaszyfruj" : "Deszyfruj";
    const buttonColorFinal = isEncryption ? "bg-[#36522e]" : "bg-[#362e36]";

    return (
        <div className="flex h-128 w-full flex-col justify-center rounded-2xl border-2 border-gray-100 bg-white pr-6 pl-6 shadow-sm">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                className="h-80 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all focus:ring-2 focus:ring-gray-200 focus:outline-none"
            ></textarea>
            <div className="mt-12 flex flex-row justify-center gap-3">
                <button
                    onClick={async () => setText(await initializeOperation(isEncryption, algorithm, type, keyLength, cryptoKey, text))}
                    className={`flex items-center justify-center gap-3 px-8 py-2.5 text-base font-bold text-white ${buttonColorFinal} rounded-xl transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]`}
                >
                    <span>{buttonTextFinal}</span>
                </button>
                <button
                    onClick={() => setText('')}
                    className="flex items-center justify-center gap-3 rounded-xl bg-gray-100 px-8 py-2.5 text-base font-bold text-gray-700 transition-all hover:bg-gray-200 active:scale-[0.98]"
                >
                    <span>Wyczysc</span>
                </button>
            </div>
        </div>
    );
}
