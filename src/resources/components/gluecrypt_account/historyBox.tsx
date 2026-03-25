interface Operation {
    created_at: string;
    operation_id: string;
}


interface HistoryBoxProps {
    history: Operation[];
    userId?: string;

}

export function HistoryBox({ history = [] }: HistoryBoxProps) {
    const recentHistory = history

    return (
        <div className="mt-5 w-[75%] space-y-8 max-md:w-full">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-[#36382e]">Historia Szyfrowań</h3>
                <div className="flex max-h-90 scroll-p-1 flex-col gap-3 overflow-y-auto pr-3">
                    {recentHistory.length > 0 ? (
                        recentHistory.map((op, idx) => (
                            <div
                                key={idx}
                                className="transition-hover flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-[#36382e]"> Szyfrowanie </p>
                                        <p className="text-[10px] tracking-wider text-gray-400 uppercase">
                                            {op.operation_id} |{' '}
                                            {op.created_at.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z/, '$3.$2.$1 $4:$5:$6')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {window.location.href = `/gluecrypt/account/history/${op.operation_id}`}}
                                    className={'text-[#36382e] hover:underline'}
                                >
                                    <span className="text-xs font-bold">Zobacz</span>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="py-4 text-center text-sm text-gray-400 italic">Brak historii operacji</p>
                    )}
                </div>
            </div>
        </div>
    );
}
