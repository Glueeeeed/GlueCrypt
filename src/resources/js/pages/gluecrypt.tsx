import {Box} from "../../components/box";
import {BoxParameters} from '../../components/boxParameters';
import {Navbar} from "../../components/navbar";


export default function Gluecrypt() {
    return (
        <>
            <Navbar />
            <div className={'flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-6 p-4'}>
                <div className={'flex w-full max-w-5xl flex-row justify-center gap-6'}>
                    <Box placeholder="Wprowadź tekst do zaszyfrowania..." buttonText="Zaszyfruj" buttonColor="bg-[#36522e]" />
                    <BoxParameters />
                </div>
                <div className={'flex w-full max-w-5xl flex-row justify-center gap-6'}>
                    <Box placeholder="Wprowadź tekst do odszyfrowania..." buttonText="Odszyfruj" buttonColor="bg-[#36382e]" />
                    <BoxParameters isEncryption={false} />
                </div>
            </div>
        </>
    );
}
