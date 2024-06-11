import { FaSearch } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

function QuickSearch() {
    return (  
        <div className="2xl:px-24 px-4 md:py-4 py-2 h-60 bg-[#93efeb]">
            <div className="flex items-center">
                <IoIosFlash  className="size-10 text-yellow-400" />
                <h1 className="font-bold text-xl my-5">Tìm việc làm IT nhanh chóng - Cơ hội tốt ngay hôm nay!</h1>
            </div>
            <div className="flex items-center gap-2 h-16 rounded bg-white">
                <div className="pl-3 flex-1 lg:text-base">
                    <input type="text" className="w-full border-none outline-none text-[16px]"
                        placeholder="Tìm kiếm theo các Kỹ năng, Vị trí, Công ty,..."
                    />
                </div>
                <div className="m-5">
                    <button className="flex items-center h-12 px-4 font-bold text-white text-[18px] border border-solid rounded bg-background">
                        <FaSearch className="mx-2"/>
                        Tìm kiếm
                    </button>
                </div>
            </div>
            <div className="mt-5 flex gap-2 items-center">
                <h2>Đề xuất từ khóa : </h2>
                <div className="flex gap-3">
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">Java</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">C++</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">JavaScript</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">React</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">C#</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">Python</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">Fresher</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">Intern</button>
                    <button className="w-auto px-2 py-1 items-center border border-solid rounded bg-white">Backend</button>
                    
                </div>
            </div>
        </div>
    );
}

export default QuickSearch;