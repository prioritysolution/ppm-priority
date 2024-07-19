"use client";
import Login from "@/components/auth/login";
import React, { memo, useEffect } from "react";
import { LoginHooks } from "./Hooks";
import getSessionStorageData from "@/utils/getSessionStorageData";
import { useRouter } from "next/navigation";
import { pathName } from "@/utils/route";

const LoginContainer = () => {
  const router = useRouter();
  const token = getSessionStorageData("token");
  const orgId = getSessionStorageData("orgId");
  const { LoginFormik, handleRememberMe, rememberMe, loading } = LoginHooks();
  useEffect(() => {
    if (token && orgId) {
      router.push(pathName.dashboard);
    }
  }, [token, orgId, router]);

  return (
    <Login
      loginFormik={LoginFormik}
      remember={rememberMe}
      handleRememberMe={handleRememberMe}
      loading={loading}
    />
  );
};
const memoizedHook = memo(LoginContainer);
export default memoizedHook;
