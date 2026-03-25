interface HistoryProps {
    details: object
    baseKey: string
}

import { Footer } from '../../components/gluecrypt/footer';
import { Navbar } from '../../components/gluecrypt/navbar';
import { History } from '../../components/gluecrypt_history/history';

export default function GluecryptHistory({details, baseKey}: HistoryProps) {
    return (
        <>
            <div className="flex min-h-screen flex-col bg-[#eff1ed]">
                <Navbar />

                <main className="grow px-4 pt-32 pb-16">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="mb-8 text-3xl font-bold text-center text-[#36382e]">Historia</h1>
                        <div className="mt-8 w-full gap-8 md:flex md:justify-center">
                            <History details={details} baseKey={baseKey} />
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
