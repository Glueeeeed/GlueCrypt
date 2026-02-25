
export function Box() {
    return (
        <>
            <div className={" flex  flex-col justify-center w-[50%] h-60 bg-white rounded-2xl  border-gray-100 border-2"}>
                <textarea placeholder={"Wprowadz tekst do zaszyfrowania/odszyfrowania..."} className={" pl-2 pt-2 w-[98%] h-40 mr-2 ml-2  mb-4 resize-none  bg-gray-50 border-gray-300 rounded-sm border-collapse border"}></textarea>
                <div className={"flex flex-row  gap-2 justify-center"}>
                    <button  className=" flex items-center justify-center gap-3 px-6 py-2 text-base font-bold text-white bg-[#36382e] rounded-2xl transition-all hover:bg-black hover:shadow-xl active:scale-[0.98]">
                        <span>Odszyfruj</span>
                    </button>
                    <button  className=" flex items-center justify-center gap-3 px-6 py-2 text-base font-bold text-white bg-[#36522e] rounded-2xl transition-all hover:bg-black hover:shadow-xl active:scale-[0.98]">
                        <span>Wyczysc</span>
                    </button>
                </div>
            </div>
        </>
    )
}
