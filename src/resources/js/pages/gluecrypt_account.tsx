import { Footer } from '../../components/gluecrypt/footer';
import { Navbar } from '../../components/gluecrypt/navbar';

export default function GluecryptAccount() {
    return (
        <div className="flex min-h-screen flex-col bg-[#eff1ed]">
            <Navbar />

            <main className="grow px-4 pt-32 pb-16">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-8 text-3xl font-bold text-[#36382e]">Moje Konto</h1>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="md:col-span-1">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex flex-col items-center">
                                    <h2 className="text-xl font-bold text-gray-800">Glueeed</h2>
                                    <p className="text-sm text-gray-500">45i347548675675666</p>
                                </div>

                                <div className="space-y-2">
                                    <button className="w-full rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                                        Edytuj profil
                                    </button>
                                    <button className="w-full rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                                        Historia Operacji
                                    </button>
                                    <button className="w-full rounded-lg bg-red-50 px-4 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-100">
                                        Wyloguj się
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 md:col-span-2">
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-bold text-[#36382e]">Statystyki GlueCrypt</h3>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-2xl font-bold text-[#36522e]">124</p>
                                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Zaszyfrowano</p>
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-2xl font-bold text-[#362e36]">56</p>
                                        <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">Odszyfrowano</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
