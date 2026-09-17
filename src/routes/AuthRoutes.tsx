import React from "react";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";

export const renderAuthRoute = (route: string, navigate: (r: string) => void) => {
  if (route === "login") return <LoginPage navigate={navigate} />;
  if (route === "register") return <RegisterPage navigate={navigate} />;
  return null;
};
