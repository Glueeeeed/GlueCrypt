export function Navbar() {
    return (
        <nav className="fixed top-0 z-10 h-25 w-full bg-[#36382e] text-amber-50">
            <div className="flex items-center justify-between px-10 h-full">
                <a href="/gluecrypt" className="text-4xl font-['Pacifico'] text-[#eff1ed]">
                    Gluecrypt
                </a>
                <div className="flex gap-8 font-medium">
                    <a href="/gluecrypt" className="transition-opacity hover:opacity-80">
                        Szyfrowanie
                    </a>
                    <a href="/gluecrypt/account" className="transition-opacity hover:opacity-80">
                        Konto
                    </a>
                </div>
            </div>
        </nav>
    );
}
