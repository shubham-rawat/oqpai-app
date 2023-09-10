import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueFor } from "../utils/SecureDataStoreUtils";
import { setUserData } from "../store/userDataSlice";
import {
  LOGIN_STORE_KEY,
  USEREMAIL_STORE_KEY,
  USERMOBILE_STORE_KEY,
  USERNAME_STORE_KEY,
} from "../constants/AllConstants";
// routes
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

export default function Routes() {
  const { isLoggedIn } = useSelector((state) => state.userData);
  let name = "",
    email = "",
    mobile = "";
  const dispatch = useDispatch();
  // getting data from secure storage
  getValueFor(USEREMAIL_STORE_KEY).then((res) => (email = res));
  getValueFor(USERNAME_STORE_KEY).then((res) => (name = res));
  getValueFor(USERMOBILE_STORE_KEY).then((res) => (mobile = res));
  getValueFor(LOGIN_STORE_KEY).then((res) =>
    dispatch(setUserData({ email, name, mobile, isLoggedIn: res }))
  );

  if (isLoggedIn) {
    return <PrivateRoutes />;
  } else {
    return <PublicRoutes />;
  }
}
