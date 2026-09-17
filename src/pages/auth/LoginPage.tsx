import React from "react";
import { AuthModalOrView } from "@/components/auth/AuthModalOrView";
export const LoginPage: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => <AuthModalOrView initialMode="login" navigate={navigate} />;
