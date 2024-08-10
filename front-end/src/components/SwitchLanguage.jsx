import { useTranslation } from "react-i18next";

function SwitchLanguage() {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };
  const activeCSS = "font-semibold text-primary";
  const currentLanguage = localStorage.getItem("language") || "vi";
  return (
    <div>
      <span className="hidden max-lg:block">Ngôn ngữ: </span>
      <button
        onClick={() => changeLanguage("en")}
        className={currentLanguage === "en" ? activeCSS : ""}
      >
        En
      </button>
      <span> | </span>
      <button
        onClick={() => changeLanguage("vi")}
        className={currentLanguage === "vi" ? activeCSS : ""}
      >
        Vi
      </button>
    </div>
  );
}

export default SwitchLanguage;
