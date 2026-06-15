import { I18nContext } from "../contexts/i18context";
import { useContext } from "react";
export const useLanguage = () => {
    return useContext(I18nContext);
};
