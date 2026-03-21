import {useState} from "react";

interface HistoryProps {
    id: string;
}

export function History({id} : HistoryProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [inDecryptionProcess, setInDecryptionProcess] = useState(true);


    return (
        <>
            <div className="mt-5 w-[75%] space-y-8 max-md:w-full">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center">
                        <button
                            onClick={() => (window.location.href = '/gluecrypt/account')}
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#36382e]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Wróć
                        </button>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <h3 className="text-lg font-bold text-[#36382e]">Szyfrowanie</h3>
                        <span className="text-[11px] tracking-wider text-gray-400 uppercase">{id}</span>

                        {!inDecryptionProcess ? (
                            <>
                                <div className={'mt-5 flex w-full justify-center gap-3'}>
                                    <div className={'flex w-full max-w-[50%] flex-col gap-2'}>
                                        <label className="text-md font-bold text-[#4e5241]">Algorytm</label>
                                        <input
                                            disabled
                                            value={'AES'}
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                                        />
                                    </div>
                                    <div className={'flex w-full max-w-[50%] flex-col gap-2'}>
                                        <label className="text-md font-bold text-[#4e5241]">Długość Klucza</label>
                                        <input
                                            disabled
                                            value={'256'}
                                            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                                        />
                                    </div>
                                </div>
                                <div className={'mt-5 flex w-full justify-center gap-3'}>
                                    <div className={'flex w-full max-w-[50%] flex-col gap-2'}>
                                        <label className="text-md font-bold text-[#4e5241]">Szyfrogram</label>
                                        <textarea
                                            disabled
                                            className={'h-12 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'}
                                        >
                                            fghfg
                                        </textarea>
                                    </div>
                                    <div className={'flex w-full max-w-[50%] flex-col gap-2'}>
                                        <label className="text-md font-bold text-[#4e5241]">Klucz</label>
                                        <div className="relative w-full">
                                            <input
                                                disabled
                                                type={showPassword ? 'text' : 'password'}
                                                value={'256'}
                                                className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                                            />
                                            <div className="flex flex-col items-baseline-last">
                                                <button
                                                    className="absolute top-1/6 mt-4 mr-[5%] -translate-y-1/2 text-gray-400 hover:text-green-950 focus:outline-none"
                                                    id="togglePassword"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <i
                                                        className={
                                                            showPassword
                                                                ? 'fa-solid fa-eye-slash text-green-950'
                                                                : 'fa-solid fa-eye text-gray-400 hover:text-green-950'
                                                        }
                                                        id="eye"
                                                    ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="py-4 text-center text-sm text-gray-400 italic">Odszyfrowywanie.. <br></br> Historia tej operacji bedzie widoczna, gdy dane jej dane zostaną odszyfrowane</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
