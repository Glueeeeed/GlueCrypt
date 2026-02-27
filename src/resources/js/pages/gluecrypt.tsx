import {useState} from "react";
import {Box} from "../../components/box";
import {BoxParameters} from '../../components/boxParameters';
import {Navbar} from "../../components/navbar";


export default function Gluecrypt() {
    const [algorithm, setAlgorithm] = useState('AES');
    const [isEncryption, setIsEncryption] = useState(true);
    const [keyLength, setKeyLength] = useState('256');
    const [encKey, setEncKey] = useState('');
    const [type, setType] = useState('text');
    return (
        <>
            <Navbar />
            <div className={'flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-6 p-4'}>
                <div className={'flex w-full max-w-5xl flex-row justify-center gap-6'}>
                    <Box isEncryption={isEncryption} algorithm={algorithm} type={type} cryptoKey={encKey} keyLength={keyLength} />
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
                    />
                </div>
            </div>
        </>
    );
}
