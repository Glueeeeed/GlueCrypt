import { Footer } from '../../components/gluecrypt/footer';
import { Navbar } from '../../components/gluecrypt/navbar';
import {AccountBox} from "../../components/gluecrypt_account/accountBox";
import {HistoryBox} from "../../components/gluecrypt_account/historyBox";
import {StatsBox} from "../../components/gluecrypt_account/statsBox";

interface Operation {
    date: string;
    id: string;
}

interface GluecryptAccountProps {
    nickname: string;
    userID: string;
    encryptions: number;
    decryptions: number;
    history?: Operation[];
}


export default function GluecryptAccount({nickname, userID, encryptions, decryptions, history}: GluecryptAccountProps) {
    // example history
    const exampleHistory: Operation[] = [
        { date: '2025-03-20 14:30', id: 'Ph56yuu8758' },
    ];

    const displayHistory = history || exampleHistory;

    return (
        <div className="flex min-h-screen flex-col bg-[#eff1ed]">
            <Navbar />

            <main className="grow px-4 pt-32 pb-16">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-8 text-3xl font-bold text-[#36382e]">Moje Konto</h1>
                    <div className="flex flex-row gap-8 max-md:flex-col">
                        <AccountBox nickname={nickname} userID={userID} />
                        <StatsBox encryptions={encryptions} decryptions={decryptions} />
                    </div>
                    <div className="mt-8 md:flex md:justify-center w-full gap-8">
                        <HistoryBox history={displayHistory} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
