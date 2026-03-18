import {useState} from "react";
import {Box} from "../../components/gluecrypt/box";
import {BoxParameters} from '../../components/gluecrypt/boxParameters';
import {Footer} from "../../components/gluecrypt/footer";
import {Navbar} from "../../components/gluecrypt/navbar";

interface GluecryptProps {
    baseKey?: object;
}

export default function Gluecrypt(baseKey : GluecryptProps) {
    const [algorithm, setAlgorithm] = useState('AES');
    const [isEncryption, setIsEncryption] = useState(true);
    const [keyLength, setKeyLength] = useState('256');
    const [encKey, setEncKey] = useState('');
    const [type, setType] = useState('text');
    const [saveToHistory, setSaveToHistory] = useState(true);
    return (
        <>
            <Navbar />
            <div className={'flex min-h-[calc(100vh-80px)] mt-25 w-full flex-col items-center justify-center gap-6 p-4 bg-[#eff1ed]'}>
                <div className={'flex w-full max-w-5xl flex-row justify-center gap-6 max-md:flex-col'}>
                    <Box isEncryption={isEncryption} algorithm={algorithm} type={type} cryptoKey={encKey} keyLength={keyLength} baseKey={baseKey} />
                    <BoxParameters
                        isEncryption={isEncryption}
                        setIsEncryption={setIsEncryption}
                        algorithm={algorithm}
                        type={type}
                        setType={setType}
                        setAlgorithm={setAlgorithm}
                        cryptoKey={encKey}
                        setKey={setEncKey}
                        keyLength={keyLength}
                        setKeyLength={setKeyLength}
                        saveToHistory={saveToHistory}
                        setSaveToHistory={setSaveToHistory}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}
