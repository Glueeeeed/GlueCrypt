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

export function Box({ isEncryption, cryptoKey, algorithm,type,keyLength }: BoxProps) {
    const [text, setText] = useState("");
    const placeholder = isEncryption ? "Wprowadź tekst do zaszyfrowania..." : "Wprowadź tekst do odszyfrowania...";
    const buttonTextFinal = isEncryption ? "Zaszyfruj" : "Deszyfruj";
    const buttonColorFinal = isEncryption ? "bg-[#36522e]" : "bg-[#362e36]";

    return (
        <div className="flex flex-col justify-center w-full h-128 bg-white rounded-2xl border-gray-100 border-2 pl-6 pr-6 shadow-sm">
            <textarea value={text} onChange={(e) => setText(e.target.value)}  placeholder={placeholder} className="w-full h-80 p-3 resize-none bg-gray-50 border-gray-200 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"></textarea>
            <div className="flex flex-row gap-3 mt-12 justify-center">
                <button onClick={ (e) => setText(initializeOperation(isEncryption, algorithm, type, keyLength, cryptoKey, text)) } className={`flex items-center justify-center gap-3 px-8 py-2.5 text-base font-bold text-white ${buttonColorFinal} rounded-xl transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]`}>
                    <span>{buttonTextFinal}</span>
                </button>
                <button onClick={(e) => setText("")}  className="flex items-center justify-center gap-3 px-8 py-2.5 text-base font-bold text-gray-700 bg-gray-100 rounded-xl transition-all hover:bg-gray-200 active:scale-[0.98]">
                    <span>Wyczysc</span>
                </button>
            </div>
        </div>
    );
}
