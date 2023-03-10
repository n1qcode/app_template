import Select from "../Select";
import { ISelect } from "../Select/Select.typings";
import toggleLangOptions from "../../layout/Header/utils/toggleLangOptions";
import { toggleLanguage } from "../../store/slices/locale/locale.slice";
import useAppSelector from "../../hooks/redux/useAppSelector";
import useAppDispatch from "../../hooks/redux/useAppDispatch";
import useTranslation from "../../hooks/useTranslation";
import * as keySet from "../LocalizationPerformer/LocalizationPerformer.i18n";
import { selectLanguage } from "../../store/slices/locale/selectors";

const LocalizationPerformer = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  const t = useTranslation(keySet);

  const changeLanguageHandler = (lang: string) => {
    dispatch(toggleLanguage(lang));
  };

  const toggleLangProps: ISelect = {
    label: t("locale"),
    value: language,
    setValue: changeLanguageHandler,
    options: toggleLangOptions,
  };

  return <Select {...toggleLangProps} />;
};

export default LocalizationPerformer;
