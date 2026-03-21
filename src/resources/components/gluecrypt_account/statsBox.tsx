interface StatsBoxProps {
    decryptions: number;
     encryptions: number;
}
export function StatsBox({decryptions, encryptions} : StatsBoxProps) {
    return (
        <div className="space-y-8 w-full">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#36382e]">Statystyki GlueCrypt</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-2xl font-bold text-[#36522e]">{encryptions ? encryptions : 0}</p>
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Zaszyfrowano</p>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-2xl font-bold text-[#362e36]">{decryptions ? decryptions : 0}</p>
                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Odszyfrowano</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
