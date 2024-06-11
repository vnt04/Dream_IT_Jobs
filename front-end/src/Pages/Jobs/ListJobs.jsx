function ListJobs() {
    return (  
        <div className="2xl:px-24 px-4 ">
            <div className="h-48 w-2/3 flex border-[2px] rounded-xl">
                <div className="w-1/3">
                    <img src='./src/assets/img-company/ct1.png' alt="" className="w-full h-full p-5"/>
                </div>
                <div className="">
                    <div className="font-bold text-xl">Thực tập sinh React (Fulltime)</div>
                    <div className="my-1">Samsung SDS</div>
                    <span>7 - 10 triệu</span>
                    <div className="flex gap-3 mt-1">
                        <button className="px-0.5 rounded text-blue-800 bg-blue-200">Hà Nội</button>
                        <button className="px-0.5 rounded text-blue-800 bg-blue-200">React</button>
                        <button className="px-0.5 rounded text-blue-800 bg-blue-200">Javascript</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListJobs;