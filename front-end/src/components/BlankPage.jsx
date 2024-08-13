import { TbMoodEmpty } from "react-icons/tb";

function BlankPage() {
  return (
    <div className="container ">
      <div className="py-20 flex flex-col items-center justify-center">
          <TbMoodEmpty className="size-60 text-gray-400 " />
          <span className="text-xl font-bold text-center">
            Xin lỗi! Chức năng này chưa được cập nhật. Hãy quay trở lại sau nhé.
          </span>
      </div>
    </div>
  );
}

export default BlankPage;
