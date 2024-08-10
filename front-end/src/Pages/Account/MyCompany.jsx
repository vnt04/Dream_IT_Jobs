import { useState } from "react";
import InputTemplate from "../../components/InputTemplate";
import Select from "react-select";
import apiEndpoint from "../../api/index";
import { locationOption, nation, techStack } from "../../resources/defaultData";
import axios from "axios";

function MyCompany() {
  const [selectLocation, setSelectLocation] = useState([]);
  const [selectedNation, setSelectedNation] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [logo, setLogo] = useState("/src/assets/logo.jpg");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("location", JSON.stringify(selectLocation));
    formData.append("nation", selectedNation);
    formData.append("tech-stack", JSON.stringify(selectedTechStack));
    formData.append("logo", logo);
    try {
      const response = await axios.post(apiEndpoint.company_add, formData);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0] || null;
    if (file) {
      setLogo(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imagePreview = document.getElementById("image-preview");
        if (imagePreview) {
          imagePreview.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-2xl bg-[#f5f5f5] px-4 xl:px-24">
      <div className="px-4 pt-10 lg:px-16">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="mb-2 w-full rounded bg-white px-8 pb-8 pt-4 shadow-2xl"
        >
          <div className="mb-4 flex justify-between gap-4">
            <div className="flex w-1/2">
              <div className="grid">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Logo Công ty
                </label>
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="h-full w-1/2 rounded border-[2px]">
                <img src="" id="image-preview" className="h-full w-full" />
              </div>
            </div>
            <div className="flex w-1/2">
              <div className="grid">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Banner
                </label>
                <input type="file" onChange={handleFileChange} />
              </div>
              <div className="h-full w-1/2 rounded border-[2px]">
                <img src="" id="image-preview" className="h-full w-full" />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/3">
              <InputTemplate title="Tên công ty" name="company" type="text" />
            </div>
            <div className="w-1/3">
              <InputTemplate title="Mô hình công ty" name="model" type="text" />
            </div>
            <div className="w-1/3">
              <InputTemplate
                title="Lĩnh vực công ty"
                name="field"
                type="text"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/3">
              <InputTemplate
                title="Quy mô công ty"
                name="scale"
                type="number"
              />
            </div>
            <div className="w-1/3">
              <InputTemplate
                title="Thời gian làm việc"
                name="time-work"
                type="text"
              />
            </div>
            <div className="w-1/3">
              <InputTemplate title="Làm việc ngoài giờ" name="ot" type="text" />
            </div>
          </div>
          <div className="mb-2">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Công nghệ sử dụng
            </label>
            <Select
              isMulti
              options={techStack}
              onChange={setSelectedTechStack}
              value={selectedTechStack}
            />
          </div>
          <InputTemplate title="Website link" name="website" type="text" />
          <div className="mb-2 flex gap-4">
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Địa điểm công ty
              </label>
              <Select
                isMulti
                options={locationOption}
                selectedValue={selectLocation}
                onSelect={setSelectLocation}
              />
            </div>
            <div className="w-1/2">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Quốc gia
              </label>
              <Select
                options={nation}
                onChange={setSelectedNation}
                value={selectedNation}
              />
            </div>
          </div>
          <InputTemplate
            title="Địa điểm chi tiết"
            name="address"
            type="text"
            isTextArea
            cols={40}
            rows={4}
          />
          <InputTemplate
            title="Giới thiệu công ty"
            name="introduce"
            type="text"
            isTextArea
            cols={40}
            rows={8}
          />
          <InputTemplate
            title="Chế độ đã ngộ"
            name="benefit"
            type="text"
            isTextArea
            cols={40}
            rows={8}
          />

          <button type="submit" className="btn-1 mt-5 w-full">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyCompany;
