import { useEffect, useState } from 'react';
import { initializeDecryption } from '@/history';

interface HistoryProps {
    details: any;
    baseKey: string;
}

interface DecryptedData {
    0: string;
    1: string;
    2: string;
    3: number;
}

export function History({ details, baseKey }: HistoryProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<DecryptedData | null>(null);

    useEffect(() => {

        const decrypt = async () => {
            try {
                const data = await initializeDecryption(details,baseKey);
                if (data.success && data.dataObj) {
                    setData(data.dataObj as DecryptedData);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setError('Nie udało się odszyfrować danych. Spróbuj ponownie');
                }

            } catch {
                setIsLoading(false);
                setError('Wystąpił błąd podczas odszyfrowywania.');
            }

        };

        setTimeout(() => {
            decrypt();
        }, 5000)

    }, [details, baseKey]);

    if (isLoading) {
        return (
            <div className="mt-5 w-[75%] max-md:w-full">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="py-12 text-center text-sm text-gray-400 italic">
                        Odszyfrowywanie danych...<br />
                        To może chwilę potrwać
                    </p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="mt-5 w-[75%] max-md:w-full">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="py-12 text-center text-sm text-red-400 italic">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-5 w-[75%] space-y-8 max-md:w-full">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center">
                    <button
                        onClick={() => (window.location.href = '/gluecrypt/account')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#36382e]"
                    >
                        ← Wróć
                    </button>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-bold text-[#36382e]">Szyfrowanie</h3>
                    <span className="text-[11px] tracking-wider text-gray-400 uppercase">
            {details.operation_id}
          </span>

                    <div className="mt-5 flex w-full justify-center gap-3">
                        <div className="flex w-full max-w-[50%] flex-col gap-2">
                            <label className="text-md font-bold text-[#4e5241]">Algorytm</label>
                            <input
                                disabled
                                value={data[2]}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                            />
                        </div>
                        <div className="flex w-full max-w-[50%] flex-col gap-2">
                            <label className="text-md font-bold text-[#4e5241]">Długość Klucza</label>
                            <input
                                disabled
                                value={data[3]}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex w-full justify-center gap-3">
                        <div className="flex w-full max-w-[50%] flex-col gap-2">
                            <label className="text-md font-bold text-[#4e5241]">Szyfrogram</label>
                            <textarea
                                disabled
                                value={data[0]}
                                className="h-24 w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                            />
                        </div>

                        <div className="flex w-full max-w-[50%] flex-col gap-2">
                            <label className="text-md font-bold text-[#4e5241]">Klucz</label>
                            <div className="relative w-full">
                                <input
                                    disabled
                                    type={showPassword ? 'text' : 'password'}
                                    value={data[1]}
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-950"
                                >
                                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
