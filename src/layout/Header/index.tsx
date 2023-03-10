import { Avatar, Button as ButtonMui } from "@mui/material";
import { useEffect } from "react";
import cn from "classnames";

import useAppDispatch from "../../hooks/redux/useAppDispatch";
import { useLazyLogoutQuery } from "../../store/api/auth.api";
import { logout } from "../../store/slices/auth/auth.slice";
import useTranslation from "../../hooks/useTranslation";
import LocalizationPerformer from "../../components/LocalizationPerformer";
import useAppSelector from "../../hooks/redux/useAppSelector";
import { selectUser } from "../../store/slices/auth/selectors";
import Button from "../../components/Button";
import ThemeModePerformer from "../../components/ThemeModePerformer";
import { selectTheme } from "../../store/slices/theme/selectors";
import { ThemeEnum } from "../../store/slices/theme/theme.enums";

import styles from "./Header.module.css";
import * as keySet from "./HeadBar.i18n";

const Header = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);
  const theme = useAppSelector(selectTheme);
  const t = useTranslation(keySet);

  const userName = userInfo.login ? userInfo.login[0].toUpperCase() : "";

  const [logoutRequest, { data: logoutRequestData }] = useLazyLogoutQuery();

  useEffect(() => {
    if (!logoutRequestData) return;
  }, [logoutRequestData]);

  const logoutHandler = () => {
    logoutRequest(null);
    // TODO move following code to useEffect after connected auth api
    dispatch(logout());
  };

  return (
    <div
      className={cn(styles.root, {
        [styles.light]: theme === ThemeEnum.LIGHT,
        [styles.dark]: theme === ThemeEnum.DARK,
      })}
    >
      <h1>{t("title")}</h1>
      <div className={styles.buttons}>
        <ThemeModePerformer />
        <Button>
          <Avatar>{userName}</Avatar>
        </Button>
        <LocalizationPerformer />
        <ButtonMui variant={"contained"} onClick={logoutHandler}>
          {t("logout")}
        </ButtonMui>
      </div>
    </div>
  );
};

export default Header;
