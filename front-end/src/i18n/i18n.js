import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_VI from "../resources/vi/home.json";
import HOME_EN from "../resources/en/home.json";
import JOB_VI from "../resources/vi/job.json";
import JOB_EN from "../resources/en/job.json";

const resources = {
  vi: {
    home: HOME_VI,
    job: JOB_VI,
  },
  en: {
    home: HOME_EN,
    job: JOB_EN,
  },
};

const defaultNS = "home";
const currentLanguage = localStorage.getItem("language") || "vi";

i18n.use(initReactI18next).init({
  resources,
  lng: currentLanguage,
  ns: ["home", "job"],
  defaultNS,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});
