
interface BoxProps {
    placeholder?: string;
    buttonText?: string;
    buttonColor?: string;
    secondaryButtonText?: string;
    onButtonClick?: () => void;
    onSecondaryButtonClick?: () => void;
}

export function Box({ placeholder = "Wprowadz tekst...", buttonText = "Wykonaj", buttonColor = "bg-[#36382e]", secondaryButtonText = "Wyczysc", onButtonClick, onSecondaryButtonClick }: BoxProps) {
    return (
        <div className="flex flex-col justify-center w-full h-128 bg-white rounded-2xl border-gray-100 border-2 pl-6 pr-6 shadow-sm">
            <textarea placeholder={placeholder} className="w-full h-80 p-3 resize-none bg-gray-50 border-gray-200 rounded-xl border focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"></textarea>
            <div className="flex flex-row gap-3 mt-12 justify-center">
                <button onClick={onButtonClick} className={`flex items-center justify-center gap-3 px-8 py-2.5 text-base font-bold text-white ${buttonColor} rounded-xl transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]`}>
                    <span>{buttonText}</span>
                </button>
                <button onClick={onSecondaryButtonClick} className="flex items-center justify-center gap-3 px-8 py-2.5 text-base font-bold text-gray-700 bg-gray-100 rounded-xl transition-all hover:bg-gray-200 active:scale-[0.98]">
                    <span>{secondaryButtonText}</span>
                </button>
            </div>
        </div>
    );
}
