import React from "react";
import { AuthModalOrView } from "@/components/auth/AuthModalOrView";
export const RegisterPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => <AuthModalOrView initialMode="register" navigate={navigate} />;
