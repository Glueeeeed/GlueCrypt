interface AccountBoxProps {
    nickname: string;
    userID: string;
}
export function AccountBox({nickname, userID}: AccountBoxProps) {
    return (
        <div className="md:col-span-1 w-[50%] max-md:w-full">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        {nickname ? nickname : 'User'}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {userID ? userID : '0000000000000000'}
                    </p>
                </div>

                <div className="space-y-2">
                    <button className="opacity-60 grayscale cursor-not-allowed w-full rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                        Edytuj profil
                    </button>
                    <button className="w-full rounded-lg bg-red-50 px-4 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-100">
                        Wyloguj się
                    </button>
                </div>
            </div>
        </div>
    );
}
