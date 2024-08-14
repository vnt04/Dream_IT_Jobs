/* eslint-disable react/prop-types */
import { BsEyeSlash } from "react-icons/bs";
import { FaPenToSquare } from "react-icons/fa6";

function CVTemplate({ template, handleCV }) {
  return (
    <div key={template.mainStyle} className="h-auto rounded-2xl border">
      <div className="max-h-4/5 group relative w-full">
        <img
          src={template.image}
          alt=""
          className="h-full max-h-60 min-h-36 w-full rounded-tl-2xl rounded-tr-2xl border bg-gray-100 object-contain"
        />
        <div className="invisible absolute bottom-0 w-full space-y-2 p-4 group-hover:visible">
          <div
            onClick={handleCV}
            className="cursor-pointer rounded-xl border border-primary bg-transparent"
          >
            <button className="mx-auto flex items-center gap-2 py-1">
              <BsEyeSlash />
              <span>Xem trước</span>
            </button>
          </div>
          <div
            onClick={handleCV}
            className="cursor-pointer rounded-xl border bg-primary text-white hover:bg-teal-600"
          >
            <button className="mx-auto flex items-center gap-2 py-1">
              <FaPenToSquare />
              Dùng mẫu
            </button>
          </div>
        </div>
      </div>
      <div className="h-1/5 px-4 py-2">
        <div className="flex gap-2 py-2">
          {template.styles.map((style, index) => (
            <button
              key={index}
              className="rounded border bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300"
            >
              {style}
            </button>
          ))}
        </div>
        <h1 className="font-bold text-gray-600">{template.mainStyle}</h1>
      </div>
    </div>
  );
}

export default CVTemplate;
