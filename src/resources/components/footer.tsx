export function Footer() {
    return (
        <>
            <footer className="bg-[#36382e] py-8 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mt-6 mb-6 md:mb-0">
                            <a className="font-['Pacifico'] text-3xl text-white" href="#">
                                GlueCrypt
                            </a>
                            <p className="mt-5 opacity-80 max-sm:text-sm">Bezpieczne i anonimowe narzędzie do szyfrowania danych za pomocą AES.</p>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-white/20 p-6 text-center">
                        <p className="opacity-80">
                            Stworzono z <i className="ri-heart-fill text-red-600"></i> przez Glueeed.
                        </p>
                        <p className="opacity-80">
                            Projekt open-source dostępny na{' '}
                            <a href="https://github.com/Glueeeeed/GlueCrypt">
                                <i className="ri-github-fill"></i> GitHub
                            </a>
                        </p>
                        <p className="mt-3 text-sm opacity-60">Version 1.0.0</p>
                    </div>
                    <div id="tsparticles"></div>
                </div>
            </footer>
        </>
    );
}
